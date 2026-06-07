const sanitizeHtml = require('sanitize-html');

function sanitizeBodyHtml(content) {
  return sanitizeHtml(String(content || ''), {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's', 'blockquote',
      'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4',
      'pre', 'code', 'img',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'class'],
      p: ['class'],
      h1: ['class'],
      h2: ['class'],
      h3: ['class'],
      h4: ['class'],
      blockquote: ['class'],
      ul: ['class'],
      ol: ['class'],
      li: ['class', 'data-list'],
      pre: ['class'],
    },
    allowedClasses: {
      p: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h1: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h2: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h3: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      h4: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      blockquote: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      ul: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      ol: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      li: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      pre: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
      img: ['ql-align-center', 'ql-align-right', 'ql-align-justify'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: attribs.target || '_blank',
        },
      }),
    },
  }).trim();
}

module.exports = { sanitizeBodyHtml };
