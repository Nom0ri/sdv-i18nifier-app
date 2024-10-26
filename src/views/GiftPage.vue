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
            const pattern = /^"[^"]+":\s*".*\/.*\/.*\/.*\/.*\/.*"$/;
            if (!pattern.test(inputString.trim())) {
                this.contentText = 'Invalid input';
                this.i18nText = '';
                return false;
            }
            return true;
        },

        extractGiftData(input) {
            // Modify regex to detect {{ModId}} and skip it along with following `_`, `-`, `.` or whitespace
            const giftRegex = /"((?:{{ModId}}[_.\-\s]*)?([^"']+))":\s*"([^"]*)"/i;
            const matches = giftRegex.exec(input);
            
            if (!matches) return null;

            const tokenMatch = matches[2];
            const giftInfo = matches[3].split('/');

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

            const giftData = this.extractGiftData(input);
            if (!giftData) {
                this.contentText = 'Invalid input format';
                this.i18nText = '';
                return;
            }

            let contentText = input;
            let i18nText = '';

            for (const [taste, reaction] of Object.entries(giftData.reactions)) {
                const i18nKey = `${giftData.token}.${taste}`;
                i18nText += `"${i18nKey}": "${reaction}",\n`;
                contentText = contentText.replace(reaction, `{{i18n: ${i18nKey} }}`);
            }

            this.contentText = contentText;
            this.i18nText = i18nText;
        },
    },
};
</script>
