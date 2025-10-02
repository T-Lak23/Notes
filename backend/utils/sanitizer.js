import sanitizeHtml from "sanitize-html";

export const sanitizeInput = (input) => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
  });
};
