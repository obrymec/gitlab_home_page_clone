/**
* @fileoverview Resources UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-14
* @updated 2023-07-14
* @file resources.js
* @type {Resources}
* @version 0.0.1
*/

// Custom dependencies.
import {swipe} from "../../utilities/swipe/swipe.js";

/**
 * @public @class @classdesc Builds resources
 * 	section.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 		 resources tag section.
 * @returns {Resources} Resources
 */
function Resources (data) {
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
	 *  of a resource tag element
	 * 	from his position index
	 * 	within the HTML tree.
	 * @param {Number} pos The resource
	 * 	position's index to be retrieved.
	 * @function getResource_
	 * @constant {Function}
	 * @private
	 * @returns {Element} Element
	*/
	const getResource_ = pos => (
		document.querySelector (`
			div.res-body > div.resource:
			nth-child(${pos})
		`.replaceAll (' ', '')
		 .replaceAll ('\n', '')
		 .replaceAll ('\t', '')
		)
	);

	/**
	 * @description Builds a button for
	 * 	view or read more tags.
	 * @param {String} text The button's
	 * 	text label to displayed.
	 * @function buildButton_
	 * @constant {Function}
	 * @private
	 * @returns {void} void
	*/
	const buildButton_ = text => `
		<button>
			<span>
				${
					text
						?.replaceAll ('\n', '')
						?.replaceAll ('\t', '')
						?.trim ()
				}
			</span>
			<img
				src = "${rightArrowPath_}"
				alt = ''
			/>
		</button>
	`;

	/**
	 * @description Builds a resource
	 * 	html structure.
	 * @param {Object<String, String>} data
	 * 	The resource's data. This map
	 * 	supports the following keys:
	 * 	- String iconPath: The header
	 * 		icon's path.
	 * 	- String title: The header's
	 * 		title.
	 * 	- String imagePath: The body
	 * 		image's path.
	 * 	- String description: The
	 * 		resource's description.
	 * @function buildResource_
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildResource_ = data => `
		<div class = "resource">
			<div>
				<img
					src = "${
						data?.iconPath
							?.replaceAll (' ', '')
							?.replaceAll ('\n', '')
							?.replaceAll ('\t', '')
					}"
					alt = ''
				/>
				<span>
					${data?.title?.trim ()}
				</span>
			</div>
			<div>
				<img
					src = "${
						data?.imagePath
							?.replaceAll (' ', '')
							?.replaceAll ('\n', '')
							?.replaceAll ('\t', '')
					}"
					alt = ''
				/>
			</div>
			<p>
				${
					data?.description
						?.replaceAll ('\n', '')
						?.replaceAll ('\t', '')
						?.trim ()
				}
			</p>
			<div>
				${buildButton_ ("Read more")}
			</div>
		</div>
	`;

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
			window.innerWidth <= 770
		);
		// The first resource
		// tag section.
		const resource = (
			getResource_ (1)
		);
		// The right arrow button.
		const rightButton = (
			document.querySelector (
				"div.res-right-arrow"
			)
		);
		// The left arrow button.
		const leftButton = (
			document.querySelector (
				"div.res-left-arrow"
			)
		);
		// The resources container.
		const container = (
			document.querySelector (
				"div.res-body"
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
			// Adds `res-show-arrows`
			// class to the right arrow.
			rightButton?.classList
				?.add ("res-show-arrows");
			// Adds `res-show-arrows`
			// class to the left arrow.
			leftButton?.classList
				?.add ("res-show-arrows");
			// Launches a new dissolve
			// delay for (01) second.
			dissolveDelay = (
				window.setTimeout (() => {
					// Removes `res-show-arrows`
					// class from the right arrow.
					rightButton?.classList
						?.remove (
							"res-show-arrows"
						);
					// Removes `res-show-arrows`
					// class from the left arrow.
					leftButton?.classList
						?.remove (
							"res-show-arrows"
						);
				}, 1000)
			);
		};
		// A lambda method that scroll
		// resources to right.
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
						+ resource?.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						container?.scrollLeft
						+ resource?.offsetWidth
					);
					// The total resource
					// width size with a few
					// margins: `100px`.
					const totalWidth = (
						(
							resource?.offsetWidth
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
				// Adds `res-move-right`
				// class to button.
				rightButton?.classList
					?.add (
						"res-move-right"
					)
				// Waits for 150 miliseconds.
				window.setTimeout (() => (
					rightButton?.classList
						?.remove (
							"res-move-right"
						)
				), 150);
				// Waits for 400 miliseconds.
				window.setTimeout (() => (
					disabled = false
				), waitForEnable);
			}
		};
		// A lambda method that scroll
		// resources to left.
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
						- resource?.offsetWidth
					);
					// The real scroll position.
					const scrollPos = (
						container?.scrollLeft
						- resource?.offsetWidth
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
						resource?.offsetWidth
							* container?.children
								?.length
					);
				}
				// Disabled controls.
				disabled = true;
				// Adds `res-move-left`
				// class to button.
				leftButton?.classList
					?.add (
						"res-move-left"
					)
				// Waits for 150 miliseconds.
				window.setTimeout (() => (
					leftButton?.classList
						?.remove (
							"res-move-left"
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
		// Starts auto carousel
		// process.
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
				// Swipes resources
				// to right.
				swipeRight (true);
			// Whether the direction is
			// right.
			} else if (
				direction === "right"
			) {
				// Swipes resources
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
				// to `770px`.
				if (
					window.innerWidth <= 770
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
	 * @description Builds resources
   *  html structure as string
   *  format.
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
        "resources"
      );
			// Adds a html structure
      // to the created section.
			section.innerHTML = `
        <div class = "res-head">
					<h2>Resources</h2>
					${buildButton_ (
						"View all resources"
					)}
				</div>
				<div class = "res-content">
					<div class = "res-left-arrow">
						<img
							src = "${rightArrowPath_}"
							alt = ''
						/>
					</div>
					<div class = "res-right-arrow">
						<img
							src = "${rightArrowPath_}"
							alt = ''
						/>
					</div>
					<div class = "res-body">
						${buildResource_ ({
							title: "Ebook",
							imagePath: `
								../../../../../assets
								/images/resource-1.png
							`,
							iconPath: `
								../../../../../assets
								/icons/resource-1.svg
							`,
							description: `
								Beginner's Guide to 
								DevOps
							`
						})}
						${buildResource_ ({
							description: "What is CI/CD?",
							title: "Topics",
							imagePath: `
								../../../../../assets
								/images/resource-2.png
							`,
							iconPath: `
								../../../../../assets
								/icons/resource-2.svg
							`,
						})}
						${buildResource_ ({
							title: "Report",
							imagePath: `
								../../../../../assets
								/images/resource-3.png
							`,
							iconPath: `
								../../../../../assets
								/icons/resource-3.svg
							`,
							description: `
								2023 Global DevSecOps 
								Report Series
							`
						})}
						${buildResource_ ({
							title: "Blog post",
							imagePath: `
								../../../../../assets
								/images/resource-4.png
							`,
							iconPath: `
								../../../../../assets
								/icons/resource-4.svg
							`,
							description: `
								AI/ML in DevSecOps 
								Series
							`
						})}
						${buildResource_ ({
							title: "Partners",
							imagePath: `
								../../../../../assets
								/images/resource-5.png
							`,
							iconPath: `
								../../../../../assets
								/icons/resource-5.svg
							`,
							description: `
								Discover the benefits 
								of GitLab on AWS
							`
						})}
						${buildResource_ ({
							title: "Release",
							imagePath: `
								../../../../../assets
								/images/resource-6.png
							`,
							iconPath: `
								../../../../../assets
								/icons/resource-6.svg
							`,
							description: `
								GitLab 16.1 released 
								with all new navigation
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
    }
  }
}

/**
 * @description Exports all public
 *  features.
 * @exports *
 */
export {Resources};
