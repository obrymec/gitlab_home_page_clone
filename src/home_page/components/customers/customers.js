/**
* @fileoverview Customers UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-21
* @updated 2023-08-12
* @file customers.js
* @type {Customers}
* @version 0.0.2
*/

// Custom dependencies.
import {clearJSStyle} from "../../../common/utilities/browser/browser.js";
import {writeText} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildLogo,
	Logos
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds customer section.
 * @public
 * @class
 * @returns {Customers} Customers
 */
function Customers () {
	/**
	 * @description Puts a timeline
	 * 	to all children of a tag.
	 * @param {Object} timeline The
	 * 	animation timeline.
	 * @param {Element} parent The
	 * 	target children parent.
	 * @function putTimeline_
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const putTimeline_ = (
		timeline, parent
	) => {
		// Building timeline.
		for (
			const child of
			Array.from (
				parent.children
			).reverse ()
		) {
			// Creates a timeline
			// to the current child.
			timeline.add ({
				scale: [0.0, 1.0],
				targets: child
			});
		}
		// Returns the passed
		// timeline.
		return timeline;
	};

	/**
	 * @description Animates customers
	 * 	with the possibility to control
	 * 	animation's direction.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = direction => {
		// Whether the direction is
		// normal mode.
		if (direction === "normal") {
			// Animates customers
			// with normal mode.
			animateCustomers_ ().play ();
			// Animates the text.
			writeText ({
				text: lang.getText ("tr15"),
				interval: 800,
				target: (
					document.querySelector (
						"section.customers"
					).children[0]
				)
			});
		// Otherwise.
		} else {
			// Animates customers
			// with reverse mode.
			animateCustomers_ ().reverse ();
		}
	};

	/**
	 * @description Animates customers.
	 * @function animateCustomers_
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const animateCustomers_ = () => {
		// The right customers tag.
		const rightGuest = (
			document.querySelector (
				"div.right-customers"
			)
		);
		// The left customers tag.
		const leftGuest = (
			document.querySelector (
				"div.left-customers"
			)
		);
		// Creates a timeline with
		// default parameters.
		const timeline = (
			anime.timeline ({
				easing: "linear",
				autoplay: false,
				duration: 120,
				delay: 26,
				complete: function () {
					// Clears javascript
					// animation data.
					clearJSStyle ({
						direction: this.direction,
						targets: [
							{
								start: "guest-logo-as",
								end: "guest-logo-af",
								ref: rightGuest,
								children: true
							},
							{
								start: "guest-logo-as",
								end: "guest-logo-af",
								ref: leftGuest,
								children: true
							}
						]
					});
				}
			})
		);
		// Animates right customers
		putTimeline_ (
			timeline, rightGuest
		);
		// Animates left customers
		putTimeline_ (
			timeline, leftGuest
		);
		// Returns the created
		// timeline for future
		// usage.
		return timeline;
	};

	/**
	 * @description Builds customers html
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
			"customers"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<label></label>
			<div>
				<div class = "left-customers">
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.T_MOBILE
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.GOLDMAN
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.AIRBUS
						})}
					</span>
				</div>
				<div class = "right-customers">
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.MARTIN
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.NVIDIA
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.UBS
						})}
					</span>
				</div>
			</div>
		`;
		// Adds the below nav section
		// to the main tag as a child.
		document.querySelector (
			"main"
		).appendChild (section);
		// Animates the customers.
		animate_ ("normal");
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Customers};
