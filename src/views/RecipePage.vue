<template>
    <div class="input-page">
        <h2 class="page-header text-2xl mb-4">Recipes</h2>
        <div class="input-containers-wrapper">
            <div class="input-container left">
                <!-- Left input field -->
                <textarea class="input-field hide-scroll" placeholder="Input entry" id="input-data"
                    v-model="inputText"></textarea>
                <input class="prefix-field" type="text" placeholder="Custom Token" v-model="customToken" />
            </div>
            <div class="input-container right">
                <!-- Right input fields -->
                <div class="copy-button-placement">
                    <textarea class="input-field button-padding hide-scroll" placeholder="Content.json" id="content-field"
                        readonly v-model="contentText"></textarea>
                    <img class="copy-button" @click="copyToClipboard('content-field')" src="../assets/copy-icon.svg"
                        alt="Copy Content" title="Copy" />
                </div>
                <div class="copy-button-placement">
                    <textarea class="input-field button-padding hide-scroll" placeholder="i18n" id="i18n-field" readonly
                        v-model="i18nText"></textarea>
                    <img class="copy-button" @click="copyToClipboard('i18n-field')" src="../assets/copy-icon.svg"
                        alt="Copy i18n" title="Copy" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputText: '',
            contentText: '',
            i18nText: '',
            customToken: '',
        };
    },

    watch: {
        // Watch for changes in the inputText and trigger processData whenever it changes.
        inputText: {
            handler(newValue) {
                this.processData(newValue);
            },
        },
        // Watch for changes in the customToken and trigger processData whenever it changes.
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
                //const tokenName = `${id}.DisplayName`;
                const tokenName = `${this.customToken.length > 0 ? this.customToken + '.' + `${id}.DisplayName`: `${id}.DisplayName`}`;
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



        copyToClipboard(textAreaId) {
            const textArea = document.getElementById(textAreaId);
            textArea.select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
    },
};
</script>
