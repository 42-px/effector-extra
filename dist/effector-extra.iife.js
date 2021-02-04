var EffectorExtra=function(r,t){"use strict";return r.attachWrapper=function(r){return t.attach({mapParams:t=>r.mapParams(t),effect:t.createEffect({handler:t=>{let a=r.effect(t);return r.mapResult&&(a=a.then(a=>r.mapResult({params:t,result:a}))),r.mapError&&(a=a.catch(a=>{throw r.mapError({params:t,error:a})})),a}})})},r}({},effector);
//# sourceMappingURL=effector-extra.iife.js.map
