/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @fileoverview Defines a class to detect screen
*  formats: Large, Medium and Small.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @type {ScreenManager}
* @created 2023-08-17
* @updated 2023-09-28
* @file screen.js
* @version 0.0.1
*/

/**
 * @classdesc Listens window width to
 *  trigger some events about that.
 * @param {{
 *  useLoopDetection?: boolean=,
 *  disableDetection?: boolean=,
 *  onMedium?: ?Function (int),
 *  onLarge?: ?Function (int),
 *  onSmall?: ?Function (int),
 *  mediumScreen: Object<{
 *    min: int,
 *    max: int
 *  }>,
 *  largeScreen: Object<{
 *    min: int,
 *    max: int
 *  }>,
 *  smallScreen: Object<{
 *    min: int,
 *    max: int
 * }>
 * }} data The screen manager data
 *  configurations. It supports
 *  the following keys:
 *
 *  - boolean useLoopDetection: Whether
 *    each detected screen format will
 *    stay detected on each screen
 *    width variation.
 *
 *  - Function onMedium: Called when
 *    the screen format is medium.
 *
 *  - Function onLarge: Called when
 *    the screen format is large.
 *
 *  - Function onSmall: Called when
 *    the screen format is small.
 *
 *  - Object mediumScreen: The size
 *    of a medium screen.
 *
 *  - Object largeScreen: The size
 *    of a large screen.
 *
 *  - Object smallScreen: The size
 *    of a small screen.
 *
 *  - boolean disableDetection:
 *    Whether we want to check
 *    screen format when the
 *    page comes to loaded
 *    only.
 * @public
 * @class
 * @type {ScreenManager}
 * @returns {ScreenManager} ScreenManager
 */
function ScreenManager ({
  useLoopDetection = false,
  disableDetection = false,
  onMedium,
  onLarge,
  onSmall,
  mediumScreen = {
    min: 0,
    max: 0
  },
  largeScreen = {
    min: 0,
    max: 0
  },
  smallScreen = {
    min: 0,
    max: 0
  }
}) {
  // Attributes.
  /**
   * @description The medium
   *  screen state.
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  let mediumState_ = false;
  /**
   * @description The large
   *  screen state.
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  let largeState_ = false;
  /**
   * @description The small
   *  screen state.
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  let smallState_ = false;

  /**
   * @description Listens window
   *  size variation to trigger
   *  some events at some
   *  specific cases.
   * @constant {Function}
   * @private {Function}
   * @function listen_
   * @returns {void} void
   */
  const listen_ = () => (
    // Listens `resize` event.
    window.addEventListener (
      "resize", checkWidth_
    )
  );

  /**
   * @description Throws some events
   *  in certains cases.
   * @fires checkWidth_#onMedium
   * @fires checkWidth_#onLarge
   * @fires checkWidth_#onSmall
   * @function checkWidth_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const checkWidth_ = () => {
    // The current window width.
    const width = window.innerWidth;
    // Whether the screen is medium.
    if (
      width >= mediumScreen.min &&
      width <= mediumScreen.max
    ) {
      // Whether `useLoopDetection`
      // configurations get a
      // match.
      if (
        (
          !useLoopDetection
          && !mediumState_
        ) || useLoopDetection
      ) {
        // Whether `onMedium` event
        // is listening.
        if (
          typeof onMedium === "function"
        ) {
          // Updates medium state.
          mediumState_ = true;
          // Updates large state.
          largeState_ = false;
          // Updates small state.
          smallState_ = false;
          /**
           * @description Throws `onMedium`
           *  event.
           * @property {int} width The
           *  current window's width.
           * @event checkWidth_#onMedium
           * @readonly
           * @emits
           */
          onMedium (width);
        }
      }
    }
    // Whether the screen is small.
    if (
      width >= smallScreen.min &&
      width <= smallScreen.max
    ) {
      // Whether `useLoopDetection`
      // configurations matches.
      if (
        (
          !useLoopDetection
          && !smallState_
        ) || useLoopDetection
      ) {
        // Whether `onSmall` event
        // is listening.
        if (
          typeof onSmall === "function"
        ) {
          // Updates medium state.
          mediumState_ = false;
          // Updates large state.
          largeState_ = false;
          // Updates small state.
          smallState_ = true;
          /**
           * @description Throws `onSmall`
           *  event.
           * @property {int} width The
           *  current window's width.
           * @event checkWidth_#onSmall
           * @readonly
           * @emits
           */
          onSmall (width);
        }
      }
    }
    // Whether the screen is large.
    if (
      width >= largeScreen.min &&
      width <= largeScreen.max
    ) {
      // Whether `useLoopDetection`
      // configurations matches.
      if (
        (
          !useLoopDetection
          && !largeState_
        ) || useLoopDetection
      ) {
        // Whether `onLarge` event
        // is listening.
        if (
          typeof onLarge === "function"
        ) {
          // Updates medium state.
          mediumState_ = false;
          // Updates small state.
          smallState_ = false;
          // Updates large state.
          largeState_ = true;
          /**
           * @description Throws `onLarge`
           *  event.
           * @property {int} width The
           *  current window's width.
           * @event checkWidth_#onLarge
           * @readonly
           * @emits
           */
          onLarge (width);
        }
      }
    }
  };

  // Checks the current screen
  // format.
  checkWidth_ ();
  // Whether we want to listen
  // document size variation.
  if (!disableDetection) {
    // Listens screen format.
    listen_ ();
  }
}

/** 
 * @description Exports
 *  all public features.
 * @exports *
 */
export default ScreenManager;
