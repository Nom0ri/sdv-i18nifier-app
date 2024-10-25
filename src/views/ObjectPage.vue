<template>
    <PageLayout
        title="Object Data"
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
            const sanitizedInput = inputString.replace(/{{ModId}}_/g, '').replace(/}}/g, '');
            const isValidInput = this.checkInput(sanitizedInput);

            if (!isValidInput) {
                return;
            }

            const matches = sanitizedInput.match(/"([^"]+)":\s*{[^}]*\s*"DisplayName":\s*"([^"]*)",?\s*"Description":\s*"([^"]*)"/g);
            let i18nText = '';
            let contentText = inputString;

            if (matches) {
                matches.forEach(match => {
                    const [, id, displayName, description] = match.match(/"([^"]+)":\s*{[^}]*\s*"DisplayName":\s*"([^"]*)",?\s*"Description":\s*"([^"]*)"/);

                    const nameToken = `${this.customToken.length > 0 ? this.customToken + '.' : ''}${id}.DisplayName`;
                    const descriptionToken = `${this.customToken.length > 0 ? this.customToken + '.' : ''}${id}.Description`;

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