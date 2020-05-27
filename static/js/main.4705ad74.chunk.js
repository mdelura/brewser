(this.webpackJsonpbrewser=this.webpackJsonpbrewser||[]).push([[0],{51:function(e,a,t){e.exports=t(61)},61:function(e,a,t){"use strict";t.r(a);var n,r,o,i,c=t(0),l=t.n(c),u=t(15),s=t.n(u),f=t(94),m=t(93),d=t(11),p=t(92),b=t(95),v=t(36);!function(e){e.Coffee="coffee",e.Water="water",e.Ratio="ratio"}(n||(n={})),r=n.Coffee,o=n.Water,i=n.Ratio;var h=function e(a,t){Object(v.a)(this,e),this[r]=void 0,this[o]=void 0,this[i]=void 0,this.coffee=a,this.water=t,this.ratio=t/a},g=t(37),E=t(7),w=t(85),j=t(97),O=t(39),y=t.n(O),C=t(40),k=t.n(C),x=t(83),R=function(e){var a,t,r=e.recipe,o=e.onRecipeChanged,i=Object(c.useState)((a={},Object(E.a)(a,n.Coffee,!1),Object(E.a)(a,n.Water,!1),Object(E.a)(a,n.Ratio,!0),a)),u=Object(d.a)(i,2),s=u[0],f=u[1],m=(t={},Object(E.a)(t,n.Coffee,(function(){return r.water/r.ratio})),Object(E.a)(t,n.Water,(function(){return r.coffee*r.ratio})),Object(E.a)(t,n.Ratio,(function(){return r.water/r.coffee})),t),p=function(e,a){var t=Object(g.a)({},r);for(var n in t){var i=n;t.hasOwnProperty(n)&&(n===e?t[i]=a:s[i]||(t[i]=m[i]()))}o&&o(t)},b=function(e){return l.a.createElement(x.a,{disabled:s[e],onClick:function(){return function(e){var a,t=(a={},Object(E.a)(a,n.Coffee,!1),Object(E.a)(a,n.Water,!1),Object(E.a)(a,n.Ratio,!1),a);t[e]=!0,f(t)}(e)},color:"primary"},s[e]?l.a.createElement(y.a,null):l.a.createElement(k.a,null))};return l.a.createElement(l.a.Fragment,null,b(n.Coffee),l.a.createElement(w.a,{variant:"button"},"Coffee"),l.a.createElement(j.a,{disabled:s.coffee,value:r.coffee,min:1,max:100,onChange:function(e,a){return p(n.Coffee,a)},marks:[{value:r.coffee,label:r.coffee.toFixed(1)+" g"}]}),b(n.Water),l.a.createElement(w.a,{variant:"button"},"Water"),l.a.createElement(j.a,{value:r.water,disabled:s.water,min:10,max:1e3,step:10,onChange:function(e,a){return p(n.Water,a)},marks:[{value:r.water,label:r.water.toFixed()+" ml"}]}),b(n.Ratio),l.a.createElement(w.a,{variant:"button"},"Ratio"),l.a.createElement(j.a,{value:r.ratio,disabled:s.ratio,min:1,max:25,step:.1,onChange:function(e,a){return p(n.Ratio,a)},marks:[{value:r.ratio,label:"1:"+r.ratio.toFixed(2)}]}))},W=t(41),S=t(98),F=t(87),A=t(99),L=t(88),P=t(96),N=t(89),T=t(90),B=t(91),D=t(86),I=t(28),M=t.n(I),U=Object(W.a)((function(e){return Object(S.a)({cardLeft:{marginTop:e.spacing(1),paddingBottom:e.spacing(1),marginRight:e.spacing(1),height:"94%"},cardRight:{marginTop:e.spacing(1),maringLeft:e.spacing(1),height:"94%"},stepper:{marginTop:e.spacing(1),borderRadius:4}})})),J=new Audio("bell.mp3"),q=function(e){var a=e.recipe,t=Object(c.useState)(0),n=Object(d.a)(t,2),r=n[0],o=n[1],i=Object(c.useState)(Array.from(new Array(5),(function(e,t){return 0===t?2.5*a.coffee/a.water:(t+1)/5}))),u=Object(d.a)(i,2),s=u[0],f=u[1],m=Object(c.useState)(),p=Object(d.a)(m,2),v=p[0],h=p[1],g=Object(c.useState)(!1),E=Object(d.a)(g,2),O=E[0],y=E[1],C=s.sort(),k=C.map((function(e){return 5*Math.round(e*a.water/5)})),x=C.map((function(e){return{value:e,label:"".concat(5*Math.round(e*a.water/5)," ml")}})),R=function(){return setInterval((function(){o((function(e){return e+1<225?((e+1)%45===0&&J.play(),e+1):(J.play(),W(),y(!0),0)}))}),1e3)},W=function(){h((function(e){clearInterval(e)}))},S=Math.floor(r/45),I=S+1===C.length,q=k[S]-(0===S?0:k[S-1]),z=k[S+1]-k[S],X=U();return l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,null,"Prepare ",a.coffee.toFixed(1)," g of coffee and rinse your filter."),l.a.createElement(w.a,null,"Pour water in ",new Set(s).size," steps by:"),l.a.createElement(b.a,{marginX:2},l.a.createElement(j.a,{value:s,onChange:function(e,a){return f(a)},valueLabelDisplay:"auto",valueLabelFormat:function(e,t){return((e-(t?s[t-1]:0))*a.water).toFixed()},"aria-labelledby":"range-slider",max:1,step:.001,marks:x})),l.a.createElement(b.a,{display:"flex",justifyContent:"space-between",alignItems:"center"},l.a.createElement(w.a,{variant:"h4"},O?"Done!":M.a.unix(r).format("mm:ss")),l.a.createElement(D.a,{variant:"contained",color:"primary",onClick:function(){return v?W():(h(R()),void y(!1))}},v?"Pause":"Start"),l.a.createElement(D.a,{variant:"contained",color:"primary",onClick:function(){v&&W(),o(0),y(!1)}},"Reset")),l.a.createElement(F.a,{className:X.stepper,variant:"determinate",value:r/225*100,color:"primary"}),l.a.createElement(A.a,{className:X.stepper,activeStep:S,alternativeLabel:!0},x.map((function(e,a){return l.a.createElement(L.a,{key:a},l.a.createElement(P.a,null,e.label))}))),l.a.createElement(N.a,{container:!0},l.a.createElement(N.a,{item:!0,xs:6},l.a.createElement(T.a,{className:X.cardLeft},l.a.createElement(B.a,null,l.a.createElement(w.a,{variant:"h5"},"Step: ",S+1),l.a.createElement(w.a,{variant:"h5"},"Pour: ",q," ml"),l.a.createElement(w.a,{variant:"h5"},"Total: ",x[S].label)))),l.a.createElement(N.a,{item:!0,xs:6},l.a.createElement(T.a,{className:X.cardRight},l.a.createElement(B.a,null,l.a.createElement(w.a,{variant:"h5"},I?"Done":"Next"," in: ",M.a.unix(45-r%45).format("mm:ss")),!I&&l.a.createElement(l.a.Fragment,null,l.a.createElement(w.a,{variant:"h5"},"Pour: ",z," ml"),l.a.createElement(w.a,{variant:"h5"},"Total: ",x[S+1].label)))))))},z=function(){var e=Object(c.useState)(new h(20,300)),a=Object(d.a)(e,2),t=a[0],n=a[1];return l.a.createElement(p.a,{maxWidth:"sm"},l.a.createElement(b.a,null,l.a.createElement(R,{recipe:t,onRecipeChanged:n}),l.a.createElement(q,{recipe:t})))},X=t(42),$=Object(X.a)({palette:{primary:{main:"#BB86FC"},secondary:{main:"#03DAC6"},error:{main:"#CF6679"},background:{default:"#212121",paper:"#424242"},text:{primary:"#F5F5F5",secondary:"#E0E0E0"},action:{disabled:"#E0E0E0"}}}),G=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function H(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(l.a.createElement(m.a,{theme:$},l.a.createElement(f.a,null),l.a.createElement(z,null)),document.querySelector("#root")),function(e){if("serviceWorker"in navigator){if(new URL("/brewser",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/brewser","/service-worker.js");G?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):H(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):H(a,e)}))}}()}},[[51,1,2]]]);
//# sourceMappingURL=main.4705ad74.chunk.js.map