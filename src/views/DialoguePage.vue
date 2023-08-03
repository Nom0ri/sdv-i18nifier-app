<template>
    <div class="input-page">
      <div class="input-container left">
        <!-- Left input field -->
        <textarea class="input-field" placeholder="Raw data" id="raw-data" v-model="inputText"></textarea>
        <input type="text" placeholder="Custom Prefix" v-model="customPrefix" />
      </div>
      <div class="input-container right">
        <!-- Right input fields -->
        <textarea class="input-field" placeholder="Content.json" id="content-field" readonly v-model="contentText"></textarea>
        <textarea class="input-field" placeholder="i18n" id="i18n-field" readonly v-model="i18nText"></textarea>
      </div>
      <button @click="processData">Process Data</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputText: '',
        contentText: '',
        i18nText: '',
        customPrefix: '',
      };
    },
    methods: {
      processData() {
        const rawData = this.inputText;
        const regex = /"([^"]+)":\s*"([^"]+)"/g;
        const matches = rawData.matchAll(regex);
        let contentResult = '';
        let i18nResult = '';
  
        for (const match of matches) {
          const token = match[1];
          const dialogue = match[2];
          const prefix = this.customPrefix ? `${this.customPrefix}.` : '';
          contentResult += `"${token}": "{{i18n:${prefix}${token}}}",\n`;
          i18nResult += `"${prefix}${token}": "${dialogue}",\n`;
        }
  
        this.contentText = contentResult;
        this.i18nText = i18nResult;
      },
    },
  };
  </script>
  