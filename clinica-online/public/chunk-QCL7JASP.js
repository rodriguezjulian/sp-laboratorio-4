import{Aa as j,B as re,Ca as ie,Da as F,Dc as Te,E as se,Ea as ae,Fa as A,Ha as U,Ia as v,Ja as T,Ka as ce,La as le,Ma as de,Mc as Ee,Na as ue,Oa as he,Oc as z,Pa as fe,Qa as pe,Qc as we,Ra as m,Ta as D,X as g,Xa as ye,Z as u,aa as x,ca as d,ga as b,ma as oe,nc as me,o as ne,s as R,uc as B,vc as ge,wc as ve,xc as f,za as M}from"./chunk-VJ2SRRAC.js";import{a as S,b as te}from"./chunk-4ZZIO3ZI.js";var $=class{};var E=class r{constructor(t){this.normalizedNames=new Map,this.lazyUpdate=null,t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(e=>{let n=e.indexOf(":");if(n>0){let s=e.slice(0,n),o=s.toLowerCase(),i=e.slice(n+1).trim();this.maybeSetNormalizedName(s,o),this.headers.has(o)?this.headers.get(o).push(i):this.headers.set(o,[i])}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((e,n)=>{this.setHeaderEntries(n,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([e,n])=>{this.setHeaderEntries(e,n)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let e=this.headers.get(t.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,e){return this.clone({name:t,value:e,op:"a"})}set(t,e){return this.clone({name:t,value:e,op:"s"})}delete(t,e){return this.clone({name:t,value:e,op:"d"})}maybeSetNormalizedName(t,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,t)}init(){this.lazyInit&&(this.lazyInit instanceof r?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(e=>{this.headers.set(e,t.headers.get(e)),this.normalizedNames.set(e,t.normalizedNames.get(e))})}clone(t){let e=new r;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof r?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([t]),e}applyUpdate(t){let e=t.name.toLowerCase();switch(t.op){case"a":case"s":let n=t.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(t.name,e);let s=(t.op==="a"?this.headers.get(e):void 0)||[];s.push(...n),this.headers.set(e,s);break;case"d":let o=t.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let i=this.headers.get(e);if(!i)return;i=i.filter(c=>o.indexOf(c)===-1),i.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,i)}break}}setHeaderEntries(t,e){let n=(Array.isArray(e)?e:[e]).map(o=>o.toString()),s=t.toLowerCase();this.headers.set(s,n),this.maybeSetNormalizedName(t,s)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>t(this.normalizedNames.get(e),this.headers.get(e)))}};var X=class{encodeKey(t){return Re(t)}encodeValue(t){return Re(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}};function je(r,t){let e=new Map;return r.length>0&&r.replace(/^\?/,"").split("&").forEach(s=>{let o=s.indexOf("="),[i,c]=o==-1?[t.decodeKey(s),""]:[t.decodeKey(s.slice(0,o)),t.decodeValue(s.slice(o+1))],a=e.get(i)||[];a.push(c),e.set(i,a)}),e}var Fe=/%(\d[a-f0-9])/gi,Ue={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Re(r){return encodeURIComponent(r).replace(Fe,(t,e)=>Ue[e]??t)}function _(r){return`${r}`}var y=class r{constructor(t={}){if(this.updates=null,this.cloneFrom=null,this.encoder=t.encoder||new X,t.fromString){if(t.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=je(t.fromString,this.encoder)}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(e=>{let n=t.fromObject[e],s=Array.isArray(n)?n.map(_):[_(n)];this.map.set(e,s)})):this.map=null}has(t){return this.init(),this.map.has(t)}get(t){this.init();let e=this.map.get(t);return e?e[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,e){return this.clone({param:t,value:e,op:"a"})}appendAll(t){let e=[];return Object.keys(t).forEach(n=>{let s=t[n];Array.isArray(s)?s.forEach(o=>{e.push({param:n,value:o,op:"a"})}):e.push({param:n,value:s,op:"a"})}),this.clone(e)}set(t,e){return this.clone({param:t,value:e,op:"s"})}delete(t,e){return this.clone({param:t,value:e,op:"d"})}toString(){return this.init(),this.keys().map(t=>{let e=this.encoder.encodeKey(t);return this.map.get(t).map(n=>e+"="+this.encoder.encodeValue(n)).join("&")}).filter(t=>t!=="").join("&")}clone(t){let e=new r({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(t),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case"a":case"s":let e=(t.op==="a"?this.map.get(t.param):void 0)||[];e.push(_(t.value)),this.map.set(t.param,e);break;case"d":if(t.value!==void 0){let n=this.map.get(t.param)||[],s=n.indexOf(_(t.value));s!==-1&&n.splice(s,1),n.length>0?this.map.set(t.param,n):this.map.delete(t.param)}else{this.map.delete(t.param);break}}}),this.cloneFrom=this.updates=null)}};var G=class{constructor(){this.map=new Map}set(t,e){return this.map.set(t,e),this}get(t){return this.map.has(t)||this.map.set(t,t.defaultValue()),this.map.get(t)}delete(t){return this.map.delete(t),this}has(t){return this.map.has(t)}keys(){return this.map.keys()}};function Be(r){switch(r){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function be(r){return typeof ArrayBuffer<"u"&&r instanceof ArrayBuffer}function Me(r){return typeof Blob<"u"&&r instanceof Blob}function Ae(r){return typeof FormData<"u"&&r instanceof FormData}function ze(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}var O=class r{constructor(t,e,n,s){this.url=e,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=t.toUpperCase();let o;if(Be(this.method)||s?(this.body=n!==void 0?n:null,o=s):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new E,this.context??=new G,!this.params)this.params=new y,this.urlWithParams=e;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=e;else{let c=e.indexOf("?"),a=c===-1?"?":c<e.length-1?"&":"";this.urlWithParams=e+a+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||be(this.body)||Me(this.body)||Ae(this.body)||ze(this.body)?this.body:this.body instanceof y?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Ae(this.body)?null:Me(this.body)?this.body.type||null:be(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof y?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(t={}){let e=t.method||this.method,n=t.url||this.url,s=t.responseType||this.responseType,o=t.transferCache??this.transferCache,i=t.body!==void 0?t.body:this.body,c=t.withCredentials??this.withCredentials,a=t.reportProgress??this.reportProgress,l=t.headers||this.headers,h=t.params||this.params,p=t.context??this.context;return t.setHeaders!==void 0&&(l=Object.keys(t.setHeaders).reduce((k,w)=>k.set(w,t.setHeaders[w]),l)),t.setParams&&(h=Object.keys(t.setParams).reduce((k,w)=>k.set(w,t.setParams[w]),h)),new r(e,n,i,{params:h,headers:l,context:p,reportProgress:a,responseType:s,withCredentials:c,transferCache:o})}},De=function(r){return r[r.Sent=0]="Sent",r[r.UploadProgress=1]="UploadProgress",r[r.ResponseHeader=2]="ResponseHeader",r[r.DownloadProgress=3]="DownloadProgress",r[r.Response=4]="Response",r[r.User=5]="User",r}(De||{}),J=class{constructor(t,e=200,n="OK"){this.headers=t.headers||new E,this.status=t.status!==void 0?t.status:e,this.statusText=t.statusText||n,this.url=t.url||null,this.ok=this.status>=200&&this.status<300}};var W=class r extends J{constructor(t={}){super(t),this.type=De.Response,this.body=t.body!==void 0?t.body:null}clone(t={}){return new r({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}};function V(r,t){return{body:t,headers:r.headers,context:r.context,observe:r.observe,params:r.params,reportProgress:r.reportProgress,responseType:r.responseType,withCredentials:r.withCredentials,transferCache:r.transferCache}}var Et=(()=>{class r{constructor(e){this.handler=e}request(e,n,s={}){let o;if(e instanceof O)o=e;else{let a;s.headers instanceof E?a=s.headers:a=new E(s.headers);let l;s.params&&(s.params instanceof y?l=s.params:l=new y({fromObject:s.params})),o=new O(e,n,s.body!==void 0?s.body:null,{headers:a,context:s.context,params:l,reportProgress:s.reportProgress,responseType:s.responseType||"json",withCredentials:s.withCredentials,transferCache:s.transferCache})}let i=ne(o).pipe(se(a=>this.handler.handle(a)));if(e instanceof O||s.observe==="events")return i;let c=i.pipe(re(a=>a instanceof W));switch(s.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return c.pipe(R(a=>{if(a.body!==null&&!(a.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return a.body}));case"blob":return c.pipe(R(a=>{if(a.body!==null&&!(a.body instanceof Blob))throw new Error("Response is not a Blob.");return a.body}));case"text":return c.pipe(R(a=>{if(a.body!==null&&typeof a.body!="string")throw new Error("Response is not a string.");return a.body}));case"json":default:return c.pipe(R(a=>a.body))}case"response":return c;default:throw new Error(`Unreachable: unhandled observe type ${s.observe}}`)}}delete(e,n={}){return this.request("DELETE",e,n)}get(e,n={}){return this.request("GET",e,n)}head(e,n={}){return this.request("HEAD",e,n)}jsonp(e,n){return this.request("JSONP",e,{params:new y().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,n={}){return this.request("OPTIONS",e,n)}patch(e,n,s={}){return this.request("PATCH",e,V(s,n))}post(e,n,s={}){return this.request("POST",e,V(s,n))}put(e,n,s={}){return this.request("PUT",e,V(s,n))}static{this.\u0275fac=function(n){return new(n||r)(d($))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})();var Y=class extends ve{constructor(){super(...arguments),this.supportsDOMEvents=!0}},q=class r extends Y{static makeCurrent(){ge(new r)}onAndCancel(t,e,n){return t.addEventListener(e,n),()=>{t.removeEventListener(e,n)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.remove()}createElement(t,e){return e=e||this.getDefaultDocument(),e.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return e==="window"?window:e==="document"?t:e==="body"?t.body:null}getBaseHref(t){let e=$e();return e==null?null:Xe(e)}resetBaseElement(){I=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Te(document.cookie,t)}},I=null;function $e(){return I=I||document.querySelector("base"),I?I.getAttribute("href"):null}function Xe(r){return new URL(r,document.baseURI).pathname}var Ge=(()=>{class r{build(){return new XMLHttpRequest}static{this.\u0275fac=function(n){return new(n||r)}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})(),Q=new x(""),Pe=(()=>{class r{constructor(e,n){this._zone=n,this._eventNameToPlugin=new Map,e.forEach(s=>{s.manager=this}),this._plugins=e.slice().reverse()}addEventListener(e,n,s){return this._findPluginFor(n).addEventListener(e,n,s)}getZone(){return this._zone}_findPluginFor(e){let n=this._eventNameToPlugin.get(e);if(n)return n;if(n=this._plugins.find(o=>o.supports(e)),!n)throw new g(5101,!1);return this._eventNameToPlugin.set(e,n),n}static{this.\u0275fac=function(n){return new(n||r)(d(Q),d(M))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})(),C=class{constructor(t){this._doc=t}},Z="ng-app-id",Se=(()=>{class r{constructor(e,n,s,o={}){this.doc=e,this.appId=n,this.nonce=s,this.platformId=o,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=z(o),this.resetHostNodes()}addStyles(e){for(let n of e)this.changeUsageCount(n,1)===1&&this.onStyleAdded(n)}removeStyles(e){for(let n of e)this.changeUsageCount(n,-1)<=0&&this.onStyleRemoved(n)}ngOnDestroy(){let e=this.styleNodesInDOM;e&&(e.forEach(n=>n.remove()),e.clear());for(let n of this.getAllStyles())this.onStyleRemoved(n);this.resetHostNodes()}addHost(e){this.hostNodes.add(e);for(let n of this.getAllStyles())this.addStyleToHost(e,n)}removeHost(e){this.hostNodes.delete(e)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(e){for(let n of this.hostNodes)this.addStyleToHost(n,e)}onStyleRemoved(e){let n=this.styleRef;n.get(e)?.elements?.forEach(s=>s.remove()),n.delete(e)}collectServerRenderedStyles(){let e=this.doc.head?.querySelectorAll(`style[${Z}="${this.appId}"]`);if(e?.length){let n=new Map;return e.forEach(s=>{s.textContent!=null&&n.set(s.textContent,s)}),n}return null}changeUsageCount(e,n){let s=this.styleRef;if(s.has(e)){let o=s.get(e);return o.usage+=n,o.usage}return s.set(e,{usage:n,elements:[]}),n}getStyleElement(e,n){let s=this.styleNodesInDOM,o=s?.get(n);if(o?.parentNode===e)return s.delete(n),o.removeAttribute(Z),o;{let i=this.doc.createElement("style");return this.nonce&&i.setAttribute("nonce",this.nonce),i.textContent=n,this.platformIsServer&&i.setAttribute(Z,this.appId),e.appendChild(i),i}}addStyleToHost(e,n){let s=this.getStyleElement(e,n),o=this.styleRef,i=o.get(n)?.elements;i?i.push(s):o.set(n,{elements:[s],usage:1})}resetHostNodes(){let e=this.hostNodes;e.clear(),e.add(this.doc.head)}static{this.\u0275fac=function(n){return new(n||r)(d(f),d(F),d(U,8),d(A))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})(),K={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},ee=/%COMP%/g,_e="%COMP%",Je=`_nghost-${_e}`,We=`_ngcontent-${_e}`,Ze=!0,Ke=new x("",{providedIn:"root",factory:()=>Ze});function Ye(r){return We.replace(ee,r)}function qe(r){return Je.replace(ee,r)}function Ce(r,t){return t.map(e=>e.replace(ee,r))}var Oe=(()=>{class r{constructor(e,n,s,o,i,c,a,l=null){this.eventManager=e,this.sharedStylesHost=n,this.appId=s,this.removeStylesOnCompDestroy=o,this.doc=i,this.platformId=c,this.ngZone=a,this.nonce=l,this.rendererByCompId=new Map,this.platformIsServer=z(c),this.defaultRenderer=new N(e,i,a,this.platformIsServer)}createRenderer(e,n){if(!e||!n)return this.defaultRenderer;this.platformIsServer&&n.encapsulation===b.ShadowDom&&(n=te(S({},n),{encapsulation:b.Emulated}));let s=this.getOrCreateRenderer(e,n);return s instanceof L?s.applyToHost(e):s instanceof P&&s.applyStyles(),s}getOrCreateRenderer(e,n){let s=this.rendererByCompId,o=s.get(n.id);if(!o){let i=this.doc,c=this.ngZone,a=this.eventManager,l=this.sharedStylesHost,h=this.removeStylesOnCompDestroy,p=this.platformIsServer;switch(n.encapsulation){case b.Emulated:o=new L(a,l,n,this.appId,h,i,c,p);break;case b.ShadowDom:return new H(a,l,e,n,i,c,this.nonce,p);default:o=new P(a,l,n,h,i,c,p);break}s.set(n.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(n){return new(n||r)(d(Pe),d(Se),d(F),d(Ke),d(f),d(A),d(M),d(U))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})(),N=class{constructor(t,e,n,s){this.eventManager=t,this.doc=e,this.ngZone=n,this.platformIsServer=s,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(t,e){return e?this.doc.createElementNS(K[e]||e,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,e){(Ie(t)?t.content:t).appendChild(e)}insertBefore(t,e,n){t&&(Ie(t)?t.content:t).insertBefore(e,n)}removeChild(t,e){e.remove()}selectRootElement(t,e){let n=typeof t=="string"?this.doc.querySelector(t):t;if(!n)throw new g(-5104,!1);return e||(n.textContent=""),n}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,n,s){if(s){e=s+":"+e;let o=K[s];o?t.setAttributeNS(o,e,n):t.setAttribute(e,n)}else t.setAttribute(e,n)}removeAttribute(t,e,n){if(n){let s=K[n];s?t.removeAttributeNS(s,e):t.removeAttribute(`${n}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,n,s){s&(D.DashCase|D.Important)?t.style.setProperty(e,n,s&D.Important?"important":""):t.style[e]=n}removeStyle(t,e,n){n&D.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,n){t!=null&&(t[e]=n)}setValue(t,e){t.nodeValue=e}listen(t,e,n){if(typeof t=="string"&&(t=B().getGlobalEventTarget(this.doc,t),!t))throw new Error(`Unsupported event target ${t} for event ${e}`);return this.eventManager.addEventListener(t,e,this.decoratePreventDefault(n))}decoratePreventDefault(t){return e=>{if(e==="__ngUnwrap__")return t;(this.platformIsServer?this.ngZone.runGuarded(()=>t(e)):t(e))===!1&&e.preventDefault()}}};function Ie(r){return r.tagName==="TEMPLATE"&&r.content!==void 0}var H=class extends N{constructor(t,e,n,s,o,i,c,a){super(t,o,i,a),this.sharedStylesHost=e,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let l=Ce(s.id,s.styles);for(let h of l){let p=document.createElement("style");c&&p.setAttribute("nonce",c),p.textContent=h,this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,n){return super.insertBefore(this.nodeOrShadowRoot(t),e,n)}removeChild(t,e){return super.removeChild(null,e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},P=class extends N{constructor(t,e,n,s,o,i,c,a){super(t,o,i,c),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=s,this.styles=a?Ce(a,n.styles):n.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},L=class extends P{constructor(t,e,n,s,o,i,c,a){let l=s+"-"+n.id;super(t,e,n,o,i,c,a,l),this.contentAttr=Ye(l),this.hostAttr=qe(l)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,e){let n=super.createElement(t,e);return super.setAttribute(n,this.contentAttr,""),n}},Qe=(()=>{class r extends C{constructor(e){super(e)}supports(e){return!0}addEventListener(e,n,s){return e.addEventListener(n,s,!1),()=>this.removeEventListener(e,n,s)}removeEventListener(e,n,s){return e.removeEventListener(n,s)}static{this.\u0275fac=function(n){return new(n||r)(d(f))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})(),Ne=["alt","control","meta","shift"],He={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},et={alt:r=>r.altKey,control:r=>r.ctrlKey,meta:r=>r.metaKey,shift:r=>r.shiftKey},tt=(()=>{class r extends C{constructor(e){super(e)}supports(e){return r.parseEventName(e)!=null}addEventListener(e,n,s){let o=r.parseEventName(n),i=r.eventCallback(o.fullKey,s,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>B().onAndCancel(e,o.domEventName,i))}static parseEventName(e){let n=e.toLowerCase().split("."),s=n.shift();if(n.length===0||!(s==="keydown"||s==="keyup"))return null;let o=r._normalizeKey(n.pop()),i="",c=n.indexOf("code");if(c>-1&&(n.splice(c,1),i="code."),Ne.forEach(l=>{let h=n.indexOf(l);h>-1&&(n.splice(h,1),i+=l+".")}),i+=o,n.length!=0||o.length===0)return null;let a={};return a.domEventName=s,a.fullKey=i,a}static matchEventFullKeyCode(e,n){let s=He[e.key]||e.key,o="";return n.indexOf("code.")>-1&&(s=e.code,o="code."),s==null||!s?!1:(s=s.toLowerCase(),s===" "?s="space":s==="."&&(s="dot"),Ne.forEach(i=>{if(i!==s){let c=et[i];c(e)&&(o+=i+".")}}),o+=s,o===n)}static eventCallback(e,n,s){return o=>{r.matchEventFullKeyCode(o,e)&&s.runGuarded(()=>n(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static{this.\u0275fac=function(n){return new(n||r)(d(f))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac})}}return r})();function qt(r,t){return me(S({rootComponent:r},nt(t)))}function nt(r){return{appProviders:[...at,...r?.providers??[]],platformProviders:it}}function rt(){q.makeCurrent()}function st(){return new j}function ot(){return ie(document),document}var it=[{provide:A,useValue:Ee},{provide:ae,useValue:rt,multi:!0},{provide:f,useFactory:ot,deps:[]}];var at=[{provide:oe,useValue:"root"},{provide:j,useFactory:st,deps:[]},{provide:Q,useClass:Qe,multi:!0,deps:[f,M,A]},{provide:Q,useClass:tt,multi:!0,deps:[f]},Oe,Se,Pe,{provide:ye,useExisting:Oe},{provide:we,useClass:Ge,deps:[]},[]];var Qt=(()=>{class r{constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static{this.\u0275fac=function(n){return new(n||r)(d(f))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var ct=(()=>{class r{static{this.\u0275fac=function(n){return new(n||r)}}static{this.\u0275prov=u({token:r,factory:function(n){let s=null;return n?s=new(n||r):s=d(lt),s},providedIn:"root"})}}return r})(),lt=(()=>{class r extends ct{constructor(e){super(),this._doc=e}sanitize(e,n){if(n==null)return null;switch(e){case m.NONE:return n;case m.HTML:return T(n,"HTML")?v(n):pe(this._doc,String(n)).toString();case m.STYLE:return T(n,"Style")?v(n):n;case m.SCRIPT:if(T(n,"Script"))return v(n);throw new g(5200,!1);case m.URL:return T(n,"URL")?v(n):fe(String(n));case m.RESOURCE_URL:if(T(n,"ResourceURL"))return v(n);throw new g(5201,!1);default:throw new g(5202,!1)}}bypassSecurityTrustHtml(e){return ce(e)}bypassSecurityTrustStyle(e){return le(e)}bypassSecurityTrustScript(e){return de(e)}bypassSecurityTrustUrl(e){return ue(e)}bypassSecurityTrustResourceUrl(e){return he(e)}static{this.\u0275fac=function(n){return new(n||r)(d(f))}}static{this.\u0275prov=u({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{Et as a,Oe as b,qt as c,Qt as d,ct as e};