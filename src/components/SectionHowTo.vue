<!-- SectionComponent.vue -->
<template>
    <div class="mb-6">
        <p class="text-2xl mb-6"><strong>{{ section.title }}</strong></p>
        <p class="text-lg" v-for="description in section.descriptions" :key="description">{{ description }}</p>
        <p class="text-xl space">Notes:</p>
        <p class="text-lg" v-for="note in section.notes" :key="note">{{ note }}</p>
        <div class="howtotextareas">
            <div class="input-container left">
                <textarea class="input-field hide-scroll" placeholder="Input entry" readonly :value="section.inputText"></textarea>
                <input class="prefix-field" type="text" :placeholder="section.customField.placeholder" readonly :value="section.customField.model" />
            </div>
            <div class="input-container right">
                <textarea class="input-field button-padding hide-scroll" placeholder="Content.json" readonly :value="section.contentText"></textarea>
                <textarea class="input-field button-padding hide-scroll" placeholder="i18n" readonly :value="section.i18nText"></textarea>
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
        }
    }
};
</script>