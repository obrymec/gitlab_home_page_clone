/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Badges UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-13
* @updated 2023-09-28
* @file badges.js
* @type {Badges}
* @version 0.0.2
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import {buildButton} from "../../../common/components/button/button.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	getUpdates,
	clearStr
} from "../../../common/utilities/string/string.js";
import {
	buildImage,
	buildIcon,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds badges section.
 * @public
 * @class
 * @returns {Badges} Badges
 */
function Badges () {
	/**
	 * @description The right part.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let partRight_ = null;
	/**
	 * @description The left part.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let partLeft_ = null;
	/**
	 * @description The first
	 * 	timeout id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let timeout1_ = null;
	/**
	 * @description The second
	 * 	timeout id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let timeout2_ = null;
	/**
	 * @description The third
	 * 	timeout id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let timeout3_ = null;
	/**
	 * @description The badges.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let section_ = null;
	/**
	 * @description The button.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let button_ = null;
	/**
	 * @description The head.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let head_ = null;

	/**
	 * @description Builds option button.
	 * @param {{
	 * 	text: Object<String, any>,
	 * 	icon: String
	 * }} data Supports the following
	 * 	keys:
	 *
	 * 	- String text: The text content.
	 *
	 * 	- Object icon: The icon's path.
	 * @function buildButton_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildButton_ = ({
		text,
		icon
	}) => `
		<button>
			${buildIcon ({
				fileName: icon,
				data: {
					idName: "bds-img"
				}
			})}
			<span
				id = "bds-data"
				bds-index = "${
					text.id
				}::${text.pos}"
			>
				${clearStr ({
					input: text.value
				})}
			</span>
		</button>
	`;

	/**
	 * @description Builds a list of
	 *  images thank of total number.
	 * @param {int} count The total
	 * 	number of images.
	 * @function buildImages_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildImages_ = count => {
		// The final result to be
		// returned.
		let images = '';
		// Generating images.
		for (
			let i = 1;
			i <= count;
			i++
		) {
			// The current image's
			// name.
			const imgPath = `
				badge-${i}.svg
			`;
			// Builds the current
			// image according to
			// his name.
			images += buildImage ({
				fileName: imgPath,
				data: {
					idName: "bds-img"
				}
			});
		}
		// Returns all generated
		// images.
		return images;
	};

	/**
	 * @description Animates badges
	 * 	section.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = direction => {
		// Clears the first timeout
		// whether it exists.
		window.clearTimeout (
			timeout1_
		);
		// Clears the second timeout
		// whether it exists.
		window.clearTimeout (
			timeout2_
		);
		// Clears the third timeout
		// whether it exists.
		window.clearTimeout (
			timeout3_
		);
		// Whether direction is
		// in normal mode.
		if (direction === "normal") {
			// Animates background.
			section_.classList.add (
				"bds-show"
			);
			// Waits for 200ms.
			timeout1_ = (
				window.setTimeout (() => {
					// Animates the head.
					head_.classList.add (
						"bds-head-show"
					);
					// Waits for 200ms.
					timeout2_ = (
						window.setTimeout (() => {
							// Animates right part.
							partRight_.classList
								.add (
									"bds-part-show"
								);
							// Animates left part.
							partLeft_.classList
								.add (
									"bds-part-show"
								);
							// Waits for 200ms.
							timeout3_ = (
								window.setTimeout (
									() => {
										// Animates bottom
										// button.
										button_.classList
											.add (
												"bds-head-show"
											);
									}, 200
								)
							);
						}, 200)
					);
				}, 200)
			);
		// Otherwise.
		} else {
			// Animates bottom button.
			button_.classList.remove (
				"bds-head-show"
			);
			// Waits for 200ms.
			timeout3_ = (
				window.setTimeout (() => {
					// Animates right part.
					partRight_.classList
						.remove (
							"bds-part-show"
						);
					// Animates left part.
					partLeft_.classList
						.remove (
							"bds-part-show"
						);
					// Waits for 200ms.
					timeout2_ = (
						window.setTimeout (() => {
							// Animates the head.
							head_.classList
								.remove (
									"bds-head-show"
								);
							// Waits for 200ms.
							timeout1_ = (
								window.setTimeout (
									() => {
										// Animates background.
										section_.classList
											.remove (
												"bds-show"
											);
									}, 200
								)
							);
						}, 200)
					);
				}, 200)
			);
		}
	};
  
  /**
	 * @description Builds badges
	 * 	html structure as string
	 * 	format.
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
			"badges"
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
			<div class = "bds-head">
				<h2
					bds-index = "tr69::0"
					id = "bds-data"
				>
					${lang.getText ("tr69")}
				</h2>
				<div class = "bds-options">
					${buildButton_ ({
						icon: Icons.CERTIFICATE,
						text: {
							id: "tr70",
							pos: 1,
							value: (
								lang.getText ("tr70")
							)
						}
					})}
					${buildButton_ ({
						icon: Icons.DOC,
						text: {
							id: "tr71",
							pos: 2,
							value: (
								lang.getText ("tr71")
							)
						}
					})}
				</div>
			</div>
			<div class = "bds-foot">
				<div class = "bds-left">
					<p>
						<strong
							bds-index = "tr72::3"
							id = "bds-data"
						>
							${lang.getText ("tr72")}
						</strong>
						<br/>
						<span
							bds-index = "tr73::4"
							id = "bds-data"
						>
							${lang.getText ("tr73")}
						</span>
					</p>
					${buildButton ({
						textId: "bds-data",
						withIcon: true,
						text: (
							lang.getText ("tr24")
						),
						customAttr: (
							"bds-index = tr24::5"
						),
						icon: {
							fileName: (
								Icons.RIGHT_ARROW
							),
							data: {
								idName: "bds-img"
							}
						}
					})}
				</div>
				<div class = "bds-right">
					${buildImages_ (8)}
				</div>
				${buildButton ({
					textId: "bds-data",
					withIcon: true,
					text: (
						lang.getText ("tr24")
					),
					customAttr: (
						"bds-index = tr24::6"
					),
					className: (
						"bds-learn-more"
					),
					icon: {
						fileName: (
							Icons.RIGHT_ARROW
						),
						data: {
							idName: "bds-img"
						}
					}
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
		).appendChild (section_);
		// The right part tag ref.
		partRight_ = (
			document.querySelector (
				"div.bds-right"
			)
		);
		// The left part tag ref.
		partLeft_ = (
			document.querySelector (
				"div.bds-left"
			)
		);
		// The button tag ref.
		button_ = (
			document.querySelector (
				"button.bds-learn-more"
			)
		);
		// The head tag ref.
		head_ = (
			document.querySelector (
				"div.bds-head"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#bds-img"
				)
			),
			onReady: () => {
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
									"bds-index"
								),
								textualsId: (
									"bds-data"
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
						// Animates badges
						// in normal mode.
						animate_ ("normal");
					},
					onLeave: () => {
						// Animates badges
						// in reverse mode.
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
export {Badges};
