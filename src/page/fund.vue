<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <el-col :span="6">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:100%"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-select v-model="type" placeholder="请选择" @change="getData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="fundid" placeholder="请选择" @change="getData" style="width:100%">
          <el-option
            v-for="item in fundIds"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-tag type="info">持有基金份额：{{hold}}</el-tag>
      </el-col>
      <el-col :span="5" v-if="this.type === 0">
        <el-tag>综合年化收益率：{{zonghe}}%</el-tag>
      </el-col>
    </el-row>
    <el-row>
      <div class="chart" ref="chart"></div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import api from '@/util/api'
export default {
  name: 'fund',
  data () {
    return {
      // 承载echarts的dom
      dom: null,
      // 原始数据
      orgData: null,
      dateRange: ['2019-07-01', moment(moment.now()).format('YYYY-MM-DD')],
      type: 0,
      fundid: 'F00000ZQWJ',
      zonghe: 0,
      hold: 0,
      options: [{
        label: '持有市值',
        value: -1
      }, {
        label: '净值',
        value: 0
      }, {
        label: '万元收益',
        value: 1
      }, {
        label: '当日年化收益率',
        value: 2
      }, {
        label: '涨跌幅',
        value: 3
      }],
      fundIds: [{
        label: '易方达美元货币基金',
        value: 'F00000ZQWJ',
        hold: 76.9228,
        cost: 8000,
        invest: [
          {
            date: moment('2019-07-29'),
            buy: 103.728,
            num: 1000,
            fee: 0.001
          },
          {
            date: moment('2019-08-05'),
            buy: 103.784,
            num: 4000,
            fee: 0.001
          },
          {
            date: moment('2019-08-13'),
            buy: 103.846,
            num: 1000,
            fee: 0.001
          },
          {
            date: moment('2019-09-24'),
            buy: 104.119,
            num: 1000,
            fee: 0.001
          },
          {
            date: moment('2019-10-30'),
            buy: 104.342,
            num: 1000,
            fee: 0.001
          }
          // ,
          // {
          //   date: moment('2019-11-22'),
          //   buy: 104.538,
          //   num: 2000,
          //    fee: 0.001
          // }
        ]
      }, {
        label: '易方达全球债券基金A USD Acc',
        value: 'F00000YE6M',
        hold: 91.9500,
        cost: 1000,
        invest: [
          {
            date: moment('2019-08-05'),
            buy: 10.61,
            num: 1000,
            fee: 0.025
          }
        ]
      }]
    }
  },
  methods: {
    computeRate (fundid) {
      if (this.type !== 0) {
        return false
      }
      const endDate = this.orgData[0].EndDate
      const value = this.orgData[0].Value
      const find = this.fundIds.filter(ele => ele.value === fundid)
      const invest = find[0].invest
      const table = []
      let rates = 0
      invest.map(ele => {
        // 计算天数
        const days = moment(endDate).diff(ele.date, 'days')
        // 计算增长比率
        const change = Number((value - ele.buy) / ele.buy * 100).toFixed(4)
        // 年化率
        const yearRate = Number(change / days * 365).toFixed(4)
        // 计算权重
        rates += yearRate - 0
        // 日志
        // console.log(`${days}-${change}-${yearRate}-${ele.buy}-${value}`)
        table.push({
          '买入时刻': ele.date.format('YYYY-MM-DD'),
          '持有天数': days,
          '收益率': change + '%',
          '年化收益率': yearRate + '%',
          '买入价格': ele.buy,
          '当前最新价格': value - 0,
          '本金': ele.num,
          '盈亏': Number(ele.num * (1 - ele.fee) / ele.buy * value - ele.num).toFixed(2) - 0
        })
        return ele
      })
      this.zonghe = Number(rates / invest.length).toFixed(4)
      console.table(table)
    },
    getData () {
      this.dom.showLoading()
      this.dom.clear()
      api.req(this.dateRange[0], this.dateRange[1], this.fundid, (data) => {
        data = data.reverse()
        this.orgData = data
        this.renderEcharts(this.trasnformData(this.type))
        this.computeRate(this.fundid)
      })
    },
    trasnformData (type) {
      let hold = this.fundIds.filter(ele => {
        return ele.value === this.fundid
      })[0]
      this.hold = hold.hold
      if (type === -1) {
        return this.orgData.map(ele => {
          console.log(ele)
          let v = ele.Value * hold.hold
          ele.Value = Number(v - hold.cost).toFixed(2)
          ele.ValueCost = Number(v).toFixed(2)
          return ele
        })
      } else if (type === 0) {
        return this.orgData
      } else if (type === 1) {
        let _data = []
        for (let i = 0, len = this.orgData.length; i < len - 1; i++) {
          let dur = moment(this.orgData[i].EndDate).diff(moment(this.orgData[i + 1].EndDate), 'days')
          _data.push({
            EndDate: this.orgData[i].EndDate,
            ValueDur: Number(((10000 / this.orgData[i + 1].Value) * (this.orgData[i].Value - this.orgData[i + 1].Value)) / dur).toFixed(2),
            Value: Number(((10000 / this.orgData[i + 1].Value) * (this.orgData[i].Value - this.orgData[i + 1].Value))).toFixed(2)
          })
        }
        return _data
      } else if (type === 2) {
        let _data = []
        for (let i = 0, len = this.orgData.length; i < len - 1; i++) {
          let dur = moment(this.orgData[i].EndDate).diff(moment(this.orgData[i + 1].EndDate), 'days')
          _data.push({
            EndDate: this.orgData[i].EndDate,
            ValueDur: Number(((10000 / this.orgData[i + 1].Value) * (this.orgData[i].Value - this.orgData[i + 1].Value)) / dur).toFixed(2) * 365 / 10000 * 100,
            Value: Number(((10000 / this.orgData[i + 1].Value) * (this.orgData[i].Value - this.orgData[i + 1].Value))).toFixed(2) * 365 / 10000 * 100
          })
        }
        return _data
      } else if (type === 3) {
        let _data = []
        for (let i = 0, len = this.orgData.length; i < len - 1; i++) {
          let dur = moment(this.orgData[i].EndDate).diff(moment(this.orgData[i + 1].EndDate), 'days')
          _data.push({
            EndDate: this.orgData[i].EndDate,
            ValueDur: Number(Number((this.orgData[i].Value - this.orgData[i + 1].Value) / this.orgData[i + 1].Value / dur).toFixed(5) * 100),
            Value: Number(Number((this.orgData[i].Value - this.orgData[i + 1].Value) / this.orgData[i + 1].Value).toFixed(5) * 100)
          })
        }
        console.log(_data)
        return _data
      }
    },
    renderEcharts (data) {
      let yAxis = {
        type: 'value'
      }
      let series = [{
        data: data.map(ele => {
          return ele.Value
        }).reverse(),
        type: 'line'
      }]
      if (this.type === -1) {
        series = [{
          data: data.map(ele => {
            return ele.Value
          }).reverse(),
          type: 'line',
          name: '盈利'
        }, {
          data: data.map(ele => {
            return ele.ValueCost
          }).reverse(),
          type: 'line',
          name: '市值',
          lineStyle: {
            color: 'blue'
          }
        }]
      }
      if (this.type === 0) {
        yAxis = {
          type: 'value',
          max: _.max(data.map(ele => {
            return ele.Value
          }).reverse()) * 1.08,
          min: _.min(data.map(ele => {
            return ele.Value
          }).reverse()) * 0.95
        }
      }
      if (this.type === 1 || this.type === 2 || this.type === 3) {
        series = [{
          data: data.map(ele => {
            return ele.Value
          }).reverse(),
          type: 'line',
          name: '原始值'
        }, {
          data: data.map(ele => {
            return ele.ValueDur
          }).reverse(),
          type: 'line',
          name: '均摊值',
          lineStyle: {
            color: 'blue'
          }
        }]
      }
      let option = {
        legend: {
          show: (this.type !== 0)
        },
        grid: {
          left: 35,
          right: 5
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map(ele => {
            return ele.EndDate
          }).reverse()
        },
        yAxis: yAxis,
        series: series
      }
      this.dom.setOption(option)
      this.dom.hideLoading()
    },
    query () {
      this.getData()
    }
  },
  mounted () {
    this.dom = window.echarts.init(this.$refs.chart)
    this.hold = this.fundIds[0].hold
    window.onresize = () => {
      this.dom.resize()
    }
  }
}
</script>

<style lang="less" scoped>
.chart{
  width: 100%;
  height:500px;
  padding:20px;
  margin-top:20px;
  box-sizing: border-box;
  border: 1px solid #333;
}
</style>
