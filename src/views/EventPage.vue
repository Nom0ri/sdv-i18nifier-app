<template>
    <div class="input-page">
        <h2 class="page-header text-2xl mb-4">Events</h2>
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
                        alt="Copy Content" />
                </div>
                <div class="copy-button-placement">
                    <textarea class="input-field button-padding hide-scroll" placeholder="i18n" id="i18n-field" readonly
                        v-model="i18nText"></textarea>
                    <img class="copy-button" @click="copyToClipboard('i18n-field')" src="../assets/copy-icon.svg"
                        alt="Copy i18n" />
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
            const eventRegex = /\/speak [^"]+"([^"]+)\\/g; // Updated regex pattern
            const cuts = [];
            let cut;
            while ((cut = eventRegex.exec(inputString)) !== null) {
                cuts.push(cut[1]);
            }
            return cuts;
        },

        processData(inputString) {
            const token = this.findToken(inputString);
            const cuts = this.cutString(inputString);
            let i18nText = '';
            let contentText = inputString;

            for (let idx = 0; idx < cuts.length; idx++) {
                const cut = cuts[idx];
                const i18nKey = `"${token}.${idx}"`;
                const i18nValue = `"${cut}"`;
                const toReplace = `${cut}`;
                i18nText += `${i18nKey}: ${i18nValue},\n`;
                contentText = contentText.replace(toReplace, `{{i18n:${token}.${idx}}}`);
            }

            this.contentText = contentText.trim();
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