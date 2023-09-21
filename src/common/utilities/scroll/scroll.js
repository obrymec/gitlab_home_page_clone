/**
* @fileoverview Defines a class to detect scroll.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @type {ScrollManager}
* @created 2023-08-17
* @updated 2023-09-21
* @file scroll.js
* @version 0.0.4
*/

// Custom dependencies.
import {listenLoadEvent} from "../browser/browser.js";

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
 * @param {String|Element} el The
 *  target element.
 * @function scrollTo
 * @public
 * @returns {void} void
 */
function scrollTo (id) {
  // Gets the passed tag.
  const tag = (
    typeof id === "string" ?
    document.querySelector (
      id.toString ()
    ) : id
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
 * @description Scrolls to multiple
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
 *  - int interval: The delay
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
  // Start Auto scrolling
  // process.
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
 * @description Updates auto scroller
 *  process targets at any window
 *  resizement.
 * @param {Function(int)} onMutate
 *  Called when the auto scroller
 *  process id changed.
 * @fires autoScroller#onMutate
 * @function autoScroller
 * @public
 * @returns {void} void
 */
function autoScroller (
  onMutate
) {
  // Launches auto scroller process.
  const launch = scrollerId => {
    // Stops old auto scroller.
    window.clearInterval (
      scrollerId
    );
    // Starts auto scroll program.
    scrollerId = (
      autoScroll ({
        interval: 10000,
        infinite: true,
        tagIds: (
          document.querySelectorAll (
            `*[auto-scrollable="true"]`
          )
        )
      })
    );
    // Whether `onMutate` event is
    // listening.
    if (
      typeof onMutate === "function"
    ) {
      /**
       * @description Throws `onMutate`
       *  event.
       * @property {int} scrollerId
       *  The current process's id.
       * @event autoScroller#onMutate
       * @readonly
       * @emits
       */
      onMutate (scrollerId);
    }
    // Returns the current
    // scroller process id.
    return scrollerId;
  };
  // When html, css and js
  // are loaded and ready.
  window.addEventListener (
    "DOMContentLoaded",
    () => listenLoadEvent ({
      tags: (
        document.querySelectorAll (
          "img"
        )
      ),
      onReady: () => {
        // The current process's id.
        let processId = null;
        // Listens window `resize`
        // event.
        window.addEventListener (
          "resize", () => (
            processId = launch (
              processId
            ) 
          )
        );
        // Makes the first
        // launch.
        processId = launch (
          processId
        );
      }
    })
  );
}

/**
 * @classdesc Listens scroll
 *  position to trigger some
 *  events about that.
 * @param {{
 *  offsetBottom?: Number=,
 *  scope: !Element|Window,
 *  onEnter?: ?Function,
 *  onLeave?: ?Function,
 *  offsetTop?: Number=,
 *  onOver?: ?Function,
 *  target: !Element,
 *  root: !Element
 * }} data The scroll manager
 *  data configurations. It
 *  supports the following
 *  keys:
 *
 *  - Function onEnter: Called
 *    when the specified tag
 *    enters inside the client
 *    screen regardless offsets.
 *
 *  - Function onLeave: Called
 *    when the specified tag
 *    get out of the client
 *    screen regardless offsets.
 *
 *  - Function onOver: Called
 *    every time when the tag
 *    is visible within the
 *    client screen regardless
 *    offsets.
 *
 *  - Number offsetBottom: The
 *    offset value to seek
 *    before element becomes
 *    visible on the client
 *    screen.
 *
 *  - Number offsetTop: The
 *    offset value to seek
 *    before get out of the
 *    client screen.
 *
 *  - Element target: The tag
 *    where scroll effect must
 *    be applied to.
 *
 *  - any scope: The markup
 *    where the scroll effect
 *    must be applied.
 *
 *  - Element root: The markup
 *    where the scroll effect
 *    should start computing
 *    margins and paddings.
 * @public
 * @class
 * @type {ScrollManager}
 * @returns {ScrollManager} ScrollManager
 */
function ScrollManager ({
  offsetBottom = 0,
  offsetTop = 0,
  onEnter,
  onLeave,
  onOver,
  target,
  scope,
  root
}) {
  // Attributes.
  /**
   * @description The scroll
   *  state.
   * @private {boolean=}
   * @type {boolean=}
   * @field
   */
  let scrollState_ = false;
  /**
   * @description The current
   *  scroll position in
   *  percentage.
   * @private {int=}
   * @type {int=}
   * @field
   */
  let progress_ = 0;

  /**
   * @description Listens scope
   * 	scroll thumb position.
   * @function listenScrollBar_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const listenScrollBar_ = () => (
    // Listens `scroll` event.
    scope.addEventListener (
      "scroll", checkScroll_
    )
  );

  /**
   * @description Clears all created
   *  events for the process.
   * @function clearEvents
   * @public
   * @returns {void} void
   */
  this.clearEvents = () => {
    // Removes the created
    // event listener for
    // the scroll.
    scope.removeEventListener (
      "scroll", checkScroll_
    );
    // Removes `scroll-root`
    // attribute from the
    // passed root markup.
    root.removeAttribute (
      "scroll-root"
    );
  }

  /**
   * @description Calculates the
   *  margin top of the given
   *  markup.
   * @param {Element} markup The
   *  markup element to be
   *  targeted.
   * @function computeMarkupHeight_
   * @constant {Function}
   * @private {Function}
   * @returns {float} float
   */
  const computeMarkupHeight_ = (
    markup
  ) => {
    // The tag stylesheet.
    let {
      marginTop
    } = window.getComputedStyle (
      markup
    );
    // The margin top value.
    marginTop = parseFloat (
      marginTop
    );
    // Returns the margin
    // top value if and
    // only if it's a
    // real number.
    return (
      isNaN (marginTop)
      ? 0 : marginTop
    );
  };

  /**
   * @description Calculates the
   *  vertical height for the
   *  parent of the given
   *  markup.
   * @param {Element} parent The
   *  parent tag.
   * @param {int} index The given
   *  markup index.
   * @function computeParentHeight_
   * @constant {Function}
   * @private {Function}
   * @returns {float} float
   */
  const computeParentHeight_ = (
    parent, index
  ) => {
    // The parent stylesheet.
    let {
      borderTopWidth,
      paddingTop,
      rowGap
    } = window.getComputedStyle (
      parent
    );
    // The border top width.
    borderTopWidth = parseFloat (
      borderTopWidth
    );
    // The padding top value.
    paddingTop = parseFloat (
      paddingTop
    );
    // The row gap value.
    rowGap = parseFloat (
      rowGap
    );
    // Computes the three
    // values above.
    return (
      (
        isNaN (borderTopWidth)
        ? 0 : borderTopWidth
      ) +
      (
        isNaN (paddingTop)
        ? 0 : paddingTop
      ) +
      (
        isNaN (rowGap) ? 0
        : (rowGap * index)
      )
    );
  };

  /**
   * @description Calculates the
   *  total height from the
   *  target tag to the
   *  target root.
   * @param {Element} tag The
   *  target tag.
   * @param {float} initial The
   *  first value of the total
   *  height.
   * @function verticalCompute_
   * @constant {Function}
   * @private {Function}
   * @returns {float} float
   */
  const verticalCompute_ = (
    tag, initial
  ) => {
    // Whether the current tag
    // has `scroll-root` attr.
    if (
      tag.hasAttribute (
        "scroll-root"
      )
    ) {
      // Returns the current
      // total height value.
      return initial;
    // Otherwise.
    } else {
      // The parent of the passed
      // tag.
      const parent = tag.parentElement;
      // The children elements.
      const kids = parent.children;
      // The index of the given
      // tag.
      const tagIndex = (
        Array.prototype.indexOf.call (
          kids, tag
        )
      );
      // Adds the parent full height
      // and the active markup
      // margin top.
      initial += (
        computeMarkupHeight_ (tag)
        + computeParentHeight_ (
          parent, tagIndex
        )
      );
      // Computing the total height.
      for (
        let n = 0;
        n < tagIndex;
        n++
      ) {
        // Adds the current child
        // full height.
        initial += (
          computeChildHeight_ (
            kids[n]
          )  
        );
      }
      // Calls it itself.
      return verticalCompute_ (
        parent, initial
      );
    }
  };

  /**
   * @description Calculates the
   *  margin top of the given
   *  child tag.
   * @param {Element} child The
   *  markup kid element to be
   *  targeted.
   * @function computeChildHeight_
   * @constant {Function}
   * @private {Function}
   * @returns {float} float
   */
  const computeChildHeight_ = (
    child
  ) => {
    // The kid stylesheet.
    let {
      marginBottom,
      marginTop,
      position,
      display
    } = window.getComputedStyle (
      child
    );
    // The margin top value.
    marginBottom = parseFloat (
      marginBottom
    );
    // The margin top value.
    marginTop = parseFloat (
      marginTop
    );
    // Converts the position
    // into lower case.
    position = (
      position.toLowerCase ()
    );
    // Converts the display
    // into lower case.
    display = (
      display.toLowerCase ()
    );
    // Whether the child is
    // really visible on the
    // document.
    if (
      position === "absolute" ||
      position === "fixed" ||
      display === "none"
    ) {
      // No make any compute.
      return 0;
    // Otherwise.
    } else {
      // Computes the child
      // full height, margin
      // top and bottom.
      return (
        child.offsetHeight +
        (
          isNaN (marginBottom)
          ? 0 : marginBottom
        ) +
        (
          isNaN (marginTop)
          ? 0 : marginTop
        )
      );
    }
  };

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
    // Adds `scroll-root`attr
    // to the root tag.
    root.setAttribute (
      "scroll-root", true
    );
    // The total height from the
    // given target to the root.
    let totalHeight = (
      verticalCompute_ (target, 0)
    );
    // The scroll top and client
    // height.
    const {
      clientHeight, scrollTop
    } = document.documentElement;
    // The total scrolled height.
    const fullScrolled = (
      clientHeight + scrollTop
    );
    // Adds the top offset to
    // the total height.
    const offsetTotalHeight = (
      Math.abs (offsetTop)
      + totalHeight
    );
    // Adds the total height
    // to the given markup's
    // height and substract
    // the bottom offset.
    const fullHeight = (
      target.offsetHeight
      + totalHeight
      - Math.abs (offsetBottom)
    );
    // Whether the tag enters
    // inside the client
    // screen.
    if (
      fullScrolled >= offsetTotalHeight
      && scrollTop <= fullHeight
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
      // Whether the passed tag wasn't
      // visible within the client
      // screen.
      if (!scrollState_) {
        // Sets the scroll state.
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
    // Whether the tag gets out
    // of the client screen.
    } else if (scrollState_) {
      // Sets the scroll state.
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

  // Whether all main elements
  // are defined.
  if (
    target instanceof Element &&
    (
      scope instanceof Element ||
      scope instanceof Window
    ) &&
    root instanceof Element
  ) {
    // Listens window scrollbar.
    listenScrollBar_ ();
    // Checks the current
    // scrollbar position.
    checkScroll_ ();
  }
}

/** 
 * @description Exports
 *  all public features.
 * @exports *
 */
export {
  stopAutoScrolling,
  getScrollPercent,
  ScrollManager,
  autoScroller,
  autoScroll,
  scrollTo
};
