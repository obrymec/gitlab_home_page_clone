/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview FAQ UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-20
* @updated 2023-08-26
* @version 0.0.2
* @file faq.js
* @type {FAQ}
*/

// Custom dependencies.
import lang from "../../../common/utilities/language/language.js";
import {
	buildImage,
	Images
} from "../../../common/components/icon_logo_image/icon_logo_image.js";
import {
	buildFlatButton,
	buildButton
} from "../../../common/components/button/button.js";

/**
 * @classdesc Builds faq section.
 * @public
 * @class
 * @returns {FAQ} FAQ
 */
function FAQ () {
  /**
	 * @description Builds badges html
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
			"faq"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div class = "faq-left">
				<h2>
					${lang.getText ("tr133")}
				</h2>
				<p>
					${lang.getText ("tr134")}
				</p>
				${buildButton ({
					text: lang.getText ("tr9")
				})}
			</div>
			<div class = "v-line"></div>
			<div class = "faq-right">
				<div class = "faq-experts">
					${buildImage ({
						fileName: Images.EXPERTS
					})}
				</div>
				<p>
					${lang.getText ("tr135")}
				</p>
				${buildFlatButton ({
					text: lang.getText ("tr136")
				})}
			</div>
		`;
		// Adds the below section
		// to the selected tag as
		// a child.
		document.querySelector (
			"main"
		).appendChild (section);
  }
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {FAQ};
