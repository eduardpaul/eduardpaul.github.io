(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[351],{2993:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var c,l,s,u;if(Array.isArray(e)){if((c=e.length)!=a.length)return!1;for(l=c;0!=l--;)if(!i(e[l],a[l]))return!1;return!0}if(r&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!a.has(l.value[0]))return!1;for(u=e.entries();!(l=u.next()).done;)if(!i(l.value[1],a.get(l.value[0])))return!1;return!0}if(n&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!a.has(l.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((c=e.length)!=a.length)return!1;for(l=c;0!=l--;)if(e[l]!==a[l])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===a.toString();if((c=(s=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(l=c;0!=l--;)if(!Object.prototype.hasOwnProperty.call(a,s[l]))return!1;if(t&&e instanceof Element)return!1;for(l=c;0!=l--;)if(("_owner"!==s[l]&&"__v"!==s[l]&&"__o"!==s[l]||!e.$$typeof)&&!i(e[s[l]],a[s[l]]))return!1;return!0}return e!=e&&a!=a}e.exports=function(e,t){try{return i(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},4839:function(e,t,r){"use strict";var n,o=r(7294),i=(n=o)&&"object"==typeof n&&"default"in n?n.default:n;function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var l,s=[];function u(){l=e(s.map((function(e){return e.props}))),f.canUseDOM?t(l):r&&(l=r(l))}var f=function(e){var t,r;function o(){return e.apply(this,arguments)||this}r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,o.peek=function(){return l},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=l;return l=void 0,s=[],e};var a=o.prototype;return a.UNSAFE_componentWillMount=function(){s.push(this),u()},a.componentDidUpdate=function(){u()},a.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),u()},a.render=function(){return i.createElement(n,this.props)},o}(o.PureComponent);return a(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),a(f,"canUseDOM",c),f}}},5323:function(e,t,r){"use strict";r.d(t,{Z:function(){return j}});var n=r(7294),o=r(1597),i=r(8945),a=r(4694),c=r(5697),l=r.n(c);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function d(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function y(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return b(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function m(e){return t=e,(t-=0)==t?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1);var t}var h=["style"];function v(e){return e.split(";").map((function(e){return e.trim()})).filter((function(e){return e})).reduce((function(e,t){var r,n=t.indexOf(":"),o=m(t.slice(0,n)),i=t.slice(n+1).trim();return o.startsWith("webkit")?e[(r=o,r.charAt(0).toUpperCase()+r.slice(1))]=i:e[o]=i,e}),{})}var g=!1;try{g=!0}catch(k){}function w(e){return e&&"object"===f(e)&&e.prefix&&e.iconName&&e.icon?e:a.parse.icon?a.parse.icon(e):null===e?null:e&&"object"===f(e)&&e.prefix&&e.iconName?e:Array.isArray(e)&&2===e.length?{prefix:e[0],iconName:e[1]}:"string"==typeof e?{prefix:"fas",iconName:e}:void 0}function T(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?p({},e,t):{}}var O=["forwardedRef"];function A(e){var t=e.forwardedRef,r=d(e,O),n=r.icon,o=r.mask,i=r.symbol,c=r.className,l=r.title,s=r.titleId,f=r.maskId,b=w(n),m=T("classes",[].concat(y(function(e){var t,r=e.beat,n=e.fade,o=e.beatFade,i=e.bounce,a=e.shake,c=e.flash,l=e.spin,s=e.spinPulse,u=e.spinReverse,f=e.pulse,d=e.fixedWidth,y=e.inverse,b=e.border,m=e.listItem,h=e.flip,v=e.size,g=e.rotation,w=e.pull,T=(p(t={"fa-beat":r,"fa-fade":n,"fa-beat-fade":o,"fa-bounce":i,"fa-shake":a,"fa-flash":c,"fa-spin":l,"fa-spin-reverse":u,"fa-spin-pulse":s,"fa-pulse":f,"fa-fw":d,"fa-inverse":y,"fa-border":b,"fa-li":m,"fa-flip-horizontal":"horizontal"===h||"both"===h,"fa-flip-vertical":"vertical"===h||"both"===h},"fa-".concat(v),null!=v),p(t,"fa-rotate-".concat(g),null!=g&&0!==g),p(t,"fa-pull-".concat(w),null!=w),p(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(T).map((function(e){return T[e]?e:null})).filter((function(e){return e}))}(r)),y(c.split(" ")))),h=T("transform","string"==typeof r.transform?a.parse.transform(r.transform):r.transform),v=T("mask",w(o)),x=(0,a.icon)(b,u(u(u(u({},m),h),v),{},{symbol:i,title:l,titleId:s,maskId:f}));if(!x)return function(){var e;!g&&console&&"function"==typeof console.error&&(e=console).error.apply(e,arguments)}("Could not find icon",b),null;var S=x.abstract,C={ref:t};return Object.keys(r).forEach((function(e){A.defaultProps.hasOwnProperty(e)||(C[e]=r[e])})),E(S[0],C)}A.displayName="FontAwesomeIcon",A.propTypes={beat:l().bool,border:l().bool,bounce:l().bool,className:l().string,fade:l().bool,flash:l().bool,mask:l().oneOfType([l().object,l().array,l().string]),maskId:l().string,fixedWidth:l().bool,inverse:l().bool,flip:l().oneOf(["horizontal","vertical","both"]),icon:l().oneOfType([l().object,l().array,l().string]),listItem:l().bool,pull:l().oneOf(["right","left"]),pulse:l().bool,rotation:l().oneOf([0,90,180,270]),shake:l().bool,size:l().oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:l().bool,spinPulse:l().bool,spinReverse:l().bool,symbol:l().oneOfType([l().bool,l().string]),title:l().string,titleId:l().string,transform:l().oneOfType([l().string,l().object]),swapOpacity:l().bool},A.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:null,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var E=function e(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof r)return r;var o=(r.children||[]).map((function(r){return e(t,r)})),i=Object.keys(r.attributes||{}).reduce((function(e,t){var n=r.attributes[t];switch(t){case"class":e.attrs.className=n,delete r.attributes.class;break;case"style":e.attrs.style=v(n);break;default:0===t.indexOf("aria-")||0===t.indexOf("data-")?e.attrs[t.toLowerCase()]=n:e.attrs[m(t)]=n}return e}),{attrs:{}}),a=n.style,c=void 0===a?{}:a,l=d(n,h);return i.attrs.style=u(u({},i.attrs.style),c),t.apply(void 0,[r.tag,u(u({},i.attrs),l)].concat(y(o)))}.bind(null,n.createElement),x=r(7190),S=r(8014),C=function(){var e,t=null===(e=(0,o.useStaticQuery)("3257411868").site.siteMetadata)||void 0===e?void 0:e.author;return n.createElement("div",{class:"flex flex-col dark:bg-gray-800 dark:border-gray-600"},n.createElement("h2",{class:"text-3xl font-semibold text-center text-gray-800 dark:text-white"},t.name),n.createElement("div",{class:"flex flex-col items-center mt-6"},n.createElement(i.S,{className:"object-cover w-24 h-24 mx-2 rounded-full",layout:"fixed",formats:["auto","webp","avif"],src:"../images/profile-pic.png",width:100,height:100,quality:95,alt:"Profile picture",__imageData:r(9134)}),n.createElement("h4",{class:"font-medium text-gray-800 text-center"},"Lead Solutions Architect ",n.createElement("div",null,"at ",n.createElement("span",{class:"text-gray-600 text-sm"},"NTT DATA Europe & LATAM"))),n.createElement("div",{class:"flex w-1/2 px-6 py-2 text-center justify-between"},n.createElement("a",{href:"https://www.linkedin.com/in/eduardpaul"},n.createElement(A,{icon:x.hwn})),n.createElement("a",{href:"https://github.com/eduardpaul/"},n.createElement(A,{icon:x.zhw})),n.createElement("a",{href:"https://twitter.com/eduapauldev"},n.createElement(A,{icon:x.mdU}))),n.createElement("div",{class:"grid grid-cols-4 w-full text-center p-4 border-t-2 justify-between rounded-full divide-x-2"},n.createElement(o.Link,{to:"/"},n.createElement(A,{icon:S.J9Y})),n.createElement(o.Link,{to:"/about"},n.createElement(A,{icon:S.ILF})),n.createElement("a",{href:"/rss.xml"},n.createElement(A,{icon:S.Fwd})),n.createElement("a",null,n.createElement(A,{icon:S.FU$})))))},j=function(e){e.location,e.title;var t=e.children;return n.createElement("div",null,n.createElement("div",{class:"flex flex-wrap"},n.createElement("div",{class:"grow w-full p-6 lg:grow-0 lg:w-64"},n.createElement(C,null)),n.createElement("main",{class:"grow max-w-3xl mx-auto px-6"},t)))}},262:function(e,t,r){"use strict";r.d(t,{Z:function(){return ve}});var n,o,i,a,c=r(7294),l=r(5697),s=r.n(l),u=r(4839),f=r.n(u),p=r(2993),d=r.n(p),y=r(6494),b=r.n(y),m="bodyAttributes",h="htmlAttributes",v="titleAttributes",g={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},w=(Object.keys(g).map((function(e){return g[e]})),"charset"),T="cssText",O="href",A="http-equiv",E="innerHTML",x="itemprop",S="name",C="property",j="rel",k="src",P="target",I={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},L="defaultTitle",N="defer",M="encodeSpecialCharacters",R="onChangeClientState",_="titleTemplate",D=Object.keys(I).reduce((function(e,t){return e[I[t]]=t,e}),{}),z=[g.NOSCRIPT,g.SCRIPT,g.STYLE],F="data-react-helmet",U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},B=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Y=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},W=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},K=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},$=function(e){var t=G(e,g.TITLE),r=G(e,_);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=G(e,L);return t||n||void 0},V=function(e){return G(e,R)||function(){}},J=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return H({},e,t)}),{})},Q=function(e,t){return t.filter((function(e){return void 0!==e[g.BASE]})).map((function(e){return e[g.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var i=n[o].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}return t}),[])},Z=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ne("Helmet: "+e+' should be of type "Array". Instead found type "'+U(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var o={};r.filter((function(e){for(var r=void 0,i=Object.keys(e),a=0;a<i.length;a++){var c=i[a],l=c.toLowerCase();-1===t.indexOf(l)||r===j&&"canonical"===e[r].toLowerCase()||l===j&&"stylesheet"===e[l].toLowerCase()||(r=l),-1===t.indexOf(c)||c!==E&&c!==T&&c!==x||(r=c)}if(!r||!e[r])return!1;var s=e[r].toLowerCase();return n[r]||(n[r]={}),o[r]||(o[r]={}),!n[r][s]&&(o[r][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],l=b()({},n[c],o[c]);n[c]=l}return e}),[]).reverse()},G=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},X=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){X(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||X:r.g.requestAnimationFrame||X,re="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:r.g.cancelAnimationFrame||ee,ne=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ie=function(e,t){var r=e.baseTag,n=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,l=e.onChangeClientState,s=e.scriptTags,u=e.styleTags,f=e.title,p=e.titleAttributes;le(g.BODY,n),le(g.HTML,o),ce(f,p);var d={baseTag:se(g.BASE,r),linkTags:se(g.LINK,i),metaTags:se(g.META,a),noscriptTags:se(g.NOSCRIPT,c),scriptTags:se(g.SCRIPT,s),styleTags:se(g.STYLE,u)},y={},b={};Object.keys(d).forEach((function(e){var t=d[e],r=t.newTags,n=t.oldTags;r.length&&(y[e]=r),n.length&&(b[e]=d[e].oldTags)})),t&&t(),l(e,y,b)},ae=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ae(e)),le(g.TITLE,t)},le=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(F),o=n?n.split(","):[],i=[].concat(o),a=Object.keys(t),c=0;c<a.length;c++){var l=a[c],s=t[l]||"";r.getAttribute(l)!==s&&r.setAttribute(l,s),-1===o.indexOf(l)&&o.push(l);var u=i.indexOf(l);-1!==u&&i.splice(u,1)}for(var f=i.length-1;f>=0;f--)r.removeAttribute(i[f]);o.length===i.length?r.removeAttribute(F):r.getAttribute(F)!==a.join(",")&&r.setAttribute(F,a.join(","))}},se=function(e,t){var r=document.head||document.querySelector(g.HEAD),n=r.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(n),i=[],a=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===E)r.innerHTML=t.innerHTML;else if(n===T)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[n]?"":t[n];r.setAttribute(n,c)}r.setAttribute(F,"true"),o.some((function(e,t){return a=t,r.isEqualNode(e)}))?o.splice(a,1):i.push(r)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return r.appendChild(e)})),{oldTags:o,newTags:i}},ue=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[I[r]||r]=e[r],t}),t)},pe=function(e,t,r){switch(e){case g.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[F]=!0,o=fe(r,n),[c.createElement(g.TITLE,o,e)];var e,r,n,o},toString:function(){return function(e,t,r,n){var o=ue(r),i=ae(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+K(i,n)+"</"+e+">":"<"+e+' data-react-helmet="true">'+K(i,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case m:case h:return{toComponent:function(){return fe(t)},toString:function(){return ue(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,o=((n={key:r})[F]=!0,n);return Object.keys(t).forEach((function(e){var r=I[e]||e;if(r===E||r===T){var n=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=t[e]})),c.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var o=Object.keys(n).filter((function(e){return!(e===E||e===T)})).reduce((function(e,t){var o=void 0===n[t]?t:t+'="'+K(n[t],r)+'"';return e?e+" "+o:o}),""),i=n.innerHTML||n.cssText||"",a=-1===z.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(a?"/>":">"+i+"</"+e+">")}),"")}(e,t,r)}}}},de=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,l=e.scriptTags,s=e.styleTags,u=e.title,f=void 0===u?"":u,p=e.titleAttributes;return{base:pe(g.BASE,t,n),bodyAttributes:pe(m,r,n),htmlAttributes:pe(h,o,n),link:pe(g.LINK,i,n),meta:pe(g.META,a,n),noscript:pe(g.NOSCRIPT,c,n),script:pe(g.SCRIPT,l,n),style:pe(g.STYLE,s,n),title:pe(g.TITLE,{title:f,titleAttributes:p},n)}},ye=f()((function(e){return{baseTag:Q([O,P],e),bodyAttributes:J(m,e),defer:G(e,N),encode:G(e,M),htmlAttributes:J(h,e),linkTags:Z(g.LINK,[j,O],e),metaTags:Z(g.META,[S,w,A,C,x],e),noscriptTags:Z(g.NOSCRIPT,[E],e),onChangeClientState:V(e),scriptTags:Z(g.SCRIPT,[k,E],e),styleTags:Z(g.STYLE,[T],e),title:$(e),titleAttributes:J(v,e)}}),(function(e){oe&&re(oe),e.defer?oe=te((function(){ie(e,(function(){oe=null}))})):(ie(e),oe=null)}),de)((function(){return null})),be=(o=ye,a=i=function(e){function t(){return q(this,t),W(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case g.SCRIPT:case g.NOSCRIPT:return{innerHTML:t};case g.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return H({},n,((t={})[r.type]=[].concat(n[r.type]||[],[H({},o,this.mapNestedChildrenToProps(r,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(n.type){case g.TITLE:return H({},o,((t={})[n.type]=a,t.titleAttributes=H({},i),t));case g.BODY:return H({},o,{bodyAttributes:H({},i)});case g.HTML:return H({},o,{htmlAttributes:H({},i)})}return H({},o,((r={})[n.type]=H({},i),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=H({},t);return Object.keys(e).forEach((function(t){var n;r=H({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return c.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[D[r]||r]=e[r],t}),t)}(Y(o,["children"]));switch(r.warnOnInvalidChildren(e,i),e.type){case g.LINK:case g.META:case g.NOSCRIPT:case g.SCRIPT:case g.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:a,nestedChildren:i});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=Y(e,["children"]),n=H({},r);return t&&(n=this.mapChildrenToProps(t,n)),c.createElement(o,n)},B(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(c.Component),i.propTypes={base:s().object,bodyAttributes:s().object,children:s().oneOfType([s().arrayOf(s().node),s().node]),defaultTitle:s().string,defer:s().bool,encodeSpecialCharacters:s().bool,htmlAttributes:s().object,link:s().arrayOf(s().object),meta:s().arrayOf(s().object),noscript:s().arrayOf(s().object),onChangeClientState:s().func,script:s().arrayOf(s().object),style:s().arrayOf(s().object),title:s().string,titleAttributes:s().object,titleTemplate:s().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);be.renderStatic=be.rewind;var me=r(1597),he=function(e){var t,r,n,o=e.description,i=e.lang,a=e.meta,l=e.title,s=(0,me.useStaticQuery)("2841359383").site,u=o||s.siteMetadata.description,f=null===(t=s.siteMetadata)||void 0===t?void 0:t.title;return c.createElement(be,{htmlAttributes:{lang:i},title:l,titleTemplate:f?"%s | "+f:null,meta:[{name:"description",content:u},{property:"og:title",content:l},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:(null===(r=s.siteMetadata)||void 0===r||null===(n=r.social)||void 0===n?void 0:n.twitter)||""},{name:"twitter:title",content:l},{name:"twitter:description",content:u}].concat(a)})};he.defaultProps={lang:"en",meta:[],description:""};var ve=he},9134:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#687898","images":{"fallback":{"src":"/static/94c36d9b091f45521cbc222d2980d3b4/64618/profile-pic.jpg","srcSet":"/static/94c36d9b091f45521cbc222d2980d3b4/64618/profile-pic.jpg 100w,\\n/static/94c36d9b091f45521cbc222d2980d3b4/cc10e/profile-pic.jpg 200w","sizes":"100px"},"sources":[{"srcSet":"/static/94c36d9b091f45521cbc222d2980d3b4/ee81f/profile-pic.avif 100w,\\n/static/94c36d9b091f45521cbc222d2980d3b4/3f23b/profile-pic.avif 200w","type":"image/avif","sizes":"100px"},{"srcSet":"/static/94c36d9b091f45521cbc222d2980d3b4/6a679/profile-pic.webp 100w,\\n/static/94c36d9b091f45521cbc222d2980d3b4/c0761/profile-pic.webp 200w","type":"image/webp","sizes":"100px"}]},"width":100,"height":100}')}}]);
//# sourceMappingURL=commons-1fb5bf07f33df5768a53.js.map