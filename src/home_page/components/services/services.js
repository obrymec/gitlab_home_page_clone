/**
* @fileoverview Services UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-23
* @updated 2023-08-18
* @file services.js
* @type {Services}
* @version 0.0.2
*/

// Custom dependencies.
import {buildFlatButton} from "../../../common/components/button/button.js";
import {clearJSStyle} from "../../../common/utilities/browser/browser.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildIcon,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds services section.
 * @public
 * @class
 * @returns {Services} Services
 */
function Services () {
	// Attributes.
	/**
	 * @description The provided
	 * 	services container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let services_ = null;

	/**
	 * @description Clears animation 
	 * 	timeline data.
	 * @param {String} direction The
	 * 	animation direction.
	 * @function clearData_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const clearData_ = direction => (
		// Waits for 250 milisecond
		// before add paddings.
		window.setTimeout (() => (
			// Clears js animation
			// data.
			clearJSStyle ({
				direction: direction,
				targets: [
					{
						start: "services-second-as",
						ref: services_.children[1],
						end: "services-second-af"
					},
					{
						start: "services-third-as",
						ref: services_.children[2],
						end: "services-third-af"
					},
					{
						start: "services-as",
						end: "services-af",
						ref: services_,
						children: true
					}
				]
			})
		), 250)
	);

	/**
	 * @description Builds services html
	 * 	structure as string format.
	 * @param {{
	 * 	buttonText: String,
	 * 	className: String,
	 * 	about: String,
	 * 	title: String,
	 * 	icon: String
	 * }} data The service tag configs.
	 * 	It supports the following keys:
	 * 
	 * 	- String icon: The service's
	 * 		front icon.
	 *
	 * 	- String title: The service's
	 * 		main title.
	 *
	 * 	- String about: The service's
	 * 		short description.
	 *
	 * 	- String buttonText: The
	 * 		button's text to display.
	 *
	 * 	- String className: The
	 * 		class's name of service.
	 * @function buildService_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildService_ = ({
		className = '',
		buttonText,
		about,
		title,
		icon
	}) => `
		<div
			class = "${
				"service services-as" +
				` ${className}`
			}"
		>
			<div>
				${buildIcon ({
					fileName: icon,
					data: {
						height: "24px",
						width: "24px"
					}
				})}
				<label>
					${clearStr ({
						input: title
					})}
				</label>
				<p>
					${clearStr ({
						input: about
					})}
				</p>
			</div>
			${buildFlatButton ({
				text: buttonText
			})}
		</div>
	`;

	/**
	 * @description Animates services
	 * 	section for large screens.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const largeAnimation_ = () => {
		// Creates a timeline with
		// default parameters.
		const timeline = anime.timeline ({
			easing: "linear",
			autoplay: false,
			duration: 140,
			delay: 80,
			complete: function () {
				// Clears all animations
				// data.
				clearData_ (this.direction);
			}
		});
		// Animating the first
		// and last services.
		for (
			const child of [
				services_.firstElementChild,
				services_.lastElementChild
			]
		) {
			// Adds the current
			// child to the
			// timeline.
			timeline.add ({
				width: ["0%", "100%"],
				targets: child
			}, 250);
		}
		// Animates the middle
		// service.
		timeline.add ({
			width: ["0%", "100%"],
			targets: (
				services_.children[1]
			)
		});
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates the provided
	 * 	services regardless the detected
	 * 	screen format (Desktop & Mobile).
	 * @param {String} dir The animation
	 * 	direction.
	 * @function animateServices_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const animateServices_ = dir => {
		// The animation timeline.
		let timeline = null;
		// Listens screen format.
		new ScreenManager ({
			disableDetection: true,
			mediumScreen: {
				max: 1196,
				min: 1026
			},
			smallScreen: {
				max: 1025,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 1195
			},
			onMedium: () => {
				// Animates the provided
				// services for medium
				// screens.
				timeline = (
					largeAnimation_ ()
				);
			},
			onSmall: () => {
				// Animates the provided
				// services for small
				// screens.
				timeline = (
					smallAnimation_ (dir)
				);
			},
			onLarge: () => {
				// Animates the provided
				// services for large
				// screens.
				timeline = (
					largeAnimation_ ()
				);
			}
		});
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates services
	 * 	for small screens.
	 * @param {String} dir The animation
	 * 	direction.
	 * @function smallAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const smallAnimation_ = dir => {
		// Whether direction is
		// in reverse mode.
		if (dir === "reverse") {
			// Waits for 145 milliseconds.
			window.setTimeout (() => {
				// Clears all data.
				clearData_ (dir);
			}, 145);
		}
		// The all services animation
		// configuratons.
		return anime ({
			targets: services_.children,
			width: ["0%", "100%"],
			opacity: [0.0, 1.0],
			autoplay: false,
			duration: 140,
			complete: function () {
				// The animation direction
				// at the end of them.
				const dirt = this.direction;
				// Whether direction is in
				// normal mode.
				if (dirt === "normal") {
					// The second service middle
					// animation configurations.
					const service2 = anime ({
						autoplay: false,
						duration: 140,
						delay: 120,
						targets: (
							services_.children[1]
						),
						translateY: [
							"-280px", "0px"
						]
					});
					// The third service middle
					// animation configurations.
					const service3 = anime ({
						autoplay: false,
						duration: 140,
						delay: 120,
						targets: (
							services_.children[2]
						),
						translateY: [
							"-560px", "-280px"
						],
						complete: function () {
							// The third service
							// final animation
							// configurations.
							const serviceIII = (
								anime ({
									autoplay: false,
									duration: 140,
									delay: 120,
									targets: (
										services_.children[2]
									),
									translateY: [
										"-280px", "0px"
									],
									complete: function () {
										// Clears all data.
										clearData_ (dirt);
									}
								})
							);
							// Animates the third
							// service again.
							serviceIII.play ();
						}
					});
					// Animates the second
					// service in normal
					// mode.
					service2.play ();
					// Animates the third
					// service in normal
					// mode.
					service3.play ();
				}
			}
		});
	}

	/**
	 * @description Builds services html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Creates a section tag.
		services_ = (
			document.createElement (
				"section"
			)
		);
		// Adds a class's name to
		// the created section.
		services_.classList.add (
			"services"
		);
		// Adds a html structure
		// to the created section.
		services_.innerHTML = `
			${buildService_ ({
				buttonText: lang.getText ("tr17"),
				title: lang.getText ("tr16"),
				about: lang.getText ("tr18"),
				icon: Icons.VERIFIED
			})}
			${buildService_ ({
				buttonText: lang.getText ("tr21"),
				className: "services-second-as",
				title: lang.getText ("tr19"),
				about: lang.getText ("tr20"),
				icon: Icons.REPORT
			})}
			${buildService_ ({
				buttonText: lang.getText ("tr24"),
				className: "services-third-as",
				title: lang.getText ("tr22"),
				about: lang.getText ("tr23"),
				icon: Icons.CODE_SUGGESTION
			})}
		`;
		// Adds the below section
		// to the selected tag as
		// a child.
		document.querySelector (
			"main"
		).appendChild (services_);
		// Animates services.
		animateServices_ ().play ();
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Services};
