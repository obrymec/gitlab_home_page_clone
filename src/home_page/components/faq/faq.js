/**
* @fileoverview FAQ UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-20
* @updated 2023-07-20
* @version 0.0.1
* @file faq.js
* @type {FAQ}
*/

/**
 * @public @class @classdesc Builds faq section.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 		 faq section.
 * @returns {FAQ} FAQ
 */
function FAQ (data) {
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
	 * @description Builds badges html
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
			section.classList.add ("faq");
			// Adds a html structure
      // to the created section.
			section.innerHTML = `
        <div class = "faq-left">
					<h2>Take GitLab for a spin</h2>
					<p>
						See what your team could do 
						with The DevSecOps Platform.
					</p>
					<button>
						<span>Get free trial</span>
					</button>
				</div>
				<div class = "v-line"></div>
				<div class = "faq-right">
					<div class = "faq-experts">
						<img
							src = "${`
								../../../../../assets/
								images/experts.png
							`}"
							alt = ''
						/>
					</div>
					<p>
						Have a question? We're 
						here to help.
					</p>
					<button>
						<span>
							Talk to an expert
						</span>
						<img
							src = "${`
								../../../../../assets/
								icons/right-arrow.svg
							`}"
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
 * @description Exports all public
 *  features.
 * @exports *
 */
export {FAQ};
