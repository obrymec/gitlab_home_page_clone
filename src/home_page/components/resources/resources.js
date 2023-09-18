/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview Resources UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-14
* @updated 2023-09-18
* @file resources.js
* @type {Resources}
* @version 0.0.2
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {buildFlatButton} from "../../../common/components/button/button.js";
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import lang from "../../../common/utilities/language/language.js";
import swipe from "../../../common/utilities/swipe/swipe.js";
import {
	animateTextContent,
	getUpdates,
	clearStr
} from "../../../common/utilities/string/string.js";
import {
	buildImage,
	buildIcon,
	Images,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds resources section.
 * @public
 * @class
 * @returns {Resources} Resources
 */
function Resources () {
	/**
	 * @description The delay
	 * 	before hide arrows.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let dissolveDelay_ = null;
	/**
	 * @description The auto
	 * 	carousel state.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let autoCarousel_ = null;
	/**
	 * @description The right
	 * 	arrow button.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let rightButton_ = null;
	/**
	 * @description The left
	 * 	arrow button.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let leftButton_ = null;
	/**
	 * @description Whether the
	 * 	right scroll is busy or
	 * 	not.
	 * @private {boolean}
	 * @type {boolean}
	 * @field
	 */
	let rightBusy_ = false;
	/**
	 * @description Whether a
	 * 	button is enabled or
	 * 	disabled.
	 * @private {boolean}
	 * @type {boolean}
	 * @field
	 */
	let disabled_ = false;
	/**
	 * @description Whether the
	 * 	left scroll is busy or
	 * 	not.
	 * @private {boolean}
	 * @type {boolean}
	 * @field
	 */
	let leftBusy_ = true;
	/**
	 * @description The resources.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let section_ = null;
	/**
	 * @description The body
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let body_ = null;
	/**
	 * @description The process
	 * 	ids of all animated
	 * 	resources.
	 * @private {Array<int>}
	 * @type {Array<int>}
	 * @field
	 */
	let processIds_ = [
		-1, -1, -1,
		-1, -1, -1
	];

	/**
	 * @description Starts auto carousel
	 * 	process.
	 * @function startAutoCarouselProcess_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const startAutoCarouselProcess_ = () => {
		// Starts carousel process.
		autoCarousel_ = (
			window.setInterval (
				() => swipeLeft_ (false),
				10000
			)
		);
	};

	/**
	 * @description Stops auto carousel
	 * 	process in background directly.
	 * @function stopAutoCarouselProcess_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const stopAutoCarouselProcess_ = () => {
		// Whether the auto carousel
		// timer is defined.s
		if (autoCarousel_ != null) {
			// Destroys the upcoming
			// auto carousel action
			// in memory.
			window.clearInterval (
				autoCarousel_
			);
		}
	};

	/**
	 * @description Resets auto carousel
	 * 	process.
	 * @function resetAutoCarousel_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const resetAutoCarousel_ = () => {
		// Warns user about a
		// swapable element.
		dissolvable_ (5000);
		// Sets the scroll right
		// availability.
		rightBusy_ = true;
		// Sets the scroll left
		// availability.
		leftBusy_ = false;
		// Resets the scroll thumb.
		body_.scrollLeft = (
			body_.children[1].offsetWidth *
			body_.childElementCount
		);
	};

	/**
	 * @description Adds/Removes
	 * 	`resource-show` class
	 * 	about the given tag.
	 * @param {Element} tag The
	 * 	target resource markup.
	 * @param {boolean} off If
	 * 	we want to remove the
	 * 	added class.
	 * @function toggleClass_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const toggleClass_ = (
		tag, off
	) => {
		// Whether `off` is set
		// to `false`.
		if (!off) {
			// Adds `resource-show`
			// class to the passed
			// tag element.
			tag.classList.add (
				"resource-show"
			);
		// Otherwise.
		} else {
			// Removes `resource-show`
			// class from the passed
			// tag element.
			tag.classList.remove (
				"resource-show"
			);
		}
	};

	/**
	 * @description Animates the
	 * 	three last resources.
	 * @param {int} delay The
	 * 	initial value of delay
	 * 	between animations.
	 * @param {boolean} off If
	 * 	we want to remove the
	 * 	added class.
	 * @function bottomAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {int} int
	 */
	const bottomAnimation_ = (
		delay, off
	) => {
		// Animating the three
		// last resources.
		for (
			let j = (
				body_.children
					.length - 1
			);
			j > 2;
			j--
		) {
			// Animates the current
			// resource.
			processIds_[j] = (
				window.setTimeout (
					() => (
						toggleClass_ (
							body_.children[j],
							off
						)
					), delay
				)
			);
			// Increases the delay.
			delay += 150;
		}
		// Returns the last
		// value of delay.
		return delay;
	};

	/**
	 * @description Animates the
	 * 	three first resources.
	 * @param {int} delay The
	 * 	initial value of delay
	 * 	between animations.
	 * @param {boolean} off If
	 * 	we want to remove the
	 * 	added class.
	 * @function topAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {int} int
	 */
	const topAnimation_ = (
		delay, off
	) => {
		// Animating the three
		// first resources.
		for (
			let i = 0;
			i < 3;
			i++
		) {
			// Animates the current
			// resource.
			processIds_[i] = (
				window.setTimeout (
					() => (
						toggleClass_ (
							body_.children[i],
							off
						)
					), delay
				)
			);
			// Increases the delay.
			delay += 150;
		}
		// Returns the last
		// value of delay.
		return delay;
	};

	/**
	 * @description Animates resources
	 * 	for large screens.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const largeAnimation_ = (
		direction
	) => {
		// Stops auto carousel.
		stopAutoCarouselProcess_ ();
		// Adjusts auto scroller
		// path.
		body_.children[0].children[2]
			.setAttribute (
				"auto-scrollable", true
			);
		// Cancels all animations.
		processIds_.forEach (id => {
			// Stops the current
			// animation.
			window.clearTimeout (id);
		});
		// The delay between
		// animations.
		let delay = 0;
		// Whether the direction
		// is normal.
		if (
			direction === "normal"
		) {
			// Animates top resources.
			delay = topAnimation_ (
				delay, false
			);
			// Animates bottom
			// resources.
			bottomAnimation_ (
				delay, false
			);
		// Otherwise.
		} else {
			// Animates bottom
			// resources.
			delay = (
				bottomAnimation_ (
					delay, true
				)
			);
			// Animates top
			// resources.
			topAnimation_ (
				delay, true
			);
		}
	};

	/**
	 * @description Animates resources
	 * 	for small screens.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const smallAnimation_ = (
		direction
	) => {
		// Resets position of
		// resources from
		// large animation.
		largeAnimation_ ("normal");
		// Resets auto carousel.
		resetAutoCarousel_ ();
		// Adjusts auto scroller
		// path.
		body_.children[0].children[2]
			.removeAttribute (
				"auto-scrollable"
			);
		// Whether the direction
		// is normal.
		if (
			direction === "normal"
		) {
			// Shows content.
			section_.children[1]
				.classList.add (
					"res-content-show"
				);
			// Shows head.
			section_.children[0]
				.classList.add (
					"res-head-show"
				);
		// Otherwise.
		} else {
			// Hides content.
			section_.children[1]
				.classList.remove (
					"res-content-show"
				);
			// Hides head.
			section_.children[0]
				.classList.remove (
					"res-head-show"
				);
		}
	};

	/**
	 * @description Puts a dissolve
	 * 	effect on both arrows.
	 * @param {int=} timeout The
	 * 	delay before dissolve
	 * 	arrows.
	 * @function dissolvable_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const dissolvable_ = (
		timeout = 3000
	) => {
		// Whether the dissolve
		// process delay is
		// defined.
		if (dissolveDelay_ != null) {
			// Destroys the upcoming
			// delay in memory.
			window.clearTimeout (
				dissolveDelay_
			);
		}
		// Adds `res-show-arrows`
		// class to the right
		// arrow.
		rightButton_.classList
			.add ("res-show-arrows");
		// Adds `res-show-arrows`
		// class to the left
		// arrow.
		leftButton_.classList
			.add ("res-show-arrows");
		// Launches a new dissolve
		// delay for x second.
		dissolveDelay_ = (
			window.setTimeout (() => {
				// Removes `res-show-arrows`
				// class from the right
				// arrow.
				rightButton_.classList
					.remove (
						"res-show-arrows"
					);
				// Removes `res-show-arrows`
				// class from the left
				// arrow.
				leftButton_.classList
					.remove (
						"res-show-arrows"
					);
			}, timeout)
		);
	};

	/**
	 * @description Applies a horizontal
	 * 	carousel according to the target
	 * 	scroll bar.
	 * @function horizontalCarousel_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const horizontalCarousel_ = () => {
		// Starts auto carousel process.
		startAutoCarouselProcess_ ();
		// Listens right arrow
		// `click` event.
		rightButton_.addEventListener (
			"click",
			() => swipeRight_ (true)
		);
		// Listens left arrow
		// `click` event.
		leftButton_.addEventListener (
			"click",
			() => swipeLeft_ (true)
		);
		// Listens `click` event
		// on every resources.
		Array.from (body_.children)
			.forEach (child => (
				child.addEventListener (
					"click",
					() => dissolvable_ ()
				)
			)
		);
		// Listens human fingers
		// motion on mobile for
		// the left swipe.
		swipe.swipeLeft ({
			tagId: "div.res-body",
			feedback: () => {
				// Swipes resources
				// to right.
				swipeRight_ (true);
			}
		});
		// Listens human fingers
		// motion on mobile for
		// the right swipe.
		swipe.swipeRight ({
			tagId: "div.res-body",
			feedback: () => {
				// Swipes resources
				// to left.
				swipeLeft_ (true);
			}
		});
	};

	/**
	 * @description Animates resources
	 * 	regardless the detected screen
	 * 	format (Desktop & Mobile).
	 * @param {String} dir The
	 * 	animation's direction.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = dir => (
		// Listens screen format.
		new ScreenManager ({
			mediumScreen: {
				max: 770,
				min: 581
			},
			smallScreen: {
				max: 580,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 771
			},
			onMedium: () => {
				// Makes animation.
				smallAnimation_ (dir);
			},
			onSmall: () => {
				// Makes animation.
				smallAnimation_ (dir);
			},
			onLarge: () => {
				// Makes animation.
				largeAnimation_ (dir);
			}
		})
	);

	/**
	 * @description Builds a resource
	 * 	html structure.
	 * @param {{
	 * 	description: Object<String, any>,
	 * 	title: Object<String, any>,
	 * 	imagePath: String,
	 * 	iconPath: String,
	 * 	id: int
	 * }} data The resource's data.
	 * 	This map supports the
	 * 	following keys:
	 *
	 * 	- String iconPath: The header
	 * 		icon's path.
	 *
	 * 	- Object title: The header's
	 * 		title.
	 *
	 * 	- String imagePath: The body
	 * 		image's path.
	 *
	 * 	- Object description: The
	 * 		resource's description.
	 *
	 * 	- int id: The id of static
	 * 		texts data.
	 * @function buildResource_
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildResource_ = ({
		description,
		imagePath,
		iconPath,
		title,
		id
	}) => `
		<div class = "resource">
			<div>
				${buildIcon ({
					fileName: iconPath,
					data: {
						idName: "res-img"
					}
				})}
				<span
					id = "res-data"
					res-index = "${
						title.id
					}::${title.pos}"
				>
					${clearStr ({
						input: title.value
					})}
				</span>
			</div>
			<div>
				${buildImage ({
					fileName: imagePath,
					data: {
						idName: "res-img"
					}
				})}
			</div>
			<p
				id = "res-data"
				res-index = "${
					description.id
				}::${description.pos}"
			>
				${clearStr ({
					input: description.value
				})}
			</p>
			<div>
				${buildFlatButton ({
					text: lang.getText ("tr26"),
					textId: "res-data",
					iconId: "res-img",
					customAttr: (
						`res-index = tr26::3${id}`
					)
				})}
			</div>
		</div>
	`;

	/**
	 * @description Scrolls content
	 * 	from left to right.
	 * @param {boolean} dissolve
	 * 	whether we want to hide
	 * 	arrows after some few
	 * 	times.
	 * @function swipeRight_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const swipeRight_ = dissolve => {
		// Whether `disabled` field
		// is set to `false`.
		if (!disabled_) {
			// Whether arrows are hidable.
			if (dissolve) dissolvable_ ();
			// Stops auto carousel.
			stopAutoCarouselProcess_ ();
			// Starts auto carousel.
			startAutoCarouselProcess_ ();
			// The enable wait delay.
			let waitForEnable = 400;
			// Whether the right scroll
			// is not busy.
			if (!rightBusy_) {
				// Moves the scroll thumb.
				body_.scrollLeft = (
					body_.scrollLeft +
					body_.children[1]
						.offsetWidth
				);
				// The real scroll position.
				const scrollPos = (
					body_.scrollLeft +
					body_.children[1]
						.offsetWidth
				);
				// The total resource
				// width size with a
				// few margins: `100px`.
				const totalWidth = (
					(
						body_.children[1]
							.offsetWidth *
						(
							body_.children
								.length - 1
						)
					) - 100
				);
				// Whether the scroll thumb
				// comes at the end of the
				// container.
				if (
					scrollPos >= totalWidth
				) {
					// Makes the right scroll
					// be busy.
					rightBusy_ = true;
				// Otherwise.
				} else {
					// Sets the scroll left
					// availability.
					leftBusy_ = false;
				}
			// Otherwise.
			} else {
				// Resets the scroll thumb.
				body_.scrollLeft = 0;
				// Increases enable wait.
				waitForEnable = 800;
				// Sets the scroll right
				// availability.
				rightBusy_ = false;
				// Sets the scroll left
				// availability.
				leftBusy_ = true;
			}
			// Disables any controls.
			disabled_ = true;
			// Adds `res-move-right`
			// class to button.
			rightButton_.classList.add (
				"res-move-right"
			);
			// Waits for 150 milliseconds.
			window.setTimeout (() => (
				rightButton_.classList
					.remove (
						"res-move-right"
					)
			), 150);
			// Waits for a few milliseconds.
			window.setTimeout (() => (
				disabled_ = false
			), waitForEnable);
		}
	};

	/**
	 * @description Scrolls content
	 * 	from right to left.
	 * @param {boolean} dissolve
	 * 	whether we want to hide
	 * 	arrows after some few
	 * 	times.
	 * @function swipeLeft_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const swipeLeft_ = dissolve => {
		// Whether `disabled` field
		// is set to `false`.
		if (!disabled_) {
			// Whether arrows are hidable.
			if (dissolve) dissolvable_ ();
			// Stops auto carousel.
			stopAutoCarouselProcess_ ();
			// Starts auto carousel.
			startAutoCarouselProcess_ ();
			// The enable wait delay.
			let waitForEnable = 400;
			// Whether the left scroll
			// is not busy.
			if (!leftBusy_) {
				// Moves the scroll thumb.
				body_.scrollLeft = (
					body_.scrollLeft -
					body_.children[1]
						.offsetWidth
				);
				// The real scroll position.
				const scrollPos = (
					body_.scrollLeft -
					body_.children[1]
						.offsetWidth
				);
				// Whether the scroll thumb
				// comes to start of the
				// container.
				if (scrollPos <= 0) {
					// Makes the left scroll
					// be busy.
					leftBusy_ = true;
				// Otherwise.
				} else {
					// Sets the scroll right
					// availability.
					rightBusy_ = false;
				}
			// Otherwise.
			} else {
				// Increases enable wait.
				waitForEnable = 800;
				// Sets the scroll right
				// availability.
				rightBusy_ = true;
				// Sets the scroll left
				// availability.
				leftBusy_ = false;
				// Resets the scroll thumb.
				body_.scrollLeft = (
					body_.children[1]
						.offsetWidth *
					body_.children.length
				);
			}
			// Disables controls.
			disabled_ = true;
			// Adds `res-move-left`
			// class to button.
			leftButton_.classList.add (
				"res-move-left"
			);
			// Waits for 150 milliseconds.
			window.setTimeout (() => (
				leftButton_.classList
					.remove (
						"res-move-left"
					)
			), 150);
			// Waits for a few milliseconds.
			window.setTimeout (() => (
				disabled_ = false
			), waitForEnable);
		}
	};

  /**
	 * @description Builds resources
   *  html structure as string
   *  format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// The main tag reference.
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
			"resources"
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
			<div class = "res-head">
				<h2
					res-index = "tr119::0"
					id = "res-data"
				>
					${lang.getText ("tr119")}
				</h2>
				${buildFlatButton ({
					text: lang.getText ("tr120"),
					textId: "res-data",
					iconId: "res-img",
					customAttr: (
						"res-index = tr120::1"
					)
				})}
			</div>
			<div class = "res-content">
				<div class = "res-left-arrow">
					${buildIcon ({
						fileName: Icons.RIGHT_ARROW,
						data: {
							idName: "res-img"
						}
					})}
				</div>
				<div class = "res-right-arrow">
					${buildIcon ({
						fileName: Icons.RIGHT_ARROW,
						data: {
							idName: "res-img"
						}
					})}
				</div>
				<div class = "res-body">
					${buildResource_ ({
						imagePath: Images.RESOURCE_1,
						iconPath: Icons.RESOURCE_1,
						id: 0,
						description: {
							value: lang.getText ("tr122"),
							id: "tr122",
							pos: 2
						},
						title: {
							value: lang.getText ("tr121"),
							id: "tr121",
							pos: 3
						}
					})}
					${buildResource_ ({
						imagePath: Images.RESOURCE_2,
						iconPath: Icons.RESOURCE_2,
						id: 1,
						description: {
							value: lang.getText ("tr123"),
							id: "tr123",
							pos: 4
						},
						title: {
							value: lang.getText ("tr124"),
							id: "tr124",
							pos: 5
						}
					})}
					${buildResource_ ({
						imagePath: Images.RESOURCE_3,
						iconPath: Icons.RESOURCE_3,
						id: 2,
						description: {
							value: lang.getText ("tr125"),
							id: "tr125",
							pos: 6
						},
						title: {
							value: lang.getText ("tr126"),
							id: "tr126",
							pos: 7
						}
					})}
					${buildResource_ ({
						imagePath: Images.RESOURCE_4,
						iconPath: Icons.RESOURCE_4,
						id: 3,
						description: {
							value: lang.getText ("tr127"),
							id: "tr127",
							pos: 8
						},
						title: {
							value: lang.getText ("tr128"),
							id: "tr128",
							pos: 9
						}
					})}
					${buildResource_ ({
						imagePath: Images.RESOURCE_5,
						iconPath: Icons.RESOURCE_5,
						id: 4,
						description: {
							value: lang.getText ("tr129"),
							id: "tr129",
							pos: 10
						},
						title: {
							value: lang.getText ("tr130"),
							id: "tr130",
							pos: 11
						}
					})}
					${buildResource_ ({
						imagePath: Images.RESOURCE_6,
						iconPath: Icons.RESOURCE_6,
						id: 5,
						description: {
							value: lang.getText ("tr131"),
							id: "tr131",
							pos: 12
						},
						title: {
							value: lang.getText ("tr132"),
							id: "tr132",
							pos: 13
						}
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
		// The right arrow button.
		rightButton_ = (
			document.querySelector (
				"div.res-right-arrow"
			)
		);
		// The left arrow button.
		leftButton_ = (
			document.querySelector (
				"div.res-left-arrow"
			)
		);
		// The resources body.
		body_ = (
			document.querySelector (
				"div.res-body"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#res-img"
				)
			),
			onReady: () => {
				// Listens controls to
				// apply horizontal
				// carousel effect.
				horizontalCarousel_ ();
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
									"res-index"
								),
								textualsId: (
									"res-data"
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
						// Warns user about a
						// swapable element.
						dissolvable_ (5000);
						// Animates resources
						// section in normal
						// mode.
						animate_ ("normal");
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (4);
					},
					onLeave: () => {
						// Animates resources
						// section in reverse
						// mode.
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
export {Resources};
