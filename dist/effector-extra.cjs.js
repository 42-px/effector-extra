"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("effector");function t(t){var r=t.domain?t.domain.effect("effect",{name:"effect",sid:"-xn2rd6"}):e.createEffect("effect",{name:"effect",sid:"-x614yz"});return r.use((function(e){var r=t.effect(t.mapParams(e),{name:"promise",sid:"-9qez7q"});return t.mapResult&&(r=r.then((function(r){return t.mapResult({params:e,result:r})}))),t.mapError&&(r=r.catch((function(r){throw t.mapError({params:e,error:r})}))),r})),r}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}exports.attachWrapper=t,exports.batchEvents=function(t,r){var n,c=e.createEvent("event",{name:"event",sid:"-qsq21n"}),a=e.createEvent("pushStore",{name:"pushStore",sid:"-99i15u"}),i=e.createEvent("resetStore",{name:"resetStore",sid:"-ka34j3"}),u=e.createEvent("timeoutEnd",{name:"timeoutEnd",sid:"-8qf3eg"}),f=e.createStore([],{name:"$storedEvents",sid:"tj0mgu"});return f.on(a,(function(e,t){return[].concat(o(e),[t])})).reset(i),t.watch((function(e){void 0!==n?(clearTimeout(n),a(e)):c([e]),n=setTimeout((function(){n=void 0,u()}),r)})),e.guard({source:e.sample(f,u,(function(e){return e})),filter:f.map((function(e){return Boolean(e.length)}))}).watch((function(e){c(e),i()})),c},exports.createService=function(e){var o=e.domain,c=e.effect;return{createMethod:function(e){return t(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({domain:o,effect:c},e))}}},exports.mockEffects=function(){return new Map},exports.mockStores=function(){return new Map};
//# sourceMappingURL=effector-extra.cjs.js.map
