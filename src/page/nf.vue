<template>
  <el-row>
    <el-col :span="24" style="margin-bottom:20px;">
      <h1>南方基金实时估算净值(一分钟刷新一次)</h1>&nbsp;<el-button type="primary" @click="refresh"><i class="el-icon-refresh"></i>刷新</el-button>
    </el-col>
    <el-table
      :data="funds"
      v-loading="loading"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="fundcode"
        label="基金代码">
      </el-table-column>
      <el-table-column
        prop="name"
        label="基金名称">
      </el-table-column>
      <el-table-column
        label="昨日净值">
        <template slot-scope="scope">
          <div>{{scope.row.dwjz}}【{{scope.row.jzrq}}】</div>
        </template>
      </el-table-column>
      <el-table-column
        label="实时净值（估算）">
        <template slot-scope="scope">
          <div>{{scope.row.gsz}}【{{scope.row.gztime}}】</div>
        </template>
      </el-table-column>
      <el-table-column
        label="涨跌幅">
        <template slot-scope="scope">
          <div v-if="scope.row.gszzl > 0" style="color:red">{{scope.row.gszzl}}%<i class="el-icon-top"></i></div>
          <div v-if="scope.row.gszzl === 0" style="color:black">{{scope.row.gszzl}}%</div>
          <div v-if="scope.row.gszzl < 0" style="color:green">{{scope.row.gszzl}}%<i class="el-icon-bottom"></i></div>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import jsonp from 'jsonp'
import loadjs from 'loadjs'
export default {
  name: 'nf',
  data () {
    return {
      funds: [],
      loading: false
    }
  },
  mounted () {
    this.refresh()
    setInterval(this.refresh, 60000)
  },
  methods: {
    refresh () {
      this.funds = []
      this.loading = true
      this.getSHApi().then(data => {
        this.funds.push(data)
        this.loading = false
        this.getApi().then(data => {
          this.funds = this.funds.concat(data)
          this.loading = false
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getSHApi () {
      return new Promise((resolve, reject) => {
        loadjs('http://web.sqt.gtimg.cn/utf8/q=sh000001&offset=1,2,3,4,31,32,33,38&r=0.79290506620242622', {
          success: () => {
            const data = window.v_sh000001.split('~')
            resolve({
              jzrq: `${data[4].substring(0, 4)}-${data[4].substring(4, 6)}-${data[4].substring(6, 8)}`,
              dwjz: parseFloat(data[3]) - 0 + parseFloat(data[5]) - 0,
              gsz: parseFloat(data[3]),
              gztime: `${data[4].substring(0, 4)}-${data[4].substring(4, 6)}-${data[4].substring(6, 8)} ${data[4].substring(8, 10)}:${data[4].substring(10, 12)}`,
              gszzl: data[6],
              name: data[1],
              fundcode: data[2]
            })
          },
          error: (err) => {
            reject(err)
          }
        })
      })
    },
    getApi () {
      const funds = []
      const ids = ['202101', '160119']
      const req = (fundCode) => {
        return new Promise((resolve, reject) => {
          jsonp(`https://fundgz.1234567.com.cn/js/${fundCode}.js`, {
            param: `rt=${new Date().valueOf()}`,
            name: 'jsonpgz'
          }, (err, data) => {
            if (!err) {
              resolve(data)
            } else {
              reject(new Error(err))
            }
          })
        })
      }
      return new Promise((resolve, reject) => {
        let temp = ids.pop()
        const _inner = (temp) => {
          if (temp) {
            req(temp).then(data => {
              funds.push(data)
              _inner(ids.pop())
            }).catch(err => {
              reject(err)
            })
          } else {
            resolve(funds)
          }
        }
        _inner(temp)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
