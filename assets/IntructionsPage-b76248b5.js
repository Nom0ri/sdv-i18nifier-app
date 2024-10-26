import{_ as u,o as t,c as n,a as o,t as d,F as l,h as r,e as a,r as x,g as k,n as y}from"./index-833a2599.js";const v={props:{section:{type:Object,required:!0},isConfigPage:{type:Boolean,default:!1}}},T={class:"mb-6"},b={class:"text-2xl mb-6"},_=["innerHTML"],P=o("p",{class:"text-xl space"},"Notes:",-1),C=["innerHTML"],N={class:"howtotextareas"},w={class:"input-container left"},E=["value"],I=["value"],D=["value"],M=["value"],R={key:0,class:"input-container right"},W=["value"],S=["value"],A={key:1,class:"input-container right"},J=["value"];function j(m,p,e,h,i,f){return t(),n("div",T,[o("p",b,[o("strong",null,d(e.section.title),1)]),(t(!0),n(l,null,r(e.section.descriptions,s=>(t(),n("p",{class:"text-lg",key:s,innerHTML:s},null,8,_))),128)),e.section.notes?(t(),n(l,{key:0},[P,(t(!0),n(l,null,r(e.section.notes,s=>(t(),n("p",{class:"text-lg",key:s,innerHTML:s},null,8,C))),128))],64)):a("",!0),o("div",N,[o("div",w,[o("textarea",{class:"input-field hide-scroll",placeholder:"Input entry",readonly:"",value:e.section.inputText},null,8,E),e.section.customToken?(t(),n("input",{key:0,class:"prefix-field",type:"text",placeholder:"Custom Token (Empty)",value:e.section.customToken.model,readonly:""},null,8,I)):a("",!0),e.section.customPrefix?(t(),n("input",{key:1,class:"prefix-field",type:"text",placeholder:"Custom Prefix (Empty)",value:e.section.customPrefix.model,readonly:""},null,8,D)):a("",!0),e.section.customImportToken?(t(),n("input",{key:2,class:"prefix-field",type:"text",placeholder:"Custom Import Token (Empty)",value:e.section.customImportToken.model,readonly:""},null,8,M)):a("",!0)]),e.isConfigPage?a("",!0):(t(),n("div",R,[o("textarea",{class:"input-field button-padding hide-scroll",placeholder:"Content.json",readonly:"",value:e.section.contentText},null,8,W),o("textarea",{class:"input-field button-padding hide-scroll",placeholder:"i18n",readonly:"",value:e.section.i18nText},null,8,S)])),e.isConfigPage?(t(),n("div",A,[o("textarea",{class:"input-field button-padding hide-scroll",placeholder:"i18n",readonly:"",value:e.section.i18nText},null,8,J)])):a("",!0)])])}const Q=u(v,[["render",j]]),B={components:{SectionComponent:Q},data(){return{activeTab:0,sections:[{title:"Dialogues",descriptions:["Works with dialogues, mails and random dialogue.","You can set 'custom prefix', which makes resulting i18n much more readable and easier to manage."],notes:["Random dialogues must be converted one at a time; regular can be converted en masse.","Mails need to have titles.","Import Token is used for importing tokens into i18n (very specific use cases)"],inputText:`Input Entry
"winter_7": "Some dialogue"`,contentText:`Content.json
"winter_7": "{{i18n:Optional_Prefix.winter_7}}"`,i18nText:`i18n
"Optional_Prefix.winter_7": "Some dialogue"`,customPrefix:{model:"Optional_Prefix"},customImportToken:{model:""}},{title:"Events",descriptions:["Works with events and forks","If Custom Token is inputted, it will become the name of the i18n key. If not, it'll just take the event ID."],notes:["Events/forks need to be converted one by one.","Import Token is used for importing tokens into i18n (very specific use cases)","&nbsp;"],inputText:`Input Entry
"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC "Dialogue 1$s"/faceDirection NPC 0/emote NPC 12/speak NPC "Dialogue 2$a"/emote farmer 60/speak otherNPC"Question for the farmer, @?$s"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"`,contentText:`Content.json
"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC "{{i18n:EventName.0}}"/faceDirection NPC 0/emote NPC 12/speak NPC "{{i18n:EventName.1}}"/emote farmer 60/speak otherNPC"{{i18n:EventName.2}}"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"`,i18nText:`i18n
"EventName.0": "Dialogue 1$s",
"EventName.1": "Dialogue 2$a",
"EventName.2": "Question for the farmer, @?$s",`,customToken:{model:"EventName"},customImportToken:{model:""}},{title:"Quests",descriptions:["Works with all quests and detects if reaction dialogue is present.","If Custom Token is inputted, it will become the name of the i18n key. If not, it'll just take the quest ID."],notes:["Quests need to be converted one by one.","&nbsp;","&nbsp;"],inputText:`Input Entry
"101": "ItemDelivery/Jodi's Request/Jodi needs a fresh cauliflower for a recipe she's making. She's asking you to bring her one./Bring Jodi a cauliflower./Jodi 190/-1/350/-1/true/Oh, that looks so delicious! Thank you, this is just what I wanted. It's going to be perfect for my yellow curry."`,contentText:`Content.json
"101": "ItemDelivery/{{i18n:JodiQuest.title}}/{{i18n:JodiQuest.text}}/{{i18n:JodiQuest.objective}}/Jodi 190/-1/350/-1/true/{{i18n:JodiQuest.reaction}}"`,i18nText:`i18n
"JodiQuest.title": "Jodi's Request",
"JodiQuest.text": "Jodi needs a fresh cauliflower for a recipe she's making. She's asking you to bring her one.",
"JodiQuest.objective": "Bring Jodi a cauliflower.",
"JodiQuest.reaction": "Oh, that looks so delicious! Thank you, this is just what I wanted. It's going to be perfect for my yellow curry.",`,customToken:{model:"JodiQuest"}},{title:"Movie Reactions",descriptions:["Works with reaction text and scripts. Just paste the whole reaction and done.",`If Custom Token is inputted, it will become the name of the i18n key. If not, it'll use the NPC name + ".Movies".`],notes:["Movie reactions need to be converted one NPC at a time.","&nbsp;","&nbsp;"],inputText:`{
"NPCName": "Penny",
"Reactions": [
{
"Tag": "*",
"Response": "love",
"SpecialResponses": {
"BeforeMovie": {
"ResponsePoint": null,
"Script": "",
"Text": "Watching a movie with mom sure brings me back!"
},
"DuringMovie": {
"ResponsePoint": null,
"Script": "/message "(Pam and Penny are watching intently!)"",
"Text": ""
},
"AfterMovie": {
"ResponsePoint": null,
"Script": "",
"Text": "It's great to be able to do things as a family again!"
}
},
(...)`,contentText:`{
"NPCName": "Penny",
"Reactions": [
{
"Tag": "*",
"Response": "love",
"SpecialResponses": {
"BeforeMovie": {
"ResponsePoint": null,
"Script": "",
"Text": "{{i18n:Penny.Movies.0}}"
},
"DuringMovie": {
"ResponsePoint": null,
"Script": "/message "{{i18n:Penny.Movies.1}}",
"Text": ""
},
"AfterMovie": {
"ResponsePoint": null,
"Script": "",
"Text": "{{i18n:Penny.Movies.2}}"
}
},
(...)`,i18nText:`"Penny.Movies.0": "Watching a movie with mom sure brings me back!",
"Penny.Movies.1": "(Pam and Penny are watching intently!)",
"Penny.Movies.2": "It's great to be able to do things as a family again!",`,customToken:{model:""}},{title:"Object Data",descriptions:["Works with new objects from 1.6 update.","&nbsp;"],notes:["Works on multiple entries at once.","&nbsp;","&nbsp;"],inputText:`"875": {
 "Name": "Ectoplasm",
"DisplayName": "Ectoplasm",
"Description": "Plasm that got ectoed",
"Type": "Quest",
"Category": 0,
"Price": 0
},`,contentText:`"875": {
 "Name": "Ectoplasm",
"DisplayName": "{{i18n:875.DisplayName}}",
"Description": "{{i18n:875.Description}}",
"Type": "Quest",
"Category": 0,
"Price": 0
}`,i18nText:`"875.DisplayName": "Ectoplasm",
"875.Description": "Plasm that got ectoed",`,customPrefix:{model:""}},{title:"Recipes",descriptions:["Works with both crafting and cooking recipes.","&nbsp;"],notes:["Works on multiple entries at once.","If there is no Translation Name, i18n token will be added either way.",'If there are spaces in the English name, they will be replaced with "_" in the tokens.'],inputText:`"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/TranslationName",
"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/",`,contentText:`"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/{{i18n:Salad.DisplayName}}",
"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/{{i18n:Wild_Bait.DisplayName}}",`,i18nText:`"Salad.DisplayName": "TranslationName",
"Wild_Bait.DisplayName": "",`,customToken:{model:""}},{title:"Gift Tastes",descriptions:["Works with reactions for Gift Tastes","&nbsp;"],notes:["Works on multiple entries at once.","If the entry includes {{ModId}} in the ID, it will be skipped for i18n keys.","&nbsp;"],inputText:`"{{ModId}}_Example": "Reaction love/66/Reaction like//Reaction dislike/-5/Reaction hate/330/Reaction neutral//",

"Abigail": "I seriously love this!/66 128/This looks delicious!//What am I supposed to do with this?/-5 -75/What were you thinking?/330/Thanks.// ",`,contentText:`"{{ModId}}_Example": "{{i18n: Example.love}}/66/{{i18n: Example.like}}//{{i18n: Example.dislike}}/-5/{{i18n: Example.hate}}/330/{{i18n: Example.neutral}}//",

"Abigail": "{{i18n: Abigail.love}}/66 128/{{i18n: Abigail.like}}//{{i18n: Abigail.dislike}}/-5 -75/{{i18n: Abigail.hate}}/330/{{i18n: Abigail.neutral}}// ",`,i18nText:`"Example.love": "Reaction love",
"Example.like": "Reaction like",
"Example.dislike": "Reaction dislike",
"Example.hate": "Reaction hate",
"Example.neutral": "Reaction neutral",

"Abigail.love": "I seriously love this!",
"Abigail.like": "This looks delicious!",
"Abigail.dislike": "What am I supposed to do with this?",
"Abigail.hate": "What were you thinking?",
"Abigail.neutral": "Thanks.",`,customPrefix:{model:""}},{title:"Config",descriptions:["Creates i18n from mod configs."],notes:["Works on multiple config options at once.",'If sections are used, an empty "config.section.&lt;section name&gt;.description" key will be created automatically.',"Supports single quotes and escaped characters.","<em>true</em> and <em>false</em> will be skipped"],inputText:`"ConfigSchema": {
    "Material": {
        "AllowValues": "Wood, Metal",
        "Default": "Wood",
        "Section": "Appearance"
    },
    "Enabled": {
        "AllowValues": "true, false",
        "Default": "true"
    }
},`,contentText:"",i18nText:`"config.Material.name": "Material",
"config.Material.values.Wood": "Wood",
"config.Material.values.Metal": "Metal",

"config.Enabled.name": "Enabled",

"config.section.Appearance.name": "Appearance",
"config.section.Appearance.description": "",`,customField:null,isConfigPage:!0}]}}},O={class:"text-white text-center home"},q={class:"tab-navigation"},H=["onClick"];function L(m,p,e,h,i,f){const s=x("SectionComponent");return t(),n("div",O,[o("div",q,[(t(!0),n(l,null,r(i.sections,(g,c)=>(t(),n("button",{key:c,class:y(["tab-button",{active:i.activeTab===c}]),onClick:V=>i.activeTab=c},d(g.title),11,H))),128))]),i.sections[i.activeTab]?(t(),k(s,{key:0,section:i.sections[i.activeTab],isConfigPage:i.sections[i.activeTab].isConfigPage},null,8,["section","isConfigPage"])):a("",!0)])}const G=u(B,[["render",L]]);export{G as default};
