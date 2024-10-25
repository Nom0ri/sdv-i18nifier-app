<template>
    <PageLayout
        title="Recipes"
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
                const [, id, text] = match.match(/"([^"]+)":\s*"([^"]+)"\s*,?/);
                const tokenID = id.replace(/\s+/g, '_')
                const tokenName = `${this.customToken.length > 0 ? this.customToken + '.' + `${tokenID}.DisplayName`: `${tokenID}.DisplayName`}`;
                const i18nKey = text.substring(text.lastIndexOf('/') + 1);
                i18nText += `"${tokenName}": "${i18nKey}",\n`;
                const toReplace = `/${i18nKey}"`;
                const appendText = `"${id}": "${text}",\n`;
                contentText += appendText.replace(toReplace, `/{{i18n:${tokenName}}}"`)
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
