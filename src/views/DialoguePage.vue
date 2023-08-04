<template>
  <div class="input-page">
    <div class="input-containers-wrapper">
      <div class="input-container left">
        <!-- Left input field -->
        <textarea class="input-field" placeholder="Raw data" id="raw-data" v-model="inputText"></textarea>
        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customPrefix" />
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
          <img class="copy-button" @click="copyToClipboard('i18n-field')" src="../assets/copy-icon.svg" alt="Copy i18n" />
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="process-button" @click="processData">Process Data</button>
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
      customPrefix: '',
      separator: '',
    };
  },
  methods: {
    // Check for multiple lines of random dialogue
    async checkInput(inputString) {
      const checkRegex = /\|inputSeparator/g;
      const checks = inputString.match(checkRegex);
      const count = checks ? checks.length : 0;
      const mixRegex = /"(.*?)":/g;
      const mixes = inputString.match(mixRegex);
      const mixCount = mixes ? mixes.length : 0;

      if (count > 1) {
        this.contentText = 'Input only one line of random dialogue';
        this.i18nText = 'I\'m too lazy to figure out a way for it to work... sorry';
        return false;
      } else if (count === 1 && mixCount > 1) {
        this.contentText = 'Don\'t mix random and regular dialogue';
        this.i18nText = 'I\'m too lazy to figure out a way for it to work... sorry';
        return false;
      } else {
        return true;
      }
    },

    async cutString(inputString) {
      const separatorRegex = /\|inputSeparator=(..)/;
      const separatorMatch = inputString.match(separatorRegex);

      if (separatorMatch) {
        this.separator = separatorMatch[1];
        return await this.cutStringWithSeparator(inputString);
      } else {
        return await this.cutStringWithoutSeparator(inputString);
      }
    },

    // Method to handle cuts when separator is detected
    async cutStringWithSeparator(inputString) {
      const token_regex = /"(.*?)"/g;
      const tokenMatch = token_regex.exec(inputString);
      if (!tokenMatch) {
        console.error('Token not found.');
        return { cuts: [], separatorMatch: true };
      }

      const token = tokenMatch[1];
      const cuts_regex = new RegExp(
        `(?:Random: ?|${this.separator}|inputSeparator=${this.separator})(.*?)(?=(?:${this.separator}|\\||$))`,
        'g'
      );
      const matches = [];
      let match;
      while ((match = cuts_regex.exec(inputString)) !== null) {
        matches.push(match[1]);
      }

      const cuts = matches.map(match => {
        const randomItems = match.split(this.separator).map(item => item.trim());
        return { token, randomItems };
      });

      return { cuts, separatorMatch: true };
    },

    // Method to handle cuts when separator is not detected
    async cutStringWithoutSeparator(inputString) {
      const regex = /"([^"]+)":\s*"([^"]+)"/g;
      const matches = inputString.matchAll(regex);
      const cuts = [];
      for (const match of matches) {
        const token = match[1];
        const dialogue = match[2];
        cuts.push({ token, dialogue });
      }
      return { cuts, separatorMatch: false };
    },

    // Method to process data when there is no separator
    async processDataWithoutSeparator(cuts) {
      let contentResult = '';
      let i18nResult = '';

      for (const cut of cuts) {
        const { token, dialogue } = cut;
        const prefix = this.customPrefix ? `${this.customPrefix}.` : '';
        contentResult += `"${token}": "{{i18n:${prefix}${token}}}",\n`;
        i18nResult += `"${prefix}${token}": "${dialogue}",\n`;
      }

      this.contentText = contentResult;
      this.i18nText = i18nResult;
    },

    // Method to process data when there is a separator
    async processDataWithSeparator(cuts) {
      let contentResult = '';
      let i18nResult = '';
      let randomItemIndex = {};
      let randomGroup = '';
      for (const cut of cuts) {
        if (cut.randomItems) {
          const { token, randomItems } = cut;
          const prefix = this.customPrefix ? `${this.customPrefix}.` : '';

          if (Array.isArray(randomItems) && randomItems.length > 0) {
            if (!randomItemIndex[token]) {
              randomItemIndex[token] = 0;
            }

            const currentIndex = randomItemIndex[token]++;
            // Check if we need to add a separator between random items
            randomGroup += `{{i18n:${prefix}${token}.${currentIndex}}} ${this.separator} `;
            i18nResult += `"${prefix}${token}.${currentIndex}": "${randomItems[0].trim()}",\n`;
          } else {
            console.error(`Random items not found for token "${token}"`);
          }
        } else {
          const { token, dialogue } = cut;
          const prefix = this.customPrefix ? `${this.customPrefix}.` : '';
          contentResult += `"${token}": "{{i18n:${prefix}${token}}}",\n`;
          i18nResult += `"${prefix}${token}": "${dialogue}",\n`;

          if (randomGroup) {
            // Check if we need to add a separator after content and before random items
            contentResult += `"${token}": "{{Random: ${randomGroup}}},\n`;
            randomGroup = '';
          }
        }
      }

      if (randomGroup) {
        // If there are remaining random items after the loop ends, add them to the contentResult
        contentResult += `"${cuts[cuts.length - 1].token}": "{{Random: ${randomGroup}}},\n`;
        contentResult = contentResult.slice(0, -7) + `|inputSeparator=${this.separator}}},`
      }

      this.contentText = contentResult;
      this.i18nText = i18nResult;
    },

    // Main method to call processData based on separator presence
    async processData() {
      const rawData = this.inputText;
      const isValidInput = await this.checkInput(rawData);

      if (!isValidInput) {
        return;
      }

      const { cuts, separatorMatch } = await this.cutString(rawData);

      if (separatorMatch) {
        await this.processDataWithSeparator(cuts);
      } else {
        await this.processDataWithoutSeparator(cuts);
      }
    },

    // Method to copy text from the textarea to clipboard
    copyToClipboard(textAreaId) {
      const textArea = document.getElementById(textAreaId);
      textArea.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    },
  },
};
</script>
