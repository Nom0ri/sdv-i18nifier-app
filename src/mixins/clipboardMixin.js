export const clipboardMixin = {
    methods: {
        copyToClipboard(textAreaId) {
            const textArea = document.getElementById(textAreaId);
            if (textArea) {
                textArea.select();
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
            }
        },
    },
};