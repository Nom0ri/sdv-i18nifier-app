import{_ as a,o as r,c as d,a as e,d as s,v as i,e as l}from"./index-baa0c8b1.js";const u={data(){return{inputText:`Input Entry
"winter_7": "Some dialogue"`,contentText:`Content.json
"winter_7": "{{i18n:Optional_Prefix.winter_7}}"`,i18nText:`i18n
"Optional_Prefix.winter_7": "Some dialogue"`,customPrefix:"Optional_Prefix",eventText:`Input Entry
"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC "Dialogue 1$s"/faceDirection NPC 0/emote NPC 12/speak NPC "Dialogue 2$a"/emote farmer 60/speak otherNPC"Question for the farmer, @?$s"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"`,eventContent:`Content.json
"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC "{{i18n:EventName.0}}"/faceDirection NPC 0/emote NPC 12/speak NPC "{{i18n:EventName.1}}"/emote farmer 60/speak otherNPC"{{i18n:EventName.2}}"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"`,eventi18n:`i18n
"EventName.0": "Dialogue 1$s",
"EventName.1": "Dialogue 2$a",
"EventName.2": "Question for the farmer, @?$s",`,customToken:"EventName",questText:`Input Entry
"101": "ItemDelivery/Jodi's Request/Jodi needs a fresh cauliflower for a recipe she's making. She's asking you to bring her one./Bring Jodi a cauliflower./Jodi 190/-1/350/-1/true/Oh, that looks so delicious! Thank you, this is just what I wanted. It's going to be perfect for my yellow curry."`,questContent:`Content.json
"101": "ItemDelivery/{{i18n:JodiQuest.title}}/{{i18n:JodiQuest.text}}/{{i18n:JodiQuest.objective}}/Jodi 190/-1/350/-1/true/{{i18n:JodiQuest.reaction}}"`,questi18n:`i18n
"JodiQuest.title": "Jodi's Request",
"JodiQuest.text": "Jodi needs a fresh cauliflower for a recipe she's making. She's asking you to bring her one.",
"JodiQuest.objective": "Bring Jodi a cauliflower.",
"JodiQuest.reaction": "Oh, that looks so delicious! Thank you, this is just what I wanted. It's going to be perfect for my yellow curry.",`,questToken:"JodiQuest",movieText:`{
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
(...)`,movieContent:`{
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
(...)`,moviei18n:`"Penny.Movies.0": "Watching a movie with mom sure brings me back!",
"Penny.Movies.1": "(Pam and Penny are watching intently!)",
"Penny.Movies.2": "It's great to be able to do things as a family again!",`,movieToken:""}}},p={class:"text-white text-center home"},c={class:"mb-6"},x=l('<p class="text-2xl mb-6"><strong>Dialogues:</strong></p><p class="text-lg">Works with dialogues, mails and random dialogue.</p><p class="text-lg">You can set &#39;custom prefix&#39;, which makes resulting i18n much more readable and easier to manage.</p><p class="text-xl space">Notes:</p><p class="text-lg">Random dialogues must be converted one at a time, regular can be converted en masse.</p><p class="text-lg">Mails need to have titles.</p>',6),m={class:"howtotextareas"},h={class:"input-container left"},f={class:"input-container right"},v={class:"mb-6"},g=l('<p class="text-2xl mb-6"><strong>Events:</strong></p><p class="text-lg">Works with events and forks</p><p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it&#39;ll just take the event ID.</p><p class="text-xl space">Notes:</p><p class="text-lg">Events/forks need to be converted one by one.</p>',5),y={class:"howtotextareas"},P={class:"input-container left"},w={class:"input-container right"},C={class:"mb-6"},k=l('<p class="text-2xl mb-6"><strong>Quests:</strong></p><p class="text-lg">Works with all quests and detects if reaction dialogue is present.</p><p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it&#39;ll just take the quest ID.</p><p class="text-xl space">Notes:</p><p class="text-lg">Quests need to be converted one by one.</p>',5),b={class:"howtotextareas"},T={class:"input-container left"},N={class:"input-container right"},_={class:"mb-6"},I=l('<p class="text-2xl mb-6"><strong>Movie Reactions:</strong></p><p class="text-lg">Works with reaction text and scripts. Just paste the whole reaction and done.</p><p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it&#39;ll use the NPC name + &quot;.Movies&quot; (E.g. &quot;Penny.Movies&quot;).</p><p class="text-xl space">Notes:</p><p class="text-lg">Movie reactions need to be converted one NPC by one.</p>',5),q={class:"howtotextareas"},E={class:"input-container left"},J={class:"input-container right"},M=e("p",{class:"text-lg downspace"},"If you find any problems, post an issue on my github or let me know through Discord: nom0ri",-1);function V(D,t,R,U,n,j){return r(),d("div",p,[e("div",null,[e("div",c,[x,e("div",m,[e("div",h,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input entry",id:"input-data",readonly:"","onUpdate:modelValue":t[0]||(t[0]=o=>n.inputText=o)},null,512),[[i,n.inputText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Prefix","onUpdate:modelValue":t[1]||(t[1]=o=>n.customPrefix=o),readonly:""},null,512),[[i,n.customPrefix]])]),e("div",f,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[2]||(t[2]=o=>n.contentText=o)},null,512),[[i,n.contentText]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[3]||(t[3]=o=>n.i18nText=o)},null,512),[[i,n.i18nText]])])])]),e("div",v,[g,e("div",y,[e("div",P,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[4]||(t[4]=o=>n.eventText=o)},null,512),[[i,n.eventText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Prefix","onUpdate:modelValue":t[5]||(t[5]=o=>n.customToken=o),readonly:""},null,512),[[i,n.customToken]])]),e("div",w,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[6]||(t[6]=o=>n.eventContent=o)},null,512),[[i,n.eventContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[7]||(t[7]=o=>n.eventi18n=o)},null,512),[[i,n.eventi18n]])])])]),e("div",C,[k,e("div",b,[e("div",T,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[8]||(t[8]=o=>n.questText=o)},null,512),[[i,n.questText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Prefix","onUpdate:modelValue":t[9]||(t[9]=o=>n.questToken=o),readonly:""},null,512),[[i,n.questToken]])]),e("div",N,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[10]||(t[10]=o=>n.questContent=o)},null,512),[[i,n.questContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[11]||(t[11]=o=>n.questi18n=o)},null,512),[[i,n.questi18n]])])])]),e("div",_,[I,e("div",q,[e("div",E,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[12]||(t[12]=o=>n.movieText=o)},null,512),[[i,n.movieText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Token (Empty)","onUpdate:modelValue":t[13]||(t[13]=o=>n.movieToken=o),readonly:""},null,512),[[i,n.movieToken]])]),e("div",J,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[14]||(t[14]=o=>n.movieContent=o)},null,512),[[i,n.movieContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[15]||(t[15]=o=>n.moviei18n=o)},null,512),[[i,n.moviei18n]])])])]),M])])}const S=a(u,[["render",V]]);export{S as default};
