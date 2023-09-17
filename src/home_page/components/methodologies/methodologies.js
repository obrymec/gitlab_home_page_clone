/**
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Methodologies UI component.
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file methodologies.js
* @type {Methodologies}
* @created 2023-07-06
* @updated 2023-09-17
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
 * @classdesc Builds enterprise work
 * 	methodologies.
 * @public
 * @class
 * @returns {Methodologies} Methodologies
 */
function Methodologies () {
	/**
	 * @description The scroll
	 * 	manager of methodologies
	 * 	section.
	 * @private {?ScrollManager}
	 * @type {?ScrollManager}
	 * @field
	 */
	let scrollManager_ = null;
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
	 * @description The methodologies
	 * 	section.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let section_ = null;
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
	 * @description The main
	 * 	tag element.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let main_ = null;
	/**
	 * @description The methodologies
	 * 	scroll manager object
	 * 	instances.
	 * @private {Array<?ScrollManager>}
	 * @type {Array<?ScrollManager>}
	 * @field
	 */
	let mhds_ = [
		null, null, null,
		null, null
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
				() => swipeRight_ (false),
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
		// timer is defined.
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
		// Resets the scroll thumb.
		body_.scrollLeft = 0;
		// Warns user about a
		// swapable element.
		dissolvable_ (5000);
		// Sets the scroll right
		// availability.
		rightBusy_ = false;
		// Sets the scroll left
		// availability.
		leftBusy_ = true;
	};

	/**
	 * @description Removes `auto-scrollable`
	 * 	attribute from all target tag.
	 * @function removeAttribute_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const removeAttribute_ = () => {
		// Removing `auto-scrollable`
		// attribute from methodologies
		// children.
		for (
			const mhd of body_.children
		) {
			// Removes `auto-scrollable`
			// attribute from the
			// current child.
			mhd.removeAttribute (
				"auto-scrollable"
			);
		}
	};

	/**
	 * @description Clears `scroll`
	 * 	event on all methodologies.
	 * @function clearScrollEvents_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const clearScrollEvents_ = () => {
		// Clearing `scroll` events
		// and theirs data.
		for (
			let x = 0;
			x < mhds_.length;
			x++
		) {
			// Destroys the current
			// `scroll` event and
			// those associated
			// data.
			mhds_[x]?.clearEvents ();
			// Empty this item.
			mhds_[x] = null;
		}
	};

	/**
	 * @description Adds `auto-scrollable`
	 * 	attribute to the target tags.
	 * @function addAttribute_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const addAttribute_ = () => {
		// Clears the global
		// scroll manager.
		scrollManager_?.clearEvents ();
		// Stops auto carousel.
		stopAutoCarouselProcess_ ();
		// Empty this field.
		scrollManager_ = null;
		// Listens scrollbar
		// thumb motion to
		// apply the vertical
		// carousel effect.
		verticalCarousel_ ();
		// Adding `auto-scrollable`
		// attribute to all
		// children.
		for (
			const mhd of body_.children
		) {
			// Adds `auto-scrollable`
			// attribute to the
			// current child.
			mhd.setAttribute (
				"auto-scrollable", true
			);
		}
	};

	/**
	 * @description Toggles effects
	 * 	actions on the passed tag
	 * 	reference.
	 * @param {Element} tag The tag
	 * 	to target.
	 * @param {boolean} active if
	 * 	it's `true`, we'll add
	 * 	effects. Otherwise, we
	 * 	will remove them.
	 * @function toggleEffects_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const toggleEffects_ = (
		tag, active
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
	 * @description Animates or moves
	 * 	the fake scroll bar to the
	 * 	active methodology child
	 * 	position.
	 * @param {Number} index The
	 * 	index of a methodology.
	 * @function moveScroller_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const moveScroller_ = index => {
		// The total margin top to be
		// generated to go directly
		// to methodology tag
		// section.
		let totalMarginTop = 0;
		// The custom scrollbar
		// thumb.
		const scrollThumb = (
			scroll_.children[0]
		);
		// Sets thumb height to the
		// current methodology tag
		// height.
		scrollThumb.style.height = (
			`${
				body_.children[index]
					.offsetHeight
			}px`
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
		// The methodologies list.
		const mhds = body_.children;
		// Listening `scroll` event.
		for (
			let t = 0;
			t < body_.childElementCount;
			t++
		) {
			// Adds a `scroll` event
			// to the current child.
			mhds_[t] = (
				new ScrollManager ({
					offsetBottom: 300,
					target: mhds[t],
					offsetTop: 300,
					scope: window,
					root: main_,
					onLeave: () => {
						// Removes focus
						// from active
						// child.
						toggleEffects_ (
							mhds[t], false
						);
					},
					onEnter: () => {
						// Animates the
						// scroller to
						// child pos.
						moveScroller_ (t);
						// Puts focus on
						// the current
						// child.
						toggleEffects_ (
							mhds[t], true
						);
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (2);
					}
				})
			);
		}
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
		// Listens right arrow `click`
		// event.
		rightButton_.addEventListener (
			"click",
			() => swipeRight_ (true)
		);
		// Listens left arrow `click`
		// event.
		leftButton_.addEventListener (
			"click",
			() => swipeLeft_ (true)
		);
		// Listens `click` event
		// on every methodologies.
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
		// the right swipe.
		swipe.swipeRight ({
			tagId: "div.mhds-body",
			feedback: () => {
				// Swipes methodologies
				// to left.
				swipeLeft_ (true);
			}
		});
		// Listens human fingers
		// motion on mobile for
		// the left swipe.
		swipe.swipeLeft ({
			tagId: "div.mhds-body",
			feedback: () => {
				// Swipes methodologies
				// to right.
				swipeRight_ (true);
			}
		});
	};

	/**
	 * @description Animates methodologies
	 * 	for small screens.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const smallAnimation_ = () => {
		// Listens controls to
		// apply horizontal
		// carousel effect.
		horizontalCarousel_ ();
		// Clears methodologies
		// children `scroll`
		// events and data.
		clearScrollEvents_ ();
		// Resets auto carousel.
		resetAutoCarousel_ ();
		// The content tag ref.
		const content = (
			body_.parentElement
		);
		// The big title tag.
		const title = (
			content.parentElement
				.children[0]
		);
		// Focus on the current
		// section for scrolling.
		scrollManager_ = (
			new ScrollManager ({
				offsetBottom: 340,
				target: section_,
				offsetTop: 340,
				scope: window,
				root: main_,
				onEnter: () => {
					// Warns user about a
					// swapable element.
					dissolvable_ (5000);
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
			})
		);
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
				// The total methodology
				// width size with a few
				// margins: `100px`.
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
				// comes to the end of the
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
			// Adds `mhds-move-left`
			// class to button.
			leftButton_.classList.add (
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
				disabled_ = false
			), waitForEnable);
		}
	};

	/**
	 * @description Builds methodologies
	 * 	html structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// The main tag reference.
		main_ = (
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
			"methodologies"
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
		main_.appendChild (section_);
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
									"mhds-index"
								),
								textualsId: (
									"mhds-data"
								)
							})
						);
					}
				);
				// Listens screen format.
				new ScreenManager ({
					onMedium: addAttribute_,
					onLarge: addAttribute_,
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
					},
					onSmall: () => {
						// Destroys attribute.
						removeAttribute_ ();
						// Makes animation.
						smallAnimation_ ();
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
