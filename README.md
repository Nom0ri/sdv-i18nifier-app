# Web i18n Converter for Stardew Valley Modding

Tool for easily managing and converting Content Patcher mods to i18n format for easier localization.

Hosted on GitHub Pages: https://nom0ri.github.io/sdv-i18nifier-app/

## Features
### Dialogues
Supports the conversion of dialogues, random dialogue, and mail, each with its own output format.
### Events
Searches for `speak`, `question`, `quickQuestion`, `end dialogue`, `splitSpeak` and `textAboveHead` commands, then converts the following dialogue to i18n. Modified string is returned for easy copying into content.json and i18n files.

### Custom prefix & custom token
Custom prefix field allows users to optionally add more complex naming to i18n keys for better visibility and organization of dialogues.

Custom token field can be used to name i18n keys acquired from events for the same purpose.