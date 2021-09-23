const sanitize = require("sanitize-html");

const cleanify = (html) => {
    return sanitize(html, {
        allowedTags: [],
        allowedAttributes: [],
        disallowedTagsMode: 'discard',
    });
}

module.exports = cleanify