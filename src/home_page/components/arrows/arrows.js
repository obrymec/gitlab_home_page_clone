/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview Arrows UI component.
* @supported DESKTOP, MOBILE
* @created 2023-09-12
* @updated 2023-09-12
* @file arrows.js
* @type {Arrows}
* @version 0.0.1
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {
  getScrollPercent,
  scrollTo
} from "../../../common/utilities/scroll/scroll.js";
import {
  buildIcon,
  Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds arrows section.
 * @public
 * @class
 * @returns {Arrows} Arrows
 */
function Arrows () {
  /**
	 * @description The old
   *  scroll thumb position.
	 * @private {int}
	 * @type {int}
	 * @field
	 */
  let oldScrollPos_ = 0;
  /**
   * @description Whether the
   *  scroll direction is
   *  from top to bottom.
   * @private {boolean}
   * @type {boolean}
   * @field
   */
	let isBottom_ = false;
  /**
	 * @description The delay
   *  before reset values
   *  process's id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
  let resetId_ = null;
  /**
	 * @description The arrows.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let arrows_ = null;
  /**
	 * @description The delay
   *  before hide arrow
   *  process's id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
  let hideId_ = null;
  /**
   * @description Whether the
   *  scroll direction is
   *  from bottom to top.
   * @private {boolean}
   * @type {boolean}
   * @field
   */
	let isTop_ = false;

  /**
   * @description Resets bottom
   *  values.
   * @constant {Function}
   * @private {Function}
   * @function reset_
   * @returns {void} void
   */
  const resetBottom_ = () => {
    // Sets `isBottom_` field.
    isBottom_ = false;
    // Removes `arrows-hide-bottom`
    // class from arrows container.
    arrows_.classList.remove (
      "arrows-hide-bottom"
    );
    // Hides bottom arrow.
    arrows_.children[1]
      .classList.remove (
        "arrow-show"
      );
  };

  /**
   * @description Resets top
   *  values.
   * @constant {Function}
   * @private {Function}
   * @function reset_
   * @returns {void} void
   */
  const resetTop_ = () => {
    // Sets `isTop_` field.
    isTop_ = false;
    // Removes `arrows-hide-top`
    // class from arrows
    // container.
    arrows_.classList.remove (
      "arrows-hide-top"
    );
    // Hides top arrow.
    arrows_.children[0]
      .classList.remove (
        "arrow-show"
      );
  };

  /**
   * @description Shows out
   *  the bottom arrow to
   *  help user to go at
   *  the end of page
   *  faster.
   * @function showBottom_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const showBottom_ = () => {
    // Sets `isBottom_` field.
    isBottom_ = true;
    // Resets top values.
    resetTop_ ();
    // Adds `arrows-hide-bottom`
    // class to arrows
    // container.
    arrows_.classList.add (
      "arrows-hide-bottom"
    );
    // Shows bottom arrow.
    arrows_.children[1]
      .classList.add (
        "arrow-show"
      );
  };

  /**
   * @description Shows out
   *  the top arrow to help
   *  user to go at begin
   *  of page faster.
   * @constant {Function}
   * @private {Function}
   * @function showTop_
   * @returns {void} void
   */
  const showTop_ = () => {
    // Resets bottom values.
    resetBottom_ ();
    // Sets `isTop_` field.
    isTop_ = true;
    // Adds `arrows-hide-top`
    // class from arrows
    // container.
    arrows_.classList.add (
      "arrows-hide-top"
    );
    // Shows top arrow.
    arrows_.children[0]
      .classList.add (
        "arrow-show"
      );
  };

  /**
   * @description Resets process
   *  values for upcomming
   *  detection.
   * @constant {Function}
   * @private {Function}
   * @function reset_
   * @returns {void} void
   */
  const reset_ = () => {
    // Removes `arrows-show`
    // class from arrows
    // container.
    arrows_.classList.remove (
      "arrows-show"
    );
    // Waits for 200 milliseconds.
    hideId_ = (
      window.setTimeout (() => {
        // Resets bottom values.
        resetBottom_ ();
        // Resets top values.
        resetTop_ ();
      }, 200)
    );
  };

  /**
   * @description Listens window
   *  `scroll` event to known
   *  the scrollbar direction.
   * @function listenScroll_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const listenScroll_ = () => {
    // Listens `click` event on
    // arrows container.
    arrows_.addEventListener (
      "click", () => {
        // Whether we try to
        // go at bottom.
        if (isBottom_) {
          // Scrolls to the last
          // page section.
          scrollTo (
            "section.faq"
          );
        // Whether we try to
        // go at top.
        } else if (isTop_) {
          // Scrolls to the first
          // page section.
          scrollTo (
            "section.banner"
          );
        }
      }
    );
    // Listens `scroll` event.
    window.addEventListener (
      "scroll", () => {
        // Destroys reseting
        // process's id.
        window.clearTimeout (
          resetId_
        );
        // Destroys hide
        // process's id.
        window.clearTimeout (
          hideId_
        );
        // The current scroll
        // percentage.
        const percent = (
          getScrollPercent ()
        );
        // Whether the current
        // scroll pos is bigger
        // than the old pos.
        if (
          percent > oldScrollPos_
          && !isBottom_
        ) {
          // Shows the bottom arrow.
          showBottom_ ();
        // Whether the current
        // scroll pos is less
        // than the old pos.
        } else if (
          percent < oldScrollPos_
          && !isTop_
        ) {
          // Shows the top arrow.
          showTop_ ();
        }
        // Updates the old scroll
        // position.
        oldScrollPos_ = percent;
        // Waits for (05) seconds
        // before reset values.
        resetId_ = (
          window.setTimeout (
            reset_, 3000
          )
        );
        // Waits for 200 milliseconds.
        window.setTimeout (() => {
          // Adds `arrows-show`
          // class from arrows
          // container.
          arrows_.classList.add (
            "arrows-show"
          );
        }, 200);
      }
    );
  };

  /**
	 * @description Builds arrows
	 * 	html structure as string
	 * 	format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Creates a div tag.
		arrows_ = (
			document.createElement (
				"div"
			)
		);
		// Adds a class's name to
		// the created div.
		arrows_.classList.add (
			"arrows"
		);
		// Adds a html structure
		// to the created div.
		arrows_.innerHTML = `
      ${buildIcon ({
        fileName: (
          Icons.RIGHT_ARROW
        ),
        data: {
          idName: "arrows-img",
          title: "Go to top."
        }
      })}
      ${buildIcon ({
        fileName: (
          Icons.RIGHT_ARROW
        ),
        data: {
          title: "Go to bottom.",
          idName: "arrows-img",
        }
      })}
      <div
        class = "${
          "skeleton-loading"
        }"
      ></div>
    `;
    // Adds the above div
		// to the selected
    // tag as a child.
		document.querySelector (
			"aside"
		).appendChild (arrows_);
    // Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#arrows-img"
				)
			),
			onReady: () => {
        // Listens window `scroll`
        // event to show an arrow
        // regarding the scroll
        // direction.
        listenScroll_ ();
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				arrows_.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					arrows_.lastElementChild
						.remove ()
				), 200);
			}
		});
  };
}

/**
 * @description Exports
 * 	all public features.
 * @exports *
 */
export {Arrows};
