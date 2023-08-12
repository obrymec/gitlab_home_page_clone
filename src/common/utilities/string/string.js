/**
* @fileoverview Defines common methods for string
*   treatment.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2021-07-28
* @updated 2023-08-12
* @file string.js
* @type {String}
* @version 0.0.3
*/

/**
 * @description Removes noise characters
 *  from a literal string.
 * @param {{
 *  clearSpaces?: boolean=,
 *  input: String
 * }} data The formatter data configs.
 *  It supports the following keys:
 *
 *  - boolean clearSpaces: Whether
 *    we wish to remove all spaces
 *    on the string.
 *
 *  - String input: The string to
 *    clear.  
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
    input.toString ()
      .replaceAll ('\n', '')
      .replaceAll ('\t', '')
      .trim ()
  ).replaceAll (
    (clearSpaces ? ' ' : ''),
    ''
  );
}

/**
 * @description Replace a text to
 *  another text and keep its old
 *  position.
 * @param {String} scope The text
 *  where the replacing will do.
 * @param {String} input The to
 *  be inserted inside the scope.
 * @param {boolean} invert Whether
 *  an inversion is made before.
 * @param {String} mode The written
 *  mode.
 * @function smartReplace_
 * @private {Function}
 * @returns {String} String
 */
function smartReplace_ (
  scope, input, invert, mode
) {
  // The last input value
  // according to inversion.
  const lastInput = (
    input.length < 2 ? '' :
    (
      invert ?
      input.split ('').slice (
        1, input.length
      ).join ('') :
      input.split ('').slice (
        0, (input.length - 1)
      ).join ('')
    )
  );
  // Whether an append is required.
  if (!mode) {
    // Whether the current input
    // is already defined.
    if (
      lastInput.length > 0 &&
      scope.endsWith (lastInput)
    ) {
      // Replace the old input
      // value by the new one.
      return scope.replace (
        new RegExp (
          `${lastInput}$`
        ),
        input
      );
    // Otherwise.
    } else {
      // Adds the current input
      // at the end of scope.
      return `${scope}${input}`;
    }
  // Otherwise.
  } else {
    // Whether the current input
    // is already defined.
    if (
      lastInput.length > 0 &&
      scope.startsWith (lastInput)
    ) {
      // Replace the old input
      // value by the new one.
      return scope.replace (
        new RegExp (
          `^${lastInput}`
        ),
        input
      );
    // Otherwise.
    } else {
      // Adds the current input
      // at the begining of scope.
      return `${input}${scope}`;
    }
  }
}

/**
 * @description Writes a string
 *  with a given characters
 *  interval.
 * @param {{
 *  onFinished?: ?Function (String),
 *  onWrite?: ?Function (String),
 *  innerHTML?: boolean=,
 *  prepend?: boolean=,
 *  target?: ?Element=,
 *  invert?: boolean=,
 *  interval?: int=,
 *  text: String
 * }} data The text animation
 *  configurations. It supports
 *  the following keys:
 *
 *  - Function onFinished: Called
 *    when the text animation is
 *    over.
 *
 *  - Function onWrite: Called
 *    when the text is writing.
 *
 *  - int interval: The delay
 *    of animation between
 *    characters.
 *
 *  - boolean invert: Whether
 *    animation must be run
 *    in reverse mode.
 *
 *  - Element target: The tag
 *    content to be animated.
 *
 *  - String prepend: Whether
 *    you want to write text
 *    at the begining of content.
 *    (Only when a `target`
 *    element is defined).
 *
 *  - String text: The text
 *    to be written.
 *
 *  - String innerHTML: Whether
 *    only tag HTML content will
 *    be affected by the animation.
 *    (Only when a `target`
 *    element is defined).
 * @fires writeText#onFinished
 * @fires writeText#onWrite
 * @function writeText
 * @public
 * @returns {void} void
 */
function writeText ({
  innerHTML = false,
  onFinished = null,
  prepend = false,
  onWrite = null,
  interval = 140,
  invert = false,
  target = null,
  text = ''
}) {
  // Corrects the text.
  text = (
    typeof text === "string"
    ? text.trim () : ''
  );
  // Whether a text is specified.
  if (text.length > 0) {
    // The text characters.
    text = text.split ('');
    // The written text.
    let written = '';
    // Corrects property.
    innerHTML = (
      typeof innerHTML === "boolean"
      ? innerHTML : false
    );
    // Corrects write mode.
    prepend = (
      typeof prepend === "boolean"
      ? prepend : false
    );
    // Corrects interval.
    interval = (
      Number.isInteger (interval)
      ? Math.abs (interval) : 140
    );
    // Corrects invert.
    invert = (
      typeof invert === "boolean"
      ? invert : false
    );
    // The current index.
    let i = (
      invert
      ? (text.length - 1)
      : 0
    );
    // Animating the passed text.
    const animationID = (
      window.setInterval (() => {
        // Whether index is always
        // between the generated
        // range.
        if (
          invert ? i > -1
          : i < text.length
        ) {
          // Adds the current char
          // to the written text.
          written = (
            invert
            ? `${text[i]}${written}`
            : `${written}${text[i]}`
          );
          // Whether an html tag is
          // defined.
          if (target instanceof Element) {
            // Whether `innerHTML` prop
            // is chosen.
            if (innerHTML) {
              // Updates `innerHTML`
              // property.
              target.innerHTML = (
                smartReplace_ (
                  target.innerHTML,
                  written,
                  invert,
                  prepend
                )
              );
            // Otherwise.
            } else {
              // Updates `innerText`
              // property.
              target.textContent = (
                smartReplace_ (
                  target.textContent,
                  written,
                  invert,
                  prepend
                )
              );
            }
          }
          // Whether `onWrite` event
          // is listening.
          if (
            typeof onWrite === "function"
          ) {
            /**
             * @description Throws `onWrite`
             *  event.
             * @property {String} written
             *  The current written text.
             * @event writeText#onWrite
             * @readonly
             * @emits
             */
            onWrite (written);
          }
          // Updates the current index.
          i = (
            invert ? (i - 1) : (i + 1)
          );
        // Otherwise.
        } else {
          // Clears the active timer
          // process.
          window.clearInterval (
            animationID
          );
          // Whether `onFinished` event
          // is listening.
          if (
            typeof onFinished === "function"
          ) {
            /**
             * @description Throws `onFinished`
             *  event.
             * @property {String} written
             *  The written text.
             * @event writeText#onFinished
             * @readonly
             * @emits
             */
            onFinished (written);
          }
        }
      }, interval)
    );
  }
}

/** 
 * @description Exports all
 *  public features.
 * @exports *
 */
export {
  writeText,
  clearStr
};
