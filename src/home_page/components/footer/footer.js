/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview GitLab footer section.
* @supported DESKTOP, MOBILE
* @created 2023-07-21
* @updated 2023-09-14
* @file footer.js
* @version 0.0.3
* @type {Footer}
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	getUpdates,
	clearStr
} from "../../../common/utilities/string/string.js";
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
	 * @description The dropdown
	 * 	to select languages.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let dropdown_ = null;

	/**
	 * @description Builds a menu.
	 * @param {{
	 * 	options: Array<Object<String, any>>,
	 * 	title: Object<String, any>,
	 * 	stretch: boolean
	 * }} data The menu data. This 
	 * 	object supports the 
	 * 	following keys:
	 *
	 * 	- Object title: The menu's
	 * 		title.
	 *
	 * 	- Array options: The menu
	 * 		options.
	 *
	 *  - boolean stretch: Whether
	 * 		we must subdivide these
	 * 		items into two columns.
	 * @function buildMenu_
	 * @constant {Function}
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
				<li
					id = "foot-data"
					foot-index = "${
						options[x].id
					}::${options[x].pos}"
				>
					${clearStr ({
						input: (
							options[x].value
						)
					})}
				</li>
			`;
		}
		// Returns the final results.
		return `
			<div class = "foot-menu">
				<h3
					id = "foot-data"
					foot-index = "${
						title.id
					}::${title.pos}"
				>
					${title.value}
				</h3>
				<ul name = "${stretch}">
					${items}
				</ul>
			</div>
		`;
	};

	/**
	 * @description Listens dropdown
	 * 	to known which language is
	 * 	selected.
	 * @function listenDropdown_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const listenDropdown_ = () => {
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
			dropdown_.children
		) {
			// Whether ever the current
			// name matches with the
			// current option.
			if (
				option.value === name
			) {
				// Sets it active.
				dropdown_.value = name;
				// Gets out of the
				// `for` loop.
				break;
			}
		}
		// Listens `change` event.
		dropdown_.addEventListener (
			"change", () => {
				// Sets active language
				// inside the global
				// state.
				window.store.dispatch ({
					type: "SET_LANGUAGE",
					payload: (
						dropdown_.value
					)
				});
			}
		);
	};

  /**
	 * @description Builds footer
	 * 	html structure as string
	 * 	format.
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
		// Adds `auto-scrollable`
		// attribute for auto
		// background process.
		section.setAttribute (
			"auto-scrollable",
			true
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div class = "foot-top">
				<div class = "foot-gitlab">
					${buildLogo ({
						fileName: (
							Logos.GITLAB_LOGO_TEXT
						),
						data: {
							idName: "foot-img"
						}
					})}
					<span>®</span>
				</div>
				<div class = "foot-refs">
					<div
						class = "foot-joined"
					>
						${buildMenu_ ({
							stretch: false,
							title: {
								value: lang.getText ("tr2"),
								id: "tr2",
								pos: 6
							},
							options: [
								{
									value: lang.getText ("tr137"),
									id: "tr137",
									pos: 7
								}
							]
						})}
						${buildMenu_ ({
							stretch: false,
							title: {
								value: lang.getText ("tr4"),
								id: "tr4",
								pos: 8
							},
							options: [
								{
									value: lang.getText ("tr138"),
									id: "tr138",
									pos: 9
								},
								{
									value: lang.getText ("tr139"),
									id: "tr139",
									pos: 10
								},
								{
									value: lang.getText ("tr140"),
									id: "tr140",
									pos: 11
								}
							]
						})}
					</div>
					${buildMenu_ ({
						stretch: true,
						title: {
							value: lang.getText ("tr3"),
							id: "tr3",
							pos: 12
						},
						options: [
							{
								value: lang.getText ("tr141"),
								id: "tr141",
								pos: 13
							},
							{
								value: lang.getText ("tr142"),
								id: "tr142",
								pos: 14
							},
							{
								value: lang.getText ("tr143"),
								id: "tr143",
								pos: 15
							},
							{
								value: lang.getText ("tr144"),
								id: "tr144",
								pos: 16
							},
							{
								value: lang.getText ("tr145"),
								id: "tr145",
								pos: 17
							},
							{
								value: lang.getText ("tr146"),
								id: "tr146",
								pos: 18
							},
							{
								value: lang.getText ("tr147"),
								id: "tr147",
								pos: 19
							},
							{
								value: lang.getText ("tr148"),
								id: "tr148",
								pos: 20
							},
							{
								value: lang.getText ("tr149"),
								id: "tr149",
								pos: 21
							},
							{
								value: lang.getText ("tr150"),
								id: "tr150",
								pos: 22
							},
							{
								value: lang.getText ("tr151"),
								id: "tr151",
								pos: 23
							},
							{
								value: lang.getText ("tr152"),
								id: "tr152",
								pos: 24
							},
							{
								value: lang.getText ("tr153"),
								id: "tr153",
								pos: 25
							},
							{
								value: lang.getText ("tr154"),
								id: "tr154",
								pos: 26
							}
						]
					})}
					${buildMenu_ ({
						stretch: true,
						title: {
							value: lang.getText ("tr5"),
							id: "tr5",
							pos: 27
						},
						options: [
							{
								value: lang.getText ("tr155"),
								id: "tr155",
								pos: 28
							},
							{
								value: lang.getText ("tr156"),
								id: "tr156",
								pos: 29
							},
							{
								value: lang.getText ("tr157"),
								id: "tr157",
								pos: 30
							},
							{
								value: lang.getText ("tr158"),
								id: "tr158",
								pos: 31
							},
							{
								value: lang.getText ("tr159"),
								id: "tr159",
								pos: 32
							},
							{
								value: lang.getText ("tr160"),
								id: "tr160",
								pos: 33
							},
							{
								value: lang.getText ("tr161"),
								id: "tr161",
								pos: 34
							},
							{
								value: lang.getText ("tr162"),
								id: "tr162",
								pos: 35
							},
							{
								value: lang.getText ("tr163"),
								id: "tr163",
								pos: 36
							},
							{
								value: lang.getText ("tr164"),
								id: "tr164",
								pos: 37
							},
							{
								value: lang.getText ("tr165"),
								id: "tr165",
								pos: 38
							},
							{
								value: lang.getText ("tr166"),
								id: "tr166",
								pos: 39
							}
						]
					})}
					<div
						class = "foot-joined"
					>
						${buildMenu_ ({
							stretch: false,
							title: {
								value: lang.getText ("tr6"),
								id: "tr6",
								pos: 40
							},
							options: [
								{
									value: lang.getText ("tr167"),
									id: "tr167",
									pos: 41
								},
								{
									value: lang.getText ("tr168"),
									id: "tr168",
									pos: 42
								},
								{
									value: lang.getText ("tr169"),
									id: "tr169",
									pos: 43
								},
								{
									value: lang.getText ("tr170"),
									id: "tr170",
									pos: 44
								},
								{
									value: lang.getText ("tr171"),
									id: "tr171",
									pos: 45
								},
								{
									value: lang.getText ("tr172"),
									id: "tr172",
									pos: 46
								},
								{
									value: lang.getText ("tr173"),
									id: "tr173",
									pos: 47
								},
								{
									value: lang.getText ("tr174"),
									id: "tr174",
									pos: 48
								},
								{
									value: lang.getText ("tr175"),
									id: "tr175",
									pos: 49
								}
							]
						})}
						${buildMenu_ ({
							stretch: false,
							title: {
								value: lang.getText ("tr7"),
								id: "tr7",
								pos: 50
							},
							options: [
								{
									value: lang.getText ("tr176"),
									id: "tr176",
									pos: 51
								},
								{
									value: lang.getText ("tr177"),
									id: "tr177",
									pos: 52
								},
								{
									value: lang.getText ("tr178"),
									id: "tr178",
									pos: 53
								},
								{
									value: lang.getText ("tr179"),
									id: "tr179",
									pos: 54
								},
								{
									value: lang.getText ("tr180"),
									id: "tr180",
									pos: 55
								},
								{
									value: lang.getText ("tr181"),
									id: "tr181",
									pos: 56
								},
								{
									value: lang.getText ("tr182"),
									id: "tr182",
									pos: 57
								}
							]
						})}
					</div>
				</div>
			</div>
			<div
				auto-scrollable = "true"
				class = "foot-bottom"
			>
				<div class = "foot-network">
					<div class = "foot-langs">
						${buildIcon ({
							fileName: Icons.PLANET,
							data: {
								idName: "foot-img"
							}
						})}
						<span
							foot-index = "tr183::0"
							id = "foot-data"
						>
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
							fileName: Logos.TWITER,
							data: {
								idName: "foot-img"
							}
						})}
						${buildLogo ({
							fileName: Logos.FACEBOOK,
							data: {
								idName: "foot-img"
							}
						})}
						${buildLogo ({
							fileName: Logos.YOUTUBE,
							data: {
								idName: "foot-img"
							}
						})}
						${buildLogo ({
							fileName: Logos.LINKDIN,
							data: {
								idName: "foot-img"
							}
						})}
					</div>
				</div>
				<p
					foot-index = "tr184::1"
					id = "foot-data"
				>
					${lang.getText ("tr184")}
				</p>
				<p>
					<span
						foot-index = "tr185::2"
						id = "foot-data"
					>
						${lang.getText ("tr185")}
					</span>
					<a
						foot-index = "tr186::3"
						id = "foot-data"
					>
						${lang.getText ("tr186")}
					</a> 
					— <a
						foot-index = "tr187::4"
						id = "foot-data"
					>
						${lang.getText ("tr187")}
					</a> 
					— <a
						foot-index = "tr188::5"
						id = "foot-data"
					>
						${lang.getText ("tr188")}
					</a>
				</p>
				<p>© 2023 GitLab B.V.</p>
			</div>
			<div
				class = "${
					"skeleton-loading"
				}"
			></div>
		`;
		// Adds the above footer
		// to the selected tag
		// as a child.
		document.querySelector (
			"footer"
		).appendChild (section);
		// The dropdown tag ref.
		dropdown_ = (
			document.querySelector (
				"select#foot-av-lang"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#foot-img"
				)
			),
			onReady: () => {
				// Listens language
				// changement.
				listenDropdown_ ();
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				section.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					section.lastElementChild
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
									"foot-index"
								),
								textualsId: (
									"foot-data"
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
export {Footer};
