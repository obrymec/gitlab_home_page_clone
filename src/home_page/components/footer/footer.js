/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview GitLab footer section.
* @supported DESKTOP, MOBILE
* @created 2023-07-21
* @updated 2023-09-02
* @file footer.js
* @version 0.0.3
* @type {Footer}
*/

// Custom dependencies.
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildIcon,
	buildLogo,
	Icons,
	Logos
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds footer section.
 * @public
 * @class
 * @returns {Footer} Footer
 */
function Footer () {

	/**
	 * @description Builds a menu.
	 * @param {{
	 * 	options: Array<String>,
	 * 	stretch: boolean,
	 * 	title: String
	 * }} data The menu data. This 
	 * 	object supports the 
	 * 	following keys:
	 *
	 * 	- String title: The menu's title.
	 *
	 * 	- Array options: The menu options.
	 *
	 *  - boolean stretch: Whether we
	 *  	must subdivide these items
	 *		into two columns.
	 * @function buildMenu_
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildMenu_ = ({
		options,
		stretch,
		title
	}) => {
		// The menu's option(s).
		let items = '';
		// Generating option(s).
		for (
			let x = 0;
			x < options.length;
			x++
		) {
			// Generates the current
			// option.
			items += `
				<li>
					${clearStr ({
						input: options[x]
					})}
				</li>
			`;
		}
		// Returns the final results.
		return `
			<div class = "foot-menu">
				<h3>${title}</h3>
				<ul name = "${stretch}">
					${items}
				</ul>
			</div>
		`;
	};

	/**
	 * @description Listens dropdown to
	 * 	known which language is selected.
	 * @function listenDropdown_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const listenDropdown_ = () => {
		// The dropdown tag reference.
		const dropdown = (
			document.querySelector (
				"select#foot-av-lang"
			)
		);
		// The active language name.
		const name = (
			lang.getActiveLanguage ()
				.name
		);
		// Searching the current
		// language's name inside
		// the dropdown options.
		for (
			const option of
				dropdown.children
		) {
			// Whether ever the current
			// name matches with the
			// current option.
			if (
				option.value === name
			) {
				// Sets it active.
				dropdown.value = name;
				// Gets out of the
				// `for` loop.
				break;
			}
		}
		// Listens `change` event.
		dropdown.addEventListener (
			"change", () => {
				// Sets active language
				// inside the global
				// state.
				window.store.dispatch ({
					type: "SET_LANGUAGE",
					payload: dropdown.value
				});
			}
		);
	};

  /**
	 * @description Builds footer html
	 * 	structure as string format.
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
			"footer"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div class = "foot-top">
				<div class = "foot-gitlab">
					${buildLogo ({
						fileName: (
							Logos.GITLAB_LOGO_TEXT
						)
					})}
					<span>®</span>
				</div>
				<div class = "foot-refs">
					<div
						class = "foot-joined"
					>
						${buildMenu_ ({
							title: lang.getText ("tr2"),
							stretch: false,
							options: [
								lang.getText ("tr137")
							]
						})}
						${buildMenu_ ({
							title: lang.getText ("tr4"),
							stretch: false,
							options: [
								lang.getText ("tr138"),
								lang.getText ("tr139"),
								lang.getText ("tr140")
							]
						})}
					</div>
					${buildMenu_ ({
						title: lang.getText ("tr3"),
						stretch: true,
						options: [
							lang.getText ("tr141"),
							lang.getText ("tr142"),
							lang.getText ("tr143"),
							lang.getText ("tr144"),
							lang.getText ("tr145"),
							lang.getText ("tr146"),
							lang.getText ("tr147"),
							lang.getText ("tr148"),
							lang.getText ("tr149"),
							lang.getText ("tr150"),
							lang.getText ("tr151"),
							lang.getText ("tr152"),
							lang.getText ("tr153"),
							lang.getText ("tr154")
						]
					})}
					${buildMenu_ ({
						title: lang.getText ("tr5"),
						stretch: true,
						options: [
							lang.getText ("tr155"),
							lang.getText ("tr156"),
							lang.getText ("tr157"),
							lang.getText ("tr158"),
							lang.getText ("tr159"),
							lang.getText ("tr160"),
							lang.getText ("tr161"),
							lang.getText ("tr162"),
							lang.getText ("tr163"),
							lang.getText ("tr164"),
							lang.getText ("tr165"),
							lang.getText ("tr166")
						]
					})}
					<div
						class = "foot-joined"
					>
						${buildMenu_ ({
							title: lang.getText ("tr6"),
							stretch: false,
							options: [
								lang.getText ("tr167"),
								lang.getText ("tr168"),
								lang.getText ("tr169"),
								lang.getText ("tr170"),
								lang.getText ("tr171"),
								lang.getText ("tr172"),
								lang.getText ("tr173"),
								lang.getText ("tr174"),
								lang.getText ("tr175")
							]
						})}
						${buildMenu_ ({
							title: lang.getText ("tr6"),
							stretch: false,
							options: [
								lang.getText ("tr176"),
								lang.getText ("tr177"),
								lang.getText ("tr178"),
								lang.getText ("tr179"),
								lang.getText ("tr180"),
								lang.getText ("tr181"),
								lang.getText ("tr182")
							]
						})}
					</div>
				</div>
			</div>
			<div class = "foot-bottom">
				<div class = "foot-network">
					<div class = "foot-langs">
						${buildIcon ({
							fileName: Icons.PLANET
						})}
						<span>
							${lang.getText ("tr183")}: 
						</span>
						<select id = "foot-av-lang">
							<option
								value = "english"
							>
								English
							</option>
							<option
								value = "french"
							>
								Français
							</option>
							<option
								value = "deutsch"
							>
								Deutsch
							</option>
							<option
								value = "Japanese"
							>
								日本語
							</option>
						</select>
					</div>
					<div
						class = "foot-contacts"
					>
						${buildLogo ({
							fileName: Logos.TWITER 
						})}
						${buildLogo ({
							fileName: Logos.FACEBOOK 
						})}
						${buildLogo ({
							fileName: Logos.YOUTUBE 
						})}
						${buildLogo ({
							fileName: Logos.LINKDIN 
						})}
					</div>
				</div>
				<p>
					${lang.getText ("tr184")}
				</p>
				<p>
					${lang.getText ("tr185")} 
					<a>
						${lang.getText ("tr186")}
					</a> 
					— <a>
							${lang.getText ("tr187")}
						</a> 
					— <a>
							${lang.getText ("tr188")}.
						</a>
				</p>
				<p>© 2023 GitLab B.V.</p>
			</div>
		`;
		// Adds the below footer
		// to the selected tag
		// as a child.
		document.querySelector (
			"footer"
		).appendChild (section);
		// Listens language
		// changement.
		listenDropdown_ ();
	}
}

/**
 * @description Exports
 * 	all public features.
 * @exports *
 */
export {Footer};
