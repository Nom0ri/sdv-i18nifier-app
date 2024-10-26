<template>
    <div class="text-white text-center home">
        <!-- Tab Navigation -->
        <div class="tab-navigation">
            <button
                v-for="(section, index) in sections"
                :key="index"
                :class="['tab-button', { active: activeTab === index }]"
                @click="activeTab = index"
            >
                {{ section.title }}
            </button>
        </div>
    
        <!-- Display Only the Active Section -->
        <SectionComponent
            v-if="sections[activeTab]"
            :section="sections[activeTab]"
            :isConfigPage="sections[activeTab].isConfigPage"
        />
    </div>
</template>

<script>
import SectionComponent from '../components/SectionHowTo.vue';

export default {

    components: { SectionComponent },

    data() {
    return {
        activeTab: 0, // Set initial active tab to the first section

        sections: [
            {
                title: 'Dialogues',
                descriptions: [
                    'Works with dialogues, mails and random dialogue.',
                    'You can set \'custom prefix\', which makes resulting i18n much more readable and easier to manage.'
                ],
                notes: [
                    'Random dialogues must be converted one at a time; regular can be converted en masse.',
                    'Mails need to have titles.',
                    'Import Token is used for importing tokens into i18n (very specific use cases)'
                ],
                inputText: 'Input Entry\n"winter_7": "Some dialogue"',
                contentText: 'Content.json\n"winter_7": "{{i18n:Optional_Prefix.winter_7}}"',
                i18nText: 'i18n\n"Optional_Prefix.winter_7": "Some dialogue"',
                customPrefix: {
                    model: 'Optional_Prefix'
                },
                customImportToken: {
                    model: ''
                }
            },
            {
                title: 'Events',
                descriptions: [
                    'Works with events and forks',
                    'If Custom Token is inputted, it will become the name of the i18n key. If not, it\'ll just take the event ID.'
                ],
                notes: [
                    'Events/forks need to be converted one by one.',
                    'Import Token is used for importing tokens into i18n (very specific use cases)',
                    '&nbsp;'
                ],
                inputText: 'Input Entry\n"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC \"Dialogue 1$s\"/faceDirection NPC 0/emote NPC 12/speak NPC \"Dialogue 2$a\"/emote farmer 60/speak otherNPC\"Question for the farmer, @?$s\"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"',
                contentText: 'Content.json\n"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC \"{{i18n:EventName.0}}\"/faceDirection NPC 0/emote NPC 12/speak NPC \"{{i18n:EventName.1}}\"/emote farmer 60/speak otherNPC\"{{i18n:EventName.2}}\"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"',
                i18nText: 'i18n\n"EventName.0": "Dialogue 1$s",\n"EventName.1": "Dialogue 2$a",\n"EventName.2": "Question for the farmer, @?$s",',
                customToken: {
                    model: 'EventName'
                },
                customImportToken: {
                    model: ''
                }
            },
            {
                title: 'Quests',
                descriptions: [
                    'Works with all quests and detects if reaction dialogue is present.',
                    'If Custom Token is inputted, it will become the name of the i18n key. If not, it\'ll just take the quest ID.'
                ],
                notes: [
                    'Quests need to be converted one by one.',
                    '&nbsp;',
                    '&nbsp;'
                ],
                inputText: 'Input Entry\n"101": "ItemDelivery/Jodi\'s Request/Jodi needs a fresh cauliflower for a recipe she\'s making. She\'s asking you to bring her one./Bring Jodi a cauliflower./Jodi 190/-1/350/-1/true/Oh, that looks so delicious! Thank you, this is just what I wanted. It\'s going to be perfect for my yellow curry."',
                contentText: 'Content.json\n"101": "ItemDelivery/{{i18n:JodiQuest.title}}/{{i18n:JodiQuest.text}}/{{i18n:JodiQuest.objective}}/Jodi 190/-1/350/-1/true/{{i18n:JodiQuest.reaction}}"',
                i18nText: 'i18n\n"JodiQuest.title": "Jodi\'s Request",\n"JodiQuest.text": "Jodi needs a fresh cauliflower for a recipe she\'s making. She\'s asking you to bring her one.",\n"JodiQuest.objective": "Bring Jodi a cauliflower.",\n"JodiQuest.reaction": "Oh, that looks so delicious! Thank you, this is just what I wanted. It\'s going to be perfect for my yellow curry.",',
                customToken: {
                    model: 'JodiQuest'
                }
            },
            {
                title: 'Movie Reactions',
                descriptions: [
                    'Works with reaction text and scripts. Just paste the whole reaction and done.',
                    'If Custom Token is inputted, it will become the name of the i18n key. If not, it\'ll use the NPC name + ".Movies".'
                ],
                notes: [
                    'Movie reactions need to be converted one NPC at a time.',
                    '&nbsp;',
                    '&nbsp;'
                ],
                inputText: '{\n"NPCName": "Penny",\n"Reactions": [\n{\n"Tag": "*",\n"Response": "love",\n"SpecialResponses": {\n"BeforeMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "Watching a movie with mom sure brings me back!"\n},\n"DuringMovie": {\n"ResponsePoint": null,\n"Script": "/message \"(Pam and Penny are watching intently!)\"",\n"Text": ""\n},\n"AfterMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "It\'s great to be able to do things as a family again!"\n}\n},\n(...)',
                contentText: '{\n"NPCName": "Penny",\n"Reactions": [\n{\n"Tag": "*",\n"Response": "love",\n"SpecialResponses": {\n"BeforeMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "{{i18n:Penny.Movies.0}}"\n},\n"DuringMovie": {\n"ResponsePoint": null,\n"Script": "/message \"{{i18n:Penny.Movies.1}}\",\n"Text": ""\n},\n"AfterMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "{{i18n:Penny.Movies.2}}"\n}\n},\n(...)',
                i18nText: '"Penny.Movies.0": "Watching a movie with mom sure brings me back!",\n"Penny.Movies.1": "(Pam and Penny are watching intently!)",\n"Penny.Movies.2": "It\'s great to be able to do things as a family again!",',
                customToken: {
                    model: ''
                }
            },
            {
                title: 'Object Data',
                descriptions: [
                    'Works with new objects from 1.6 update.',
                    '&nbsp;'
                ],
                notes: [
                    'Works on multiple entries at once.',
                    '&nbsp;',
                    '&nbsp;'
                ],
                inputText: '"875": {\n "Name": "Ectoplasm",\n"DisplayName": "Ectoplasm",\n"Description": "Plasm that got ectoed",\n"Type": "Quest",\n"Category": 0,\n"Price": 0\n},',
                contentText: '"875": {\n "Name": "Ectoplasm",\n"DisplayName": "{{i18n:875.DisplayName}}",\n"Description": "{{i18n:875.Description}}",\n"Type": "Quest",\n"Category": 0,\n"Price": 0\n}',
                i18nText: '"875.DisplayName": "Ectoplasm",\n"875.Description": "Plasm that got ectoed",',
                customPrefix: {
                    model: ''
                }
            },
            {
                title: 'Recipes',
                descriptions: [
                    'Works with both crafting and cooking recipes.',
                    '&nbsp;'
                ],
                notes: [
                    'Works on multiple entries at once.',
                    'If there is no Translation Name, i18n token will be added either way.',
                    'If there are spaces in the English name, they will be replaced with "_" in the tokens.'
                ],
                inputText: '"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/TranslationName",\n"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/",',
                contentText: '"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/{{i18n:Salad.DisplayName}}",\n"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/{{i18n:Wild_Bait.DisplayName}}",',
                i18nText: '"Salad.DisplayName": "TranslationName",\n"Wild_Bait.DisplayName": "",',
                customToken: {
                    model: ''
                }
            },
            {
                title: 'Gift Tastes',
                descriptions: [
                    'Works with reactions for Gift Tastes',
                    '&nbsp;'
                ],
                notes: [
                    'Works on multiple entries at once.',
                    'If the entry includes {{ModId}} in the ID, it will be skipped for i18n keys.',
                    '&nbsp;'
                ],
                inputText: '"{{ModId}}_Example": "Reaction love/66/Reaction like//Reaction dislike/-5/Reaction hate/330/Reaction neutral//",\n\n"Abigail": "I seriously love this!/66 128/This looks delicious!//What am I supposed to do with this?/-5 -75/What were you thinking?/330/Thanks.// ",',
                contentText: '"{{ModId}}_Example": "{{i18n: Example.love}}/66/{{i18n: Example.like}}//{{i18n: Example.dislike}}/-5/{{i18n: Example.hate}}/330/{{i18n: Example.neutral}}//",\n\n"Abigail": "{{i18n: Abigail.love}}/66 128/{{i18n: Abigail.like}}//{{i18n: Abigail.dislike}}/-5 -75/{{i18n: Abigail.hate}}/330/{{i18n: Abigail.neutral}}// ",',
                i18nText: '"Example.love": "Reaction love",\n"Example.like": "Reaction like",\n"Example.dislike": "Reaction dislike",\n"Example.hate": "Reaction hate",\n"Example.neutral": "Reaction neutral",\n\n"Abigail.love": "I seriously love this!",\n"Abigail.like": "This looks delicious!",\n"Abigail.dislike": "What am I supposed to do with this?",\n"Abigail.hate": "What were you thinking?",\n"Abigail.neutral": "Thanks.",',
                customPrefix: {
                    model: ''
                }
            },
            {
                title: 'Config',
                descriptions: [
                    'Creates i18n from mod configs.',
                ],
                notes: [
                    'Works on multiple config options at once.',
                    'If sections are used, an empty "config.section.&lt;section name&gt;.description" key will be created automatically.',
                    'Supports single quotes and escaped characters.',
                    '<em>true</em> and <em>false</em> will be skipped'
                ],
                inputText: '"ConfigSchema": {\n    "Material": {\n        "AllowValues": "Wood, Metal",\n        "Default": "Wood",\n        "Section": "Appearance"\n    },\n    "Enabled": {\n        "AllowValues": "true, false",\n        "Default": "true"\n    }\n},',
                contentText: '',
                i18nText: '"config.Material.name": "Material",\n"config.Material.values.Wood": "Wood",\n"config.Material.values.Metal": "Metal",\n\n"config.Enabled.name": "Enabled",\n\n"config.section.Appearance.name": "Appearance",\n"config.section.Appearance.description": "",',
                customField: null,
                isConfigPage: true
            }
        ]
    };
}

}
</script>