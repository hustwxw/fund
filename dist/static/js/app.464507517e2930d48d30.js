webpackJsonp([1],{BN46:function(t,e){},LtzE:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=a("VU/8")({name:"App"},n,!1,function(t){a("LtzE")},null,null).exports,o=a("/ocq"),l=a("hU7x"),u=a.n(l),i=a("PJh5"),d=a.n(i),c=a("M4fF"),f=a.n(c),h=a("mtWM"),g=a.n(h),p={},m=function(t,e,a,s){g.a.get("/data/api/rest.svc/timeseries_price/wcunxicr3v?currencyid=BAS&endDate="+e+"&id="+a+"&idtype=MSID&outputType=JSON&startDate="+t+"&timeperiod=0#/",{}).then(function(t){var e=t.data.TimeSeries.Security.filter(function(t){return t.Id===a});s&&s(e[0].HistoryDetail)}).catch(function(t){console.log(t)})};p.req=m,p.getCurrentFund=function(t,e,a){m(t,e,"F00000ZQWJ",a)};var j=p,v={name:"fund",data:function(){return{funds:[],dom:null,orgData:null,dateRange:["2019-07-01",d()(d.a.now()).format("YYYY-MM-DD")],type:0,fundid:"F00000ZQWJ",zonghe:0,hold:0,options:[{label:"持有市值",value:-1},{label:"净值",value:0},{label:"万元收益",value:1},{label:"当日年化收益率",value:2},{label:"涨跌幅",value:3}],fundIds:[{label:"易方达美元货币基金",value:"F00000ZQWJ",hold:96.0345,cost:1e4,invest:[{date:d()("2019-07-29"),buy:103.728,num:1e3,fee:.001},{date:d()("2019-08-05"),buy:103.784,num:4e3,fee:.001},{date:d()("2019-08-13"),buy:103.846,num:1e3,fee:.001},{date:d()("2019-09-24"),buy:104.119,num:1e3,fee:.001},{date:d()("2019-10-30"),buy:104.342,num:1e3,fee:.001},{date:d()("2019-12-03"),buy:104.543,num:2e3,fee:.001}]},{label:"易方达全球债券基金A USD Acc",value:"F00000YE6M",hold:91.95,cost:1e3,invest:[{date:d()("2019-08-05"),buy:10.61,num:1e3,fee:.025}]}]}},methods:{computeRate:function(t){if(0!==this.type)return!1;var e=this.orgData[0].EndDate,a=this.orgData[0].Value,s=this.fundIds.filter(function(e){return e.value===t}),n=s[0].invest,r=[],o=0;n.map(function(t){var s=Math.max(1,d()(e).diff(t.date,"days")),n=Number((a-t.buy)/t.buy*100).toFixed(4),l=Number(n/s*365).toFixed(4);return o+=l-0,r.push({"买入时刻":t.date.format("YYYY-MM-DD"),"持有天数":s,"总收益率":n+"%","年化收益率":l+"%","买入价格":t.buy,"当前最新价格":a-0,"本金":t.num,"盈亏":Number(t.num*(1-t.fee)/t.buy*a-t.num).toFixed(2)-0}),t}),this.zonghe=Number(o/n.length).toFixed(4),console.log(s[0].label+"投资情况"),console.table(r)},getData:function(){var t=this;this.dom.showLoading(),this.dom.clear(),j.req(this.dateRange[0],this.dateRange[1],this.fundid,function(e){e=e.reverse(),t.orgData=e,t.renderEcharts(t.trasnformData(t.type)),t.computeRate(t.fundid)})},trasnformData:function(t){var e=this,a=this.fundIds.filter(function(t){return t.value===e.fundid})[0];if(this.hold=a.hold,-1===t)return this.orgData.map(function(t){console.log(t);var e=t.Value*a.hold;return t.Value=Number(e-a.cost).toFixed(2),t.ValueCost=Number(e).toFixed(2),t});if(0===t)return this.orgData;if(1===t){for(var s=[],n=0,r=this.orgData.length;n<r-1;n++){var o=d()(this.orgData[n].EndDate).diff(d()(this.orgData[n+1].EndDate),"days");s.push({EndDate:this.orgData[n].EndDate,ValueDur:Number(1e4/this.orgData[n+1].Value*(this.orgData[n].Value-this.orgData[n+1].Value)/o).toFixed(2),Value:Number(1e4/this.orgData[n+1].Value*(this.orgData[n].Value-this.orgData[n+1].Value)).toFixed(2)})}return s}if(2===t){for(var l=[],u=0,i=this.orgData.length;u<i-1;u++){var c=d()(this.orgData[u].EndDate).diff(d()(this.orgData[u+1].EndDate),"days");l.push({EndDate:this.orgData[u].EndDate,ValueDur:365*Number(1e4/this.orgData[u+1].Value*(this.orgData[u].Value-this.orgData[u+1].Value)/c).toFixed(2)/1e4*100,Value:365*Number(1e4/this.orgData[u+1].Value*(this.orgData[u].Value-this.orgData[u+1].Value)).toFixed(2)/1e4*100})}return l}if(3===t){for(var f=[],h=0,g=this.orgData.length;h<g-1;h++){var p=d()(this.orgData[h].EndDate).diff(d()(this.orgData[h+1].EndDate),"days");f.push({EndDate:this.orgData[h].EndDate,ValueDur:Number(100*Number((this.orgData[h].Value-this.orgData[h+1].Value)/this.orgData[h+1].Value/p).toFixed(5)),Value:Number(100*Number((this.orgData[h].Value-this.orgData[h+1].Value)/this.orgData[h+1].Value).toFixed(5))})}return console.log(f),f}},renderEcharts:function(t){var e={type:"value"},a=[{data:t.map(function(t){return t.Value}).reverse(),type:"line"}];-1===this.type&&(a=[{data:t.map(function(t){return t.Value}).reverse(),type:"line",name:"盈利"},{data:t.map(function(t){return t.ValueCost}).reverse(),type:"line",name:"市值",lineStyle:{color:"blue"}}]),0===this.type&&(e={type:"value",max:1.08*f.a.max(t.map(function(t){return t.Value}).reverse()),min:.95*f.a.min(t.map(function(t){return t.Value}).reverse())}),1!==this.type&&2!==this.type&&3!==this.type||(a=[{data:t.map(function(t){return t.Value}).reverse(),type:"line",name:"原始值"},{data:t.map(function(t){return t.ValueDur}).reverse(),type:"line",name:"均摊值",lineStyle:{color:"blue"}}]);var s={legend:{show:0!==this.type},grid:{left:35,right:5},tooltip:{show:!0,trigger:"axis"},xAxis:{type:"category",boundaryGap:!1,data:t.map(function(t){return t.EndDate}).reverse()},yAxis:e,series:a};this.dom.setOption(s),this.dom.hideLoading()},query:function(){this.getData()},getSouthFund:function(){var t=this,e=function(){["202101","160119"].forEach(function(e,a){setTimeout(function(){u()("/ddfund/js/"+e+".js",{param:"rt="+(new Date).valueOf(),name:"jsonpgz"},function(e,a){e||t.funds.push(a)})},1e3*a)})};setInterval(function(){t.funds.length=0,e()},6e4),e()}},mounted:function(){var t=this;this.dom=window.echarts.init(this.$refs.chart),this.hold=this.fundIds[0].hold,window.onresize=function(){t.dom.resize()},this.getSouthFund()}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{staticStyle:{"margin-bottom":"20px",border:"1px solid #ddd",padding:"20px","padding-left":"0px"}},[a("el-col",{attrs:{span:3}},[t._v("\n      实时估值\n    ")]),t._v(" "),a("el-col",{attrs:{span:21}},t._l(t.funds,function(e){return a("el-row",{key:e.fundcode},[a("el-col",{attrs:{span:20}},[a("el-tag",[t._v(t._s(e.name))]),t._v("\n           前值:"+t._s(e.dwjz)+"\n           当前估值:"+t._s(e.gsz)+"\n           变化率:\n            "),e.gszzl<0?a("el-tag",{attrs:{type:"danger"}},[t._v(t._s(e.gszzl)+"%")]):t._e(),t._v(" "),e.gszzl>=0?a("el-tag",{attrs:{type:"success"}},[t._v(t._s(e.gszzl)+"%")]):t._e(),t._v("\n           更新时间:"+t._s(e.gztime)+"\n        ")],1)],1)}),1)],1),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"}},[a("el-col",{attrs:{span:6}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getData},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},on:{change:t.getData},model:{value:t.fundid,callback:function(e){t.fundid=e},expression:"fundid"}},t._l(t.fundIds,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-button",{attrs:{type:"primary"},on:{click:t.query}},[t._v("查询")])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:5}},[a("el-tag",{attrs:{type:"info"}},[t._v("持有基金份额："+t._s(t.hold))])],1),t._v(" "),0===this.type?a("el-col",{attrs:{span:5}},[a("el-tag",[t._v("综合年化收益率："+t._s(t.zonghe)+"%")])],1):t._e()],1),t._v(" "),a("el-row",[a("div",{ref:"chart",staticClass:"chart"})])],1)},staticRenderFns:[]};var y=a("VU/8")(v,b,!1,function(t){a("S4WH")},"data-v-07bf55c2",null).exports,z=a("//Fk"),D=a.n(z),w=a("cpAY"),_=a.n(w),x={name:"nf",data:function(){return{funds:[],loading:!1}},mounted:function(){this.refresh(),setInterval(this.refresh,6e4)},methods:{refresh:function(){var t=this;this.funds=[],this.loading=!0,this.getSHApi().then(function(e){t.funds.push(e),t.loading=!1,t.getApi().then(function(e){t.funds=t.funds.concat(e),t.loading=!1}).catch(function(e){t.loading=!1,console.log(e)})}).catch(function(e){t.loading=!1,console.log(e)})},getSHApi:function(){return new D.a(function(t,e){_()("https://web.sqt.gtimg.cn/utf8/q=sh000001&offset=1,2,3,4,31,32,33,38&r="+Math.random(),{success:function(){var e=window.v_sh000001.split("~");t({jzrq:e[4].substring(0,4)+"-"+e[4].substring(4,6)+"-"+e[4].substring(6,8),dwjz:Number(parseFloat(e[3])-0-parseFloat(e[5])-0).toFixed(2),gsz:Number(parseFloat(e[3])).toFixed(2),gztime:e[4].substring(0,4)+"-"+e[4].substring(4,6)+"-"+e[4].substring(6,8)+" "+e[4].substring(8,10)+":"+e[4].substring(10,12),gszzl:e[6],name:e[1],fundcode:e[2]})},error:function(t){e(t)}})})},getApi:function(){var t=[],e=["202101","160119"];return new D.a(function(a,s){!function n(r){var o;r?(o=r,new D.a(function(t,e){u()("https://fundgz.1234567.com.cn/js/"+o+".js",{param:"rt="+(new Date).valueOf(),name:"jsonpgz"},function(a,s){a?e(new Error(a)):t(s)})})).then(function(a){t.push(a),n(e.pop())}).catch(function(t){s(t)}):a(t)}(e.pop())})}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{staticStyle:{"margin-bottom":"20px"},attrs:{span:24}},[a("h1",[t._v("南方基金实时估算净值(一分钟刷新一次)")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.refresh}},[a("i",{staticClass:"el-icon-refresh"}),t._v("刷新")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.funds,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"fundcode",label:"基金代码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"基金名称"}}),t._v(" "),a("el-table-column",{attrs:{label:"涨跌幅"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.gszzl>0?a("div",{staticStyle:{color:"red"}},[t._v(t._s(e.row.gszzl)+"%"),a("i",{staticClass:"el-icon-top"})]):t._e(),t._v(" "),0==e.row.gszzl?a("div",{staticStyle:{color:"black"}},[t._v(t._s(e.row.gszzl)+"%")]):t._e(),t._v(" "),e.row.gszzl<0?a("div",{staticStyle:{color:"green"}},[t._v(t._s(e.row.gszzl)+"%"),a("i",{staticClass:"el-icon-bottom"})]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"昨日净值"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.dwjz)+"【"+t._s(e.row.jzrq)+"】")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"实时净值（估算）"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.gsz)+"【"+t._s(e.row.gztime)+"】")])]}}])})],1)],1)},staticRenderFns:[]};var F=a("VU/8")(x,k,!1,function(t){a("BN46")},"data-v-6548e801",null).exports;s.default.use(o.a);var V={routes:[{path:"/",name:"nf",component:F}]};window.ISLOCALHOST&&V.routes.push({path:"/fund",name:"Fund",component:y});var E=new o.a(V),S=a("zL8q"),N=a.n(S);a("tvR6");s.default.use(N.a),s.default.config.productionTip=!1,new s.default({el:"#app",router:E,components:{App:r},template:"<App/>"})},S4WH:function(t,e){},tvR6:function(t,e){},uslO:function(t,e,a){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-SG":"oYA3","./en-SG.js":"oYA3","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./ga":"U5Iz","./ga.js":"U5Iz","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it-ch":"/E8D","./it-ch.js":"/E8D","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ku":"kI9l","./ku.js":"kI9l","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function n(t){return a(r(t))}function r(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(s)},n.resolve=r,t.exports=n,n.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.464507517e2930d48d30.js.map