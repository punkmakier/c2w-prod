import{_ as m,r as c,c as n,e as o,f as r,z as g,H as u,I as f,F as p,k as v,t as _}from"./index--5YM5pu3.js";import{a as d,s as k}from"./socket-IBu1nsYM.js";const M={setup(){const e=c(""),s=d.connected,i=d.messages;return{message:e,connected:s,messages:i,sendMessage:()=>{e.value.trim()!==""&&(k.emit("chat-message",e.value),console.log("Sending message:"+e.value),e.value="")}}}},y=r("button",{type:"submit"},"Send",-1);function S(e,s,i,t,x,b){return n(),o("div",null,[r("form",{onSubmit:s[1]||(s[1]=f((...a)=>t.sendMessage&&t.sendMessage(...a),["prevent"]))},[g(r("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>t.message=a),placeholder:"Type your message here"},null,512),[[u,t.message]]),y],32),(n(!0),o(p,null,v(t.messages,(a,l)=>(n(),o("div",{key:l},_(a),1))),128))])}const T=m(M,[["render",S]]);export{T as default};
