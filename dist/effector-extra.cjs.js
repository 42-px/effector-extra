"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("effector");exports.attachWrapper=function(t){return e.attach({mapParams:e=>t.mapParams(e),effect:e.createEffect({handler:e=>{let r=t.effect(e);return t.mapResult&&(r=r.then(r=>t.mapResult({params:e,result:r}))),t.mapError&&(r=r.catch(r=>{throw t.mapError({params:e,error:r})})),r}})})},exports.batchEvents=function(t,r){const a=e.createEvent(),c=e.createEvent(),o=e.createEvent(),s=e.createEvent(),n=e.createStore([]);let p;return n.on(c,(e,t)=>[...e,t]).reset(o),t.watch(e=>{void 0!==p?(clearTimeout(p),c(e)):a([e]),p=setTimeout(()=>{p=void 0,s()},r)}),e.guard({source:e.sample(n,s,e=>e),filter:n.map(e=>Boolean(e.length))}).watch(e=>{a(e),o()}),a},exports.mockEffects=()=>new Map,exports.mockStores=()=>new Map;
//# sourceMappingURL=effector-extra.cjs.js.map
