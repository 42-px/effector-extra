import{createEffect as e,createEvent as t,createStore as n,sample as r,withFactory as a}from"effector";function o(t){const n=t.domain?t.domain.effect({name:"effect",sid:"-xn2rd6"}):e({name:"effect",sid:"-x614yz"});return n.use((e=>{let n=t.effect(t.mapParams(e),{name:"promise",sid:"-9qez7q"});return t.mapResult&&(n=n.then((n=>t.mapResult({params:e,result:n})))),t.mapError&&(n=n.catch((n=>{throw t.mapError({params:e,error:n})}))),n})),n}function s(e,a){const o=t({name:"event",sid:"-qsq21n"}),s=t({name:"pushStore",sid:"-99i15u"}),m=t({name:"resetStore",sid:"-ka34j3"}),i=t({name:"timeoutEnd",sid:"-8qf3eg"}),c=n([],{name:"$storedEvents",sid:"tj0mgu"});let d;return c.on(s,((e,t)=>[...e,t])).reset(m),e.watch((e=>{void 0!==d?(clearTimeout(d),s(e)):o([e]),d=setTimeout((()=>{d=void 0,i()}),a)})),r({and:[{source:r({and:[{source:c,clock:i,fn:e=>e}],or:{name:"source",sid:"4pit6z"}}),filter:c.map((e=>Boolean(e.length)))}],or:{sid:"c06kr4"}}).watch((e=>{o(e),m()})),o}const m=()=>new Map,i=()=>new Map;function c({domain:e,effect:t}){return{createMethod:function(n){return a({sid:"7v5c9k",fn:()=>o({domain:e,effect:t,...n}),name:"none",method:"attachWrapper"})}}}export{o as attachWrapper,s as batchEvents,c as createService,m as mockEffects,i as mockStores};
//# sourceMappingURL=index.js.map
