<template>
  <div>
    <el-row>
      <el-col :span="8">
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
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
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
      dom: null,
      dateRange: ['2019-01-01', moment(moment.now()).format('YYYY-MM-DD')],
      type: 0,
      options: [{
        label: '万元收益',
        value: 0
      }, {
        label: '当日年化收益率',
        value: 1
      }]
    }
  },
  methods: {
    getData () {
      this.dom.showLoading()
      api.getCurrentFund(this.dateRange[0], this.dateRange[1], (data) => {
        let _data = []
        data = data.reverse()
        for (let i = 0, len = data.length; i < len - 1; i++) {
          let dur = moment(data[i].EndDate).diff(moment(data[i + 1].EndDate), 'days')
          _data.push({
            EndDate: data[i].EndDate,
            Value: Number(((10000 / data[i + 1].Value) * (data[i].Value - data[i + 1].Value)) / dur).toFixed(2)
          })
        }
        this.renderEcharts(_data)
      })
    },
    renderEcharts (data) {
      console.log(data)
      let option = {
        tooltip: {
          show: true
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
        series: [{
          data: data.map(ele => {
            if (this.type === 0) {
              return ele.Value
            }
            if (this.type === 1) {
              return ele.Value * 365 / 10000 * 100
            }
          }).reverse(),
          type: 'line'
        }]
      }
      this.dom.setOption(option)
      this.dom.hideLoading()
    },
    query () {
      this.dom = window.echarts.init(this.$refs.chart)
      this.getData()
    }
  },
  mounted () {
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
