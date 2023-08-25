/**
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Methodologies UI component.
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file methodologies.js
* @type {Methodologies}
* @created 2023-07-06
* @updated 2023-08-25
* @version 0.0.2
*/

// Custom dependencies.
import {buildFlatButton} from "../../../common/components/button/button.js";
import {getScrollPercent} from "../../../common/utilities/scroll/scroll.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import swipe from "../../../common/utilities/swipe/swipe.js";
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
	 * @description Returns a reference
	 *  of a methodology tag element
	 * 	from his position index
	 * 	within the HTML tree.
	 * @param {Number} pos The methodology
	 * 	position's index to be retrieved.
	 * @function getMethodology_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Element} Element
	 */
	const getMethodology_ = pos => (
		document.querySelector (
			"div.mhds-body"
		).children[pos]
	);

	/**
	 * @description Toggles effects actions
	 * 	on the passed tag reference.
	 * @param {Element} tag The tag to target.
	 * @param {boolean} active Whether
	 * 	is `true` we'll add effects. 
	 * 	Otherwise, we'll remove them.
	 * @function toggleEffects_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const toggleEffects_ = (
		tag, active
	) => {
		// Whether active is set to `true`.
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
	 * @description Builds a methodology html
	 * 	structure with a few parameters.
	 * @param {Object<String, String>} data
	 * 	Contains the methodology data.
	 * @function buildMethodology_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildMethodology_ = data => `
		<div
			id = "mhd-${data.id}"
			class = "methodology"
		>
			<div class = "mhds-infos">
				<div>
					<span>
						${buildIcon ({
							fileName: data.icon
						})}
					</span>
					<h3>
						${clearStr ({
							input: data.title
						})}
					</h3>
					<p>
						${clearStr ({
							input: data.description
						})}
					</p>
				</div>
				<div>
					${buildImage ({
						fileName: data.image
					})}
				</div>
			</div>
			${buildFlatButton ({
				text: lang.getText ("tr24"),
				className: "learn-more"
			})}
		</div>
	`;

	/**
	 * @description Checks scroll variation.
	 * @param {Element} oldTag The previou
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
	const checkMatch_ = (oldTag, index) => {
		// The new tag reference.
		const newTag = getMethodology_ (
			index
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
					document.querySelector (
						"div.mhds-scroll > div"
					)
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
					// previou methodology
					// plus their container
					// flexbox gap: `94px`.
					totalMarginTop += (
						getMethodology_ (pos)
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
		const start = 58;
		// Listens window scrollbar motion.
		document.addEventListener (
			"scroll",
			() => {
				// Whether window width is
				// great than 760 pixels.
				if (window.innerWidth > 760) {
					// The current scroll progress.
					const progress = (
						getScrollPercent ()
					);
					// The total percentage since
					// the starting percentage.
					let end = start;
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
								// The previou percentage
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
									// Free `oldTag` variable.
									oldTag = null;
								}
							}
						}
					);
				}
			}
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
		// The delay to dissolve
		// arrows.
		let dissolveDelay = null;
		// The auto carousel state.
		let autoCarousel = null;
		// Whether right scroll
		// is busy or not.
		let rightBusy = false;
		// Whether a button is
		// enabled or disabled.
		let disabled = false;
		// Whether left scroll
		// is busy or not.
		let leftBusy = true;
		// Whether carousel state
		// is reset.
		let isReset = (
			window.innerWidth <= 760
		);
		// The first methodology
		// tag section.
		const methodology = (
			getMethodology_ (1)
		);
		// The right arrow button.
		const rightButton = (
			document.querySelector (
				"div.mhds-right-arrow"
			)
		);
		// The left arrow button.
		const leftButton = (
			document.querySelector (
				"div.mhds-left-arrow"
			)
		);
		// The methodologies container.
		const container = (
			document.querySelector (
				"div.mhds-body"
			)
		);
		// Starts auto carusel process.
		const startAutoCarouselProcess = (
			() => {
				// Starts auto carousel
				// process.
				autoCarousel = (
					window.setInterval (
						() => swipeRight (false),
						5000
					)
				);
			}
		);
		// Stops auto carusel process
		// in background direclty.
		const stopAutoCarouselProcess = (
			() => {
				// The auto carousel timer is
				// defined.
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
		// Puts a dissolve effect on
		// both arrow.
		const dissolvable = () => {
			// The dissolve delay is
			// defined.
			if (dissolveDelay != null) {
				// Destroys the upcoming
				// delay in memory.
				window.clearTimeout (
					dissolveDelay
				);
			}
			// Adds `mhds-show-arrows`
			// class to the right arrow.
			rightButton.classList
				.add ("mhds-show-arrows");
			// Adds `mhds-show-arrows`
			// class to the left arrow.
			leftButton.classList
				.add ("mhds-show-arrows");
			// Launches a new dissolve
			// delay for (01) second.
			dissolveDelay = (
				window.setTimeout (() => {
					// Removes `mhds-show-arrows`
					// class from the right arrow.
					rightButton.classList
						.remove (
							"mhds-show-arrows"
						);
					// Removes `mhds-show-arrows`
					// class from the left arrow.
					leftButton.classList
						.remove (
							"mhds-show-arrows"
						);
				}, 1000)
			);
		};
		// A lambda method that scroll
		// methodologies to right.
		const swipeRight = dissolve => {
			// Whether `disabled` field
			// is set to `false`.
			if (!disabled) {
				// Whether arrows are dissolvable.
				if (dissolve) dissolvable ();
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
					container.scrollLeft = (
						container.scrollLeft
						+ methodology.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						container.scrollLeft
						+ methodology.offsetWidth
					);
					// The total methodology
					// width size with a few
					// margins: `100px`.
					const totalWidth = (
						(
							methodology.offsetWidth
							* (
									container.children
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
					container.scrollLeft = 0;
					// Increases enable wait.
					waitForEnable = 800;
					// Sets the scroll right
					// availability.
					rightBusy = false;
					// Sets the scroll left
					// availability.
					leftBusy = true;
				}
				// Disabled controls.
				disabled = true;
				// Adds `mhds-move-right`
				// class to button.
				rightButton.classList
					.add (
						"mhds-move-right"
					)
				// Waits for 150 miliseconds.
				window.setTimeout (() => (
					rightButton.classList
						.remove (
							"mhds-move-right"
						)
				), 150);
				// Waits for 400 miliseconds.
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
				if (dissolve) dissolvable ();
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
					container.scrollLeft = (
						container.scrollLeft
						- methodology.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						container.scrollLeft
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
					container.scrollLeft = (
						methodology.offsetWidth
							* container.children
								.length
					);
				}
				// Disabled controls.
				disabled = true;
				// Adds `mhds-move-left`
				// class to button.
				leftButton.classList
					.add (
						"mhds-move-left"
					)
				// Waits for 150 miliseconds.
				window.setTimeout (() => (
					leftButton.classList
						.remove (
							"mhds-move-left"
						)
				), 150);
				// Waits for 400 miliseconds.
				window.setTimeout (() => (
					disabled = false
				), waitForEnable);
			}
		};
		// Listens right arrow
		// `click` event.
		rightButton.addEventListener (
			"click",
			() => swipeRight (true)
		);
		// Listens left arrow
		// `click` event.
		leftButton.addEventListener (
			"click",
			() => swipeLeft (true)
		);
		// Starts auto carousel process.
		autoCarousel = (
			window.setInterval (
				() => swipeRight (false),
				10000
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
		// Listens user click event
		// on every methodologies.
		[0, 1, 2, 3, 4].forEach (index => (
			getMethodology_ (index)
				.addEventListener (
					"click", dissolvable
				)
		));
		// Listens window resizing.
		window.addEventListener (
			"resize",
			() => {
				// Stops auto carousel.
				stopAutoCarouselProcess ();
				// Whether window's width
				// is less than or equal
				// to `760px`.
				if (
					window.innerWidth <= 760
				) {
					// Whether no reset has been
					// done.
					if (!isReset) {
						// Resets the scroll thumb.
						container.scrollLeft = 0;
						// Sets the scroll right
						// availability.
						rightBusy = false;
						// Sets the scroll left
						// availability.
						leftBusy = true;
						// Overrides the reseting
						// state.
						isReset = true;
					}
					// Starts auto carousel.
					startAutoCarouselProcess ();
				// Otherwise.
				} else {
					// Overrides the reseting
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
			<h2>
				${lang.getText ("tr58")}
			</h2>
			<div class = "mhds-content">
				<div class = "mhds-left-arrow">
					${buildIcon ({
						fileName: Icons.RIGHT_ARROW
					})}
				</div>
				<div class = "mhds-right-arrow">
					${buildIcon ({
						fileName: Icons.RIGHT_ARROW
					})}
				</div>
				<div class = "mhds-scroll">
					<div></div>
				</div>
				<div class = "mhds-body">
					${buildMethodology_ ({
						description: lang.getText ("tr60"),
						title: lang.getText ("tr59"),
						image: Images.METHODOLOGY_1,
						icon: Icons.METHODOLOGY_1,
						id: 1
					})}
					${buildMethodology_ ({
						description: lang.getText ("tr62"),
						title: lang.getText ("tr61"),
						image: Images.METHODOLOGY_2,
						icon: Icons.METHODOLOGY_2,
						id: 2
					})}
					${buildMethodology_ ({
						description: lang.getText ("tr64"),
						title: lang.getText ("tr63"),
						image: Images.METHODOLOGY_3,
						icon: Icons.METHODOLOGY_3,
						id: 3
					})}
					${buildMethodology_ ({
						description: lang.getText ("tr66"),
						title: lang.getText ("tr65"),
						image: Images.METHODOLOGY_4,
						icon: Icons.METHODOLOGY_4,
						id: 4
					})}
					${buildMethodology_ ({
						description: lang.getText ("tr68"),
						title: lang.getText ("tr67"),
						image: Images.METHODOLOGY_5,
						icon: Icons.METHODOLOGY_5,
						id: 5
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
		// Listens controls to apply
		// horizontal carousel effect.
		horizontalCarousel_ ();
		// Listens browser scrollbar
		// thumb motion to apply the
		// vertical carousel effect.
		verticalCarousel_ ();
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Methodologies};
