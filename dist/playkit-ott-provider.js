!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ott=t():(e.playkit=e.playkit||{},e.playkit.providers=e.playkit.providers||{},e.playkit.providers.ott=t())}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=18)}([function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(1);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function e(t,r,n,i){void 0===i&&(i={}),this.severity=t,this.category=r,this.code=n,this.data=i,e._logger.error("Category:"+r+" | Code:"+n+" |",i)};i(s,"Severity",{RECOVERABLE:1,CRITICAL:2}),i(s,"Category",{NETWORK:1,SERVICE:2,PROVIDER:3}),i(s,"Code",{UNSUPPORTED_SCHEME:1e3,BAD_HTTP_STATUS:1001,HTTP_ERROR:1002,TIMEOUT:1003,MALFORMED_DATA_URI:1004,BAD_SERVER_RESPONSE:1005,MULTIREQUEST_API_ERROR:1006,API_RESPONSE_MISMATCH:1007,ERROR:2e3,BLOCK_ACTION:2001,MEDIA_STATUS_NOT_READY:2002,MISSING_MANDATORY_PARAMS:3e3,MISSING_PLAY_SOURCE:3001,METHOD_NOT_IMPLEMENTED:3002}),i(s,"_logger",Object(n.b)("Error"))},function(e,t,r){"use strict";r.d(t,"c",(function(){return o})),r.d(t,"d",(function(){return u})),r.d(t,"e",(function(){return s})),r.d(t,"a",(function(){return i}));var n={get:function(){return{trace:function(){},debug:function(){},info:function(){},log:function(){},warn:function(){},error:function(){},time:function(){},timeEnd:function(){},getLevel:function(){},setLevel:function(){}}}},i={};function s(e){e&&"function"==typeof e.getLogger&&(n.get=e.getLogger),e&&e.LogLevel&&(i=e.LogLevel)}function a(e){return n.get(e)}function o(e){return a(e).getLevel()}function u(e,t){a(t).setLevel(e)}t.b=a},function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(7);var i,s,a,o=function(){function e(){this.metadata=new Map,this.sources=new n.a,this.type=e.Type.UNKNOWN}return e.prototype.toJSON=function(){return{id:this.id,name:this.name,sources:this.sources.toJSON(),duration:this.duration,dvrStatus:this.dvrStatus,status:this.status,metadata:this.metadata,type:this.type,poster:this.poster,assetReferenceType:this.assetReferenceType}},e}();a={VOD:"Vod",LIVE:"Live",IMAGE:"Image",AUDIO:"Audio",UNKNOWN:"Unknown"},(s="Type")in(i=o)?Object.defineProperty(i,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[s]=a},function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(0);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function(){function e(e){void 0===e&&(e=new Map),i(this,"retryConfig",{async:!0,timeout:0,maxAttempts:4}),i(this,"_attemptCounter",1),this.headers=e}var t=e.prototype;return t.getUrl=function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")},t.doHttpRequest=function(){var e=this,t=new Promise((function(t,r){e._requestPromise={resolve:t,reject:r}}));return this.url||this._requestPromise.reject(new n.a(n.a.Severity.CRITICAL,n.a.Category.NETWORK,n.a.Code.MALFORMED_DATA_URI,{url:this.url})),this._createXHR(),t},t._createXHR=function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){if(4===t.readyState&&200===t.status)try{var r=JSON.parse(t.responseText);return e.responseHeaders=e._getResponseHeaders(t),e._requestPromise.resolve(r)}catch(r){e._requestPromise.reject(e._createError(t,n.a.Code.BAD_SERVER_RESPONSE,{text:t.responseText}))}},t.open(this.method,this.url,this.retryConfig.async),this.retryConfig.async&&this.retryConfig.timeout&&(t.timeout=this.retryConfig.timeout);var r=performance.now();t.ontimeout=function(){e._handleError(t,n.a.Code.TIMEOUT,{timeout:(performance.now()-r)/1e3,statusText:t.statusText})},t.onerror=t.onabort=function(){e._handleError(t,n.a.Code.HTTP_ERROR,{text:t.responseText,statusText:t.statusText})},this.headers.forEach((function(e,r){t.setRequestHeader(r,e)})),t.send(this.params)},t._getResponseHeaders=function(e){return e.getAllResponseHeaders().split("\n").filter((function(e){return 0===e.toLowerCase().indexOf("x-")}))},t._handleError=function(e,t,r){var n=this._createError(e,t,r);if(e.onreadystatechange=function(){},e.onerror=function(){},e.ontimeout=function(){},e.onabort=function(){},!(this.retryConfig.maxAttempts&&this._attemptCounter<this.retryConfig.maxAttempts))return this._requestPromise.reject(n);this._attemptCounter++,this._createXHR()},t._createError=function(e,t,r){return Object.assign(r,{url:this.url,headers:this._getResponseHeaders(e),attempt:this._attemptCounter}),new n.a(n.a.Severity.CRITICAL,n.a.Category.NETWORK,t,r)},e}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return s}));var n={DASH:{name:"dash",mimeType:"application/dash+xml",pathExt:"mpd"},HLS:{name:"hls",mimeType:"application/x-mpegURL",pathExt:"m3u8"},WVM:{name:"wvm",mimeType:"video/wvm",pathExt:"wvm"},MP4:{name:"mp4",mimeType:"video/mp4",pathExt:"mp4"},MP3:{name:"mp3",mimeType:"audio/mpeg",pathExt:"mp3"}},i=new Map([["mpegdash",n.DASH],["applehttp",n.HLS],["url",n.MP4]]);function s(e){var t=i.get(e);return!!t&&t.name===n.MP4.name}},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n=function(e){var t,r,n;n=!1,(r="hasError")in(t=this)?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,"KalturaAPIException"===e.objectType?(this.hasError=!0,this.error=new i(e.code,e.message)):e.error&&"KalturaAPIException"===e.error.objectType?(this.hasError=!0,this.error=new i(e.error.code,e.error.message)):this.data=e},i=function(e,t){this.code=e,this.message=t}},function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n,i,s,a=function(e){this.scheme=e.scheme,this.licenseURL=e.licenseURL,this.certificate=e.certificate};s={"drm.PLAYREADY_CENC":"com.microsoft.playready","drm.WIDEVINE_CENC":"com.widevine.alpha","fairplay.FAIRPLAY":"com.apple.fairplay",WIDEVINE_CENC:"com.widevine.alpha",PLAYREADY_CENC:"com.microsoft.playready",FAIRPLAY:"com.apple.fairplay"},(i="Scheme")in(n=a)?Object.defineProperty(n,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):n[i]=s},function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));r(8);var n=r(4),i=function(){function e(){this.progressive=[],this.dash=[],this.hls=[]}var t=e.prototype;return t.map=function(e,t){if(t)switch(t.name){case n.a.MP4.name:this.progressive.push(e);break;case n.a.DASH.name:this.dash.push(e);break;case n.a.HLS.name:this.hls.push(e)}},t.toJSON=function(){var e={progressive:[],dash:[],hls:[]};return this.progressive.forEach((function(t){return e.progressive.push(t.toJSON())})),this.hls.forEach((function(t){return e.hls.push(t.toJSON())})),this.dash.forEach((function(t){return e.dash.push(t.toJSON())})),e},e}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r(12);var n=function(){function e(){}return e.prototype.toJSON=function(){var e={id:this.id,url:this.url,mimetype:this.mimetype};return this.bandwidth&&(e.bandwidth=this.bandwidth),this.width&&(e.width=this.width),this.height&&(e.height=this.height),this.label&&(e.label=this.label),this.drmData&&this.drmData.length>0&&(e.drmData=[],this.drmData.forEach((function(t){Array.isArray(e.drmData)&&e.drmData.push(t.toJSON())}))),e},e}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));r(10);var n=r(0);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function(){function e(e){i(this,"_loadersResponseMap",new Map),i(this,"_loaders",new Map),this._networkRetryConfig=e}var t=e.prototype;return t.add=function(e,t){var r=this,n=new e(t);if(n.isValid()){this._loaders.set(e.id,n);var i=this._multiRequest.requests.length,s=n.requests;this._multiRequest.retryConfig=this._networkRetryConfig,s.forEach((function(e){r._multiRequest.add(e)}));var a=Array.from(new Array(s.length),(function(e,t){return t+i}));this._loadersResponseMap.set(e.id,a)}},t.fetchData=function(){var e=this;return new Promise((function(t,r){e._multiRequest.execute().then((function(i){e._multiResponse=i.response,e.prepareData(i.response).success?t(e._loaders):r(new n.a(n.a.Severity.CRITICAL,n.a.Category.NETWORK,n.a.Code.API_RESPONSE_MISMATCH,{headers:i.headers}))}),(function(e){r(e)}))}))},t.prepareData=function(e){var t=this;return this._loaders.forEach((function(r,n){var i=t._loadersResponseMap.get(n);try{i&&i.length>0&&(r.response=e.results.slice(i[0],i[i.length-1]+1))}catch(e){return{success:!1,error:e}}})),{success:!0,data:this._loaders}},e}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(3),i=r(1),s=r(5),a=r(0);function o(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=function(e){var t,r;function n(){for(var t,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return u(o(t=e.call.apply(e,[this].concat(n))||this),"requests",[]),t}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var i=n.prototype;return i.add=function(e){var t;this.requests.push(e);var r={},n={service:e.service,action:e.action};return Object.assign(r,((t={})[this.requests.length]=Object.assign(n,e.params),t)),Object.assign(r,this.params),this.params=r,this},i.execute=function(){var e=this;return new Promise((function(t,r){try{e.params=JSON.stringify(e.params)}catch(t){n._logger.error(""+t.message),r(new a.a(a.a.Severity.CRITICAL,a.a.Category.PROVIDER,a.a.Code.FAILED_PARSING_REQUEST,{error:t,params:e.params}))}e.doHttpRequest().then((function(n){var i=new p(n);i.success?t({headers:e.responseHeaders,response:i}):r(new a.a(a.a.Severity.CRITICAL,a.a.Category.NETWORK,a.a.Code.MULTIREQUEST_API_ERROR,{url:e.url,headers:e.responseHeaders,results:i.results}))}),(function(e){r(e)}))}))},n}(n.a);u(c,"_logger",Object(i.b)("MultiRequestBuilder"));var p=function e(t){var r=this;u(this,"results",[]),this.success=!0,(t.result?t.result:t).forEach((function(t){var n=new s.a(t);if(r.results.push(n),n.hasError)return e._logger.error("Service returned an error with error code: "+n.error.code+" and message: "+n.error.message+"."),void(r.success=!1)}))};u(p,"_logger",Object(i.b)("MultiRequestResult"))},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n=function(e){this.message=e.message,this.code=e.code}},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n=function(){function e(e,t,r){this.licenseUrl=e,this.scheme=t,r&&(this.certificate=r)}return e.prototype.toJSON=function(){var e={licenseUrl:this.licenseUrl,scheme:this.scheme};return this.certificate&&(e.certificate=this.certificate),e},e}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(1),i=(r(9),r(0));function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t&&s(e.prototype,t),r&&s(e,r),e}var o=function(){function e(e,t){var r,i,s;s={async:!0,timeout:0,maxAttempts:4},(i="_networkRetryConfig")in(r=this)?Object.defineProperty(r,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[i]=s,Object(n.e)(e.logger),this._partnerId=e.partnerId,this._widgetId=e.widgetId,this._uiConfId=e.uiConfId,this._isAnonymous=!e.ks,this._ks=e.ks||"",this._playerVersion=t}a(e,[{key:"partnerId",get:function(){return this._partnerId}},{key:"widgetId",get:function(){return this._widgetId||this.defaultWidgetId}},{key:"defaultWidgetId",get:function(){return"_"+this._partnerId}},{key:"uiConfId",get:function(){return this._uiConfId}},{key:"ks",get:function(){return this._ks},set:function(e){this._ks=e}},{key:"playerVersion",get:function(){return this._playerVersion}},{key:"isAnonymous",get:function(){return this._isAnonymous}}]);var t=e.prototype;return t.getMediaConfig=function(e){return Promise.reject(new i.a(i.a.Severity.CRITICAL,i.a.Category.PROVIDER,i.a.Code.METHOD_NOT_IMPLEMENTED,{message:"getMediaConfig method must be implement by the derived class"}))},t.getPlaylistConfig=function(e){return Promise.reject(new i.a(i.a.Severity.CRITICAL,i.a.Category.PROVIDER,i.a.Code.METHOD_NOT_IMPLEMENTED,{message:"The provider does not support loading playlist by id"}))},t.getEntryListConfig=function(e){return Promise.reject(new i.a(i.a.Severity.CRITICAL,i.a.Category.PROVIDER,i.a.Code.METHOD_NOT_IMPLEMENTED,{message:"The provider does not support loading entry list"}))},t._verifyHasSources=function(e){if(0===e.hls.concat(e.dash,e.progressive).length)throw new i.a(i.a.Severity.CRITICAL,i.a.Category.SERVICE,i.a.Code.MISSING_PLAY_SOURCE,{action:"",messages:"No play source for entry id: "+e.id})},t.getLogLevel=function(e){return Object(n.c)(e)},t.setLogLevel=function(e,t){Object(n.d)(e,t)},a(e,[{key:"LogLevel",get:function(){return n.a}}]),e}()},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n=function e(t){var r;return Array.isArray(t)?(r=t.length>0?t.slice(0):[]).forEach((function(t,n){("object"==typeof t&&t!=={}||Array.isArray(t)&&t.length>0)&&(r[n]=e(t))})):"object"==typeof t?(r=Object.assign({},t),Object.keys(r).forEach((function(t){("object"==typeof r[t]&&r[t]!=={}||Array.isArray(r[t])&&r[t].length>0)&&(r[t]=e(r[t]))}))):r=t,r}},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r(2);var n=function(){this.items=[]}},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n=function(e){this.url=e.url,this.clickThroughUrl=e.clickThroughUrl}},,function(e,t,r){"use strict";r.r(t),r.d(t,"Provider",(function(){return $})),r.d(t,"ContextType",(function(){return re})),r.d(t,"MediaType",(function(){return ne})),r.d(t,"NAME",(function(){return ee})),r.d(t,"VERSION",(function(){return te}));var n=r(13),i=r(1),s=r(14),a={serviceParams:{apiVersion:"5.2.6"}},o=function(){function e(){}return e.set=function(e){e&&Object.assign(a,e)},e.get=function(){return Object(s.a)(a)},e}(),u=r(9),c=r(10),p=function(){function e(){}return e.getMultiRequest=function(e,t){var r=o.get(),n=r.serviceParams;e&&Object.assign(n,{ks:e}),t&&Object.assign(n,{partnerId:t});var i=new Map;i.set("Content-Type","application/json");var s=new c.a(i);return s.method="POST",s.service="multirequest",s.url=s.getUrl(r.serviceUrl),s.params=n,s},e}();var f=function(e){var t,r;function n(t,r,n){var i;return void 0===r&&(r=""),(i=e.call(this,n)||this)._multiRequest=p.getMultiRequest(r,t),i}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n}(u.a),d=r(3);var l=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.anonymousLogin=function(e,t,r){var n=new Map;n.set("Content-Type","application/json");var i=new d.a(n);i.service="ottuser",i.action="anonymousLogin",i.method="POST",i.url=i.getUrl(e);var s={partnerId:t};return r&&Object.assign(s,{udid:r}),i.params=s,i},n}(p);function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,t,r){return t&&h(e.prototype,t),r&&h(e,r),e}var g=function(){function e(e){var t,r,n;n={},(r="_response")in(t=this)?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,this.requests=this.buildRequests(e),this._partnerId=e.partnerId}y(e,null,[{key:"id",get:function(){return"session"}}]);var t=e.prototype;return t.buildRequests=function(e){var t=o.get(),r=[];return r.push(l.anonymousLogin(t.serviceUrl,e.partnerId,e.udid)),r},t.isValid=function(){return!!this._partnerId},y(e,[{key:"requests",set:function(e){this._requests=e},get:function(){return this._requests}},{key:"response",set:function(e){this._response.ks=e[0].data.ks},get:function(){return this._response.ks}}]),e}();var m=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.getPlaybackContext=function(e,t,r,n,i){var s=new Map;s.set("Content-Type","application/json");var a=new d.a(s);a.service="asset",a.action="getPlaybackContext",a.method="POST",a.url=a.getUrl(e);var o={objectType:"KalturaPlaybackContextOptions"};return Object.assign(o,i),a.params={assetId:r,assetType:n,contextDataParams:o,ks:t},a},n.get=function(e,t,r,n){var i=new Map;i.set("Content-Type","application/json");var s=new d.a(i);return s.service="asset",s.action="get",s.method="POST",s.url=s.getUrl(e),s.params={id:r,assetReferenceType:n,ks:t},s},n}(p),v=r(5),_=r(11);var b,T,E,R=function(e){this.type=e.type};E={BLOCK:"BLOCK",START_DATE_OFFSET:"START_DATE_OFFSET",END_DATE_OFFSET:"END_DATE_OFFSET",USER_BLOCK:"USER_BLOCK",ALLOW_PLAYBACK:"ALLOW_PLAYBACK",BLOCK_PLAYBACK:"BLOCK_PLAYBACK",APPLY_DISCOUNT_MODULE:"APPLY_DISCOUNT_MODULE"},(T="Type")in(b=R)?Object.defineProperty(b,T,{value:E,enumerable:!0,configurable:!0,writable:!0}):b[T]=E;var O=r(6);var C=function(){function e(e){var t=this;!function(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}(this,"drm",[]),this.format=e.format,this.adsPolicy=e.adsPolicy,this.adsParam=e.adsParam,this.duration=e.duration,this.url=e.url,this.type=e.type,this.fileId=e.id,this.protocols=e.protocols,e.drm&&e.drm.map((function(e){return t.drm.push(new O.a(e))}))}var t=e.prototype;return t.hasDrmData=function(){return this.drm&&this.drm.length>0},t.getProtocol=function(e){var t="";if(this.protocols&&this.protocols.length>0)this.protocols.split(",").forEach((function(r){r===e&&(t=r)}));else if("http"===e)return e;return t},e}();var A=function(e){this.streamertype=e.streamertype,this.url=e.url};function I(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}!function(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}(A,"StreamerType",{HLS:"hls",DASH:"dash",PROGRESSIVE:"progressive"});var S=function(e){var t,r;function n(t){var r;if(P(I(r=e.call(this,t)||this),"sources",[]),P(I(r),"actions",[]),P(I(r),"messages",[]),P(I(r),"plugins",[]),!r.hasError){var n=t.messages;n&&n.map((function(e){return r.messages.push(new _.a(e))}));var i=t.actions;i&&i.map((function(e){return r.actions.push(new R(e))}));var s=t.sources;s&&s.map((function(e){return r.sources.push(new C(e))}));var a=t.plugins;a&&a.map((function(e){return r.plugins.push(new A(e))}))}return r}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var i=n.prototype;return i.hasBlockAction=function(){return void 0!==this.getBlockAction()},i.getBlockAction=function(){return this.actions.find((function(e){return e.type===R.Type.BLOCK}))},i.getErrorMessages=function(){return this.messages},n}(v.a);function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}P(S,"Type",{TRAILER:"TRAILER",CATCHUP:"CATCHUP",START_OVER:"START_OVER",PLAYBACK:"PLAYBACK"});var k=function(e){var t,r;function n(t){var r;return L(w(r=e.call(this,t)||this),"name",""),L(w(r),"description",""),L(w(r),"tags",[]),L(w(r),"metas",[]),L(w(r),"pictures",[]),r.hasError||(r.id=t.id,r.name=t.name,r.description=t.description,r.metas=r._formatTagsMetas(t.metas),r.tags=r._formatTagsMetas(t.tags),r.pictures=t.images),r}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.prototype._formatTagsMetas=function(e){var t=[];return Object.keys(e).forEach((function(r){if(e[r].objects){var n="";e[r].objects.forEach((function(e){n+=e.value+"|"})),t.push({key:r,value:n})}else t.push({key:r,value:e[r].value})})),t},n}(v.a);function j(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function D(e,t,r){return t&&j(e.prototype,t),r&&j(e,r),e}L(k,"Type",{MEDIA:"media",RECORDING:"recording",EPG:"epg"}),L(k,"AssetReferenceType",{MEDIA:"media",EPG_INTERNAL:"epg_internal",EPG_EXTERNAL:"epg_external",NPVR:"nPVR"});var M=function(){function e(e){!function(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}(this,"_response",{}),this.requests=this.buildRequests(e),this._entryId=e.entryId}D(e,null,[{key:"id",get:function(){return"asset"}}]);var t=e.prototype;return t.buildRequests=function(e){var t=o.get(),r=[];return r.push(m.get(t.serviceUrl,e.ks,e.entryId,e.assetReferenceType)),r.push(m.getPlaybackContext(t.serviceUrl,e.ks,e.entryId,e.type,e.playbackContext)),r},t.isValid=function(){return!!this._entryId},D(e,[{key:"requests",set:function(e){this._requests=e},get:function(){return this._requests}},{key:"response",set:function(e){this._response.mediaDataResult=new k(e[0].data),this._response.playBackContextResult=new S(e[1].data)},get:function(){return this._response}}]),e}();function N(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function x(e,t,r){return t&&N(e.prototype,t),r&&N(e,r),e}var U,B,q,V,H=function(){function e(e){!function(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}(this,"_response",{playlistItems:{entries:[]}}),this.requests=this.buildRequests(e),this._entries=e.entries}x(e,null,[{key:"id",get:function(){return"asset_list"}}]);var t=e.prototype;return t.buildRequests=function(e){var t=o.get(),r=[];return e.entries.forEach((function(n){var i=n.assetReferenceType||k.AssetReferenceType.MEDIA;r.push(m.get(t.serviceUrl,e.ks,n.entryId||n,i))})),r},t.isValid=function(){return!(!this._entries||!this._entries.length)},x(e,[{key:"requests",set:function(e){this._requests=e},get:function(){return this._requests}},{key:"response",set:function(e){var t=this;e.forEach((function(e){t._response.playlistItems.entries.push({mediaDataResult:new k(e.data)})}))},get:function(){return this._response}}]),e}(),K=r(2),Y=r(12),F=r(8),W=r(7),G=r(15),J=r(16),X=r(4);var Q=((V={})[k.Type.MEDIA]=((U={})[S.Type.TRAILER]=function(){return{type:K.a.Type.VOD}},U[S.Type.PLAYBACK]=function(e){return parseInt(e.externalIds)>0||"KalturaLiveAsset"===e.objectType?{type:K.a.Type.LIVE,dvrStatus:0}:{type:K.a.Type.VOD}},U),V[k.Type.EPG]=((B={})[S.Type.CATCHUP]=function(){return{type:K.a.Type.VOD}},B[S.Type.START_OVER]=function(){return{type:K.a.Type.LIVE,dvrStatus:1}},B),V[k.Type.RECORDING]=((q={})[S.Type.PLAYBACK]=function(){return{type:K.a.Type.VOD}},q),V),z=function(){function e(){}return e.getMediaEntry=function(t,r){var n=new K.a;e._fillBaseData(n,t,r);var i=t.playBackContextResult,s=t.mediaDataResult,a=i.sources,o=e._filterSourcesByFormats(a,r.formats);n.sources=e._getParsedSources(o);var u=e._getMediaType(s.data,r.mediaType,r.contextType);return n.type=u.type,n.dvrStatus=u.dvrStatus,n.duration=Math.max.apply(Math,a.map((function(e){return e.duration}))),n},e.getEntryList=function(t,r){var n=new G.a;return t.playlistItems.entries.forEach((function(t){var i=new K.a,s=r.find((function(e){return e.entryId===t.mediaDataResult.id}));e._fillBaseData(i,t,s),n.items.push(i)})),n},e.getBumper=function(e){var t=e.playBackContextResult.plugins.find((function(e){return e.streamertype===A.StreamerType.PROGRESSIVE}));if(t)return new J.a(t)},e._fillBaseData=function(t,r,n){var i=r.mediaDataResult,s=e.reconstructMetadata(i);return s.description=i.description,s.name=i.name,n&&n.mediaType&&(s.mediaType=n.mediaType),t.metadata=s,t.poster=e._getPoster(i.pictures),t.id=i.id,t},e.reconstructMetadata=function(t){return{metas:e.addToMetaObject(t.metas),tags:e.addToMetaObject(t.tags)}},e.addToMetaObject=function(e){var t={};return e&&e.forEach((function(e){t[e.key]=e.value})),t},e._getPoster=function(e){if(e&&e.length>0){var t=e[0].url;return/.*\/thumbnail\/.*(?:width|height)\/\d+\/(?:height|width)\/\d+/.test(t)?t:e.map((function(e){return{url:e.url,width:e.width,height:e.height}}))}return""},e._getMediaType=function(e,t,r){var n={type:K.a.Type.UNKNOWN};return Q[t]&&Q[t][r]&&(n=Q[t][r](e)),n},e._filterSourcesByFormats=function(e,t){return t.length>0&&(e=e.filter((function(e){return t.includes(e.type)}))),e},e._getParsedSources=function(t){var r=new W.a,n=function(t){var n=e._parseAdaptiveSource(t);if(n){var i=X.b.get(t.format);r.map(n,i)}};return t&&t.length>0&&(t.filter((function(e){return!Object(X.c)(e.format)})).forEach(n),t.filter((function(e){return Object(X.c)(e.format)})).forEach(n)),r},e._parseAdaptiveSource=function(t){var r=new F.a;if(t){var n=t.url,i=X.b.get(t.format);if(i&&(r.mimetype=i.mimeType),!n)return e._logger.error("failed to create play url from source, discarding source: ("+t.fileId+"), "+t.format+"."),null;if(r.url=n,r.id=t.fileId+","+t.format,t.hasDrmData()){var s=[];t.drm.forEach((function(e){s.push(new Y.a(e.licenseURL,O.a.Scheme[e.scheme],e.certificate))})),r.drmData=s}}return r},e.hasBlockAction=function(e){return e.playBackContextResult.hasBlockAction()},e.getBlockAction=function(e){return e.playBackContextResult.getBlockAction()},e.getErrorMessages=function(e){return e.playBackContextResult.getErrorMessages()},e}();!function(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}(z,"_logger",Object(i.b)("OTTProviderParser"));var Z=r(0);var $=function(e){var t,r;function n(t,r){var n;return(n=e.call(this,t,r)||this)._logger=Object(i.b)("OTTProvider"),o.set(t.env),n._networkRetryConfig=Object.assign(n._networkRetryConfig,t.networkRetryParameters),n}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var s=n.prototype;return s.getMediaConfig=function(e){var t=this;return e.ks&&(this.ks=e.ks,this._isAnonymous=!1),this._dataLoader=new f(this.partnerId,this.ks,this._networkRetryConfig),new Promise((function(r,n){var i=e.entryId;if(i){var s=t.ks;s||(s="{1:result:ks}",t._dataLoader.add(g,{partnerId:t.partnerId}));var a=e.contextType||S.Type.PLAYBACK,o=e.mediaType||k.Type.MEDIA,u=e.assetReferenceType||k.AssetReferenceType.MEDIA,c={mediaProtocol:e.protocol,assetFileIds:e.fileIds,context:a};e.streamerType&&(c.streamerType=e.streamerType),e.urlType&&(c.urlType=e.urlType),t._dataLoader.add(M,{entryId:i,ks:s,type:o,playbackContext:c,assetReferenceType:u});var p={contextType:a,mediaType:o,formats:e.formats||[]};return t._dataLoader.fetchData().then((function(e){try{r(t._parseDataFromResponse(e,p))}catch(e){n(e)}}),(function(e){n(e)}))}n(new Z.a(Z.a.Severity.CRITICAL,Z.a.Category.PROVIDER,Z.a.Code.MISSING_MANDATORY_PARAMS,{message:"missing entry id"}))}))},s._parseDataFromResponse=function(e,t){this._logger.debug("Data parsing started");var r={session:{isAnonymous:this._isAnonymous,partnerId:this.partnerId},sources:this._getDefaultSourcesObject(),plugins:{}};if(this.uiConfId&&(r.session.uiConfId=this.uiConfId),e){if(e.has(g.id)){var n=e.get(g.id);n&&n.response&&(r.session.ks=n.response)}else r.session.ks=this.ks;if(e.has(M.id)){var i=e.get(M.id);if(i&&i.response&&Object.keys(i.response).length){var s=i.response;if(z.hasBlockAction(s))throw new Z.a(Z.a.Severity.CRITICAL,Z.a.Category.SERVICE,Z.a.Code.BLOCK_ACTION,{action:z.getBlockAction(s),messages:z.getErrorMessages(s)});var a=z.getMediaEntry(s,t);Object.assign(r.sources,this._getSourcesObject(a)),this._verifyHasSources(r.sources);var o=z.getBumper(s);o&&Object.assign(r.plugins,{bumper:o})}}}return this._logger.debug("Data parsing finished",r),r},s.getEntryListConfig=function(e){var t=this;return e.ks&&(this.ks=e.ks,this._isAnonymous=!1),this._dataLoader=new f(this.partnerId,this.ks,this._networkRetryConfig),new Promise((function(r,n){var i=e.entries;if(i&&i.length){var s=t.ks;s||(s="{1:result:ks}",t._dataLoader.add(g,{partnerId:t.partnerId})),t._dataLoader.add(H,{entries:i,ks:s}),t._dataLoader.fetchData().then((function(e){r(t._parseEntryListDataFromResponse(e,i))}),(function(e){n(e)}))}else n({success:!1,data:"Missing mandatory parameter"})}))},s._parseEntryListDataFromResponse=function(e,t){var r=this;this._logger.debug("Data parsing started");var n={id:"",metadata:{name:"",description:""},poster:"",items:[]};if(e&&e.has(H.id)){var i=e.get(H.id);if(i&&i.response)z.getEntryList(i.response,t).items.forEach((function(e){return n.items.push({sources:r._getSourcesObject(e)})}))}return this._logger.debug("Data parsing finished",n),n},s._getDefaultSourcesObject=function(){return{hls:[],dash:[],progressive:[],id:"",duration:0,type:K.a.Type.UNKNOWN,poster:"",dvr:!1,vr:null,metadata:{name:"",description:"",tags:""}}},s._getSourcesObject=function(e){var t=this._getDefaultSourcesObject(),r=e.sources.toJSON();return t.hls=r.hls,t.dash=r.dash,t.progressive=r.progressive,t.id=e.id,t.duration=e.duration,t.type=e.type,t.dvr=!!e.dvrStatus,t.poster=e.poster,e.metadata&&e.metadata.metas&&"string"==typeof e.metadata.metas.tags&&e.metadata.metas.tags.indexOf("360")>-1&&(t.vr={}),Object.assign(t.metadata,e.metadata),t},n}(n.a),ee="playkit-js-providers-ott",te="2.25.1",re=S.Type,ne=k.Type}])}));
//# sourceMappingURL=playkit-ott-provider.js.map