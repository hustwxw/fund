webpackJsonp([1],{LtzE:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("7+uW"),o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var r=e("VU/8")({name:"App"},o,!1,function(t){e("LtzE")},null,null).exports,a=e("/ocq"),i=e("//Fk"),l=e.n(i),u=e("hU7x"),c=e.n(u),f=e("cpAY"),d=e.n(f),p={name:"nf",data:function(){return{funds:[],loading:!1}},mounted:function(){this.refresh(),setInterval(this.refresh,6e4)},methods:{refresh:function(){var t=this;this.funds=[],this.loading=!0,this.getSHApi().then(function(n){t.funds.push(n),t.loading=!1,t.getApi().then(function(n){t.funds=t.funds.concat(n),t.loading=!1}).catch(function(n){t.loading=!1,console.log(n)})}).catch(function(n){t.loading=!1,console.log(n)})},getSHApi:function(){return new l.a(function(t,n){d()("https://web.sqt.gtimg.cn/utf8/q=sh000001&offset=1,2,3,4,31,32,33,38&r="+Math.random(),{success:function(){var n=window.v_sh000001.split("~");t({jzrq:n[4].substring(0,4)+"-"+n[4].substring(4,6)+"-"+n[4].substring(6,8),dwjz:Number(parseFloat(n[3])-0-parseFloat(n[5])-0).toFixed(2),gsz:Number(parseFloat(n[3])).toFixed(2),gztime:n[4].substring(0,4)+"-"+n[4].substring(4,6)+"-"+n[4].substring(6,8)+" "+n[4].substring(8,10)+":"+n[4].substring(10,12),gszzl:n[6],name:n[1],fundcode:n[2]})},error:function(t){n(t)}})})},getApi:function(){var t=[],n=["202101","160119"];return new l.a(function(e,s){!function o(r){var a;r?(a=r,new l.a(function(t,n){c()("https://fundgz.1234567.com.cn/js/"+a+".js",{param:"rt="+(new Date).valueOf(),name:"jsonpgz"},function(e,s){e?n(new Error(e)):t(s)})})).then(function(e){t.push(e),o(n.pop())}).catch(function(t){s(t)}):e(t)}(n.pop())})}}},g={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("el-row",[e("el-col",{staticStyle:{"margin-bottom":"20px"},attrs:{span:24}},[e("h1",[t._v("南方基金实时估算净值(一分钟刷新一次)")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.refresh}},[e("i",{staticClass:"el-icon-refresh"}),t._v("刷新")])],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.funds,stripe:"",border:""}},[e("el-table-column",{attrs:{prop:"fundcode",label:"基金代码"}}),t._v(" "),e("el-table-column",{attrs:{prop:"name",label:"基金名称"}}),t._v(" "),e("el-table-column",{attrs:{label:"昨日净值"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("div",[t._v(t._s(n.row.dwjz)+"【"+t._s(n.row.jzrq)+"】")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"实时净值（估算）"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("div",[t._v(t._s(n.row.gsz)+"【"+t._s(n.row.gztime)+"】")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"涨跌幅"},scopedSlots:t._u([{key:"default",fn:function(n){return[n.row.gszzl>0?e("div",{staticStyle:{color:"red"}},[t._v(t._s(n.row.gszzl)+"%"),e("i",{staticClass:"el-icon-top"})]):t._e(),t._v(" "),0===n.row.gszzl?e("div",{staticStyle:{color:"black"}},[t._v(t._s(n.row.gszzl)+"%")]):t._e(),t._v(" "),n.row.gszzl<0?e("div",{staticStyle:{color:"green"}},[t._v(t._s(n.row.gszzl)+"%"),e("i",{staticClass:"el-icon-bottom"})]):t._e()]}}])})],1)],1)},staticRenderFns:[]};var v=e("VU/8")(p,g,!1,function(t){e("WYzz")},"data-v-9bbd3e70",null).exports;s.default.use(a.a);var _=new a.a({routes:[{path:"/",name:"nf",component:v}]}),h=e("zL8q"),m=e.n(h);e("tvR6");s.default.use(m.a),s.default.config.productionTip=!1,new s.default({el:"#app",router:_,components:{App:r},template:"<App/>"})},WYzz:function(t,n){},tvR6:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.c49f624f868d8e2ad6cd.js.map