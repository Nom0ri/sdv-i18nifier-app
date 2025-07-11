<template>
    <PageLayout
        title="Quests"
        showCustomToken
        :inputText="inputText"
        :contentText="contentText"
        :i18nText="i18nText"
        :customToken="customToken"
        @update:inputText="inputText = $event"
        @update:customToken="customToken = $event"
    />
  </template>
  
  
  <script>
  import PageLayout from '../components/PageLayout.vue';
  import { cleanToken } from '../utils/scriptUtils.js';

  export default {
    components: { PageLayout },

    data() {
        return {
            inputText: '',
            contentText: '',
            i18nText: '',
            customToken: '',
        };
    },

    watch: {
        inputText: {
            handler(newValue) {
                this.processData(newValue);
            },
        },
        customToken: {
            handler() {
                this.processData(this.inputText);
            },
        },
    },

    methods: {

        checkInput(inputString) {
            const checkRegex = /"([^"]+)":\s*"((?:\\"|[^"])*)"/g;
            const checkCount = (inputString.match(checkRegex) || []).length;
            if (checkCount > 1) {
                this.contentText = 'Only one quest at a time.';
                this.i18nText = '';
                return false;
            } else if (checkCount < 1) {
                this.contentText = 'Invalid input';
                this.i18nText = '';
                return false;
            } else {
                return true;
            }
        },

        extractQuestInfo(input) {
            const questInfo = input.split('/');
            const tokenRegex = /"(.*?)":/g;
            if (questInfo.length >= 5) {
                const title = questInfo[1];
                const questDetails = questInfo[2];
                const hint = questInfo[3];
                let reactionText = questInfo[9] || null;
                const reactionToReplace = /(?:", *|" *)/g;
                if (reactionText) {
                    reactionText = reactionText.replace(reactionToReplace, ``)
                }

                let token = null;
                if (this.customToken.trim().length === 0) {
                    const tokenMatch = tokenRegex.exec(input);
                    if (tokenMatch && tokenMatch[1]) {
                        token = cleanToken(tokenMatch[1]);
                    }
                } else {
                    token = cleanToken(this.customToken);
                }

                return {
                    token,
                    title,
                    questDetails,
                    hint,
                    reactionText,
                };
            }

            return null;
        },

        processData(input) {
            const isValidInput = this.checkInput(input);

            if (!isValidInput) {
                return;
            }

            const questInfo = this.extractQuestInfo(input);
            if (questInfo) {
                let contentText = input;
                contentText = contentText.replace(questInfo.title, `{{i18n:${questInfo.token}.title}}`);
                contentText = contentText.replace(questInfo.questDetails, `{{i18n:${questInfo.token}.text}}`);
                contentText = contentText.replace(questInfo.hint, `{{i18n:${questInfo.token}.objective}}`);
                let i18nText = `"${questInfo.token}.title": "${questInfo.title}",\n"${questInfo.token}.text": "${questInfo.questDetails}",\n"${questInfo.token}.objective": "${questInfo.hint}",\n`;
                if (questInfo.reactionText && questInfo.reactionText.trim() !== '') {
                    const reactionText = questInfo.reactionText.replace(/(\r\n|\n|\r)/gm, "");
                    contentText = contentText.replace(reactionText, `{{i18n:${questInfo.token}.reaction}}`);
                    i18nText += `"${questInfo.token}.reaction": "${reactionText}",`;
                } else {
                    this.i18nText = '';
                }
                this.contentText = contentText;
                this.i18nText = i18nText;
            } else {
                this.contentText = 'Invalid input format';
                this.i18nText = '';
            }
        },
    },
};
</script>
