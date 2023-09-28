/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Pricing UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-27
* @updated 2023-09-28
* @file pricing.js
* @type {Pricing}
* @version 0.0.2
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import {buildButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import lang from "../../../common/utilities/language/language.js";
import {
  animateTextContent,
  getUpdates,
  clearStr
} from "../../../common/utilities/string/string.js";
import {
	buildIcon,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds pricing section.
 * @public
 * @class
 * @returns {Pricing} Pricing
 */
function Pricing () {
  /**
   * @description The pricing
   *  section tag reference.
   * @private {?Element}
   * @type {?Element}
   * @field
   */
  let section_ = null;
  /**
 	 * @description The old
   *  active subscription
   *  index.
	 * @constant {int}
 	 * @private {int}
	 * @field
	 */
	let oldIndex_ = 0;
  /**
	 * @description The head
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let head_ = null;
  /**
	 * @description The body
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let body_ = null;

  /**
	 * @description Animates the
   *  pricing section with an
   *  opacity transition.
   * @param {String} dir The
   *  animation's direction.
   * @constant {Function}
   * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = dir => {
		// Whether the direction
    // isn't normal.
    if (dir !== "normal") {
      // Hides the pricing
      // section.
      section_.classList.remove (
        "pricing-show"
      );
    // Otherwise.
    } else {
      // Shows the pricing
      // section.
      section_.classList.add (
        "pricing-show"
      );
    }
	};

 /**
  * @description Coordinates the
  *  moving between subscriptions.
  * @param {{
  *  trigger: Element,
  *  index: int
  * }} data The useful data configs
  *  to manage subscriptions
  *  mutations. It accepts
  *  the following keys:
  *
  *  - Element trigger: The current
  *    click trigger reference.
  *
  *  - int index: The trigger's
  *    position index.
  * @function coordinateSub_
  * @constant {Function}
  * @private {Function}
  * @returns {void} void
  */
  const coordinateSub_ = ({
    trigger,
    index
  }) => {
    // Whether the old index.
    // isn't equal to the
    // current index.
    if (oldIndex_ !== index) {
      // Removes `price-active-sub`
      // class from the old
      // subscription trigger.
      trigger.parentNode
        .children[oldIndex_]
        .classList.remove (
          "price-active-sub"
        );
      // Adds `price-active-sub`
      // class to the current
      // subscription trigger.
      trigger.classList.add (
        "price-active-sub"
      );
      // Go to the first
      // subscription.
      nextSubscription_ ({
        trigger,
        index
      });
    }
  };

  /**
   * @description Go to a subscription
   *  according to the old and active
   *  subscription.
   * @param {{
   *  trigger: Element,
   *  index: int
   * }} data The useful data to go
   *  to the target subscription.
   *  This map supports the
   *  following keys:
   *
   *  - Element trigger: The current
   *    click trigger reference.
   *
   *  - int index: The trigger's
   *    position index.
   * @function nextSubscription_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const nextSubscription_ = ({
    trigger,
    index
  }) => {
    // The difference between
    // the current index and
    // the old index.
    const diff = Math.abs (
      index - oldIndex_
    );
    // The subscriptions
    // container tag ref.
    const container = (
      trigger.parentNode
        .parentNode
        .children[1]
    );
    // Whether active index
    // is greater than the
    // old index.
    if (index > oldIndex_) {
      // Moves the scroll
      // bar of container
      // of subscriptions
      // to right.
      container.scrollLeft += (
        container.children[0]
          .offsetWidth * diff
      );
    // Otherwise.
    } else {
      // Moves the scroll
      // bar of container
      // of subscriptions
      // to left.
      container.scrollLeft -= (
        container.children[0]
          .offsetWidth * diff
      );
    }
    // Updates the old
    // subscription's
    // index.
    oldIndex_ = index;
  };

  /**
   * @description Listens `click`
   *  event on any subscription
   *  head section.
   * @function listenClick_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const listenClick_ = () => {
    // Listens the first trigger.
    head_.children[0].addEventListener (
      "click", function () {
        // Coordinates subscriptions.
        coordinateSub_ ({
          trigger: this,
          index: 0
        });
      }
    );
    // Listens the second trigger.
    head_.children[1].addEventListener (
      "click", function () {
        // Coordinates subscriptions.
        coordinateSub_ ({
          trigger: this,
          index: 1
        });
      }
    );
    // Listens the third trigger.
    head_.children[2].addEventListener (
      "click", function () {
        // Coordinates subscriptions.
        coordinateSub_ ({
          trigger: this,
          index: 2
        });
      }
    );
    // Resets scroll and go to
    // the first subscription.
    const reset = () => {
      // Resets the scroll
      // bar postion.
      body_.scrollLeft = 0;
      // Go to the first
      // subscription.
      coordinateSub_ ({
        index: 0,
        trigger: (
          head_.children[0]
        )
      });
    };
    // Listens window resizing.
    new ScreenManager ({
			onMedium: reset,
			onSmall: reset,
			onLarge: reset,
			mediumScreen: {
				max: 770,
				min: 0
			},
			smallScreen: {
				max: 1080,
				min: 771
			},
			largeScreen: {
				max: 10000,
				min: 1081
			}
		});
  };

  /**
   * @description Builds a subscription.
   * @param {{
   *  features: Array<Object<String, any>>,
   *  featuresTitle: Object<String, any>,
   *  priceInfo: Object<String, any>,
   *  button: Object<String, any>,
   *  title: Object<String, any>,
   *  desc: Object<String, any>,
   *  currency: String,
   *  price: int,
   *  id: int
   * }} data The subscription data.
   *  This object supports the
   *  following keys:
   *
   *  - Object title: The subscription
   *    global title.
   *
   *  - Array features: The subscription's
   *    features.
   *
   *  - Object button: The starting
   *    button text.
   *
   *  - Object featuresTitle: The
   *    provided features's title.
   *
   *  - Object desc: The subscription
   *    description text.
   *
   *  - Object priceInfo: The price
   *    info of the subscription.
   *
   *  - String currency: The accepted
   *    currency's name for the
   *    subscription.
   *
   *  - int price: The subscription's
   *    price according to the given
   *    currency.
   *
   *  - int id: The id of static texts
   *    data.
   * @function buildSubscription_
   * @constant {Function}
   * @private {Function}
   * @returns {String} String.
   */
  const buildSubscription_ = ({
    featuresTitle,
    priceInfo,
    features,
    currency,
    button,
    title,
    price,
    desc,
    id
  }) => {
    // The provided features.
    let fonctionalities = '';
    // Generating features.
    features.forEach (feature => {
      // Generates a `li` tag
      // for the current
      // feature.
      fonctionalities += `
        <span>
          <span>
            ${buildIcon ({
              fileName: Icons.CHECKED,
              data: {
                idName: "price-img"
              }
            })}
          </span>
          <span
            id = "price-data"
            price-index = "${
              feature.id
            }::${feature.pos}"
          >
            ${clearStr ({
              input: feature.value
            })}
          </span>
        </span>
      `;
    });
    // Generates html structure.
    return `
      <div class = "subscription">
        <div class = "sub-infos">
          <h3
            id = "price-data"
            price-index = "${
              title.id
            }::${title.pos}"
          >
            ${title.value}
          </h3>
          <p
            id = "price-data"
            price-index = "${
              desc.id
            }::${desc.pos}"
          >
            ${clearStr ({
              input: desc.value
            })}
          </p>
          <span class = "sub-price">
            <label>${currency}</label>
            <label>${price}</label>
            <span>
              <p
                price-index = "tr74::${id}"
                id = "price-data"
              >
                ${lang.getText ("tr74")}
              </p>
              <p
                id = "price-data"
                price-index = "${
                  priceInfo.id
                }::${priceInfo.pos}"
              >
                ${clearStr ({
                  input: (
                    priceInfo.value
                  )
                })}
              </p>
            </span>
          </span>
          ${buildButton ({
            textId: "price-data",
            text: button.value,
            customAttr: (
							`price-index = ${
								button.id
							}::${button.pos}`
						)
          })}
        </div>
        <div class = "sub-features">
          <h4
            id = "price-data"
            price-index = "${
              featuresTitle.id
            }::${featuresTitle.pos}"
          >
            ${clearStr ({
              input: (
                featuresTitle.value
              )
            })} :
          </h4>
          <div>
            ${fonctionalities}
          </div>
        </div>
      </div>
    `;
  };

  /**
	 * @description Builds pricing
   *  html structure as string
   *  format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
    // The main tag element.
		const main = (
			window.store.getState ()
				.main
		);
    // Creates a section tag.
    section_ = (
      document.createElement (
        "section"
      )
    );
    // Adds a class's name to
    // the created section.
    section_.classList.add (
      "pricing"
    );
    // Adds `auto-scrollable`
		// attribute for auto
		// background process.
		section_.setAttribute (
			"auto-scrollable",
			true
		);
    // Adds a html structure
    // to the created section.
    section_.innerHTML = `
      <h2
        price-index = "tr75::0"
        class = "price-title"
        id = "price-data"
      >
        ${lang.getText ("tr75")}
      </h2>
      <div class = "price-content">
        <div class = "price-head">
          <button
            class = "price-active-sub"
            price-index = "tr76::1"
            id = "price-data"
          >
            ${lang.getText ("tr76")}
          </button>
          <button
            price-index = "tr77::2"
            id = "price-data"
          >
            ${lang.getText ("tr77")}
          </button>
          <button
            price-index = "tr78::3"
            id = "price-data"
          >
            ${lang.getText ("tr78")}
          </button>
        </div>
        <div class = "price-body">
          ${buildSubscription_ ({
            currency: '$',
            price: 0,
            id: 0,
            featuresTitle: {
              value: lang.getText ("tr79"),
              id: "tr79",
              pos: 4
            },
            priceInfo: {
              value: lang.getText ("tr82"),
              id: "tr82",
              pos: 6
            },
            button: {
              value: lang.getText ("tr80"),
              id: "tr80",
              pos: 5
            },
            title: {
              value: lang.getText ("tr76"),
              id: "tr76",
              pos: 7
            },
            desc: {
              value: lang.getText ("tr81"),
              id: "tr81",
              pos: 8
            },
            features: [
              {
                value: lang.getText ("tr83"),
                id: "tr83",
                pos: 9
              },
              {
                value: lang.getText ("tr84"),
                id: "tr84",
                pos: 10
              },
              {
                value: lang.getText ("tr85"),
                id: "tr85",
                pos: 11
              },
              {
                value: lang.getText ("tr86"),
                id: "tr86",
                pos: 12
              }
            ]
          })}
          ${buildSubscription_ ({
            currency: '$',
            price: 29,
            id: 1,
            featuresTitle: {
              value: lang.getText ("tr87"),
              id: "tr87",
              pos: 13
            },
            priceInfo: {
              value: lang.getText ("tr89"),
              id: "tr89",
              pos: 15
            },
            button: {
              value: lang.getText ("tr88"),
              id: "tr88",
              pos: 14
            },
            title: {
              value: lang.getText ("tr90"),
              id: "tr90",
              pos: 16
            },
            desc: {
              value: lang.getText ("tr91"),
              id: "tr91",
              pos: 17
            },
            features: [
              {
                value: lang.getText ("tr92"),
                id: "tr92",
                pos: 18
              },
              {
                value: lang.getText ("tr93"),
                id: "tr93",
                pos: 19
              },
              {
                value: lang.getText ("tr94"),
                id: "tr94",
                pos: 20
              },
              {
                value: lang.getText ("tr95"),
                id: "tr95",
                pos: 21
              },
              {
                value: lang.getText ("tr96"),
                id: "tr96",
                pos: 22
              },
              {
                value: lang.getText ("tr97"),
                id: "tr97",
                pos: 23
              },
              {
                value: lang.getText ("tr98"),
                id: "tr98",
                pos: 24
              },
              {
                value: lang.getText ("tr99"),
                id: "tr99",
                pos: 25
              },
              {
                value: lang.getText ("tr100"),
                id: "tr100",
                pos: 26
              }
            ]
          })}
          ${buildSubscription_ ({
            currency: '$',
            price: 99,
            id: 2,
            featuresTitle: {
              value: lang.getText ("tr101"),
              id: "tr101",
              pos: 27
            },
            priceInfo: {
              value: lang.getText ("tr103"),
              id: "tr103",
              pos: 28
            },
            button: {
              value: lang.getText ("tr102"),
              id: "tr102",
              pos: 29
            },
            title: {
              value: lang.getText ("tr104"),
              id: "tr104",
              pos: 30
            },
            desc: {
              value: lang.getText ("tr105"),
              id: "tr105",
              pos: 31
            },
            features: [
              {
                value: lang.getText ("tr106"),
                id: "tr106",
                pos: 32
              },
              {
                value: lang.getText ("tr107"),
                id: "tr107",
                pos: 33
              },
              {
                value: lang.getText ("tr108"),
                id: "tr108",
                pos: 34
              },
              {
                value: lang.getText ("tr109"),
                id: "tr109",
                pos: 35
              },
              {
                value: lang.getText ("tr110"),
                id: "tr110",
                pos: 36
              },
              {
                value: lang.getText ("tr111"),
                id: "tr111",
                pos: 37
              },
              {
                value: lang.getText ("tr112"),
                id: "tr112",
                pos: 38
              },
              {
                value: lang.getText ("tr113"),
                id: "tr113",
                pos: 39
              },
              {
                value: lang.getText ("tr114"),
                id: "tr114",
                pos: 40
              },
              {
                value: lang.getText ("tr115"),
                id: "tr115",
                pos: 41
              },
              {
                value: lang.getText ("tr116"),
                id: "tr116",
                pos: 42
              },
              {
                value: lang.getText ("tr117"),
                id: "tr117",
                pos: 43
              },
              {
                value: lang.getText ("tr118"),
                id: "tr118",
                pos: 44
              }
            ]
          })}
        </div>
      </div>
      <div
				class = "${
					"skeleton-loading"
				}"
			></div>
    `;
    // Adds the above section
    // to the selected tag as
    // a child.
    document.querySelector (
      "main"
    ).appendChild (section_);
    // The pricing trigger
    // container.
    head_ = (
      document.querySelector (
        "div.price-head"
      )
    );
    // The pricing body
    // container.
    body_ = (
      document.querySelector (
        "div.price-body"
      )
    );
    // Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#price-img"
				)
			),
			onReady: () => {
        // Listens subscription
        // triggers `click`
        // event.
        listenClick_ ();
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				section_.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					section_.lastElementChild
						.remove ()
				), 200);
				// Called when any changement
				// is detected by redux.
				window.store.subscribe (
					() => {
						// Changes all tags
						// text's content
						// with a textual
						// animation.
						animateTextContent (
							getUpdates ({
								attrPrefix: (
									"price-index"
								),
								textualsId: (
									"price-data"
								)
							})
						);
					}
				);
				// Focus on the current
				// section for scrolling.
				new ScrollManager ({
					offsetBottom: 240,
					target: section_,
					offsetTop: 240,
					scope: window,
					root: main,
					onEnter: () => {
            // Animates the pricing
            // with normal mode.
            animate_ ("normal");
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (3);
					},
					onLeave: () => {
						// Animates the pricing
            // with reverse mode.
            animate_ ("reverse");
					}
				});
			}
		});
  }
}

/**
 * @description Exports
 *  all public features.
 * @exports *
 */
export {Pricing};
