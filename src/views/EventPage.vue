<template>
    <div class="input-page">
        <h2 class="page-header text-2xl mb-4">Events</h2>
        <div class="input-containers-wrapper">
            <div class="input-container left">
                <!-- Left input field -->
                <textarea class="input-field hide-scroll" placeholder="Input entry" id="input-data"
                    v-model="inputText"></textarea>
                <input class="prefix-field" type="text" placeholder="Custom Token" v-model="customToken" />
                <input class="prefix-field" type="text" placeholder="Custom Import Token" v-model="customImport" />
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
            customImport: '',
        };
    },

    computed: {
        ImportToken() {
            return this.customImport.length > 0 ? `${this.customImport}` : "ImportToken";
        },
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
        // Watch for changes in the customImport and trigger processData whenever it changes.
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
                this.i18nText = 'Maybe I\'ll add the ability to convert more at once later.';
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
            const eventRegex = /(?:(?:\/|\\\\)speak|(?:\/|\\\\)question|(?:\/|\\\\)message|(?:\/|\\\\)end dialogue|(?:\/|\\\\)splitSpeak|(?:\/|\\\\)textAboveHead|\(break\)speak)[^"]*"([^"]+)\\|(?:\/quickQuestion (.*?)\(break\))/g;
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

        copyToClipboard(textAreaId) {
            const textArea = document.getElementById(textAreaId);
            textArea.select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
    },
};
</script>