webpackJsonp([1],{"1/oy":function(t,n){},"9M+g":function(t,n){},GfHa:function(t,n){},Id91:function(t,n){},Jmt5:function(t,n){},NHnr:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=o("7+uW"),r={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var i=o("VU/8")({name:"App"},r,!1,function(t){o("Pe99")},null,null).exports,s=o("/ocq"),a={name:"HelloWorld",data:function(){return{msg:"로그인 이동",show:!0,form:{id:"",pw:""}}},mounted:function(){this.$refs.id.focus()},methods:{loginMove:function(t){this.$router.push("/Login")},onSubmit:function(){var t=this;console.log("onSubmit");var n={id:this.form.id,pw:this.form.pw};this.$http.post("/api/login",n).then(function(n){console.log("res:",n.data.res),1==n.data.res?t.$router.push("/Login"):(t.form.id="",t.form.pw="",alert("잘못된 정보입니다. 다시 입력해 주세요."),t.$refs.id.focus())}).catch(function(t){console.log("error")})}}},u={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"hello"},[o("div",{staticClass:"loginBox"},[t.show?o("b-form",{on:{submit:t.onSubmit}},[o("b-form-group",{attrs:{id:"inputGroup",label:"관리자 로그인","label-for":"input1"}},[o("b-form-input",{ref:"id",staticClass:"front_input",attrs:{id:"exampleInput1",type:"text",required:"",placeholder:"아이디 입력"},model:{value:t.form.id,callback:function(n){t.$set(t.form,"id",n)},expression:"form.id"}}),t._v(" "),o("b-form-input",{staticClass:"front_input",attrs:{id:"exampleInput2",type:"password",required:"",placeholder:"비밀번호 입력"},model:{value:t.form.pw,callback:function(n){t.$set(t.form,"pw",n)},expression:"form.pw"}})],1),t._v(" "),o("b-button",{attrs:{variant:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.msg))])],1):t._e()],1)])},staticRenderFns:[]};var c=o("VU/8")(a,u,!1,function(t){o("jtSy")},"data-v-b600fd1c",null).exports,l={name:"Login",data:function(){return{msg:"로그인"}},mounted:function(){var t=this;this.$http.get("/api/session").then(function(n){console.log("res:",n.data.res),0==n.data.res&&t.$router.push("/")})}},p={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"login"},[n("b-button",[this._v(this._s(this.msg))])],1)},staticRenderFns:[]};var f=o("VU/8")(l,p,!1,function(t){o("ZWxN")},"data-v-1ffd19bc",null).exports;e.a.use(s.a);var d=new s.a({mode:"history",routes:[{path:"/",name:"HelloWorld",component:c},{path:"/Login",name:"Login",component:f}]}),m=o("e6fC"),h=(o("Jmt5"),o("9M+g"),o("mtWM")),v=o.n(h);e.a.prototype.$http=v.a,e.a.use(m.a),e.a.config.productionTip=!1,new e.a({el:"#app",router:d,components:{App:i},template:"<App/>"})},Pe99:function(t,n){},ZWxN:function(t,n){},jtSy:function(t,n){},zj2Q:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.2163fb47b95d3d366391.js.map