/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview Pricing UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-27
* @updated 2023-08-25
* @file pricing.js
* @type {Pricing}
* @version 0.0.2
*/

// Custom dependencies.
import {buildButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
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
 	 * @description The old active
   *  subscription index.
	 * @constant {int}
 	 * @private {int}
	 * @field
	 */
	let oldIndex = 0;

 /**
  * @description Coordinates the
  *  moving between subscriptions.
  * @param {{
  *  trigger: Element,
  *  index: int
  * }} data The useful data to
  *  manage subscriptions
  *  mutations. It supports the
  *  following keys:
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
    if (oldIndex !== index) {
      // Removes `price-active-sub`
      // class from the old
      // subscription trigger.
      trigger.parentNode
        .children[oldIndex]
        .classList.remove (
          "price-active-sub"
        );
      // Adds `price-active-sub`
      // class from the current
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
   * @description Go to a section
   *  according to the old and
   *  active subscription.
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
    // the old inde.
    const diff = Math.abs (
      index - oldIndex
    );
    // The subscriptions
    // container tag ref.
    const container = (
      trigger.parentNode
        .parentNode
        .children[1]
    );
    // Whether active index
    // is great than the
    // old index.
    if (index > oldIndex) {
      // Moves the scroll
      // bar of container
      // of subscriptions
      // to the right.
      container.scrollLeft += (
        container.children[0]
          .offsetWidth * diff
      );
    // Otherwise.
    } else {
      // Moves the scroll
      // bar of container
      // of subscriptions
      // to the left.
      container.scrollLeft -= (
        container.children[0]
          .offsetWidth * diff
      );
    }
    // Updates the old
    // subscription's
    // index.
    oldIndex = index;
  };

  /**
   * @description Listens `click`
   *  on any subscription head
   *  section.
   * @function listenClick_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const listenClick_ = () => {
    // The pricing trigger
    // container.
    const head = (
      document.querySelector (
        "div.price-head"
      )
    );
    // Listens the first trigger.
    head.children[0].addEventListener (
      "click", function () {
        // Coordinates subscriptions.
        coordinateSub_ ({
          trigger: this,
          index: 0
        });
      }
    );
    // Listens the second trigger.
    head.children[1].addEventListener (
      "click", function () {
        // Coordinates subscriptions.
        coordinateSub_ ({
          trigger: this,
          index: 1
        });
      }
    );
    // Listens the third trigger.
    head.children[2].addEventListener (
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
      document.querySelector (
        "div.price-body"
      ).scrollLeft = 0;
      // Go to the first
      // subscription.
      coordinateSub_ ({
        index: 0,
        trigger: (
          head.children[0]
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
   *  features: Array<String>,
   *  featuresTitle: String,
   *  buttonText: String,
   *  priceInfo: String,
   *  currency: String,
   *  title: String,
   *  desc: String,
   *  price: int
   * }} data The subscription data.
   *  This object supports the
   *  following keys:
   *
   *  - String title: The subscription
   *    global title.
   *
   *  - Array features: The subscription's
   *    features.
   *
   *  - String buttonText: The starting
   *    button text.
   *
   *  - String featuresTitle: The
   *    provided features's title.
   *
   *  - String desc: The subscription
   *    description text.
   *
   *  - String priceInfo: The price
   *    info of the subscription.
   *
   *  - String currency: The accepted
   *    currency's name for the
   *    subscription.
   *
   *  - int price: The subscription's
   *    price according to the given
   *    currency.
   * @function buildSubscription_
   * @constant {Function}
   * @private {Function}
   * @returns {String} String.
   */
  const buildSubscription_ = ({
    featuresTitle,
    buttonText,
    priceInfo,
    features,
    currency,
    title,
    price,
    desc
  }) => {
    // The provided features.
    let fonctionalities = '';
    // Generating features.
    features.forEach (feature => {
      // Generates a `li` tag
      // for the current feature.
      fonctionalities += `
        <span>
          <span>
            ${buildIcon ({
              fileName: Icons.CHECKED
            })}
          </span>
          <span>
            ${clearStr ({
              input: feature
            })}
          </span>
        </span>
      `;
    });
    // Generates html structure.
    return `
      <div class = "subscription">
        <div class = "sub-infos">
          <h3>${title}</h3>
          <p>
            ${clearStr ({
              input: desc
            })}
          </p>
          <span class = "sub-price">
            <label>${currency}</label>
            <label>${price}</label>
            <span>
              <p>
                ${lang.getText ("tr74")}
              </p>
              <p>
                ${clearStr ({
                  input: priceInfo
                })}
              </p>
            </span>
          </span>
          ${buildButton ({
            text: buttonText
          })}
        </div>
        <div class = "sub-features">
          <h4>
            ${clearStr ({
              input: featuresTitle
            })} :
          </h4>
          <div>${fonctionalities}</div>
        </div>
      </div>
    `;
  };

  /**
	 * @description Builds pricing html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
    // Creates a section tag.
    const section = (
      document.createElement (
        "section"
      )
    );
    // Adds a class's name to
    // the created section.
    section.classList.add (
      "pricing"
    );
    // Adds a html structure
    // to the created section.
    section.innerHTML = `
      <h2 class = "price-title">
        ${lang.getText ("tr75")}
      </h2>
      <div class = "price-content">
        <div class = "price-head">
          <button
            class = "price-active-sub"
          >
            ${lang.getText ("tr76")}
          </button>
          <button>
            ${lang.getText ("tr77")}
          </button>
          <button>
            ${lang.getText ("tr78")}
          </button>
        </div>
        <div class = "price-body">
          ${buildSubscription_ ({
            featuresTitle: lang.getText ("tr79"),
            buttonText: lang.getText ("tr80"),
            priceInfo: lang.getText ("tr82"),
            title: lang.getText ("tr76"),
            desc: lang.getText ("tr81"),
            currency: '$',
            price: 0,
            features: [
              lang.getText ("tr83"),
              lang.getText ("tr84"),
              lang.getText ("tr85"),
              lang.getText ("tr86")
            ]
          })}
          ${buildSubscription_ ({
            featuresTitle: lang.getText ("tr87"),
            buttonText: lang.getText ("tr88"),
            priceInfo: lang.getText ("tr89"),
            title: lang.getText ("tr90"),
            desc: lang.getText ("tr91"),
            currency: '$',
            price: 29,
            features: [
              lang.getText ("tr92"),
              lang.getText ("tr93"),
              lang.getText ("tr94"),
              lang.getText ("tr95"),
              lang.getText ("tr96"),
              lang.getText ("tr97"),
              lang.getText ("tr98"),
              lang.getText ("tr99"),
              lang.getText ("tr100")
            ]
          })}
          ${buildSubscription_ ({
            featuresTitle: lang.getText ("tr101"),
            buttonText: lang.getText ("tr102"),
            priceInfo: lang.getText ("tr103"),
            title: lang.getText ("tr104"),
            desc: lang.getText ("tr105"),
            currency: '$',
            price: 99,
            features: [
              lang.getText ("tr106"),
              lang.getText ("tr107"),
              lang.getText ("tr108"),
              lang.getText ("tr109"),
              lang.getText ("tr110"),
              lang.getText ("tr111"),
              lang.getText ("tr112"),
              lang.getText ("tr113"),
              lang.getText ("tr114"),
              lang.getText ("tr115"),
              lang.getText ("tr116"),
              lang.getText ("tr117"),
              lang.getText ("tr118")
            ]
          })}
        </div>
      </div>
    `;
    // Adds the below section
    // to the selected tag as
    // a child.
    document.querySelector (
      "main"
    ).appendChild (section);
    // Listens subscription
    // triggers click.
    listenClick_ ();
  }
}

/**
 * @description Exports all
 *  public features.
 * @exports *
 */
export {Pricing};
