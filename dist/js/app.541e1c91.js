(function(t){function e(e){for(var i,s,o=e[0],d=e[1],l=e[2],u=0,h=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&h.push(a[s][0]),a[s]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(t[i]=d[i]);c&&c(e);while(h.length)h.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var d=n[s];0!==a[d]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={app:0},r=[];function s(t){return o.p+"js/"+({about:"about"}[t]||t)+"."+{about:"60ad7b64"}[t]+".js"}function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,i){n=a[t]=[e,i]}));e.push(n[2]=i);var r,d=document.createElement("script");d.charset="utf-8",d.timeout=120,o.nc&&d.setAttribute("nonce",o.nc),d.src=s(t);var l=new Error;r=function(e){d.onerror=d.onload=null,clearTimeout(u);var n=a[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",l.name="ChunkLoadError",l.type=i,l.request=r,n[1](l)}a[t]=void 0}};var u=setTimeout((function(){r({type:"timeout",target:d})}),12e4);d.onerror=d.onload=r,document.head.appendChild(d)}return Promise.all(e)},o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o.oe=function(t){throw console.error(t),t};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=e,d=d.slice();for(var u=0;u<d.length;u++)e(d[u]);var c=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},1666:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),n("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),n("router-view")],1)},r=[],s=(n("034f"),n("2877")),o={},d=Object(s["a"])(o,a,r,!1,null,null,null),l=d.exports,u=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{staticClass:"inline-left",staticStyle:{"margin-top":"10%"}},[n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doDjikstra(!1)}}},[t._v("Djikstra without diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doDjikstra(!0)}}},[t._v("Djikstra with Diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doBFS(!0)}}},[t._v("BFS with Diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doBFS(!1)}}},[t._v("BFS without Diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doDFS(!0)}}},[t._v("DFS with Diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doDFS(!1)}}},[t._v("DFS without Diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doAStar(!0)}}},[t._v("aStar with Diagonals")]),n("br"),n("button",{attrs:{disabled:!t.editable},on:{click:function(e){return t.doAStar(!1)}}},[t._v("aStar without Diagonals")]),n("br"),n("br"),n("button",{attrs:{disabled:t.editable},on:{click:function(e){return t.reset(!1)}}},[t._v("Reset")]),n("br"),n("button",{attrs:{disabled:t.editable},on:{click:function(e){return t.reset(!0)}}},[t._v("Reset with Walls")])]),n("div",{staticClass:"inline-left"},[n("Grid",{attrs:{data:this.data,editable:t.editable},on:{onClick:t.clicked}})],1),n("div",{staticClass:"inline-right"},[n("div",{staticClass:"section"},[n("p",[n("span",[t._v("Start")]),n("br"),n("label",[t._v("X: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.startPosx,expression:"startPosx"}],staticStyle:{width:"50px"},attrs:{type:"number",disabled:!t.editable,min:0,max:t.gridBaseDimension-1},domProps:{value:t.startPosx},on:{input:function(e){e.target.composing||(t.startPosx=e.target.value)}}}),n("label",[t._v("Y: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.startPosy,expression:"startPosy"}],staticStyle:{width:"50px"},attrs:{type:"number",disabled:!t.editable,min:0,max:t.gridBaseDimension-1},domProps:{value:t.startPosy},on:{input:function(e){e.target.composing||(t.startPosy=e.target.value)}}})]),n("p",[n("span",[t._v("End:")]),n("br"),n("label",[t._v("X: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.endPosx,expression:"endPosx"}],staticStyle:{width:"50px"},attrs:{type:"number",disabled:!t.editable,min:0,max:t.gridBaseDimension-1},domProps:{value:t.endPosx},on:{input:function(e){e.target.composing||(t.endPosx=e.target.value)}}}),n("label",[t._v("Y: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.endPosy,expression:"endPosy"}],staticStyle:{width:"50px"},attrs:{type:"number",disabled:!t.editable,min:0,max:t.gridBaseDimension-1},domProps:{value:t.endPosy},on:{input:function(e){e.target.composing||(t.endPosy=e.target.value)}}})])])])])},h=[],p=(n("caad"),n("2532"),n("7db0"),n("159b"),n("4de4"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"grid",style:{width:t.gridBaseWidth+"px",height:t.gridBaseWidth+"px"},attrs:{id:"container"}},t._l(t.myData,(function(e,i){return n("div",{key:i,staticClass:"cell",class:e.type+(t.editable?" pointer":""),style:{width:t.cellWidth+"px",height:t.cellWidth+"px"},on:{click:function(e){return t.clickCell(i)}}},[t._t("default",null,{cell:e})],2)})),0)}),f=[],v={name:"Grid",props:{data:Array,editable:Boolean},mounted:function(){var t=Math.ceil(Math.sqrt(this.data.length));console.log(t);var e=Math.abs(this.data.length-t*t);console.log(e);for(var n=0;n<e;n++)this.myData.push({type:"empty",id:this.data.length+1})},data:function(){return{gridBaseDimension:Math.ceil(Math.sqrt(this.data.length)),gridBaseWidth:500,myData:this.data}},computed:{cellWidth:function(){return this.gridBaseWidth/this.gridBaseDimension},cellHeight:function(){return this.gridBaseWidth/this.gridBaseDimension}},methods:{clickCell:function(t){if(this.editable){var e=t%this.gridBaseDimension,n=Math.floor(t/this.gridBaseDimension);this.$emit("onClick",{x:e,y:n})}}}},y=v,b=(n("99d9"),Object(s["a"])(y,p,f,!1,null,"d0700174",null)),g=b.exports,m=n("5ef0");function x(t,e,n){return parseInt(e)*n+parseInt(t)}function P(t,e){var n=t%e,i=Math.floor(t/e);return{x:n,y:i}}var w={name:"Home",components:{Grid:g},data:function(){return{types:["empty","start","wall","path","visited","end"],editableTypes:["wall","empty"],data:[],editable:!0,startPosx:0,startPosy:0,endPosx:0,endPosy:0,solutionPath:[],consideredNodes:[],consideredInterval:null,pathInterval:null}},beforeMount:function(){for(var t=100,e=0;e<t;e++)this.data.push({type:"empty",id:this.data.length+1});this.data[0].type="start",this.data[t-1].type="end",this.endPosx=P(t-1,this.gridBaseDimension).x,this.endPosy=P(t-1,this.gridBaseDimension).y},computed:{gridBaseDimension:function(){return console.log(Math.ceil(Math.sqrt(this.data.length))),Math.ceil(Math.sqrt(this.data.length))}},methods:{changeType:function(t,e,n){var i=Math.ceil(Math.sqrt(this.data.length)),a=e*i+t;this.data[a].type=n},clicked:function(t){var e=t.x,n=t.y,i=Math.ceil(Math.sqrt(this.data.length)),a=n*i+e,r=this.data[a].type;if(this.editableTypes.includes(r)){var s=this.editableTypes.indexOf(r),o=this.editableTypes[(s+1)%this.editableTypes.length];this.changeType(e,n,o)}},doDjikstra:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.data.find((function(t){return"start"===t.type})),n=this.data.find((function(t){return"end"===t.type}));if(e&&n){this.editable=!1;var i=Object(m["djikstra"])(this.data,t),a=i.path,r=i.considered;this.animate(r,a)}else alert("Please set start and end")},doBFS:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.data.find((function(t){return"start"===t.type})),n=this.data.find((function(t){return"end"===t.type}));if(e&&n){this.editable=!1;var i=Object(m["BFS"])(this.data,t),a=i.path,r=i.considered;this.animate(r,a)}else alert("Please set start and end")},doDFS:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.data.find((function(t){return"start"===t.type})),n=this.data.find((function(t){return"end"===t.type}));if(e&&n){this.editable=!1;var i=Object(m["DFS"])(this.data,t),a=i.path,r=i.considered;this.animate(r,a)}else alert("Please set start and end")},doAStar:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.data.find((function(t){return"start"===t.type})),n=this.data.find((function(t){return"end"===t.type}));if(e&&n){this.editable=!1;var i=Object(m["aStar"])(this.data,t),a=i.path,r=i.considered;this.animate(r,a)}else alert("Please set start and end")},animate:function(t,e){var n=this;this.solutionPath=e,this.consideredNodes=t,this.consideredInterval=setInterval((function(){0===t.length&&(clearInterval(n.consideredInterval),n.pathInterval=setInterval((function(){0===e.length&&clearInterval(n.pathInterval);var t=e.shift();t&&n.changeType(t.y,t.x,"path")}),50));var i=t.shift();i&&n.changeType(i.y,i.x,"visited")}),50)},reset:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.data.forEach((function(e){t&&"wall"===e.type||(e.type="empty")}));var e=x(this.startPosx,this.startPosy,this.gridBaseDimension),n=x(this.endPosx,this.endPosy,this.gridBaseDimension);this.data[e].type="start",this.data[n].type="end",this.solutionPath=[],this.consideredNodes=[],clearInterval(this.consideredInterval),clearInterval(this.pathInterval),this.editable=!0}},watch:{startPosx:function(t){try{this.data.filter((function(t){return"start"===t.type}))[0].type="empty"}catch(e){console.log(e)}this.data[x(t,this.startPosy,this.gridBaseDimension)].type="start"},startPosy:function(t){try{this.data.filter((function(t){return"start"===t.type}))[0].type="empty"}catch(e){console.log(e)}this.data[x(this.startPosx,t,this.gridBaseDimension)].type="start"},endPosx:function(t){try{this.data.filter((function(t){return"end"===t.type}))[0].type="empty"}catch(e){console.log(e)}this.data[x(t,this.endPosy,this.gridBaseDimension)].type="end"},endPosy:function(t){try{this.data.filter((function(t){return"end"===t.type}))[0].type="empty"}catch(e){console.log(e)}this.data[x(this.endPosx,t,this.gridBaseDimension)].type="end"}}},D=w,k=(n("924b"),Object(s["a"])(D,c,h,!1,null,"721977c1",null)),S=k.exports;i["a"].use(u["a"]);var _=[{path:"/",name:"Home",component:S},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],B=new u["a"]({routes:_}),j=B;i["a"].config.productionTip=!1,new i["a"]({router:j,render:function(t){return t(l)}}).$mount("#app")},"5ef0":function(t,e,n){function i(t){for(var e=[],n=Math.sqrt(t.length),i=0;i<n;i++){for(var a=[],r=0;r<n;r++){a.push(t[i*n+r]);var s=t[i*n+r];s.x=i,s.y=r}e.push(a)}return e}function a(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=["empty","end","start"],a=[];return t.x>0&&i.includes(e[t.x-1][t.y].type)&&a.push(e[t.x-1][t.y]),t.x<e.length-1&&i.includes(e[t.x+1][t.y].type)&&a.push(e[t.x+1][t.y]),t.y>0&&i.includes(e[t.x][t.y-1].type)&&a.push(e[t.x][t.y-1]),t.y<e.length-1&&i.includes(e[t.x][t.y+1].type)&&a.push(e[t.x][t.y+1]),n&&(t.x>0&&t.y>0&&i.includes(e[t.x-1][t.y-1].type)&&a.push(e[t.x-1][t.y-1]),t.x<e.length-1&&t.y<e.length-1&&i.includes(e[t.x+1][t.y+1].type)&&a.push(e[t.x+1][t.y+1]),t.x>0&&t.y<e.length-1&&i.includes(e[t.x-1][t.y+1].type)&&a.push(e[t.x-1][t.y+1]),t.x<e.length-1&&t.y>0&&i.includes(e[t.x+1][t.y-1].type)&&a.push(e[t.x+1][t.y-1])),a}function r(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.find((function(t){return"start"===t.type})),r=t.find((function(t){return"end"===t.type})),s=i(t),o=[n],d=[],l={},u=[],c={};l[n.id]=0,c[n.id]=n;while(o.length>0){var h=o.shift();if(h.id===r.id){u=[r];var p=c[r.id];while(p.id!==n.id)u.push(p),p=c[p.id];u.push(n);break}d.push(h);for(var f=a(h,s,e),v=0;v<f.length;v++){var y=f[v];d.includes(y)||o.includes(y)||(o.push(y),l[y.id]=l[h.id]+1,c[y.id]=h)}}return{path:u.reverse(),considered:d}}function s(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.find((function(t){return"start"===t.type})),r=t.find((function(t){return"end"===t.type})),s=i(t),o=[n],d=[],l={},u=[],c={};l[n.id]=0,c[n.id]=n;while(o.length>0){var h=o.shift();if(h.id===r.id){u=[r];var p=c[r.id];while(p.id!==n.id)u.push(p),p=c[p.id];u.push(n);break}d.push(h);for(var f=a(h,s,e),v=0;v<f.length;v++){var y=f[v];d.includes(y)||o.includes(y)||(o.push(y),l[y.id]=l[h.id]+1,c[y.id]=h)}}return{path:u.reverse(),considered:d}}function o(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.find((function(t){return"start"===t.type})),r=t.find((function(t){return"end"===t.type})),s=i(t),o=[n],d=[],l={},u=[],c={};l[n.id]=0,c[n.id]=n;while(o.length>0){console.log("Stack: ",o.map((function(t){return t.id})));var h=o.pop();if(h.id===r.id){u=[r];var p=c[r.id];while(p.id!==n.id)u.push(p),p=c[p.id];u.push(n);break}d.push(h);for(var f=a(h,s,e),v=0;v<f.length;v++){var y=f[v];d.includes(y)||o.includes(y)||(o.push(y),l[y.id]=l[h.id]+1,c[y.id]=h)}}return{path:u.reverse(),considered:d}}function d(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];function n(t){return Math.abs(t.x-s.x)+Math.abs(t.y-s.y)}var r=t.find((function(t){return"start"===t.type})),s=t.find((function(t){return"end"===t.type})),o=i(t),d=[r],l=[],u={},c=[],h={};u[r.id]=0,h[r.id]=r,r.f=n(r);while(d.length>0){console.log("Queue: ",d.map((function(t){return t.id})));var p=d.sort((function(t,e){return t.f-e.f})).shift();if(p.id===s.id){c=[s];var f=h[s.id];while(f.id!==r.id)c.push(f),f=h[f.id];c.push(r);break}l.push(p);for(var v=a(p,o,e),y=0;y<v.length;y++){var b=v[y];l.includes(b)||d.includes(b)||(d.push(b),u[b.id]=u[p.id]+1,h[b.id]=p,b.f=u[b.id]+n(b))}}return{path:c.reverse(),considered:l}}n("caad"),n("7db0"),n("d3b7"),n("2532"),n("d81d"),n("4e82"),t.exports={djikstra:r,BFS:s,DFS:o,aStar:d}},"85ec":function(t,e,n){},"924b":function(t,e,n){"use strict";n("1666")},"99d9":function(t,e,n){"use strict";n("9e76")},"9e76":function(t,e,n){}});
//# sourceMappingURL=app.541e1c91.js.map