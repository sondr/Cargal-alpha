/*!
 * car-gal.ts v0.3.6
 * Copyright (c) 2018-2018 Sondre Tveit Erno
 * @license ISC
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("CarGal",[],t):"object"==typeof exports?exports.CarGal=t():e.CarGal=t()}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._EXT_SCRIPTS={YT:"https://www.youtube.com/player_api"},t._CLASSNAMES={active:"active",hidden:"cg-hidden",fixed:"fixed",btnContainer:"cg-btn-container",btn:"cg-btn",carouselContainer:"cg-container",carousel:"cg-carousel",caption:"cg-caption",title:"cg-title",description:"cg-description",thumbnailContainer:"cg-thumbs",thumbsActive:"cg-thumbs-active",overlay:"cg-overlay",fullscreenContainer:"cg-fs-container",fullscreenGallery:"cg-fs-gallery",fullscreenMenuBar:"cg-fs-menubar",fullscreenMenuBarIndicator:"cg-fs-menubar-indicator",fullscreenMenuBarTitle:"cg-fs-menubar-title",fullscreenMenuBarBtnGroup:"cg-fs-menubar-btn-group",fullscreenMenuBarBtn:"cg-fs-menubar-btn",externalIncludeImage:"cg-external-include",preventScroll:"cg-prevent-scroll",iconThumbnails:"cg-thumbnails",iconTiles:"cg-tiles",iconClose:"cg-close",iconPlay:"cg-play",iconPause:"cg-paused",chevron:"cg-chevron",left:"cg-left",right:"cg-right",up:"cg-up",down:"cg-down",item:"cg-item"},t._HTML={Tags:{div:"div",img:"img",ul:"ul",li:"li",i:"i",p:"p"},Attr:{src:"src",srcSet:"srcset"}},t._TYPES={boolean:"boolean",number:"number",string:"string"},t._EVENT_ACTIONS={resize:"resize",click:"click",mouseDown:"mousedown",mouseUp:"mouseup",mouseMove:"mousemove",mouseOver:"mouseover",mouseOut:"mouseout",mouseEnter:"mouseenter",mouseLeave:"mouseleave",touchStart:"touchstart",touchEnd:"touchend",touchMove:"touchmove",DOMContentLoaded:"DOMContentLoaded"},t._DATA_SETS={carousel:{color:"cgCarouselColor",backgroundColor:"cgCarouselBackgroundColor"},fullscreen:{color:"cgGalleryColor",backgroundColor:"cgGalleryBackgroundColor"},item:{title:"cgTitle",description:"cgDescription",url:"cgCaptionUrl"},external:{include:"cgGalleryId",removeFromDOM:"cgRemove"},img:{srcset:"cgSrcset"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(2),s=n(0);function o(e){var t="string"==typeof e.elementTagOrElement?r._PLATFORM.DOM.createElement(e.elementTagOrElement):e.elementTagOrElement;return e.classes&&(t.className+=""+e.classes),e.textContent&&(t.textContent=e.textContent),e.attr&&Array.isArray(e.attr)&&e.attr.forEach(function(e){return t.setAttribute(e[0],e[1])}),t}function l(e){var t=Array.isArray(e)?e[1]:void 0,n=t?e[0]:e,r=u(n,s._HTML.Tags.img);return{origin:t,containerElement:n,element:r,title:t?t.dataset[i._DATA_SETS.item.title]:n.dataset[i._DATA_SETS.item.title],description:t?t.dataset[i._DATA_SETS.item.description]:n.dataset[i._DATA_SETS.item.description],sizes:a(r)}}function a(e){var t;if(e&&(t=e.dataset[i._DATA_SETS.img.srcset]))try{return t.replace(/(?:\r\n|\r|\n)/g," ").replace(/ +(?= )/g,"").split(",").map(function(e){var t=e.trim().split(" ");return{w:Number.parseInt(t[1]),src:t[0]}}).sort(function(e,t){return e.w-t.w})}catch(e){return}}t.createElement=o,t.convertToMediaObjects=function(e){return e.map(l)},t.convertToMediaObject=l,t.Get_ImageSrcSet=a;var c=function(){function e(e){if(e.tagName||(e.tagName=s._HTML.Tags.div),this.parentElement=e.parentElement,this.options=e,this.options.styles){var t=r._PLATFORM.styleSheet.appendStyle(this.options.styles);this.options.classes||(this.options.classes=""),this.options.classes+=" "+t}this.element=o({elementTagOrElement:e.element||e.tagName,classes:this.options.classes,textContent:this.options.textContent,attr:this.options.attr}),e.element=this.element,this.children=this.mapChildren(e.children),this.init()}return Object.defineProperty(e.prototype,"Element",{get:function(){return this.element},enumerable:!0,configurable:!0}),e.prototype.setParent=function(e){e&&(this.parentElement=e,e&&e.appendChild(this.element))},e.prototype.init=function(){var e=this;this.options.eventListeners&&this.options.eventListeners.length>0&&this.options.eventListeners.forEach(function(t){return e.element.addEventListener(t.action,t.handler)}),this.setParent(this.parentElement)},e.prototype.mapChildren=function(e){var t=this;return e&&Array.isArray(e)?e.map(function(e){return t.appendChild(e)}):[]},e.prototype.appendChild=function(t){return t instanceof e?(t.parentElement||t.setParent(this.element),t):(t.parentElement=this.element,new e(t))},e.prototype.dispose=function(e){var t=this;this.children&&this.children.forEach(function(e){e.dispose(t.options.removeOnDispose)}),!this.options.eventListeners||this.options.eventListeners.length<=0||(this.options.eventListeners.forEach(function(e){return t.element.removeEventListener(e.action,e.handler)}),(!0===e||this.options.removeOnDispose)&&this.parentElement&&this.parentElement.removeChild(this.element))},e}();function u(e,t){var n=null;t=t.trim();try{if(1==t.split(" ").length)switch(t.substr(0,1)){case"#":n=e.getElementById?e.getElementById(t.substr(1)):e.querySelector(t);break;case".":n=e.getElementsByClassName(t.substr(1)).item(0);break;default:n=e.getElementsByTagName(t).item(0)}else n=e.querySelector(t)}catch(e){console.log(e)}return n}function h(e){return null!==e&&"object"==typeof e}function d(e){return h(e)&&!Array.isArray(e)}t.CgElement=c,t.Find_Element=u,t.ProgressiveImageLoad=function(e){if(e&&e.sizes){var t=e.containerElement.offsetWidth,n=(e.containerElement.clientHeight,u(e.containerElement,s._HTML.Tags.img)),i=e.sizes.findIndex(function(e){return e.w>=t});-1===i&&(i=e.sizes.length-1),e.currentSizeIndex&&e.currentSizeIndex>=i||n&&n.src!=e.sizes[i].src&&(e.currentSizeIndex=i,n.src=e.sizes[i].src)}},t.deepObjectAssign=function(e){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];if(!n.length)return e;var r=n.shift();return void 0===r?e:(d(e)&&d(r)&&Object.keys(r).forEach(function(n){d(r[n])?(e[n]||(e[n]={}),t.deepObjectAssign(e[n],r[n])):e[n]=r[n]}),t.deepObjectAssign.apply(void 0,[e].concat(n)))},t.isObject=h,t.isMergebleObject=d,t.Get_YoutubeImg=function(e,t){var n=["hq","sd","maxres"];return"number"!=typeof t?t=1:t<0?t=0:t>n.length-1&&(t=n.length-1),"https://img.youtube.com/vi/"+e+"/"+n[t]+"default.jpg"},t.Load_Resource=function(e){try{return r._PLATFORM.DOM&&r._PLATFORM.DOM.head&&r._PLATFORM.DOM.head.appendChild(e),e}catch(e){return}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(8),r=n(9),s=function(){function e(e,n,s,o){this.DOM=e,this.global=n,this.container=s,this.defaultOptions=o,this.variables={},t._PLATFORM=this,this.overlay=new i.Overlay,this.styleSheet=new r.DynamicStyle}return e.create=function(n,i,r,s){return t._PLATFORM=new e(n,i,r,s),t._PLATFORM},e.prototype.dispose=function(){this.overlay.isDisposed||this.overlay.dispose(),this.styleSheet.isDisposed||this.styleSheet.dispose()},e}();t.PLATFORM=s},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(2),s=n(0),o=n(11),l={color:{key:"color",type:"color",sel:":before"},hover:{key:"hover",type:"color",sel:":hover>i:before"},background:{key:"background",type:"background",sel:void 0},backgroundHover:{key:"backgroundHover",type:"background",sel:":hover"}},a=function(){function t(e,t){this.running=!1,this.fullScreen=t,this.gallery=e,this.btnsEntries=Object.entries(this.gallery.options.Carousel.btns).filter(function(e){return e[1]}),this.init(),this.gallery.options.Carousel.thumbnails&&this.activateThumbnails()}return Object.defineProperty(t.prototype,"Element",{get:function(){return this.element},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"CarouselElement",{get:function(){return this.carouselElement},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"Thumbnails",{get:function(){return this.activateThumbnails(),this.thumbnails},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"Media",{get:function(){return this.gallery.media},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"getActiveIndex",{get:function(){return this.activeIndex},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"DescriptionElement",{get:function(){return this.descriptionElement},enumerable:!0,configurable:!0}),t.prototype.activateThumbnails=function(){this.thumbnails||(this.thumbnails=new o.Thumbnails(this))},t.prototype.init=function(){var e,t=this,n=this.gallery.container.classList.contains(s._CLASSNAMES.carousel)?this.gallery.container:i.Find_Element(this.gallery.container,"."+s._CLASSNAMES.carousel),r=n?i.Find_Element(n,s._HTML.Tags.ul):void 0;this.descriptionElement=new i.CgElement({classes:s._CLASSNAMES.description});var o={element:n,styles:this.gallery.options.Carousel.padding?{values:[["padding",this.gallery.options.Carousel.padding]]}:void 0,children:[{element:r,tagName:s._HTML.Tags.ul,children:this.gallery.media.map(function(e){return{element:e.containerElement}})},this.createButtons(),this.descriptionElement],eventListeners:[{action:s._EVENT_ACTIONS.touchStart,handler:function(t){e=t}},{action:s._EVENT_ACTIONS.touchEnd,handler:function(n){if(1==e.touches.length){var i=e.changedTouches[0].pageX-n.changedTouches[0].pageX;Math.abs(i)>75&&t.cycle(i>0?1:-1)}e=null}}]};this.fullScreen||(o.eventListeners=o.eventListeners.concat([{action:s._EVENT_ACTIONS.mouseEnter,handler:function(e){e.stopPropagation(),t.buttonContainer.element.classList.remove(s._CLASSNAMES.hidden)}},{action:s._EVENT_ACTIONS.mouseLeave,handler:function(e){e.stopPropagation(),t.buttonContainer.element.classList.add(s._CLASSNAMES.hidden)}}])),o={element:this.gallery.container,children:[o]},this.element=new i.CgElement(o),this.carouselElement=this.element.children.find(function(e){return e.Element.classList.contains(s._CLASSNAMES.carousel)}),this.gallery.media.length<=0||(this.activeIndex=this.gallery.media.findIndex(function(e){return e.containerElement.classList.contains(s._CLASSNAMES.active)}),this.set_active(-1==this.activeIndex?0:this.activeIndex),this.gallery.options.Carousel.autoplay&&this.play())},t.prototype.createButtons=function(){var e=this,t=this.MakeStylesObject({entries:this.btnsEntries,childs:[l.color.key]}),n=this.MakeStylesObject({entries:this.btnsEntries,container:[l.background.key],childs:[l.backgroundHover.key,l.hover.key]});return this.buttonContainer={removeOnDispose:!0,classes:""+s._CLASSNAMES.btnContainer,children:[{classes:s._CLASSNAMES.btn+" "+s._CLASSNAMES.left,eventListeners:[{action:s._EVENT_ACTIONS.click,handler:function(t){e.cycle(-1)}}],styles:n,children:[{tagName:s._HTML.Tags.i,classes:s._CLASSNAMES.chevron+" "+s._CLASSNAMES.left,styles:t}]},{classes:s._CLASSNAMES.btn+" "+s._CLASSNAMES.right,eventListeners:[{action:s._EVENT_ACTIONS.click,handler:function(t){e.cycle(1)}}],styles:n,children:[{tagName:s._HTML.Tags.i,classes:s._CLASSNAMES.chevron+" "+s._CLASSNAMES.right,styles:t}]}]},this.buttonContainer},t.prototype.MakeStylesObject=function(e){if(e&&(e.container=e.container||[],e.childs=e.childs||[],0!=e.container.length||0!=e.childs.length)){var t=function(e){var t=l[e[0]];return{id:t.sel,values:[[t.type,e[1]]]}};e.entries.filter(function(t){return e.container.includes(t[0])}).map(t).map(function(e){return e.values});return{values:e.container&&e.container.length>0?e.entries.filter(function(t){return e.container.includes(t[0])}).map(t).map(function(e){return e.values})[0]:void 0,childValues:e.childs&&e.childs.length>0?e.entries.filter(function(t){return e.childs.includes(t[0])}).map(t):void 0}}},t.prototype.togglePlay=function(){this.running?this.stop():this.play()},t.prototype.play=function(){var t=this;this.running||(r._PLATFORM.global.clearInterval(this.intervalTimer),this.intervalTimer=e.setInterval(function(){t.gallery.options.Carousel.autoplay_repeat||t.activeIndex!=t.gallery.media.length-1||r._PLATFORM.global.clearInterval(t.intervalTimer),t.cycle(1,!0)},this.gallery.options.Carousel.slideInterval),this.running=!0)},t.prototype.stop=function(){r._PLATFORM.global.clearInterval(this.intervalTimer),this.running=!1},t.prototype.cycle=function(e,t){if(!(this.gallery.media.length<=0)){e%=this.gallery.media.length;var n=this.activeIndex+e;n>=this.gallery.media.length&&(n-=this.gallery.media.length),n<0&&(n+=this.gallery.media.length),this.set_active(n,t)}},t.prototype.set_active=function(e,t){!t&&this.running&&this.stop(),e>=this.gallery.media.length||(void 0!=this.activeIndex&&this.set_inactive(this.activeIndex),this.gallery.media[e].containerElement.classList.add(s._CLASSNAMES.active),i.ProgressiveImageLoad(this.gallery.media[e]),this.fullScreen&&this.fullScreen.setMediaInfo(this.gallery.media[e],e+1,this.gallery.media.length,this),this.thumbnails&&this.thumbnails.setActive(e,this.activeIndex),this.activeIndex=e)},t.prototype.set_interval=function(e){this.gallery.options.Carousel.slideInterval=e,this.restart()},t.prototype.dispose=function(){this.stop(),this.thumbnails&&this.thumbnails.dispose(),this.element&&this.element.dispose()},t.prototype.restart=function(){this.stop(),this.play()},t.prototype.set_inactive=function(e){e>=this.gallery.media.length||e<0||this.gallery.media[e].containerElement.classList.remove(s._CLASSNAMES.active)},t.prototype.set_all_inactive=function(){this.gallery.media.forEach(function(e){return e.containerElement.classList.remove(s._CLASSNAMES.active)})},t}();t.Carousel=a}).call(this,n(10))},function(e,t,n){e.exports=n(5)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(14);var i=n(6),r=n(12);t.init=function(e){return new i.CarGal(r.Configure(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(7),r=n(0),s=n(3),o=n(2),l=n(1),a=1,c=function(){function e(e){this.eventListeners=[],this.galleries=[],o.PLATFORM.create(e.document,e.window,e.containerElement,e.defaultOptions);var t=this.find_galleries(e);this.setup(t)}return e.prototype.find_external_images=function(){return Array.from(o._PLATFORM.DOM.getElementsByClassName(r._CLASSNAMES.externalIncludeImage)||[])},e.prototype.find_galleries=function(e){var t=e.instances&&Array.isArray(e.instances)&&e.instances.length>0,n=this.find_external_images(),i=[];if(t&&(i=e.instances.map(function(e){return typeof e.container===r._TYPES.string&&(e.ContainerId=e.container,e.container=l.Find_Element(o._PLATFORM.DOM,e.container)),e}).filter(function(e){return e.container})),e.autoInit&&Array.prototype.push.apply(i,this.get_autoinit_galleries(i.map(function(e){return e.container}))),i.forEach(function(e){if(e.externalMedia=[],e.container.id&&(e.ContainerId=e.container.id),e.ContainerId)for(var t=n.length-1;t>=0;t--){n[t].dataset[r._DATA_SETS.external.include]==e.ContainerId&&e.externalMedia.unshift(n.splice(t,1)[0])}}),n.length>0){var s=[];n.forEach(function(e){var t=e.dataset[r._DATA_SETS.external.include];if(t){var n=s.find(function(e){return e.key==t});n?n.media.push(e):s.push({key:t,media:[e]})}}),t&&s.forEach(function(t){var n=e.instances.find(function(e){return e.ContainerId=="#"+t.key});n&&(t.options=n.options)}),s.length>0&&Array.prototype.push.apply(i,s.map(function(e){return{ContainerId:e.key,externalMedia:e.media,options:e.options}}))}return i.forEach(function(e){return e.options=l.deepObjectAssign(JSON.parse(JSON.stringify(o._PLATFORM.defaultOptions)),e.options)}),i},e.prototype.get_autoinit_galleries=function(e){return void 0===e&&(e=[]),Array.from(o._PLATFORM.DOM.getElementsByClassName(r._CLASSNAMES.carouselContainer)||[]).filter(function(t){return!e.some(function(e){return e===t})}).map(function(e){return{container:e}})},e.prototype.get_dataset_options=function(e){return{enableFullScreen:!1}},e.prototype.setup=function(e){var t=this;!e||e.length<=0||(this.galleries=e.map(function(e){var t={Id:a++,options:e.options,container:e.container,media:e.container?l.convertToMediaObjects(Array.from(e.container.getElementsByClassName(r._CLASSNAMES.item)||[])):[],externalMedia:l.convertToMediaObjects(e.externalMedia.map(function(e){var t=!!e.dataset[r._DATA_SETS.external.removeFromDOM],n=t?e:e.cloneNode(!0);if(n.classList.contains(r._CLASSNAMES.item))return t?n:[n,e];var i=l.createElement({elementTagOrElement:r._HTML.Tags.li,classes:r._CLASSNAMES.item});return i.appendChild(n),t?i:[i,e]}))};return e.instance=t,t}),this.galleries.forEach(function(e){e.container&&(e.Carousel=new s.Carousel(e)),!e.options.enableFullScreen&&e.container||(e.Fullscreen=new i.Fullscreen(e)),t.Attach_Gallery_EventListeners(e)}),o._PLATFORM.styleSheet.buildSheet(),this.Attach_Global_EventListeners())},e.prototype.Attach_Global_EventListeners=function(){var e=this,t={action:r._EVENT_ACTIONS.resize,vars:{},handler:function(n){o._PLATFORM.global.clearTimeout(t.vars.timer),t.vars.timer=o._PLATFORM.global.setTimeout(function(){e.Update_GalleryImageSizes(n)},150)}};this.eventListeners=[t],this.eventListeners.forEach(function(e){o._PLATFORM.global.addEventListener(e.action,e.handler)})},e.prototype.Update_GalleryImageSizes=function(e){this.galleries.forEach(function(e){[e.Carousel,(e.Fullscreen||{}).Carousel].filter(function(e){return e}).forEach(function(e){return l.ProgressiveImageLoad(e.Media[e.getActiveIndex])})})},e.prototype.Attach_Gallery_EventListeners=function(e){var t=e.media.length;e.media.forEach(function(t,n){t.handler=function(){e.Carousel&&e.Carousel.stop(),e.Fullscreen.show(n)},t.containerElement.addEventListener(r._EVENT_ACTIONS.click,t.handler)}),e.externalMedia.filter(function(e){return e.origin}).forEach(function(n,i){n.handler=function(){e.Fullscreen.show(t+i)},n.origin.addEventListener(r._EVENT_ACTIONS.click,n.handler)})},e.prototype.Detach_EventListeners=function(e){e.media&&e.media.forEach(function(e){return e.containerElement.removeEventListener(r._EVENT_ACTIONS.click,e.handler)}),e.externalMedia&&e.externalMedia.filter(function(e){return e.origin}).forEach(function(e){return e.origin.removeEventListener(r._EVENT_ACTIONS.click,e.handler)})},e.prototype.dispose=function(){var e=this;this.eventListeners.forEach(function(e){o._PLATFORM.global.removeEventListener(e.action,e.handler)}),this.eventListeners=[],this.galleries.forEach(function(t){e.Detach_EventListeners(t),t.Carousel&&t.Carousel.dispose(),t.Fullscreen&&t.Fullscreen.dispose()}),o._PLATFORM.dispose(),this.galleries=[],a=1},e}();t.CarGal=c},function(e,t,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),s=n(1),o=n(3),l=n(2),a=function(){function e(e){this.gallery=e;var t=JSON.parse(JSON.stringify(this.gallery.options));t.Carousel=s.deepObjectAssign({},t.Fullscreen.Carousel),this.options=t,this.menubar=this.createMenuBar(),this.createContainerElements(),this.images=this.gallery.media.concat(this.gallery.externalMedia).map(function(e){return i({},e,{element:void 0,containerElement:e.containerElement.cloneNode(!0)})}),this.carousel=new o.Carousel({media:this.images,container:this.element.Element,options:t},this),this.options.Fullscreen.background&&(this.overlayStyleClass=l._PLATFORM.styleSheet.appendStyle({values:[["background",this.options.Fullscreen.background]]}))}return Object.defineProperty(e.prototype,"Carousel",{get:function(){return this.carousel},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"Media",{get:function(){return this.images},enumerable:!0,configurable:!0}),e.prototype.createContainerElements=function(){this.carouselContainer=new s.CgElement({classes:r._CLASSNAMES.carousel}),this.element=new s.CgElement({classes:r._CLASSNAMES.fullscreenContainer+" "+(this.options.Carousel.thumbnails?r._CLASSNAMES.thumbsActive:"")}),this.element.appendChild(this.menubar),this.element.appendChild(this.carouselContainer)},e.prototype.show=function(e){this.setMenubarFixed(this.gallery.options.Fullscreen.Menubar.fixed),l._PLATFORM.overlay.show(this.element.Element,this.overlayStyleClass),typeof e===r._TYPES.number&&this.carousel.set_active(e)},e.prototype.dispose=function(){this.carousel.dispose(),this.menubar.dispose(),this.element.dispose()},e.prototype.setThumbnailsActiveState=function(e){var t=this.carousel.Thumbnails;t.toggle(),t.isActive?this.element.Element.classList.add(r._CLASSNAMES.thumbsActive):this.element.Element.classList.remove(r._CLASSNAMES.thumbsActive)},e.prototype.createMenuBar=function(){var e=this;return this.titleElement=new s.CgElement({tagName:r._HTML.Tags.p,classes:r._CLASSNAMES.fullscreenMenuBarTitle,textContent:"",styles:this.options.Fullscreen.color?{values:[["color",this.options.Fullscreen.color]]}:void 0}),this.indicator=new s.CgElement({tagName:r._HTML.Tags.div,classes:r._CLASSNAMES.fullscreenMenuBarIndicator,textContent:"",styles:this.options.Fullscreen.color?{values:[["color",this.options.Fullscreen.color]]}:void 0}),new s.CgElement({classes:r._CLASSNAMES.fullscreenMenuBar,styles:this.options.Fullscreen.Menubar.background?{values:[["background",this.options.Fullscreen.Menubar.background]]}:void 0,children:[this.indicator,this.titleElement,{tagName:r._HTML.Tags.ul,classes:r._CLASSNAMES.fullscreenMenuBarBtnGroup,children:[{tagName:r._HTML.Tags.li,classes:r._CLASSNAMES.fullscreenMenuBarBtn,eventListeners:[{action:r._EVENT_ACTIONS.click,handler:function(t){e.setThumbnailsActiveState()}}],styles:this.options.Fullscreen.btns.background?{values:[["color",this.options.Fullscreen.btns.background]]}:void 0,children:[{tagName:r._HTML.Tags.i,classes:r._CLASSNAMES.iconThumbnails,styles:this.options.Fullscreen.color?{values:[["border-color",this.options.Fullscreen.color]]}:void 0}]},{tagName:r._HTML.Tags.li,classes:r._CLASSNAMES.fullscreenMenuBarBtn,eventListeners:[{action:r._EVENT_ACTIONS.click,handler:function(e){l._PLATFORM.overlay.close()}}],children:[{tagName:r._HTML.Tags.i,classes:r._CLASSNAMES.iconClose,styles:this.options.Fullscreen.color?{childValues:[{id:[":before",":after"],values:[["background-color",this.options.Fullscreen.color]]}]}:void 0}]}]}]})},e.prototype.setMenubarFixed=function(e){var t=this.element.Element.classList;e?t.add(r._CLASSNAMES.fixed):t.remove(r._CLASSNAMES.fixed)},e.prototype.setMediaInfo=function(e,t,n,i){e.element||(e.element=s.Find_Element(e.containerElement,r._HTML.Tags.img)),this.indicator.Element.innerText=t+" / "+n,this.titleElement.Element.innerText=e.title||"",i.DescriptionElement.Element.innerText=e.description||"";var o=i.DescriptionElement.Element.clientHeight,l="padding-bottom";e.description&&o?i.CarouselElement.Element.style.setProperty(l,o+"px","important"):i.CarouselElement.Element.style.removeProperty(l)},e}();t.Fullscreen=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),r=n(0),s=n(1),o=function(){function e(){this.element=new s.CgElement({parentElement:i._PLATFORM.container,classes:r._CLASSNAMES.overlay}),this.initialClasses=this.element.Element.className.substr(0),this.disposed=!1}return Object.defineProperty(e.prototype,"Container",{get:function(){return this.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isDisposed",{get:function(){return this.disposed},enumerable:!0,configurable:!0}),e.prototype.show=function(e,t){this.element.Element.className=this.initialClasses+(t?" "+t:""),this.lastActiveElement&&this.element.Element.removeChild(this.lastActiveElement),this.element.Element.appendChild(e),this.lastActiveElement=e,this.element.Element.classList.add(r._CLASSNAMES.active),this.prevent_scroll()},e.prototype.close=function(){this.element.Element.classList.remove(r._CLASSNAMES.active),this.element.Element.style.background="",this.allow_scroll()},e.prototype.remove_fullscreen_element=function(e){this.element.Element.removeChild(e)},e.prototype.dispose=function(){this.allow_scroll(),this.remove_overlay(),this.disposed=!0},e.prototype.remove_overlay=function(){this.element.Element&&this.element.Element.parentElement==i._PLATFORM.container&&i._PLATFORM.container.removeChild(this.element.Element)},e.prototype.prevent_scroll=function(){i._PLATFORM.DOM.body.classList.add(r._CLASSNAMES.preventScroll),i._PLATFORM.global.addEventListener(r._EVENT_ACTIONS.touchMove,function(e){return e.preventDefault})},e.prototype.allow_scroll=function(){i._PLATFORM.DOM.body.classList.remove(r._CLASSNAMES.preventScroll),i._PLATFORM.global.removeEventListener(r._EVENT_ACTIONS.touchMove,function(e){return e.preventDefault})},e}();t.Overlay=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),r=n(1),s=function(){function e(){this.counter=1,this.variables=[],this.attached=!1,this.styleSheet=r.createElement({elementTagOrElement:"style",attr:[["type","text/css"],["rel","stylesheet"]]}),this.disposed=!1}return Object.defineProperty(e.prototype,"isDisposed",{get:function(){return this.disposed},enumerable:!0,configurable:!0}),e.prototype.appendStyle=function(e){if(e){var t="cg-dyn"+this.counter++;return e.values||(e.values=[]),e.childValues||(e.childValues=[]),this.variables.push({id:t,value:e.values.filter(function(e){return 2===e.length}).map(function(e){return e[0]+":"+e[1].replace(";","")+"!important;"}).join(" "),childValues:e.childValues.filter(function(e){return e.id&&e.values&&e.values.length>0}).map(function(e){return{id:"string"==typeof e.id?""+t+e.id:e.id.map(function(e){return""+t+e}).join(", ."),value:e.values.filter(function(e){return 2===e.length}).map(function(e){return e[0]+":"+e[1].replace(";","")+"!important;"}).join(" ")}})}),t}},e.prototype.overWriteStyle=function(e,t){},e.prototype.findStyle=function(e){},e.prototype.buildSheet=function(){var e=this.variables.map(function(e){var t="";return e.childValues&&e.childValues.length>0&&(t=e.childValues.map(function(e){return" ."+e.id+"{"+e.value+"}"}).join(" ")),"."+e.id+"{"+e.value+"}"+t}).join(" ");this.styleSheet.innerText=e,this.attached||this.attachStylesheet()},e.prototype.attachStylesheet=function(){this.styleSheet&&(this.attached=!!r.Load_Resource(this.styleSheet))},e.prototype.dispose=function(){this.styleSheet&&i._PLATFORM.DOM.head.removeChild(this.styleSheet),this.styleSheet=void 0,this.disposed=!0},e}();t.DynamicStyle=s},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(1),s=function(){function e(e){this.active=!!e.gallery.options.Carousel.thumbnails,this.carousel=e,this.model=this.init()}return Object.defineProperty(e.prototype,"isActive",{get:function(){return this.active},enumerable:!0,configurable:!0}),e.prototype.show=function(){this.model.Element.classList.add(i._CLASSNAMES.active),this.active=!0},e.prototype.hide=function(){this.model.Element.classList.remove(i._CLASSNAMES.active),this.active=!1},e.prototype.toggle=function(){this.active?this.hide():this.show()},e.prototype.init=function(){return new r.CgElement({removeOnDispose:!0,parentElement:this.carousel.Element.Element,classes:i._CLASSNAMES.thumbnailContainer+" "+(this.carousel.gallery.options.Carousel.thumbnails?i._CLASSNAMES.active:""),children:[this.create_thumbnails()]})},e.prototype.setActive=function(e,t){typeof t===i._TYPES.number&&this.thumbnailList.children[t].Element.classList.remove(i._CLASSNAMES.active),typeof e===i._TYPES.number&&this.thumbnailList.children[e].Element.classList.add(i._CLASSNAMES.active)},e.prototype.create_thumbnails=function(){var e=this,t={tagName:i._HTML.Tags.ul,eventListeners:[{action:i._EVENT_ACTIONS.mouseDown,handler:function(e){e.preventDefault()}},{action:i._EVENT_ACTIONS.mouseUp,handler:function(e){}},{action:i._EVENT_ACTIONS.touchStart,handler:function(e){t.element.style.overflowX="auto"}}],children:[]};return this.carousel.gallery.media.forEach(function(n,s){var o=r.Find_Element(n.containerElement,i._HTML.Tags.img);o&&t.children.push({tagName:i._HTML.Tags.li,classes:i._CLASSNAMES.item,children:[{tagName:i._HTML.Tags.img,attr:[[i._HTML.Attr.src,o.src],[i._HTML.Attr.srcSet,o.srcset]],eventListeners:[{action:i._EVENT_ACTIONS.click,handler:function(t){e.carousel.set_active(s)}}]}]})}),this.thumbnailList=new r.CgElement(t),this.thumbnailList},e.prototype.dispose=function(){this.model&&this.model.dispose()},e}();t.Thumbnails=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t.Configure=function(e){var t={autoInit:!0,defaultOptions:{lazyLoad:!0,enableFullScreen:!0,Carousel:{autoplay:!0,autoplay_repeat:!0,backgroundColor:"#FFFFFF",slideInterval:1e4,thumbnails:!0,Events:void 0,btns:{}},Fullscreen:{opacity:.95,Menubar:{fixed:!0,indicator:!0},title:{},description:{},Carousel:{autoplay:!1,autoplay_repeat:!1,padding:"0 0",slideInterval:1e4,thumbnails:!0,Events:void 0,btns:{}},btns:{}}},instances:[]};return t=i.deepObjectAssign({},t,e||{}),window&&(t.window=window),t.document||(t.document=document),t.rootElement&&"string"==typeof t.rootElement&&(t.rootElement=i.Find_Element(t.document,t.rootElement)),t.containerElement||(t.containerElement=t.document.body),t}},,function(e,t){}])});