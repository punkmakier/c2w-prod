import{L as f,_ as v,W as w,l as S,r as u,x,a as B,w as g,b as p,c as m,e as h,f as t,j as k,g as b,q as C,C as y}from"./index-8M_67U6P.js";const E=f("balance",()=>({balance:{current_balance:0}})),P={components:{SessionExpired:w},setup(){const e=S(),o=u(!1),r=u(0),a=u(!1),{balance:n}=E();x(()=>e.user,s=>{o.value=!!s});const d=async()=>{if(e.user){const s=e.user[0].username,l=e.user[0].token,i=await y.postBalance({username:s,token:l});console.log(i),i.resStatus==0?(o.value=!!e.user,n.current_balance=i.balance):(a.value=!0,localStorage.removeItem("auth.user"),e.resetUser())}else localStorage.removeItem("auth.user"),e.resetUser()},c=s=>parseFloat(s).toLocaleString("en-US",{style:"currency",currency:"PHP"}).replace("₱","₱ ");return B(()=>{d()}),g(()=>{o.value&&(r.value=n.current_balance)}),{reloadPage:()=>{window.location.reload()},formatCurrency:c,showWalletBalance:o,currentBalance:r,showSessionExpired:a,balance:n}}},W={class:"wallet-header"},L={key:0,class:"balance-header w-100"},M={class:"balance-amount-header w-100"},T=["innerHTML"],U=t("div",{class:"wallet-inner"},[t("i",{class:"pi pi-wallet"})],-1);function A(e,o,r,a,n,d){const c=p("SessionExpired"),_=p("Dialog");return m(),h("div",W,[a.showWalletBalance?(m(),h("div",L,[t("div",M,[t("span",{innerHTML:a.formatCurrency(a.currentBalance)},null,8,T)]),U])):k("",!0),b(_,{visible:a.showSessionExpired,"onUpdate:visible":o[0]||(o[0]=s=>a.showSessionExpired=s),modal:"",pt:{root:"border-none",mask:{style:"backdrop-filter: blur(2px)"}}},{container:C(({closeCallback:s})=>[b(c,{onCloseCallback:l=>{s(),a.reloadPage()}},null,8,["onCloseCallback"])]),_:1},8,["visible","pt"])])}const I=v(P,[["render",A]]);export{I as T,E as u};