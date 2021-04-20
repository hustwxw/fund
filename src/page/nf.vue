<template>
  <el-row>
    <el-col :span="24" style="margin-bottom:20px;">
      <!-- <h1>重点关注市值实时估算净值(一分钟刷新一次)</h1> -->
      &nbsp;<el-button type="primary" @click="refresh"><i class="el-icon-refresh"></i>刷新</el-button>
    </el-col>
    <el-col :span="8" style="margin-bottom: 10px">
      <el-select v-model="sortval" placeholder="请选择" @change="onSort" style="width:100%">
        <el-option
          v-for="item in sorts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12" style="margin-bottom: 10px">
      日预估：{{Number(days[0] + days[1]).toFixed(2) - 0}}
      南方日预估：{{Number(days[0]).toFixed(2) - 0}}
      广发日预估：{{Number(days[1]).toFixed(2) - 0}}
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
        prop="company"
        width="100"
        label="公司">
      </el-table-column>
      <el-table-column
        label="名称">
        <template slot-scope="scope">
          <div>{{scope.row.name}}【{{scope.row.type}}】</div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="预估涨跌幅">
        <template slot-scope="scope">
          <div v-if="scope.row.gszzl > 0" style="color:red">{{scope.row.gszzl}}%<i class="el-icon-top"></i></div>
          <div v-if="scope.row.gszzl == 0.00" style="color:black">{{scope.row.gszzl}}%</div>
          <div v-if="scope.row.gszzl < 0" style="color:green">{{scope.row.gszzl}}%<i class="el-icon-bottom"></i></div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="预估涨跌值">
        <template slot-scope="scope">
          <div v-if="scope.row.money > 0" style="color:red">{{scope.row.money}}<i class="el-icon-top"></i></div>
          <div v-if="scope.row.money == 0.00" style="color:black">{{scope.row.money}}</div>
          <div v-if="scope.row.money < 0" style="color:green">{{scope.row.money}}<i class="el-icon-bottom"></i></div>
        </template>
      </el-table-column>
      <el-table-column
        label="实时净值（估算）">
        <template slot-scope="scope">
          <div>{{scope.row.gsz}}【{{scope.row.gztime}}】</div>
        </template>
      </el-table-column>
      <el-table-column
        label="昨日净值">
        <template slot-scope="scope">
          <div>{{scope.row.dwjz}}【{{jzrq}}】</div>
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
      days: [0, 0],
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
      this.days = [0, 0]
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
      const code = ['sh000001', 'sz002024', 'sh000808']
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
      const ids = ['202101', '160119', '000452', '007733', '202015', '202011', '003956', '000527', '009318', '007340'].map(fundCode => ({
        fundCode,
        type: '南方'
      })).concat(['010379', '008903', '004851', '005402', '006595', '005223', '000215'].map(fundCode => ({
        fundCode,
        type: '广发'
      })))
      const counts = {
        '202101': 26434.33,
        '007733': 37735.38,
        '000452': 5326.07,
        '009318': 14825.36,
        '160119': 6314.80,
        '202015': 4065.63,
        '202011': 4006.31,
        '007340': 2110.59,
        '003956': 537.31,
        '000527': 135.82,
        '010379': 5027.10,
        '008903': 1744.84,
        '004851': 652.31,
        '005402': 586.94,
        '006595': 1396.30,
        '005223': 2944.34,
        '00215': 153.53
      }
      const req = ({fundCode, type}) => {
        return new Promise((resolve, reject) => {
          jsonp(`https://fundgz.1234567.com.cn/js/${fundCode}.js`, {
            param: `rt=${new Date().valueOf()}`,
            name: 'jsonpgz'
          }, (err, data) => {
            if (!err) {
              data.company = type
              data.type = '基金'
              data.money = Number(counts[fundCode] * data.gsz * (1 - 1 / (1 + data.gszzl / 100))).toFixed(2)
              const index = {
                '南方': 0,
                '广发': 1
              }[type]
              this.days[index] += isNaN(data.money) ? 0 : data.money - 0
              this.jzrq = data.jzrq
              resolve(data)
            } else {
              reject(new Error(err + fundCode))
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
