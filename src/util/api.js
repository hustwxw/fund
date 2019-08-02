import axios from 'axios'
let api = {}

let req = (startDate, endDate, id, callback) => {
  axios.get(`/data/api/rest.svc/timeseries_price/wcunxicr3v?currencyid=BAS&endDate=${endDate}&id=${id}&idtype=MSID&outputType=JSON&startDate=${startDate}&timeperiod=0#/`, {}).then(function (res) {
    let temp = res.data.TimeSeries.Security
    let result = temp.filter((ele) => {
      return ele.Id === id
    })
    callback && callback(result[0].HistoryDetail)
  }).catch(function (err) {
    console.log(err)
  })
}
api.req = req
api.getCurrentFund = (startDate, endDate, callback) => {
  req(startDate, endDate, 'F00000ZQWJ', callback)
}
export default api
