<template>
    <div class="input-page">
        <h2 class="page-header text-2xl mb-4">Events</h2>
        <div class="input-containers-wrapper">
            <div class="input-container left">
                <!-- Left input field -->
                <textarea class="input-field" placeholder="Input entry" id="input-data" v-model="inputText"></textarea>
                <input class="prefix-field" type="text" placeholder="Custom Token" v-model="customToken" />
            </div>
            <div class="input-container right">
                <!-- Right input fields -->
                <div class="copy-button-placement">
                    <textarea class="input-field button-padding" placeholder="Content.json" id="content-field" readonly
                        v-model="contentText"></textarea>
                    <img class="copy-button" @click="copyToClipboard('content-field')" src="../assets/copy-icon.svg"
                        alt="Copy Content" />
                </div>
                <div class="copy-button-placement">
                    <textarea class="input-field button-padding" placeholder="i18n" id="i18n-field" readonly
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
        // Watch for changes in the customPrefix and trigger processData whenever it changes.
        customToken: {
            handler() {
                this.processData(this.inputText);
            },
        },
    },

    methods: {

        findToken(inputString) {
            const customToken = this.customToken.trim();
            if (customToken) {
                return customToken;
            }

            const tokenRegex = /^"(.*?)":/;
            const match = inputString.match(tokenRegex);
            if (match && match[1]) {
                return match[1];
            }

            return '';
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