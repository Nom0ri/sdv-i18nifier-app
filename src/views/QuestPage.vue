<template>
    <div class="input-page">
        <h2 class="page-header text-2xl mb-4">Quests</h2>
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
                        token = tokenMatch[1];
                    }
                } else {
                    token = this.customToken;
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
                contentText.replace(questInfo.title, `{{i18n:${questInfo.token}.title}}`)
                .replace(questInfo.questDetails, `{{i18n:${questInfo.token}.text}}`)
                .replace(questInfo.hint, `{{i18n:${questInfo.token}.objective}}`);
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

        copyToClipboard(textAreaId) {
            const textArea = document.getElementById(textAreaId);
            textArea.select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
    },
};
</script>
