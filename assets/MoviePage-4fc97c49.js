import{_ as T,o as f,c as k,a as o,d as r,v as d}from"./index-baa0c8b1.js";import{_ as u}from"./copy-icon-286decec.js";const g={data(){return{inputText:"",contentText:"",i18nText:"",customToken:""}},watch:{inputText:{handler(e){this.processData(e)}},customToken:{handler(){this.processData(this.inputText)}}},methods:{checkInput(e){const t=/"NPCName"/g;return(e.match(t)||[]).length>1?(this.contentText="Only one NPC reaction at a time.",this.i18nText="",!1):!0},findToken(e){const t=/"NPCName":\s*"([^"]*)"/,l=e.match(t);if(this.customToken.trim().length===0){if(l&&l[1])return l[1]+".Movies"}else return this.customToken},cutString(e){const t=/(?:\/speak|\/message|\/end dialogue|\/splitSpeak|\/textAboveHead)[^"]*"([^"]+)\\|"Text":\s*"([^"]+)"/g,l=[];let s;for(;(s=t.exec(e))!==null;)s[1]!==void 0?l.push(s[1]):s[2]!==void 0&&l.push(s[2]);return l},processData(e){const t=this.inputText;if(!this.checkInput(t))return;const s=this.findToken(e),i=this.cutString(e);let c="",n=e;for(let a=0;a<i.length;a++){const p=i[a],m=`"${s}.${a}"`,x=`"${p}"`,h=`${p}`;c+=`${m}: ${x},
`,n=n.replace(h,`{{i18n:${s}.${a}}}`)}c.trim()!==""?this.contentText=n.trim()+`
`:this.contentText="",this.i18nText=c.trim()},copyToClipboard(e){document.getElementById(e).select(),document.execCommand("copy"),window.getSelection().removeAllRanges()}}},y={class:"input-page"},C=o("h2",{class:"page-header text-2xl mb-4"},"Movie Reactions",-1),v={class:"input-containers-wrapper"},_={class:"input-container left"},b={class:"input-container right"},V={class:"copy-button-placement"},w={class:"copy-button-placement"};function I(e,t,l,s,i,c){return f(),k("div",y,[C,o("div",v,[o("div",_,[r(o("textarea",{class:"input-field hide-scroll",placeholder:"Input entry",id:"input-data","onUpdate:modelValue":t[0]||(t[0]=n=>i.inputText=n)},null,512),[[d,i.inputText]]),r(o("input",{class:"prefix-field",type:"text",placeholder:"Custom Token","onUpdate:modelValue":t[1]||(t[1]=n=>i.customToken=n)},null,512),[[d,i.customToken]])]),o("div",b,[o("div",V,[r(o("textarea",{class:"input-field button-padding hide-scroll",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[2]||(t[2]=n=>i.contentText=n)},null,512),[[d,i.contentText]]),o("img",{class:"copy-button",onClick:t[3]||(t[3]=n=>c.copyToClipboard("content-field")),src:u,alt:"Copy Content",title:"Copy"})]),o("div",w,[r(o("textarea",{class:"input-field button-padding hide-scroll",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[4]||(t[4]=n=>i.i18nText=n)},null,512),[[d,i.i18nText]]),o("img",{class:"copy-button",onClick:t[5]||(t[5]=n=>c.copyToClipboard("i18n-field")),src:u,alt:"Copy i18n",title:"Copy"})])])])])}const D=T(g,[["render",I]]);export{D as default};