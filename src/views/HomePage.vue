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
        </div>
        <div class="footer">
            <span class="version-label">Version: 1.4.0</span>
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
    </div>
</template>
