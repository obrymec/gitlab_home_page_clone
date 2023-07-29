/**
* @fileoverview Services UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-23
* @updated 2023-06-24
* @file services.js
* @type {Services}
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds entity services.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 		the provided services.
 * @returns {Services} Services
 */
function Services (data) {
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
	 * @description Builds services html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Whether parent id is not null.
		if (parentId_ != null) {
			// Creates a section tag.
			const section = document.createElement (
				"section"
			);
			// Adds a class's name to the
			// created section.
			section.classList.add ("services");
			// Adds a html structure to the
			// created section.
			section.innerHTML = `
				<div class = "service">
					<div>
						<img
							src = "../../../../../assets/icons/verified.svg"
							height = "24px"
							width = "24px"
							alt = ''
						/>
						<label>Get Started with GitLab</label>
						<p>
							New to GitLab and not sure where to start? 
							We’ll walk you through the basics so you 
							know what to expect along the way.
						</p>
					</div>
					<button>
						<span>Explore resources</span>
						<img
							src = "../../../../../assets/icons/right-arrow.svg"
							alt = ''
						/>
					</button>
				</div>
				<div class = "service">
					<div>
						<img
							src = "../../../../../assets/icons/report.svg"
							height = "24px"
							width = "24px"
							alt = ''
						/>
						<label>
							The Forrester Wave™: Integrated Software
							Delivery Platforms, Q2 2023
						</label>
						<p>
							GitLab is the only leader in the report that
							compares 13 vendors over 26 criteria.
						</p>
					</div>
					<button>
						<span>Read the report</span>
						<img
							src = "../../../../../assets/icons/right-arrow.svg"
							alt = ''
						/>
					</button>
				</div>
				<div class = "service">
					<div>
						<img
							src = "../../../../../assets/icons/code-suggestion.svg"
							height = "24px"
							width = "24px"
							alt = ''
						/>
						<label>GitLab's AI-assisted Code Suggestions</label>
						<p>
							Reduce cognitive load and boost efficiency
							with the help of generative AI that
							suggests code as you type.
						</p>
					</div>
					<button>
						<span>Learn more</span>
						<img
							src = "../../../../../assets/icons/right-arrow.svg"
							alt = ''
						/>
					</button>
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
 * @description Exports all public features.
 * @exports *
 */
export {Services};
