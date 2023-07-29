/**
* @fileoverview Customers UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-21
* @updated 2023-06-24
* @file customers.js
* @type {Customers}
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds customers.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 	  customers logos support.
 * @returns {Customers} Customers
 */
function Customers (data) {
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
	 * @description The t-mobile customer logo.
	 * @constant {!String}
	 * @private {!String}
	 * @field
	 */
	const tMobile_ = `
		<img
			src = "../../../../../assets/logos/t-mobile.svg"
			alt = ''
		/>
	`;
	/**
	 * @description The goldman customer logo.
	 * @constant {!String}
	 * @private {!String}
	 * @field
	 */
	const goldman_ = `
		<img
			src = "../../../../../assets/logos/goldman.svg"
			alt = ''
		/>
	`;
	/**
	 * @description The martin customer logo.
	 * @constant {!String}
	 * @private {!String}
	 * @field
	 */
	const martinSachs_ = `
		<img
			src = "../../../../../assets/logos/martin.svg"
			alt = ''
		/>
	`;
	/**
	 * @description The nvidia customer logo.
	 * @constant {!String}
	 * @private {!String}
	 * @field
	 */
	const nvidia_ = `
		<img
			src = "../../../../../assets/logos/nvidia.svg"
			alt = ''
		/>
	`;
	/**
	 * @description The airbus customer logo.
	 * @constant {!String}
	 * @private {!String}
	 * @field
	 */
	const airbus_ = `
		<img
			src = "../../../../../assets/logos/airbus.svg"
			alt = ''
		/>
	`;
	/**
	 * @description The ubs customer logo.
	 * @constant {!String}
	 * @private {!String}
	 * @field
	 */
	const ubs_ = `
		<img
			src = "../../../../../assets/logos/ubs.svg"
			alt = ''
		/>
	`;

	/**
	 * @description Builds customers html
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
			section.classList.add ("customers");
			// Adds a html structure to the
			// created section.
			section.innerHTML = `
				<label>Trusted By</label>
				<div>
					<div class = "left-customers">
						<span>${tMobile_}</span>
						<span>${goldman_}</span>
						<span>${airbus_}</span>
					</div>
					<div class = "right-customers">
						<span>${martinSachs_}</span>
						<span>${nvidia_}</span>
						<span>${ubs_}</span>
					</div>
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
export {Customers};
