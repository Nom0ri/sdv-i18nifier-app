<template>
  <div class="input-page">
    <h2 class="page-header text-2xl mb-4">Dialogues</h2>
    <div class="input-containers-wrapper">
      <div class="input-container left">
        <!-- Left input field -->
        <textarea class="input-field hide-scroll" placeholder="Input entry" id="input-data"
          v-model="inputText"></textarea>
        <input class="prefix-field" type="text" placeholder="Custom Prefix" v-model="customPrefix" />
      </div>
      <div class="input-container right">
        <!-- Right input fields -->
        <div class="copy-button-placement">
          <textarea class="input-field button-padding hide-scroll" placeholder="Content.json" id="content-field" readonly
            v-model="contentText"></textarea>
          <img class="copy-button" @click="copyToClipboard('content-field')" src="../assets/copy-icon.svg"
            alt="Copy Content" title="Copy" />
        </div>
        <div class="copy-button-placement">
          <textarea class="input-field button-padding hide-scroll" placeholder="i18n" id="i18n-field" readonly
            v-model="i18nText"></textarea>
          <img class="copy-button" @click="copyToClipboard('i18n-field')" src="../assets/copy-icon.svg" alt="Copy i18n"
            title="Copy" />
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
      const titleRegex = /\[\#\][^\"]/g;
      const titleCount = (inputString.match(titleRegex) || []).length;

      if (count > 1) {
        this.contentText = 'Input only one line of random dialogue.';
        this.i18nText = 'Maybe I\'ll add the ability to convert more at once later.';
        return false;
      } else if (count === 1 && mixCount > 1) {
        this.contentText = 'Don\'t mix random and regular dialogue.';
        this.i18nText = 'Maybe I\'ll add the ability to convert more at once later.';
        return false;
      } else if (titleCount !== 0 && titleCount < mixCount) {
        this.contentText = 'It seems some mails are missing titles, they are optional, but it\'s still nice to have them.\n\n Add this to the end of the entry: [#]title';
        this.i18nText = 'I\'m not just saying it, because I can\'t find a way to distinguish mails from dialogues without it... definitely not.';
        return false;
      } else {
        return true;
      }
    },

    cutString(inputString) {
      const separatorRegex = /\|inputSeparator=(..)/;
      const separatorMatch = inputString.match(separatorRegex);
      const titleRegex = /(?:\[\#\])(.*?)(?=\")/g;
      const mailMatch = inputString.match(titleRegex);

      if (separatorMatch) {
        this.separator = separatorMatch[1];
        return this.cutStringWithSeparator(inputString);
      } else if (mailMatch) {
        return this.cutMail(inputString);
      }
      else {
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
      const regex = /"((?:\\.|[^"\\])*)":\s*"((?:\\.|[^"\\])*)"/g;
      const cuts = [];
      let match;
      while ((match = regex.exec(inputString)) !== null) {
        const [, token, dialogue] = match;
        const unescapedToken = token.replace(/\\(")/g, '\\"');
        const unescapedDialogue = dialogue.replace(/\\(")/g, '\\"');
        cuts.push({ token: unescapedToken, dialogue: unescapedDialogue });
      }
      return { cuts, separatorMatch: false };
    },

    cutMail(inputString) {
      const mailRegex = /"(.*?)(?<!\\)": "(.*?(?<!\\))(?="|%|\[#]|$)/g;
      const titleRegex = /(?:\[\#\])(.*?)(?=\")/g;
      const cuts = [];
      let match;
      let currentCut = {};

      while ((match = mailRegex.exec(inputString)) !== null) {
        const mailToken = match[1]
        const mailText = match[2].trim()

        const titleMatch = titleRegex.exec(inputString);
        if (titleMatch !== null) {
          const mailTitle = titleMatch[1];

          currentCut = {
            mailToken,
            mailText,
            mailTitle,
          };

          cuts.push(currentCut);
        }
      }

      return { cuts, mailMatch: true };
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
        contentResult = contentResult.slice(0, -6) + `|inputSeparator=${this.separator}}}",\n`;
      }

      this.contentText = contentResult;
      this.i18nText = i18nResult;
    },

    processMailData(cuts) {
      let contentResult = this.inputText;
      let i18nResult = '';
      const prefix = this.customPrefix ? `${this.customPrefix}.` : '';

      for (const cut of cuts) {
        const { mailToken, mailTitle, mailText } = cut;

        i18nResult += `"${prefix}${mailToken}.title": "${mailTitle}",\n`;
        i18nResult += `"${prefix}${mailToken}.text": "${mailText}",\n`;

        contentResult = contentResult.replace(mailText, `{{i18n:${prefix}${mailToken}.text}}`);
        contentResult = contentResult.replace(mailTitle, `{{i18n:${prefix}${mailToken}.title}}`);
      }

      this.contentText = contentResult.trim() + `\n`;
      this.i18nText = i18nResult.trim();
    },

    processData() {
      const rawData = this.inputText;
      const isValidInput = this.checkInput(rawData);

      if (!isValidInput) {
        return;
      }

      const { cuts, separatorMatch, mailMatch } = this.cutString(rawData);
      if (separatorMatch) {
        this.processDataWithSeparator(cuts);
      } else if (mailMatch) {
        this.processMailData(cuts);
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
