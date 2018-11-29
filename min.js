var HyperHTMLElement=function(t){"use strict";
/*! (c) Andrea Giammarchi (ISC) */var e=function(t){function e(){return this}function n(t){return t.join(G).replace(ot,o).replace(it,r)}function r(t,e,n,r){return"<"+e+n.replace(at,i)+r}function i(t,e,n){return e+(n||'"')+q+(n||'"')}function o(t,e,n){return Y.test(e)?t:"<"+e+n+"></"+e+">"}function a(t,e,n){return{type:t,name:n,node:e,path:function(t){var e,n=[];switch(t.nodeType){case J:case U:e=t;break;case K:e=t.parentNode,l(n,e,t);break;default:e=t.ownerElement}for(;e=(t=e).parentNode;)l(n,e,t);return n}(e)}}function u(t,e){for(var n=e.length,r=0;r<n;)t=t.childNodes[e[r++]];return t}function s(t,e,n){for(var r=t.childNodes,i=r.length,o=0;o<i;){var u=r[o++];switch(u.nodeType){case J:c(u,e,n),s(u,e,n);break;case K:u.textContent===q&&(n.shift(),e.push(X.test(t.nodeName)?a("text",t):a("any",u)));break;case Q:X.test(t.nodeName)&&ut.call(u.textContent)===G&&(n.shift(),e.push(a("text",t)))}}}function c(e,n,r){for(var i=new N,o=e.attributes,u=[],s=u.slice.call(o,0),c=s.length,l=0;l<c;){var f=s[l++];if(f.value===q){var h=f.name;if(!i.has(h)){var d=r.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),p=o[d]||o[d.toLowerCase()];i.set(h,p),n.push(a("attr",p,d))}u.push(f)}}for(c=u.length,l=0;l<c;){var v=u[l++];/^id$/i.test(v.name)?e.removeAttribute(v.name):e.removeAttributeNode(v)}var m=e.nodeName;if(/^script$/i.test(m)){var g=t.createElement(m);for(c=o.length,l=0;l<c;)g.setAttributeNode(o[l++].cloneNode(!0));g.textContent=e.textContent,e.parentNode.replaceChild(g,e)}}function l(t,e,n){t.unshift(t.indexOf.call(e.childNodes,n))}function f(t,e){var r=n(e),i=t.transform;i&&(r=i(r));var o=B(r,t.type),a=[];s(o,a,e.slice(0));var c={content:o,updates:function(n){for(var r=[],i=a.length,o=0;o<i;){var s=a[o++],c=u(n,s.path);switch(s.type){case"any":r.push(t.any(c,[]));break;case"attr":r.push(t.attribute(c,s.name,s.node));break;case"text":r.push(t.text(c)),c.textContent=""}}return function(){var t=arguments.length,o=t-1,a=1;if(i!==o)throw new Error(o+" values instead of "+i+"\n"+e.join(", "));for(;a<t;)r[a-1](arguments[a++]);return n}}};return st.set(e,c),c}function h(e,n){var r=st.get(n)||f(e,n),i=I.call(t,r.content,!0),o={content:i,template:n,updates:r.updates(i)};return ct.set(e,o),o}function d(t){this.childNodes=t,this.length=t.length,this.first=t[0],this.last=t[this.length-1],this._=null}function p(t){return this.type=t,function(t){return function(e){var n=ct.get(t);return null!=n&&n.template===e||(n=h(t,e)),n.updates.apply(null,arguments),n.content}}(this)}function v(t){var e=jt.get(this);return e&&e.template===At(t)?e.tagger.apply(null,arguments):function(t){t=At(t);var e=new p(ft in this?"svg":"html");jt.set(this,{tagger:e,template:t}),this.textContent="",this.appendChild(e.apply(null,arguments))}.apply(this,arguments),this}function m(t){return arguments.length<2?null==t?Ot("html"):"string"==typeof t?m.wire(null,t):"raw"in t?Ot("html")(t):"nodeType"in t?m.bind(t):Tt(t,"html"):("raw"in t?Ot("html"):m.wire).apply(null,arguments)}/*! (c) Andrea Giammarchi - ISC */var g={};try{g.WeakMap=WeakMap}catch(t){g.WeakMap=function(t,e){function n(e){i(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(r,this)}function r(t){this.set(t[0],t[1])}var i=e.defineProperty,o=e.hasOwnProperty,a=n.prototype;return a.delete=function(t){return this.has(t)&&delete t[this._]},a.get=function(t){return this.has(t)?t[this._]:void 0},a.has=function(t){return o.call(t,this._)},a.set=function(t,e){return i(t,this._,{configurable:!0,value:e}),this},n}(Math.random(),Object)}var b=g.WeakMap,y={};try{y.WeakSet=WeakSet}catch(t){!function(t,e){function n(){e(this,"_",{value:"_@ungap/weakmap"+t++})}var r=n.prototype;r.add=function(t){return this.has(t)||e(t,this._,{value:!0,configurable:!0}),this},r.has=function(t){return this.hasOwnProperty.call(t,this._)},r.delete=function(t){return this.has(t)&&delete t[this._]},y.WeakSet=n}(Math.random(),Object.defineProperty)}var w=y.WeakSet,E={};try{E.Map=Map}catch(t){E.Map=function(){function t(t){return-1<(e=n.indexOf(t))}var e=0,n=[],r=[];return{delete:function(i){var o=t(i);return o&&(n.splice(e,1),r.splice(e,1)),o},get:function(n){return t(n)?r[e]:void 0},has:function(e){return t(e)},set:function(i,o){return r[t(i)?e:n.push(i)-1]=o,this}}}}var N=E.Map,_=function(t,e,n,r,i,o){if(i-r<2)e.insertBefore(t(n[r],1),o);else{for(var a=e.ownerDocument.createDocumentFragment();r<i;)a.appendChild(t(n[r++],1));e.insertBefore(a,o)}},x=function(t,e){return t==e},k=function(t){return t},C=function(t,e,n,r,i,o,a){var u=o-i;if(u<1)return-1;for(;n-e>=u;){for(var s=e,c=i;s<n&&c<o&&a(t[s],r[c]);)s++,c++;if(c===o)return e;e=s+1}return-1},$=function(t,e,n,r,i){return n<r?t(e[n],0):0<n?t(e[n-1],-0).nextSibling:i},A=function(t,e,n,r,i){if(i-r<2)e.removeChild(t(n[r],-1));else{var o=e.ownerDocument.createRange();o.setStartBefore(t(n[r],-1)),o.setEndAfter(t(n[i-1],-1)),o.deleteContents()}},S=function(t,e,n){for(var r=1,i=e;r<i;){var o=(r+i)/2>>>0;n<t[o]?i=o:r=o+1}return r},O=function(t,e,n,r,i,o,a,u,s,c,l,f,h){!function(t,e,n,r,i,o,a,u,s){for(var c=new N,l=t.length,f=a,h=0;h<l;)switch(t[h++]){case 0:i++,f++;break;case 1:c.set(r[i],1),_(e,n,r,i++,i,f<u?e(o[f],1):s);break;case-1:f++}for(h=0;h<l;)switch(t[h++]){case 0:a++;break;case-1:c.has(o[a])?a++:A(e,n,o,a++,a)}}(function(t,e,n,r,i,o,a){var u=n+o,s=[],c=void 0,l=void 0,f=void 0,h=void 0,d=void 0,p=void 0,v=void 0;t:for(c=0;c<=u;c++){if(c>50)return null;for(v=c-1,d=c?s[c-1]:[0,0],p=s[c]=[],l=-c;l<=c;l+=2){for(f=(h=l===-c||l!==c&&d[v+l-1]<d[v+l+1]?d[v+l+1]:d[v+l-1]+1)-l;h<o&&f<n&&a(r[i+h],t[e+f]);)h++,f++;if(h===o&&f===n)break t;p[c+l]=h}}var m=Array(c/2+u/2),g=m.length-1;for(c=s.length-1;c>=0;c--){for(;h>0&&f>0&&a(r[i+h-1],t[e+f-1]);)m[g--]=0,h--,f--;if(!c)break;v=c-1,d=c?s[c-1]:[0,0],(l=h-f)==-c||l!==c&&d[v+l-1]<d[v+l+1]?(f--,m[g--]=1):(h--,m[g--]=-1)}return m}(n,r,o,a,u,c,f)||function(t,e,n,r,i,o,a,u){var s=0,c=r<u?r:u,l=Array(c++),f=Array(c);f[0]=-1;for(var h=1;h<c;h++)f[h]=a;for(var d=new N,p=o;p<a;p++)d.set(i[p],p);for(var v=e;v<n;v++){var m=d.get(t[v]);null!=m&&-1<(s=S(f,c,m))&&(f[s]=m,l[s]={newi:v,oldi:m,prev:l[s-1]})}for(s=--c,--a;f[s]>a;)--s;c=u+r-s;var g=Array(c),b=l[s];for(--n;b;){for(var y=b,w=y.newi,E=y.oldi;n>w;)g[--c]=1,--n;for(;a>E;)g[--c]=-1,--a;g[--c]=0,--n,--a,b=b.prev}for(;n>=e;)g[--c]=1,--n;for(;a>=o;)g[--c]=-1,--a;return g}(n,r,i,o,a,u,s,c),t,e,n,r,a,u,l,h)},T=function(t,e,n,r){r||(r={});for(var i=r.compare||x,o=r.node||k,a=null==r.before?null:o(r.before,0),u=e.length,s=u,c=0,l=n.length,f=0;c<s&&f<l&&i(e[c],n[f]);)c++,f++;for(;c<s&&f<l&&i(e[s-1],n[l-1]);)s--,l--;var h=c===s,d=f===l;if(h&&d)return n;if(h&&f<l)return _(o,t,n,f,l,$(o,e,c,u,a)),n;if(d&&c<s)return A(o,t,e,c,s),n;var p=s-c,v=l-f,m=-1;if(p<v){if(-1<(m=C(n,f,l,e,c,s,i)))return _(o,t,n,f,m,o(e[c],0)),_(o,t,n,m+p,l,$(o,e,s,u,a)),n}else if(v<p&&-1<(m=C(e,c,s,n,f,l,i)))return A(o,t,e,c,m),A(o,t,e,m+v,s),n;return p<2||v<2?(_(o,t,n,f,l,o(e[c],0)),A(o,t,e,c,s),n):p===v&&function(t,e,n,r,i,o){for(;r<i&&o(n[r],t[e-1]);)r++,e--;return 0===e}(n,l,e,c,s,i)?(_(o,t,n,f,l,$(o,e,s,u,a)),n):(O(o,t,n,f,l,v,e,c,s,p,u,i,a),n)},M={};try{M.CustomEvent=new CustomEvent(".").constructor}catch(e){M.CustomEvent=function(e,n){n||(n={});var r=t.createEvent("Event"),i=!!n.bubbles,o=!!n.cancelable;return r.initEvent(e,i,o),r.bubbles=i,r.cancelable=o,r.detail=n.detail,r}}var j=M.CustomEvent,P=function(t,e){var n="_"+t+"$";return{get:function(){return this[n]||L(this,n,e.call(this,t))},set:function(t){L(this,n,t)}}},L=function(t,e,n){return Object.defineProperty(t,e,{configurable:!0,value:"function"==typeof n?function(){return t._wire$=n.apply(this,arguments)}:n})[e]},D={},R={},W=[],F=R.hasOwnProperty,H=0,z={attributes:D,define:function(t,e){t.indexOf("-")<0?(t in R||(H=W.push(t)),R[t]=e):D[t]=e},invoke:function(t,e){for(var n=0;n<H;n++){var r=W[n];if(F.call(t,r))return R[r](t[r],e)}}},Z=Array.isArray||function(t){var e=t.call([]);return function(n){return t.call(n)===e}}({}.toString),B=function(t){function e(t,e){for(var n=e.length;n--;)t.appendChild(e[0])}function n(e){return e===i?t.createDocumentFragment():t.createElement(e)}function r(t){var r=n(i),o=n("div");return o.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t+"</svg>",e(r,o.firstChild.childNodes),r}var i="fragment",o="content"in n("template")?function(t){var e=n("template");return e.innerHTML=t,e.content}:function(t){var r=n(i),o=n("template"),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)){var u=RegExp.$1;o.innerHTML="<table>"+t+"</table>",a=o.querySelectorAll(u)}else o.innerHTML=t,a=o.childNodes;return e(r,a),r};return function(t,e){return("svg"===e?r:o)(t)}}(t),I=function(t,e,n,r,i){var o="importNode"in t,a=t.createDocumentFragment();return a.appendChild(t.createTextNode("g")),a.appendChild(t.createTextNode("")),(o?t.importNode(a,!0):a.cloneNode(!0)).childNodes.length<2?function t(e,n){for(var r=e.cloneNode(),i=e.childNodes||[],o=i.length,a=0;n&&a<o;a++)r.appendChild(t(i[a],n));return r}:o?t.importNode:function(t,e){return t.cloneNode(!!e)}}(t),V="content"in t.createElement("template"),q=(V?"-":"_dt: ")+Math.random().toFixed(6)+(V?"%":";"),G="\x3c!--"+q+"--\x3e",K=8,U=11,J=1,Q=3,X=/^(?:style|textarea)$/i,Y=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,tt=" \\f\\n\\r\\t",et="[ "+tt+"]+[^  \\f\\n\\r\\t\\/>\"'=]+",nt="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",rt="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|[^  \\f\\n\\r\\t\\/>\"'=]+))?)",it=new RegExp(nt+et+rt+"+)([ "+tt+"]*/?>)","g"),ot=new RegExp(nt+et+rt+"*)([ "+tt+"]*/>)","g"),at=new RegExp("("+et+"\\s*=\\s*)(['\"]?)"+G+"\\2","gi"),ut="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},st=new b,ct=new b,lt=t.defaultView,ft="ownerSVGElement",ht=function(t){return t.ownerDocument||t},dt=function(t){return ht(t).createDocumentFragment()},pt="append"in dt(t)?function(t,e){t.append.apply(t,e)}:function(t,e){for(var n=e.length,r=0;r<n;r++)t.appendChild(e[r])},vt=[].slice;d.prototype.valueOf=function(t){var e=null==this._;return e&&(this._=dt(this.first)),(e||t)&&pt(this._,this.childNodes),this._},d.prototype.remove=function(){this._=null;var t=this.first,e=this.last;if(2===this.length)e.parentNode.removeChild(e);else{var n=ht(t).createRange();n.setStartBefore(this.childNodes[1]),n.setEndAfter(e),n.deleteContents()}return t};var mt=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,gt=function(t,e){var n=void 0,r=void 0;return function(i){switch(typeof i){case"object":if(i){if("object"===n){if(!e&&r!==i)for(var o in r)o in i||(t[o]="")}else e?t.value="":t.cssText="";var a=e?{}:t;for(var u in i){var s=i[u],c="number"!=typeof s||mt.test(u)?s:s+"px";!e&&/^--/.test(u)?a.setProperty(u,c):a[u]=c}n="object",e?t.value=wt(r=a):r=i;break}default:r!=i&&(n="string",r=i,e?t.value=i||"":t.cssText=i||"")}}},bt=/([^A-Z])([A-Z]+)/g,yt=function(t,e,n){return e+"-"+n.toLowerCase()},wt=function(t){var e=[];for(var n in t)e.push(n.replace(bt,yt),":",t[n],";");return e.join("")},Et=/*! (c) Andrea Giammarchi */
function(t){var e="connected",n="dis"+e,r=t.Event,i=t.WeakSet,o=!0,a=new i;return function(t){return o&&(o=!o,function(t){function o(t){l=new c;for(var r,i=t.length,o=0;o<i;o++)u((r=t[o]).removedNodes,n,e),u(r.addedNodes,e,n);l=null}function u(t,e,n){for(var i,o=new r(e),a=t.length,u=0;u<a;1===(i=t[u++]).nodeType&&s(i,o,e,n));}function s(t,e,n,r){a.has(t)&&!l[n].has(t)&&(l[r].delete(t),l[n].add(t),t.dispatchEvent(e));for(var i=t.children,o=i.length,u=0;u<o;s(i[u++],e,n,r));}function c(){this[e]=new i,this[n]=new i}var l=null;try{new MutationObserver(o).observe(t,{subtree:!0,childList:!0})}catch(e){var f=0,h=[],d=function(t){h.push(t),clearTimeout(f),f=setTimeout(function(){o(h.splice(f=0,h.length))},0)};t.addEventListener("DOMNodeRemoved",function(t){d({addedNodes:[],removedNodes:[t.target]})},!0),t.addEventListener("DOMNodeInserted",function(t){d({addedNodes:[t.target],removedNodes:[]})},!0)}}(t.ownerDocument)),a.add(t),t}}({Event:j,WeakSet:w}),Nt=function(t){return{html:t}},_t=function t(e,n){return"ELEMENT_NODE"in e?e:e.constructor===d?1/n<0?n?e.remove():e.last:n?e.valueOf(!0):e.first:t(e.render(),n)},xt=function(t){return"ELEMENT_NODE"in t||t instanceof d||t instanceof e},kt=function(t,e){e(t.placeholder),"text"in t?Promise.resolve(t.text).then(String).then(e):"any"in t?Promise.resolve(t.any).then(e):"html"in t?Promise.resolve(t.html).then(Nt).then(e):Promise.resolve(z.invoke(t,e)).then(e)},Ct=function(t){return null!=t&&"then"in t},$t=/^(?:form|list)$/i;p.prototype={attribute:function(t,e,n){var r=ft in t,i=void 0;if("style"===e)return function(t,e,n){if(n){var r=e.cloneNode(!0);return r.value="",t.setAttributeNode(r),gt(r,n)}return gt(t.style,n)}(t,n,r);if(/^on/.test(e)){var o=e.slice(2);return"connected"===o||"disconnected"===o?Et(t):e.toLowerCase()in t&&(o=o.toLowerCase()),function(e){i!==e&&(i&&t.removeEventListener(o,i,!1),i=e,e&&t.addEventListener(o,e,!1))}}if("data"===e||!r&&e in t&&!$t.test(e))return function(n){i!==n&&(i=n,t[e]!==n&&(t[e]=n,null==n&&t.removeAttribute(e)))};if(e in z.attributes)return function(n){i=z.attributes[e](t,n),t.setAttribute(e,null==i?"":i)};var a=!1,u=n.cloneNode(!0);return function(e){i!==e&&(i=e,u.value!==e&&(null==e?(a&&(a=!1,t.removeAttributeNode(u)),u.value=e):(u.value=e,a||(a=!0,t.setAttributeNode(u)))))}},any:function(t,e){var n={node:_t,before:t},r=ft in t?"svg":"html",i=!1,o=void 0;return function a(u){switch(typeof u){case"string":case"number":case"boolean":i?o!==u&&(o=u,e[0].textContent=u):(i=!0,o=u,e=T(t.parentNode,e,[function(t,e){return ht(t).createTextNode(e)}(t,u)],n));break;case"function":a(u(t));break;case"object":case"undefined":if(null==u){i=!1,e=T(t.parentNode,e,[],n);break}default:if(i=!1,o=u,Z(u))if(0===u.length)e.length&&(e=T(t.parentNode,e,[],n));else switch(typeof u[0]){case"string":case"number":case"boolean":a({html:u});break;case"object":if(Z(u[0])&&(u=u.concat.apply([],u)),Ct(u[0])){Promise.all(u).then(a);break}default:e=T(t.parentNode,e,u,n)}else xt(u)?e=T(t.parentNode,e,11===u.nodeType?vt.call(u.childNodes):[u],n):Ct(u)?u.then(a):"placeholder"in u?kt(u,a):"text"in u?a(String(u.text)):"any"in u?a(u.any):"html"in u?e=T(t.parentNode,e,vt.call(B([].concat(u.html).join(""),r).childNodes),n):a("length"in u?vt.call(u):z.invoke(u,a))}}},text:function(t){var e=void 0;return function n(r){if(e!==r){e=r;var i=typeof r;"object"===i&&r?Ct(r)?r.then(n):"placeholder"in r?kt(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?vt.call(r).join(""):z.invoke(r,n)):"function"===i?n(r(t)):t.textContent=null==r?"":r}}}};var At=function(){var e=!1,n=function(r){if(!("raw"in r)||r.propertyIsEnumerable("raw")||!Object.isFrozen(r.raw)||/Firefox\/(\d+)/.test((t.defaultView.navigator||{}).userAgent)&&parseFloat(RegExp.$1)<55){var i={};return(n=function(t){var e="raw"+t.join("raw");return i[e]||(i[e]=t)})(r)}return e=!0,r};return function(t){return e?t:n(t)}}(),St=new b,Ot=function(t){var e=void 0,n=void 0,r=void 0;return function(i){return i=At(i),r!==i?(r=i,n=new p(t),e=Mt(n.apply(n,arguments))):n.apply(n,arguments),e}},Tt=function(t,e){var n=e.indexOf(":"),r=St.get(t),i=e;return-1<n&&(i=e.slice(n+1),e=e.slice(0,n)||"html"),r||St.set(t,r={}),r[i]||(r[i]=Ot(e))},Mt=function(t){for(var e=t.childNodes,n=e.length,r=[],i=0;i<n;i++){var o=e[i];1!==o.nodeType&&0===ut.call(o.textContent).length||r.push(o)}return 1===r.length?r[0]:new d(r)},jt=new b,Pt=z.define;return m.Component=e,m.bind=function(t){return v.bind(t)},m.define=Pt,m.diff=T,m.hyper=m,m.observe=Et,m.wire=function(t,e){return null==t?Ot(e||"html"):Tt(t,e||"html")},m._={global:lt,WeakMap:b,WeakSet:w},function(t){var n=new b,r=Object.create,i=function(t,e){var n={w:null,p:null};return e.set(t,n),n};Object.defineProperties(e,{for:{configurable:!0,value:function(t,e){return function(t,e,n,o){var a=e.get(t)||i(t,e);switch(typeof o){case"object":case"function":var u=a.w||(a.w=new b);return u.get(o)||function(t,e,n){return t.set(e,n),n}(u,o,new t(n));default:var s=a.p||(a.p=r(null));return s[o]||(s[o]=new t(n))}}(this,n.get(t)||function(t){var e=new N;return n.set(t,e),e}(t),t,null==e?"default":e)}}}),Object.defineProperties(e.prototype,{handleEvent:{value:function(t){var e=t.currentTarget;this["getAttribute"in e&&e.getAttribute("data-call")||"on"+t.type](t)}},html:P("html",t),svg:P("svg",t),state:P("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},dispatch:{value:function(t,e){var n=this._wire$;if(n){var r=new j(t,{bubbles:!0,cancelable:!0,detail:e});return r.component=this,(n.dispatchEvent?n:n.childNodes[0]).dispatchEvent(r)}return!1}},setState:{value:function(t,e){var n=this.state,r="function"==typeof t?t.call(this,n):t;for(var i in r)n[i]=r[i];return!1!==e&&this.render(),this}}})}(Ot),m}(document);const{Component:n,bind:r,define:i,diff:o,hyper:a,wire:u}=e,s="attributeChangedCallback",c=Object,l=[],f=c.defineProperty,h=c.getOwnPropertyDescriptor,d=c.getOwnPropertyNames,p=c.getOwnPropertySymbols||(()=>[]),v=c.getPrototypeOf||(t=>t.__proto__),m="object"==typeof Reflect&&Reflect.ownKeys||(t=>d(t).concat(p(t))),g=c.setPrototypeOf||((t,e)=>(t.__proto__=e,t)),b=t=>t.replace(/-([a-z])/g,(t,e)=>e.toUpperCase());
/*! (C) 2017-2018 Andrea Giammarchi - ISC Style License */class y extends HTMLElement{static define(t,e){const n=this,r=n.prototype,i=r[s],o=!!i,a=n.booleanAttributes||[];a.forEach(t=>{t in r||f(r,b(t),{configurable:!0,get(){return this.hasAttribute(t)},set(e){e&&"false"!==e?this.setAttribute(t,e):this.removeAttribute(t)}})});const u=n.observedAttributes||[];u.forEach(t=>{t in r||f(r,b(t),{configurable:!0,get(){return this.getAttribute(t)},set(e){null==e?this.removeAttribute(t):this.setAttribute(t,e)}})});const c=a.concat(u);c.length&&f(n,"observedAttributes",{get:()=>c});const p=r.created||function(){this.render()};f(r,"_init$",{configurable:!0,writable:!0,value:!0}),f(r,s,{configurable:!0,value:function t(e,n,r){if(this._init$&&(E.call(this,p),this._init$))return this._init$$.push(t.bind(this,e,n,r));o&&n!==r&&i.apply(this,arguments)}});const y=r.connectedCallback,w=!!y;if(f(r,"connectedCallback",{configurable:!0,value:function t(){if(this._init$&&(E.call(this,p),this._init$))return this._init$$.push(t.bind(this));w&&y.apply(this,arguments)}}),d(r).forEach(t=>{if(/^handle[A-Z]/.test(t)){const e="_"+t+"$",n=r[t];f(r,t,{configurable:!0,get(){return this[e]||(this[e]=n.bind(this))}})}}),"handleEvent"in r||f(r,"handleEvent",{configurable:!0,value(t){this[(t.currentTarget.dataset||{}).call||"on"+t.type](t)}}),e&&e.extends){const i=document.createElement(e.extends).constructor,o=class extends i{},a=v(n);m(a).filter(t=>["length","name","arguments","caller","prototype"].indexOf(t)<0).forEach(t=>f(o,t,h(a,t))),m(a.prototype).forEach(t=>f(o.prototype,t,h(a.prototype,t))),g(n,o),g(r,o.prototype),customElements.define(t,n,e)}else customElements.define(t,n);return l.push(n),n}get html(){return this._html$||(this.html=r(this.shadowRoot||this._shadowRoot||this))}set html(t){f(this,"_html$",{configurable:!0,value:t})}render(){}get defaultState(){return{}}get state(){return this._state$||(this.state=this.defaultState)}set state(t){f(this,"_state$",{configurable:!0,value:t})}setState(t,e){const n=this.state,r="function"==typeof t?t.call(this,n):t;for(const t in r)n[t]=r[t];return!1!==e&&this.render(),this}}y.Component=n,y.bind=r,y.intent=i,y.wire=u,y.hyper=a;try{Symbol.hasInstance&&l.push(f(y,Symbol.hasInstance,{enumerable:!1,configurable:!0,value:t=>l.some(_,v(t))}))}catch(t){}const w={type:"DOMContentLoaded",handleEvent(){w.ready()?(document.removeEventListener(w.type,w,!1),w.list.splice(0).forEach(N)):setTimeout(w.handleEvent)},ready:()=>"complete"===document.readyState,list:[]};function E(t){if(w.ready()||function(t){let e=this;do{if(e.nextSibling)return!0}while(e=e.parentNode);return setTimeout(E.bind(this,t)),!1}.call(this,t)){if(this._init$){const e=this._init$$;e&&delete this._init$$,t.call(f(this,"_init$",{value:!1})),e&&e.forEach(N)}}else this.hasOwnProperty("_init$$")||f(this,"_init$$",{configurable:!0,value:[]}),w.list.push(E.bind(this,t))}function N(t){t()}function _(t){return this===t.prototype}return w.ready()||document.addEventListener(w.type,w,!1),t.default=y,t.default}({});