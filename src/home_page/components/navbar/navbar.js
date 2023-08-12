/**
* @fileoverview NavBar UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-08-11
* @file navbar.js
* @type {NavBar}
* @version 0.0.8
*/

// Custom dependencies.
import {buildButton} from "../../../common/components/button/button.js";
import lang from "../../../common/utilities/language/language.js";
import {
	clearJSStyle
} from "../../../common/utilities/browser/browser.js";
import {
	buildLogo,
	buildIcon,
	Icons,
	Logos
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds navbar section.
 * @public
 * @class
 * @returns {NavBar} NavBar
 */
function NavBar () {
	// Attributes.
	/**
	 * @description The nav right
	 * 	options container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let navRight_ = null;
	/**
	 * @description The nav left
	 * 	options container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let navLeft_ = null;
	/**
	 * @description The header
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let header_ = null;
	/**
	 * @description The menu popup
	 * 	tag object reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let menu_ = null;

	/**
	 * @description Animates the navbar
	 * 	gitlab icon.
	 * @param {!Object} timeline The last
	 * 	entry point of an animation.
	 * @function animateGitLabIcon_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const animateGitLabIcon_ = timeline => (
		timeline.add ({
			targets: navLeft_.children[1],
			rotate: ["-180deg", "0deg"],
			direction: "reverse"
		})
	);

	/**
	 * @description Closes menu.
	 * @function closeMenu_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const closeMenu_ = () => {
		// Hides menu.
		menu_.classList.remove (
			"display-popup-menu"
		);
		// Hides content.
		menuAnimation_ (
			"reverse"
		).play ();
	};

	/**
	 * @description Displays menu.
	 * @constant {Function}
	 * @function showMenu_
	 * @private {Function}
	 * @returns {void} void
	 */
	const showMenu_ = () => {
		// Shows menu.
		menu_.classList.add (
			"display-popup-menu"
		);
		// Shows content.
		menuAnimation_ (
			"normal"
		).play ();
	};

	/**
	 * @description Animates the navbar
	 * 	for medium screen.
	 * @function mediumAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const mediumAnimation_ = () => {
		// Animates the header.
		let timeline = animateHeader_ (-38);
		// Animates the gitlab icon.
		timeline = animateGitLabIcon_ (
			timeline
		);
		// Animates right options.
		timeline = animateOptions_ ({
			container: navRight_,
			tag: "medium",
			timeline
		});
		// Returns animation timeine
		// to control it after.
		return timeline;
	};

	/**
	 * @description Animates the navbar
	 * 	regardless to the detected size.
	 * @function animateNavBar_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const animateNavBar_ = () => {
		// Whether the screen is small.
		if (window.innerWidth <= 575) {
			// Runs animation for small
			// screens.
			smallAnimation_ ();
		// Whether the screen is medium.
		} else if (
			window.innerWidth <= 1050
		) {
			// Runs animation for medium
			// screens.
			mediumAnimation_ ();
		// Whether the screen is large.
		} else {
			// Runs animation for large
			// screens.
			largeAnimation_ ();
		}
	};

	/**
	 * @description Animates the navbar
	 * 	for large screen.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const largeAnimation_ = () => {
		// Animates the header.
		let timeline = animateHeader_ (-38);
		// Animates the gitlab icon.
		timeline = animateGitLabIcon_ (
			timeline
		);
		// Animates left options.
		timeline = animateOptions_ ({
			container: navLeft_,
			tag: "large",
			timeline
		});
		// Animates right options.
		timeline = animateOptions_ ({
			container: navRight_,
			tag: "large",
			timeline
		});
		// Returns animation timeine
		// to control it after.
		return timeline;
	};

	/**
	 * @description Animates the navbar
	 * 	for small screen.
	 * @function smallAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const smallAnimation_ = () => {
		// Animates the header.
		let timeline = animateHeader_ (0);
		// Animates the gitlab icon.
		timeline = animateGitLabIcon_ (
			timeline
		);
		// Animates the third search.
		timeline.add ({
			targets: navLeft_.children[0],
			translateY: ["10px", "0px"],
			opacity: [0.0, 1.0]
		}, 300);
		// Animates amburger menu.
		timeline.add ({
			translateX: ["-17px", "-17px"],
			translateY: ["-6px", "-16px"],
			opacity: [0.0, 1.0],
			targets: navRight_.children[(
				navRight_
					.children.length - 1
			)]
		}, 300);
		// Returns animation timeine
		// to control it after.
		return timeline;
	};

	/**
	 * @description Animates options
	 * 	from a container regardless
	 * 	a criteria.
	 * @param {{
	 * 	container: Element,
	 * 	timeline: Object,
	 * 	tag: String
	 * }} data The search data
	 * 	configs. It supports the
	 * 	keys following:
	 * 	- Element container: The
	 * 		parent of options.
	 * 	- String tag: The tag to
	 * 		target within parent.
	 * 	- Object timeline: The
	 * 		last entry point of
	 * 		an animation.
	 * @function animateOptions_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	*/
	const animateOptions_ = ({
		container,
		timeline,
		tag
	}) => {
		// Animating options.
		for (
			const option of
			container.children
		) {
			// Whether the current child
			// has `tag` inside those
			// keywords.
			if (
				option
					.getAttribute ("name")
					.includes (tag)
			) {
				// Adds the current configs
				// to the timeline.
				timeline.add ({
					translateY: ["10px", "0px"],
					opacity: [0.0, 1.0],
					targets: option
				});
			}
		}
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Listens some
	 * 	events to do some actions.
	 * @function listenTagsEvents_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const listenTagsEvents_ = () => {
		// The nav right tag ref.
	 	navRight_ = (
			document.querySelector (
				"div.nav-right"
			)
		);
		// The nav left tag ref.
		navLeft_ = (
			document.querySelector (
				"div.nav-left"
			)
		);
		// Listens `click` event on
		// close icon.
		menu_
			.children[0].children[1]
			.addEventListener (
				"click",
				() => closeMenu_ ()
			);
		// Listens `click` event on
		// emburger menu icon.
		navRight_.children[(
			navRight_
				.children.length - 1
		)].addEventListener (
			"click",
			() => showMenu_ ()
		);
		// Listening all menu option
		// `click` event.
		for (
			const option of
			menu_.children[1]
				.children
		) {
			// Listens `click` event
			// of the current option.
			option.addEventListener (
				"click",
				() => closeMenu_ ()
			);
		}
		// Listens window `resize`
		// event to manage menu
		// display.
		window.addEventListener (
			"resize", () => {
				// Whether width is
				// great than 1050.
				if (
					window.innerWidth > 1050
				) {
					// Closes menu.
					closeMenu_ ();
				}
			}
		);
	};

	/**
	 * @description Animates popup menu.
	 * @param {String} direction The
	 * 	animation's timeline direction.
	 * @function menuAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const menuAnimation_ = direction => {
		// The animation timeline.
		const timeline = anime.timeline ({
			direction: direction,
			easing: "linear",
			autoplay: false,
  		duration: 100,
			complete: function () {
				// Clears all javascript
				// animation data.
				clearJSStyle ({
					direction: this.direction,
					targets: [
						{
							start: "hd-menu-free-trial-as",
							end: "hd-menu-free-trial-af",
							ref: menu_.children[2]
						},
						{
							start: "hd-second-gitlab-as",
							end: "hd-second-gitlab-af",
							ref: (
								menu_.children[0]
									.children[0]
							)
						},
						{
							start: "hd-menu-options-as",
							end: "hd-menu-options-af",
							ref: menu_.children[1],
							children: true
						},
						{
							start: "hd-close-menu-as",
							end: "hd-close-menu-af",
							ref: (
								menu_.children[0]
									.children[1]
							)
						}
					]
				});
			}
		});
		// Animates the popup menu.
		timeline.add ({
			marginLeft: ["48%", "0%"],
			opacity: [0.0, 1.0],
			targets: (
				menu_.children[0].children[0]
			)
		}).add ({
			marginRight: ["46%", "0%"],
			opacity: [0.0, 1.0],
			targets: (
				menu_.children[0].children[1]
			)
		}, 0);
		// Animating menu's options.
		// Animating options.
		for (
			const option of
			menu_.children[1].children
		) {
			// Adds the current configs
			// to the timeline.
			timeline.add ({
				marginLeft: ["50%", "0%"],
				opacity: [0.0, 1.0],
				targets: option
			});
		}	
		// Animates free trial button.
		timeline.add ({
			targets: menu_.children[2],
			scaleX: [0.0, 1.0]
		});
		// Returns timeline to
		// control it after.
		return timeline;
	};

	/**
	 * @description Animates the navbar
	 * 	glabal header.
	 * @param {int} to The ending value.
	 * @function animateHeader_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const animateHeader_ = to => {
		// The animation timeline.
		const timeline = anime.timeline ({
			easing: "linear",
  		duration: 110,
			complete: () => (
				clearJSStyle ({
					direction: "normal",
					targets: [
						{
							start: "hd-second-search-as",
							ref: navRight_.children[4],
							end: "hd-second-search-af"
						},
						{
							start: "hd-emburger-menu-as",
							ref: navRight_.children[5],
							end: "hd-emburger-menu-af"
						},
						{
							ref: navRight_.children[0],
							start: "hd-first-search-as",
							end: "hd-first-search-af"
						},
						{
							ref: navRight_.children[1],
							start: "hd-free-trial-as",
							end: "hd-free-trial-af"
						},
						{
							ref: navRight_.children[2],
							start: "hd-sign-in-btn-as",
							end: "hd-sign-in-btn-af"
						},
						{
							ref: navRight_.children[3],
							start: "hd-sign-in-as",
							end: "hd-sign-in-af"
						},
						{
							start: "hd-first-gitlab-as",
							ref: navLeft_.children[1],
							end: "hd-first-gitlab-af"
						},
						{
							start: "hd-third-search-as",
							ref: navLeft_.children[0],
							end: "hd-third-search-af"
						},
						{
							start: "hd-left-options-as",
							ref: navLeft_.children[2],
							end: "hd-left-options-af"
						},
						{
							start: "hd-left-options-as",
							ref: navLeft_.children[3],
							end: "hd-left-options-af"
						},
						{
							start: "hd-left-options-as",
							ref: navLeft_.children[4],
							end: "hd-left-options-af"
						},
						{
							ref: navLeft_.children[5],
							start: "hd-left-options-as",
							end: "hd-left-options-af"
						},
						{
							start: "hd-left-options-as",
							ref: navLeft_.children[6],
							end: "hd-left-options-af"
						},
						{
							start: "hd-left-options-as",
							ref: navLeft_.children[7],
							end: "hd-left-options-af"
						},
						{
							start: "hd-left-options-as",
							ref: navLeft_.children[8],
							end: "hd-left-options-af"
						},
						{
							start: "header-as",
							end: "header-af",
							ref: header_
						}
					]
				})
			)
		});
		// Animates the global header.
		return timeline.add ({
			translateY: ["-100%", `${to}%`],
			targets: header_
		});
	};

	/**
	 * @description Builds navbar html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// The header tag reference.
		header_ = (
			document.querySelector (
				"header"
			)
		);
		// Creates menu tag.
		menu_ = (
			document.createElement (
				"menu"
			)
		);
		// Creates a nav tag.
		const nav = (
			document.createElement (
				"nav"
			)
		);
		// Adds a class's name
		// to header.
		header_.classList.add (
			"header-as"
		);
		// Adds a class's name
		// to the created menu.
		menu_.classList.add (
			"nav-menu-popup"
		);
		// Adds a class's name
		// to the created nav.
		nav.classList.add (
			"navbar"
		);
		// Adds a html structure
		// to the created menu.
		menu_.innerHTML = `
			<section>
				${buildLogo ({
					fileName: Logos.GITLAB,
					data: {
						className: (
							"hd-second-gitlab-as"
						)
					}
				})}
				${buildIcon ({
					fileName: Icons.CLOSE,
					data: {
						className: (
							"hd-close-menu-as"
						)
					}
				})}
			</section>
			<section>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr1")}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr2")}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr3")}
					${buildIcon ({
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr4")}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr5")}
					${buildIcon ({
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr6")}
					${buildIcon ({
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${lang.getText ("tr7")}
					${buildIcon ({
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
				>
					${buildIcon ({
						fileName: Icons.SIGN_IN
					})}
					${lang.getText ("tr8")}
				</div>
			</section>
			${buildButton ({
				text: lang.getText ("tr9"),
				className: (
					"hd-menu-free-trial-as"
				)
			})}
		`;
		// Adds a html structure
		// to the created nav.
		nav.innerHTML = `
			${buildButton ({
				text: lang.getText ("tr9"),
				withIcon: true,
				iconType: (
					Icons.LONG_RIGHT_ARROW
				)
			})}
			<section class = "nav-data">
				<div class = "nav-left">
					${buildIcon ({
						fileName: Icons.SEARCH,
						data: {
							name: "small",
							className: (
								"hd-third-search-as"
							)
						}
					})}
					${buildLogo ({
						fileName: Logos.GITLAB,
						data: {
							name: (
								"large-medium-small"
							),
							className: (
								"hd-first-gitlab-as"
							)
						}
					})}
					<label
						name = "large"
						title = "${
							lang.getText ("tr1")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr1")}
					</label>
					<label
						name = "large"
						title = "${
							lang.getText ("tr2")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr2")}
					</label>
					<label
						name = "large"
						title = "${
							lang.getText ("tr3")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr3")}
					</label>
					<label
						name = "large"
						title = "${
							lang.getText ("tr4")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr4")}
					</label>
					<label
						name = "large"
						title = "${
							lang.getText ("tr5")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr5")}
					</label>
					<label
						name = "large"
						title = "${
							lang.getText ("tr6")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr6")}
					</label>
					<label
						name = "large"
						title = "${
							lang.getText ("tr7")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr7")}
					</label>
				</div>
				<div class = "nav-wrapper">
					<div class = "nav-right">
						${buildIcon ({
							fileName: Icons.SEARCH,
							data: {
								name: "large",
								className: (
									"hd-first-search-as"
								)
							}
						})}
						${buildButton ({
							text: lang.getText ("tr9"),
							name: "large-medium",
							className: (
								"hd-free-trial-as"
							)
						})}
						<button
							name = "large"
							title = "${
								lang.getText ("tr8")
							}"
							class = "${
								"hd-sign-in-btn-as"
							}"
						>
							${lang.getText ("tr8")}
						</button>
						${buildIcon ({
							fileName: Icons.SIGN_IN,
							data: {
								name: "medium",
								className: (
									"hd-sign-in-as"
								)
							}
						})}
						${buildIcon ({
							fileName: Icons.SEARCH,
							data: {
								name: "medium",
								className: (
									"hd-second-search-as"
								)
							}
						})}
						${buildIcon ({
							fileName: (
								Icons.EMBURGER_MENU
							),
							data: {
								name: "medium-small",
								className: (
									"hd-emburger-menu-as"
								)
							}
						})}
					</div>
				</div>
			</section>
		`;
		// Adds the below nav section
		// to the header tag as a child.
		header_.appendChild (nav);
		// Adds the below menu section
		// to the aside tag as a child.
		document.querySelector (
			"aside"
		).appendChild (menu_);
		// Listens some tags events
		// to run certain actions.
		listenTagsEvents_ ();
		// Animates the navbar.
		animateNavBar_ ();
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {NavBar};
