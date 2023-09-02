/**
* @fileoverview Defines a class to detect scroll.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @type {ScrollManager}
* @created 2023-08-17
* @updated 2023-09-01
* @file scroll.js
* @version 0.0.4
*/

/**
 * @description Stops an auto scrolling
 *  process initialized previously.
 * @param {int} scrollId The target
 *  auto scrolling process's id.
 * @function stopAutoScrolling
 * @public
 * @returns {void} void
 */
function stopAutoScrolling (
  scrollId
) {
  // Whether the given id is
  // an integer.
  if (
    Number.isInteger (scrollId)
  ) {
    // Destroys the target auto
    // scrolling process from
    // his id.
    window.clearInterval (
      scrollId
    );
  }
}

/**
 * @description Scrolls the scrollbar
 *  thumb to the specified element.
 * @param {String} id The target
 *  element's id.
 * @function scrollTo
 * @public
 * @returns {void} void
 */
function scrollTo (id) {
  // Gets the tag from his id.
  const tag = (
    document.querySelector (
      id.toString ()
    )
  );
  // Whether the passed tag
  // is really defined.
  if (tag instanceof Element) {
    // Scrolls directly to the
    // target tag reference.
    tag.scrollIntoView ({
      behavior: "smooth",
      inline: "nearest", 
      block: "start"
    });
  }
}

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
 * @description Scrolls to a multiple
 *  passed elements regardless a
 *  direction. This process is
 *  in automatic mode.
 * @param {{
 *  tagIds: Array<String>,
 *  reversed?: boolean=,
 *  infinite?: boolean=,
 *  interval?: int=
 * }} data The scroller process
 *  configs. It supports the
 *  following keys:
 *
 *  - Array tagIds: The target tag
 *    ids to scroll to.
 *
 *  - boolean reversed: Whether we
 *    want to make an auto scrolling
 *    process in reverse mode.
 *
 *  - boolean infinite: Whether we
 *    want to make an infinite
 *    auto scrolling process.
 *
 *  - int interval: The interval
 *    between each scroll.
 * @function autoScroll
 * @public
 * @returns {int} int
 */
function autoScroll ({
  infinite = false,
  reversed = false,
  interval = 3000,
  tagIds = []
}) {
  // The current scroll index.
  let index = (
    reversed ? tagIds.length : -1
  );
  // The auto scrolling process
  // background's id.
  let processId = null;
  // Manages auto scrolling.
  const scroll = () => {
    // Updates the current index.
    index += (reversed ? -1 : 1);
    // Whether the current
    // position stay valid.
    if (
      index < tagIds.length
      && index > -1 
    ) {
      // Scrolls to the current
      // getted markup element.
      scrollTo (tagIds[index]);
    // Otherwise.
    } else {
      // Resets the position.
      index = (
        reversed ?
        tagIds.length : -1
      );
      // Whether the scrolling
      // is limited.
      if (
        processId != null
        && !infinite
      ) {
        // Stops auto scrolling
        // process.
        window.clearInterval (
          processId
        );
      }
    }
  };
  // Makes the first scroll.
  scroll ();
  // Auto scrolling process.
  processId = (
    window.setInterval (
      scroll, interval
    )
  );
  // Returns the scroll
  // background's id.
  return processId;
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
   *  to trigger events about that.
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
    // is in range [min; max].
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

  // Listens window scrollbar.
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
  stopAutoScrolling,
  getScrollPercent,
  ScrollManager,
  autoScroll,
  scrollTo
};
