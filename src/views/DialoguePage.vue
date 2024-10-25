<template>
  <PageLayout
      title="Dialogue"
      showCustomPrefix
      showCustomImportToken
      :inputText="inputText"
      :contentText="contentText"
      :i18nText="i18nText"
      :customPrefix="customPrefix"
      :customImportToken="customImport"
      @update:inputText="inputText = $event"
      @update:customPrefix="customPrefix = $event"
      @update:customImportToken="customImport = $event"
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
      customPrefix: '',
      separator: '',
      customImport: '',
    };
  },

  computed: {
    ImportToken() {
      return this.customImport.length > 0 ? `${this.customImport}` : "ImportToken";
    },
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
    customImport: {
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
        this.i18nText = '';
        return false;
      } else if (count === 1 && mixCount > 1) {
        this.contentText = 'Don\'t mix random and regular dialogue.';
        this.i18nText = '';
        return false;
      } else if (titleCount !== 0 && titleCount < mixCount) {
        this.contentText = 'Mails are missing titles, add this to the end of the entry: [#]title';
        this.i18nText = '';
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
      const regex = /"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g;
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
      const mailRegex = /"(.*?)(?<!\\)"\s*:\s*"(.*?(?<!\\))(?="|%|\[#]|$)/g;
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
        const tokenCheck = this.dynamicTokenCheck(dialogue);
        contentResult += `${tokenCheck ? `"${token}": "{{i18n:${prefix}${token} {{${this.ImportToken}}} }}",\n` : `"${token}": "{{i18n:${prefix}${token}}}",\n`}`;
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
        const tokenCheck = this.dynamicTokenCheck(randomItems);
        const dynamicToken = `${tokenCheck ? ` {{${this.ImportToken}}} ` : ``}`

        if (randomItems) {
          if (!randomItemIndex[token]) {
            randomItemIndex[token] = 0;
          }

          const currentIndex = randomItemIndex[token]++;
          randomGroup += `{{i18n:${prefix}${token}.${currentIndex}${dynamicToken}}} ${this.separator} `;
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

        const tokenCheck = this.dynamicTokenCheck(mailText);
        const dynamicToken = `${tokenCheck ? ` {{${this.ImportToken}}} ` : ``}`

        i18nResult += `"${prefix}${mailToken}.title": "${mailTitle}",\n`;
        i18nResult += `"${prefix}${mailToken}.text": "${mailText}",\n`;

        contentResult = contentResult.replace(mailText, `{{i18n:${prefix}${mailToken}.text${dynamicToken}}}`);
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

    dynamicTokenCheck(dialogue) {
      const regex = /[^"]*({{[^}]*}})[^"]*/g;
      let match;
      if ((match = regex.exec(dialogue)) !== null && match[0].length > 4) {
          return true
      }
      else return false;
    },
  },
};
</script>
