import{attach as r,createEffect as a}from"effector";function e(e){return r({mapParams:r=>e.mapParams(r),effect:a({handler:r=>{let a=e.effect(r);return e.mapResult&&(a=a.then(a=>e.mapResult({params:r,result:a}))),e.mapError&&(a=a.catch(a=>{throw e.mapError({params:r,error:a})})),a}})})}export{e as attachWrapper};
//# sourceMappingURL=index.js.map
