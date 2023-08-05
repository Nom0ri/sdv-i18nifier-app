<template>
    <div class="text-white text-center home">
        <div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Dialogues:</strong></p>
                <p class="text-lg">Works with dialogues, mails and random dialogue.</p>
                <p class="text-lg">You can set 'custom prefix', which makes resulting i18n much more readable and easier to
                    manage.</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Random dialogues must be converted one at a time, regular can be converten en masse.</p>
                <p class="text-lg">Mails need to have titles.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input entry" id="input-data" readonly
                            v-model="inputText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customPrefix" readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                            <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                                id="content-field" readonly v-model="contentText"></textarea>
                            <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n" id="i18n-field"
                                readonly v-model="i18nText"></textarea>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-2xl mb-6"><strong>Events:</strong></p>
                <p class="text-lg">Works event and forks</p>
                <p class="text-lg">If Custom Token is inputted it will become the name of the i18n key, if not it'll just take the event ID.</p>
                <p class="text-xl space">Notes:</p>
                <p class="text-lg">Events/forks need to be converted one by one.</p>
                <div class="howtotextareas">
                    <div class="input-container left">
                        <!-- Left input field -->
                        <textarea class="input-field hide-scroll howtotextareas" placeholder="Input Entry" id="input-data" readonly
                            v-model="eventText"></textarea>
                        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customToken" readonly />
                    </div>
                    <div class="input-container right">
                        <!-- Right input fields -->
                            <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="Content.json"
                                id="content-field" readonly v-model="eventContent"></textarea>
                            <textarea class="input-field button-padding hide-scroll howtotextareas" placeholder="i18n" id="i18n-field"
                                readonly v-model="eventi18n"></textarea>
                    </div>
                </div>
            </div>
            <p class="text-lg downspace">If you find any problems, post an issue on my github or let me know through Discord: nom0ri</p>
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
      customToken: 'EventName'
    };
  },
}
</script>