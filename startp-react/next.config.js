const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    trailingSlash: true,
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
    },
    pageExtensions: ["landing-page.js"],

}