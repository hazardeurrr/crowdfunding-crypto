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
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
      }
}