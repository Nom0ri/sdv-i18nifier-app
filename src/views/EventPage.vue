<template>
    <PageLayout
        title="Events"
        showCustomToken
        showCustomImportToken
        :inputText="inputText"
        :contentText="contentText"
        :i18nText="i18nText"
        :customToken="customToken"
        :customImportToken="customImport"
        @update:inputText="inputText = $event"
        @update:customToken="customToken = $event"
        @update:customImportToken="customImport = $event"
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
            customImport: '',
        };
    },

    computed: {
        ImportToken() {
            return this.customImport.length > 0 ? `${this.customImport}` : "ImportToken";
        },
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
        customImport: {
            handler() {
                this.processData(this.inputText);
            },
        },
    },

    methods: {
        checkInput(inputString) {
            const mixRegex = /"(.*?)":/g;
            const mixCount = (inputString.match(mixRegex) || []).length;

            if (mixCount > 1) {
                this.contentText = 'Only one event at a time.';
                this.i18nText = '';
                return false;
            } else {
                return true;
            }
        },

        findToken(inputString) {
            const tokenRegex = /(?:"|")([\w.]+)(?:"|\/)/;
            const match = inputString.match(tokenRegex);

            if (this.customToken.trim().length === 0) {
                if (match && match[1]) {
                    const token = match[1];
                    return token;
                }
            }
            else {
                const token = this.customToken;
                return token
            }
        },

        cutString(inputString) {
            const eventRegex = /(?:(?:\/|\\\\|\r?\n)speak|question|message|end dialogue|splitSpeak|textAboveHead|\(break\)speak)[^"]*"([^"]+)\\|(?:\/quickQuestion (.*?)\(break\))/g;
            const cuts = [];
            let cut;
            while ((cut = eventRegex.exec(inputString)) !== null) {
                if (cut[1] !== undefined) {
                    cuts.push(cut[1]);
                }
                else if (cut[2] !== undefined) {
                    cuts.push(cut[2]);
                }
            }
            return cuts;
        },

        processData(inputString) {
            const rawData = this.inputText;
            const isValidInput = this.checkInput(rawData);

            if (!isValidInput) {
                return;
            }
            const token = this.findToken(inputString);
            const cuts = this.cutString(inputString);
            let i18nText = '';
            let contentText = inputString;

            for (let idx = 0; idx < cuts.length; idx++) {
                const cut = cuts[idx];
                const i18nKey = `"${token}.${idx}"`;
                const i18nValue = `"${cut}"`;
                const toReplace = `${cut}`;
                const tokenCheck = this.dynamicTokenCheck(cut);
                i18nText += `${i18nKey}: ${i18nValue},\n`;
                contentText = contentText.replace(toReplace, tokenCheck ? `{{i18n:${token}.${idx} {{${this.ImportToken}}} }}` : `{{i18n:${token}.${idx}}}`);
            }

            if (i18nText.trim() !== '') {
                this.contentText = contentText.trim() + `\n`;
            } else {
                this.contentText = '';
            }
            this.i18nText = i18nText.trim();
        },

        dynamicTokenCheck(dialogue) {
            const regex = /[^"]*({{[^}]*}})[^"]*/g;
            let match;
            if ((match = regex.exec(dialogue)) !== null && match[0].length > 4) {
                return true
            }
            else return false;
        },
    },
};
</script>