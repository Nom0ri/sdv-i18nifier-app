<template>
    <div class="text-white text-center home">
        <div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Dialogues:</strong></p>
                <p class="text-lg">Works with dialogues, mails and random dialogue.</p>
                <p class="text-lg">You can set 'custom prefix', which makes resulting i18n much more readable and easier to
                    manage.</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Random dialogues must be converted one at a time, regular can be converted en masse.</p>
                <p class="text-lg">Mails need to have titles.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input entry" id="input-data"
                            readonly v-model="inputText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customPrefix"
                            readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                            id="content-field" readonly v-model="contentText"></textarea>
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n"
                            id="i18n-field" readonly v-model="i18nText"></textarea>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Events:</strong></p>
                <p class="text-lg">Works with events and forks</p>
                <p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it'll just
                    take the event ID.</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Events/forks need to be converted one by one.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input Entry" id="input-data"
                            readonly v-model="eventText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customToken"
                            readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                            id="content-field" readonly v-model="eventContent"></textarea>
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n"
                            id="i18n-field" readonly v-model="eventi18n"></textarea>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Quests:</strong></p>
                <p class="text-lg">Works with all quests and detects if reaction dialogue is present.</p>
                <p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it'll just
                    take the quest ID.</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Quests need to be converted one by one.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input Entry" id="input-data"
                            readonly v-model="questText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="questToken" readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                            id="content-field" readonly v-model="questContent"></textarea>
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n"
                            id="i18n-field" readonly v-model="questi18n"></textarea>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Movie Reactions:</strong></p>
                <p class="text-lg">Works with reaction text and scripts. Just paste the whole reaction and done.</p>
                <p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it'll use the
                    NPC name + ".Movies" (E.g. "Penny.Movies").</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Movie reactions need to be converted one NPC by one.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input Entry" id="input-data"
                            readonly v-model="movieText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Token (Empty)" v-model="movieToken"
                            readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                            id="content-field" readonly v-model="movieContent"></textarea>
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n"
                            id="i18n-field" readonly v-model="moviei18n"></textarea>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Data Objects:</strong></p>
                <p class="text-lg">Works with new data objects from 1.6 update</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Works on multiple entries at once.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input Entry" id="input-data"
                            readonly v-model="objectText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Token (Empty)" v-model="objectToken"
                            readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                            id="content-field" readonly v-model="objectContent"></textarea>
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n"
                            id="i18n-field" readonly v-model="objecti18n"></textarea>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Recipes:</strong></p>
                <p class="text-lg">Works both crafting and cooking recipes.</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Works on multiple entries at once. If there is no Translation Name i18n token will be added either way. If there are spaces in the english name, they will be replaced with '_' in the tokens.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input Entry" id="input-data"
                            readonly v-model="recipeText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Token (Empty)" v-model="recipeToken"
                            readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                            id="content-field" readonly v-model="recipeContent"></textarea>
                        <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n"
                            id="i18n-field" readonly v-model="recipei18n"></textarea>
                    </div>
                </div>
            </div>
            <p class="text-lg downspace">If you find any problems, post an issue on my github or let me know through
                Discord: nom0ri</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputText: 'Input Entry\n\"winter_7\": \"Some dialogue\"',
            contentText: 'Content.json\n\"winter_7\": \"{{i18n:Optional_Prefix.winter_7}}\"',
            i18nText: 'i18n\n"Optional_Prefix.winter_7": "Some dialogue"',
            customPrefix: 'Optional_Prefix',
            eventText: 'Input Entry\n"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC \"Dialogue 1$s\"/faceDirection NPC 0/emote NPC 12/speak NPC \"Dialogue 2$a\"/emote farmer 60/speak otherNPC\"Question for the farmer, @?$s\"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"',
            eventContent: 'Content.json\n"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC \"{{i18n:EventName.0}}\"/faceDirection NPC 0/emote NPC 12/speak NPC \"{{i18n:EventName.1}}\"/emote farmer 60/speak otherNPC\"{{i18n:EventName.2}}\"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"',
            eventi18n: 'i18n\n"EventName.0": "Dialogue 1$s",\n"EventName.1": "Dialogue 2$a",\n"EventName.2": "Question for the farmer, @?$s",',
            customToken: 'EventName',
            questText: 'Input Entry\n"101": "ItemDelivery/Jodi\'s Request/Jodi needs a fresh cauliflower for a recipe she\'s making. She\'s asking you to bring her one./Bring Jodi a cauliflower./Jodi 190/-1/350/-1/true/Oh, that looks so delicious! Thank you, this is just what I wanted. It\'s going to be perfect for my yellow curry."',
            questContent: 'Content.json\n"101": "ItemDelivery/{{i18n:JodiQuest.title}}/{{i18n:JodiQuest.text}}/{{i18n:JodiQuest.objective}}/Jodi 190/-1/350/-1/true/{{i18n:JodiQuest.reaction}}"',
            questi18n: 'i18n\n"JodiQuest.title": "Jodi\'s Request",\n"JodiQuest.text": "Jodi needs a fresh cauliflower for a recipe she\'s making. She\'s asking you to bring her one.",\n"JodiQuest.objective": "Bring Jodi a cauliflower.",\n"JodiQuest.reaction": "Oh, that looks so delicious! Thank you, this is just what I wanted. It\'s going to be perfect for my yellow curry.",',
            questToken: 'JodiQuest',
            movieText: '{\n"NPCName": "Penny",\n"Reactions": [\n{\n"Tag": "*",\n"Response": "love",\n"SpecialResponses": {\n"BeforeMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "Watching a movie with mom sure brings me back!"\n},\n"DuringMovie": {\n"ResponsePoint": null,\n"Script": "/message \"(Pam and Penny are watching intently!)\"",\n"Text": ""\n},\n"AfterMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "It\'s great to be able to do things as a family again!"\n}\n},\n(...)',
            movieContent: '{\n"NPCName": "Penny",\n"Reactions": [\n{\n"Tag": "*",\n"Response": "love",\n"SpecialResponses": {\n"BeforeMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "{{i18n:Penny.Movies.0}}"\n},\n"DuringMovie": {\n"ResponsePoint": null,\n"Script": "/message \"{{i18n:Penny.Movies.1}}\",\n"Text": ""\n},\n"AfterMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "{{i18n:Penny.Movies.2}}"\n}\n},\n(...)',
            moviei18n: '"Penny.Movies.0": "Watching a movie with mom sure brings me back!",\n"Penny.Movies.1": "(Pam and Penny are watching intently!)",\n"Penny.Movies.2": "It\'s great to be able to do things as a family again!",',
            movieToken: '',
            objectText: '"875": {\n "Name": "Ectoplasm",\n"DisplayName": "Ectoplasm",\n"Description": "Plasm that got ectoed",\n"Type": "Quest",\n"Category": 0,\n"Price": 0\n},',
            objectContent: '"875": {\n "Name": "Ectoplasm",\n"DisplayName": "{{i18n:875.DisplayName}}",\n"Description": "{{i18n:875.Description}}",\n"Type": "Quest",\n"Category": 0,\n"Price": 0\n}',
            objecti18n: '"875.DisplayName": "Ectoplasm",\n"875.Description": "Plasm that got ectoed",',
            objectToken: '',
            recipeText: '"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/TranslationName",\n"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/",',
            recipeContent: '"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/{{i18n:Salad.DisplayName}}",\n"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/{{i18n:Wild_Bait.DisplayName}}",',
            recipei18n: '"Salad.DisplayName": "TranslationName",\n"Wild_Bait.DisplayName": "",',
            recipeToken: ''
        };
    },
}
</script>