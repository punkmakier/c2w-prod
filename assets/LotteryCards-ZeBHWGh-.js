import{_ as n,y as l,c as a,e as o,f as i,t as d,j as c,z as u}from"./index--yk-e3mG.js";const g={props:{id:{type:String,required:!0,default:""},title:{type:String,required:!0,default:"Default Title"},bgimage:{type:String,required:!0,default:"golden_empire.jpg"},badgeText:{type:String,required:!1,default:""},url:{type:String,required:!0,default:"come2win.ph"}},methods:{fontAdjustment(e){let t="1rem";return e.length>=12&&(t="0.8rem"),t},openLink(e){window.open(e,"_blank")}}},m={class:"game-info"},_={key:0,class:"game-badge"},p={class:"game-logo-handler"},f=["src"],y={class:"ghost-view"},h=i("i",{class:"pi pi-play",style:{"font-size":"1.2rem","margin-left":"5px"}},null,-1),v=[h];function b(e,t,s,S,k,w){const r=l("tooltip");return a(),o("div",m,[s.badgeText?(a(),o("div",_,[i("span",null,d(s.badgeText),1)])):c("",!0),i("div",p,[i("img",{src:`/src/assets/games_logo/${s.bgimage}`,alt:"",class:"games-logo",style:{width:"100% !important"}},null,8,f)]),i("div",y,[u((a(),o("span",{class:"play-game-button",onClick:t[0]||(t[0]=x=>e.$emit("playInHouseGame",{gameID:s.id,urlGame:s.url}))},v)),[[r,"Play",void 0,{bottom:!0}]])])])}const D=n(g,[["render",b]]);export{D as L};
