/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview NavBar UI component.
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-09-06
* @file navbar.js
* @type {NavBar}
* @version 0.0.9
*/

// Custom dependencies.
import {buildButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import {scrollTo} from "../../../common/utilities/scroll/scroll.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	getUpdates
} from "../../../common/utilities/string/string.js";
import {
	listenLoadEvent,
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
	 * @function gitLabIconAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const gitLabIconAnimation_ = (
		timeline
	) => (
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
		let timeline = (
			headerAnimation_ (-38)
		);
		// Animates the gitlab icon.
		timeline = (
			gitLabIconAnimation_ (
				timeline
			)
		);
		// Animates right options.
		timeline = (
			optionsAnimation_ ({
				container: navRight_,
				tag: "medium",
				timeline
			})
		);
		// Returns animation
		// timeline to handle
		// it after.
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
	const animateNavBar_ = () => (
		new ScreenManager ({
			onMedium: mediumAnimation_,
			onSmall: smallAnimation_,
			onLarge: largeAnimation_,
			disableDetection: true,
			mediumScreen: {
				max: 1050,
				min: 576
			},
			smallScreen: {
				max: 575,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 1051
			}
		})
	);

	/**
	 * @description Selects a navbar top
	 * 	left option.
	 * @param {int} index The position's
	 * 	index of an option.
	 * @function select
	 * @public
	 * @returns {void} void
	 */
	this.select = index => {
		// Adjusts the passed index value.
		index += 2;
		// Removing `nav-active-option`
		// class from all options.
		for (let i = 2; i <= 8; i++) {
			// Removes `nav-active-option`
			// from the current option.
			navLeft_.children[i]
				.classList.remove (
					"nav-active-option"
				);
		}
		// Adds `nav-active-option`
		// class to the selected
		// option.
		navLeft_.children[index]
			.classList.add (
				"nav-active-option"
			);
	}

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
		let timeline = (
			headerAnimation_ (-38)
		);
		// Animates the gitlab
		// icon.
		timeline = (
			gitLabIconAnimation_ (
				timeline
			)
		);
		// Animates left options.
		timeline = (
			optionsAnimation_ ({
				container: navLeft_,
				tag: "large",
				timeline
			})
		);
		// Animates right options.
		timeline = (
			optionsAnimation_ ({
				container: navRight_,
				tag: "large",
				timeline
			})
		);
		// Returns animation
		// timeline to handle
		// it after.
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
		let timeline = (
			headerAnimation_ (0)
		);
		// Animates the gitlab
		// icon.
		timeline = (
			gitLabIconAnimation_ (
				timeline
			)
		);
		// Animates the third search.
		timeline.add ({
			targets: navLeft_.children[0],
			translateY: ["10px", "0px"],
			opacity: [0.0, 1.0]
		}, 300);
		// Animates emburger menu.
		timeline.add ({
			translateX: ["-17px", "-17px"],
			translateY: ["-6px", "-16px"],
			opacity: [0.0, 1.0],
			targets: navRight_.children[(
				navRight_
					.children.length - 1
			)]
		}, 300);
		// Returns animation timeline
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
	 * 	following keys:
	 *
	 * 	- Element container: The
	 * 		parent of options.
	 *
	 * 	- String tag: The tag to
	 * 		target within parent.
	 *
	 * 	- Object timeline: The
	 * 		last entry point of
	 * 		an animation.
	 * @function optionsAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	*/
	const optionsAnimation_ = ({
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
		// Listens `click` event on
		// menu close icon.
		menu_
			.children[0].children[1]
			.addEventListener (
				"click", closeMenu_
			);
		// Listens `click` event on
		// emburger menu icon.
		navRight_.children[
			(navRight_.children.length - 1)
		].addEventListener (
			"click", showMenu_
		);
		// Listens `click` event on
		// menu gitlab icon.
		menu_
			.children[0].children[0]
			.addEventListener (
				"click", () => {
					// Closes menu.
					closeMenu_ ();
					// Scrolls to banner
					// section.
					scrollTo (
						"section.banner"
					);
				}
			);
		// Listens all top left options
		// `click` event.
		for (let j = 1; j <= 8; j++) {
			// Listens `click` event
			// of the current option.
			navLeft_.children[j]
				.addEventListener (
					"click", () => {
						// Whether we click on
						// gitlab logo.
						if (j === 1) {
							// Scrolls to banner
							// section.
							scrollTo (
								"section.banner"
							);
						// Whether the current
						// index is bigger than
						// one (01).
						} else {
							// Selects the target
							// option.
							this.select (j - 2);
							// Whether the current
							// option has `scroll-to`
							// attribute.
							if (
								navLeft_.children[j]
									.hasAttribute (
										"scroll-to"
									)
							) {
								// Scrolls to the target
								// given section on the
								// web page.
								scrollTo (
									navLeft_.children[j]
										.getAttribute (
											"scroll-to"
										)
								);
							}
						}
					}
				);
		}
		// Listening all menu option
		// `click` event.
		for (
			const option of
			menu_.children[1].children
		) {
			// Listens `click` event
			// of the current option.
			option.addEventListener (
				"click", () => {
					// Adds `nav-menu-selection`
					// class to the selected
					// option.
					option.classList.add (
						"nav-menu-selection"
					);
					// Waiting for animation
					// completed.
					window.setTimeout (() => {
						// Closes menu.
						closeMenu_ ();
						// Removes the added class
						// to the selected option.
						option.classList.remove (
							"nav-menu-selection"
						);
						// Whether the current
						// option has `scroll-to`
						// attribute.
						if (
							option.hasAttribute (
								"scroll-to"
							)
						) {
							// Scrolls to the target
							// given section on the
							// web page.
							scrollTo (
								option.getAttribute (
									"scroll-to"
								)
							);
						}
					}, 310);
				}
			);
		}
		// Listens window `resize`
		// event to manage menu
		// display.
		window.addEventListener (
			"resize", () => {
				// Whether width is
				// bigger than 1050.
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
	 * 	global header.
	 * @param {int} to The ending value.
	 * @function headerAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const headerAnimation_ = to => {
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
						idName: "navbar-img",
						className: (
							"hd-second-gitlab-as"
						)
					}
				})}
				${buildIcon ({
					fileName: Icons.CLOSE,
					data: {
						idName: "navbar-img",
						className: (
							"hd-close-menu-as"
						)
					}
				})}
			</section>
			<section>
				<div
					hd-index = "tr1::0"
					id = "hd-data"
					class = "${
						"hd-menu-options-as"
					}"
					scroll-to = "${
						"section.banner"
					}"
				>
					${lang.getText ("tr1")}
				</div>
				<div
					hd-index = "tr2::1"
					id = "hd-data"
					class = "${
						"hd-menu-options-as"
					}"
					scroll-to = "${
						"section.services"
					}"
				>
					${lang.getText ("tr2")}
				</div>
				<div
					scroll-to = "${
						"section.methodologies"
					}"
					class = "${
						"hd-menu-options-as"
					}"
				>
					<span
						hd-index = "tr3::2"
						id = "hd-data"
					>
						${lang.getText ("tr3")}
					</span>
					${buildIcon ({
						data: {
							idName: "navbar-img"
						},
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					hd-index = "tr4::3"
					id = "hd-data"
					class = "${
						"hd-menu-options-as"
					}"
					scroll-to = "${
						"section.pricing"
					}"
				>
					${lang.getText ("tr4")}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
					scroll-to = "${
						"section.resources"
					}"
				>
					<span
						hd-index = "tr5::4"
						id = "hd-data"
					>
						${lang.getText ("tr5")}
					</span>
					${buildIcon ({
						data: {
							idName: "navbar-img"
						},
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					scroll-to = "${
						"section.collaborators"
					}"
					class = "${
						"hd-menu-options-as"
					}"
				>
					<span
						hd-index = "tr6::5"
						id = "hd-data"
					>
						${lang.getText ("tr6")}
					</span>
					${buildIcon ({
						data: {
							idName: "navbar-img"
						},
						fileName: (
							Icons.RIGHT_ARROW
						)
					})}
				</div>
				<div
					class = "${
						"hd-menu-options-as"
					}"
					scroll-to = "${
						"section.faq"
					}"
				>
					<span
						hd-index = "tr7::6"
						id = "hd-data"
					>
						${lang.getText ("tr7")}
					</span>
					${buildIcon ({
						data: {
							idName: "navbar-img"
						},
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
						fileName: Icons.SIGN_IN,
						data: {
							idName: "navbar-img"
						}
					})}
					<span
						hd-index = "tr8::7"
						id = "hd-data"
					>
						${lang.getText ("tr8")}
					</span>
				</div>
			</section>
			${buildButton ({
				customAttr: "hd-index = tr9::8",
				text: lang.getText ("tr9"),
				textId: "hd-data",
				className: (
					"hd-menu-free-trial-as"
				)
			})}
		`;
		// Adds a html structure
		// to the created nav.
		nav.innerHTML = `
			${buildButton ({
				customAttr: "hd-index = tr9::9",
				text: lang.getText ("tr9"),
				textId: "hd-data",
				withIcon: true,
				icon: {
					fileName:  (
						Icons.LONG_RIGHT_ARROW
					),
					data: {
						idName: "navbar-img"
					}
				}
			})}
			<section class = "nav-data">
				<div class = "nav-left">
					${buildIcon ({
						fileName: Icons.SEARCH,
						data: {
							idName: "navbar-img",
							name: "small",
							className: (
								"hd-third-search-as"
							)
						}
					})}
					${buildLogo ({
						fileName: Logos.GITLAB,
						data: {
							idName: "navbar-img",
							name: (
								"large-medium-small"
							),
							className: (
								"hd-first-gitlab-as"
							)
						}
					})}
					<span
						hd-index = "tr1::10"
						id = "hd-data"
						name = "large"
						title = "${
							lang.getText ("tr1")
						}"
						class = "${
							"hd-left-options-as"
						}"
						scroll-to = "${
							"section.banner"
						}"
					>
						${lang.getText ("tr1")}
					</span>
					<span
						hd-index = "tr2::11"
						id = "hd-data"
						name = "large"
						title = "${
							lang.getText ("tr2")
						}"
						class = "${
							"hd-left-options-as"
						}"
						scroll-to = "${
							"section.services"
						}"
					>
						${lang.getText ("tr2")}
					</span>
					<span
						hd-index = "tr3::12"
						id = "hd-data"
						name = "large"
						scroll-to = "${
							"section.methodologies"
						}"
						title = "${
							lang.getText ("tr3")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr3")}
					</span>
					<span
						hd-index = "tr4::13"
						id = "hd-data"
						name = "large"
						title = "${
							lang.getText ("tr4")
						}"
						class = "${
							"hd-left-options-as"
						}"
						scroll-to = "${
							"section.pricing"
						}"
					>
						${lang.getText ("tr4")}
					</span>
					<span
						hd-index = "tr5::14"
						id = "hd-data"
						name = "large"
						title = "${
							lang.getText ("tr5")
						}"
						class = "${
							"hd-left-options-as"
						}"
						scroll-to = "${
							"section.resources"
						}"
					>
						${lang.getText ("tr5")}
					</span>
					<span
						hd-index = "tr6::15"
						id = "hd-data"
						name = "large"
						scroll-to = "${
							"section.collaborators"
						}"
						title = "${
							lang.getText ("tr6")
						}"
						class = "${
							"hd-left-options-as"
						}"
					>
						${lang.getText ("tr6")}
					</span>
					<span
						hd-index = "tr7::16"
						id = "hd-data"
						name = "large"
						title = "${
							lang.getText ("tr7")
						}"
						class = "${
							"hd-left-options-as"
						}"
						scroll-to = "${
							"section.faq"
						}"
					>
						${lang.getText ("tr7")}
					</span>
				</div>
				<div class = "nav-wrapper">
					<div class = "nav-right">
						${buildIcon ({
							fileName: Icons.SEARCH,
							data: {
								idName: "navbar-img",
								name: "large",
								className: (
									"hd-first-search-as"
								)
							}
						})}
						${buildButton ({
							text: lang.getText ("tr9"),
							name: "large-medium",
							textId: "hd-data",
							customAttr: (
								"hd-index = tr9::17"
							),
							className: (
								"hd-free-trial-as"
							)
						})}
						<button
							hd-index = "tr8::18"
							id = "hd-data"
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
								idName: "navbar-img",
								name: "medium",
								className: (
									"hd-sign-in-as"
								)
							}
						})}
						${buildIcon ({
							fileName: Icons.SEARCH,
							data: {
								idName: "navbar-img",
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
								idName: "navbar-img",
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
		// to the header tag as a
		// child.
		header_.appendChild (nav);
		// Adds the below menu section
		// to the aside tag as a child.
		document.querySelector (
			"aside"
		).appendChild (menu_);
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
		// Waits until all images
		// are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#navbar-img"
				)
			),
			onReady: () => {
				// Listens some tags events
				// to run certain actions.
				listenTagsEvents_ ();
				// Animates the navbar.
				animateNavBar_ ();
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
									"hd-index"
								),
								textualsId: (
									"hd-data"
								)
							})
						);
					}
				);
			}
		});
	}
}

/**
 * @description Exports
 * 	all public features.
 * @exports *
 */
export {NavBar};
