/**
* @fileoverview Methodologies UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file methodologies.js
* @type {Methodologies}
* @created 2023-07-06
* @updated 2023-07-14
* @version 0.0.1
*/

// Custom dependencies.
import {swipe} from "../../utilities/swipe/swipe.js";

/**
 * @public @class @classdesc Builds
 * 	enterprise work methodologies.
 * @param {Object<String, any>} data A
 *  a javascript object that supports
 * 	the following key(s):
 *  - !String parentId: The parent id
 * 		of work methodologies section.
 * @returns {Methodologies} Methodologies
 */
function Methodologies (data) {
	/**
 	 * @description The right arrow
	 * 	icon's path.
	 * @constant {String}
 	 * @private {String}
	 * @field
	 */
	const rightArrowPath_ = `
		../../../../../assets/icons
		/right-arrow.svg
	`;
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
	 * @description Returns a reference
	 *  of a methodology tag element
	 * 	from his position index
	 * 	within the HTML tree.
	 * @param {Number} pos The methodology
	 * 	position's index to be retrieved.
	 * @function getMethodology_
	 * @constant {Function}
	 * @private
	 * @returns {Element} Element
	*/
	const getMethodology_ = pos => (
		document.querySelector (`
			div.mhds-body >
			div.methodology:
			nth-child(${pos})
		`.replaceAll (' ', '')
		 .replaceAll ('\n', '')
		 .replaceAll ('\t', '')
		)
	);

	/**
	 * @description Calculates and
	 * 	returns the scroll bar
	 * 	progress in percentage.
	 * @function getScrollProgress_
	 * @constant {Function}
	 * @private
	 * @returns {Number} Number
	*/
	const getScrollProgress_ = () => {
		// The current scroll y axis.
		const scrollY = (
			Math.round (window.scrollY)
			+ window.innerHeight
		);
		// The main container size.
		const mainSize = (
			document.querySelector (
				"main#root"
			)?.offsetHeight
		);
		// Returns the current progress
		// in percentage.
		return Math.round (
			(scrollY * 100) / mainSize
		);
	};

	/**
	 * @description Toggles effects actions
	 * 	on the passed tag reference.
	 * @param {Element} tag The tag to target.
	 * @param {boolean} active Whether
	 * 	is `true` we'll add effects. 
	 * 	Otherwise, we'll remove them.
	 * @function toggleEffects_
	 * @constant {Function}
	 * @private
	 * @returns {void} void
	 */
	const toggleEffects_ = (
		tag, active
	) => {
		// Whether active is set to `true`.
		if (active) {
			// Adds `mhds-image-show`
			// class to his image kid.
			tag?.children[0]?.children[1]
			?.classList?.add (
				"mhds-image-show"
			);
			// Adds `mhds-enabled`
		 	// class to our tag.
			tag?.classList?.add (
				"mhds-enabled"
			);
		// Otherwise.
		} else {
			// Removes `mhds-image-show`
			// class from his image kid.
			tag?.children[0]?.children[1]
			?.classList?.remove (
				"mhds-image-show"
			);
			// Removes `mhds-enabled`
			// class from our tag.
			tag?.classList?.remove (
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
	 * @private
	 * @returns {String} String
	 */
	const buildMethodology_ = data => `
		<div
			id = "mhd-${data?.id}"
			class = "methodology"
		>
			<div class = "mhds-infos">
				<div>
					<span>
						<img
							src = "${
								data?.icon
									?.replaceAll (' ', '')
									?.replaceAll ('\n', '')
									?.replaceAll ('\t', '')
							}"
							alt = ''
						/>
					</span>
					<h3>
						${
							data?.title
								?.replaceAll ('\n', '')
								?.replaceAll ('\t', '')
								?.trim ()
						}
					</h3>
					<p>
						${
							data?.description
								?.replaceAll ('\n', '')
								?.replaceAll ('\t', '')
								?.trim ()
						}
					</p>
				</div>
				<div>
					<img
						src = "${
							data?.image
								?.replaceAll (' ', '')
								?.replaceAll ('\n', '')
								?.replaceAll ('\t', '')
						}"
						alt = ''
					/>
				</div>
			</div>
			<button class = "learn-more">
				<span>Learn more</span>
				<img
					src = "${rightArrowPath_}"
					alt = ''
				/>
			</button>
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
	 * @private
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
			const oldId = oldTag?.id;
			// Whether the given ids
			// aren't the same.
			if (oldId !== newTag?.id) {
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
					`${newTag?.offsetHeight}px`
				);
				// Computing the margin top
				// that we need to move our
				// scroll thumb directly to
				// the current methodology.
				for (
					let pos = 1;
					pos < index;
					pos++
				) {
					// Adds the height of the
					// previou methodology
					// plus their container
					// flexbox gap: `94px`.
					totalMarginTop += (
						getMethodology_ (pos)
						?.offsetHeight + 94
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
	 * @private
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
						getScrollProgress_ ()
					);
					// The total percentage since
					// the starting percentage.
					let end = start;
					// Checking scroll thumb
					// position in percentage
					// to select the matched
					// methodology card tag
					// section.
					[1, 2, 3, 4, 5, null].forEach (
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
	 * @private
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
			rightButton?.classList
				?.add ("mhds-show-arrows");
			// Adds `mhds-show-arrows`
			// class to the left arrow.
			leftButton?.classList
				?.add ("mhds-show-arrows");
			// Launches a new dissolve
			// delay for (01) second.
			dissolveDelay = (
				window.setTimeout (() => {
					// Removes `mhds-show-arrows`
					// class from the right arrow.
					rightButton?.classList
						?.remove (
							"mhds-show-arrows"
						);
					// Removes `mhds-show-arrows`
					// class from the left arrow.
					leftButton?.classList
						?.remove (
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
						container?.scrollLeft
						+ methodology?.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						container?.scrollLeft
						+ methodology?.offsetWidth
					);
					// The total methodology
					// width size with a few
					// margins: `100px`.
					const totalWidth = (
						(
							methodology?.offsetWidth
							* (
									container?.children
										?.length - 1
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
				rightButton?.classList
					?.add (
						"mhds-move-right"
					)
				// Waits for 150 miliseconds.
				window.setTimeout (() => (
					rightButton?.classList
						?.remove (
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
						container?.scrollLeft
						- methodology?.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						container?.scrollLeft
						- methodology?.offsetWidth
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
						methodology?.offsetWidth
							* container?.children
								?.length
					);
				}
				// Disabled controls.
				disabled = true;
				// Adds `mhds-move-left`
				// class to button.
				leftButton?.classList
					?.add (
						"mhds-move-left"
					)
				// Waits for 150 miliseconds.
				window.setTimeout (() => (
					leftButton?.classList
						?.remove (
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
		rightButton?.addEventListener (
			"click",
			() => swipeRight (true)
		);
		// Listens left arrow
		// `click` event.
		leftButton?.addEventListener (
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
		// on mobile.
		swipe (container, direction => {
			// Whether the direction is
			// left.
			if (direction === "left") {
				// Swipes methodologies
				// to right.
				swipeRight (true);
			// Whether the direction is
			// right.
			} else if (
				direction === "right"
			) {
				// Swipes methodologies
				// to left.
				swipeLeft (true);
			}
		});
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
				"methodologies"
			);
			// Adds a html structure
			// to the created section.
			section.innerHTML = `
				<h2>
					The way DevSecOps should be
				</h2>
				<div class = "mhds-content">
					<div class = "mhds-left-arrow">
						<img
							src = "${rightArrowPath_}"
							alt = ''
						/>
					</div>
					<div class = "mhds-right-arrow">
						<img
							src = "${rightArrowPath_}"
							alt = ''
						/>
					</div>
					<div class = "mhds-scroll">
						<div></div>
					</div>
					<div class = "mhds-body">
						${buildMethodology_ ({
							id: 1,
							image: `
								../../../../../assets/images
								/methodology-1.png
							`,
							icon: `
								../../../../../assets/icons
								/mothodology-1.svg
							`,
							title: `
								Accelerate your digital 
								transformation
							`,
							description: `
								Reach your digital transformation 
								objectives faster with a DevSecOps 
								platform for your entire 
								organization.
							`
						})}
						${buildMethodology_ ({
							title: "Deliver software faster",
							id: 2,
							image: `
								../../../../../assets/images
								/methodology-2.png
							`,
							icon: `
								../../../../../assets/icons
								/methodology-2.svg
							`,
							description: `
								Automate your software delivery 
								process so you can deliver value 
								faster and quality code more 
								often.
							`
						})}
						${buildMethodology_ ({
							title: "Ensure compliance",
							id: 3,
							image: `
								../../../../../assets/images
								/methodology-3.png
							`,
							icon: `
								../../../../../assets/icons
								/methodology-3.svg
							`,
							description: `
								Simplify continuous software 
								compliance by defining, enforcing 
								and reporting on compliance 
								in one platform.
							`
						})}
						${buildMethodology_ ({
							title: "Build in security",
							id: 4,
							image: `
								../../../../../assets/images
								/methodology-4.png
							`,
							icon: `
								../../../../../assets/icons
								/methodology-4.svg
							`,
							description: `
								Adopt DevSecOps practices with 
								continuous software security 
								assurance across every stage.
							`
						})}
						${buildMethodology_ ({
							id: 5,
							image: `
								../../../../../assets/images
								/methodology-5.png
							`,
							icon: `
								../../../../../assets/icons
								/methodology-5.svg
							`,
							title: `
								Improve collaboration 
								and visibility
							`,
							description: `
								Give everyone one platform to 
								collaborate and see everything 
								from planning to production.
							`
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
			// Listens controls to apply
			// horizontal carousel effect.
			horizontalCarousel_ ();
			// Listens browser scrollbar
			// thumb motion to apply the
			// vertical carousel effect.
			verticalCarousel_ ();
		}
	}
}

/**
 * @description Exports all public
 * 	features.
 * @exports *
 */
export {Methodologies};
