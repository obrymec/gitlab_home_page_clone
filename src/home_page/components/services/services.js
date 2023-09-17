/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview Services UI component.
* @supported DESKTOP, MOBILE
* @created 2023-06-23
* @updated 2023-09-16
* @file services.js
* @type {Services}
* @version 0.0.2
*/

// Custom dependencies.
import {buildFlatButton} from "../../../common/components/button/button.js";
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	getUpdates,
	clearStr
} from "../../../common/utilities/string/string.js";
import {
	listenLoadEvent,
	clearJSStyle
} from "../../../common/utilities/browser/browser.js";
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
	 * @description Removes an
	 * 	attribute and adds an
	 * 	attribute to services
	 * 	container.
	 * @constant {Function}
	 * @private {Function}
	 * @function reajust_
	 * @returns {void} void
	 */
	const reajust_ = () => {
		// Destroys `auto-scrollable`
		// attribute from services
		// children and itself.
		removeAttribute_ ();
		// Adds `auto-scrollable`
		// attribute to services.
		services_.setAttribute (
			"auto-scrollable",
			true
		);
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
		// Removes `auto-scrollable`
		// attribute from services.
		services_.removeAttribute (
			"auto-scrollable"
		);
		// Removing `auto-scrollable`
		// attribute from services
		// children.
		for (
			const service of
			services_.children
		) {
			// Removes `auto-scrollable`
			// attribute from the
			// current service.
			service.removeAttribute (
				"auto-scrollable"
			);
		}
	};

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
		// Waits for 250 miliseconds
		// before add paddings.
		window.setTimeout (() => (
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
	 * @description Adjusts auto scrolling
	 * 	process by applying an attribute
	 * 	to control his path according to
	 * 	the detected screen.
	 * @function adjustAutoScroll_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const adjustAutoScroll_ = () => (
		new ScreenManager ({
			onMedium: reajust_,
			onLarge: reajust_,
			mediumScreen: {
				max: 1130,
				min: 1026
			},
			smallScreen: {
				max: 1025,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 1131
			},
			onSmall: () => {
				// Destroys `auto-scrollable`
				// attribute from services
				// children and itself.
				removeAttribute_ ();
				// Adding `auto-scrollable`
				// attribute from services
				// children.
				for (
					const service of
					services_.children
				) {
					// Adds `auto-scrollable`
					// attribute from the
					// current service.
					service.setAttribute (
						"auto-scrollable",
						true
					);
				}
			}
		})
	);

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
				// Clears all data.
				clearData_ (this.direction);
			}
		});
		// Animating the first
		// and last services.
		for (
			const child of [
				services_.firstElementChild,
				services_.children[2]
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
	 * @function servicesAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const servicesAnimation_ = dir => {
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
	 * @description Builds services html
	 * 	structure as string format.
	 * @param {{
	 * 	button: Object<String, any>,
	 * 	about: Object<String, any>,
	 * 	title: Object<String, any>,
	 * 	className: String,
	 * 	icon: String
	 * }} data The service tag configs.
	 * 	It supports the following keys:
	 *
	 * 	- String icon: The service's
	 * 		front icon.
	 *
	 * 	- Object title: The service's
	 * 		main title.
	 *
	 * 	- Object about: The service's
	 * 		short description.
	 *
	 * 	- Object button: The button's
	 * 		text to display.
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
		button,
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
						width: "24px",
						idName: (
							"services-img"
						)
					}
				})}
				<span
					id = "services-data"
					services-index = "${
						title.id
					}::${title.pos}"
				>
					${clearStr ({
						input: title.value
					})}
				</span>
				<p
					id = "services-data"
					services-index = "${
						about.id
					}::${about.pos}"
				>
					${clearStr ({
						input: about.value
					})}
				</p>
			</div>
			${buildFlatButton ({
				textId: "services-data",
				iconId: "services-img",
				text: button.value,
				customAttr: (
					`services-index = ${
						button.id
					}::${button.pos}`
				)
			})}
		</div>
	`;

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
		// configurations.
		return anime ({
			translateX: ["200%", "0%"],
			opacity: [0.0, 1.0],
			autoplay: false,
			duration: 140,
			targets: [
				services_.children[0],
				services_.children[1],
				services_.children[2]
			],
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
		// The main tag element.
		const main = (
			window.store.getState ()
				.main
		);
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
				icon: Icons.VERIFIED,
				button: {
					value: lang.getText ("tr17"),
					id: "tr17",
					pos: 0
				},
				title: {
					value: lang.getText ("tr16"),
					id: "tr16",
					pos: 1
				},
				about: {
					value: lang.getText ("tr18"),
					id: "tr18",
					pos: 2
				}
			})}
			${buildService_ ({
				className: "services-second-as",
				icon: Icons.REPORT,
				button: {
					value: lang.getText ("tr21"),
					id: "tr21",
					pos: 3
				},
				title: {
					value: lang.getText ("tr19"),
					id: "tr19",
					pos: 4
				},
				about: {
					value: lang.getText ("tr20"),
					id: "tr20",
					pos: 5
				}
			})}
			${buildService_ ({
				className: "services-third-as",
				icon: Icons.CODE_SUGGESTION,
				button: {
					value: lang.getText ("tr24"),
					id: "tr24",
					pos: 6
				},
				title: {
					value: lang.getText ("tr22"),
					id: "tr22",
					pos: 7
				},
				about: {
					value: lang.getText ("tr23"),
					id: "tr23",
					pos: 8
				}
			})}
			<div
				class = "skeleton-loading"
			></div>
		`;
		// Adds the above section
		// to the selected tag as
		// a child.
		main.appendChild (services_);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#services-img"
				)
			),
			onReady: () => {
				// Listens screen format to
				// manage the path of auto
				// scroller.
				adjustAutoScroll_ ();
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				services_.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					services_.lastElementChild
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
									"services-index"
								),
								textualsId: (
									"services-data"
								)
							})
						);
					}
				);
				// Focus on the current
				// section for scrolling.
				new ScrollManager ({
					offsetBottom: 140,
					target: services_, 
					offsetTop: 140,
					scope: window,
					root: main,
					onEnter: () => {
						// Animates services
						// in normal mode.
						servicesAnimation_ ()
							.play ();
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (1);
					},
					onLeave: () => {
						// Animates services
						// in reverse mode.
						servicesAnimation_ ()
							.reverse ();
						// Waits for 200ms
						// before destroy
						// animation data.
						window.setTimeout (
							() => (
								clearData_ (
									"reverse"
								)
							), 200
						);
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
export {Services};
