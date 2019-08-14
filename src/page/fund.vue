<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
      <el-col :span="3">
        <el-tag>{{hold}}</el-tag>
      </el-col>
    </el-row>
    <el-row>
      <div class="chart" ref="chart"></div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/util/api'
export default {
  name: 'fund',
  data () {
    return {
      // 承载echarts的dom
      dom: null,
      // 原始数据
      orgData: null,
      dateRange: ['2019-01-01', moment(moment.now()).format('YYYY-MM-DD')],
      type: 0,
      fundid: 'F00000ZQWJ',
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
        hold: 57.7539,
        cost: 5000
      }, {
        label: '易方达全球债券基金A USD Acc',
        value: 'F00000YE6M',
        hold: 91.9500,
        cost: 1000
      }]
    }
  },
  methods: {
    getData () {
      this.dom.showLoading()
      api.req(this.dateRange[0], this.dateRange[1], this.fundid, (data) => {
        data = data.reverse()
        this.orgData = data
        this.renderEcharts(this.trasnformData(this.type))
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
          left: 25,
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
        yAxis: {
          type: 'value'
        },
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
