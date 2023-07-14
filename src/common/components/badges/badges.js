/**
* @fileoverview Badges UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-13
* @updated 2023-07-13
* @file badges.js
* @type {Badges}
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds badges section.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 		 badges.
 * @returns {Badges} Badges
 */
function Badges (data) {
	/**
 	 * @description The parent id.
	 * @constant {?String}
 	 * @private {?String}
	 * @field
	 */
	const parentId_ = (
		typeof data?.parentId === "string"
		? data.parentId.replace (/ /g, '')
		: null
	);
	/**
 	 * @description The learn more
	 * 	html code structure.
	 * @constant {String}
 	 * @private {String}
	 * @field
	 */
	const learnMoreButton_ = `
		<button class = "bds-learn-more">
			<span>Learn more</span>
			<img
				src = "${`
					../../../../../assets
					/icons/right-arrow.svg
				`}"
				alt = ''
			/>
		</button>
	`;

	/**
	 * @description Builds option button.
	 * @param {Object<String, String>} data
	 * 	Supports the following keys:
	 * 	- String text: The text content.
	 * 	- String icon: The icon's path.
	 * @function buildButton_
	 * @constant {Function}
	 * @private
	 * @returns {String} String
	 */
	const buildButton_ = data => `
		<button>
			<img
				src = "${
					data?.icon
						?.replaceAll (' ', '')
						?.replaceAll ('\n', '')
						?.replaceAll ('\t', '')
				}"
				alt = ''
			/>
			<span>${
				data?.text
					?.replaceAll ('\n', '')
					?.replaceAll ('\t', '')
					?.trim ()
				}
			</span>
		</button>
	`;

	/**
	 * @description Builds a list of
	 *  thank of total number.
	 * @param {int} count The total
	 * 	number of images.
	 * @function buildImages_
	 * @constant {Function}
	 * @private
	 * @returns {String} String
	 */
	const buildImages_ = count => {
		// The final result to be
		// returned.
		let images = '';
		// Generating images.
		for (let i = 1; i <= count; i++) {
			// The current image's path.
			const imgPath = `
				../../../../../assets/images
				/badge-${i}.svg
			`;
			// Builds the current
			// image according to
			// his path.
			images += `
				<img
					src = "${
						imgPath
							.replaceAll (' ', '')
							.replaceAll ('\n', '')
							.replaceAll ('\t', '')
					}"
					alt = ''
				/>
			`;
		}
		// Returns all generated
		// images.
		return images;
	};
  
  /**
	 * @description Builds banner html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Whether parent id is not
		// null.
		if (parentId_ != null) {
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
						GitLab is The DevSecOps
						Platform
					</h2>
					<div class = "bds-options">
						${buildButton_ ({
							text: `
								Leaders in DevSecOps
							`,
							icon: `
								../../../../../assets
								/icons/certificate.svg
							`
						})}
						${buildButton_ ({
							icon: `
							../../../../../assets
							/icons/doc.svg
							`,
							text: `
								Industry Analyst 
								Research
							`
						})}
					</div>
				</div>
				<div class = "bds-foot">
					<div class = "bds-left">
						<p>
							<strong>
								Our users have spoken.
							</strong>
							<br/>
							GitLab ranks as a G2 
							Leader across DevSecOps 
							categories
						</p>
						${learnMoreButton_}
					</div>
					<div class = "bds-right">
						${buildImages_ (8)}
					</div>
					${learnMoreButton_}
				</div>
      `;
      // Adds the below section
			// to the selected tag as
			// a child.
			document.querySelector (
				parentId_
			).appendChild (section);
    }
  }
}

/**
 * @description Exports all public
 *  features.
 * @exports *
 */
export {Badges};
