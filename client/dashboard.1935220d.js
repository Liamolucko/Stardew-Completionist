import{S as t,i as e,s,a as n,e as r,t as l,y as o,q as a,d as c,b as $,f as i,g as f,h as m,k as u,l as d,m as h,p as g,A as p,o as v,u as b,v as x,z as y,w,x as j,aa as O,ab as D,c as I,j as B,n as E,r as C,C as H,B as G}from"./client.25ffd2d6.js";import"../../../../../jimp.min.js";import{D as V,H as S,B as q,R as k,C as A}from"./Cell.715f3b38.js";import{I as M}from"./ItemButton.01626b1b.js";function N(t,e,s){const n=t.slice();return n[6]=e[s][0],n[7]=e[s][1],n}function W(t,e,s){const n=t.slice();return n[10]=e[s],n}function z(t,e,s){const n=t.slice();return n[13]=e[s],n}function P(t,e,s){const n=t.slice();return n[16]=e[s],n}function R(t){let e,s;return{c(){e=r("p"),s=l("When you select a save file, this section shows information about what you\n    should do next."),this.h()},l(t){e=i(t,"P",{class:!0});var n=f(e);s=m(n,"When you select a save file, this section shows information about what you\n    should do next."),n.forEach(c),this.h()},h(){u(e,"class","no-save svelte-1ho641m")},m(t,n){d(t,e,n),h(e,s)},p:O,i:O,o:O,d(t){t&&c(e)}}}function F(t){let e,s,o,a,b,x,w,j,O,S=D.get(t[0].currentSeason)+"";s=new V({props:{$$slots:{default:[lt]},$$scope:{ctx:t}}});let q=Object.entries(t[2]),k=[];for(let e=0;e<q.length;e+=1)k[e]=ot(N(t,q,e));const A=t=>g(k[t],1,1,(()=>{k[t]=null}));return{c(){e=r("div"),I(s.$$.fragment),o=n(),a=r("div"),b=r("h2"),x=l(S),w=n(),j=r("div");for(let t=0;t<k.length;t+=1)k[t].c();this.h()},l(t){e=i(t,"DIV",{class:!0});var n=f(e);B(s.$$.fragment,n),o=$(n),a=i(n,"DIV",{class:!0});var r=f(a);b=i(r,"H2",{class:!0});var l=f(b);x=m(l,S),l.forEach(c),w=$(r),j=i(r,"DIV",{class:!0});var u=f(j);for(let t=0;t<k.length;t+=1)k[t].l(u);u.forEach(c),r.forEach(c),n.forEach(c),this.h()},h(){u(b,"class","mdc-typography--headline6 svelte-1ho641m"),u(j,"class","seasonal-items svelte-1ho641m"),u(a,"class","mdc-card mdc-card--outlined seasonal svelte-1ho641m"),u(e,"class","container svelte-1ho641m")},m(t,n){d(t,e,n),E(s,e,null),h(e,o),h(e,a),h(a,b),h(b,x),h(a,w),h(a,j);for(let t=0;t<k.length;t+=1)k[t].m(j,null);O=!0},p(t,e){const n={};if(524290&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n),(!O||1&e)&&S!==(S=D.get(t[0].currentSeason)+"")&&H(x,S),4&e){let s;for(q=Object.entries(t[2]),s=0;s<q.length;s+=1){const n=N(t,q,s);k[s]?(k[s].p(n,e),v(k[s],1)):(k[s]=ot(n),k[s].c(),v(k[s],1),k[s].m(j,null))}for(y(),s=q.length;s<k.length;s+=1)A(s);p()}},i(t){if(!O){v(s.$$.fragment,t);for(let t=0;t<q.length;t+=1)v(k[t]);O=!0}},o(t){g(s.$$.fragment,t),k=k.filter(Boolean);for(let t=0;t<k.length;t+=1)g(k[t]);O=!1},d(t){t&&c(e),C(s),G(k,t)}}}function J(t){let e;return{c(){e=l("Villager")},l(t){e=m(t,"Villager")},m(t,s){d(t,e,s)},d(t){t&&c(e)}}}function K(t){let e;return{c(){e=l("Hearts")},l(t){e=m(t,"Hearts")},m(t,s){d(t,e,s)},d(t){t&&c(e)}}}function L(t){let e;return{c(){e=l("Birthday")},l(t){e=m(t,"Birthday")},m(t,s){d(t,e,s)},d(t){t&&c(e)}}}function Q(t){let e;return{c(){e=l("Best Gifts")},l(t){e=m(t,"Best Gifts")},m(t,s){d(t,e,s)},d(t){t&&c(e)}}}function T(t){let e,s,r,l,o,a,i,f;return e=new A({props:{$$slots:{default:[J]},$$scope:{ctx:t}}}),r=new A({props:{$$slots:{default:[K]},$$scope:{ctx:t}}}),o=new A({props:{$$slots:{default:[L]},$$scope:{ctx:t}}}),i=new A({props:{$$slots:{default:[Q]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment),s=n(),I(r.$$.fragment),l=n(),I(o.$$.fragment),a=n(),I(i.$$.fragment)},l(t){B(e.$$.fragment,t),s=$(t),B(r.$$.fragment,t),l=$(t),B(o.$$.fragment,t),a=$(t),B(i.$$.fragment,t)},m(t,n){E(e,t,n),d(t,s,n),E(r,t,n),d(t,l,n),E(o,t,n),d(t,a,n),E(i,t,n),f=!0},p(t,s){const n={};524288&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n);const l={};524288&s&&(l.$$scope={dirty:s,ctx:t}),r.$set(l);const a={};524288&s&&(a.$$scope={dirty:s,ctx:t}),o.$set(a);const c={};524288&s&&(c.$$scope={dirty:s,ctx:t}),i.$set(c)},i(t){f||(v(e.$$.fragment,t),v(r.$$.fragment,t),v(o.$$.fragment,t),v(i.$$.fragment,t),f=!0)},o(t){g(e.$$.fragment,t),g(r.$$.fragment,t),g(o.$$.fragment,t),g(i.$$.fragment,t),f=!1},d(t){C(e,t),t&&c(s),C(r,t),t&&c(l),C(o,t),t&&c(a),C(i,t)}}}function U(t){let e,s;return e=new k({props:{$$slots:{default:[T]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){E(e,t,n),s=!0},p(t,s){const n={};524288&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(v(e.$$.fragment,t),s=!0)},o(t){g(e.$$.fragment,t),s=!1},d(t){C(e,t)}}}function X(t){let e,s=t[10].villager+"";return{c(){e=l(s)},l(t){e=m(t,s)},m(t,s){d(t,e,s)},p(t,n){2&n&&s!==(s=t[10].villager+"")&&H(e,s)},d(t){t&&c(e)}}}function Y(t){let e,s;return{c(){e=r("img"),this.h()},l(t){e=i(t,"IMG",{alt:!0,src:!0,class:!0}),this.h()},h(){u(e,"alt","heart"),e.src!==(s="heart-"+(t[10].hearts>=t[16]+1?"filled":"outline")+".png")&&u(e,"src",s),u(e,"class","svelte-1ho641m")},m(t,s){d(t,e,s)},p(t,n){2&n&&e.src!==(s="heart-"+(t[10].hearts>=t[16]+1?"filled":"outline")+".png")&&u(e,"src",s)},d(t){t&&c(e)}}}function Z(t){let e,s=[...Array(t[10].maxHearts).keys()],n=[];for(let e=0;e<s.length;e+=1)n[e]=Y(P(t,s,e));return{c(){e=r("div");for(let t=0;t<n.length;t+=1)n[t].c();this.h()},l(t){e=i(t,"DIV",{class:!0});var s=f(e);for(let t=0;t<n.length;t+=1)n[t].l(s);s.forEach(c),this.h()},h(){u(e,"class","hearts svelte-1ho641m")},m(t,s){d(t,e,s);for(let t=0;t<n.length;t+=1)n[t].m(e,null)},p(t,r){if(2&r){let l;for(s=[...Array(t[10].maxHearts).keys()],l=0;l<s.length;l+=1){const o=P(t,s,l);n[l]?n[l].p(o,r):(n[l]=Y(o),n[l].c(),n[l].m(e,null))}for(;l<n.length;l+=1)n[l].d(1);n.length=s.length}},d(t){t&&c(e),G(n,t)}}}function _(t){let e,s=t[10].date+"";return{c(){e=l(s)},l(t){e=m(t,s)},m(t,s){d(t,e,s)},p(t,n){2&n&&s!==(s=t[10].date+"")&&H(e,s)},d(t){t&&c(e)}}}function tt(t){let e,s;return e=new M({props:{item:t[13],scale:t[13].isCraftable?1:2}}),{c(){I(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){E(e,t,n),s=!0},p(t,s){const n={};2&s&&(n.item=t[13]),2&s&&(n.scale=t[13].isCraftable?1:2),e.$set(n)},i(t){s||(v(e.$$.fragment,t),s=!0)},o(t){g(e.$$.fragment,t),s=!1},d(t){C(e,t)}}}function et(t){let e,s,n=t[10].bestGifts,l=[];for(let e=0;e<n.length;e+=1)l[e]=tt(z(t,n,e));const o=t=>g(l[t],1,1,(()=>{l[t]=null}));return{c(){e=r("div");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=i(t,"DIV",{class:!0});var s=f(e);for(let t=0;t<l.length;t+=1)l[t].l(s);s.forEach(c),this.h()},h(){u(e,"class","best-gifts svelte-1ho641m")},m(t,n){d(t,e,n);for(let t=0;t<l.length;t+=1)l[t].m(e,null);s=!0},p(t,s){if(2&s){let r;for(n=t[10].bestGifts,r=0;r<n.length;r+=1){const o=z(t,n,r);l[r]?(l[r].p(o,s),v(l[r],1)):(l[r]=tt(o),l[r].c(),v(l[r],1),l[r].m(e,null))}for(y(),r=n.length;r<l.length;r+=1)o(r);p()}},i(t){if(!s){for(let t=0;t<n.length;t+=1)v(l[t]);s=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)g(l[t]);s=!1},d(t){t&&c(e),G(l,t)}}}function st(t){let e,s,r,l,o,a,i,f,m;return e=new A({props:{$$slots:{default:[X]},$$scope:{ctx:t}}}),r=new A({props:{$$slots:{default:[Z]},$$scope:{ctx:t}}}),o=new A({props:{$$slots:{default:[_]},$$scope:{ctx:t}}}),i=new A({props:{$$slots:{default:[et]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment),s=n(),I(r.$$.fragment),l=n(),I(o.$$.fragment),a=n(),I(i.$$.fragment),f=n()},l(t){B(e.$$.fragment,t),s=$(t),B(r.$$.fragment,t),l=$(t),B(o.$$.fragment,t),a=$(t),B(i.$$.fragment,t),f=$(t)},m(t,n){E(e,t,n),d(t,s,n),E(r,t,n),d(t,l,n),E(o,t,n),d(t,a,n),E(i,t,n),d(t,f,n),m=!0},p(t,s){const n={};524290&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n);const l={};524290&s&&(l.$$scope={dirty:s,ctx:t}),r.$set(l);const a={};524290&s&&(a.$$scope={dirty:s,ctx:t}),o.$set(a);const c={};524290&s&&(c.$$scope={dirty:s,ctx:t}),i.$set(c)},i(t){m||(v(e.$$.fragment,t),v(r.$$.fragment,t),v(o.$$.fragment,t),v(i.$$.fragment,t),m=!0)},o(t){g(e.$$.fragment,t),g(r.$$.fragment,t),g(o.$$.fragment,t),g(i.$$.fragment,t),m=!1},d(t){C(e,t),t&&c(s),C(r,t),t&&c(l),C(o,t),t&&c(a),C(i,t),t&&c(f)}}}function nt(t){let e,s;return e=new k({props:{$$slots:{default:[st]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){E(e,t,n),s=!0},p(t,s){const n={};524290&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(v(e.$$.fragment,t),s=!0)},o(t){g(e.$$.fragment,t),s=!1},d(t){C(e,t)}}}function rt(t){let e,s,n=t[1],r=[];for(let e=0;e<n.length;e+=1)r[e]=nt(W(t,n,e));const l=t=>g(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=o()},l(t){for(let e=0;e<r.length;e+=1)r[e].l(t);e=o()},m(t,n){for(let e=0;e<r.length;e+=1)r[e].m(t,n);d(t,e,n),s=!0},p(t,s){if(2&s){let o;for(n=t[1],o=0;o<n.length;o+=1){const l=W(t,n,o);r[o]?(r[o].p(l,s),v(r[o],1)):(r[o]=nt(l),r[o].c(),v(r[o],1),r[o].m(e.parentNode,e))}for(y(),o=n.length;o<r.length;o+=1)l(o);p()}},i(t){if(!s){for(let t=0;t<n.length;t+=1)v(r[t]);s=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)g(r[t]);s=!1},d(t){G(r,t),t&&c(e)}}}function lt(t){let e,s,r,l;return e=new S({props:{$$slots:{default:[U]},$$scope:{ctx:t}}}),r=new q({props:{$$slots:{default:[rt]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment),s=n(),I(r.$$.fragment)},l(t){B(e.$$.fragment,t),s=$(t),B(r.$$.fragment,t)},m(t,n){E(e,t,n),d(t,s,n),E(r,t,n),l=!0},p(t,s){const n={};524288&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n);const l={};524290&s&&(l.$$scope={dirty:s,ctx:t}),r.$set(l)},i(t){l||(v(e.$$.fragment,t),v(r.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),g(r.$$.fragment,t),l=!1},d(t){C(e,t),t&&c(s),C(r,t)}}}function ot(t){let e,s;return e=new M({props:{item:w.items[t[6]],scale:w.items[t[6]].isCraftable?2:3,quantity:t[7]}}),{c(){I(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){E(e,t,n),s=!0},p(t,s){const n={};4&s&&(n.item=w.items[t[6]]),4&s&&(n.scale=w.items[t[6]].isCraftable?2:3),4&s&&(n.quantity=t[7]),e.$set(n)},i(t){s||(v(e.$$.fragment,t),s=!0)},o(t){g(e.$$.fragment,t),s=!1},d(t){C(e,t)}}}function at(t){let e,s,b,x,w,j,O,D;const I=[F,R],B=[];function E(t,e){return null!==t[0]?0:1}return w=E(t),j=B[w]=I[w](t),{c(){e=n(),s=r("h1"),b=l("Dashboard"),x=n(),j.c(),O=o(),this.h()},l(t){a('[data-svelte="svelte-qmib3v"]',document.head).forEach(c),e=$(t),s=i(t,"H1",{class:!0});var n=f(s);b=m(n,"Dashboard"),n.forEach(c),x=$(t),j.l(t),O=o(),this.h()},h(){document.title="Dashboard | Stardew Completionist",u(s,"class","title mdc-typography--headline4 svelte-1ho641m")},m(t,n){d(t,e,n),d(t,s,n),h(s,b),d(t,x,n),B[w].m(t,n),d(t,O,n),D=!0},p(t,[e]){let s=w;w=E(t),w===s?B[w].p(t,e):(y(),g(B[s],1,1,(()=>{B[s]=null})),p(),j=B[w],j?j.p(t,e):(j=B[w]=I[w](t),j.c()),v(j,1),j.m(O.parentNode,O))},i(t){D||(v(j),D=!0)},o(t){g(j),D=!1},d(t){t&&c(e),t&&c(s),t&&c(x),B[w].d(t),t&&c(O)}}}function ct(t,e,s){let n,r,l;b(t,j,(t=>s(0,n=t)));const o=x(j,((t,e)=>{null!==t&&e(Object.values(w.villagers).sort(((e,s)=>(e.birthDate-t.currentDate+112)%112-(s.birthDate-t.currentDate+112)%112)).map((e=>{var s,n,r,l;return{villager:e.name,date:e.birthday,hearts:null!==(n=null===(s=t.relationships.get(e.name))||void 0===s?void 0:s.hearts)&&void 0!==n?n:0,maxHearts:null!==(l=null===(r=t.relationships.get(e.name))||void 0===r?void 0:r.maxHearts)&&void 0!==l?l:e.datable?8:10,bestGifts:e.bestGifts}})))}));b(t,o,(t=>s(1,r=t)));const a=x(j,(t=>{var e,s,n,r,l,o,a,c;if(null===t)return null;{const $={},i={},f=t=>{var e,s;for(const[n,r]of Object.entries(t.ingredients)){const t=Object.values(w.recipes).find((t=>t.result.id===n));t&&(null!==(e=i[s=t.name])&&void 0!==e||(i[s]=0),i[t.name]+=r/t.amount,f(t))}},m=Object.values(w.recipes).filter((e=>!t.collectedItems.includes(e.result.id)));for(const t of m)f(t);for(const t in i)i[t]=Math.ceil(i[t]);for(const t of m)null!==(e=i[a=t.name])&&void 0!==e||(i[a]=1);for(const[t,e]of Object.entries(i)){const n=w.recipes[t];for(const[t,r]of Object.entries(n.ingredients))Object.values(w.recipes).some((e=>e.result.id===t))||(null!==(s=$[t])&&void 0!==s||($[t]=0),$[t]+=r*e)}for(const{id:e}of w.shipping)t.collectedItems.includes(e)||(null!==(n=$[e])&&void 0!==n||($[e]=0),$[e]+=1);for(const{id:e}of w.fish)t.collectedItems.includes(e)||null!==(r=$[e])&&void 0!==r||($[e]=1);for(const e of Object.values(w.bundles))for(const[s,n]of Object.entries(e.items))t.bundleCompletion.get(e.id)[s]||(null!==(l=$[c=n.id])&&void 0!==l||($[c]=0),$[n.id]+=n.amount);for(const e in $)$[e]-=null!==(o=t.items[e])&&void 0!==o?o:0,$[e]<=0&&delete $[e];return $}})),c=x(a,((t,e)=>{null!==t&&e(Object.fromEntries(Object.entries(t).filter((([t,e])=>{const s=w.items[t];return s&&void 0!==s.seasons&&s.seasons.includes(["spring","summer","fall","winter"][n.currentSeason])&&Object.values(s.seasons).filter((t=>t)).length<3}))))}));return b(t,c,(t=>s(2,l=t))),[n,r,l,o,c]}export default class extends t{constructor(t){super(),e(this,t,ct,at,s,{})}}
