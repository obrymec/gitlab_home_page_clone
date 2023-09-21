/**
* @fileoverview Defines a multitude of methods
*   to manage common navigator treatments.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-28
* @updated 2023-09-21
* @file browser.js
* @type {Browser}
* @version 0.0.4
*/

/**
 * @description Listens `load` event
 *  on every given tag(s) reference(s)
 *  and trigger an event when all
 *  passed tag(s) is/are loaded.
 * @param {{
 *  tags: Array<Element>,
 *  onReady: Function
 * }} data The listener configs. It
 *  supports the following keys:
 *
 *  - Array tags: The target tags.
 *
 *  - Function onReady: Called
 *    when all tags are loaded.
 * @fires listenLoadEvent#onReady
 * @function listenLoadEvent
 * @public
 * @returns {void} void
 */
function listenLoadEvent ({
  onReady,
  tags
}) {
  // The loaded tags count.
  let count = 0;
  // Listening `load` event.
  for (const tag of tags) {
    // Listens `load` event
    // of the current tag.
    tag.addEventListener (
      "load", () => {
        // Increases the count.
        count++;
        // Whether all listened
        // tags are loaded.
        if (
          typeof onReady === "function"
          && count === tags.length
        ) {
          /**
           * @description Throws `onReady`
           *  event.
           * @event listenLoadEvent#onReady
           * @readonly
           * @emits
           */
          onReady ();
        }
      }
    );
  }
}

/**
 * @description Creates or changes a cookie.
 * @param {{
 *  expireDay?: int=,
 *  name: String,
 *  value: any
 * }} data The cookie data configurations.
 *  It supports the following keys:
 *
 *  - String name: The cookie's name.
 *
 *  - any value: The cookie's value.
 *
 *  - int expireDay: The cookie's
 *    life length.
 * @function setCookie
 * @public
 * @returns {void} void
 */
function setCookie ({
  expireDay = 1,
  value = null,
  name = ''
}) {
  // Corrects the given cookie name.
  name = (
    typeof name === "string"
    ? name.trim () : ''
  );
  // Corrects the given expire day.
  expireDay = (
    Number.isInteger (expireDay)
    ? expireDay : 0
  );
  // Whether a cookie name is
  // specified.
  if (name.length > 0) {
    // Creates a new date instance.
    let date = new Date ();
    // Converts the given expires
    // date into day format.
    date.setTime (
      date.getTime () +
      (expireDay * 24 * 60 * 60 * 1000)
    );
    // Calculates the UTC date
    // format.
    const expires = (
      "expires=" +
      date.toUTCString ()
    );
    // Sets the target cookie.
    document.cookie = (`
      ${name}=${value};
      ${expires};path=/
    `.replaceAll ('\n', '')
     .replaceAll (' ', '')
    );
  }
}

/**
 * @description Returns the target
 *  cookie value.
 * @param {String} name The cookie
 *  name.
 * @function getCookie
 * @public
 * @returns {any} any
 */
function getCookie (name) {
  // The corrected cookie name.
  name = (
    typeof name === "string"
    ? name.trim () : ''
  );
  // Whether a cookie name is
  // specified.
  if (name.length > 0) {
    // The cookie parts.
    const cookieName = `${name}=`;
    // The cookie's data.
    const cookieData = (
      document?.cookie?.split (';')
    );
    // Searching the target cookie.
    for (
      let i = 0;
      i < cookieData?.length;
      i++
    ) {
      // Searching cookie value.
      while (
        cookieData[i]?.charAt (0) === ' '
      ) {
        // The current cookie's part.
        cookieData[i] = (
          cookieData[i]?.substring (1)
        );
      }
      // Whether a value has been
      // found.
      if (
        cookieData[i]?.indexOf (
          cookieName
        ) === 0
      ) {
        // Returns the found value.
        return (
          cookieData[i]?.substring (
            cookieName.length,
            cookieData[i]?.length
          )
        );
      }
    }
  }
}

/**
 * @description Clears javascript style.
 *  Good to use after an animation
 *  handled by javascript.
 * @param {{
 *  direction?: String=,
 *  targets: Array<{
 *    children?: boolean,
 *    start: String,
 *    ref: !Element,
 *    end: String
 *  }>
 * }} data The data configurations to.
 *  clear javascript object style. It
 *  supports the following keys:
 *
 *  - String direction: The animation
 *    direction.
 *
 *  - Array targets: The tags to be
 *    free from js stylesheet.
 * @function clearStyle
 * @public
 * @returns {void} void
 */
function clearJSStyle ({
  direction = "normal",
  targets = []
}) {
  // Whether the given parameters
  // are valid.
  if (
    typeof direction === "string"
    && Array.isArray (targets)
  ) {
    // Replaces the given class name
    // to another one from a given
    // tag reference after remove
    // his js stylesheets.
    const clear = (
      tag,
      className1,
      className2
    ) => {
      // The current tag is
      // really defined.
      if (
        tag instanceof Element
      ) {
        // Clears `style` attribute
        // value.
        tag.setAttribute (
          "style", ''
        );
        // Clears also javascript
        // `style` object.
        tag.style = {};
        // Removes the class name
        // inside `className1`.
        tag.classList
          .remove (className1);
        // Adds the class name
        // inside `className2`.
        tag.classList
          .add (className2);
        // Removes `style` attr.
        tag.removeAttribute (
          "style"
        );
      }
    };
    // Whether the direction is
    // normal.
    if (direction === "normal") {
      // Clearing js stylesheets.
      targets.forEach (data => {
        // Whether only children
        // are target.
        if (data.children) {
          // Clearing js styles
          // on the current tag
          // children only.
          for (
            const child of
            data.ref.children
          ) {
            // Free the current
            // child tag.
            clear (
              child,
              data.start,
              data.end
            );
          }
        // Otherwise.
        } else {
          // Free the current
          // tag.
          clear (
            data.ref,
            data.start,
            data.end
          );
        }
      });
    // Whether the direction is
    // reverse.
    } else if (
      direction === "reverse"
    ) {
      // Clearing js stylesheets.
      targets.forEach (data => {
        // Whether only children
        // are target.
        if (data.children) {
          // Clearing js styles
          // on the current tag
          // children only.
          for (
            const child of
            data.ref.children
          ) {
            // Free the current
            // child tag.
            clear (
              child,
              data.end,
              data.start
            );
          }
        // Otherwise.
        } else {
          // Free the current
          // tag.
          clear (
            data.ref,
            data.end,
            data.start
          );
        }
      });
    }
  }
}

/** 
 * @description Exports
 *  all public features.
 * @exports *
 */
export {
  listenLoadEvent,
  clearJSStyle,
  getCookie,
  setCookie
};
