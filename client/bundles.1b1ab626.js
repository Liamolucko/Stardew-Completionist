import{g as t,S as e,i as l,s as n,e as s,t as o,a as c,f as a,h as i,j as r,d as h,b as f,l as u,m,n as d,C as g,p as v,r as p,A as j,B as I,q as $,v as b,w as x,z as y,x as E,c as O,k,o as D,u as V,y as q,a9 as w,aa as B}from"./client.ac58d024.js";import{I as C}from"./ItemButton.ab51fc06.js";function A(t,e,l){const n=t.slice();return n[11]=e[l],n}function N(t,e,l){const n=t.slice();return n[14]=e[l],n}function S(t,e,l){const n=t.slice();return n[8]=e[l],n}function H(t,e,l){const n=t.slice();return n[4]=e[l][0],n[5]=e[l][1],n}function P(t){let e,l,n,o,r,d,g,$=[...Array(t[8].slots).keys()],b=[];for(let e=0;e<$.length;e+=1)b[e]=G(N(t,$,e));const x=t=>p(b[t],1,1,()=>{b[t]=null}),E=[K,J],O=[];function k(t,e){return 3&e&&(n=!(null===t[1]||!t[8].items.every(Z))),n?0:1}return o=k(t,-1),r=O[o]=E[o](t),{c(){e=s("div");for(let t=0;t<b.length;t+=1)b[t].c();l=c(),r.c(),d=q(),this.h()},l(t){e=a(t,"DIV",{class:!0,style:!0});var n=i(e);for(let t=0;t<b.length;t+=1)b[t].l(n);n.forEach(h),l=f(t),r.l(t),d=q(),this.h()},h(){u(e,"class","slots svelte-o2ajxv"),w(e,"--slots",t[8].slots)},m(t,n){m(t,e,n);for(let t=0;t<b.length;t+=1)b[t].m(e,null);m(t,l,n),O[o].m(t,n),m(t,d,n),g=!0},p(t,l){if(3&l){let n;for($=[...Array(t[8].slots).keys()],n=0;n<$.length;n+=1){const s=N(t,$,n);b[n]?(b[n].p(s,l),v(b[n],1)):(b[n]=G(s),b[n].c(),v(b[n],1),b[n].m(e,null))}for(y(),n=$.length;n<b.length;n+=1)x(n);j()}(!g||1&l)&&w(e,"--slots",t[8].slots);let n=o;o=k(t,l),o===n?O[o].p(t,l):(y(),p(O[n],1,1,()=>{O[n]=null}),j(),r=O[o],r||(r=O[o]=E[o](t),r.c()),v(r,1),r.m(d.parentNode,d))},i(t){if(!g){for(let t=0;t<$.length;t+=1)v(b[t]);v(r),g=!0}},o(t){b=b.filter(Boolean);for(let t=0;t<b.length;t+=1)p(b[t]);p(r),g=!1},d(t){t&&h(e),I(b,t),t&&h(l),O[o].d(t),t&&h(d)}}}function z(t){let e,l;function n(t,l){return(null==e||3&l)&&(e=!(null===t[1]||!t[1].bundleCompletion.get(t[8].id).some(Y))),e?Q:M}let s=n(t,-1),o=s(t);return{c(){o.c(),l=q()},l(t){o.l(t),l=q()},m(t,e){o.m(t,e),m(t,l,e)},p(t,e){s!==(s=n(t,e))&&(o.d(1),o=s(t),o&&(o.c(),o.m(l.parentNode,l)))},i:B,o:B,d(t){o.d(t),t&&h(l)}}}function F(t){let e,l;return e=new C({props:{scale:2,item:t[8].completedItems[t[14]]}}),{c(){O(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,n){D(e,t,n),l=!0},p(t,l){const n={};1&l&&(n.item=t[8].completedItems[t[14]]),e.$set(n)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){V(e,t)}}}function G(t){let e,l,n,o=null!==t[1]&&t[8].completedItems.length>t[14]&&F(t);return{c(){e=s("span"),o&&o.c(),l=c(),this.h()},l(t){e=a(t,"SPAN",{class:!0});var n=i(e);o&&o.l(n),l=f(n),n.forEach(h),this.h()},h(){u(e,"class","slot svelte-o2ajxv")},m(t,s){m(t,e,s),o&&o.m(e,null),d(e,l),n=!0},p(t,n){null!==t[1]&&t[8].completedItems.length>t[14]?o?(o.p(t,n),3&n&&v(o,1)):(o=F(t),o.c(),v(o,1),o.m(e,l)):o&&(y(),p(o,1,1,()=>{o=null}),j())},i(t){n||(v(o),n=!0)},o(t){p(o),n=!1},d(t){t&&h(e),o&&o.d()}}}function J(t){let e,l,n=t[8].items.filter(_),o=[];for(let e=0;e<n.length;e+=1)o[e]=L(A(t,n,e));const c=t=>p(o[t],1,1,()=>{o[t]=null});return{c(){e=s("div");for(let t=0;t<o.length;t+=1)o[t].c();this.h()},l(t){e=a(t,"DIV",{class:!0});var l=i(e);for(let t=0;t<o.length;t+=1)o[t].l(l);l.forEach(h),this.h()},h(){u(e,"class","options svelte-o2ajxv")},m(t,n){m(t,e,n);for(let t=0;t<o.length;t+=1)o[t].m(e,null);l=!0},p(t,l){if(1&l){let s;for(n=t[8].items.filter(_),s=0;s<n.length;s+=1){const c=A(t,n,s);o[s]?(o[s].p(c,l),v(o[s],1)):(o[s]=L(c),o[s].c(),v(o[s],1),o[s].m(e,null))}for(y(),s=n.length;s<o.length;s+=1)c(s);j()}},i(t){if(!l){for(let t=0;t<n.length;t+=1)v(o[t]);l=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)p(o[t]);l=!1},d(t){t&&h(e),I(o,t)}}}function K(t){let e,l;return{c(){e=s("div"),l=o("check"),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=i(e);l=r(n,"check"),n.forEach(h),this.h()},h(){u(e,"class","completed material-icons svelte-o2ajxv")},m(t,n){m(t,e,n),d(e,l)},p:B,i:B,o:B,d(t){t&&h(e)}}}function L(t){let e,l;return e=new C({props:{item:t[11],scale:2,quality:t[11].quality,quantity:t[11].amount}}),{c(){O(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,n){D(e,t,n),l=!0},p(t,l){const n={};1&l&&(n.item=t[11]),1&l&&(n.quality=t[11].quality),1&l&&(n.quantity=t[11].amount),e.$set(n)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){V(e,t)}}}function M(t){let e,l;return{c(){e=s("div"),l=o("close"),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=i(e);l=r(n,"close"),n.forEach(h),this.h()},h(){u(e,"class","not-completed material-icons svelte-o2ajxv")},m(t,n){m(t,e,n),d(e,l)},d(t){t&&h(e)}}}function Q(t){let e,l;return{c(){e=s("div"),l=o("check"),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=i(e);l=r(n,"check"),n.forEach(h),this.h()},h(){u(e,"class","completed material-icons svelte-o2ajxv")},m(t,n){m(t,e,n),d(e,l)},d(t){t&&h(e)}}}function R(t){let e,l,n,I,$,b,x,E=t[8].name+"";const O=[z,P],k=[];function D(t,e){return t[8].gold>0?0:1}return $=D(t),b=k[$]=O[$](t),{c(){e=s("div"),l=s("h5"),n=o(E),I=c(),b.c(),this.h()},l(t){e=a(t,"DIV",{class:!0});var s=i(e);l=a(s,"H5",{class:!0});var o=i(l);n=r(o,E),o.forEach(h),I=f(s),b.l(s),s.forEach(h),this.h()},h(){u(l,"class","svelte-o2ajxv"),u(e,"class","bundle mdc-card mdc-card--outlined svelte-o2ajxv")},m(t,s){m(t,e,s),d(e,l),d(l,n),d(e,I),k[$].m(e,null),x=!0},p(t,l){(!x||1&l)&&E!==(E=t[8].name+"")&&g(n,E);let s=$;$=D(t),$===s?k[$].p(t,l):(y(),p(k[s],1,1,()=>{k[s]=null}),j(),b=k[$],b||(b=k[$]=O[$](t),b.c()),v(b,1),b.m(e,null))},i(t){x||(v(b),x=!0)},o(t){p(b),x=!1},d(t){t&&h(e),k[$].d()}}}function T(t){let e,l,n,$,b,x,E=t[4]+"",O=t[5],k=[];for(let e=0;e<O.length;e+=1)k[e]=R(S(t,O,e));const D=t=>p(k[t],1,1,()=>{k[t]=null});return{c(){e=s("h1"),l=o(E),n=c(),$=s("div");for(let t=0;t<k.length;t+=1)k[t].c();b=c(),this.h()},l(t){e=a(t,"H1",{class:!0});var s=i(e);l=r(s,E),s.forEach(h),n=f(t),$=a(t,"DIV",{class:!0});var o=i($);for(let t=0;t<k.length;t+=1)k[t].l(o);b=f(o),o.forEach(h),this.h()},h(){u(e,"class","svelte-o2ajxv"),u($,"class","section svelte-o2ajxv")},m(t,s){m(t,e,s),d(e,l),m(t,n,s),m(t,$,s);for(let t=0;t<k.length;t+=1)k[t].m($,null);d($,b),x=!0},p(t,e){if((!x||1&e)&&E!==(E=t[4]+"")&&g(l,E),3&e){let l;for(O=t[5],l=0;l<O.length;l+=1){const n=S(t,O,l);k[l]?(k[l].p(n,e),v(k[l],1)):(k[l]=R(n),k[l].c(),v(k[l],1),k[l].m($,b))}for(y(),l=O.length;l<k.length;l+=1)D(l);j()}},i(t){if(!x){for(let t=0;t<O.length;t+=1)v(k[t]);x=!0}},o(t){k=k.filter(Boolean);for(let t=0;t<k.length;t+=1)p(k[t]);x=!1},d(t){t&&h(e),t&&h(n),t&&h($),I(k,t)}}}function U(t){let e,l,n,o=Object.entries(t[0]),r=[];for(let e=0;e<o.length;e+=1)r[e]=T(H(t,o,e));const d=t=>p(r[t],1,1,()=>{r[t]=null});return{c(){e=c(),l=s("div");for(let t=0;t<r.length;t+=1)r[t].c();this.h()},l(t){$('[data-svelte="svelte-kcgu6a"]',document.head).forEach(h),e=f(t),l=a(t,"DIV",{class:!0});var n=i(l);for(let t=0;t<r.length;t+=1)r[t].l(n);n.forEach(h),this.h()},h(){document.title="Bundles | Stardew Completionist",u(l,"class","container svelte-o2ajxv")},m(t,s){m(t,e,s),m(t,l,s);for(let t=0;t<r.length;t+=1)r[t].m(l,null);n=!0},p(t,[e]){if(3&e){let n;for(o=Object.entries(t[0]),n=0;n<o.length;n+=1){const s=H(t,o,n);r[n]?(r[n].p(s,e),v(r[n],1)):(r[n]=T(s),r[n].c(),v(r[n],1),r[n].m(l,null))}for(y(),n=o.length;n<r.length;n+=1)d(n);j()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)v(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)p(r[t]);n=!1},d(t){t&&h(e),t&&h(l),I(r,t)}}}var W=function(t,e,l,n){return new(l||(l=Promise))((function(s,o){function c(t){try{i(n.next(t))}catch(t){o(t)}}function a(t){try{i(n.throw(t))}catch(t){o(t)}}function i(t){var e;t.done?s(t.value):(e=t.value,e instanceof l?e:new l((function(t){t(e)}))).then(c,a)}i((n=n.apply(t,e||[])).next())}))};function X(){return W(this,void 0,void 0,(function*(){return{gameInfo:yield t.fetch(this.fetch)}}))}const Y=t=>t,Z=t=>t.completed,_=t=>!t.completed;function tt(t,e,l){let n,s;b(t,E,t=>l(1,s=t));let{gameInfo:o}=e;const c=x(E,t=>o.bundles.reduce((e,l)=>{var n;return Object.assign(Object.assign({},e),{[l.section]:[...null!==(n=e[l.section])&&void 0!==n?n:[],Object.assign(Object.assign({},l),{items:l.items.filter(t=>t.id in o.items).map((e,n)=>{var s;return Object.assign(Object.assign(Object.assign({},e),o.items[e.id]),{completed:null!==t&&t.bundleCompletion.has(l.id)&&(null===(s=t.bundleCompletion.get(l.id))||void 0===s?void 0:s[n])})}),completedItems:l.items.filter(({id:e},n)=>{var s,c;return(null===(c=null===(s=null==t?void 0:t.bundleCompletion.get(l.id))||void 0===s?void 0:s[n])||void 0===c||c)&&o.items[e]}).map(({id:t})=>o.items[t])})]})},{}));return b(t,c,t=>l(0,n=t)),t.$$set=t=>{"gameInfo"in t&&l(3,o=t.gameInfo)},[n,s,c,o]}export default class extends e{constructor(t){super(),l(this,t,tt,U,n,{gameInfo:3})}}export{X as preload};
