import{S as t,i as e,s as l,C as r,a as s,e as a,t as n,c as o,q as c,d as h,b as f,f as i,g as m,h as u,j as g,k as d,l as p,m as $,n as v,o as E,p as b,r as T,u as H,v as x,w as y,x as B,y as D,z as w,A as j,B as z}from"./client.30718474.js";import{T as G}from"./Table.224a101f.js";import{I}from"./ItemButton.af5e1878.js";function A(t,e,l){const r=t.slice();return r[3]=e[l],r}function C(t,e,l){const r=t.slice();return r[6]=e[l],r}function V(t,e,l){const r=t.slice();return r[9]=e[l],r}function k(t){let e,l;return{c(){e=a("th"),l=n("Hearts"),this.h()},l(t){e=i(t,"TH",{role:!0,scope:!0});var r=m(e);l=u(r,"Hearts"),r.forEach(h),this.h()},h(){d(e,"role","columnheader"),d(e,"scope","col")},m(t,r){p(t,e,r),$(e,l)},d(t){t&&h(e)}}}function F(t){let e,l,r=[...Array(t[3].maxHearts).keys()],s=[];for(let e=0;e<r.length;e+=1)s[e]=O(V(t,r,e));return{c(){e=a("td"),l=a("div");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=i(t,"TD",{});var r=m(e);l=i(r,"DIV",{class:!0});var a=m(l);for(let t=0;t<s.length;t+=1)s[t].l(a);a.forEach(h),r.forEach(h),this.h()},h(){d(l,"class","hearts svelte-19t6z6t")},m(t,r){p(t,e,r),$(e,l);for(let t=0;t<s.length;t+=1)s[t].m(l,null)},p(t,e){if(2&e){let a;for(r=[...Array(t[3].maxHearts).keys()],a=0;a<r.length;a+=1){const n=V(t,r,a);s[a]?s[a].p(n,e):(s[a]=O(n),s[a].c(),s[a].m(l,null))}for(;a<s.length;a+=1)s[a].d(1);s.length=r.length}},d(t){t&&h(e),w(s,t)}}}function O(t){let e,l;return{c(){e=a("img"),this.h()},l(t){e=i(t,"IMG",{alt:!0,src:!0,class:!0}),this.h()},h(){d(e,"alt","heart"),e.src!==(l="./images/heart-"+(t[3].hearts>=t[9]+1?"filled":"outline")+".png")&&d(e,"src",l),d(e,"class","svelte-19t6z6t")},m(t,l){p(t,e,l)},p(t,r){2&r&&e.src!==(l="./images/heart-"+(t[3].hearts>=t[9]+1?"filled":"outline")+".png")&&d(e,"src",l)},d(t){t&&h(e)}}}function R(t){let e,l;return e=new I({props:{item:t[6],scale:t[6].isCraftable?1:2}}),{c(){o(e.$$.fragment)},l(t){g(e.$$.fragment,t)},m(t,r){v(e,t,r),l=!0},p(t,l){const r={};2&l&&(r.item=t[6]),2&l&&(r.scale=t[6].isCraftable?1:2),e.$set(r)},i(t){l||(E(e.$$.fragment,t),l=!0)},o(t){b(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function S(t){let e,l,r,o,c,g,v,T,H,x,y,B,G=t[3].name+"",I=t[3].birthday+"",A=null!==t[0]&&F(t),V=t[3].bestGifts,k=[];for(let e=0;e<V.length;e+=1)k[e]=R(C(t,V,e));const O=t=>b(k[t],1,1,(()=>{k[t]=null}));return{c(){e=a("tr"),l=a("th"),r=n(G),o=s(),A&&A.c(),c=s(),g=a("td"),v=n(I),T=s(),H=a("td"),x=a("div");for(let t=0;t<k.length;t+=1)k[t].c();y=s(),this.h()},l(t){e=i(t,"TR",{});var s=m(e);l=i(s,"TH",{scope:!0});var a=m(l);r=u(a,G),a.forEach(h),o=f(s),A&&A.l(s),c=f(s),g=i(s,"TD",{});var n=m(g);v=u(n,I),n.forEach(h),T=f(s),H=i(s,"TD",{});var d=m(H);x=i(d,"DIV",{class:!0});var p=m(x);for(let t=0;t<k.length;t+=1)k[t].l(p);p.forEach(h),d.forEach(h),y=f(s),s.forEach(h),this.h()},h(){d(l,"scope","row"),d(x,"class","best-gifts svelte-19t6z6t")},m(t,s){p(t,e,s),$(e,l),$(l,r),$(e,o),A&&A.m(e,null),$(e,c),$(e,g),$(g,v),$(e,T),$(e,H),$(H,x);for(let t=0;t<k.length;t+=1)k[t].m(x,null);$(e,y),B=!0},p(t,l){if((!B||2&l)&&G!==(G=t[3].name+"")&&D(r,G),null!==t[0]?A?A.p(t,l):(A=F(t),A.c(),A.m(e,c)):A&&(A.d(1),A=null),(!B||2&l)&&I!==(I=t[3].birthday+"")&&D(v,I),2&l){let e;for(V=t[3].bestGifts,e=0;e<V.length;e+=1){const r=C(t,V,e);k[e]?(k[e].p(r,l),E(k[e],1)):(k[e]=R(r),k[e].c(),E(k[e],1),k[e].m(x,null))}for(j(),e=V.length;e<k.length;e+=1)O(e);z()}},i(t){if(!B){for(let t=0;t<V.length;t+=1)E(k[t]);B=!0}},o(t){k=k.filter(Boolean);for(let t=0;t<k.length;t+=1)b(k[t]);B=!1},d(t){t&&h(e),A&&A.d(),w(k,t)}}}function q(t){let e,l,r,o,c,g,v,T,H,x,y,B,D,G,I=null!==t[0]&&k(),C=t[1].filter(J),V=[];for(let e=0;e<C.length;e+=1)V[e]=S(A(t,C,e));const F=t=>b(V[t],1,1,(()=>{V[t]=null}));return{c(){e=a("thead"),l=a("tr"),r=a("th"),o=n("Villager"),c=s(),I&&I.c(),g=s(),v=a("th"),T=n("Birthday"),H=s(),x=a("th"),y=n("Best Gifts"),B=s(),D=a("tbody");for(let t=0;t<V.length;t+=1)V[t].c();this.h()},l(t){e=i(t,"THEAD",{});var s=m(e);l=i(s,"TR",{});var a=m(l);r=i(a,"TH",{role:!0,scope:!0});var n=m(r);o=u(n,"Villager"),n.forEach(h),c=f(a),I&&I.l(a),g=f(a),v=i(a,"TH",{role:!0,scope:!0});var d=m(v);T=u(d,"Birthday"),d.forEach(h),H=f(a),x=i(a,"TH",{role:!0,scope:!0});var p=m(x);y=u(p,"Best Gifts"),p.forEach(h),a.forEach(h),s.forEach(h),B=f(t),D=i(t,"TBODY",{});var $=m(D);for(let t=0;t<V.length;t+=1)V[t].l($);$.forEach(h),this.h()},h(){d(r,"role","columnheader"),d(r,"scope","col"),d(v,"role","columnheader"),d(v,"scope","col"),d(x,"role","columnheader"),d(x,"scope","col")},m(t,s){p(t,e,s),$(e,l),$(l,r),$(r,o),$(l,c),I&&I.m(l,null),$(l,g),$(l,v),$(v,T),$(l,H),$(l,x),$(x,y),p(t,B,s),p(t,D,s);for(let t=0;t<V.length;t+=1)V[t].m(D,null);G=!0},p(t,e){if(null!==t[0]?I||(I=k(),I.c(),I.m(l,g)):I&&(I.d(1),I=null),3&e){let l;for(C=t[1].filter(J),l=0;l<C.length;l+=1){const r=A(t,C,l);V[l]?(V[l].p(r,e),E(V[l],1)):(V[l]=S(r),V[l].c(),E(V[l],1),V[l].m(D,null))}for(j(),l=C.length;l<V.length;l+=1)F(l);z()}},i(t){if(!G){for(let t=0;t<C.length;t+=1)E(V[t]);G=!0}},o(t){V=V.filter(Boolean);for(let t=0;t<V.length;t+=1)b(V[t]);G=!1},d(t){t&&h(e),I&&I.d(),t&&h(B),t&&h(D),w(V,t)}}}function M(t){let e,l;return e=new G({props:{$$slots:{default:[q]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){g(e.$$.fragment,t)},m(t,r){v(e,t,r),l=!0},p(t,l){const r={};4099&l&&(r.$$scope={dirty:l,ctx:t}),e.$set(r)},i(t){l||(E(e.$$.fragment,t),l=!0)},o(t){b(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function Y(t){let e,l,H,x,y,B;return y=new r({props:{outlined:!0,class:"ml-6 mb-6 mr-6",$$slots:{default:[M]},$$scope:{ctx:t}}}),{c(){e=s(),l=a("h4"),H=n("Friendship"),x=s(),o(y.$$.fragment),this.h()},l(t){c('[data-svelte="svelte-17bgxrt"]',document.head).forEach(h),e=f(t),l=i(t,"H4",{class:!0});var r=m(l);H=u(r,"Friendship"),r.forEach(h),x=f(t),g(y.$$.fragment,t),this.h()},h(){document.title="Friendship | Stardew Completionist",d(l,"class","svelte-19t6z6t")},m(t,r){p(t,e,r),p(t,l,r),$(l,H),p(t,x,r),v(y,t,r),B=!0},p(t,[e]){const l={};4099&e&&(l.$$scope={dirty:e,ctx:t}),y.$set(l)},i(t){B||(E(y.$$.fragment,t),B=!0)},o(t){b(y.$$.fragment,t),B=!1},d(t){t&&h(e),t&&h(l),t&&h(x),T(y,t)}}}const J=t=>void 0===t.hearts||t.hearts<t.maxHearts;function K(t,e,l){let r,s;H(t,B,(t=>l(0,r=t)));let a=x(B,(t=>Object.values(y.villagers).map((e=>({...e,hearts:0,maxHearts:e.datable?8:10,given:0,...null==t?void 0:t.relationships[e.name]}))).sort(((t,e)=>t.hearts-e.hearts))));return H(t,a,(t=>l(1,s=t))),[r,s,a]}export default class extends t{constructor(t){super(),e(this,t,K,Y,l,{})}}
