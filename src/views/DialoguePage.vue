<template>
  <div class="input-page">
    <h2 class="page-header text-2xl mb-4">Dialogues</h2>
    <div class="input-containers-wrapper">
      <div class="input-container left">
        <!-- Left input field -->
        <textarea class="input-field hide-scroll" placeholder="Input entry" id="input-data" v-model="inputText"></textarea>
        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customPrefix" />
      </div>
      <div class="input-container right">
        <!-- Right input fields -->
        <div class="copy-button-placement">
          <textarea class="input-field button-padding hide-scroll" placeholder="Content.json" id="content-field" readonly
            v-model="contentText"></textarea>
          <img class="copy-button" @click="copyToClipboard('content-field')" src="../assets/copy-icon.svg"
            alt="Copy Content" />
        </div>
        <div class="copy-button-placement">
          <textarea class="input-field button-padding hide-scroll" placeholder="i18n" id="i18n-field" readonly
            v-model="i18nText"></textarea>
          <img class="copy-button" @click="copyToClipboard('i18n-field')" src="../assets/copy-icon.svg" alt="Copy i18n" />
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
      customPrefix: '',
      separator: '',
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
    customPrefix: {
      handler() {
        this.processData(this.inputText);
      },
    },
  },
  
  methods: {
    checkInput(inputString) {
      const checkRegex = /\|inputSeparator/g;
      const count = (inputString.match(checkRegex) || []).length;
      const mixRegex = /"(.*?)":/g;
      const mixCount = (inputString.match(mixRegex) || []).length;

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

    cutString(inputString) {
      const separatorRegex = /\|inputSeparator=(..)/;
      const separatorMatch = inputString.match(separatorRegex);

      if (separatorMatch) {
        this.separator = separatorMatch[1];
        return this.cutStringWithSeparator(inputString);
      } else {
        return this.cutStringWithoutSeparator(inputString);
      }
    },

    cutStringWithSeparator(inputString) {
      const tokenRegex = /"(.*?)"/g;
      const [, token] = tokenRegex.exec(inputString) || [];
      if (!token) {
        console.error('Token not found.');
        return { cuts: [], separatorMatch: true };
      }

      const cutsRegex = new RegExp(
        `(?:Random: ?|${this.separator}|inputSeparator=${this.separator})(.*?)(?=(?:${this.separator}|\\||$))`,
        'g'
      );
      const matches = [];
      let match;
      while ((match = cutsRegex.exec(inputString)) !== null) {
        matches.push(match[1]);
      }

      const cuts = matches.map(match => {
        const randomItems = match.split(this.separator).map(item => item.trim());
        return { token, randomItems };
      });

      return { cuts, separatorMatch: true };
    },

    cutStringWithoutSeparator(inputString) {
      const regex = /"([^"]+)":\s*"([^"]+)"/g;
      const cuts = [];
      let match;
      while ((match = regex.exec(inputString)) !== null) {
        const [, token, dialogue] = match;
        cuts.push({ token, dialogue });
      }
      return { cuts, separatorMatch: false };
    },

    processDataWithoutSeparator(cuts) {
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

    processDataWithSeparator(cuts) {
      let contentResult = '';
      let i18nResult = '';
      let randomItemIndex = {};
      let randomGroup = '';
      for (const cut of cuts) {
        const { token, randomItems, dialogue } = cut;
        const prefix = this.customPrefix ? `${this.customPrefix}.` : '';

        if (randomItems) {
          if (!randomItemIndex[token]) {
            randomItemIndex[token] = 0;
          }

          const currentIndex = randomItemIndex[token]++;
          randomGroup += `{{i18n:${prefix}${token}.${currentIndex}}} ${this.separator} `;
          i18nResult += `"${prefix}${token}.${currentIndex}": "${randomItems[0].trim()}",\n`;
        } else {
          contentResult += `"${token}": "{{i18n:${prefix}${token}}}",\n`;
          i18nResult += `"${prefix}${token}": "${dialogue}",\n`;

          if (randomGroup) {
            contentResult += `"${token}": "{{Random: ${randomGroup}}},\n`;
            randomGroup = '';
          }
        }
      }

      if (randomGroup) {
        contentResult += `"${cuts[cuts.length - 1].token}": "{{Random: ${randomGroup}}},`;
        contentResult = contentResult.slice(0, -6) + `|inputSeparator=${this.separator}}},`;
      }

      this.contentText = contentResult;
      this.i18nText = i18nResult;
    },

    processData() {
      const rawData = this.inputText;
      const isValidInput = this.checkInput(rawData);

      if (!isValidInput) {
        return;
      }

      const { cuts, separatorMatch } = this.cutString(rawData);

      if (separatorMatch) {
        this.processDataWithSeparator(cuts);
      } else {
        this.processDataWithoutSeparator(cuts);
      }
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
