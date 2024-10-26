<template>
    <div class="mb-6">
        <p class="text-2xl mb-6"><strong>{{ section.title }}</strong></p>
        <p class="text-lg" v-for="description in section.descriptions" :key="description">{{ description }}</p>
        <template v-if="section.notes">
            <p class="text-xl space">Notes:</p>
            <p class="text-lg" v-for="note in section.notes" :key="note" v-html="note"></p>
        </template>
        <div class="howtotextareas">
            <div class="input-container left">
                <textarea
                    class="input-field hide-scroll"
                    placeholder="Input entry"
                    readonly
                    :value="section.inputText"
                ></textarea>
                <template v-if="section.customToken">
                    <input
                        class="prefix-field"
                        type="text"
                        placeholder="Custom Token (Empty)"
                        :value="section.customToken.model"
                        readonly
                    />
                </template>
                <template v-if="section.customPrefix">
                    <input
                        class="prefix-field"
                        type="text"
                        placeholder="Custom Prefix (Empty)"
                        :value="section.customPrefix.model"
                        readonly
                    />
                </template>
                <template v-if="section.customImportToken">
                    <input
                        class="prefix-field"
                        type="text"
                        placeholder="Custom Import Token (Empty)"
                        :value="section.customImportToken.model"
                        readonly
                    />
                </template>
            </div>

            <div class="input-container right" v-if="!isConfigPage">
                    <textarea
                        class="input-field button-padding hide-scroll"
                        placeholder="Content.json"
                        readonly
                        :value="section.contentText"
                    ></textarea>
                    <textarea
                        class="input-field button-padding hide-scroll"
                        placeholder="i18n"
                        readonly
                        :value="section.i18nText"
                    ></textarea>
            </div>

            <div class="input-container right" v-if="isConfigPage">
                <textarea
                    class="input-field button-padding hide-scroll"
                    placeholder="i18n"
                    readonly
                    :value="section.i18nText"
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        section: {
            type: Object,
            required: true
        },
        isConfigPage: {
            type: Boolean,
            default: false
        }
    }
};
</script>
