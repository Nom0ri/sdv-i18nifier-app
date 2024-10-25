<template>
    <div class="text-white text-center home">
        <SectionComponent v-for="(section, index) in sections" :key="index" :section="section" />
        <p class="text-lg downspace">Found any bugs? Contact me here:</p>
        <div class="icon-links">
            <a href="https://github.com/Nom0ri/sdv-i18nifier-app/issues" target="_blank" aria-label="GitHub">
                <img src="../assets/github-icon.svg" alt="GitHub" width="48" height="48">
            </a>
            <a href="https://discord.gg/YvcEsP6B" target="_blank" aria-label="Discord">
                <img src="../assets/discord-icon.svg" alt="Discord" width="48" height="48" class="discord-icon">
            </a>
        </div>
    </div>
</template>

<script>
import SectionComponent from '../components/SectionHowTo.vue';

export default {

    components: { SectionComponent },

    data() {
    return {
        sections: [
            {
                title: 'Dialogues',
                descriptions: [
                    'Works with dialogues, mails and random dialogue.',
                    'You can set \'custom prefix\', which makes resulting i18n much more readable and easier to manage.'
                ],
                notes: [
                    'Random dialogues must be converted one at a time; regular can be converted en masse.',
                    'Mails need to have titles.'
                ],
                inputText: 'Input Entry\n"winter_7": "Some dialogue"',
                contentText: 'Content.json\n"winter_7": "{{i18n:Optional_Prefix.winter_7}}"',
                i18nText: 'i18n\n"Optional_Prefix.winter_7": "Some dialogue"',
                customField: {
                    placeholder: 'Custom Prefix (Empty)',
                    model: 'Optional_Prefix'
                }
            },
            {
                title: 'Events',
                descriptions: [
                    'Works with events and forks',
                    'If Custom Token is inputted, it will become the name of the i18n key. If not, it\'ll just take the event ID.'
                ],
                notes: [
                    'Events/forks need to be converted one by one.'
                ],
                inputText: 'Input Entry\n"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC \"Dialogue 1$s\"/faceDirection NPC 0/emote NPC 12/speak NPC \"Dialogue 2$a\"/emote farmer 60/speak otherNPC\"Question for the farmer, @?$s\"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"',
                contentText: 'Content.json\n"92xxxx": "friendship NPC-50/faceDirection NPC3 true/jump NPC/emote NPC12/emote otherNPC 8/speak otherNPC \"{{i18n:EventName.0}}\"/faceDirection NPC 0/emote NPC 12/speak NPC \"{{i18n:EventName.1}}\"/emote farmer 60/speak otherNPC\"{{i18n:EventName.2}}\"/emote farmer 40/pause 500/switchEvent 93xxxxx_fork"',
                i18nText: 'i18n\n"EventName.0": "Dialogue 1$s",\n"EventName.1": "Dialogue 2$a",\n"EventName.2": "Question for the farmer, @?$s",',
                customField: {
                    placeholder: 'Custom Token (Empty)',
                    model: 'EventName'
                }
            },
            {
                title: 'Quests',
                descriptions: [
                    'Works with all quests and detects if reaction dialogue is present.',
                    'If Custom Token is inputted, it will become the name of the i18n key; if not, it\'ll just take the quest ID.'
                ],
                notes: [
                    'Quests need to be converted one by one.'
                ],
                inputText: 'Input Entry\n"101": "ItemDelivery/Jodi\'s Request/Jodi needs a fresh cauliflower for a recipe she\'s making. She\'s asking you to bring her one./Bring Jodi a cauliflower./Jodi 190/-1/350/-1/true/Oh, that looks so delicious! Thank you, this is just what I wanted. It\'s going to be perfect for my yellow curry."',
                contentText: 'Content.json\n"101": "ItemDelivery/{{i18n:JodiQuest.title}}/{{i18n:JodiQuest.text}}/{{i18n:JodiQuest.objective}}/Jodi 190/-1/350/-1/true/{{i18n:JodiQuest.reaction}}"',
                i18nText: 'i18n\n"JodiQuest.title": "Jodi\'s Request",\n"JodiQuest.text": "Jodi needs a fresh cauliflower for a recipe she\'s making. She\'s asking you to bring her one.",\n"JodiQuest.objective": "Bring Jodi a cauliflower.",\n"JodiQuest.reaction": "Oh, that looks so delicious! Thank you, this is just what I wanted. It\'s going to be perfect for my yellow curry.",',
                customField: {
                    placeholder: 'Custom Prefix',
                    model: 'JodiQuest'
                }
            },
            {
                title: 'Movie Reactions',
                descriptions: [
                    'Works with reaction text and scripts. Just paste the whole reaction and done.',
                    'If Custom Token is inputted, it will become the name of the i18n key; if not, it\'ll use the NPC name + ".Movies" (e.g., "Penny.Movies").'
                ],
                notes: [
                    'Movie reactions need to be converted one NPC at a time.'
                ],
                inputText: '{\n"NPCName": "Penny",\n"Reactions": [\n{\n"Tag": "*",\n"Response": "love",\n"SpecialResponses": {\n"BeforeMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "Watching a movie with mom sure brings me back!"\n},\n"DuringMovie": {\n"ResponsePoint": null,\n"Script": "/message \"(Pam and Penny are watching intently!)\"",\n"Text": ""\n},\n"AfterMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "It\'s great to be able to do things as a family again!"\n}\n},\n(...)',
                contentText: '{\n"NPCName": "Penny",\n"Reactions": [\n{\n"Tag": "*",\n"Response": "love",\n"SpecialResponses": {\n"BeforeMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "{{i18n:Penny.Movies.0}}"\n},\n"DuringMovie": {\n"ResponsePoint": null,\n"Script": "/message \"{{i18n:Penny.Movies.1}}\",\n"Text": ""\n},\n"AfterMovie": {\n"ResponsePoint": null,\n"Script": "",\n"Text": "{{i18n:Penny.Movies.2}}"\n}\n},\n(...)',
                i18nText: '"Penny.Movies.0": "Watching a movie with mom sure brings me back!",\n"Penny.Movies.1": "(Pam and Penny are watching intently!)",\n"Penny.Movies.2": "It\'s great to be able to do things as a family again!",',
                customField: {
                    placeholder: 'Custom Token (Empty)',
                    model: ''
                }
            },
            {
                title: 'Data Objects',
                descriptions: [
                    'Works with new data objects from 1.6 update.'
                ],
                notes: [
                    'Works on multiple entries at once.'
                ],
                inputText: '"875": {\n "Name": "Ectoplasm",\n"DisplayName": "Ectoplasm",\n"Description": "Plasm that got ectoed",\n"Type": "Quest",\n"Category": 0,\n"Price": 0\n},',
                contentText: '"875": {\n "Name": "Ectoplasm",\n"DisplayName": "{{i18n:875.DisplayName}}",\n"Description": "{{i18n:875.Description}}",\n"Type": "Quest",\n"Category": 0,\n"Price": 0\n}',
                i18nText: '"875.DisplayName": "Ectoplasm",\n"875.Description": "Plasm that got ectoed",',
                customField: {
                    placeholder: 'Custom Prefix (Empty)',
                    model: ''
                }
            },
            {
                title: 'Recipes',
                descriptions: [
                    'Works with both crafting and cooking recipes.'
                ],
                notes: [
                    'Works on multiple entries at once.',
                    'If there is no Translation Name, i18n token will be added either way.',
                    'If there are spaces in the English name, they will be replaced with "_" in the tokens.'
                ],
                inputText: '"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/TranslationName",\n"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/",',
                contentText: '"Salad": "20 1 22 1 419 1/25 5/196/f Emily 3/{{i18n:Salad.DisplayName}}",\n"Wild Bait": "771 10 684 5 766 5/Home/774 5/false/null/{{i18n:Wild_Bait.DisplayName}}",',
                i18nText: '"Salad.DisplayName": "TranslationName",\n"Wild_Bait.DisplayName": "",',
                customField: {
                    placeholder: 'Custom Token (Empty)',
                    model: ''
                }
            }
        ]
    };
}

}
</script>