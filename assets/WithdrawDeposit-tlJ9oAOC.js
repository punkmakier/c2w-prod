import{_ as _e,E as we,r as l,l as fe,m as be,v as Z,a as ke,C as $,x as R,b as C,c as i,e as u,p as E,q as F,t as s,i as d,j as h,f as a,g as p,F as ee,k as ae,n as B}from"./index-aWL4c2cy.js";import{u as xe}from"./TheWalletMoney-XoJpRCL9.js";const Pe={setup(r,{emit:t}){const{severity:v,type:e}=we(r),I=l(),S=l(),D=l([{name:"Toppay",code:"toppay"},{name:"Pagarstar",code:"pagarstar"}]),_=fe(),f=l(0),c=l(0),k=l(0),y=l(0),U=l(!1),o=l(0),M=l("GCash"),b=l("GCash"),V=l(""),w=l(""),G=l("A+Pay"),x=l(""),q=l(""),j=l(),H=l(),J=l(),A=l(),L=l(),K=l(0),{balance:T}=xe(),O=be(),W=l(),N=l(""),Q=l(""),X=l(),oe=Z(()=>{const n=w.value.replace(/\D/g,"");w.value=n.length>0?n:""}),te=()=>{c.value=y.value*f.value/100},ne=Z(()=>{f.value=c.value/y.value*100}),le=n=>{c.value=y.value*n/100,f.value=n},se=()=>{f.value=0,c.value=0,V.value="",w.value="",k.value=0},ie=n=>parseFloat(n).toLocaleString("en-US",{style:"currency",currency:"PHP"}).replace("₱","₱ "),re=n=>{if(A.value=null,L.value){const g=[{name:"bdo",logo:"bdo.png"},{name:"bpi",logo:"bpi.png"},{name:"chinabank",logo:"chinabank.png"},{name:"easetwest",logo:"ew.png"},{name:"gcash",logo:"gcash.png"},{name:"komo",logo:"komo.png"},{name:"landbank",logo:"lb.png"},{name:"metrobank",logo:"mb.png"},{name:"PayMaya",logo:"paymaya.png"},{name:"pnb",logo:"pnb.png"},{name:"rcbc",logo:"rcbc.svg"},{name:"security bank",logo:"scb.png"},{name:"tonik",logo:"tonik.png"},{name:"unionbank",logo:"ub.png"},{name:"ucpb",logo:"ucpb.png"},{name:"grabpay",logo:"GrabPay.webp"}],P=L.value.filter(m=>m.providerName===n.value.name);J.value=P.map(m=>{const Y=/\s/.test(m.method)?m.method.split(/\s+/):[m.method],ye=Y[0].toLowerCase()?Y[0].toLowerCase():m.name,ge=g.find(he=>he.name.toLowerCase()===ye);return{name:m.method,paymentID:m.paymentID,minDeposit:m.minDeposit,providerName:m.providerName,logo:ge.logo}})}};e.value==="Withdraw"&&(y.value=T.current_balance,o.value=T.current_balance);const de=n=>{console.log(n.value),K.value=n.value.minDeposit},ce=async()=>{const g=(await $.postBanklist({username:_.user[0].username,token:_.user[0].token,providerName:X.value.code})).map(P=>({providerID:P.providerID,name:P.method,methodID:P.methodID}));S.value=g,console.log(S.value)};ke(async()=>{if(_.user){const n=_.user[0].token,g=await $.postPaymentsInfo({token:n});L.value=g;const P=new Set(g.map(m=>m.providerName));j.value=Array.from(P).map(m=>({name:m,code:m}))}});const me=()=>{if(b.value!="Bank"){let g=w.value.replace(/-/g,"");if(g.slice(0,2)!="09"){x.value="Invalid number. It should start with '09xx'-xxx-xxxx.";return}if(V.value==""){N.value="Account name is required.";return}else x.value="",N.value="",W.value=b.value,Q.value=b.value==="GCash"?"6":"1",w.value=g}else{if(console.log(I.value),!I.value){q.value="Please select a bank";return}if(V.value==""){N.value="Account name is required.";return}if(w.value==""){x.value="Account number is required.";return}else x.value="",N.value="",W.value=I.value.name}x.value="",q.value="";const n={methods:W.value,amount:c.value?parseFloat(c.value.toFixed(2)):0,accountName:V.value.trim(),accountNumber:w.value.trim()};t("submitWithdraw",n)},ue=[100,200,500,1e3,2e3,3e3,4e3,5e3],ve=[200,300,500,1e3,2e3,3e3,4e3,5e3],pe=n=>{n>y.value?c.value=y.value:c.value=n},z=l(["A+Pay","FPAy","Pagarstar"]);return R(M,n=>{n==="PayMaya"?(z.value=["Toppay"],G.value="Toppay"):n==="GCash"&&(z.value=["A+Pay","FPAy","Pagarstar"],G.value="A+Pay")}),R(b,n=>{console.log(n),x.value="",N.value=""}),R(v,n=>{n==="success"&&(o.value=o.value-c.value,y.value=o.value,T.current_balance=o.value,w.value="",V.value="",c.value=0,b.value="GCash")}),{amountWithdrawMinimum:ve,accountBankErrorMessage:q,accountNumErrorMessage:x,severity:v,type:e,selectedPaymentGateway:G,paymentProviders:z,amountDepoList:ue,selectedBank:I,bankOptions:S,amountValue:c,amountSlider:f,handleChangeInput:ne,depositAmount:k,addPaymentInfo:U,depositActivePayment:M,withdrawActivePayment:b,currentBalance:o,availableBalance:y,accountName:V,accountNumber:w,handleInputAmount:oe,optionPaymentProvider:j,available_payments:L,selectedPaymentProvider:H,optionResultPaymentMethod:J,selectedPaymentMethod:A,minimumdeposit:K,paymentMethod:W,accountNameErrorMsg:N,providerID:Q,providerOptionsWithdraw:D,selectedProviderWithdraw:X,depositSubmit:()=>{if(k.value<=0){O.add({severity:"error",summary:"Failed",detail:"Amount deposit should not be 0",life:5e3});return}if(!H.value){O.add({severity:"error",summary:"Failed",detail:"Please fill the required fields",life:5e3});return}if(!A.value){O.add({severity:"error",summary:"Failed",detail:"Please fill the required fields",life:5e3});return}const n={paymentID:A.value.paymentID,methods:A.value.name,providerName:A.value.providerName,amount:k.value};t("submitDeposit",n)},withdrawSubmit:me,withdrawButtonClicked:pe,handleChangeProvider:re,clearFields:se,percentButton:le,handleSliderChange:te,formatCurrency:ie,handleChangePaymentMethod:de,handleProviderChange:ce}},props:{type:{type:String,default:""},responseMessage:{type:String,default:""},severity:{type:String,default:""},isLoading:{type:Boolean,default:!1}}},Ce={class:"mainDepWith"},Be={key:0},Me={class:"depo",style:{display:"block"}},Ve={class:"deposit_info"},Ae={style:{width:"50%"}},Ne={style:{"font-weight":"600"}},Ie=a("small",{style:{color:"var(--red-300)"}},"*",-1),Se={style:{width:"50%"}},De={style:{"font-weight":"600"}},Le=a("small",{style:{color:"var(--red-300)"}},"*",-1),We={key:0,class:"flex align-items-center",style:{display:"flex",gap:"10px"}},Ee=["alt","src"],Fe={key:1},Ue={class:"flex align-items-center",style:{display:"flex",gap:"10px"}},Ge=["alt","src"],qe={class:"paymentInput"},Te={class:"flex flex-column gap-2"},Oe={for:"username",class:"fw-500"},ze=a("small",{style:{color:"var(--red-300)"}},"*",-1),Re={style:{color:"var(--red-600)","margin-left":"10px"},class:"mindep"},je={style:{"margin-top":"15px","margin-bottom":"20px",display:"flex",gap:"10px","flex-wrap":"wrap"}},He=["onClick"],Je={key:1},Ke={class:"w-method"},Qe={class:"w-parent w-100"},Xe={for:"username",class:"fw-500 me-5"},Ye={class:"withdrawMethods"},Ze=a("span",null,"GCash",-1),$e=a("div",{class:"gcash"},null,-1),ea=[Ze,$e],aa=a("span",null,"PayMaya",-1),oa=a("div",{class:"paymaya"},null,-1),ta=[aa,oa],na=a("span",null,"Bank",-1),la=a("div",{class:"bank"},null,-1),sa=[na,la],ia=a("div",{class:"customDivider1"},null,-1),ra={class:"depositView"},da=a("label",{for:"username",class:"fw-500"},[d("Provider "),a("small",{style:{color:"var(--red-300)"}},"*")],-1),ca={key:0,style:{color:"var(--red-500)","font-weight":"500"}},ma=a("label",{for:"username",class:"fw-500"},[d("Bank "),a("small",{style:{color:"var(--red-300)"}},"*")],-1),ua={key:0,style:{color:"var(--red-500)","font-weight":"500"}},va={for:"username",class:"fw-500"},pa=a("small",{style:{color:"var(--red-300)"}},"*",-1),ya={key:0,style:{color:"var(--red-500)","font-weight":"500"}},ga={for:"username",class:"fw-500"},ha=a("small",{style:{color:"var(--red-300)"}},"*",-1),_a={key:2,style:{color:"var(--red-500)","font-weight":"500"}},wa={class:"flex flex-column gap-2 mt-1"},fa={class:"",style:{display:"flex","justify-content":"space-between","align-items":"baseline"}},ba={class:"amountDep"},ka=a("small",{style:{color:"var(--red-300)"}},"*",-1),xa={style:{color:"var(--red-600)","font-size":"0.8rem","margin-left":"10px"},class:"mindep"},Pa={style:{color:"#ff1354","text-shadow":"0 0 3px rgba(61, 33, 33, 0.258)","font-weight":"700"}},Ca={style:{"margin-top":"15px","margin-bottom":"20px",display:"flex",gap:"10px","flex-wrap":"wrap"}},Ba=["onClick"],Ma={class:"amountSlider"},Va={class:"percentIconHolder"},Aa=a("i",{class:"pi pi-percentage"},null,-1),Na=a("i",{class:"pi pi-percentage"},null,-1),Ia=a("i",{class:"pi pi-percentage"},null,-1),Sa=a("i",{class:"pi pi-percentage"},null,-1),Da=a("i",{class:"pi pi-percentage"},null,-1),La={style:{display:"flex",gap:"15px","margin-top":"30px"}};function Wa(r,t,v,e,I,S){const D=C("Message"),_=C("Dropdown"),f=C("InputNumber"),c=C("Button"),k=C("InputText"),y=C("InputMask"),U=C("Slider");return i(),u("div",Ce,[v.type=="Deposit"?(i(),u("div",Be,[v.responseMessage?(i(),E(D,{key:0,severity:v.severity,closable:!1},{default:F(()=>[d(s(v.responseMessage),1)]),_:1},8,["severity"])):h("",!0),a("div",Me,[a("div",Ve,[a("div",Ae,[a("span",Ne,[d(s(r.$t("paymentProvider"))+" ",1),Ie]),p(_,{modelValue:e.selectedPaymentProvider,"onUpdate:modelValue":t[0]||(t[0]=o=>e.selectedPaymentProvider=o),options:e.optionPaymentProvider,optionLabel:"name",placeholder:r.$t("selectPaymentProvider"),class:"w-100",style:{"margin-top":"5px"},onChange:e.handleChangeProvider},null,8,["modelValue","options","placeholder","onChange"])]),a("div",Se,[a("span",De,[d(s(r.$t("paymentMethod"))+" ",1),Le]),p(_,{onChange:e.handleChangePaymentMethod,modelValue:e.selectedPaymentMethod,"onUpdate:modelValue":t[1]||(t[1]=o=>e.selectedPaymentMethod=o),options:e.optionResultPaymentMethod,optionLabel:"name",placeholder:r.$t("selectPaymentMethod"),class:"w-100",style:{"margin-top":"5px"}},{value:F(o=>[o.value?(i(),u("div",We,[a("img",{alt:o.value.label,src:`/src/assets/payment_gateway_logo/${o.value.logo}`,class:"mr-2",style:{width:"30px","border-radius":"4px"}},null,8,Ee),a("div",null,s(o.value.name),1)])):(i(),u("span",Fe,s(o.placeholder),1))]),option:F(o=>[a("div",Ue,[a("img",{alt:o.option.label,src:`/src/assets/payment_gateway_logo/${o.option.logo}`,class:"mr-2",style:{width:"30px","border-radius":"4px"}},null,8,Ge),a("div",null,s(o.option.name),1)])]),_:1},8,["onChange","modelValue","options","placeholder"])])]),a("div",qe,[a("div",Te,[a("label",Oe,[d(s(r.$t("amount"))+" ",1),ze,a("small",Re,"("+s(r.$t("minimum"))+": 200)",1)]),p(f,{modelValue:e.depositAmount,"onUpdate:modelValue":t[2]||(t[2]=o=>e.depositAmount=o),inputId:"minmaxfraction",min:200,class:"w-100"},null,8,["modelValue"])]),a("div",je,[(i(!0),u(ee,null,ae(e.amountDepoList,(o,M)=>(i(),u("span",{key:M,style:{"background-color":"rgb(238, 238, 238)","text-align":"center",padding:"7px 15px","border-radius":"3px",cursor:"pointer","font-weight":"600","box-shadow":"0 0 5px rgba(114, 114, 114, 0.5)"},onClick:b=>e.depositAmount=o},"₱ "+s(o),9,He))),128))]),p(c,{label:r.$t("proceed"),class:"w-100 mt-1",onClick:e.depositSubmit,loading:v.isLoading},null,8,["label","onClick","loading"])])])])):h("",!0),v.type=="Withdraw"?(i(),u("div",Je,[v.responseMessage?(i(),E(D,{key:0,severity:v.severity,closable:!1},{default:F(()=>[d(s(v.responseMessage),1)]),_:1},8,["severity"])):h("",!0),a("div",Ke,[a("div",Qe,[a("label",Xe,s(r.$t("paymentMethod")),1),a("div",Ye,[a("div",{class:B(`g ${e.withdrawActivePayment=="GCash"?"active-payment":""}`),onClick:t[3]||(t[3]=o=>{e.withdrawActivePayment="GCash",e.selectedBank=""})},ea,2),a("div",{class:B(`g ${e.withdrawActivePayment=="PayMaya"?"active-payment":""}`),onClick:t[4]||(t[4]=o=>{e.withdrawActivePayment="PayMaya",e.selectedBank=""})},ta,2),a("div",{class:B(`g ${e.withdrawActivePayment=="Bank"?"active-payment":""}`),onClick:t[5]||(t[5]=o=>e.withdrawActivePayment="Bank")},sa,2)])])]),ia,a("div",ra,[e.withdrawActivePayment==="Bank"?(i(),u("div",{key:0,class:B(["flex flex-column gap-2 provMob",{depbank:e.withdrawActivePayment==="Bank"}]),style:{width:"25%"}},[da,p(_,{modelValue:e.selectedProviderWithdraw,"onUpdate:modelValue":t[6]||(t[6]=o=>e.selectedProviderWithdraw=o),options:e.providerOptionsWithdraw,optionLabel:"name",placeholder:"Select Provider",onChange:e.handleProviderChange,class:"w-100"},null,8,["modelValue","options","onChange"]),e.accountBankErrorMessage?(i(),u("small",ca,s(e.accountBankErrorMessage),1)):h("",!0)],2)):h("",!0),e.withdrawActivePayment==="Bank"?(i(),u("div",{key:1,class:B(["flex flex-column gap-2 provMob",{depbank:e.withdrawActivePayment==="Bank"}]),style:{width:"25%"}},[ma,p(_,{modelValue:e.selectedBank,"onUpdate:modelValue":t[7]||(t[7]=o=>e.selectedBank=o),options:e.bankOptions,optionLabel:"name",placeholder:"Select Payment Method",class:"w-100 withdrawD",filter:""},null,8,["modelValue","options"]),e.accountBankErrorMessage?(i(),u("small",ua,s(e.accountBankErrorMessage),1)):h("",!0)],2)):h("",!0),a("div",{class:B(["flex flex-column gap-2",{depbank:e.withdrawActivePayment==="Bank"}])},[a("label",va,[d(s(r.$t("accountName"))+" ",1),pa]),p(k,{id:"username",modelValue:e.accountName,"onUpdate:modelValue":t[8]||(t[8]=o=>e.accountName=o),placeholder:"Ex: John Doe",maxlength:50,"aria-describedby":"username-help",style:{"margin-top":"5px"},autocomplete:"off"},null,8,["modelValue"]),e.accountNameErrorMsg?(i(),u("small",ya,s(e.accountNameErrorMsg),1)):h("",!0)],2),a("div",{class:B(["flex flex-column gap-2",{depbank:e.withdrawActivePayment==="Bank"}])},[a("label",ga,[d(s(r.$t("accountNum"))+" ",1),ha]),e.withdrawActivePayment!="Bank"?(i(),E(y,{key:0,id:"ssn",modelValue:e.accountNumber,"onUpdate:modelValue":t[9]||(t[9]=o=>e.accountNumber=o),mask:"9999-999-9999",placeholder:"09xx-xxx-xxxx",style:{"margin-top":"5px"}},null,8,["modelValue"])):(i(),E(k,{key:1,type:"text",class:"w-100",modelValue:e.accountNumber,"onUpdate:modelValue":t[10]||(t[10]=o=>e.accountNumber=o),onBlur:e.handleInputAmount,maxlength:20,style:{"margin-top":"5px"}},null,8,["modelValue","onBlur"])),e.accountNumErrorMessage?(i(),u("small",_a,s(e.accountNumErrorMessage),1)):h("",!0)],2)]),a("div",wa,[a("div",fa,[a("div",ba,[a("label",null,[d(s(r.$t("amount"))+" ",1),ka]),a("small",xa,"("+s(r.$t("minimum"))+": 200)",1)]),a("span",null,[d(s(r.$t("currentBalance"))+": ",1),a("span",Pa,s(e.formatCurrency(e.currentBalance)),1)])]),p(f,{modelValue:e.amountValue,"onUpdate:modelValue":t[11]||(t[11]=o=>e.amountValue=o),inputId:"minmaxfraction",maxFractionDigits:2,max:e.availableBalance,min:200,onInput:e.handleChangeInput,class:"w-100"},null,8,["modelValue","max","onInput"])]),a("div",Ca,[(i(!0),u(ee,null,ae(e.amountWithdrawMinimum,(o,M)=>(i(),u("span",{key:M,style:{"background-color":"rgb(238, 238, 238)","text-align":"center",padding:"7px 15px","border-radius":"3px",cursor:"pointer","font-weight":"600","box-shadow":"0 0 5px rgba(114, 114, 114, 0.5)"},onClick:b=>e.withdrawButtonClicked(o)},"₱ "+s(o),9,Ba))),128))]),a("div",Ma,[p(U,{modelValue:e.amountSlider,"onUpdate:modelValue":t[12]||(t[12]=o=>e.amountSlider=o),style:{"z-index":"3"},onChange:e.handleSliderChange},null,8,["modelValue","onChange"]),a("div",Va,[a("p",{class:"amountPercentageSlider",onClick:t[13]||(t[13]=o=>e.percentButton(0))},[d(" 0 "),Aa]),a("p",{class:"amountPercentageSlider",onClick:t[14]||(t[14]=o=>e.percentButton(25))},[d(" 25 "),Na]),a("p",{class:"amountPercentageSlider",onClick:t[15]||(t[15]=o=>e.percentButton(50))},[d(" 50 "),Ia]),a("p",{class:"amountPercentageSlider",onClick:t[16]||(t[16]=o=>e.percentButton(75))},[d(" 75 "),Sa]),a("p",{class:"amountPercentageSlider",onClick:t[17]||(t[17]=o=>e.percentButton(100))},[d(" 100 "),Da])])]),a("div",La,[p(c,{label:r.$t("proceed"),class:"w-100",onClick:e.withdrawSubmit,loading:v.isLoading},null,8,["label","onClick","loading"]),p(c,{class:"w-100",label:r.$t("clear"),outlined:"",onClick:e.clearFields},null,8,["label","onClick"])])])):h("",!0)])}const qa=_e(Pe,[["render",Wa]]);export{qa as W};
