/**
* @fileoverview Banner UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-17
* @updated 2023-06-20
* @file banner.js
* @type {Banner}
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds a banner.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of the
 * 		 banner.
 * @returns {Banner} Banner
 */
function Banner (data) {
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
	 * @description Applies caroussel effect.
	 * @function caroussel
	 * @private {void}
	 * @returns {void} void
	 */
	this.caroussel_ = () => {
		// The first progress thumb.
		const progressThumb1 = document.querySelector (
			"div#progress-1"
		);
		// The second progress thumb.
		const progressThumb2 = document.querySelector (
			"div#progress-2"
		);
		// The third progress thumb.
		const progressThumb3 = document.querySelector (
			"div#progress-3"
		);
		// The first screenshot.
		const screenshot1 = document.querySelector (
			"img#screenshot-1"
		);
		// The second screenshot.
		const screenshot2 = document.querySelector (
			"img#screenshot-2"
		);
		// The third screenshot.
		const screenshot3 = document.querySelector (
			"img#screenshot-3"
		);
		// Adds the progress animation
		// to the first progress.
		progressThumb1.classList.add (
			"progress-thumb"
		);
		// Fadein the first screeshot.
		screenshot1.classList.add (
			"fade-in"
		);
		// After for 4.1s.
		window.setTimeout (() => {
			// Removes the progress animation
			// from the previous thumb.
			progressThumb1.classList.remove (
				"progress-thumb"
			);
			// Adds the progress animation
			// to the second progress.
			progressThumb2.classList.add (
				"progress-thumb"
			);
			// Fadeout the previous screeshot.
			screenshot1.classList.remove (
				"fade-in"
			);
			// Fadein the second screeshot.
			screenshot2.classList.add (
				"fade-in"
			);
			// After for 4.1s.
			window.setTimeout (() => {
				// Removes the progress animation
				// from the previous thumb.
				progressThumb2.classList.remove (
					"progress-thumb"
				);
				// Adds the progress animation
				// to the third progress.
				progressThumb3.classList.add (
					"progress-thumb"
				);
				// Fadeout the previous screeshot.
				screenshot2.classList.remove (
					"fade-in"
				);
				// Fadein the third screeshot.
				screenshot3.classList.add (
					"fade-in"
				);
				// After for 4.1s.
				window.setTimeout (() => {
					// Removes the progress animation
					// from the previous thumb.
					progressThumb3.classList.remove (
						"progress-thumb"
					);
					// Fadeout the previous screeshot.
					screenshot3.classList.remove (
						"fade-in"
					);
					// Calls inside itself.
					this.caroussel_ ();
				}, 4100);
			}, 4100);
		}, 4100);
	}

	/**
	 * @description Builds banner html
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
			section.classList.add ("banner");
			// Adds a html structure to the
			// created section.
			section.innerHTML = `
				<div class = "left-part">
					<label>Join us for the launch of
					GitLab 16 on 22 June 2023 →</label>
					<h1>Software. Faster.</h1>
					<label>
						GitLab is the most comprehensive<br/>
						AI-powered DevSecOps Platform.
					</label>
					<div>
						<button>Get free trial</button>
						<button>
							What is GitLab?
							<img
								src = "../../../../../assets/icons/rounded-play.svg"
								alt = ''
							/>
						</button>
					</div>
					<div>
						<span><div id = "progress-1"></div></span>
						<span><div id = "progress-2"></div></span>
						<span><div id = "progress-3"></div></span>
					</div>
				</div>
				<div class = "right-part">
					<img
						src = "../../../../../assets/images/screenshot-1.svg"
						id = "screenshot-1"
						alit = ''
					/>
					<img
						src = "../../../../../assets/images/screenshot-2.svg"
						id = "screenshot-2"
						alit = ''
					/>
					<img
						src = "../../../../../assets/images/screenshot-3.svg"
						id = "screenshot-3"
						alit = ''
					/>
				</div>
			`;
			// Adds the below section
			// to the selected tag as
			// a child.
			document.querySelector (
				parentId_
			).appendChild (section);
			// Launches caroussel effect.
			this.caroussel_ ();
		}
	}
}

/**
 * @description Exports all public features.
 * @exports *
 */
export {Banner};
