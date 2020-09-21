import{g as t,ac as e,S as n,i as s,s as l,c as r,k as c,o,p as a,r as i,u as $,a as f,e as m,t as u,q as p,d,b as g,f as h,h as v,j as x,l as w,a7 as y,m as j,n as C,C as E,A as I,B as b,v as k,z as S,y as B,x as D,a9 as N}from"./client.4b2bd718.js";import{D as R,H as V,B as z,R as A,C as H}from"./Cell.d3442986.js";import{I as L}from"./ItemButton.703399ef.js";function P(t,e,n){const s=t.slice();return s[8]=e[n],s}function q(t,e,n){const s=t.slice();return s[5]=e[n],s}function U(t,e,n){const s=t.slice();return s[11]=e[n],s}function F(t){let e,n;return e=new L({props:{item:t[11],scale:t[11].isCraftable?2:3,shadow:!0,grey:null!==t[3]&&!t[3].collectedItems.includes(t[11].id)}}),{c(){r(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,s){o(e,t,s),n=!0},p(t,n){const s={};2&n&&(s.item=t[11]),2&n&&(s.scale=t[11].isCraftable?2:3),10&n&&(s.grey=null!==t[3]&&!t[3].collectedItems.includes(t[11].id)),e.$set(s)},i(t){n||(a(e.$$.fragment,t),n=!0)},o(t){i(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function G(t){let e,n;return e=new R({props:{$$slots:{default:[tt]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,s){o(e,t,s),n=!0},p(t,n){const s={};16396&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(a(e.$$.fragment,t),n=!0)},o(t){i(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function J(t){let e;return{c(){e=u("Recipe")},l(t){e=x(t,"Recipe")},m(t,n){j(t,e,n)},d(t){t&&d(e)}}}function K(t){let e;return{c(){e=u("Sources")},l(t){e=x(t,"Sources")},m(t,n){j(t,e,n)},d(t){t&&d(e)}}}function M(t){let e,n,s,l;return e=new H({props:{$$slots:{default:[J]},$$scope:{ctx:t}}}),s=new H({props:{$$slots:{default:[K]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment),n=f(),r(s.$$.fragment)},l(t){c(e.$$.fragment,t),n=g(t),c(s.$$.fragment,t)},m(t,r){o(e,t,r),j(t,n,r),o(s,t,r),l=!0},p(t,n){const l={};16384&n&&(l.$$scope={dirty:n,ctx:t}),e.$set(l);const r={};16384&n&&(r.$$scope={dirty:n,ctx:t}),s.$set(r)},i(t){l||(a(e.$$.fragment,t),a(s.$$.fragment,t),l=!0)},o(t){i(e.$$.fragment,t),i(s.$$.fragment,t),l=!1},d(t){$(e,t),t&&d(n),$(s,t)}}}function O(t){let e,n;return e=new A({props:{$$slots:{default:[M]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,s){o(e,t,s),n=!0},p(t,n){const s={};16384&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(a(e.$$.fragment,t),n=!0)},o(t){i(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function Q(t){let e,n,s,l,p,w=t[5].name+"";return e=new L({props:{item:t[5].result,scale:t[5].result.isCraftable?1:2}}),{c(){r(e.$$.fragment),n=f(),s=m("span"),l=u(w),this.h()},l(t){c(e.$$.fragment,t),n=g(t),s=h(t,"SPAN",{style:!0});var r=v(s);l=x(r,w),r.forEach(d),this.h()},h(){N(s,"padding-left","8px")},m(t,r){o(e,t,r),j(t,n,r),j(t,s,r),C(s,l),p=!0},p(t,n){const s={};12&n&&(s.item=t[5].result),12&n&&(s.scale=t[5].result.isCraftable?1:2),e.$set(s),(!p||12&n)&&w!==(w=t[5].name+"")&&E(l,w)},i(t){p||(a(e.$$.fragment,t),p=!0)},o(t){i(e.$$.fragment,t),p=!1},d(t){$(e,t),t&&d(n),t&&d(s)}}}function T(t){let e,n=t[5].sources,s=[];for(let e=0;e<n.length;e+=1)s[e]=W(P(t,n,e));return{c(){e=m("ul");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=h(t,"UL",{class:!0});var n=v(e);for(let t=0;t<s.length;t+=1)s[t].l(n);n.forEach(d),this.h()},h(){w(e,"class","source-list svelte-2mjhej")},m(t,n){j(t,e,n);for(let t=0;t<s.length;t+=1)s[t].m(e,null)},p(t,l){if(12&l){let r;for(n=t[5].sources,r=0;r<n.length;r+=1){const c=P(t,n,r);s[r]?s[r].p(c,l):(s[r]=W(c),s[r].c(),s[r].m(e,null))}for(;r<s.length;r+=1)s[r].d(1);s.length=n.length}},d(t){t&&d(e),b(s,t)}}}function W(t){let e,n,s=t[8]+"";return{c(){e=m("li"),n=u(s)},l(t){e=h(t,"LI",{});var l=v(e);n=x(l,s),l.forEach(d)},m(t,s){j(t,e,s),C(e,n)},p(t,e){12&e&&s!==(s=t[8]+"")&&E(n,s)},d(t){t&&d(e)}}}function X(t){let e,n=void 0!==t[5].sources&&T(t);return{c(){n&&n.c(),e=B()},l(t){n&&n.l(t),e=B()},m(t,s){n&&n.m(t,s),j(t,e,s)},p(t,s){void 0!==t[5].sources?n?n.p(t,s):(n=T(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&d(e)}}}function Y(t){let e,n,s,l,m;return e=new H({props:{$$slots:{default:[Q]},$$scope:{ctx:t}}}),s=new H({props:{$$slots:{default:[X]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment),n=f(),r(s.$$.fragment),l=f()},l(t){c(e.$$.fragment,t),n=g(t),c(s.$$.fragment,t),l=g(t)},m(t,r){o(e,t,r),j(t,n,r),o(s,t,r),j(t,l,r),m=!0},p(t,n){const l={};16396&n&&(l.$$scope={dirty:n,ctx:t}),e.$set(l);const r={};16396&n&&(r.$$scope={dirty:n,ctx:t}),s.$set(r)},i(t){m||(a(e.$$.fragment,t),a(s.$$.fragment,t),m=!0)},o(t){i(e.$$.fragment,t),i(s.$$.fragment,t),m=!1},d(t){$(e,t),t&&d(n),$(s,t),t&&d(l)}}}function Z(t){let e,n;return e=new A({props:{$$slots:{default:[Y]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment)},l(t){c(e.$$.fragment,t)},m(t,s){o(e,t,s),n=!0},p(t,n){const s={};16396&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(a(e.$$.fragment,t),n=!0)},o(t){i(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function _(t){let e,n,s=t[2].filter(t[4]),l=[];for(let e=0;e<s.length;e+=1)l[e]=Z(q(t,s,e));const r=t=>i(l[t],1,1,()=>{l[t]=null});return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=B()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=B()},m(t,s){for(let e=0;e<l.length;e+=1)l[e].m(t,s);j(t,e,s),n=!0},p(t,n){if(12&n){let c;for(s=t[2].filter(t[4]),c=0;c<s.length;c+=1){const r=q(t,s,c);l[c]?(l[c].p(r,n),a(l[c],1)):(l[c]=Z(r),l[c].c(),a(l[c],1),l[c].m(e.parentNode,e))}for(S(),c=s.length;c<l.length;c+=1)r(c);I()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)a(l[t]);n=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)i(l[t]);n=!1},d(t){b(l,t),t&&d(e)}}}function tt(t){let e,n,s,l;return e=new V({props:{$$slots:{default:[O]},$$scope:{ctx:t}}}),s=new z({props:{$$slots:{default:[_]},$$scope:{ctx:t}}}),{c(){r(e.$$.fragment),n=f(),r(s.$$.fragment)},l(t){c(e.$$.fragment,t),n=g(t),c(s.$$.fragment,t)},m(t,r){o(e,t,r),j(t,n,r),o(s,t,r),l=!0},p(t,n){const l={};16384&n&&(l.$$scope={dirty:n,ctx:t}),e.$set(l);const r={};16396&n&&(r.$$scope={dirty:n,ctx:t}),s.$set(r)},i(t){l||(a(e.$$.fragment,t),a(s.$$.fragment,t),l=!0)},o(t){i(e.$$.fragment,t),i(s.$$.fragment,t),l=!1},d(t){$(e,t),t&&d(n),$(s,t)}}}function et(t){let e,n,s,l,r,c,o,$,k,B;document.title=e=t[0]+" | Stardew Completionist";let D=t[1],N=[];for(let e=0;e<D.length;e+=1)N[e]=F(U(t,D,e));const R=t=>i(N[t],1,1,()=>{N[t]=null});let V=void 0!==t[2]&&null!==t[3]&&G(t);return{c(){n=f(),s=m("div"),l=m("div"),r=m("h2"),c=u(t[0]),o=f(),$=m("div");for(let t=0;t<N.length;t+=1)N[t].c();k=f(),V&&V.c(),this.h()},l(e){p('[data-svelte="svelte-19v14rz"]',document.head).forEach(d),n=g(e),s=h(e,"DIV",{class:!0});var a=v(s);l=h(a,"DIV",{class:!0});var i=v(l);r=h(i,"H2",{class:!0});var f=v(r);c=x(f,t[0]),f.forEach(d),o=g(i),$=h(i,"DIV",{class:!0});var m=v($);for(let t=0;t<N.length;t+=1)N[t].l(m);m.forEach(d),i.forEach(d),k=g(a),V&&V.l(a),a.forEach(d),this.h()},h(){w(r,"class","svelte-2mjhej"),w($,"class","item-grid svelte-2mjhej"),w(l,"class","mdc-card mdc-card--outlined grid-card svelte-2mjhej"),w(s,"class","container svelte-2mjhej"),y(s,"has-unknown-recipes",void 0!==t[2]&&null!==t[3])},m(t,e){j(t,n,e),j(t,s,e),C(s,l),C(l,r),C(r,c),C(l,o),C(l,$);for(let t=0;t<N.length;t+=1)N[t].m($,null);C(s,k),V&&V.m(s,null),B=!0},p(t,[n]){if((!B||1&n)&&e!==(e=t[0]+" | Stardew Completionist")&&(document.title=e),(!B||1&n)&&E(c,t[0]),10&n){let e;for(D=t[1],e=0;e<D.length;e+=1){const s=U(t,D,e);N[e]?(N[e].p(s,n),a(N[e],1)):(N[e]=F(s),N[e].c(),a(N[e],1),N[e].m($,null))}for(S(),e=D.length;e<N.length;e+=1)R(e);I()}void 0!==t[2]&&null!==t[3]?V?(V.p(t,n),12&n&&a(V,1)):(V=G(t),V.c(),a(V,1),V.m(s,null)):V&&(S(),i(V,1,1,()=>{V=null}),I()),12&n&&y(s,"has-unknown-recipes",void 0!==t[2]&&null!==t[3])},i(t){if(!B){for(let t=0;t<D.length;t+=1)a(N[t]);a(V),B=!0}},o(t){N=N.filter(Boolean);for(let t=0;t<N.length;t+=1)i(N[t]);i(V),B=!1},d(t){t&&d(n),t&&d(s),b(N,t),V&&V.d()}}}var nt=function(t,e,n,s){return new(n||(n=Promise))((function(l,r){function c(t){try{a(s.next(t))}catch(t){r(t)}}function o(t){try{a(s.throw(t))}catch(t){r(t)}}function a(t){var e;t.done?l(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,o)}a((s=s.apply(t,e||[])).next())}))};function st(n){return nt(this,void 0,void 0,(function*(){if(!["shipping","fish","artifacts","minerals","cooking","crafting"].includes(n.params.collection))return this.error(404,"Not found");const s=yield t.fetch(this.fetch);return"cooking"===n.params.collection||"crafting"===n.params.collection?{title:e.get(n.params.collection),recipes:s[n.params.collection],items:s[n.params.collection].map(t=>t.result)}:{title:e.get(n.params.collection),items:s[n.params.collection],recipes:void 0}}))}function lt(t,e,n){let s;k(t,D,t=>n(3,s=t));let{title:l}=e,{items:r}=e,{recipes:c}=e;return t.$$set=t=>{"title"in t&&n(0,l=t.title),"items"in t&&n(1,r=t.items),"recipes"in t&&n(2,c=t.recipes)},[l,r,c,s,t=>!s.knownRecipes.includes(t.name)]}export default class extends n{constructor(t){super(),s(this,t,lt,et,l,{title:0,items:1,recipes:2})}}export{st as preload};