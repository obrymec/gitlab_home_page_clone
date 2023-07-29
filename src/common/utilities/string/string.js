/**
* @fileoverview Defines common methods for string
*   treatment.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2021-07-28
* @updated 2023-07-28
* @file string.js
* @type {String}
* @version 0.0.2
*/

/**
 * @description Removes noise characters
 *  from a literal string.
 * @param {{
 *  clearSpaces: boolean=,
 *  input: String
 * }} data The formatter data configs.
 *  It supports the following keys:
 *  - String input: The string to
 *    clear.
 *  - boolean= clearSpaces: Whether
 *    we wish to remove all spaces
 *    on the string.
 * @function clearStr
 * @public
 * @returns {String} String
 */
function clearStr ({
  clearSpaces = false,
  input
}) {
  // Returns the cleared
  // shape of the given
  // input string.
  return (
    input
      ?.replaceAll ('\n', '')
      ?.replaceAll ('\t', '')
      ?.trim ()
  ).replaceAll (
    (clearSpaces ? ' ' : ''),
    ''
  );
}

/** 
 * @description Exports all
 *  public features.
 * @exports *
 */
export {clearStr};
