/**
 * Strips leading/trailing space from a block of test.
 * @param {string} textBlock block of text where leading/trailing space from each line should be trimmed.
 * @returns {string} block of text with leading/trailing space removed.
 */
export const trimLeadingTrailingSpace = function (textBlock) {
  // strip space from each line
  let textBlockLines = textBlock.split("\n");
  let strippedLines = textBlockLines.map((line) => {
    return line.trim();
  });

  // combine lines and return
  return strippedLines.join("\n");
};
