<template>
  <el-row>
    <el-col :span="24" style="margin-bottom:20px;">
      <!-- <h1>重点关注市值实时估算净值(一分钟刷新一次)</h1> -->
      &nbsp;<el-button type="primary" @click="refresh"><i class="el-icon-refresh"></i>刷新</el-button>
    </el-col>
    <el-col :span="4" style="margin-bottom: 10px">
      <el-select v-model="sortval" placeholder="请选择" @change="onSort" style="width:100%">
        <el-option
          v-for="item in sorts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-table
      :data="funds"
      v-loading="loading"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="fundcode"
        width="100"
        label="代码">
      </el-table-column>
      <el-table-column
        label="名称">
        <template slot-scope="scope">
          <div>{{scope.row.name}}【{{scope.row.type}}】</div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="涨跌幅">
        <template slot-scope="scope">
          <div v-if="scope.row.gszzl > 0" style="color:red">{{scope.row.gszzl}}%<i class="el-icon-top"></i></div>
          <div v-if="scope.row.gszzl == 0.00" style="color:black">{{scope.row.gszzl}}%</div>
          <div v-if="scope.row.gszzl < 0" style="color:green">{{scope.row.gszzl}}%<i class="el-icon-bottom"></i></div>
        </template>
      </el-table-column>
      <el-table-column
        label="昨日净值">
        <template slot-scope="scope">
          <div>{{scope.row.dwjz}}【{{jzrq}}】</div>
        </template>
      </el-table-column>
      <el-table-column
        label="实时净值（估算）">
        <template slot-scope="scope">
          <div>{{scope.row.gsz}}【{{scope.row.gztime}}】</div>
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
      loading: false,
      jzrq: '',
      sortval: 0,
      sorts: [
        {
          label: '涨幅从高到低',
          value: 0
        },
        {
          label: '涨幅从低到高',
          value: 1
        }
      ]
    }
  },
  mounted () {
    this.refresh()
    setInterval(this.refresh, 60000)
  },
  methods: {
    onSort (val) {
      if (val === 0) {
        this.funds.sort((a, b) => b.gszzl - a.gszzl)
      } else if (val === 1) {
        this.funds.sort((a, b) => a.gszzl - b.gszzl)
      }
    },
    refresh () {
      this.funds = []
      this.loading = true
      this.getSHApi().then(data => {
        this.setFunds(data)
        this.getApi().then(data => {
          this.setFunds(data)
          this.sortval = 0
          this.onSort(0)
        }).catch(err => {
          this.catchErr(err)
        })
      }).catch(err => {
        this.catchErr(err)
      })
    },
    setFunds (data = []) {
      this.funds = this.funds.concat(data)
      this.loading = false
    },
    catchErr (err) {
      this.loading = false
      console.log(err)
    },
    getSHApi () {
      const code = ['sh000001', 'sz002024']
      const result = []
      return new Promise((resolve, reject) => {
        loadjs(`https://web.sqt.gtimg.cn/utf8/q=${code.join(',')}&offset=1,2,3,4,31,32,33,38&r=${Math.random()}`, {
          success: () => {
            code.forEach(ele => {
              const data = window[`v_${ele}`].split('~')
              result.push({
                // jzrq: `${data[4].substring(0, 4)}-${data[4].substring(4, 6)}-${data[4].substring(6, 8)}`,
                dwjz: Number(parseFloat(data[3]) - 0 - parseFloat(data[5]) - 0).toFixed(2),
                gsz: Number(parseFloat(data[3])).toFixed(2),
                gztime: `${data[4].substring(0, 4)}-${data[4].substring(4, 6)}-${data[4].substring(6, 8)} ${data[4].substring(8, 10)}:${data[4].substring(10, 12)}`,
                gszzl: data[6],
                name: data[1],
                fundcode: data[2],
                type: '股票'
              })
            })
            resolve(result)
          },
          error: (err) => {
            reject(err)
          }
        })
      })
    },
    getApi () {
      const funds = []
      const ids = ['202101', '160119', '000452', '007733']
      const req = (fundCode) => {
        return new Promise((resolve, reject) => {
          jsonp(`https://fundgz.1234567.com.cn/js/${fundCode}.js`, {
            param: `rt=${new Date().valueOf()}`,
            name: 'jsonpgz'
          }, (err, data) => {
            if (!err) {
              data.type = '基金'
              this.jzrq = data.jzrq
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
