import{K as m,r as i,x as b,s as _,b as a,c as f,e as v,f as e,g as t,q as c,t as y,i as r,A as g}from"./index-8M_67U6P.js";const T={class:"parent-sabong"},w={class:"header-sabong"},x=e("span",null,[e("i",{class:"pi pi-arrow-left",style:{"font-size":"1rem"}}),r(" GO BACK")],-1),B={class:"sabong-title"},E=e("div",{class:"ghostdiv"},null,-1),N=e("div",{class:"content-sabong"},[e("iframe",{class:"iframeSabong item-sabong",src:"https://www.youtube.com/embed/yUQIXf7WV78?si=CHy6hXld3MDtLoBm",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""}),e("div",{class:"betting-content item-sabong"},[e("div",{style:{"background-color":"#000",padding:"10px","text-align":"end"}},[e("span",null,"Fight Number: #174")]),e("table",{class:"table-custom"},[e("thead",null,[e("tr",null,[e("th",null,"BETTING"),e("th",null,"FIGHT #")])]),e("tbody",null,[e("tr",null,[e("td"),e("td",null,"174")]),e("tr",null,[e("td",{style:{"background-color":"red","font-size":"1.3rem"}},"MERON"),e("td",{style:{"background-color":"blue","font-size":"1.3rem"}},"WALA")]),e("tr",null,[e("td",null,[e("span",{style:{"font-size":"1.2rem"}},"1.85"),e("br"),e("small",{style:{"font-size":"0.9rem"}},"0")]),e("td",null,[e("span",{style:{"font-size":"1.2rem"}},"1.83"),e("br"),e("small",{style:{"font-size":"0.9rem"}},"400")])]),e("tr",null,[e("td",null,[e("div",{class:"betTypeBtn"},"BET MERON")]),e("td",null,[e("div",{class:"betTypeBtn"},"BET WALA")])])])]),e("div",{class:"current-balance",style:{"text-align":"end"}},[e("span",null,[r("CURRENT POINTS: "),e("span",{style:{color:"yellow","font-weight":"500"}},"619.00")])]),e("div",{class:"wrapper-input-bet"},[e("input",{type:"number",class:"input-bet",placeholder:"ENTER AMOUNT"}),e("div",{class:"clearBtn"},[e("span",null,"CLEAR")])]),e("div",{class:"chips-amount"},[e("div",{class:"chip-item chip1"},[e("span",null,"100")]),e("div",{class:"chip-item chip2"},[e("span",null,"200")]),e("div",{class:"chip-item chip3"},[e("span",null,"500")]),e("div",{class:"chip-item chip4"},[e("span",null,"1000")]),e("div",{class:"chip-item chip5"},[e("span",null,"2000")]),e("div",{class:"chip-item chip6"},[e("span",null,"5000")])])])],-1),A={class:"content2-sabong"},R=e("div",{class:"content-right-sabong"},[e("table",null,[e("tbody",null,[e("td",null,"s")])])],-1),C={class:"content-left-sabong"},S=g('<div class="par-bet-draw"><div class="betdraw"><span style="display:flex;align-items:center;gap:5px;justify-content:center;"><i class="pi pi-plus-circle" style="font-size:1rem;"></i> BET DRAW</span></div><div class="betnum"><span>0</span></div></div><span class="drawtext">DRAW WINS x 8. Max. DRAW bet per player: 5000/fight</span>',2),z={class:"draw-content"},D=e("div",{class:"headdraw"},[e("span",null,"CURRENT BETS")],-1),k={__name:"Sabong",setup(I){const n=m(),l=i(n.params.type||"");b(()=>n.params.type,o=>{l.value=o,console.log(l.value)});const d=i([{fight:"174",amount:100,betType:"Wala",odds:1.88,payout:188.26}]),p=_(()=>l.value.charAt(0).toUpperCase()+l.value.slice(1));return(o,O)=>{const u=a("router-link"),s=a("Column"),h=a("DataTable");return f(),v("div",T,[e("div",w,[t(u,{to:"/",style:{display:"flex",gap:"5px","align-items":"center",cursor:"pointer","text-decoration":"none",color:"#fff"}},{default:c(()=>[x]),_:1}),e("span",B,"Sabong - "+y(p.value)+" Knife",1),E]),N,e("div",A,[R,e("div",C,[S,e("div",z,[D,t(h,{value:d.value,tableStyle:"min-width: 50rem"},{default:c(()=>[t(s,{field:"fight",header:"FIGHT #"}),t(s,{field:"amount",header:"AMOUNT"}),t(s,{field:"betType",header:"BET TYPE"}),t(s,{field:"odds",header:"ODDS"}),t(s,{field:"payout",header:"PAYOUT"})]),_:1},8,["value"])])])])])}}};export{k as default};
