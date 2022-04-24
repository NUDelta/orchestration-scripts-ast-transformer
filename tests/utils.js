/**
 * Strips leading/trailing space from a block of test.
 * @param {string} textBlock block of text where leading/trailing space from each line should be trimmed.
 * @returns {string} block of text with leading/trailing space removed.
 */
const trimLeadingTrailingSpace = function (textBlock) {
  // strip space from each line
  let textBlockLines = textBlock.split("\n");
  let strippedLines = textBlockLines.map((line) => {
    return line.trim();
  });

  // combine lines and return
  return strippedLines.join("\n");
};

/**
 * Prepares two blocks of code for comparison by trimming leading space.
 * @param {string} receivedCode code block that was manipulated by transforms.
 * @param {string} expectedCode code block that we expect received code to be.
 * @returns [string, string] array with received code and expected code as strings.
 */
export const prepareCodeForEqualityTesting = function (receivedCode, expectedCode) {
  return [
    trimLeadingTrailingSpace(receivedCode.toString()),
    trimLeadingTrailingSpace(expectedCode.toString()),
  ];
};
