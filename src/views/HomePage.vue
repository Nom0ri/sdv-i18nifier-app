<template>
    <div class="text-white text-center home">
        <img src="../assets/logo.svg" alt="Logo" class="w-32 h-32 mx-auto mb-4 logo" />
        <div class="home-content">
            <h1 class="text-4xl font-bold mb-4">Web i18n Converter for Stardew Valley Modding</h1>
            <p class="text-lg mb-6">
                Welcome to the Web i18n Converter for Stardew Valley Modding. This tool allows you to easily
                manage and convert regular ol' CP to i18n format.
            </p>
            <div class="mb-6">
                <div class="router-button">
                    <router-link to="/howto" class="button-link">
                        <span class="button-text">Usage Instructions</span>
                    </router-link>
                </div>
            </div>
            <button class="changelog-button" @click="openChangelog">Changelog</button>
        </div>
        <div class="footer">
            <span class="version-label">Version: {{ version }}</span>
            <p class="text-lg downspace">Found any bugs? Contact me here:</p>
            <div class="icon-links">
                <a href="https://github.com/Nom0ri/sdv-i18nifier-app/issues" target="_blank" aria-label="GitHub">
                    <img src="../assets/github-icon.svg" alt="GitHub" width="48" height="48">
                </a>
                <a href="https://discord.gg/YvcEsP6B" target="_blank" aria-label="Discord">
                    <img src="../assets/discord-icon.svg" alt="Discord" width="48" height="48" class="discord-icon">
                </a>
            </div>
        </div>

        <div v-if="showChangelog" class="changelog-overlay" @click="closeOverlay">
            <div class="changelog-content" @click.stop>
                <span class="close" @click="closeOverlay">&times;</span>
                <h2 class="text-xl font-bold mb-2">What's New</h2>
                <div v-html="changelogContent"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showChangelog: false,
            changelogContent: '',
            version: '1.0.0',
        };
    },
    mounted() {
        this.fetchChangelogVersion();
    },
    methods: {
        async fetchChangelogVersion() {
            try {
                const response = await fetch('/changelog.md');
                const text = await response.text();
                this.version = this.extractVersion(text);
            } catch (error) {
                console.error('Error fetching changelog version:', error);
            }
        },
        async openChangelog() {
            try {
                const response = await fetch('/changelog.md');
                const text = await response.text();
                this.changelogContent = this.convertMarkdownToHTML(text);
                this.showChangelog = true;
            } catch (error) {
                console.error('Error fetching changelog:', error);
            }
        },

        closeOverlay() {
            this.showChangelog = false;
        },

        extractVersion(changelog) {
            const versionMatch = changelog.match(/Version\s*\s*(\d+\.\d+\.\d+)/);
            return versionMatch ? versionMatch[1] : 'Unknown';
        },

        convertMarkdownToHTML(markdown) {
            return markdown
                .replace(/#/g, '<h1>')
                .replace(/##/g, '<h2>')
                .replace(/###/g, '<h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
        },
    },
};
</script>
