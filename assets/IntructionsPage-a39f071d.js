import{_ as a,o as r,c as d,a as e,d as s,v as i,e as l}from"./index-506ed05a.js";const p={data(){return{inputText:`Input Entry
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
"Penny.Movies.2": "It's great to be able to do things as a family again!",`,movieToken:"",objectText:`"875": {
 "Name": "Ectoplasm",
"DisplayName": "Ectoplasm",
"Description": "Plasm that got ectoed",
"Type": "Quest",
"Category": 0,
"Price": 0
},`,objectContent:`"875": {
 "Name": "Ectoplasm",
"DisplayName": "{{i18n:875.DisplayName}}",
"Description": "{{i18n:875.Description}}",
"Type": "Quest",
"Category": 0,
"Price": 0
}`,objecti18n:`"875.DisplayName": "Ectoplasm",
"875.Description": "Plasm that got ectoed",`,objectToken:"",recipeText:`"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/TranslationName",
"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/",`,recipeContent:`"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/{{i18n:Salad.DisplayName}}",
"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/{{i18n:Wild_Bait.DisplayName}}",`,recipei18n:`"Salad.DisplayName": "TranslationName",
"Wild_Bait.DisplayName": "",`,recipeToken:""}}},u={class:"text-white text-center home"},c={class:"mb-6"},m=l('<p class="text-2xl mb-6"><strong>Dialogues:</strong></p><p class="text-lg">Works with dialogues, mails and random dialogue.</p><p class="text-lg">You can set &#39;custom prefix&#39;, which makes resulting i18n much more readable and easier to manage.</p><p class="text-xl space">Notes:</p><p class="text-lg">Random dialogues must be converted one at a time, regular can be converted en masse.</p><p class="text-lg">Mails need to have titles.</p>',6),x={class:"howtotextareas"},h={class:"input-container left"},f={class:"input-container right"},g={class:"mb-6"},y=l('<p class="text-2xl mb-6"><strong>Events:</strong></p><p class="text-lg">Works with events and forks</p><p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it&#39;ll just take the event ID.</p><p class="text-xl space">Notes:</p><p class="text-lg">Events/forks need to be converted one by one.</p>',5),v={class:"howtotextareas"},b={class:"input-container left"},w={class:"input-container right"},k={class:"mb-6"},T=l('<p class="text-2xl mb-6"><strong>Quests:</strong></p><p class="text-lg">Works with all quests and detects if reaction dialogue is present.</p><p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it&#39;ll just take the quest ID.</p><p class="text-xl space">Notes:</p><p class="text-lg">Quests need to be converted one by one.</p>',5),C={class:"howtotextareas"},P={class:"input-container left"},N={class:"input-container right"},_={class:"mb-6"},j=l('<p class="text-2xl mb-6"><strong>Movie Reactions:</strong></p><p class="text-lg">Works with reaction text and scripts. Just paste the whole reaction and done.</p><p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it&#39;ll use the NPC name + &quot;.Movies&quot; (E.g. &quot;Penny.Movies&quot;).</p><p class="text-xl space">Notes:</p><p class="text-lg">Movie reactions need to be converted one NPC by one.</p>',5),D={class:"howtotextareas"},E={class:"input-container left"},I={class:"input-container right"},V={class:"mb-6"},U=e("p",{class:"text-2xl mb-6"},[e("strong",null,"Data Objects:")],-1),q=e("p",{class:"text-lg"},"Works with new data objects from 1.6 update",-1),J=e("p",{class:"text-xl space"},"Notes:",-1),M=e("p",{class:"text-lg"},"Works on multiple entries at once.",-1),R={class:"howtotextareas"},S={class:"input-container left"},Q={class:"input-container right"},W={class:"mb-6"},B=e("p",{class:"text-2xl mb-6"},[e("strong",null,"Recipes:")],-1),O=e("p",{class:"text-lg"},"Works both crafting and cooking recipes.",-1),A=e("p",{class:"text-xl space"},"Notes:",-1),H=e("p",{class:"text-lg"},"Works on multiple entries at once. If there is no Translation Name i18n token will be added either way. If there are spaces in the english name, they will be replaced with '_' in the tokens.",-1),Y={class:"howtotextareas"},z={class:"input-container left"},F={class:"input-container right"},G=e("p",{class:"text-lg downspace"},"If you find any problems, post an issue on my github or let me know through Discord: nom0ri",-1);function K(L,t,X,Z,n,$){return r(),d("div",u,[e("div",null,[e("div",c,[m,e("div",x,[e("div",h,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input entry",id:"input-data",readonly:"","onUpdate:modelValue":t[0]||(t[0]=o=>n.inputText=o)},null,512),[[i,n.inputText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Prefix","onUpdate:modelValue":t[1]||(t[1]=o=>n.customPrefix=o),readonly:""},null,512),[[i,n.customPrefix]])]),e("div",f,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[2]||(t[2]=o=>n.contentText=o)},null,512),[[i,n.contentText]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[3]||(t[3]=o=>n.i18nText=o)},null,512),[[i,n.i18nText]])])])]),e("div",g,[y,e("div",v,[e("div",b,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[4]||(t[4]=o=>n.eventText=o)},null,512),[[i,n.eventText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Prefix","onUpdate:modelValue":t[5]||(t[5]=o=>n.customToken=o),readonly:""},null,512),[[i,n.customToken]])]),e("div",w,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[6]||(t[6]=o=>n.eventContent=o)},null,512),[[i,n.eventContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[7]||(t[7]=o=>n.eventi18n=o)},null,512),[[i,n.eventi18n]])])])]),e("div",k,[T,e("div",C,[e("div",P,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[8]||(t[8]=o=>n.questText=o)},null,512),[[i,n.questText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Prefix","onUpdate:modelValue":t[9]||(t[9]=o=>n.questToken=o),readonly:""},null,512),[[i,n.questToken]])]),e("div",N,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[10]||(t[10]=o=>n.questContent=o)},null,512),[[i,n.questContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[11]||(t[11]=o=>n.questi18n=o)},null,512),[[i,n.questi18n]])])])]),e("div",_,[j,e("div",D,[e("div",E,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[12]||(t[12]=o=>n.movieText=o)},null,512),[[i,n.movieText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Token (Empty)","onUpdate:modelValue":t[13]||(t[13]=o=>n.movieToken=o),readonly:""},null,512),[[i,n.movieToken]])]),e("div",I,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[14]||(t[14]=o=>n.movieContent=o)},null,512),[[i,n.movieContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[15]||(t[15]=o=>n.moviei18n=o)},null,512),[[i,n.moviei18n]])])])]),e("div",V,[U,q,J,M,e("div",R,[e("div",S,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[16]||(t[16]=o=>n.objectText=o)},null,512),[[i,n.objectText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Token (Empty)","onUpdate:modelValue":t[17]||(t[17]=o=>n.objectToken=o),readonly:""},null,512),[[i,n.objectToken]])]),e("div",Q,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[18]||(t[18]=o=>n.objectContent=o)},null,512),[[i,n.objectContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[19]||(t[19]=o=>n.objecti18n=o)},null,512),[[i,n.objecti18n]])])])]),e("div",W,[B,O,A,H,e("div",Y,[e("div",z,[s(e("textarea",{class:"input-field hide-scroll howtotextareas",placeholder:"Input Entry",id:"input-data",readonly:"","onUpdate:modelValue":t[20]||(t[20]=o=>n.recipeText=o)},null,512),[[i,n.recipeText]]),s(e("input",{class:"prefix-field",type:"text",placeholder:"Custom Token (Empty)","onUpdate:modelValue":t[21]||(t[21]=o=>n.recipeToken=o),readonly:""},null,512),[[i,n.recipeToken]])]),e("div",F,[s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"Content.json",id:"content-field",readonly:"","onUpdate:modelValue":t[22]||(t[22]=o=>n.recipeContent=o)},null,512),[[i,n.recipeContent]]),s(e("textarea",{class:"input-field button-padding hide-scroll howtotextareas",placeholder:"i18n",id:"i18n-field",readonly:"","onUpdate:modelValue":t[23]||(t[23]=o=>n.recipei18n=o)},null,512),[[i,n.recipei18n]])])])]),G])])}const te=a(p,[["render",K]]);export{te as default};
