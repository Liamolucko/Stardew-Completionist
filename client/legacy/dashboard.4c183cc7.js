import{a as n,b as t,c as e,d as r,i as o,e as a,S as i,s as c,f as l,g as s,t as f,V as u,q as h,j as v,k as d,l as m,m as g,n as p,p as $,u as b,v as y,x as E,z as j,L as w,y as O,B as x,D as T,K as D,E as H,F as B,T as I,C as A,h as S,o as G,w as R,A as V,H as C,J as q,I as k}from"./client.d7167177.js";import{T as M}from"./Table.64d02363.js";import{I as U}from"./ItemButton.1fc50432.js";function P(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,a=t(n);if(r){var i=t(this).constructor;o=Reflect.construct(a,arguments,i)}else o=a.apply(this,arguments);return e(this,o)}}function W(n,t){var e;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(e=function(n,t){if(!n)return;if("string"==typeof n)return z(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(n);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return z(n,t)}(n))||t&&n&&"number"==typeof n.length){e&&(n=e);var r=0,o=function(){};return{s:o,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){e=n[Symbol.iterator]()},n:function(){var n=e.next();return i=n.done,n},e:function(n){c=!0,a=n},f:function(){try{i||null==e.return||e.return()}finally{if(c)throw a}}}}function z(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function F(n,t,e){var r=n.slice();return r[6]=t[e][0],r[7]=t[e][1],r}function J(n,t,e){var r=n.slice();return r[10]=t[e],r}function K(n,t,e){var r=n.slice();return r[13]=t[e],r}function L(n,t,e){var r=n.slice();return r[16]=t[e],r}function N(n){var t,e;return{c:function(){t=s("p"),e=f("When you select a save file, this section shows information about what you\n    should do next."),this.h()},l:function(n){t=m(n,"P",{class:!0});var r=g(t);e=p(r,"When you select a save file, this section shows information about what you\n    should do next."),r.forEach(v),this.h()},h:function(){$(t,"class","no-save svelte-7re0bb")},m:function(n,r){b(n,t,r),y(t,e)},p:I,i:I,o:I,d:function(n){n&&v(t)}}}function Y(n){var t,e,r,o,a;return e=new A({props:{outlined:!0,$$slots:{default:[nn]},$$scope:{ctx:n}}}),o=new A({props:{outlined:!0,class:"seasonal",$$slots:{default:[en]},$$scope:{ctx:n}}}),{c:function(){t=s("div"),S(e.$$.fragment),r=l(),S(o.$$.fragment),this.h()},l:function(n){t=m(n,"DIV",{class:!0});var a=g(t);G(e.$$.fragment,a),r=d(a),G(o.$$.fragment,a),a.forEach(v),this.h()},h:function(){$(t,"class","container svelte-7re0bb")},m:function(n,i){b(n,t,i),R(e,t,null),y(t,r),R(o,t,null),a=!0},p:function(n,t){var r={};524290&t&&(r.$$scope={dirty:t,ctx:n}),e.$set(r);var a={};524293&t&&(a.$$scope={dirty:t,ctx:n}),o.$set(a)},i:function(n){a||(O(e.$$.fragment,n),O(o.$$.fragment,n),a=!0)},o:function(n){j(e.$$.fragment,n),j(o.$$.fragment,n),a=!1},d:function(n){n&&v(t),V(e),V(o)}}}function Q(n){var t,e;return{c:function(){t=s("img"),this.h()},l:function(n){t=m(n,"IMG",{alt:!0,src:!0,class:!0}),this.h()},h:function(){$(t,"alt","heart"),t.src!==(e="./images/heart-"+(n[10].hearts>=n[16]+1?"filled":"outline")+".png")&&$(t,"src",e),$(t,"class","svelte-7re0bb")},m:function(n,e){b(n,t,e)},p:function(n,r){2&r&&t.src!==(e="./images/heart-"+(n[10].hearts>=n[16]+1?"filled":"outline")+".png")&&$(t,"src",e)},d:function(n){n&&v(t)}}}function X(n){var t,e;return t=new U({props:{item:n[13],scale:n[13].craftable?1:2}}),{c:function(){S(t.$$.fragment)},l:function(n){G(t.$$.fragment,n)},m:function(n,r){R(t,n,r),e=!0},p:function(n,e){var r={};2&e&&(r.item=n[13]),2&e&&(r.scale=n[13].craftable?1:2),t.$set(r)},i:function(n){e||(O(t.$$.fragment,n),e=!0)},o:function(n){j(t.$$.fragment,n),e=!1},d:function(n){V(t,n)}}}function Z(n){for(var t,e,r,o,a,i,c,u,h,E,x,T,H,B,I=n[10].villager+"",A=n[10].date+"",S=k(Array(n[10].maxHearts).keys()),G=[],R=0;R<S.length;R+=1)G[R]=Q(L(n,S,R));for(var V=n[10].bestGifts,M=[],U=0;U<V.length;U+=1)M[U]=X(K(n,V,U));var P=function(n){return j(M[n],1,1,(function(){M[n]=null}))};return{c:function(){t=s("tr"),e=s("th"),r=f(I),o=l(),a=s("td"),i=s("div");for(var n=0;n<G.length;n+=1)G[n].c();c=l(),u=s("td"),h=f(A),E=l(),x=s("td"),T=s("div");for(var v=0;v<M.length;v+=1)M[v].c();H=l(),this.h()},l:function(n){t=m(n,"TR",{});var l=g(t);e=m(l,"TH",{scope:!0});var s=g(e);r=p(s,I),s.forEach(v),o=d(l),a=m(l,"TD",{});var f=g(a);i=m(f,"DIV",{class:!0});for(var $=g(i),b=0;b<G.length;b+=1)G[b].l($);$.forEach(v),f.forEach(v),c=d(l),u=m(l,"TD",{});var y=g(u);h=p(y,A),y.forEach(v),E=d(l),x=m(l,"TD",{});var j=g(x);T=m(j,"DIV",{class:!0});for(var w=g(T),O=0;O<M.length;O+=1)M[O].l(w);w.forEach(v),j.forEach(v),H=d(l),l.forEach(v),this.h()},h:function(){$(e,"scope","row"),$(i,"class","hearts svelte-7re0bb"),$(T,"class","best-gifts svelte-7re0bb")},m:function(n,l){b(n,t,l),y(t,e),y(e,r),y(t,o),y(t,a),y(a,i);for(var s=0;s<G.length;s+=1)G[s].m(i,null);y(t,c),y(t,u),y(u,h),y(t,E),y(t,x),y(x,T);for(var f=0;f<M.length;f+=1)M[f].m(T,null);y(t,H),B=!0},p:function(n,t){if((!B||2&t)&&I!==(I=n[10].villager+"")&&C(r,I),2&t){var e;for(S=k(Array(n[10].maxHearts).keys()),e=0;e<S.length;e+=1){var o=L(n,S,e);G[e]?G[e].p(o,t):(G[e]=Q(o),G[e].c(),G[e].m(i,null))}for(;e<G.length;e+=1)G[e].d(1);G.length=S.length}if((!B||2&t)&&A!==(A=n[10].date+"")&&C(h,A),2&t){var a;for(V=n[10].bestGifts,a=0;a<V.length;a+=1){var c=K(n,V,a);M[a]?(M[a].p(c,t),O(M[a],1)):(M[a]=X(c),M[a].c(),O(M[a],1),M[a].m(T,null))}for(D(),a=V.length;a<M.length;a+=1)P(a);w()}},i:function(n){if(!B){for(var t=0;t<V.length;t+=1)O(M[t]);B=!0}},o:function(n){M=M.filter(Boolean);for(var t=0;t<M.length;t+=1)j(M[t]);B=!1},d:function(n){n&&v(t),q(G,n),q(M,n)}}}function _(n){for(var t,e,r,o,a,i,c,u,h,E,x,T,H,B,I,A,S=n[1],G=[],R=0;R<S.length;R+=1)G[R]=Z(J(n,S,R));var V=function(n){return j(G[n],1,1,(function(){G[n]=null}))};return{c:function(){t=s("thead"),e=s("tr"),r=s("th"),o=f("Villager"),a=l(),i=s("th"),c=f("Hearts"),u=l(),h=s("th"),E=f("Birthday"),x=l(),T=s("th"),H=f("Best Gifts"),B=l(),I=s("tbody");for(var n=0;n<G.length;n+=1)G[n].c();this.h()},l:function(n){t=m(n,"THEAD",{});var l=g(t);e=m(l,"TR",{});var s=g(e);r=m(s,"TH",{role:!0,scope:!0});var f=g(r);o=p(f,"Villager"),f.forEach(v),a=d(s),i=m(s,"TH",{role:!0,scope:!0});var $=g(i);c=p($,"Hearts"),$.forEach(v),u=d(s),h=m(s,"TH",{role:!0,scope:!0});var b=g(h);E=p(b,"Birthday"),b.forEach(v),x=d(s),T=m(s,"TH",{role:!0,scope:!0});var y=g(T);H=p(y,"Best Gifts"),y.forEach(v),s.forEach(v),l.forEach(v),B=d(n),I=m(n,"TBODY",{});for(var j=g(I),w=0;w<G.length;w+=1)G[w].l(j);j.forEach(v),this.h()},h:function(){$(r,"role","columnheader"),$(r,"scope","col"),$(i,"role","columnheader"),$(i,"scope","col"),$(h,"role","columnheader"),$(h,"scope","col"),$(T,"role","columnheader"),$(T,"scope","col")},m:function(n,l){b(n,t,l),y(t,e),y(e,r),y(r,o),y(e,a),y(e,i),y(i,c),y(e,u),y(e,h),y(h,E),y(e,x),y(e,T),y(T,H),b(n,B,l),b(n,I,l);for(var s=0;s<G.length;s+=1)G[s].m(I,null);A=!0},p:function(n,t){if(2&t){var e;for(S=n[1],e=0;e<S.length;e+=1){var r=J(n,S,e);G[e]?(G[e].p(r,t),O(G[e],1)):(G[e]=Z(r),G[e].c(),O(G[e],1),G[e].m(I,null))}for(D(),e=S.length;e<G.length;e+=1)V(e);w()}},i:function(n){if(!A){for(var t=0;t<S.length;t+=1)O(G[t]);A=!0}},o:function(n){G=G.filter(Boolean);for(var t=0;t<G.length;t+=1)j(G[t]);A=!1},d:function(n){n&&v(t),n&&v(B),n&&v(I),q(G,n)}}}function nn(n){var t,e;return t=new M({props:{$$slots:{default:[_]},$$scope:{ctx:n}}}),{c:function(){S(t.$$.fragment)},l:function(n){G(t.$$.fragment,n)},m:function(n,r){R(t,n,r),e=!0},p:function(n,e){var r={};524290&e&&(r.$$scope={dirty:e,ctx:n}),t.$set(r)},i:function(n){e||(O(t.$$.fragment,n),e=!0)},o:function(n){j(t.$$.fragment,n),e=!1},d:function(n){V(t,n)}}}function tn(n){var t,e;return t=new U({props:{item:H.items[n[6]],scale:H.items[n[6]].craftable?2:3,quantity:n[7]}}),{c:function(){S(t.$$.fragment)},l:function(n){G(t.$$.fragment,n)},m:function(n,r){R(t,n,r),e=!0},p:function(n,e){var r={};4&e&&(r.item=H.items[n[6]]),4&e&&(r.scale=H.items[n[6]].craftable?2:3),4&e&&(r.quantity=n[7]),t.$set(r)},i:function(n){e||(O(t.$$.fragment,n),e=!0)},o:function(n){j(t.$$.fragment,n),e=!1},d:function(n){V(t,n)}}}function en(n){for(var t,e,r,o,a,i=n[0].season[0].toUpperCase()+n[0].season.slice(1)+"",c=Object.entries(n[2]),u=[],h=0;h<c.length;h+=1)u[h]=tn(F(n,c,h));var E=function(n){return j(u[n],1,1,(function(){u[n]=null}))};return{c:function(){t=s("h6"),e=f(i),r=l(),o=s("div");for(var n=0;n<u.length;n+=1)u[n].c();this.h()},l:function(n){t=m(n,"H6",{class:!0});var a=g(t);e=p(a,i),a.forEach(v),r=d(n),o=m(n,"DIV",{class:!0});for(var c=g(o),l=0;l<u.length;l+=1)u[l].l(c);c.forEach(v),this.h()},h:function(){$(t,"class","pb-2"),$(o,"class","seasonal-items")},m:function(n,i){b(n,t,i),y(t,e),b(n,r,i),b(n,o,i);for(var c=0;c<u.length;c+=1)u[c].m(o,null);a=!0},p:function(n,t){if((!a||1&t)&&i!==(i=n[0].season[0].toUpperCase()+n[0].season.slice(1)+"")&&C(e,i),4&t){var r;for(c=Object.entries(n[2]),r=0;r<c.length;r+=1){var l=F(n,c,r);u[r]?(u[r].p(l,t),O(u[r],1)):(u[r]=tn(l),u[r].c(),O(u[r],1),u[r].m(o,null))}for(D(),r=c.length;r<u.length;r+=1)E(r);w()}},i:function(n){if(!a){for(var t=0;t<c.length;t+=1)O(u[t]);a=!0}},o:function(n){u=u.filter(Boolean);for(var t=0;t<u.length;t+=1)j(u[t]);a=!1},d:function(n){n&&v(t),n&&v(r),n&&v(o),q(u,n)}}}function rn(n){var t,e,r,o,a,i,c,x,T=[Y,N],H=[];function B(n,t){return null!==n[0]?0:1}return a=B(n),i=H[a]=T[a](n),{c:function(){t=l(),e=s("h4"),r=f("Dashboard"),o=l(),i.c(),c=u(),this.h()},l:function(n){h('[data-svelte="svelte-qmib3v"]',document.head).forEach(v),t=d(n),e=m(n,"H4",{class:!0});var a=g(e);r=p(a,"Dashboard"),a.forEach(v),o=d(n),i.l(n),c=u(),this.h()},h:function(){document.title="Dashboard | Stardew Completionist",$(e,"class","title svelte-7re0bb")},m:function(n,i){b(n,t,i),b(n,e,i),y(e,r),b(n,o,i),H[a].m(n,i),b(n,c,i),x=!0},p:function(n,t){var e=E(t,1)[0],r=a;(a=B(n))===r?H[a].p(n,e):(D(),j(H[r],1,1,(function(){H[r]=null})),w(),(i=H[a])?i.p(n,e):(i=H[a]=T[a](n)).c(),O(i,1),i.m(c.parentNode,c))},i:function(n){x||(O(i),x=!0)},o:function(n){j(i),x=!1},d:function(n){n&&v(t),n&&v(e),n&&v(o),H[a].d(n),n&&v(c)}}}function on(n,t,e){var r,o,a;x(n,B,(function(n){return e(0,r=n)}));var i=T(B,(function(n,t){null!==n&&t(Object.values(H.villagers).sort((function(t,e){return(t.birthDate-n.date+112)%112-(e.birthDate-n.date+112)%112})).map((function(t){var e,r,o,a;return{villager:t.name,date:t.birthday,hearts:null!==(r=null===(e=n.relationships[t.name])||void 0===e?void 0:e.hearts)&&void 0!==r?r:0,maxHearts:null!==(a=null===(o=n.relationships[t.name])||void 0===o?void 0:o.max)&&void 0!==a?a:t.datable?8:10,bestGifts:t.bestGifts}})))}));x(n,i,(function(n){return e(1,o=n)}));var c=T(B,(function(n){var t,e,r,o,a,i,c,l;if(null===n)return null;var s,f={},u={},h=function n(t){for(var e,r,o=function(){var t=E(i[a],2),o=t[0],c=t[1],l=Object.values(H.recipes).find((function(n){return n.result.id===o}));l&&(null!==(e=u[r=l.name])&&void 0!==e||(u[r]=0),u[l.name]+=c/l.amount,n(l))},a=0,i=Object.entries(t.ingredients);a<i.length;a++)o()},v=Object.values(H.recipes).filter((function(t){return!n.collected.includes(t.result.id)})),d=W(v);try{for(d.s();!(s=d.n()).done;){h(s.value)}}catch(n){d.e(n)}finally{d.f()}for(var m in u)u[m]=Math.ceil(u[m]);var g,p=W(v);try{for(p.s();!(g=p.n()).done;){var $=g.value;null!==(t=u[c=$.name])&&void 0!==t||(u[c]=1)}}catch(n){p.e(n)}finally{p.f()}for(var b=0,y=Object.entries(u);b<y.length;b++)for(var j=E(y[b],2),w=j[0],O=j[1],x=H.recipes[w],T=function(){var n=E(B[D],2),t=n[0],r=n[1];if(Object.values(H.recipes).some((function(n){return n.result.id===t})))return"continue";null!==(e=f[t])&&void 0!==e||(f[t]=0),f[t]+=r*O},D=0,B=Object.entries(x.ingredients);D<B.length;D++)T();var I,A=W(H.shipping);try{for(A.s();!(I=A.n()).done;){var S=I.value.id;n.collected.includes(S)||(null!==(r=f[S])&&void 0!==r||(f[S]=0),f[S]+=1)}}catch(n){A.e(n)}finally{A.f()}var G,R=W(H.fish);try{for(R.s();!(G=R.n()).done;){var V=G.value.id;n.collected.includes(V)||null!==(o=f[V])&&void 0!==o||(f[V]=1)}}catch(n){R.e(n)}finally{R.f()}for(var C=0,q=Object.values(H.bundles);C<q.length;C++){var k=q[C];for(var M in k.items){var U=k.items[M];n.bundles[k.id][M]||(null!==(a=f[l=U.id])&&void 0!==a||(f[l]=0),f[U.id]+=U.amount)}}for(var P in f)f[P]-=null!==(i=n.items[P])&&void 0!==i?i:0,f[P]<=0&&delete f[P];return f})),l=T(c,(function(n,t){null!==n&&t(Object.fromEntries(Object.entries(n).filter((function(n){var t=E(n,2),e=t[0];t[1];var o=H.items[e];return o&&void 0!==o.seasons&&o.seasons[r.season]&&Object.values(o.seasons).filter((function(n){return n})).length<3}))))}));return x(n,l,(function(n){return e(2,a=n)})),[r,o,a,i,l]}var an=function(t){n(l,i);var e=P(l);function l(n){var t;return r(this,l),t=e.call(this),o(a(t),n,on,rn,c,{}),t}return l}();export default an;
