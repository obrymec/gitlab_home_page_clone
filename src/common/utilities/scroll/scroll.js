/**
* @fileoverview Defines a class to detect scroll.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @type {ScrollManager}
* @created 2023-08-17
* @updated 2023-08-25
* @file scroll.js
* @version 0.0.1
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
 * @classdesc Listens scroll position
 *  to trigger some events about that.
 * @param {{
 *  onEnter?: ?Function,
 *  onLeave?: ?Function,
 *  onOver?: ?Function,
 *  min: Number,
 *  max: Number
 * }} data The scroll manager data
 *  configurations. It supports
 *  the following keys:
 *
 *  - Function onEnter: Called
 *    when the scroll position
 *    is between `min` and `max`.
 *
 *  - Function onLeave: Called
 *    when the scroll position
 *    isn't between `min` and
 *    `max`.
 *
 *  - Function onOver: Called
 *    every time when scroll
 *    position changed.
 *
 *  - Number min: The lower number
 *    to trigger `onEnter` event
 *    in percentage.
 *
 *  - Number max: The upper number
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
      "scroll", checkScroll_
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
 * @description Exports all
 *  public features.
 * @exports *
 */
export {
  getScrollPercent,
  ScrollManager
};
