import{S as s,i as t,s as a,e as l,f as e,h as n,d as i,l as r,m as c,B as u,a as h,b as o,a7 as g,a8 as m,a9 as p,n as y,V as d,aa as f,a1 as q}from"./client.ac58d024.js";function v(s,t,a){const l=s.slice();return l[9]=t[a],l}function b(s){let t,a=s[5].toString(),h=[];for(let t=0;t<a.length;t+=1)h[t]=w(v(s,a,t));return{c(){t=l("div");for(let s=0;s<h.length;s+=1)h[s].c();this.h()},l(s){t=e(s,"DIV",{class:!0});var a=n(t);for(let s=0;s<h.length;s+=1)h[s].l(a);a.forEach(i),this.h()},h(){r(t,"class","quantity svelte-1pvmnbw")},m(s,a){c(s,t,a);for(let s=0;s<h.length;s+=1)h[s].m(t,null)},p(s,l){if(32&l){let e;for(a=s[5].toString(),e=0;e<a.length;e+=1){const n=v(s,a,e);h[e]?h[e].p(n,l):(h[e]=w(n),h[e].c(),h[e].m(t,null))}for(;e<h.length;e+=1)h[e].d(1);h.length=a.length}},d(s){s&&i(t),u(h,s)}}}function w(s){let t,a,n;return{c(){t=l("img"),this.h()},l(s){t=e(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){t.src!==(a="numbers/"+s[9]+".png")&&r(t,"src",a),r(t,"alt",n=s[9]),r(t,"class","svelte-1pvmnbw")},m(s,a){c(s,t,a)},p(s,l){32&l&&t.src!==(a="numbers/"+s[9]+".png")&&r(t,"src",a),32&l&&n!==(n=s[9])&&r(t,"alt",n)},d(s){s&&i(t)}}}function $(s){let t,a,u,q,v,w,$,I,x,G,M,S=s[5]>1&&b(s);return{c(){t=l("button"),a=l("img"),v=h(),w=l("img"),x=h(),S&&S.c(),this.h()},l(s){t=e(s,"BUTTON",{style:!0,class:!0});var l=n(t);a=e(l,"IMG",{class:!0,src:!0,alt:!0}),v=o(l),w=e(l,"IMG",{class:!0,src:!0,alt:!0}),x=o(l),S&&S.l(l),l.forEach(i),this.h()},h(){r(a,"class","sprite svelte-1pvmnbw"),a.src!==(u="data:image/png;base64,"+s[0].sprite)&&r(a,"src",u),r(a,"alt",q=s[0].name),g(a,"grey",s[3]),g(a,"shadow",s[2]),r(w,"class","quality svelte-1pvmnbw"),w.src!==($="quality-"+s[4]+".png")&&r(w,"src",$),r(w,"alt",I=m.get(s[4])+" quality"),p(t,"--size",s[6]+"px"),p(t,"--scale",s[1]),r(t,"class","svelte-1pvmnbw")},m(l,e){c(l,t,e),y(t,a),y(t,v),y(t,w),y(t,x),S&&S.m(t,null),G||(M=d(t,"click",s[8]),G=!0)},p(s,[l]){1&l&&a.src!==(u="data:image/png;base64,"+s[0].sprite)&&r(a,"src",u),1&l&&q!==(q=s[0].name)&&r(a,"alt",q),8&l&&g(a,"grey",s[3]),4&l&&g(a,"shadow",s[2]),16&l&&w.src!==($="quality-"+s[4]+".png")&&r(w,"src",$),16&l&&I!==(I=m.get(s[4])+" quality")&&r(w,"alt",I),s[5]>1?S?S.p(s,l):(S=b(s),S.c(),S.m(t,null)):S&&(S.d(1),S=null),64&l&&p(t,"--size",s[6]+"px"),2&l&&p(t,"--scale",s[1])},i:f,o:f,d(s){s&&i(t),S&&S.d(),G=!1,M()}}}function I(s,t,a){let{item:l}=t,{scale:e=2}=t,{shadow:n=!1}=t,{grey:i=!1}=t,{quality:r=0}=t,{quantity:c=1}=t,u=q("item-info-dialog");let h;return s.$$set=s=>{"item"in s&&a(0,l=s.item),"scale"in s&&a(1,e=s.scale),"shadow"in s&&a(2,n=s.shadow),"grey"in s&&a(3,i=s.grey),"quality"in s&&a(4,r=s.quality),"quantity"in s&&a(5,c=s.quantity)},s.$$.update=()=>{3&s.$$.dirty&&a(6,h=(l.isCraftable?32:16)*e)},[l,e,n,i,r,c,h,u,()=>{u.open(l)}]}class x extends s{constructor(s){super(),t(this,s,I,$,a,{item:0,scale:1,shadow:2,grey:3,quality:4,quantity:5})}}export{x as I};
