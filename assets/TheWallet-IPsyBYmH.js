import{_ as h,r as i,v as x,b as s,c as C,e as P,f as e,g as a,i as m,q as _}from"./index-3oGC93hb.js";const I={setup(){const t=i(),l=i([{name:"New York",code:"NY"},{name:"Rome",code:"RM"},{name:"London",code:"LDN"},{name:"Istanbul",code:"IST"},{name:"Paris",code:"PRS"}]),c=i(0),n=i(0),g=i(0),f=i(4124),v=i(!1),r=()=>{n.value=f.value*c.value/100},p=x(()=>{c.value=n.value/f.value*100});return{selectedCity:t,cities:l,amountValue:n,amountSlider:c,handleSliderChange:r,handleChangeInput:p,depositAmount:g,percentButton:d=>{n.value=f.value*d/100,c.value=d},addPaymentInfo:v}}},S={class:"saved-payment-info"},B=e("span",{class:"savedPaymentC"},"Saved Payment Info",-1),N={class:"chips-holder mt-1"},A=e("i",{class:"pi pi-plus-circle",style:{"font-size":"1rem"}},null,-1),U={class:"tabparent"},k={class:"depositView"},T={class:"flex flex-column gap-2"},D=e("label",{for:"username",class:"fw-500"},"Payment Method",-1),M={class:"flex flex-column gap-2"},L=e("label",{for:"username",class:"fw-500"},"Account Name",-1),G={class:"flex flex-column gap-2"},R=e("label",{for:"username",class:"fw-500"},"Account Number",-1),z={class:"flex flex-column gap-2 mt-1"},W=e("label",{for:"username",class:"fw-500"},"Amount",-1),Y={style:{display:"flex",gap:"15px","margin-top":"30px"}},q={class:"depositView"},E={class:"flex flex-column gap-2"},F=e("label",{for:"username",class:"fw-500"},"Payment Method",-1),H={class:"flex flex-column gap-2"},j=e("label",{for:"username",class:"fw-500"},"Account Name",-1),J={class:"flex flex-column gap-2"},K=e("label",{for:"username",class:"fw-500"},"Account Number",-1),O={class:"flex flex-column gap-2 mt-1"},Q=e("label",{for:"username",class:"fw-500"},"Amount",-1),X={class:"amountSlider"},Z={class:"percentIconHolder"},$=e("i",{class:"pi pi-percentage"},null,-1),ee=e("i",{class:"pi pi-percentage"},null,-1),le=e("i",{class:"pi pi-percentage"},null,-1),oe=e("i",{class:"pi pi-percentage"},null,-1),ne=e("i",{class:"pi pi-percentage"},null,-1),ae={style:{display:"flex",gap:"15px","margin-top":"30px"}},te=e("div",{class:"availbalance"},[e("p",null,[m("Balance: "),e("span",null,"₱ 4124")])],-1),se={class:"addPaymentInfoDialog"},de={class:"flex flex-column gap-2"},ie=e("label",{for:"username",class:"fw-500"},"Payment Method",-1),me={class:"flex flex-column gap-2 mt-1"},ue=e("label",{for:"username",class:"fw-500"},"Account Name",-1),ce={class:"flex flex-column gap-2 mt-1"},re=e("label",{for:"username",class:"fw-500"},"Account Number",-1);function pe(t,l,c,n,g,f){const v=s("Chip"),r=s("Dropdown"),p=s("InputText"),u=s("InputNumber"),d=s("Button"),b=s("TabPanel"),w=s("Slider"),V=s("TabView"),y=s("Dialog");return C(),P("div",null,[e("div",S,[B,e("div",N,[a(v,{label:"09471559441",style:{padding:"5px 20px"},image:"/src/assets/payment_gateway_logo/gcash.png",removable:""}),a(v,{label:"2456154541",style:{padding:"5px 20px"},image:"/src/assets/payment_gateway_logo/bpi.png",removable:""}),e("div",{class:"addPaymentInfo",onClick:l[0]||(l[0]=o=>n.addPaymentInfo=!0)},[m(" Add "),A])])]),e("div",U,[a(V,{class:"mt-4"},{default:_(()=>[a(b,{header:"Deposit"},{default:_(()=>[e("div",k,[e("div",T,[D,a(r,{modelValue:n.selectedCity,"onUpdate:modelValue":l[1]||(l[1]=o=>n.selectedCity=o),options:n.cities,optionLabel:"name",placeholder:"Select Payment Method",class:"w-full md:w-14rem w-100"},null,8,["modelValue","options"])]),e("div",M,[L,a(p,{id:"username",modelValue:t.value,"onUpdate:modelValue":l[2]||(l[2]=o=>t.value=o),"aria-describedby":"username-help",style:{"margin-top":"5px"}},null,8,["modelValue"])]),e("div",G,[R,a(u,{modelValue:t.value2,"onUpdate:modelValue":l[3]||(l[3]=o=>t.value2=o),inputId:"withoutgrouping",useGrouping:!1,class:"w-100"},null,8,["modelValue"])])]),e("div",z,[W,a(u,{modelValue:n.depositAmount,"onUpdate:modelValue":l[4]||(l[4]=o=>n.depositAmount=o),inputId:"minmaxfraction",min:0,class:"w-100"},null,8,["modelValue"])]),e("div",Y,[a(d,{label:"Proceed",class:"w-100"}),a(d,{class:"w-100",label:"Clear",outlined:""})])]),_:1}),a(b,{header:"Withdraw"},{default:_(()=>[e("div",q,[e("div",E,[F,a(r,{modelValue:n.selectedCity,"onUpdate:modelValue":l[5]||(l[5]=o=>n.selectedCity=o),options:n.cities,optionLabel:"name",placeholder:"Select Payment Method",class:"w-full md:w-14rem w-100"},null,8,["modelValue","options"])]),e("div",H,[j,a(p,{id:"username",modelValue:t.value,"onUpdate:modelValue":l[6]||(l[6]=o=>t.value=o),"aria-describedby":"username-help",style:{"margin-top":"5px"}},null,8,["modelValue"])]),e("div",J,[K,a(u,{modelValue:t.value2,"onUpdate:modelValue":l[7]||(l[7]=o=>t.value2=o),inputId:"withoutgrouping",useGrouping:!1,class:"w-100"},null,8,["modelValue"])])]),e("div",O,[Q,a(u,{modelValue:n.amountValue,"onUpdate:modelValue":l[8]||(l[8]=o=>n.amountValue=o),inputId:"minmaxfraction",maxFractionDigits:2,max:4124,min:0,onInput:n.handleChangeInput,class:"w-100"},null,8,["modelValue","onInput"])]),e("div",X,[a(w,{modelValue:n.amountSlider,"onUpdate:modelValue":l[9]||(l[9]=o=>n.amountSlider=o),style:{"z-index":"3"},onChange:n.handleSliderChange},null,8,["modelValue","onChange"]),e("div",Z,[e("p",{class:"amountPercentageSlider",onClick:l[10]||(l[10]=o=>n.percentButton(0))},[m(" 0 "),$]),e("p",{class:"amountPercentageSlider",onClick:l[11]||(l[11]=o=>n.percentButton(25))},[m(" 25 "),ee]),e("p",{class:"amountPercentageSlider",onClick:l[12]||(l[12]=o=>n.percentButton(50))},[m(" 50 "),le]),e("p",{class:"amountPercentageSlider",onClick:l[13]||(l[13]=o=>n.percentButton(75))},[m(" 75 "),oe]),e("p",{class:"amountPercentageSlider",onClick:l[14]||(l[14]=o=>n.percentButton(100))},[m(" 100 "),ne])])]),e("div",ae,[a(d,{label:"Proceed",class:"w-100"}),a(d,{class:"w-100",label:"Clear",outlined:""})])]),_:1})]),_:1}),te]),a(y,{visible:n.addPaymentInfo,"onUpdate:visible":l[18]||(l[18]=o=>n.addPaymentInfo=o),modal:"",header:"Add Payment Information",style:{width:"40rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:_(()=>[e("div",se,[e("div",de,[ie,a(r,{modelValue:n.selectedCity,"onUpdate:modelValue":l[15]||(l[15]=o=>n.selectedCity=o),options:n.cities,optionLabel:"name",placeholder:"Select Payment Method",class:"w-full md:w-14rem w-100"},null,8,["modelValue","options"])]),e("div",me,[ue,a(p,{id:"username",modelValue:t.value,"onUpdate:modelValue":l[16]||(l[16]=o=>t.value=o),"aria-describedby":"username-help",style:{"margin-top":"5px"}},null,8,["modelValue"])]),e("div",ce,[re,a(u,{modelValue:t.value2,"onUpdate:modelValue":l[17]||(l[17]=o=>t.value2=o),inputId:"withoutgrouping",useGrouping:!1,class:"w-100"},null,8,["modelValue"])]),a(d,{label:"Submit",class:"w-100 mt-2"})])]),_:1},8,["visible"])])}const ve=h(I,[["render",pe]]);export{ve as T};
