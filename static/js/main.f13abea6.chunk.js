(this.webpackJsonpbrewser=this.webpackJsonpbrewser||[]).push([[0],{53:function(e,a,t){e.exports=t(63)},63:function(e,a,t){"use strict";t.r(a);var n,r,o,i,c=t(0),l=t.n(c),u=t(16),s=t.n(u),f=t(98),m=t(97),d=t(13),p=t(96),b=t(99),v=t(36);!function(e){e.Coffee="coffee",e.Water="water",e.Ratio="ratio"}(n||(n={})),r=n.Coffee,o=n.Water,i=n.Ratio;var h=function e(a,t){Object(v.a)(this,e),this[r]=void 0,this[o]=void 0,this[i]=void 0,this.coffee=a,this.water=t,this.ratio=t/a},g=t(37),E=t(12),w=t(88),O=t(101),j=t(39),y=t.n(j),C=t(40),k=t.n(C),x=t(86),S=function(e){var a,t,r=e.recipe,o=e.onRecipeChanged,i=Object(c.useState)((a={},Object(E.a)(a,n.Coffee,!1),Object(E.a)(a,n.Water,!1),Object(E.a)(a,n.Ratio,!0),a)),u=Object(d.a)(i,2),s=u[0],f=u[1],m=(t={},Object(E.a)(t,n.Coffee,(function(){return r.water/r.ratio})),Object(E.a)(t,n.Water,(function(){return r.coffee*r.ratio})),Object(E.a)(t,n.Ratio,(function(){return r.water/r.coffee})),t),p=function(e,a){var t=Object(g.a)({},r);for(var n in t){var i=n;t.hasOwnProperty(n)&&(n===e?t[i]=a:s[i]||(t[i]=m[i]()))}o&&o(t)},b=function(e){return l.a.createElement(x.a,{disabled:s[e],onClick:function(){return function(e){var a,t=(a={},Object(E.a)(a,n.Coffee,!1),Object(E.a)(a,n.Water,!1),Object(E.a)(a,n.Ratio,!1),a);t[e]=!0,f(t)}(e)},color:"primary"},s[e]?l.a.createElement(y.a,null):l.a.createElement(k.a,null))};return l.a.createElement(l.a.Fragment,null,b(n.Coffee),l.a.createElement(w.a,{variant:"button"},"Coffee"),l.a.createElement(O.a,{disabled:s.coffee,value:r.coffee,min:1,max:100,onChange:function(e,a){return p(n.Coffee,a)},marks:[{value:r.coffee,label:r.coffee.toFixed(1)+" g"}]}),b(n.Water),l.a.createElement(w.a,{variant:"button"},"Water"),l.a.createElement(O.a,{value:r.water,disabled:s.water,min:10,max:1e3,step:10,onChange:function(e,a){return p(n.Water,a)},marks:[{value:r.water,label:r.water.toFixed()+" ml"}]}),b(n.Ratio),l.a.createElement(w.a,{variant:"button"},"Ratio"),l.a.createElement(O.a,{value:r.ratio,disabled:s.ratio,min:1,max:25,step:.1,onChange:function(e,a){return p(n.Ratio,a)},marks:[{value:r.ratio,label:"1:"+r.ratio.toFixed(2)}]}))},R=t(43),W=t(102),F=t(90),A=t(103),N=t(91),L=t(100),P=t(92),T=t(93),I=t(94),B=t(89),D=t(30),J=t.n(D),M=Object(R.a)((function(e){return Object(W.a)({cardLeft:{marginTop:e.spacing(1),paddingBottom:e.spacing(1),marginRight:e.spacing(1),height:"94%"},cardRight:{marginTop:e.spacing(1),maringLeft:e.spacing(1),height:"94%"},stepper:{marginTop:e.spacing(1),borderRadius:4}})})),U=new Audio("bell.mp3"),q=function(e){var a=e.recipe,t=Object(c.useState)(0),n=Object(d.a)(t,2),r=n[0],o=n[1],i=Object(c.useState)(Array.from(new Array(5),(function(e,t){return 0===t?2.5*a.coffee/a.water:(t+1)/5}))),u=Object(d.a)(i,2),s=u[0],f=u[1],m=Object(c.useState)(),p=Object(d.a)(m,2),v=p[0],h=p[1],g=Object(c.useState)(!1),E=Object(d.a)(g,2),j=E[0],y=E[1],C=s.sort(),k=C.map((function(e){return 5*Math.round(e*a.water/5)})),x=C.map((function(e){return{value:e,label:"".concat(5*Math.round(e*a.water/5)," ml")}})),S=function(){return setInterval((function(){o((function(e){return e+1<225?((e+1)%45===0&&U.play(),e+1):(U.play(),R(),y(!0),0)}))}),1e3)},R=function(){h((function(e){clearInterval(e)}))},W=Math.floor(r/45),D=W+1===C.length,q=k[W]-(0===W?0:k[W-1]),z=k[W+1]-k[W],X=M();return l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,null,"Prepare ",a.coffee.toFixed(1)," g of coffee and rinse your filter."),l.a.createElement(w.a,null,"Pour water in ",new Set(s).size," steps by:"),l.a.createElement(b.a,{marginX:2},l.a.createElement(O.a,{value:s,onChange:function(e,a){return f(a)},valueLabelDisplay:"auto",valueLabelFormat:function(e,t){return((e-(t?s[t-1]:0))*a.water).toFixed()},"aria-labelledby":"range-slider",max:1,step:.001,marks:x})),l.a.createElement(b.a,{display:"flex",justifyContent:"space-between",alignItems:"center"},l.a.createElement(w.a,{variant:"h4"},j?"Done!":J.a.unix(r).format("mm:ss")),l.a.createElement(B.a,{variant:"contained",color:"primary",onClick:function(){return v?R():(h(S()),void y(!1))}},v?"Pause":"Start"),l.a.createElement(B.a,{variant:"contained",color:"primary",onClick:function(){v&&R(),o(0),y(!1)}},"Reset")),l.a.createElement(F.a,{className:X.stepper,variant:"determinate",value:r/225*100,color:"primary"}),l.a.createElement(A.a,{className:X.stepper,activeStep:W,alternativeLabel:!0},x.map((function(e,a){return l.a.createElement(N.a,{key:a},l.a.createElement(L.a,null,e.label))}))),l.a.createElement(P.a,{container:!0},l.a.createElement(P.a,{item:!0,xs:6},l.a.createElement(T.a,{className:X.cardLeft},l.a.createElement(I.a,null,l.a.createElement(w.a,{variant:"h5"},"Step: ",W+1),l.a.createElement(w.a,{variant:"h5"},"Pour: ",q," ml"),l.a.createElement(w.a,{variant:"h5"},"Total: ",x[W].label)))),l.a.createElement(P.a,{item:!0,xs:6},l.a.createElement(T.a,{className:X.cardRight},l.a.createElement(I.a,null,l.a.createElement(w.a,{variant:"h5"},D?"Done":"Next"," in: ",J.a.unix(45-r%45).format("mm:ss")),!D&&l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,{variant:"h5"},"Pour: ",z," ml"),l.a.createElement(w.a,{variant:"h5"},"Total: ",x[W+1].label)))))))},z=t(95),X=function(){var e=localStorage.getItem("recipe"),a=e?JSON.parse(e):new h(20,300),t=Object(c.useState)(a),n=Object(d.a)(t,2),r=n[0],o=n[1],i=Object(z.a)((function(e){return localStorage.setItem("recipe",JSON.stringify(e))}),500,{maxWait:2e3}),u=Object(d.a)(i,1)[0];return l.a.createElement(p.a,{maxWidth:"sm"},l.a.createElement(b.a,null,l.a.createElement(S,{recipe:r,onRecipeChanged:function(e){o(e),u(e)}}),l.a.createElement(q,{recipe:r})))},$=t(44),G=Object($.a)({palette:{primary:{main:"#BB86FC"},secondary:{main:"#03DAC6"},error:{main:"#CF6679"},background:{default:"#212121",paper:"#424242"},text:{primary:"#F5F5F5",secondary:"#E0E0E0"},action:{disabled:"#E0E0E0"}}}),H=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function K(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(l.a.createElement(m.a,{theme:G},l.a.createElement(f.a,null),l.a.createElement(X,null)),document.querySelector("#root")),function(e){if("serviceWorker"in navigator){if(new URL("/brewser",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/brewser","/service-worker.js");H?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):K(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):K(a,e)}))}}()}},[[53,1,2]]]);
//# sourceMappingURL=main.f13abea6.chunk.js.map