import{Q as e,w as t,S as l,i as n,s,C as r,c as o,a as c,j as a,b as i,n as f,l as u,o as h,p as m,r as p,d as $,e as d,q as g,f as v,g as E,k as w,E as b,m as j,B as x,u as I,v as T,x as y,R,t as k,h as O,y as C,A as H,z as S,T as B}from"./client.30718474.js";import{I as D}from"./ItemButton.af5e1878.js";import{T as L}from"./Table.224a101f.js";function U(e,t,l){const n=e.slice();return n[7]=t[l][0],n[8]=t[l][1],n}function q(e,t,l){const n=e.slice();return n[11]=t[l],n}function A(e,t,l){const n=e.slice();return n[14]=t[l],n}function z(e,t,l){const n=e.slice();return n[17]=t[l],n}function N(e){let t,l;return t=new D({props:{item:e[17],scale:e[17].isCraftable?2:3,shadow:!0,grey:null!==e[3]&&!e[3].collectedItems.includes(e[17].id)}}),{c(){o(t.$$.fragment)},l(e){a(t.$$.fragment,e)},m(e,n){f(t,e,n),l=!0},p(e,l){const n={};2&l&&(n.item=e[17]),2&l&&(n.scale=e[17].isCraftable?2:3),10&l&&(n.grey=null!==e[3]&&!e[3].collectedItems.includes(e[17].id)),t.$set(n)},i(e){l||(h(t.$$.fragment,e),l=!0)},o(e){m(t.$$.fragment,e),l=!1},d(e){p(t,e)}}}function V(e){let t,l,n,s,r,o=e[1],a=[];for(let t=0;t<o.length;t+=1)a[t]=N(z(e,o,t));const f=e=>m(a[e],1,1,(()=>{a[e]=null}));return{c(){t=d("h6"),l=k(e[0]),n=c(),s=d("div");for(let e=0;e<a.length;e+=1)a[e].c();this.h()},l(r){t=v(r,"H6",{});var o=E(t);l=O(o,e[0]),o.forEach($),n=i(r),s=v(r,"DIV",{class:!0});var c=E(s);for(let e=0;e<a.length;e+=1)a[e].l(c);c.forEach($),this.h()},h(){w(s,"class","item-grid")},m(e,o){u(e,t,o),j(t,l),u(e,n,o),u(e,s,o);for(let e=0;e<a.length;e+=1)a[e].m(s,null);r=!0},p(e,t){if((!r||1&t)&&C(l,e[0]),10&t){let l;for(o=e[1],l=0;l<o.length;l+=1){const n=z(e,o,l);a[l]?(a[l].p(n,t),h(a[l],1)):(a[l]=N(n),a[l].c(),h(a[l],1),a[l].m(s,null))}for(H(),l=o.length;l<a.length;l+=1)f(l);x()}},i(e){if(!r){for(let e=0;e<o.length;e+=1)h(a[e]);r=!0}},o(e){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)m(a[e]);r=!1},d(e){e&&$(t),e&&$(n),e&&$(s),S(a,e)}}}function M(e){let t,l,n,s;return t=new r({props:{outlined:!0,style:"grid-area: r",$$slots:{default:[G]},$$scope:{ctx:e}}}),n=new r({props:{outlined:!0,class:"pa-4 ingredients",$$slots:{default:[K]},$$scope:{ctx:e}}}),{c(){o(t.$$.fragment),l=c(),o(n.$$.fragment)},l(e){a(t.$$.fragment,e),l=i(e),a(n.$$.fragment,e)},m(e,r){f(t,e,r),u(e,l,r),f(n,e,r),s=!0},p(e,l){const s={};1048588&l&&(s.$$scope={dirty:l,ctx:e}),t.$set(s);const r={};1048600&l&&(r.$$scope={dirty:l,ctx:e}),n.$set(r)},i(e){s||(h(t.$$.fragment,e),h(n.$$.fragment,e),s=!0)},o(e){m(t.$$.fragment,e),m(n.$$.fragment,e),s=!1},d(e){p(t,e),e&&$(l),p(n,e)}}}function P(e){let t,l=e[11].sources,n=[];for(let t=0;t<l.length;t+=1)n[t]=Q(A(e,l,t));return{c(){t=d("ul");for(let e=0;e<n.length;e+=1)n[e].c();this.h()},l(e){t=v(e,"UL",{class:!0});var l=E(t);for(let e=0;e<n.length;e+=1)n[e].l(l);l.forEach($),this.h()},h(){w(t,"class","source-list svelte-ljlfap")},m(e,l){u(e,t,l);for(let e=0;e<n.length;e+=1)n[e].m(t,null)},p(e,s){if(12&s){let r;for(l=e[11].sources,r=0;r<l.length;r+=1){const o=A(e,l,r);n[r]?n[r].p(o,s):(n[r]=Q(o),n[r].c(),n[r].m(t,null))}for(;r<n.length;r+=1)n[r].d(1);n.length=l.length}},d(e){e&&$(t),S(n,e)}}}function Q(e){let t,l,n=e[14]+"";return{c(){t=d("li"),l=k(n)},l(e){t=v(e,"LI",{});var s=E(t);l=O(s,n),s.forEach($)},m(e,n){u(e,t,n),j(t,l)},p(e,t){12&t&&n!==(n=e[14]+"")&&C(l,n)},d(e){e&&$(t)}}}function Y(e){let t,l,n,s,r,g,b,x,I,T,y=e[11].name+"";n=new D({props:{item:e[11].result,scale:e[11].result.isCraftable?1:2}});let R=null!=e[11].sources&&P(e);return{c(){t=d("tr"),l=d("th"),o(n.$$.fragment),s=c(),r=d("span"),g=k(y),b=c(),x=d("td"),R&&R.c(),I=c(),this.h()},l(e){t=v(e,"TR",{});var o=E(t);l=v(o,"TH",{scope:!0});var c=E(l);a(n.$$.fragment,c),s=i(c),r=v(c,"SPAN",{class:!0});var f=E(r);g=O(f,y),f.forEach($),c.forEach($),b=i(o),x=v(o,"TD",{});var u=E(x);R&&R.l(u),u.forEach($),I=i(o),o.forEach($),this.h()},h(){w(r,"class","pa-3"),w(l,"scope","row")},m(e,o){u(e,t,o),j(t,l),f(n,l,null),j(l,s),j(l,r),j(r,g),j(t,b),j(t,x),R&&R.m(x,null),j(t,I),T=!0},p(e,t){const l={};12&t&&(l.item=e[11].result),12&t&&(l.scale=e[11].result.isCraftable?1:2),n.$set(l),(!T||12&t)&&y!==(y=e[11].name+"")&&C(g,y),null!=e[11].sources?R?R.p(e,t):(R=P(e),R.c(),R.m(x,null)):R&&(R.d(1),R=null)},i(e){T||(h(n.$$.fragment,e),T=!0)},o(e){m(n.$$.fragment,e),T=!1},d(e){e&&$(t),p(n),R&&R.d()}}}function F(e){let t,l,n,s,r,o,a,f,p,g,b=e[2].filter(e[6]),I=[];for(let t=0;t<b.length;t+=1)I[t]=Y(q(e,b,t));const T=e=>m(I[e],1,1,(()=>{I[e]=null}));return{c(){t=d("thead"),l=d("tr"),n=d("th"),s=k("Recipe"),r=c(),o=d("th"),a=k("Sources"),f=c(),p=d("tbody");for(let e=0;e<I.length;e+=1)I[e].c();this.h()},l(e){t=v(e,"THEAD",{});var c=E(t);l=v(c,"TR",{});var u=E(l);n=v(u,"TH",{role:!0,scope:!0});var h=E(n);s=O(h,"Recipe"),h.forEach($),r=i(u),o=v(u,"TH",{role:!0,scope:!0});var m=E(o);a=O(m,"Sources"),m.forEach($),u.forEach($),c.forEach($),f=i(e),p=v(e,"TBODY",{});var d=E(p);for(let e=0;e<I.length;e+=1)I[e].l(d);d.forEach($),this.h()},h(){w(n,"role","columnheader"),w(n,"scope","col"),w(o,"role","columnheader"),w(o,"scope","col")},m(e,c){u(e,t,c),j(t,l),j(l,n),j(n,s),j(l,r),j(l,o),j(o,a),u(e,f,c),u(e,p,c);for(let e=0;e<I.length;e+=1)I[e].m(p,null);g=!0},p(e,t){if(12&t){let l;for(b=e[2].filter(e[6]),l=0;l<b.length;l+=1){const n=q(e,b,l);I[l]?(I[l].p(n,t),h(I[l],1)):(I[l]=Y(n),I[l].c(),h(I[l],1),I[l].m(p,null))}for(H(),l=b.length;l<I.length;l+=1)T(l);x()}},i(e){if(!g){for(let e=0;e<b.length;e+=1)h(I[e]);g=!0}},o(e){I=I.filter(Boolean);for(let e=0;e<I.length;e+=1)m(I[e]);g=!1},d(e){e&&$(t),e&&$(f),e&&$(p),S(I,e)}}}function G(e){let t,l,n,s,r;return s=new L({props:{$$slots:{default:[F]},$$scope:{ctx:e}}}),{c(){t=d("h6"),l=k("Unknown Recipes"),n=c(),o(s.$$.fragment),this.h()},l(e){t=v(e,"H6",{class:!0});var r=E(t);l=O(r,"Unknown Recipes"),r.forEach($),n=i(e),a(s.$$.fragment,e),this.h()},h(){w(t,"class","pl-4 pt-4 pr-4")},m(e,o){u(e,t,o),j(t,l),u(e,n,o),f(s,e,o),r=!0},p(e,t){const l={};1048588&t&&(l.$$scope={dirty:t,ctx:e}),s.$set(l)},i(e){r||(h(s.$$.fragment,e),r=!0)},o(e){m(s.$$.fragment,e),r=!1},d(e){e&&$(t),e&&$(n),p(s,e)}}}function J(e){let l,n,s,r,o,a,f,h=(B.get(e[7])||t.items[e[7]].name)+"",m=(e[3].items[e[7]]??0)+"",p=e[8]+"";return{c(){l=d("li"),n=k(h),s=k(":\n            "),r=k(m),o=k("/"),a=k(p),f=c()},l(e){l=v(e,"LI",{});var t=E(l);n=O(t,h),s=O(t,":\n            "),r=O(t,m),o=O(t,"/"),a=O(t,p),f=i(t),t.forEach($)},m(e,t){u(e,l,t),j(l,n),j(l,s),j(l,r),j(l,o),j(l,a),j(l,f)},p(e,l){16&l&&h!==(h=(B.get(e[7])||t.items[e[7]].name)+"")&&C(n,h),24&l&&m!==(m=(e[3].items[e[7]]??0)+"")&&C(r,m),16&l&&p!==(p=e[8]+"")&&C(a,p)},d(e){e&&$(l)}}}function K(e){let t,l,n,s,r=Object.entries(e[4]??{}),o=[];for(let t=0;t<r.length;t+=1)o[t]=J(U(e,r,t));return{c(){t=d("h6"),l=k("Required Ingredients"),n=c(),s=d("ul");for(let e=0;e<o.length;e+=1)o[e].c();this.h()},l(e){t=v(e,"H6",{});var r=E(t);l=O(r,"Required Ingredients"),r.forEach($),n=i(e),s=v(e,"UL",{class:!0});var c=E(s);for(let e=0;e<o.length;e+=1)o[e].l(c);c.forEach($),this.h()},h(){w(s,"class","svelte-ljlfap")},m(e,r){u(e,t,r),j(t,l),u(e,n,r),u(e,s,r);for(let e=0;e<o.length;e+=1)o[e].m(s,null)},p(e,t){if(24&t){let l;for(r=Object.entries(e[4]??{}),l=0;l<r.length;l+=1){const n=U(e,r,l);o[l]?o[l].p(n,t):(o[l]=J(n),o[l].c(),o[l].m(s,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=r.length}},d(e){e&&$(t),e&&$(n),e&&$(s),S(o,e)}}}function W(e){let t,l,n,s,I,T;document.title=t=e[0]+" | Stardew Completionist",s=new r({props:{outlined:!0,class:"pa-4 grid-card",$$slots:{default:[V]},$$scope:{ctx:e}}});let y=void 0!==e[2]&&null!==e[3]&&M(e);return{c(){l=c(),n=d("div"),o(s.$$.fragment),I=c(),y&&y.c(),this.h()},l(e){g('[data-svelte="svelte-19v14rz"]',document.head).forEach($),l=i(e),n=v(e,"DIV",{class:!0});var t=E(n);a(s.$$.fragment,t),I=i(t),y&&y.l(t),t.forEach($),this.h()},h(){w(n,"class","container svelte-ljlfap"),b(n,"has-unknown-recipes",void 0!==e[2]&&null!==e[3])},m(e,t){u(e,l,t),u(e,n,t),f(s,n,null),j(n,I),y&&y.m(n,null),T=!0},p(e,[l]){(!T||1&l)&&t!==(t=e[0]+" | Stardew Completionist")&&(document.title=t);const r={};1048587&l&&(r.$$scope={dirty:l,ctx:e}),s.$set(r),void 0!==e[2]&&null!==e[3]?y?(y.p(e,l),12&l&&h(y,1)):(y=M(e),y.c(),h(y,1),y.m(n,null)):y&&(H(),m(y,1,1,(()=>{y=null})),x()),12&l&&b(n,"has-unknown-recipes",void 0!==e[2]&&null!==e[3])},i(e){T||(h(s.$$.fragment,e),h(y),T=!0)},o(e){m(s.$$.fragment,e),m(y),T=!1},d(e){e&&$(l),e&&$(n),p(s),y&&y.d()}}}async function X(l){return["shipping","fish","artifacts","minerals","cooking","crafting"].includes(l.params.collection)?"cooking"===l.params.collection||"crafting"===l.params.collection?{title:e.get(l.params.collection),recipes:t[l.params.collection],items:t[l.params.collection].map((e=>e.result))}:{title:e.get(l.params.collection),items:t[l.params.collection],recipes:void 0}:this.error(404,"Not found")}function Z(e,l,n){let s,r;I(e,y,(e=>n(3,s=e)));let{title:o}=l,{items:c}=l,{recipes:a}=l;const i=T([y,R().page],(([e])=>{var l,n,s;if(a&&null!==e){const r={},o=e=>{var l,n;for(const[s,c]of Object.entries(e.ingredients)){const e=Object.values(t.recipes).find((e=>e.result.id===s));e&&(null!==(l=r[n=e.name])&&void 0!==l||(r[n]=0),r[e.name]+=c/e.amount,o(e))}},c=a.filter((t=>!e.collectedItems.includes(t.result.id)));for(const e of c)o(e);for(const e in r)r[e]=Math.ceil(r[e]);for(const e of c)null!==(l=r[s=e.name])&&void 0!==l||(r[s]=1);const i={};for(const[e,l]of Object.entries(r)){const s=t.recipes[e];for(const[e,r]of Object.entries(s.ingredients))Object.values(t.recipes).some((t=>t.result.id===e))||(null!==(n=i[e])&&void 0!==n||(i[e]=0),i[e]+=r*l)}return i}return null}));I(e,i,(e=>n(4,r=e)));return e.$$set=e=>{"title"in e&&n(0,o=e.title),"items"in e&&n(1,c=e.items),"recipes"in e&&n(2,a=e.recipes)},[o,c,a,s,r,i,e=>!s.knownRecipes.includes(e.name)]}export default class extends l{constructor(e){super(),n(this,e,Z,W,s,{title:0,items:1,recipes:2})}}export{X as preload};
