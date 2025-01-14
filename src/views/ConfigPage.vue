<template>
    <PageLayout
    :title="'Config'"
        :isConfigPage="true"
        :inputText="inputText" 
        :i18nText="i18nText" 
        @update:inputText="inputText = $event"
    />
</template>

<script>
import PageLayout from '../components/PageLayout.vue';


export default {
    components: {PageLayout},

    data() {
        return {
            inputText: '',
            i18nText: '',
        };
    },

    watch: {
        inputText: {
            handler(newValue) {
                this.processData(newValue);
            }
        }
    },

    methods: {
        checkInput(inputString) {
            // Check for the presence of key-value pairs inside any object structure
            const matches = inputString.match(/"([^"]+)":\s*{[^}]*}|"(AllowValues|Description|Default|Section)":\s*"[^"]*"/g);

            if (!matches || matches.length === 0) {
                this.i18nText = 'Invalid format. Expected ConfigSchema structure.';
                return false;
            }
            return true;
        },

        processData(inputString) {
            let rawData = this.inputText;

            // Remove the "ConfigSchema" wrapper if it's present
            rawData = rawData.replace(/"ConfigSchema":\s*{/, '');

            const isValidInput = this.checkInput(rawData);
            if (!isValidInput) return;

            // Extract individual config entries (e.g. "Material", "Texture", etc.)
            const configMatches = rawData.match(/"(.*?[^\\])":\s*{[^}]*}|"(?:AllowValues|Description|Default|Section)":\s*"[^"]*"/g);
            let i18nText = '';
            let contentText = inputString;
            let currentKey = '';
            let addedSections = new Set(); // To track sections already processed
            let sectionText = ''; // To collect section entries

            if (configMatches) {
                configMatches.forEach(match => {
                    // Extract key if it matches the object definition (e.g., "Material": {...})
                    const keyMatch = match.match(/"((?:\\.|[^"\\])*)":\s*{/);
                    if (keyMatch) {
                        currentKey = keyMatch[1]; // Set the current key
                        const nameToken = `config.${currentKey}.name`;
                        i18nText += `"${nameToken}": "${currentKey}",\n`;
                    }

                    // Extract "Description", "AllowValues", and "Section" fields
                    const descriptionMatch = match.match(/"Description":\s*"(.*?[^\\])"/);
                    const allowValuesMatch = match.match(/"AllowValues":\s*(['"])((?:\\.|[^"\\])*?)\1/);
                    const sectionMatch = match.match(/"Section":\s*"(.*?[^\\])"/);

                    if (descriptionMatch) {
                        const descriptionToken = `config.${currentKey}.description`;
                        const description = descriptionMatch[1];
                        i18nText += `"${descriptionToken}": "${description}",\n`;
                    }

                    // Handle AllowValues: skip if only "true" and "false" (case insensitive)
                    if (allowValuesMatch) {
                        const values = allowValuesMatch[2].split(',').map(v => v.trim());
                        // Check for "true" and "false" in any case
                        const skipValues = values.map(v => v.toLowerCase());
                        const numericValues = values.filter(v => !isNaN(v)); // Filter numeric values

                        // Skip if only "true" and "false" or if only numeric values
                        if (!(skipValues.length === 2 && skipValues.includes("true") && skipValues.includes("false")) && numericValues.length !== values.length) {
                            values.forEach(value => {
                                // Skip if the value is numeric
                                if (isNaN(value)) {
                                    const valueToken = `config.${currentKey}.values.${value}`;
                                    i18nText += `"${valueToken}": "${value}",\n`;
                                }
                            });
                        }
                    }

                    // Handle section key, if present and not already added
                    if (sectionMatch) {
                        const currentSection = sectionMatch[1];
                        if (!addedSections.has(currentSection)) {
                            const sectionNameToken = `config.section.${currentSection}.name`;
                            const sectionDescriptionToken = `config.section.${currentSection}.description`;

                            // Add section name and description (description is always an empty string)
                            sectionText += `"${sectionNameToken}": "${currentSection}",\n`;
                            sectionText += `"${sectionDescriptionToken}": "",\n`;

                            // Mark this section as added
                            addedSections.add(currentSection);
                        }
                    }

                    // Add empty line after each config entry
                    i18nText += '\n';
                    contentText = this.replaceWithI18nTokens(contentText, currentKey, descriptionMatch, allowValuesMatch);
                });
            }

            // Combine i18nText and sectionText with a blank line in between
            this.i18nText = i18nText.trim();
            if (sectionText) {
                this.i18nText += `\n\n${sectionText.trim()}`;
            }
        },

        replaceWithI18nTokens(contentText, key, descriptionMatch, allowValuesMatch) {
            const keyRegex = new RegExp(`"${key}"`);
            contentText = contentText.replace(keyRegex, `"{{i18n:config.${key}.name}}"`);

            if (descriptionMatch) {
                const description = descriptionMatch[1];
                const escapedDescription = this.escapeRegExp(description);
                const descriptionRegex = new RegExp(`"Description":\\s*"${escapedDescription}"`);
                contentText = contentText.replace(descriptionRegex, `"Description": "{{i18n:config.${key}.description}}"`);
            }

            if (allowValuesMatch) {
                const values = allowValuesMatch[1].split(',').map(v => v.trim());
                // Check for "true" and "false" in any case
                const skipValues = values.map(v => v.toLowerCase());
                // Filter numeric values
                const numericValues = values.filter(v => !isNaN(v));

                // Skip if only "true" and "false" or if only numeric values
                if (!(skipValues.length === 2 && skipValues.includes("true") && skipValues.includes("false")) && numericValues.length !== values.length) {
                    values.forEach(value => {
                        // Skip if the value is numeric
                        if (isNaN(value)) {
                            const escapedValue = this.escapeRegExp(value);
                            const valueRegex = new RegExp(`"${escapedValue}"`);
                            contentText = contentText.replace(valueRegex, `"{{i18n:config.${key}.values.${value}}}"`);
                        }
                    });
                }
            }

            return contentText;
        },

        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },
    },
};
</script>