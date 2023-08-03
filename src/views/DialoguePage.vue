<template>
  <div class="input-page">
    <div class="input-container left">
      <!-- Left input field -->
      <textarea class="input-field" placeholder="Raw data" id="raw-data" v-model="inputText"></textarea>
      <input type="text" placeholder="Custom Prefix" v-model="customPrefix" />
    </div>
    <div class="input-container right">
      <!-- Right input fields -->
      <textarea class="input-field" placeholder="Content.json" id="content-field" readonly
        v-model="contentText"></textarea>
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
      separator: '',
    };
  },
  methods: {
    // Check for multiple lines of random dialogue
    async checkInput(inputString) {
      const checkRegex = /\|inputSeparator/g;
      const checks = inputString.match(checkRegex);
      const count = checks ? checks.length : 0;
      console.log('Check: ', count);

      if (count > 1) {
        console.log('Input only one line of random dialogue');
        return false;
      }

      return true;
    },

    async cutString(inputString) {
      const separatorRegex = /\|inputSeparator=(..)/;
      const separatorMatch = inputString.match(separatorRegex);

      if (separatorMatch) {
        this.separator = separatorMatch[1];
        console.log('Separator:', this.separator);
        return await this.cutStringWithSeparator(inputString);
      } else {
        console.log('No Separator Found');
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
      console.log('Token: ', token);
      const cuts_regex = new RegExp(
        `(?:Random: ?|${this.separator}|inputSeparator=${this.separator})(.*?)(?=(?:${this.separator}|\\||$))`,
        'g'
      );
      const matches = [];
      let match;
      while ((match = cuts_regex.exec(inputString)) !== null) {
        matches.push(match[1]);
      }
      console.log('Matches: ', matches);

      const cuts = matches.map(match => {
        const randomItems = match.split(this.separator).map(item => item.trim());
        console.log('Random Items:', randomItems);
        return { token, randomItems };
      });

      console.log('Cuts:', cuts);
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
      console.log('Cuts:', cuts);
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
            const itemSeparator = randomItems.length - 1 ? ` ${this.separator} ` : '';
            console.log('itemSeparator: ', itemSeparator)
            randomGroup += `{{i18n:${prefix}${token}.${currentIndex}}} ${this.separator} `;
            console.log('Random Group: ', randomGroup)
            console.log('Random Items: ', randomItems)
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
        this.contentText = '';
        this.i18nText = '';
        return;
      }

      const { cuts, separatorMatch } = await this.cutString(rawData);

      if (separatorMatch) {
        await this.processDataWithSeparator(cuts);
      } else {
        await this.processDataWithoutSeparator(cuts);
      }
    },
  },
};
</script>