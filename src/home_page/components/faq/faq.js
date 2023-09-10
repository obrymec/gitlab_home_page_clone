/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview FAQ UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-20
* @updated 2023-09-10
* @version 0.0.2
* @file faq.js
* @type {FAQ}
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	getUpdates
} from "../../../common/utilities/string/string.js";
import {
	buildFlatButton,
	buildButton
} from "../../../common/components/button/button.js";
import {
	buildImage,
	Images
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds faq section.
 * @public
 * @class
 * @returns {FAQ} FAQ
 */
function FAQ () {
	/**
	 * @description The right
	 * 	part.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let rightPart_ = null;
	/**
	 * @description The left
	 * 	part.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let leftPart_ = null;
	/**
	 * @description The middle
	 * 	vertical line.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let vline_ = null;

	/**
	 * @description Animates faq section.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = direction => {
		// Whether the direction
		// is reverse.
		if (
			direction === "reverse"
		) {
			// Animates the right
			// part.
			rightPart_.classList
				.remove (
					"faq-part-show"
				);
			// Animates the left
			// part.
			leftPart_.classList
				.remove (
					"faq-part-show"
				);
			// Animates the vline.
			vline_.classList
				.remove (
					"faq-vline-show"
				);
		// Otherwise.
		} else {
			// Animates the right
			// part.
			rightPart_.classList
				.add (
					"faq-part-show"
				);
			// Animates the left
			// part.
			leftPart_.classList
				.add (
					"faq-part-show"
				);
			// Animates the vline.
			vline_.classList
				.add (
					"faq-vline-show"
				);
		}
	};

  /**
	 * @description Builds faq html
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
			"faq"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div class = "faq-left">
				<h2
					faq-index = "tr133::0"
					id = "faq-data"
				>
					${lang.getText ("tr133")}
				</h2>
				<p
					faq-index = "tr134::1"
					id = "faq-data"
				>
					${lang.getText ("tr134")}
				</p>
				${buildButton ({
					text: lang.getText ("tr9"),
					textId: "faq-data",
					customAttr: (
						"faq-index = tr9::2"
					)
				})}
			</div>
			<div class = "faq-vline"></div>
			<div class = "faq-right">
				<div class = "faq-experts">
					${buildImage ({
						fileName: Images.EXPERTS,
						data: {
							idName: "faq-img"
						}
					})}
				</div>
				<p
					faq-index = "tr135::3"
					id = "faq-data"
				>
					${lang.getText ("tr135")}
				</p>
				${buildFlatButton ({
					text: lang.getText ("tr136"),
					textId: "faq-data",
					iconId: "faq-img",
					customAttr: (
						"faq-index = tr136::4"
					)
				})}
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
		).appendChild (section);
		// The right part container.
		rightPart_ = (
			document.querySelector (
				"div.faq-right"
			)
		);
		// The left part container.
		leftPart_ = (
			document.querySelector (
				"div.faq-left"
			)
		);
		// The middle vertical line.
		vline_ = (
			document.querySelector (
				"div.faq-vline"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#faq-img"
				)
			),
			onReady: () => {
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				section.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					section.lastElementChild
						.remove ()
				), 200);
				// Called when any mutation
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
									"faq-index"
								),
								textualsId: (
									"faq-data"
								)
							})
						);
					}
				);
				// Focus on the current
				// section for scrolling.
				new ScrollManager ({
					max: 200,
					min: 0,
					onEnter: () => {
						// Animates faq
						// section in
						// normal mode.
						animate_ ("normal");
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (6);
					},
					onLeave: () => {
						// Animates faq
						// section in
						// reverse mode.
						animate_ ("reverse");
					}
				});
			}
		});
  }
}

/**
 * @description Exports
 * 	all public features.
 * @exports *
 */
export {FAQ};
