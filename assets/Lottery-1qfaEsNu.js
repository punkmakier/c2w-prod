import{_ as I,l as U,r as _,a as P,b as v,c,e as d,f as e,t as f,g as i,q as A,i as q,F as x,k as M,p as ie,n as E,j as V,x as S,A as O,K as ae}from"./index-8M_67U6P.js";import{T as z}from"./TheWalletMoney-S_zp26Pk.js";import{W as ce}from"./WithdrawDeposit-7TPbkev-.js";import{_ as Z,b as H,a as W}from"./3d-kVpVI5Pw.js";const de={components:{TheWalletMoney:z,WithdrawDeposit:ce},data(){return{deposit:!1,withdraw:!1,isDeposit:!1,type:"",store:U()}},methods:{handleAction(l){this.store.user&&(l==="deposit"?(this.deposit=!0,this.isDeposit=!0,this.withdraw=!1):l==="withdraw"&&(this.isDeposit=!1,this.deposit=!1,this.withdraw=!0))},async submitLogin(l){await this.store.login(l)==="Failed"?this.errorMessage="Invalid username or password. Please try again.":this.loginModal=!1}},setup(){const l=U(),s=_(""),a=_(""),t=()=>{localStorage.removeItem("auth.user"),l.resetUser()};P(()=>{const b=l.user[0].username;a.value=l.user[0].username,s.value=b[0].toUpperCase()});function u(b){return b.replace(/\b\w/g,m=>m.toUpperCase())}return a.value=u(l.user[0].username),{menuLinks:_([{icon:"user-edit",name:"2D Lotto",badge:"",info:"ez2"},{icon:"bolt",name:"3D Lotto",badge:"",info:"3dlotto"},{icon:"bolt",name:"STL",badge:"",info:"stl"},{icon:"money-bill",name:"Lucky Pick 3",badge:"",info:"pick3"}]),firstLetter:s,uname:a,logout:t,capitalizeFirstLetter:u}}},re={style:{padding:"15px"}},ue={class:"img-desc mt-2"},me={class:"imageHolder"},ve={class:"name",style:{color:"#fff"}},_e={class:"menus-parent mt-3"},be=e("div",{class:"menu-text"},[e("i",{class:"pi pi-bookmark me-1",style:{"font-size":"0.8rem",color:"var(--surface-400)"}}),e("span",{style:{"font-size":"0.7rem",color:"var(--surface-400)"}},"Menu")],-1),pe=e("i",{class:"pi pi-home",style:{"font-size":"1rem"}},null,-1),ke={key:0,class:"comingsoon"},he={class:"mt-3 w-100"};function ye(l,s,a,t,u,k){const b=v("router-link"),m=v("Button");return c(),d("div",re,[e("div",ue,[e("div",me,[e("span",null,f(t.firstLetter),1)]),e("span",ve,f(t.capitalizeFirstLetter(t.uname)),1)]),e("div",_e,[be,i(b,{class:"menu-link-d",to:"/"},{default:A(()=>[pe,q(" Home ")]),_:1}),(c(!0),d(x,null,M(t.menuLinks,(p,h)=>(c(),ie(b,{class:"menu-link-d",key:h,to:{name:"lottery",params:{type:p.info}}},{default:A(()=>[e("i",{class:E(`pi pi-${p.icon}`),style:{"font-size":"1rem"}},null,2),q(" "+f(p.name)+" ",1),p.badge?(c(),d("small",ke,f(p.badge),1)):V("",!0)]),_:2},1032,["to"]))),128)),e("div",he,[i(m,{label:"Logout",outlined:"",class:"w-100",icon:"pi pi-sign-out",iconPos:"right",onClick:t.logout},null,8,["onClick"])])])])}const F=I(de,[["render",ye]]),fe={components:{TheWalletMoney:z,LottoSidebar:F},props:{picked2numbers:{type:Array,required:!1,default:()=>[]},moneyList:{type:Array,required:!1,default:()=>[]},valueAmount:{type:Number,required:!1,default:0},name:{type:String,required:!1,default:""},betType:{type:String,required:!1,default:"straight"}},setup(l,{emit:s}){const a=_(!1),t=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],u=_(l.picked2numbers),k=_(l.valueAmount),b=_(l.name),m=_(l.betType);S(()=>l.valueAmount,C=>{k.value=C}),S(()=>l.picked2numbers,C=>{u.value=C},{immediate:!0});const p=C=>parseInt(C)===(u.value&&u.value[0])||parseInt(C)===(u.value&&u.value[1]),h=C=>C===(l.picked2numbers&&l.picked2numbers[0])||C===(l.picked2numbers&&l.picked2numbers[1]);P(()=>{s("updateAmount",k.value)});const y=()=>{s("updateAmount",k.value)},g=_(!1),w=()=>{g.value=!0},B=_(["12","7"]),T=_(!1);return{dataValue:k,updateAmountBet:y,lottoNumbers:t,isBallSelected:p,localPicked2Numbers:u,isBallSelected2:h,viewMytickets:w,viewBoughtTickets:g,latestResult:B,viewAllResultModal:T,viewAllResultFunc:()=>{T.value=!0},playerName:b,submitTicket:()=>{const C=[{pickedNumbers:u.value,bet:k.value,name:b.value}];s("submitTicket",C)},betTypeValue:m,sidebarCanvas:a}}},ge={class:"header-lottery",style:{"margin-bottom":"90px"}},we=O('<div class="lotoTypeLogo"><img src="'+Z+'" style="width:80px;" alt=""></div><div class="nextDrawClass"><div class="ndtime"><span>Next Draw</span><span class="countdownLottoTime">03:03:24</span></div></div>',2),Be={class:"money-wallet"},Te={class:"header-mobile-lottery",style:{display:"none","justify-content":"space-between","align-items":"center",padding:"10px 20px","margin-bottom":"50px"}},Ne=e("div",{class:"lotoTypeLogo"},[e("img",{src:Z,style:{width:"50px"},alt:""})],-1),Ce={class:"money-wallet"},Ae=e("i",{class:"pi pi-align-right",style:{"font-size":"2rem",cursor:"pointer"}},null,-1),xe=[Ae],Me=e("div",{class:"mobile-draw-class",style:{"text-align":"center",display:"none"}},[e("div",{style:{display:"flex","flex-direction":"column",gap:"10px"}},[e("span",{class:"nextDrawMobile"},"Next Draw"),e("span",{class:"countdownLottoTimeMobile"},"03:03:24")])],-1),Le={class:"lottery-body-info"},Re={class:"create-lot"},$e={class:"creating-lottery"},Se=e("div",{class:"creating-lottery-viewmy-tickets"},null,-1),De={class:"youpick"},Ve={class:"first-youpick"},Ie=e("span",null,"Pick 2 Numbers ",-1),ze={class:"pick-balls-handler"},Pe={key:0,class:"noballs"},Ee={key:1,class:"balls-pick remove-cursor"},Fe=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),Ue=[Fe],Oe={key:2,class:"noballs"},qe={key:3,class:"balls-pick remove-cursor"},Ze=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),He=[Ze],We={class:"second-youpick"},Ke=e("div",{class:"divider mt-1 mb-3"},null,-1),je={class:"balls-handler"},Ge=["onClick"],Qe={class:"bettings"},Ye={class:"bet-expect-money"},Xe={class:"bet bem"},Je={class:"inner-bet"},et={class:"inputBet",style:{width:"32%"}},tt=e("span",null,"Your Bet",-1),st={class:"betTypes",style:{width:"27%"}},lt=e("span",null,"Bet Type",-1),nt={class:"",style:{display:"flex",gap:"20px","margin-top":"10px"}},ot={class:"flex align-items-center betType"},it=e("label",{for:"straight",class:"ml-2"},"Straight",-1),at={class:"flex align-items-center betType"},ct=e("label",{for:"Rambol",class:"ml-2"},"Rambol",-1),dt={class:"nameOptional",style:{width:"35%"}},rt=e("span",null,"Enter a name (Optional)",-1),ut={class:"money bem"},mt=["onClick"],vt={class:"bettings-button mt-3"},_t={class:"lottery-prizes"},bt={class:"latest-result"},pt=e("div",{class:"latest-result-header"},[e("span",null,"Latest Result"),e("span",null,"2023-01-10 / 09:00:00")],-1),kt={class:"latestResBalls"},ht={class:"successBalls"},yt={class:"mt-3"},ft=e("span",null,"My Bets",-1),gt=e("p",null,"TABLE FORMAT - FOR BOUGHT TICKETS FOR EZ2",-1),wt=e("p",null,"View All Result Modal Here",-1);function Bt(l,s,a,t,u,k){const b=v("TheWalletMoney"),m=v("Button"),p=v("InputNumber"),h=v("RadioButton"),y=v("InputText"),g=v("Column"),w=v("DataTable"),B=v("Dialog"),T=v("LottoSidebar"),o=v("Sidebar");return c(),d(x,null,[e("div",ge,[we,e("div",Be,[i(b)])]),e("div",Te,[Ne,e("div",Ce,[i(b)]),e("div",{class:"burger",onClick:s[0]||(s[0]=n=>t.sidebarCanvas=!0)},xe)]),Me,e("div",Le,[e("div",Re,[e("div",$e,[Se,e("div",De,[e("div",Ve,[Ie,e("div",ze,[!a.picked2numbers||!a.picked2numbers[0]?(c(),d("div",Pe)):(c(),d("div",Ee,[e("span",{class:"removeBall",onClick:s[1]||(s[1]=n=>l.$emit("removeBall",a.picked2numbers[0]))},Ue),e("span",null,f(a.picked2numbers[0]),1)])),!a.picked2numbers||!a.picked2numbers[1]?(c(),d("div",Oe)):(c(),d("div",qe,[e("span",{class:"removeBall",onClick:s[2]||(s[2]=n=>l.$emit("removeBall",a.picked2numbers[1]))},He),e("span",null,f(a.picked2numbers[1]),1)]))])]),e("div",We,[i(m,{label:"Quick Pick",class:"w-100",onClick:s[3]||(s[3]=n=>l.$emit("ez2generatedNumber"))}),i(m,{label:"Clear",class:"w-100",outlined:"",onClick:s[4]||(s[4]=n=>l.$emit("clearEZ2Ball"))})])]),Ke,e("div",je,[(c(!0),d(x,null,M(t.lottoNumbers,n=>(c(),d("div",{class:E(["lottery-balls remove-cursor",{"active-ball":t.isBallSelected(n)||t.isBallSelected2(n)}]),key:n.id,onClick:C=>l.$emit("selectedBall",n)},[e("span",null,f(n),1)],10,Ge))),128))])]),e("div",Qe,[e("div",Ye,[e("div",Xe,[e("div",Je,[e("div",et,[tt,i(p,{modelValue:t.dataValue,"onUpdate:modelValue":s[5]||(s[5]=n=>t.dataValue=n),inputId:"minmaxfraction",maxFractionDigits:2,max:4124,min:0,class:"w-100",onInput:t.updateAmountBet},null,8,["modelValue","onInput"])]),e("div",st,[lt,e("div",nt,[e("div",ot,[i(h,{modelValue:t.betTypeValue,"onUpdate:modelValue":s[6]||(s[6]=n=>t.betTypeValue=n),inputId:"straight",name:"bettingType",value:"Straight"},null,8,["modelValue"]),it]),e("div",at,[i(h,{modelValue:t.betTypeValue,"onUpdate:modelValue":s[7]||(s[7]=n=>t.betTypeValue=n),inputId:"Rambol",name:"bettingType",value:"Rambol"},null,8,["modelValue"]),ct])])]),e("div",dt,[rt,i(y,{type:"text",modelValue:t.playerName,"onUpdate:modelValue":s[8]||(s[8]=n=>t.playerName=n)},null,8,["modelValue"])])])]),e("div",ut,[(c(!0),d(x,null,M(a.moneyList,n=>(c(),d("div",{class:"money-ball remove-cursor",key:n.id,onClick:C=>l.$emit("moneyPlacement",n)},[e("span",null,"₱ "+f(n),1)],8,mt))),128))])])]),e("div",vt,[i(m,{label:"Submit",class:"w-100",onClick:t.submitTicket},null,8,["onClick"]),i(m,{label:"View Mechanics",class:"w-100",outlined:"",onClick:s[9]||(s[9]=n=>l.$emit("mechanics","ez2mechanics"))})])]),e("div",_t,[e("div",bt,[pt,e("div",kt,[e("div",ht,[(c(!0),d(x,null,M(t.latestResult,n=>(c(),d("div",{class:"sb",key:n.id},[e("span",null,f(n),1)]))),128))]),i(m,{label:"View All Result",onClick:t.viewAllResultFunc},null,8,["onClick"])])]),e("div",yt,[ft,i(w,{value:l.products,tableStyle:"min-width: 40rem",paginator:"",rows:5,rowsPerPageOptions:[5,10,20,50]},{default:A(()=>[i(g,{field:"name",header:"Method"}),i(g,{field:"category",header:"Amount"}),i(g,{field:"quantity",header:"Status"}),i(g,{field:"quantity",header:"Remarks"})]),_:1},8,["value"])])]),i(B,{draggable:!1,visible:t.viewBoughtTickets,"onUpdate:visible":s[10]||(s[10]=n=>t.viewBoughtTickets=n),modal:"",header:"My Tickets",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[gt]),_:1},8,["visible"]),i(B,{draggable:!1,visible:t.viewAllResultModal,"onUpdate:visible":s[11]||(s[11]=n=>t.viewAllResultModal=n),modal:"",header:"View All Results",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[wt]),_:1},8,["visible"]),i(o,{visible:t.sidebarCanvas,"onUpdate:visible":s[12]||(s[12]=n=>t.sidebarCanvas=n),header:" ",class:"w-full md:w-20rem lg:w-30rem",position:"right"},{default:A(()=>[i(T)]),_:1},8,["visible"])])],64)}const Tt=I(fe,[["render",Bt]]),Nt={components:{TheWalletMoney:z,LottoSidebar:F},props:{picked2numbers:{type:Array,required:!1,default:()=>[]},moneyList:{type:Array,required:!1,default:()=>[]},valueAmount:{type:Number,required:!1,default:0},name:{type:String,required:!1,default:""}},setup(l,{emit:s}){const a=["1","2","3","4","5","6","7","8","9"],t=_(!1),u=_(l.picked2numbers),k=_(l.valueAmount),b=_(l.name);S(()=>l.valueAmount,n=>{k.value=n}),S(()=>l.picked2numbers,n=>{u.value=n},{immediate:!0});const m=n=>parseInt(n)===(u.value&&u.value[0])||parseInt(n)===(u.value&&u.value[1])||parseInt(n)===(u.value&&u.value[2]),p=n=>n===(l.picked2numbers&&l.picked2numbers[0])||n===(l.picked2numbers&&l.picked2numbers[1])||n===(l.picked2numbers&&l.picked2numbers[2]);P(()=>{s("updateAmount",k.value)});const h=()=>{s("updateAmount",k.value)},y=_(!1),g=()=>{y.value=!0},w=_(["12","7","23"]),B=_(!1);return{dataValue:k,updateAmountBet:h,lottoNumbers:a,isBallSelected:m,localPicked2Numbers:u,isBallSelected2:p,viewMytickets:g,viewBoughtTickets:y,latestResult:w,viewAllResultModal:B,viewAllResultFunc:()=>{B.value=!0},playerName:b,sidebarCanvas:t,submitTicket:()=>{const n=[{pickedNumbers:u.value,bet:k.value,name:b.value}];s("submitTicket",n)}}}},Ct={class:"header-lottery",style:{"margin-bottom":"90px"}},At=O('<div class="lotoTypeLogo"><img src="'+H+'" style="width:80px;" alt=""></div><div class="nextDrawClass"><div class="ndtime"><span>Next Draw</span><span class="countdownLottoTime">03:03:24</span></div></div>',2),xt={class:"money-wallet"},Mt={class:"header-mobile-lottery",style:{display:"none","justify-content":"space-between","align-items":"center",padding:"10px 20px","margin-bottom":"50px"}},Lt=e("div",{class:"lotoTypeLogo"},[e("img",{src:H,style:{width:"50px"},alt:""})],-1),Rt={class:"money-wallet"},$t=e("i",{class:"pi pi-align-right",style:{"font-size":"2rem",cursor:"pointer"}},null,-1),St=[$t],Dt=e("div",{class:"mobile-draw-class",style:{"text-align":"center",display:"none"}},[e("div",{style:{display:"flex","flex-direction":"column",gap:"10px"}},[e("span",{class:"nextDrawMobile"},"Next Draw"),e("span",{class:"countdownLottoTimeMobile"},"03:03:24")])],-1),Vt={class:"lottery-body-info"},It={class:"create-lot"},zt={class:"creating-lottery"},Pt=e("div",{class:"creating-lottery-viewmy-tickets"},null,-1),Et={class:"youpick"},Ft={class:"first-youpick"},Ut=e("span",null,"Pick 3 Numbers ",-1),Ot={class:"pick-balls-handler"},qt={key:0,class:"noballs"},Zt={key:1,class:"balls-pick remove-cursor"},Ht=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),Wt=[Ht],Kt={key:2,class:"noballs"},jt={key:3,class:"balls-pick remove-cursor"},Gt=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),Qt=[Gt],Yt={key:4,class:"noballs"},Xt={key:5,class:"balls-pick remove-cursor"},Jt=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),es=[Jt],ts={class:"second-youpick"},ss=e("div",{class:"divider mt-1 mb-3"},null,-1),ls={class:"balls-handler d3LottoBallsHandler"},ns=["onClick"],os={class:"bettings"},is={class:"bet-expect-money"},as={class:"bet bem"},cs={class:"inner-bet"},ds={class:""},rs=e("span",null,"Your Bet",-1),us={class:""},ms=e("span",null,"Enter a name (Optional)",-1),vs={class:"money bem"},_s=["onClick"],bs={class:"bettings-button mt-3"},ps={class:"lottery-prizes"},ks={class:"latest-result"},hs=e("div",{class:"latest-result-header"},[e("span",null,"Latest Result"),e("span",null,"2023-01-10 / 09:00:00")],-1),ys={class:"latestResBalls"},fs={class:"successBalls"},gs={class:"mt-3"},ws=e("span",null,"My Bets",-1),Bs=e("p",null,"TABLE FORMAT - FOR BOUGHT TICKETS FOR 3D",-1),Ts=e("p",null,"View All Result Modal Here 3D",-1);function Ns(l,s,a,t,u,k){const b=v("TheWalletMoney"),m=v("Button"),p=v("InputNumber"),h=v("InputText"),y=v("Column"),g=v("DataTable"),w=v("Dialog"),B=v("LottoSidebar"),T=v("Sidebar");return c(),d(x,null,[e("div",Ct,[At,e("div",xt,[i(b)])]),e("div",Mt,[Lt,e("div",Rt,[i(b)]),e("div",{class:"burger",onClick:s[0]||(s[0]=o=>t.sidebarCanvas=!0)},St)]),Dt,e("div",Vt,[e("div",It,[e("div",zt,[Pt,e("div",Et,[e("div",Ft,[Ut,e("div",Ot,[!a.picked2numbers||!a.picked2numbers[0]?(c(),d("div",qt)):(c(),d("div",Zt,[e("span",{class:"removeBall",onClick:s[1]||(s[1]=o=>l.$emit("removeBall",a.picked2numbers[0]))},Wt),e("span",null,f(a.picked2numbers[0]),1)])),!a.picked2numbers||!a.picked2numbers[1]?(c(),d("div",Kt)):(c(),d("div",jt,[e("span",{class:"removeBall",onClick:s[2]||(s[2]=o=>l.$emit("removeBall",a.picked2numbers[1]))},Qt),e("span",null,f(a.picked2numbers[1]),1)])),!a.picked2numbers||!a.picked2numbers[2]?(c(),d("div",Yt)):(c(),d("div",Xt,[e("span",{class:"removeBall",onClick:s[3]||(s[3]=o=>l.$emit("removeBall",a.picked2numbers[2]))},es),e("span",null,f(a.picked2numbers[2]),1)]))])]),e("div",ts,[i(m,{label:"Quick Pick",class:"w-100",onClick:s[4]||(s[4]=o=>l.$emit("ez2generatedNumber"))}),i(m,{label:"Clear",class:"w-100",outlined:"",onClick:s[5]||(s[5]=o=>l.$emit("clearEZ2Ball"))})])]),ss,e("div",ls,[(c(!0),d(x,null,M(t.lottoNumbers,o=>(c(),d("div",{class:E(["lottery-balls remove-cursor",{"active-ball":t.isBallSelected(o)||t.isBallSelected2(o)}]),key:o.id,onClick:n=>l.$emit("selectedBall",o)},[e("span",null,f(o),1)],10,ns))),128))])]),e("div",os,[e("div",is,[e("div",as,[e("div",cs,[e("div",ds,[rs,i(p,{modelValue:t.dataValue,"onUpdate:modelValue":s[6]||(s[6]=o=>t.dataValue=o),inputId:"minmaxfraction",maxFractionDigits:2,max:4124,min:0,class:"w-100",onInput:t.updateAmountBet},null,8,["modelValue","onInput"])]),e("div",us,[ms,i(h,{type:"text",modelValue:t.playerName,"onUpdate:modelValue":s[7]||(s[7]=o=>t.playerName=o)},null,8,["modelValue"])])])]),e("div",vs,[(c(!0),d(x,null,M(a.moneyList,o=>(c(),d("div",{class:"money-ball remove-cursor",key:o.id,onClick:n=>l.$emit("moneyPlacement",o)},[e("span",null,"₱ "+f(o),1)],8,_s))),128))])])]),e("div",bs,[i(m,{label:"Submit",class:"w-100",onClick:t.submitTicket},null,8,["onClick"]),i(m,{label:"View Mechanics",class:"w-100",outlined:"",onClick:s[8]||(s[8]=o=>l.$emit("mechanics","3DLotto"))})])]),e("div",ps,[e("div",ks,[hs,e("div",ys,[e("div",fs,[(c(!0),d(x,null,M(t.latestResult,o=>(c(),d("div",{class:"sb",key:o.id},[e("span",null,f(o),1)]))),128))]),i(m,{label:"View All Result",onClick:t.viewAllResultFunc},null,8,["onClick"])])]),e("div",gs,[ws,i(g,{value:l.products,tableStyle:"min-width: 40rem",paginator:"",rows:5,rowsPerPageOptions:[5,10,20,50]},{default:A(()=>[i(y,{field:"name",header:"Method"}),i(y,{field:"category",header:"Amount"}),i(y,{field:"quantity",header:"Status"}),i(y,{field:"quantity",header:"Remarks"})]),_:1},8,["value"])])]),i(w,{draggable:!1,visible:t.viewBoughtTickets,"onUpdate:visible":s[9]||(s[9]=o=>t.viewBoughtTickets=o),modal:"",header:"My Tickets",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[Bs]),_:1},8,["visible"]),i(w,{draggable:!1,visible:t.viewAllResultModal,"onUpdate:visible":s[10]||(s[10]=o=>t.viewAllResultModal=o),modal:"",header:"View All Results",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[Ts]),_:1},8,["visible"]),i(T,{visible:t.sidebarCanvas,"onUpdate:visible":s[11]||(s[11]=o=>t.sidebarCanvas=o),header:" ",class:"w-full md:w-20rem lg:w-30rem",position:"right"},{default:A(()=>[i(B)]),_:1},8,["visible"])])],64)}const Cs=I(Nt,[["render",Ns]]),As={components:{TheWalletMoney:z,LottoSidebar:F},props:{picked2numbers:{type:Array,required:!1,default:()=>[]},moneyList:{type:Array,required:!1,default:()=>[]},valueAmount:{type:Number,required:!1,default:0},name:{type:String,required:!1,default:""}},setup(l,{emit:s}){const a=_(!1),t=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66"],u=_(l.picked2numbers),k=_(l.valueAmount),b=_(l.name);S(()=>l.valueAmount,n=>{k.value=n}),S(()=>l.picked2numbers,n=>{u.value=n},{immediate:!0});const m=n=>parseInt(n)===(u.value&&u.value[0])||parseInt(n)===(u.value&&u.value[1])||parseInt(n)===(u.value&&u.value[2]),p=n=>n===(l.picked2numbers&&l.picked2numbers[0])||n===(l.picked2numbers&&l.picked2numbers[1])||n===(l.picked2numbers&&l.picked2numbers[2]);P(()=>{s("updateAmount",k.value)});const h=()=>{s("updateAmount",k.value)},y=_(!1),g=()=>{y.value=!0},w=_(["12","7","54"]),B=_(!1);return{dataValue:k,updateAmountBet:h,lottoNumbers:t,isBallSelected:m,localPicked2Numbers:u,isBallSelected2:p,viewMytickets:g,viewBoughtTickets:y,latestResult:w,viewAllResultModal:B,viewAllResultFunc:()=>{B.value=!0},playerName:b,sidebarCanvas:a,submitTicket:()=>{const n=[{pickedNumbers:u.value,bet:k.value,name:b.value}];s("submitTicket",n)}}}},xs={class:"header-lottery",style:{"margin-bottom":"90px"}},Ms=O('<div class="lotoTypeLogo"><img src="'+W+'" style="width:80px;" alt=""></div><div class="nextDrawClass"><div class="ndtime"><span>Next Draw</span><span class="countdownLottoTime">03:03:24</span></div></div>',2),Ls={class:"money-wallet"},Rs={class:"header-mobile-lottery",style:{display:"none","justify-content":"space-between","align-items":"center",padding:"10px 20px","margin-bottom":"50px"}},$s=e("div",{class:"lotoTypeLogo"},[e("img",{src:W,style:{width:"50px"},alt:""})],-1),Ss={class:"money-wallet"},Ds=e("i",{class:"pi pi-align-right",style:{"font-size":"2rem",cursor:"pointer"}},null,-1),Vs=[Ds],Is=e("div",{class:"mobile-draw-class",style:{"text-align":"center",display:"none"}},[e("div",{style:{display:"flex","flex-direction":"column",gap:"10px"}},[e("span",{class:"nextDrawMobile"},"Next Draw"),e("span",{class:"countdownLottoTimeMobile"},"03:03:24")])],-1),zs={class:"lottery-body-info"},Ps={class:"create-lot"},Es={class:"creating-lottery"},Fs=e("div",{class:"creating-lottery-viewmy-tickets"},null,-1),Us={class:"youpick"},Os={class:"first-youpick"},qs=e("span",null,"Pick 3 Numbers ",-1),Zs={class:"pick-balls-handler"},Hs={key:0,class:"noballs"},Ws={key:1,class:"balls-pick remove-cursor"},Ks=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),js=[Ks],Gs={key:2,class:"noballs"},Qs={key:3,class:"balls-pick remove-cursor"},Ys=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),Xs=[Ys],Js={key:4,class:"noballs"},el={key:5,class:"balls-pick remove-cursor"},tl=e("i",{class:"pi pi-times",style:{"font-size":"0.6rem"}},null,-1),sl=[tl],ll={class:"second-youpick"},nl=e("div",{class:"divider mt-1 mb-3"},null,-1),ol={class:"balls-handler"},il=["onClick"],al={class:"bettings"},cl={class:"bet-expect-money"},dl={class:"bet bem"},rl={class:"inner-bet"},ul={class:""},ml=e("span",null,"Your Bet",-1),vl={class:""},_l=e("span",null,"Enter a name (Optional)",-1),bl={class:"money bem"},pl=["onClick"],kl={class:"bettings-button mt-3"},hl={class:"lottery-prizes"},yl={class:"latest-result"},fl=e("div",{class:"latest-result-header"},[e("span",null,"Latest Result"),e("span",null,"2023-01-10 / 09:00:00")],-1),gl={class:"latestResBalls"},wl={class:"successBalls"},Bl={class:"mt-3"},Tl=e("span",null,"My Bets",-1),Nl=e("p",null,"TABLE FORMAT - FOR BOUGHT TICKETS FOR PICK3",-1),Cl=e("p",null,"View All Result Modal Here PICK 3",-1);function Al(l,s,a,t,u,k){const b=v("TheWalletMoney"),m=v("Button"),p=v("InputNumber"),h=v("InputText"),y=v("Column"),g=v("DataTable"),w=v("LottoSidebar"),B=v("Sidebar"),T=v("Dialog");return c(),d(x,null,[e("div",xs,[Ms,e("div",Ls,[i(b)])]),e("div",Rs,[$s,e("div",Ss,[i(b)]),e("div",{class:"burger",onClick:s[0]||(s[0]=o=>t.sidebarCanvas=!0)},Vs)]),Is,e("div",zs,[e("div",Ps,[e("div",Es,[Fs,e("div",Us,[e("div",Os,[qs,e("div",Zs,[!a.picked2numbers||!a.picked2numbers[0]?(c(),d("div",Hs)):(c(),d("div",Ws,[e("span",{class:"removeBall",onClick:s[1]||(s[1]=o=>l.$emit("removeBall",a.picked2numbers[0]))},js),e("span",null,f(a.picked2numbers[0]),1)])),!a.picked2numbers||!a.picked2numbers[1]?(c(),d("div",Gs)):(c(),d("div",Qs,[e("span",{class:"removeBall",onClick:s[2]||(s[2]=o=>l.$emit("removeBall",a.picked2numbers[1]))},Xs),e("span",null,f(a.picked2numbers[1]),1)])),!a.picked2numbers||!a.picked2numbers[2]?(c(),d("div",Js)):(c(),d("div",el,[e("span",{class:"removeBall",onClick:s[3]||(s[3]=o=>l.$emit("removeBall",a.picked2numbers[2]))},sl),e("span",null,f(a.picked2numbers[2]),1)]))])]),e("div",ll,[i(m,{label:"Quick Pick",class:"w-100",onClick:s[4]||(s[4]=o=>l.$emit("ez2generatedNumber"))}),i(m,{label:"Clear",class:"w-100",outlined:"",onClick:s[5]||(s[5]=o=>l.$emit("clearEZ2Ball"))})])]),nl,e("div",ol,[(c(!0),d(x,null,M(t.lottoNumbers,o=>(c(),d("div",{class:E(["lottery-balls remove-cursor",{"active-ball":t.isBallSelected(o)||t.isBallSelected2(o)}]),key:o.id,onClick:n=>l.$emit("selectedBall",o)},[e("span",null,f(o),1)],10,il))),128))])]),e("div",al,[e("div",cl,[e("div",dl,[e("div",rl,[e("div",ul,[ml,i(p,{modelValue:t.dataValue,"onUpdate:modelValue":s[6]||(s[6]=o=>t.dataValue=o),inputId:"minmaxfraction",maxFractionDigits:2,max:4124,min:0,class:"w-100",onInput:t.updateAmountBet},null,8,["modelValue","onInput"])]),e("div",vl,[_l,i(h,{type:"text",modelValue:t.playerName,"onUpdate:modelValue":s[7]||(s[7]=o=>t.playerName=o)},null,8,["modelValue"])])])]),e("div",bl,[(c(!0),d(x,null,M(a.moneyList,o=>(c(),d("div",{class:"money-ball remove-cursor",key:o.id,onClick:n=>l.$emit("moneyPlacement",o)},[e("span",null,"₱ "+f(o),1)],8,pl))),128))])])]),e("div",kl,[i(m,{label:"Submit",class:"w-100",onClick:t.submitTicket},null,8,["onClick"]),i(m,{label:"View Mechanics",class:"w-100",outlined:"",onClick:s[8]||(s[8]=o=>l.$emit("mechanics","pick3"))})])]),e("div",hl,[e("div",yl,[fl,e("div",gl,[e("div",wl,[(c(!0),d(x,null,M(t.latestResult,o=>(c(),d("div",{class:"sb",key:o.id},[e("span",null,f(o),1)]))),128))]),i(m,{label:"View All Result",onClick:t.viewAllResultFunc},null,8,["onClick"])])]),e("div",Bl,[Tl,i(g,{value:l.products,tableStyle:"min-width: 40rem",paginator:"",rows:5,rowsPerPageOptions:[5,10,20,50]},{default:A(()=>[i(y,{field:"name",header:"Method"}),i(y,{field:"category",header:"Amount"}),i(y,{field:"quantity",header:"Status"}),i(y,{field:"quantity",header:"Remarks"})]),_:1},8,["value"])]),i(B,{visible:t.sidebarCanvas,"onUpdate:visible":s[9]||(s[9]=o=>t.sidebarCanvas=o),header:" ",class:"w-full md:w-20rem lg:w-30rem",position:"right"},{default:A(()=>[i(w)]),_:1},8,["visible"])]),i(T,{draggable:!1,visible:t.viewBoughtTickets,"onUpdate:visible":s[10]||(s[10]=o=>t.viewBoughtTickets=o),modal:"",header:"My Tickets",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[Nl]),_:1},8,["visible"]),i(T,{draggable:!1,visible:t.viewAllResultModal,"onUpdate:visible":s[11]||(s[11]=o=>t.viewAllResultModal=o),modal:"",header:"View All Results",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[Cl]),_:1},8,["visible"])])],64)}const xl=I(As,[["render",Al]]),Ml={components:{LottoSidebar:F,TheWalletMoney:z,ez2comp:Tt,d3lottocomp:Cs,pick3comp:xl},setup(){const l=ae(),s=_(l.params.type||""),a=U(),t=a.user[0].token,u=a.user[0].username,k=["10","50","100","150","200","250","300","400","500","600","700","800","900","1000"],b=_(0),m=_([]),p=_([]),h=_([]),y=_(!1),g=_(""),w=_(""),B=r=>{y.value=!0,g.value=r,r==="ez2mechanics"&&(w.value="EZ-2 Mechanics"),r==="3DLotto"&&(w.value="3D Lotto Mechanics"),r==="pick3"&&(w.value="Pick 3 Mechanics")},T=(r,N,$)=>{let L=[];for(let R=1;R<=$;R++){let D=Math.floor(Math.random()*(N-r+1))+r;L.push(D)}return L},o=()=>{m.value=[],p.value=[],h.value=[]},n=r=>{b.value=r},C=r=>{b.value=r},K=()=>{m.value=[...T(1,31,2)]},j=r=>{const N=r[0].pickedNumbers[0],$=r[0].pickedNumbers[1],L=r[0].bet,R=r[0].name;console.log([{username:u,token:t,firstNumber:N,secondNumber:$,amountBet:L,name:R}])},G=r=>{const N=r[0].pickedNumbers[0],$=r[0].pickedNumbers[1],L=r[0].pickedNumbers[2],R=r[0].bet,D=r[0].name;console.log([{username:u,token:t,firstNumber:N,secondNumber:$,thirdNumber:L,amountBet:R,name:D}])},Q=r=>{const N=r[0].pickedNumbers[0],$=r[0].pickedNumbers[1],L=r[0].pickedNumbers[2],R=r[0].bet,D=r[0].name;console.log([{username:u,token:t,firstNumber:N,secondNumber:$,thirdNumber:L,amountBet:R,name:D}])},Y=r=>{m.value.length<=1&&m.value.push(r)},X=r=>{if(m.value){const N=m.value.indexOf(r);N!==-1&&m.value.splice(N,1)}},J=()=>{p.value=[...T(1,66,3)]},ee=r=>{p.value.length<=2&&(p.value.includes(r)?console.log("EXIST"):p.value.push(r))},te=r=>{if(p.value){const N=p.value.indexOf(r);N!==-1&&p.value.splice(N,1)}},se=()=>{h.value=[...T(1,31,3)]},le=r=>{h.value.length<=2&&h.value.push(r)},ne=r=>{if(h.value){const N=h.value.indexOf(r);N!==-1&&h.value.splice(N,1)}};return S(()=>l.params.type,r=>{s.value=r}),{selectedBallPick3:ee,removePick3Ball:te,pick3generatedNumber:J,pick3HolderNumber:p,d3lottogeneratedNumber:se,selectedBall3DLotto:le,remove3DLottoBall:ne,routeInfo:s,moneyBalls:k,placeBet:n,getRandomNumbers:T,ez2generatedNumber:K,ez2HolderNumber:m,selectedBallEZ2:Y,removeEZ2Ball:X,clearBall:o,amountToBet:b,updatePlaceBet:C,mechanicsFunc:B,mechanics:y,mechanicsType:g,HeaderMechanics:w,D3LottoHolderNumber:h,submitTicketEZ2:j,submitTicketPICK3:G,submitTicket3D:Q}}},Ll={class:"info-body"},Rl={class:"left-content-body"},$l={key:0},Sl={key:1},Dl={key:2},Vl={class:"right-content-body"},Il={key:0},zl=e("p",null,"EZ 2 Mechanics",-1),Pl=[zl],El={key:1},Fl={key:2};function Ul(l,s,a,t,u,k){const b=v("ez2comp"),m=v("d3lottocomp"),p=v("pick3comp"),h=v("LottoSidebar"),y=v("Dialog");return c(),d("div",Ll,[e("div",Rl,[t.routeInfo==="ez2"?(c(),d("div",$l,[i(b,{picked2numbers:t.ez2HolderNumber,moneyList:t.moneyBalls,onEz2generatedNumber:t.ez2generatedNumber,onRemoveBall:t.removeEZ2Ball,onClearEZ2Ball:t.clearBall,onSelectedBall:t.selectedBallEZ2,onMoneyPlacement:t.placeBet,onUpdateAmount:t.updatePlaceBet,valueAmount:t.amountToBet,onMechanics:t.mechanicsFunc,onSubmitTicket:t.submitTicketEZ2},null,8,["picked2numbers","moneyList","onEz2generatedNumber","onRemoveBall","onClearEZ2Ball","onSelectedBall","onMoneyPlacement","onUpdateAmount","valueAmount","onMechanics","onSubmitTicket"])])):V("",!0),t.routeInfo==="3dlotto"?(c(),d("div",Sl,[i(m,{picked2numbers:t.D3LottoHolderNumber,moneyList:t.moneyBalls,onEz2generatedNumber:t.d3lottogeneratedNumber,onRemoveBall:t.remove3DLottoBall,onClearEZ2Ball:t.clearBall,onSelectedBall:t.selectedBall3DLotto,onMoneyPlacement:t.placeBet,onUpdateAmount:t.updatePlaceBet,valueAmount:t.amountToBet,onMechanics:t.mechanicsFunc,onSubmitTicket:t.submitTicket3D},null,8,["picked2numbers","moneyList","onEz2generatedNumber","onRemoveBall","onClearEZ2Ball","onSelectedBall","onMoneyPlacement","onUpdateAmount","valueAmount","onMechanics","onSubmitTicket"])])):V("",!0),t.routeInfo==="pick3"?(c(),d("div",Dl,[i(p,{picked2numbers:t.pick3HolderNumber,moneyList:t.moneyBalls,onEz2generatedNumber:t.pick3generatedNumber,onRemoveBall:t.removePick3Ball,onClearEZ2Ball:t.clearBall,onSelectedBall:t.selectedBallPick3,onMoneyPlacement:t.placeBet,onUpdateAmount:t.updatePlaceBet,valueAmount:t.amountToBet,onMechanics:t.mechanicsFunc,onSubmitTicket:t.submitTicketPICK3},null,8,["picked2numbers","moneyList","onEz2generatedNumber","onRemoveBall","onClearEZ2Ball","onSelectedBall","onMoneyPlacement","onUpdateAmount","valueAmount","onMechanics","onSubmitTicket"])])):V("",!0)]),e("div",Vl,[i(h)]),i(y,{draggable:!1,visible:t.mechanics,"onUpdate:visible":s[0]||(s[0]=g=>t.mechanics=g),modal:"",header:t.HeaderMechanics,style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:A(()=>[t.mechanicsType==="ez2mechanics"?(c(),d("div",Il,Pl)):t.mechanicsType==="pick3"?(c(),d("div",El,"Pick 3 Mechanics")):t.mechanicsType==="3DLotto"?(c(),d("div",Fl,"3D Lotto Mechanics")):V("",!0)]),_:1},8,["visible","header"])])}const Wl=I(Ml,[["render",Ul]]);export{Wl as default};
