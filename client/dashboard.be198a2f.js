import{g as t,S as e,i as n,s,e as r,c as l,a,t as o,f as $,h as c,k as f,b as i,j as m,d as g,l as u,m as h,o as d,n as p,ab as v,C as x,p as b,r as y,u as w,A as j,B as I,y as D,q,v as B,w as H,z as C,x as E}from"./client.4b2bd718.js";import{D as G,H as V,B as S,R as k,C as A}from"./Cell.d3442986.js";import{I as N}from"./ItemButton.703399ef.js";function O(t,e,n){const s=t.slice();return s[6]=e[n],s}function z(t,e,n){const s=t.slice();return s[6]=e[n],s}function M(t,e,n){const s=t.slice();return s[14]=e[n],s}function P(t,e,n){const s=t.slice();return s[9]=e[n],s}function R(t){let e,n,s,D,q,B,H,E,V,S=v.get(t[0].currentSeason)+"";n=new G({props:{$$slots:{default:[st]},$$scope:{ctx:t}}});let k=t[2],A=[];for(let e=0;e<k.length;e+=1)A[e]=rt(O(t,k,e));const N=t=>y(A[t],1,1,()=>{A[t]=null});return{c(){e=r("div"),l(n.$$.fragment),s=a(),D=r("div"),q=r("h2"),B=o(S),H=a(),E=r("div");for(let t=0;t<A.length;t+=1)A[t].c();this.h()},l(t){e=$(t,"DIV",{class:!0});var r=c(e);f(n.$$.fragment,r),s=i(r),D=$(r,"DIV",{class:!0});var l=c(D);q=$(l,"H2",{class:!0});var a=c(q);B=m(a,S),a.forEach(g),H=i(l),E=$(l,"DIV",{class:!0});var o=c(E);for(let t=0;t<A.length;t+=1)A[t].l(o);o.forEach(g),l.forEach(g),r.forEach(g),this.h()},h(){u(q,"class","svelte-1b8qjfv"),u(E,"class","seasonal-items svelte-1b8qjfv"),u(D,"class","mdc-card mdc-card--outlined seasonal svelte-1b8qjfv"),u(e,"class","container svelte-1b8qjfv")},m(t,r){h(t,e,r),d(n,e,null),p(e,s),p(e,D),p(D,q),p(q,B),p(D,H),p(D,E);for(let t=0;t<A.length;t+=1)A[t].m(E,null);V=!0},p(t,e){const s={};if(131074&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s),(!V||1&e)&&S!==(S=v.get(t[0].currentSeason)+"")&&x(B,S),4&e){let n;for(k=t[2],n=0;n<k.length;n+=1){const s=O(t,k,n);A[n]?(A[n].p(s,e),b(A[n],1)):(A[n]=rt(s),A[n].c(),b(A[n],1),A[n].m(E,null))}for(C(),n=k.length;n<A.length;n+=1)N(n);j()}},i(t){if(!V){b(n.$$.fragment,t);for(let t=0;t<k.length;t+=1)b(A[t]);V=!0}},o(t){y(n.$$.fragment,t),A=A.filter(Boolean);for(let t=0;t<A.length;t+=1)y(A[t]);V=!1},d(t){t&&g(e),w(n),I(A,t)}}}function F(t){let e;return{c(){e=o("Villager")},l(t){e=m(t,"Villager")},m(t,n){h(t,e,n)},d(t){t&&g(e)}}}function J(t){let e;return{c(){e=o("Hearts")},l(t){e=m(t,"Hearts")},m(t,n){h(t,e,n)},d(t){t&&g(e)}}}function K(t){let e;return{c(){e=o("Birthday")},l(t){e=m(t,"Birthday")},m(t,n){h(t,e,n)},d(t){t&&g(e)}}}function L(t){let e;return{c(){e=o("Best Gifts")},l(t){e=m(t,"Best Gifts")},m(t,n){h(t,e,n)},d(t){t&&g(e)}}}function Q(t){let e,n,s,r,o,$,c,m;return e=new A({props:{$$slots:{default:[F]},$$scope:{ctx:t}}}),s=new A({props:{$$slots:{default:[J]},$$scope:{ctx:t}}}),o=new A({props:{$$slots:{default:[K]},$$scope:{ctx:t}}}),c=new A({props:{$$slots:{default:[L]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment),n=a(),l(s.$$.fragment),r=a(),l(o.$$.fragment),$=a(),l(c.$$.fragment)},l(t){f(e.$$.fragment,t),n=i(t),f(s.$$.fragment,t),r=i(t),f(o.$$.fragment,t),$=i(t),f(c.$$.fragment,t)},m(t,l){d(e,t,l),h(t,n,l),d(s,t,l),h(t,r,l),d(o,t,l),h(t,$,l),d(c,t,l),m=!0},p(t,n){const r={};131072&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const l={};131072&n&&(l.$$scope={dirty:n,ctx:t}),s.$set(l);const a={};131072&n&&(a.$$scope={dirty:n,ctx:t}),o.$set(a);const $={};131072&n&&($.$$scope={dirty:n,ctx:t}),c.$set($)},i(t){m||(b(e.$$.fragment,t),b(s.$$.fragment,t),b(o.$$.fragment,t),b(c.$$.fragment,t),m=!0)},o(t){y(e.$$.fragment,t),y(s.$$.fragment,t),y(o.$$.fragment,t),y(c.$$.fragment,t),m=!1},d(t){w(e,t),t&&g(n),w(s,t),t&&g(r),w(o,t),t&&g($),w(c,t)}}}function T(t){let e,n;return e=new k({props:{$$slots:{default:[Q]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p(t,n){const s={};131072&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(b(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function U(t){let e,n=t[9].villager+"";return{c(){e=o(n)},l(t){e=m(t,n)},m(t,n){h(t,e,n)},p(t,s){2&s&&n!==(n=t[9].villager+"")&&x(e,n)},d(t){t&&g(e)}}}function W(t){let e,n;return{c(){e=r("img"),this.h()},l(t){e=$(t,"IMG",{alt:!0,src:!0,class:!0}),this.h()},h(){u(e,"alt","heart"),e.src!==(n="heart-"+(t[9].hearts>=t[14]+1?"filled":"outline")+".png")&&u(e,"src",n),u(e,"class","svelte-1b8qjfv")},m(t,n){h(t,e,n)},p(t,s){2&s&&e.src!==(n="heart-"+(t[9].hearts>=t[14]+1?"filled":"outline")+".png")&&u(e,"src",n)},d(t){t&&g(e)}}}function X(t){let e,n=[...Array(t[9].maxHearts).keys()],s=[];for(let e=0;e<n.length;e+=1)s[e]=W(M(t,n,e));return{c(){e=r("div");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=$(t,"DIV",{class:!0});var n=c(e);for(let t=0;t<s.length;t+=1)s[t].l(n);n.forEach(g),this.h()},h(){u(e,"class","hearts svelte-1b8qjfv")},m(t,n){h(t,e,n);for(let t=0;t<s.length;t+=1)s[t].m(e,null)},p(t,r){if(2&r){let l;for(n=[...Array(t[9].maxHearts).keys()],l=0;l<n.length;l+=1){const a=M(t,n,l);s[l]?s[l].p(a,r):(s[l]=W(a),s[l].c(),s[l].m(e,null))}for(;l<s.length;l+=1)s[l].d(1);s.length=n.length}},d(t){t&&g(e),I(s,t)}}}function Y(t){let e,n=t[9].date+"";return{c(){e=o(n)},l(t){e=m(t,n)},m(t,n){h(t,e,n)},p(t,s){2&s&&n!==(n=t[9].date+"")&&x(e,n)},d(t){t&&g(e)}}}function Z(t){let e,n;return e=new N({props:{item:t[6],scale:t[6].isCraftable?1:2}}),{c(){l(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p(t,n){const s={};2&n&&(s.item=t[6]),2&n&&(s.scale=t[6].isCraftable?1:2),e.$set(s)},i(t){n||(b(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function _(t){let e,n,s=t[9].bestGifts,l=[];for(let e=0;e<s.length;e+=1)l[e]=Z(z(t,s,e));const a=t=>y(l[t],1,1,()=>{l[t]=null});return{c(){e=r("div");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=$(t,"DIV",{class:!0});var n=c(e);for(let t=0;t<l.length;t+=1)l[t].l(n);n.forEach(g),this.h()},h(){u(e,"class","best-gifts svelte-1b8qjfv")},m(t,s){h(t,e,s);for(let t=0;t<l.length;t+=1)l[t].m(e,null);n=!0},p(t,n){if(2&n){let r;for(s=t[9].bestGifts,r=0;r<s.length;r+=1){const a=z(t,s,r);l[r]?(l[r].p(a,n),b(l[r],1)):(l[r]=Z(a),l[r].c(),b(l[r],1),l[r].m(e,null))}for(C(),r=s.length;r<l.length;r+=1)a(r);j()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)b(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)y(l[t]);n=!1},d(t){t&&g(e),I(l,t)}}}function tt(t){let e,n,s,r,o,$,c,m,u;return e=new A({props:{$$slots:{default:[U]},$$scope:{ctx:t}}}),s=new A({props:{$$slots:{default:[X]},$$scope:{ctx:t}}}),o=new A({props:{$$slots:{default:[Y]},$$scope:{ctx:t}}}),c=new A({props:{$$slots:{default:[_]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment),n=a(),l(s.$$.fragment),r=a(),l(o.$$.fragment),$=a(),l(c.$$.fragment),m=a()},l(t){f(e.$$.fragment,t),n=i(t),f(s.$$.fragment,t),r=i(t),f(o.$$.fragment,t),$=i(t),f(c.$$.fragment,t),m=i(t)},m(t,l){d(e,t,l),h(t,n,l),d(s,t,l),h(t,r,l),d(o,t,l),h(t,$,l),d(c,t,l),h(t,m,l),u=!0},p(t,n){const r={};131074&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const l={};131074&n&&(l.$$scope={dirty:n,ctx:t}),s.$set(l);const a={};131074&n&&(a.$$scope={dirty:n,ctx:t}),o.$set(a);const $={};131074&n&&($.$$scope={dirty:n,ctx:t}),c.$set($)},i(t){u||(b(e.$$.fragment,t),b(s.$$.fragment,t),b(o.$$.fragment,t),b(c.$$.fragment,t),u=!0)},o(t){y(e.$$.fragment,t),y(s.$$.fragment,t),y(o.$$.fragment,t),y(c.$$.fragment,t),u=!1},d(t){w(e,t),t&&g(n),w(s,t),t&&g(r),w(o,t),t&&g($),w(c,t),t&&g(m)}}}function et(t){let e,n;return e=new k({props:{$$slots:{default:[tt]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p(t,n){const s={};131074&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(b(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function nt(t){let e,n,s=t[1],r=[];for(let e=0;e<s.length;e+=1)r[e]=et(P(t,s,e));const l=t=>y(r[t],1,1,()=>{r[t]=null});return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=D()},l(t){for(let e=0;e<r.length;e+=1)r[e].l(t);e=D()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);h(t,e,s),n=!0},p(t,n){if(2&n){let a;for(s=t[1],a=0;a<s.length;a+=1){const l=P(t,s,a);r[a]?(r[a].p(l,n),b(r[a],1)):(r[a]=et(l),r[a].c(),b(r[a],1),r[a].m(e.parentNode,e))}for(C(),a=s.length;a<r.length;a+=1)l(a);j()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)b(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)y(r[t]);n=!1},d(t){I(r,t),t&&g(e)}}}function st(t){let e,n,s,r;return e=new V({props:{$$slots:{default:[T]},$$scope:{ctx:t}}}),s=new S({props:{$$slots:{default:[nt]},$$scope:{ctx:t}}}),{c(){l(e.$$.fragment),n=a(),l(s.$$.fragment)},l(t){f(e.$$.fragment,t),n=i(t),f(s.$$.fragment,t)},m(t,l){d(e,t,l),h(t,n,l),d(s,t,l),r=!0},p(t,n){const r={};131072&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const l={};131074&n&&(l.$$scope={dirty:n,ctx:t}),s.$set(l)},i(t){r||(b(e.$$.fragment,t),b(s.$$.fragment,t),r=!0)},o(t){y(e.$$.fragment,t),y(s.$$.fragment,t),r=!1},d(t){w(e,t),t&&g(n),w(s,t)}}}function rt(t){let e,n;return e=new N({props:{item:t[6],scale:t[6].isCraftable?2:3}}),{c(){l(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p(t,n){const s={};4&n&&(s.item=t[6]),4&n&&(s.scale=t[6].isCraftable?2:3),e.$set(s)},i(t){n||(b(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function lt(t){let e,n,s,l,f,d,v=null!==t[0]&&R(t);return{c(){e=a(),n=r("h1"),s=o("Dashboard"),l=a(),v&&v.c(),f=D(),this.h()},l(t){q('[data-svelte="svelte-qmib3v"]',document.head).forEach(g),e=i(t),n=$(t,"H1",{class:!0});var r=c(n);s=m(r,"Dashboard"),r.forEach(g),l=i(t),v&&v.l(t),f=D(),this.h()},h(){document.title="Dashboard | Stardew Completionist",u(n,"class","title svelte-1b8qjfv")},m(t,r){h(t,e,r),h(t,n,r),p(n,s),h(t,l,r),v&&v.m(t,r),h(t,f,r),d=!0},p(t,[e]){null!==t[0]?v?(v.p(t,e),1&e&&b(v,1)):(v=R(t),v.c(),b(v,1),v.m(f.parentNode,f)):v&&(C(),y(v,1,1,()=>{v=null}),j())},i(t){d||(b(v),d=!0)},o(t){y(v),d=!1},d(t){t&&g(e),t&&g(n),t&&g(l),v&&v.d(t),t&&g(f)}}}var at=function(t,e,n,s){return new(n||(n=Promise))((function(r,l){function a(t){try{$(s.next(t))}catch(t){l(t)}}function o(t){try{$(s.throw(t))}catch(t){l(t)}}function $(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,o)}$((s=s.apply(t,e||[])).next())}))};function ot(){return at(this,void 0,void 0,(function*(){return{gameInfo:yield t.fetch(this.fetch)}}))}function $t(t,e,n){let s,r,l;B(t,E,t=>n(0,s=t));let{gameInfo:a}=e,o=H(E,(t,e)=>{null!==t&&e(Object.values(a.villagers).sort((e,n)=>(e.birthDate-t.currentDate+112)%112-(n.birthDate-t.currentDate+112)%112).map(e=>{var n,s,r,l;return{villager:e.name,date:e.birthday,hearts:null!==(s=null===(n=t.relationships.get(e.name))||void 0===n?void 0:n.hearts)&&void 0!==s?s:0,maxHearts:null!==(l=null===(r=t.relationships.get(e.name))||void 0===r?void 0:r.maxHearts)&&void 0!==l?l:e.datable?8:10,bestGifts:e.bestGifts}}))});B(t,o,t=>n(1,r=t));let $=H(E,(t,e)=>{null!==t&&e([...a.shipping,...a.fish].filter(e=>void 0!==e.seasons&&e.seasons.includes(["spring","summer","fall","winter"][t.currentSeason])&&!t.collectedItems.includes(e.id)&&Object.values(e.seasons).filter(t=>t).length<3))});return B(t,$,t=>n(2,l=t)),t.$$set=t=>{"gameInfo"in t&&n(5,a=t.gameInfo)},[s,r,l,o,$,a]}export default class extends e{constructor(t){super(),n(this,t,$t,lt,s,{gameInfo:5})}}export{ot as preload};