/**
* @fileoverview Defines common methods for string
*   treatment.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2021-07-28
* @updated 2023-09-21
* @file string.js
* @type {String}
* @version 0.0.4
*/

// Custom dependencies.
import lang from "../language/language.js";

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
 *    purge.  
 * @function clearStr
 * @public
 * @returns {String} String
 */
function clearStr ({
  clearSpaces = false,
  input
}) {
  // Returns the purged
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
 * @description Returns new language
 * 	textuals data.
 * @param {{
 * 	textualsId: String,
 * 	attrPrefix: String
 * }} data The method data configs.
 * 	It supports the following keys:
 *
 *	- String textualsId: The textual
 * 		tags id for data extraction.
 *
 * 	- String attrPrefix: The custom
 * 		attribute to identify the
 * 		value of textual tags.
 * @function getUpdates_
 * @constant {Function}
 * @private {Function}
 * @returns {Object<String, String>} Object
 */
function getUpdates ({
  textualsId,
  attrPrefix
}) {
  // The final result from
  // the extracted text.
  let textualData = {};
  // The section's textual
  // tags.
  const tags = (
    document.querySelectorAll (
      `*#${textualsId}`
    )
  );
  // Extracting textual data.
  for (const tag of tags) {
    // The textual id.
    const textId = (
      tag.getAttribute (
        attrPrefix
      )
    );
    // Extracts the textual
    // data of the current
    // detected tag.
    textualData[
      clearStr ({
        clearSpaces: true,
        input: `
          ${tag.localName}
          [${attrPrefix}
            ='${textId}']
        `
      })] = lang.getText (
        textId.split ("::")[0]
      );
  }
  // Returns the final
  // results.
  return textualData;
}

/**
 * @description Animates text inside
 *  the given tag(s).
 * @param {Object<String, String>} oldData
 *  All tag(s) id(s) and their
 *  old text content value.
 * @param {Object<String, String>} newData
 *  All tag(s) id(s) and their
 *  new text content value.
 * @function animateTextContent
 * @public
 * @returns {void} void
 */
function animateTextContent (
  newData
) {
  // Animating texts.
  for (
    const id of 
    Object.keys (newData)
  ) {
    // The tag ref of the
    // current id.
    const tag = (
      document.querySelector (
        id
      )
    );
    // Whether the ref is
    // defined.
    if (
      tag instanceof Element
    ) {
      // Backspaces the old
      // text content.
			backspace ({
        invert: true,
				interval: 25,
				tag,
        onFinished: () => (
          // Writes the new
          // text content.
          animateText ({
            isReversed: false,
            text: newData[id],
            interval: 25,
            target: tag,
            onFinished: () => {
              // Whether the current
              // markup has a title.
              if (
                tag.hasAttribute (
                  "title"
                )
              ) {
                // Updates his title.
                tag.setAttribute (
                  "title",
                  newData[id]
                );
              }
            }
          })
        )
			});
    }
  }
}

/**
 * @description Backspaces all characters
 *  of a text content from a given tag.
 * @param {{
 *  onBackspace?: Function (String),
 *  onFinished?: Function (String),
 *  invert?: boolean=,
 *  interval?: int=,
 *  tag: Element
 * }} data The method data configurations.
 *  It supports the following keys:
 *
 *  - int interval: The timeout between
 *    each backspace.
 *
 *  - boolean invert: Whether we want to
 *    reverse the backspace direction.
 *
 *  - Function onFinished: Called when
 *    the backspace effect is over.
 *
 *  - Element tag: The target markup
 *    that will be affected by the
 *    effect.
 *
 *  - Function onBackspace: Called at
 *    every time when a backspace is
 *    made over tag's text content.
 * @fires backspace#onBackspace
 * @fires backspace#onFinished
 * @function backspace
 * @public
 * @returns {int} int
 */
function backspace ({
  onBackspace = null,
  onFinished = null,
  invert = false,
  interval = 140,
  tag = null
}) {
  // Backspacing characters.
  const animation = (
    window.setInterval (
      () => {
        // The current corrected
        // tag's text content.
        tag.textContent = (
          clearStr ({
            input: (
              tag.textContent
            )
          })
        );
        // The current text
        // content size.
        const size = (
          tag.textContent
            .length
        );
        // Whether the text
        // length is bigger
        // than one.
        if (size > 1) {
          // Whether direction
          // is normal.
          if (!invert) {
            // Removes the first
            // character.
            tag.textContent = (
              tag.textContent
                .split ('')
                .slice (1, size)
                .join ('')
            );
          // Otherwise.
          } else {
            // Removes the last
            // character.
            tag.textContent = (
              tag.textContent
                .split ('')
                .slice (
                  0, (size - 1)
                ).join ('')
            );
          }
          // Whether `onBackspace`
          // event is listening.
          if (
            typeof onBackspace
              === "function"
          ) {
            /**
             * @description Throws
             *  `onBackspace` event.
             * @property {String} rest
             *  The rest of backspaced
             *  text.
             * @event backspace#onBackspace
             * @readonly
             * @emits
             */
            onBackspace (
              tag.textContent
            );
          }
        // Otherwise.
        } else {
          // Clears text content.
          tag.textContent = '';
          // Kills animation.
          window.clearInterval (
            animation
          );
          // Whether `onFinished`
          // event is listening.
          if (
            typeof onFinished
              === "function"
          ) {
            /**
             * @description Throws
             *  `onFinished` event.
             * @property {String} rest
             *  The rest of backspaced
             *  text.
             * @event backspace#onFinished
             * @readonly
             * @emits
             */
            onFinished (
              tag.textContent
            );
          }
        }
      },
      interval
    )
  );
  // Returns the process
  // id.
  return animation;
}

/**
 * @description Replace a text to
 *  another text and keep its old
 *  position.
 * @param {String} scope The tag ref
 *  text content or inner HTML.
 * @param {String} input The current
 *  written text.
 * @param {boolean} invert Whether
 *  an inversion must be made before.
 * @param {String} mode The written
 *  mode (Append or Prepend).
 * @param {boolean} reverse Whether
 *  the animation is reversed.
 * @param {String} text The original
 *  text to animate.
 * @param {int} lastIndex The last
 *  character position inside the
 *  original text.
 * @function smartReplace_
 * @private {Function}
 * @returns {String} String
 */
function smartReplace_ (
  scope,
  input,
  invert,
  mode,
  reverse,
  text,
  lastIndex
) {
  // The last input value
  // according to inversion.
  let lastInput = '';
  // Whether inversion is enabled.
  if (invert) {
    // Whether reverse mode
    // is enabled.
    if (reverse) {
      // Whether the current
      // input length is
      // greater than zero.
      if (input.length > 0) {
        // The original text one
        // part.
        const part = (
          text.split (input)[1]
        );
        // Adds the first removed
        // character from the last
        // time.
        lastInput = (
          `${input}${part[0]}`
        );
      // Otherwise.
      } else {
        // The first character.
        lastInput = text[0];
      }
    // Whether the current
    // input length is
    // greater than one.
    } else if (input.length > 1) {
      // Removes the last char
      // of the original input.
      lastInput = (
        input.split ('').slice (
          1, input.length
        ).join ('')
      );
    }
  // Otherwise.
  } else {
    // Whether reverse mode
    // is enabled.
    if (reverse) {
      // Whether the current
      // input length is
      // greater than zero.
      if (input.length > 0) {
        // The original text one
        // part.
        const part = (
          text.split (input)[0]
        );
        // Adds the first removed
        // character from the last
        // time.
        lastInput = (
          `${
            part[(part.length - 1)]
          }${input}`
        );
      // Otherwise.
      } else {
        // Gets the last character.
        lastInput = text[lastIndex];
      }
    // Whether the current
    // input length is
    // greater than one.
    } else if (input.length > 1) {
      // Removes the first char
      // of the original input.
      lastInput = (
        input.split ('').slice (
          0, (input.length - 1)
        ).join ('')
      );
    }
  }
  // Whether an append is required.
  if (!mode) {
    // Whether the current input
    // is already defined.
    if (
      lastInput.length > 0 &&
      scope.endsWith (lastInput)
    ) {
      // Replaces the old input
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
      // Replaces the old input
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
 *  useInnerHTML?: boolean=,
 *  usePrepend?: boolean=,
 *  isInverted?: boolean=,
 *  isReversed?: boolean=,
 *  target?: ?Element=,
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
 *  - boolean isInverted: Whether
 *    animation must be run
 *    in reverse mode.
 *
 *  - Element target: The tag
 *    content to be animated.
 *
 *  - boolean usePrepend: Whether
 *    you want to write text
 *    at the begining of content.
 *    (Only when a `target`
 *    element is defined).
 *
 *  - String text: The text
 *    to be written.
 *
 *  - boolean useInnerHTML: Whether
 *    only tag HTML content will
 *    be affected by the animation.
 *    (Only when a `target`
 *    element is defined).
 *
 *  - boolean isReversed: Whether
 *    we want to animate the text
 *    in reverse mode.
 * @fires animateText#onFinished
 * @fires animateText#onWrite
 * @function animateText
 * @public
 * @returns {?int} ?int
 */
function animateText ({
  useInnerHTML = false,
  usePrepend = false,
  isInverted = false,
  isReversed = false,
  onFinished = null,
  onWrite = null,
  interval = 140,
  target = null,
  text = ''
}) {
  // Whether a text is specified.
  if (text.trim ().length > 0) {
    // The text characters.
    text = text.split ('');
    // The written text.
    let written = '';
    // The last position index.
    const lastIndex = (
      text.length - 1
    );
    // The current index.
    let i = (
      isInverted ? lastIndex : 0
    );
    // Animating the passed text.
    const animationID = (
      window.setInterval (() => {
        // Whether index is always
        // between the generated
        // range.
        if (
          isInverted ? i > -1
          : i < text.length
        ) {
          // The current written text.
          let written = '';
          // Whether inversion is
          // enabled.
          if (isInverted) {
            // Whether reverse mode
            // is enabled.
            if (isReversed) {
              // Whether index is greater
              // than the first index.
              if (i > 0) {
                // Removes the last I chars
                // from the initial text.
                written = text.slice (
                  0, i
                ).join ('');
              }
            // Otherwise.
            } else {
              // Adds each text char
              // at the beginning of
              // the final result.
              written = (
                `${text[i]}${written}`
              );
            }
          // Otherwise.
          } else {
            // Whether reverse mode
            // is enabled.
            if (isReversed) {
              // Whether index is less
              // than the last index.
              if (i < lastIndex) {
                // Removes the first I chars
                // from the initial text.
                written = text.slice (
                  (i + 1), text.length
                ).join ('');
              }
            // Otherwise.
            } else {
              // Adds each text char
              // at the end of the
              // final result.
              written = (
                `${written}${text[i]}`
              );
            }
          }
          // Whether `innerHTML` prop
          // is chosen.
          if (useInnerHTML) {
            // Updates `innerHTML`
            // property.
            target.innerHTML = (
              smartReplace_ (
                target.innerHTML,
                written,
                isInverted,
                usePrepend,
                isReversed,
                text.join (''),
                lastIndex
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
                isInverted,
                usePrepend,
                isReversed,
                text.join (''),
                lastIndex
              )
            );
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
             * @event animateText#onWrite
             * @readonly
             * @emits
             */
            onWrite (written);
          }
          // Updates the current index.
          i = (
            isInverted ? (i - 1) : (i + 1)
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
             * @property {String} written The
             *  written text.
             * @event animateText#onFinished
             * @readonly
             * @emits
             */
            onFinished (written);
          }
        }
      }, interval)
    );
    // Returns the process
    // id.
    return animationID;
  }
}

/** 
 * @description Exports
 *  all public features.
 * @exports *
 */
export {
  animateTextContent,
  animateText,
  getUpdates,
  backspace,
  clearStr
};
