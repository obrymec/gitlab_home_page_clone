/**
* @fileoverview Pricing UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-27
* @updated 2023-07-28
* @file pricing.js
* @type {Pricing}
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds pricing
 *  section.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 		 the pricing section.
 * @returns {Pricing} Pricing
 */
function Pricing (data) {
  /**
 	 * @description The old active
   *  subscription index.
	 * @constant {int}
 	 * @private {int}
	 * @field
	 */
	let oldIndex = 0;
	/**
 	 * @description The parent id.
	 * @constant {?String}
 	 * @private {?String}
	 * @field
	 */
	const parentId_ = (
		typeof data?.parentId === "string"
		? data.parentId.replace (/ /g, '')
		: null
	);

  /**
   * @description Builds an icon button.
   * @function buildIconButton_
   * @constant {Function}
   * @private {Function}
   * @returns {String} String
   */
  const buildIconButton_ = () => `
    <img
      src = "${`
        ../../../../../assets/
        icons/right-arrow.svg
      `.replaceAll ('\n', '')
       .replaceAll (' ', '')
      }"
      alt = ''
    />
  `;

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
  *  - Element trigger: The current
  *    click trigger reference.
  *  - int index: The trigger's
  *    position index.
  * @function coordinateSub_
  * @constant {Function}
  * @private {Function}
  * @returns {void} void
  */
  const coordinateSub_ = ({
    trigger, index
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
   *  - Element trigger: The current
   *    click trigger reference.
   *  - int index: The trigger's
   *    position index.
   * @function nextSubscription_
   * @constant {Function}
   * @private {Function}
   * @returns {void} void
   */
  const nextSubscription_ = ({
    index, trigger
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
    // is great than the old
    // index.
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
    // Listens window resizing.
    window.addEventListener (
      "resize", () => {
        // Whether window's size
        // is less than 771.
        if (window.innerWidth < 771) {
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
        }
      }
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
   * }} data The subscription
   *  data. This object supports the
   *  following keys:
   *  - String title: The subscription
   *    global title.
   *  - Array<String> features: The
   *    subscription's features.
   *  - String buttonText: The
   *    starting button text.
   *  - String featuresTitle: The
   *    provided features's title
   *  - String desc: The subscription
   *    description text.
   *  - String priceInfo: The price
   *    info of the subscription.
   *  - String currency: The accepted
   *    currency's name for the
   *    subscription.
   *  - int price: The subscription's
   *    price according to the given
   *    currency.
   * @function buildSubscription_
   * @constant {Function}
   * @private {Function}
   * @returns {String} String.
   */
  const buildSubscription_ = data => {
    // The provided features.
    let features = '';
    // Generating features.
    data?.features.forEach (feature => {
      // Generates a `li` tag
      // for the current feature.
      features += `
        <span>
          <span>
            <img
              src = "${`
                ../../../../../assets/
                icons/checked.svg
              `.replaceAll ('\n', '')
               .replaceAll (' ', '')
              }"
              alt = ''
            />
          </span>
          <span>
            ${
              feature
                ?.replaceAll ('\n', '')
                ?.trim ()
            }
          </span>
        </span>
      `;
    });
    // Generates html structure.
    return `
      <div class = "subscription">
        <div class = "sub-infos">
          <h3>${data?.title}</h3>
          <p>
            ${
              data?.desc
                ?.replaceAll ('\n', '')
                ?.trim ()
            }
          </p>
          <span class = "sub-price">
            <label>
              ${data?.currency}
            </label>
            <label>
              ${data?.price}
            </label>
            <span>
              <p>Per user/month</p>
              <p>
                ${
                  data?.priceInfo
                    ?.replaceAll ('\n', '')
                    ?.trim ()
                }
              </p>
            </span>
          </span>
          <button>
            ${data?.buttonText}
					</button>
        </div>
        <div class = "sub-features">
          <h4>
            ${
              data?.featuresTitle
                ?.replaceAll ('\n', '')
                ?.trim ()
            } :
          </h4>
          <div>${features}</div>
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
		// Whether parent id is not
		// null.
		if (parentId_ != null) {
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
          Pricing
        </h2>
        <div class = "price-content">
          <div class = "price-head">
            <button
              class = "price-active-sub"
            >Free</button>
            <button>Premium</button>
            <button>Ultimate</button>
          </div>
          <div class = "price-body">
            ${buildSubscription_ ({
              currency: '$',
              title: "Free",
              price: 0,
              featuresTitle: `
                Free features
              `,
              buttonText: `
                Get Started
              `,
              desc: `
                Essential features 
                for individual users
              `,
              priceInfo: `
                No credit card 
                required
              `,
              features: [
                "5GB storage",
                `
                  10GB transfer 
                  per month
                `,
                `
                  400 compute minutes 
                  per month
                `,
                `
                  5 users per top
                  -level group
                `
              ]
            })}
            ${buildSubscription_ ({
              title: "Premium",
              currency: '$',
              price: 29,
              buttonText: `
                Buy GitLab Premium
              `,
              desc: `
                Enhance team productivity 
                and coordination
              `,
              featuresTitle: `
                Everything from 
                Free, plus
              `,
              priceInfo: `
                Billed annually 
                at $348 USD
              `,
              features: [
                `
                  Code Ownership and 
                  Protected Branches
                `,
                `
                  Merge Requests with 
                  Approval Rules
                `,
                `
                  Enterprise Agile 
                  Planning
                `,
                `Advanced CI/CD`,
                `
                  Enterprise User and 
                  Incident Management
                `,
                `Support`,
                `50GB storage`,
                `
                  100GB transfer per 
                  month
                `,
                `
                  10,000 compute 
                  minutes per month
                `
              ]
            })}
            ${buildSubscription_ ({
              title: "Ultimate",
              currency: '$',
              price: 99,
              buttonText: `
                Buy GitLab Ultimate
              `,
              desc: `
                Organization-wide 
                security, compliance, 
                and planning
              `,
              featuresTitle: `
                Everything from 
                Premium, plus
              `,
              priceInfo: `
                Billed annually 
                at $1188 USD
              `,
              features: [
                `Suggested Reviewers`,
                `
                  Dynamic Application 
                  Security Testing
                `,
                `Security Dashboards`,
                `
                  Vulnerability 
                  Management
                `,
                `Dependency Scanning`,
                `Container Scanning`,
                `
                  Static Application 
                  Security Testing
                `,
                `Multi-Level Epics`,
                `
                  Value stream 
                  management
                `,
                `250GB storage`,
                `
                  500GB transfer 
                  per month
                `,
                `
                  50,000 compute 
                  minutes per month
                `,
                `Free guest users`
              ]
            })}
          </div>
        </div>
      `;
      // Adds the below section
			// to the selected tag as
			// a child.
			document.querySelector (
				parentId_
			).appendChild (section);
      // Listens subscription
      // triggers click.
      listenClick_ ();
    }
  }
}

/**
 * @description Exports all public
 *  features.
 * @exports *
 */
export {Pricing};
