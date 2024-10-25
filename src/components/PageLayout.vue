<template>
    <div class="input-page">
        <h2 class="page-header text-2xl mb-4">{{ title }}</h2>
        <div class="input-containers-wrapper">
            <div class="input-container left">
                <textarea
                    class="input-field hide-scroll"
                    placeholder="Input entry"
                    id="input-data"
                    :value="inputText"
                    @input="updateInputText"
                ></textarea>

                <template v-if="showCustomToken">
                    <input class="prefix-field" type="text" placeholder="Custom Token" :value="customToken" @input="updateCustomToken" />
                </template>
                <template v-if="showCustomPrefix">
                    <input class="prefix-field" type="text" placeholder="Custom Prefix" :value="customPrefix" @input="updateCustomPrefix" />
                </template>
                <template v-if="showCustomImportToken">
                    <input class="prefix-field" type="text" placeholder="Custom Import Token" :value="customImportToken" @input="updateCustomImportToken" />
                </template>
            </div>

            <div class="input-container right">
                <div v-if="!isConfigPage">
                    <div class="copy-button-placement">
                        <textarea
                            class="input-field button-padding hide-scroll"
                            placeholder="Content.json"
                            id="content-field"
                            readonly
                            :value="contentText"
                        ></textarea>
                        <img class="copy-button" @click="copyToClipboard('content-field')" src="../assets/copy-icon.svg" alt="Copy Content" title="Copy" />
                    </div>
                </div>
                <div :class="{'copy-button-placement': true, 'config-area': isConfigPage}">
                    <textarea
                        class="input-field button-padding hide-scroll"
                        placeholder="i18n"
                        id="i18n-field"
                        readonly
                        :value="i18nText"
                    ></textarea>
                    <img class="copy-button" @click="copyToClipboard('i18n-field')" src="../assets/copy-icon.svg" alt="Copy i18n" title="Copy" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, required: true },
        showCustomToken: { type: Boolean, default: false },
        showCustomPrefix: { type: Boolean, default: false },
        showCustomImportToken: { type: Boolean, default: false },
        isConfigPage: { type: Boolean, default: false },
        inputText: { type: String, required: true },
        contentText: { type: String, required: false },
        i18nText: { type: String, required: true },
        customPrefix: { type: String, required: false },
        customToken: { type: String, required: false },
        customImportToken: { type: String, required: false },
    },
    methods: {
        updateInputText(event) {
            this.$emit('update:inputText', event.target.value);
        },
        updateCustomToken(event) {
            this.$emit('update:customToken', event.target.value);
        },
        updateCustomPrefix(event) {
            this.$emit('update:customPrefix', event.target.value);
        },
        updateCustomImportToken(event) {
            this.$emit('update:customImportToken', event.target.value);
        },
        copyToClipboard(fieldId) {
            const field = document.getElementById(fieldId);
            field.select();
            document.execCommand('copy');
        },
    },
};
</script>
