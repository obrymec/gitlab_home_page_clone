/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview GitLab footer section.
* @supported DESKTOP, MOBILE
* @created 2023-07-21
* @updated 2023-08-26
* @file footer.js
* @version 0.0.3
* @type {Footer}
*/

// Custom dependencies.
import {clearJSStyle} from "../../../common/utilities/browser/browser.js";
import {buildButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildImage,
	buildIcon,
	Images,
	Icons
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
	 * @description Builds footer html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Creates a footer tag.
		const footer = (
			document.createElement (
				"footer"
			)
		);
		// Adds a class's name to
		// the created footer.
		footer.classList.add (
			"footer"
		);
		// Adds a html structure
		// to the created footer.
		footer.innerHTML = `
			<div class = "foot-top">
				<div class = "foot-gitlab">
					<img
						src = "${`
							../../../../../assets/
							logos/gitlab-logo-text.svg
						`}"
						alt = ''
					/>
					<span>®</span>
				</div>
				<div class = "foot-refs">
					<div
						class = "foot-joined"
					>
						${buildMenu_ ({
							title: "Platform",
							stretch: false,
							options: [
								"DevSecOps platform"
							]
						})}
						${buildMenu_ ({
							title: "Pricing",
							stretch: false,
							options: [
								"View plans",
								"Why premium?",
								"Why ultimate?"
							]
						})}
					</div>
					${buildMenu_ ({
						title: "Solutions",
						stretch: true,
						options: [
							"Digital transformation",
							"Security & Compliance",
							"Automated software delivery",
							"Agile development",
							"Cloud transformation",
							"SCM",
							"CI/CD",
							"Value stream management",
							"GitOps",
							"Enterprise",
							"Small business",
							"Public Sector",
							"Education",
							"Financial services"
						]
					})}
					${buildMenu_ ({
						title: "Resources",
						stretch: true,
						options: [
							"Install",
							"Quick setup checklists",
							"Learn",
							"Docs",
							"Blogs",
							"Customer success stories",
							"Remote",
							"TeamOps",
							"Community",
							"Forum",
							"Events",
							"Partners"
						]
					})}
					<div
						class = "foot-joined"
					>
						${buildMenu_ ({
							title: "Company",
							stretch: false,
							options: [
								"About",
								"Jobs",
								"Leadership",
								"Team",
								"Handbook",
								"Investor relations",
								"Trust Center",
								"Newsletter",
								"Press"
							]
						})}
						${buildMenu_ ({
							title: "Contact us",
							stretch: false,
							options: [
								"Contact an expert",
								"Get help",
								"Customer portal",
								"Status",
								"Terms of use",
								"Privacy statement",
								"Cookie preferences"
							]
						})}
					</div>
				</div>
			</div>
			<div class = "foot-bottom">
				<div class = "foot-network">
					<div class = "foot-langs">
						<img
							src = "${`
								../../../../../assets
								/icons/planet.svg
							`}"
							alt = ''
						/>
						<span>Language: </span>
						<select>
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
						<img
							src = "${`
								../../../../../assets
								/logos/twiter.svg
							`}"
							alt = ''
						/>
						<img
							src = "${`
								../../../../../assets
								/logos/facebook.svg
							`}"
							alt = ''
						/>
						<img
							src = "${`
								../../../../../assets
								/logos/youtube.svg
							`}"
							alt = ''
						/>
						<img
							src = "${`
								../../../../../assets
								/logos/linkdin.svg
							`}"
							alt = ''
						/>
					</div>
				</div>
				<p>
					Git is a trademark of Software 
					Freedom Conservancy and our 
					use of 'GitLab' is under 
					license
				</p>
				<p>
					View <a>page source</a> 
					— <a>Edit this page</a> 
					— <a>please contribute.</a>
				</p>
				<p>© 2023 GitLab B.V.</p>
			</div>
		`;
		// Adds the below footer
		// to the selected tag
		// as a child.
		document.querySelector (
			"main"
		).appendChild (footer);
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Footer};
