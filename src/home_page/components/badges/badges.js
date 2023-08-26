/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview Badges UI component.
* @supported DESKTOP, MOBILE
* @created 2023-07-13
* @updated 2023-08-25
* @file badges.js
* @type {Badges}
* @version 0.0.2
*/

// Custom dependencies.
import {buildButton} from "../../../common/components/button/button.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildImage,
	buildIcon,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds badges section.
 * @public
 * @class
 * @returns {Badges} Badges
 */
function Badges () {
	/**
	 * @description Builds option button.
	 * @param {{
	 * 	text: String,
	 * 	icon: String
	 * }} data Supports the following
	 * 	keys:
	 *
	 * 	- String text: The text content.
	 *
	 * 	- String icon: The icon's path.
	 * @function buildButton_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildButton_ = ({
		text,
		icon
	}) => `
		<button>
			${buildIcon ({
				fileName: icon
			})}
			<span>
				${clearStr ({
					input: text
				})}
			</span>
		</button>
	`;

	/**
	 * @description Builds a list of
	 *  images thank of total number.
	 * @param {int} count The total
	 * 	number of images.
	 * @function buildImages_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildImages_ = count => {
		// The final result to be
		// returned.
		let images = '';
		// Generating images.
		for (
			let i = 1;
			i <= count;
			i++
		) {
			// The current image's
			// path.
			const imgPath = `
				badge-${i}.svg
			`;
			// Builds the current
			// image according to
			// his path.
			images += buildImage ({
				fileName: imgPath
			});
		}
		// Returns all generated
		// images.
		return images;
	};
  
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
			"badges"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div class = "bds-head">
				<h2>
					${lang.getText ("tr69")}
				</h2>
				<div class = "bds-options">
					${buildButton_ ({
						text: lang.getText ("tr70"),
						icon: Icons.CERTIFICATE
					})}
					${buildButton_ ({
						text: lang.getText ("tr71"),
						icon: Icons.DOC,
					})}
				</div>
			</div>
			<div class = "bds-foot">
				<div class = "bds-left">
					<p>
						<strong>
							${lang.getText ("tr72")}
						</strong>
						<br/>
						${lang.getText ("tr73")}
					</p>
					${buildButton ({
						iconType: Icons.RIGHT_ARROW,
						text: lang.getText ("tr24"),
						withIcon: true
					})}
				</div>
				<div class = "bds-right">
					${buildImages_ (8)}
				</div>
				${buildButton ({
					iconType: Icons.RIGHT_ARROW,
					text: lang.getText ("tr24"),
					withIcon: true
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
export {Badges};
