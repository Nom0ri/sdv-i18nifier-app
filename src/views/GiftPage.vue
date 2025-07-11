<template>
    <PageLayout
        title="Gift Taste Data"
        showCustomPrefix
        :inputText="inputText"
        :contentText="contentText"
        :i18nText="i18nText"
        :customPrefix="customPrefix"
        @update:inputText="inputText = $event"
        @update:customPrefix="customPrefix = $event"
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
            customPrefix: '',
        };
    },

    watch: {
        inputText: {
            handler(newValue) {
                this.processData(newValue);
            },
        },
        customPrefix: {
            handler() {
                this.processData(this.inputText);
            },
        },
    },

    methods: {
        checkInput(inputString) {
            const pattern = /^("[^"]+":\s*".*\/.*\/.*\/.*\/.*\/.*",?\s*)+$/;
            if (!pattern.test(inputString.trim())) {
                this.contentText = 'Invalid input';
                this.i18nText = '';
                return false;
            }
            return true;
        },

        extractGiftData(input) {
            const giftRegex = /"([^"]+)":\s*"([^"]*)"/g;
            const matches = giftRegex.exec(input);
            
            if (!matches) return null;

            const rawToken = matches[1];
            const tokenMatch = cleanToken(rawToken);
            const giftInfo = matches[2].split('/');

            const token = this.customPrefix.trim()
                ? `${this.customPrefix}.${tokenMatch}`
                : tokenMatch;

            return {
                token,
                reactions: {
                    love: giftInfo[0].trim(),
                    like: giftInfo[2].trim(),
                    dislike: giftInfo[4].trim(),
                    hate: giftInfo[6].trim(),
                    neutral: giftInfo[8].trim(),
                },
            };
        },

        processData(input) {
            const isValidInput = this.checkInput(input);
            if (!isValidInput) return;

            const entries = input.match(/"[^"]+":\s*"[^"]*"/g);
            if (!entries) {
                this.contentText = 'Invalid input format';
                this.i18nText = '';
                return;
            }

            let contentText = input;
            let i18nText = '';

            for (const entry of entries) {
                const giftData = this.extractGiftData(entry);
                if (!giftData) continue;

                for (const [taste, reaction] of Object.entries(giftData.reactions)) {
                    const i18nKey = `${giftData.token}.${taste}`;
                    i18nText += `"${i18nKey}": "${reaction}",\n`;
                    contentText = contentText.replace(reaction, `{{i18n:${i18nKey}}}`);
                }
                i18nText += `\n`;
            }

            this.contentText = contentText;
            this.i18nText = i18nText;
        },
    },
};
</script>
