/**
* @fileoverview NavBar UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-08-04
* @file navbar.js
* @type {NavBar}
* @version 0.0.5
*/

// Custom dependencies.
import {buildButton} from "../../../common/components/button/button.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
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
	 * @description The menu popup
	 * 	tag object reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	*/
	let menu_ = null;

	/**
	 * @description Closes menu.
	 * @function closeMenu_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const closeMenu_ = () => (
		menu_?.classList?.remove (
			"display-popup-menu"
		)
	);

	/**
	 * @description Displays menu.
	 * @constant {Function}
	 * @function showMenu_
	 * @private {Function}
	 * @returns {void} void
	 */
	const showMenu_ = () => (
		menu_?.classList?.add (
			"display-popup-menu"
		)
	);

	/**
	 * @description Listens some
	 * 	events to do some actions.
	 * @function listenEvents_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const listenEvents_ = () => {
		// The popup menu tag ref.
		menu_ = (
			document.querySelector (
				"menu.nav-menu-popup"
			)
		);
		// Listens `click` event on
		// close icon.
		menu_
			?.children[0]?.children[1]
			?.addEventListener (
				"click",
				() => closeMenu_ ()
			);
		// Listens `click` event on
		// emburger menu icon.
		document.querySelector (
			clearStr ({
				clearSpaces: true,
				input: `
					div.nav-right >
					img:last-child
				`
			})
		).addEventListener (
			"click",
			() => showMenu_ ()
		);
		// Listening all menu option
		// `click` event.
		for (
			const option of
			menu_?.children[1]?.children
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
					// Closes the menu.
					closeMenu_ ();
				}
			}
		);
	};

	/**
	 * @description Builds navbar html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Creates a nav tag.
		const nav = (
			document.createElement (
				"nav"
			)
		);
		// Adds a class's name
		// to the created nav.
		nav.classList.add (
			"navbar"
		);
		// Adds a html structure
		// to the created nav.
		nav.innerHTML = `
			<menu class = "nav-menu-popup">
				<section>
					${buildLogo (Logos.GITLAB)}
					${buildIcon (Icons.CLOSE)}
				</section>
				<section>
					<div>
						${lang.getText ("tr1")}
					</div>
					<div>
						${lang.getText ("tr2")}
					</div>
					<div>
						${lang.getText ("tr3")}
						${buildIcon (
							Icons.RIGHT_ARROW
						)}
					</div>
					<div>
						${lang.getText ("tr4")}
					</div>
					<div>
						${lang.getText ("tr5")}
						${buildIcon (
							Icons.RIGHT_ARROW
						)}
					</div>
					<div>
						${lang.getText ("tr6")}
						${buildIcon (
							Icons.RIGHT_ARROW
						)}
					</div>
					<div>
						${lang.getText ("tr7")}
						${buildIcon (
							Icons.RIGHT_ARROW
						)}
					</div>
					<div>
						${buildIcon (
							Icons.SIGN_IN
						)}
						${lang.getText ("tr8")}
					</div>
				</section>
				${buildButton ({
					text: lang.getText ("tr9")
				})}
			</menu>
			${buildButton ({
				iconType: Icons.LONG_RIGHT_ARROW,
				text: lang.getText ("tr9"),
				withIcon: true
			})}
			<section class = "nav-data">
				<div class = "nav-left">
					${buildIcon (Icons.SEARCH)}
					${buildLogo (Logos.GITLAB)}
					<label
						title = "${
							lang.getText ("tr1")
						}"
					>
						${lang.getText ("tr1")}
					</label>
					<label
						title = "${
							lang.getText ("tr2")
						}"
					>
						${lang.getText ("tr2")}
					</label>
					<label
						title = "${
							lang.getText ("tr3")
						}"
					>
						${lang.getText ("tr3")}
					</label>
					<label
						title = "${
							lang.getText ("tr4")
						}"
					>
						${lang.getText ("tr4")}
					</label>
					<label
						title = "${
							lang.getText ("tr5")
						}"
					>
						${lang.getText ("tr5")}
					</label>
					<label
						title = "${
							lang.getText ("tr6")
						}"
					>
						${lang.getText ("tr6")}
					</label>
					<label
						title = "${
							lang.getText ("tr7")
						}"
					>
						${lang.getText ("tr7")}
					</label>
				</div>
				<div class = "nav-wrapper">
					<div class = "nav-right">
						${buildIcon (Icons.SEARCH)}
						${buildButton ({
							text: lang.getText ("tr9")
						})}
						<button
							title = "${
								lang.getText ("tr8")
							}"
						>
							${lang.getText ("tr8")}
						</button>
						${buildIcon (Icons.SIGN_IN)}
						${buildIcon (Icons.SEARCH)}
						${buildIcon (
							Icons.EMBURGER_MENU
						)}
					</div>
				</div>
			</section>
		`;
		// Adds the below nav section
		// to the selected tag as a
		// child.
		document.querySelector (
			"header"
		).appendChild (nav);
		// Listens some tags events
		// to run certain actions.
		listenEvents_ ();
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {NavBar};
