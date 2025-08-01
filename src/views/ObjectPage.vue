<template>
    <PageLayout
        title="Object Data"
        showCustomPrefix
        :inputText="inputText"
        :contentText="contentText"
        :i18nText="i18nText"
        :customPrefix="customPrefix"
        @update:inputText="inputText = $event"
        @update:customPrefix="customPrefix = $event"
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
            customPrefix: '',
        };
    },

    watch: {
        inputText: {
            handler(newValue) {
                this.processData(newValue);
            },
        },
        customPrefix: {
            handler() {
                this.processData(this.inputText);
            },
        },
    },

    methods: {
        checkInput(inputString) {
            const sanitizedInput = inputString.replace(/{{ModId}}_/g, '');
            const matches = sanitizedInput.match(/"([^"]+)":\s*{[^}]*\s*"DisplayName":\s*"([^"]*)",?\s*"Description":\s*"([^"]*)"/g);

            if (!matches || matches.length === 0) {
                this.contentText = 'Incorrect format';
                this.i18nText = 'Input needs to have at least this info:\n"<ID>": {\n \t\t ...\n \t\t "DisplayName": "<DisplayName>",\n \t\t "Description": "<Description>", \n \t\t ... \n\t\t}';
                return false;
            } else {
                return true;
            }
        },

        processData(inputString) {
            const isValidInput = this.checkInput(inputString);

            if (!isValidInput) {
                return;
            }

            const matches = inputString.match(/"([^"]+)":\s*{[^}]*\s*"DisplayName":\s*"([^"]*)",?\s*"Description":\s*"([^"]*)"/g);
            let i18nText = '';
            let contentText = inputString;

            if (matches) {
                matches.forEach(match => {
                    const [, rawId, displayName, description] = match.match(/"([^"]+)":\s*{[^}]*\s*"DisplayName":\s*"([^"]*)",?\s*"Description":\s*"([^"]*)"/);
                    const id = cleanToken(rawId);
                    const nameToken = `${this.customPrefix.length > 0 ? this.customPrefix + '.' : ''}${id}.DisplayName`;
                    const descriptionToken = `${this.customPrefix.length > 0 ? this.customPrefix + '.' : ''}${id}.Description`;

                    i18nText += `"${nameToken}": "${displayName}",\n`;
                    i18nText += `"${descriptionToken}": "${description}",\n`;

                    const escapedDisplayName = this.escapeRegExp(displayName);
                    const escapedDescription = this.escapeRegExp(description);

                    const displayNameRegex = new RegExp(`"DisplayName":\\s*("${escapedDisplayName}")`);
                    const descriptionRegex = new RegExp(`"Description":\\s*("${escapedDescription}")`);

                    contentText = contentText.replace(displayNameRegex, `"DisplayName": "{{i18n:${nameToken}}}"`);
                    contentText = contentText.replace(descriptionRegex, `"Description": "{{i18n:${descriptionToken}}}"`);
                });
            }

            this.contentText = i18nText.trim() ? `${contentText}\n` : '';
            this.i18nText = i18nText.trim();
        },

        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },
    },
};
</script>