/**
* @fileoverview Defines a multitude of methods
*   to manage common navigator treatments.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-28
* @updated 2023-08-12
* @file browser.js
* @type {Browser}
* @version 0.0.3
*/

/**
 * @description Calculates and
 * 	returns the scroll bar
 * 	progress in percentage.
 * @function getScrollPercent
 * @public
 * @returns {Number} Number
 */
function getScrollPercent () {
  // The current scroll y axis.
  const scrollY = (
    Math.round (window.scrollY)
      + window.innerHeight
  );
  // The document height size.
  const height = (
    document.body.offsetHeight
  );
  // Returns the current progress
  // in percentage.
  return Math.round (
    (scrollY * 100) / height
  );
}

/**
 * @description Creates or changes a cookie.
 * @param {{
 *  expireDay?: int=,
 *  name: String,
 *  value: any
 * }} data The cookie data configurations.
 *  It supports the following keys:
 *  - String name: The cookie's name.
 *  - any value: The cookie's value.
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
  // Corrects the given exipre day.
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
 * @classdesc Listens scroll position
 *  to trigger some events about that.
 * @param {{
 *  onEnter?: ?Function,
 *  onLeave?: ?Function,
 *  onOver?: ?Function,
 *  min: Number,
 *  max: Number
 * }} data The scroll manager data
 *  configurations. Its supports
 *  the following keys:
 *  - Function onEnter: Called
 *    when the scroll position
 *    is between `min` and `max`.
 *  - Function onLeave: Called
 *    when the scroll position
 *    isn't between `min` and
 *    `max`.
 *  - Function onOver: Called
 *    every time when scroll
 *    position changed.
 *  - Number min: The lower number
 *    to trigger `onEnter` event
 *    in percentage.
 *   - Number max: The upper number
 *    to trigger `onEnter` event
 *    in percentage.
 * @public
 * @class
 * @type {ScrollManager}
 * @returns {ScrollManager} ScrollManager
 */
function ScrollManager ({
  max = 0,
  min = 0,
  onEnter,
  onLeave,
  onOver
}) {
  // Attributes.
  /**
	 * @description The scroll state.
	 * @private {boolean}
	 * @type {boolean}
	 * @field
	 */
	let scrollState_ = false;
  /**
	 * @description The current scroll
   *  position in percentage.
	 * @private {int}
	 * @type {int}
	 * @field
	 */
	let progress_ = 0;

  /**
   * @description Listens document
   * 	scroll thumb position.
   * @function listenScrollBar_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const listenScrollBar_ = () => (
    // Listens window `scroll`
		// event.
		window.addEventListener (
			"scroll", () => {
        // Checks the current
        // scrollbar position.
        checkScroll_ ();
      }
    )
  );

  /**
   * @description Checks scroll position
   *  to trigger event about that.
   * @fires checkScroll_#onEnter
   * @fires checkScroll_#onLeave
   * @fires checkScroll_#onOver
   * @function checkScroll_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const checkScroll_ = () => {
    // The current scroll progress.
    progress_ = getScrollPercent ();
    // Whether the scroll thumb
    // is at the top of page.
    if (
      progress_ >= min &&
      progress_ <= max
    ) {
      // Whether `onOver` event
      // is listening.
      if (
        typeof onOver === "function"
      ) {
        /**
         * @description Throws `onOver`
         *  event.
         * @property {int} percent The
         *  current scrollbar position.
         * @event checkScroll_#onOver
         * @readonly
         * @emits
         */
        onOver (progress_);
      }
      // Whether the scrollbar
      // isn't between `min`
      // and `max` yet.
      if (!scrollState_) {
        // Sets scroll state
        // to `true`.
        scrollState_ = true;
        // Whether `onEnter` event
        // is listening.
        if (
          typeof onEnter === "function"
        ) {
          /**
           * @description Throws `onEnter`
           *  event.
           * @event checkScroll_#onEnter
           * @readonly
           * @emits
           */
          onEnter ();
        }
      }
    // Whether the scrollbar
    // get out of range.
    } else if (scrollState_) {
      // Sets scroll state
      // to `false`.
      scrollState_ = false;
      // Whether `onLeave` event
      // is listening.
      if (
        typeof onLeave === "function"
      ) {
        /**
         * @description Throws `onLeave`
         *  event.
         * @event checkScroll_#onLeave
         * @readonly
         * @emits
         */
        onLeave ();
      }
    }
  };

  // Listens document scrollbar.
  listenScrollBar_ ();
  // Checks the current
  // scrollbar position.
  checkScroll_ ();
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
 *  - String direction: The animation
 *     direction.
 *  - Array<Object<String, any>>
 *     targets: The tags to be
 *     free from js stylesheet.
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
      }
    };
    // Whether the direction is
    // normal.
    if (direction === "normal") {
      // Clearing js stylesheets.
      targets.forEach (data => {
        // Whether only chidren
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
        // Whether only chidren
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
 * @description Exports all
 *  public features.
 * @exports *
 */
export {
  getScrollPercent,
  ScrollManager,
  clearJSStyle,
  getCookie,
  setCookie
};
