<template>
    <PageLayout
        title="Furniture"
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
            const matches = inputString.match(/"([^"]+)":\s*"([^"]+)"\s*,?/g);

            if (!matches || matches.length === 0) {
                this.contentText = 'Incorrect format';
                this.i18nText = '';
                return false;
                } else {
                    return true;
                }
        },
        
        processData(inputString) {
            const rawData = this.inputText;
            const isValidInput = this.checkInput(rawData);

            if (!isValidInput) {
                return;
            }
        
        const regex = /"([^"]+)":\s*"([^"]+)"\s*,?/g;
        let contentText = '';
        let i18nText = '';
        const matches = inputString.match(regex);

        if (matches) {
            matches.forEach(match => {
                const [, rawId, text] = match.match(/"([^"]+)":\s*"([^"]+)"\s*,?/);
                const tokenID = cleanToken(rawId).replace(/\s+/g, '_');
                const tokenName = this.customToken
                    ? `${this.customToken}.${tokenID}.DisplayName`
                    : `${tokenID}.DisplayName`;

                const slashIdx = [...text.matchAll(/\//g)].map(m => m.index);
                const idx7 = slashIdx[6], idx8 = slashIdx[7];

                let i18nKey, newText;
                if (idx7 !== undefined) {
                    i18nKey = text.slice(idx7 + 1, idx8 ?? undefined);
                    newText = text.slice(0, idx7 + 1) + `{{i18n:${tokenName}}}` + (idx8 ? text.slice(idx8) : '');
                }

                i18nText += `"${tokenName}": "${i18nKey}",\n`;
                contentText += `"${rawId}": "${newText}",\n`;
            });
        }

        if (i18nText.trim() !== '') {
            this.contentText = contentText.trim() + '\n';
        } else {
            this.contentText = '';
        }

        this.i18nText = i18nText.trim();
    },
    },
};
</script>