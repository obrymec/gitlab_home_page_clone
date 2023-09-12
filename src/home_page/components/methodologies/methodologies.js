/**
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Methodologies UI component.
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file methodologies.js
* @type {Methodologies}
* @created 2023-07-06
* @updated 2023-09-12
* @version 0.0.2
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {buildFlatButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import lang from "../../../common/utilities/language/language.js";
import swipe from "../../../common/utilities/swipe/swipe.js";
import {
	getScrollPercent,
	ScrollManager
} from "../../../common/utilities/scroll/scroll.js";
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
 * @classdesc Builds enterprise work
 * 	methodologies.
 * @public
 * @class
 * @returns {Methodologies} Methodologies
 */
function Methodologies () {
	/**
	 * @description The delay
	 * 	before hide arrows.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let dissolveDelay_ = null;
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
	 * @description The scroller.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let scroll_ = null;
	/**
	 * @description The body
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let body_ = null;

	/**
	 * @description Toggles effects actions
	 * 	on the passed tag reference.
	 * @param {Element} tag The tag
	 * 	to target.
	 * @param {boolean} active Whether
	 * 	it's `true`, we'll add effects.
	 * 	Otherwise, we'll remove them.
	 * @function toggleEffects_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const toggleEffects_ = (
		tag,
		active
	) => {
		// Whether active is set
		// to `true`.
		if (active) {
			// Adds `mhds-image-show`
			// class to his image kid.
			tag.children[0].children[1]
				.classList.add (
					"mhds-image-show"
				);
			// Adds `mhds-enabled`
		 	// class to our tag.
			tag.classList.add (
				"mhds-enabled"
			);
		// Otherwise.
		} else {
			// Removes `mhds-image-show`
			// class from his image kid.
			tag.children[0].children[1]
				.classList.remove (
					"mhds-image-show"
				);
			// Removes `mhds-enabled`
			// class from our tag.
			tag.classList.remove (
				"mhds-enabled"
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
		// Adds `mhds-show-arrows`
		// class to the right arrow.
		rightButton_.classList
			.add ("mhds-show-arrows");
		// Adds `mhds-show-arrows`
		// class to the left arrow.
		leftButton_.classList
			.add ("mhds-show-arrows");
		// Launches a new dissolve
		// delay for x second.
		dissolveDelay_ = (
			window.setTimeout (() => {
				// Removes `mhds-show-arrows`
				// class from the right arrow.
				rightButton_.classList
					.remove (
						"mhds-show-arrows"
					);
				// Removes `mhds-show-arrows`
				// class from the left arrow.
				leftButton_.classList
					.remove (
						"mhds-show-arrows"
					);
			}, timeout)
		);
	};

	/**
	 * @description Animates methodologies
	 * 	regardless the detected screen
	 * 	format (Desktop & Mobile).
	 * @param {String} dir The
	 * 	animation's direction.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = dir => {
		// Listens screen format.
		new ScreenManager ({
			onMedium: () => (
				smallAnimation_ (dir)
			),
			onSmall: () => (
				smallAnimation_ (dir)
			),
			mediumScreen: {
				max: 1300,
				min: 761
			},
			smallScreen: {
				max: 760,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 1301
			}
		});
	};

	/**
	 * @description Animates methodologies
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
		// The content tag ref.
		const content = (
			body_.parentElement
		);
		// The big title tag.
		const title = (
			content.parentElement
				.children[0]
		);
		// Whether direction is in
		// normal mode.
		if (direction === "normal") {
			// Adds `mhds-bigtitle-show`
			// class to the big title
			// text.
			title.classList.add (
				"mhds-bigtitle-show"
			);
			// Adds `mhds-content-show`
			// class to the parent of
			// methodologies body.
			content.classList.add (
				"mhds-content-show"
			);
		// Otherwise.
		} else {
			// Removes `mhds-bigtitle-show`
			// class from the big title
			// text.
			title.classList.remove (
				"mhds-bigtitle-show"
			);
			// Removes `mhds-content-show`
			// class from the parent
			// of methodologies body.
			content.classList.remove (
				"mhds-content-show"
			);
		}
	};

	/**
	 * @description Builds a methodology
	 * 	html structure with a few
	 * 	parameters.
	 * @param {{
	 * 	description: Object<String, any>,
	 * 	title: Object<String, any>,
	 * 	image: String,
	 * 	icon: String,
	 * 	id: String
	 * }} data The methodology data. This
	 * 	map supports the following keys:
	 *
	 * 	- String id: The methodology
	 * 		tag's id.
	 *
	 * 	- String icon: The methodology
	 * 		tag's icon name.
	 *
	 * 	- Object title: The methodology
	 * 		title text.
	 *
	 * 	- Object description: The
	 * 		description of methodology.
	 *
	 * 	- String image: The methodology
	 * 		representation image's name.
	 * @function buildMethodology_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildMethodology_ = ({
		description,
		image,
		title,
		icon,
		id
	}) => `
		<div
			id = "mhd-${id}"
			class = "methodology"
		>
			<div class = "mhds-infos">
				<div>
					<span>
						${buildIcon ({
							fileName: icon,
							data: {
								idName: (
									"mhds-img"
								)
							}
						})}
					</span>
					<h3
						id = "mhds-data"
						mhds-index = "${
							title.id
						}::${title.pos}"
					>
						${clearStr ({
							input: title.value
						})}
					</h3>
					<p
						id = "mhds-data"
						mhds-index = "${
							description.id
						}::${description.pos}"
					>
						${clearStr ({
							input: (
								description.value
							)
						})}
					</p>
				</div>
				<div>
					${buildImage ({
						fileName: image,
						data: {
							idName: (
								"mhds-img"
							)
						}
					})}
				</div>
			</div>
			${buildFlatButton ({
				className: "mhds-learn-more",
				text: lang.getText ("tr24"),
				textId: "mhds-data",
				iconId: "mhds-img",
				customAttr: (
					`mhds-index = tr24::2${id}`
				)
			})}
		</div>
	`;

	/**
	 * @description Checks scroll variation.
	 * @param {Element} oldTag The previous
	 *  active or selected methodology
	 * 	tag section.
	 * @param {Number} index The position
	 * 	index of the next methodology
	 * 	tag section.
	 * @function checkMatch_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Element} Element
	*/
	const checkMatch_ = (
		oldTag,
		index
	) => {
		// The new tag reference.
		const newTag = (
			body_.children[index]
		);
		// Whether the old tag is defined.
		if (oldTag instanceof Element) {
			// The old tag id value.
			const oldId = oldTag.id;
			// Whether the given ids
			// aren't the same.
			if (oldId !== newTag.id) {
				// The total margin top to be
				// generated to go directly
				// to methodology tag section.
				let totalMarginTop = 0;
				// The custom scrollbar thumb.
				const scrollThumb = (
					scroll_.children[0]
				);
				// Sets thumb height to the
				// current methodology
				// tag's height.
				scrollThumb.style.height = (
					`${newTag.offsetHeight}px`
				);
				// Computing the margin top
				// that we need to move our
				// scroll thumb directly to
				// the current methodology.
				for (
					let pos = 1;
					pos < (index + 1);
					pos++
				) {
					// Adds the height of the
					// previous methodology
					// plus their container
					// flexbox gap: `94px`.
					totalMarginTop += (
						body_.children[pos]
							.offsetHeight + 94
					);
				}
				// Updates scroll thumb
				// margin top.
				scrollThumb.style
					.marginTop = (
						`${totalMarginTop}px`
					);
				// Removes effects from
				// the old tag.
				toggleEffects_ (
					oldTag, false
				);
				// Adds effects to the
				// new tag.
				toggleEffects_ (
					newTag, true
				);
			// Otherwise.
			} else {
				// Don't touch the old
				// tag reference and
				// returns it.
				return oldTag;
			}
		// Otherwise.
		} else {
			// Adds effects to the 
			// new tag.
			toggleEffects_ (
				newTag, true
			);
		}
		// Returns the new tag
		// reference for others
		// use cases.
		return newTag;
	};

	/**
	 * @description Applies vertical
	 * 	carousel according to the
	 * 	browser scrollbar progress.
	 * @function verticalCarousel_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	*/
	const verticalCarousel_ = () => {
		// The height of one methodology
		// card in percentage.
		const mhdCardHeight = 10;
		// The old tag object reference.
		let oldTag = null;
		// The starting percentage of
		// the scroll thumb to start
		// treatments.
		const start = 28;
		// Manages methodologies in
		// for vertical carousel.
		const carousel = () => {
			// Whether window width is
			// greater than 760 pixels.
			if (
				window.innerWidth > 760
			) {
				// The total percentage
				// since the starting
				// percentage.
				let end = start;
				// The current scroll
				// progress.
				const progress = (
					getScrollPercent ()
				);
				// Checking scroll thumb
				// position in percentage
				// to select the matched
				// methodology card tag
				// section.
				[0, 1, 2, 3, 4, null].forEach (
					value => {
						// Whether the current value
						// is an interger.
						if (
							Number.isInteger (value)
						) {
							// The previous percentage
							// value.
							const oldProgress = end;
							// The next percentage
							// value.
							end += mhdCardHeight;
							// Whether we look the
							// first methodology.
							if (
								progress >= oldProgress
								&& progress <= end
							) {
								// Updates the old tag
								// value to the current
								// returned value of
								// `checkMach` method
								// call.
								oldTag = checkMatch_ (
									oldTag, value
								);
							}
						// Otherwise.
						} else {
							// Whether we are out of
							// range of the supported
							// values.
							if (
								progress < start ||
								progress > end
							) {
								// Whether the old tag
								// is defined.
								if (oldTag != null) {
									// Removes all those
									// bound effects.
									toggleEffects_ (
										oldTag, false
									);
								}
								// Free `oldTag`
								// variable.
								oldTag = null;
							}
						}
					}
				);
			}
		};
		// Listens window scrollbar
		// motion.
		document.addEventListener (
			"scroll", carousel
		);
		// Applies a first effect.
		carousel ();
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
		// The auto carousel state.
		let autoCarousel = null;
		// Whether the right scroll
		// is busy or not.
		let rightBusy = false;
		// Whether a button is
		// enabled or disabled.
		let disabled = false;
		// Whether the left scroll
		// is busy or not.
		let leftBusy = true;
		// Whether the carousel
		// state is reset.
		let isReset = (
			window.innerWidth <= 760
		);
		// The first methodology
		// tag section.
		const methodology = (
			body_.children[1]
		);
		// Starts auto carousel process.
		const startAutoCarouselProcess = (
			() => {
				// Starts carousel process.
				autoCarousel = (
					window.setInterval (
						() => swipeRight (false),
						10000
					)
				);
			}
		);
		// Stops auto carousel process
		// in background directly.
		const stopAutoCarouselProcess = (
			() => {
				// Whether the auto carousel
				// timer is defined.
				if (autoCarousel != null) {
					// Destroys the upcoming
					// auto carousel action
					// in memory.
					window.clearInterval (
						autoCarousel
					);
				}
			}
		);
		// A lambda method that scroll
		// methodologies to right.
		const swipeRight = dissolve => {
			// Whether `disabled` field
			// is set to `false`.
			if (!disabled) {
				// Whether arrows are dissolvable.
				if (dissolve) dissolvable_ ();
				// Stops auto carousel.
				stopAutoCarouselProcess ();
				// Starts auto carousel.
				startAutoCarouselProcess ();
				// The enable wait delay.
				let waitForEnable = 400;
				// Whether the right scroll
				// is not busy.
				if (!rightBusy) {
					// Moves the scroll thumb.
					body_.scrollLeft = (
						body_.scrollLeft
						+ methodology.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						body_.scrollLeft
						+ methodology.offsetWidth
					);
					// The total methodology
					// width size with a few
					// margins: `100px`.
					const totalWidth = (
						(
							methodology.offsetWidth
							* (
									body_.children
										.length - 1
								)
						) - 100
					);
					// Whether the scroll thumb
					// comes to the end of the
					// container.
					if (
						scrollPos >= totalWidth
					) {
						// Makes the right scroll
						// be busy.
						rightBusy = true;
					// Otherwise.
					} else {
						// Sets the scroll left
						// availability.
						leftBusy = false;
					}
				// Otherwise.
				} else {
					// Resets the scroll thumb.
					body_.scrollLeft = 0;
					// Increases enable wait.
					waitForEnable = 800;
					// Sets the scroll right
					// availability.
					rightBusy = false;
					// Sets the scroll left
					// availability.
					leftBusy = true;
				}
				// Disables any controls.
				disabled = true;
				// Adds `mhds-move-right`
				// class to button.
				rightButton_.classList
					.add (
						"mhds-move-right"
					)
				// Waits for 150 milliseconds.
				window.setTimeout (() => (
					rightButton_.classList
						.remove (
							"mhds-move-right"
						)
				), 150);
				// Waits for a few milliseconds.
				window.setTimeout (() => (
					disabled = false
				), waitForEnable);
			}
		};
		// A lambda method that scroll
		// methodologies to left.
		const swipeLeft = dissolve => {
			// Whether `disabled` field
			// is set to `false`.
			if (!disabled) {
				// Whether arrows are dissolvable.
				if (dissolve) dissolvable_ ();
				// Stops auto carousel.
				stopAutoCarouselProcess ();
				// Starts auto carousel.
				startAutoCarouselProcess ();
				// The enable wait delay.
				let waitForEnable = 400;
				// Whether the left scroll
				// is not busy.
				if (!leftBusy) {
					// Moves the scroll thumb.
					body_.scrollLeft = (
						body_.scrollLeft
						- methodology.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						body_.scrollLeft
						- methodology.offsetWidth
					);
					// Whether the scroll thumb
					// comes to start of the
					// container.
					if (scrollPos <= 0) {
						// Makes the left scroll
						// be busy.
						leftBusy = true;
					// Otherwise.
					} else {
						// Sets the scroll right
						// availability.
						rightBusy = false;
					}
				// Otherwise.
				} else {
					// Increases enable wait.
					waitForEnable = 800;
					// Sets the scroll right
					// availability.
					rightBusy = true;
					// Sets the scroll left
					// availability.
					leftBusy = false;
					// Resets the scroll thumb.
					body_.scrollLeft = (
						methodology.offsetWidth
							* body_.children
								.length
					);
				}
				// Disables controls.
				disabled = true;
				// Adds `mhds-move-left`
				// class to button.
				leftButton_.classList
					.add (
						"mhds-move-left"
					)
				// Waits for 150 milliseconds.
				window.setTimeout (() => (
					leftButton_.classList
						.remove (
							"mhds-move-left"
						)
				), 150);
				// Waits for a few milliseconds.
				window.setTimeout (() => (
					disabled = false
				), waitForEnable);
			}
		};
		// Starts auto carousel process.
		startAutoCarouselProcess ();
		// Listens right arrow
		// `click` event.
		rightButton_.addEventListener (
			"click",
			() => swipeRight (true)
		);
		// Listens left arrow
		// `click` event.
		leftButton_.addEventListener (
			"click",
			() => swipeLeft (true)
		);
		// Listens `click` event
		// on every methodologies.
		[0, 1, 2, 3, 4].forEach (
			index => (
				body_.children[index]
					.addEventListener (
						"click",
						() => dissolvable_ ()
					)
			)
		);
		// Listens human fingers motion
		// on mobile for the left swipe.
		swipe.swipeLeft ({
			tagId: "div.mhds-body",
			feedback: () => {
				// Swipes methodologies
				// to right.
				swipeRight (true);
			}
		});
		// Listens human fingers motion
		// on mobile for the right swipe.
		swipe.swipeRight ({
			tagId: "div.mhds-body",
			feedback: () => {
				// Swipes methodologies
				// to left.
				swipeLeft (true);
			}
		});
		// Listens window resizing.
		window.addEventListener (
			"resize", () => {
				// Stops auto carousel.
				stopAutoCarouselProcess ();
				// Whether window's width
				// is less than or equal
				// to `760px`.
				if (
					window.innerWidth <= 760
				) {
					// Whether no reset has
					// been done.
					if (!isReset) {
						// Resets the scroll
						// thumb.
						body_.scrollLeft = 0;
						// Warns user about a 
						// swapable element.
						dissolvable_ (5000);
						// Sets the scroll right
						// availability.
						rightBusy = false;
						// Sets the scroll left
						// availability.
						leftBusy = true;
						// Overrides the reset
						// state.
						isReset = true;
					}
					// Starts auto carousel.
					startAutoCarouselProcess ();
				// Otherwise.
				} else {
					// Overrides the reset
					// state.
					isReset = false;
				}
			}
		);
	};

	/**
	 * @description Builds methodologies
	 * 	html structure as string format.
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
			"methodologies"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<h2
				mhds-index = "tr58::0"
				id = "mhds-data"
			>
				${lang.getText ("tr58")}
			</h2>
			<div class = "mhds-content">
				<div
					class = "mhds-left-arrow"
				>
					${buildIcon ({
						fileName: (
							Icons.RIGHT_ARROW
						),
						data: {
							idName: "mhds-img"
						}
					})}
				</div>
				<div
					class = "mhds-right-arrow"
				>
					${buildIcon ({
						fileName: (
							Icons.RIGHT_ARROW
						),
						data: {
							idName: "mhds-img"
						}
					})}
				</div>
				<div class = "mhds-scroll">
					<div></div>
				</div>
				<div class = "mhds-body">
					${buildMethodology_ ({
						image: Images.METHODOLOGY_1,
						icon: Icons.METHODOLOGY_1,
						id: 1,
						description: {
							value: lang.getText ("tr60"),
							id: "tr60",
							pos: 1
						},
						title: {
							value: lang.getText ("tr59"),
							id: "tr59",
							pos: 2
						}
					})}
					${buildMethodology_ ({
						image: Images.METHODOLOGY_2,
						icon: Icons.METHODOLOGY_2,
						id: 2,
						description: {
							value: lang.getText ("tr62"),
							id: "tr62",
							pos: 3
						},
						title: {
							value: lang.getText ("tr61"),
							id: "tr61",
							pos: 4
						}
					})}
					${buildMethodology_ ({
						image: Images.METHODOLOGY_3,
						icon: Icons.METHODOLOGY_3,
						id: 3,
						description: {
							value: lang.getText ("tr64"),
							id: "tr64",
							pos: 5
						},
						title: {
							value: lang.getText ("tr63"),
							id: "tr63",
							pos: 6
						}
					})}
					${buildMethodology_ ({
						image: Images.METHODOLOGY_4,
						icon: Icons.METHODOLOGY_4,
						id: 4,
						description: {
							value: lang.getText ("tr66"),
							id: "tr66",
							pos: 7
						},
						title: {
							value: lang.getText ("tr65"),
							id: "tr65",
							pos: 8
						}
					})}
					${buildMethodology_ ({
						image: Images.METHODOLOGY_5,
						icon: Icons.METHODOLOGY_5,
						id: 5,
						description: {
							value: lang.getText ("tr68"),
							id: "tr68",
							pos: 9
						},
						title: {
							value: lang.getText ("tr67"),
							id: "tr67",
							pos: 10
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
		).appendChild (section);
		// The right arrow button.
		rightButton_ = (
			document.querySelector (
				"div.mhds-right-arrow"
			)
		);
		// The left arrow button.
		leftButton_ = (
			document.querySelector (
				"div.mhds-left-arrow"
			)
		);
		// The scroll container.
		scroll_ = (
			document.querySelector (
				"div.mhds-scroll"
			)
		);
		// The methodologies body.
		body_ = (
			document.querySelector (
				"div.mhds-body"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#mhds-img"
				)
			),
			onReady: () => {
				// Listens controls to apply
				// horizontal carousel effect.
				horizontalCarousel_ ();
				// Listens browser scrollbar
				// thumb motion to apply the
				// vertical carousel effect.
				verticalCarousel_ ();
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
									"mhds-index"
								),
								textualsId: (
									"mhds-data"
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
						// Warns user about a
						// swapable element.
						dissolvable_ (5000);
						// Animates methodologies
						// section in normal mode.
						animate_ ("normal");
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (2);
					},
					onLeave: () => {
						// Animates methodologies
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
export {Methodologies};
