/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview GitLab footer section.
* @supported DESKTOP, MOBILE
* @created 2023-07-21
* @updated 2023-07-21
* @version 0.0.1
* @file footer.js
* @type {Footer}
*/

/**
 * @public @class @classdesc Builds footer
 * 	section.
 * @param {Object<String, any>} data The
 *  javascript object that supports
 * 	the following key(s):
 *  - String parentId: The parent's
 * 		id of the footer section.
 * @returns {Footer} Footer
 */
function Footer (data) {
	/**
 	 * @description The parent id.
	 * @constant {?String}
 	 * @private {?String}
	 * @field
	 */
	const parentId_ = (
		typeof data?.parentId === "string"
		? data?.parentId?.replace (/ /g, '')
		: null
	);

	/**
	 * @description Builds a menu.
	 * @param {Object<String, String>} data
	 * 	The menu data. This object supports
	 * 	the following key(s):
	 * 	- String title: The menu's title.
	 * 	- Array<String> options: The
	 * 		menu options.
	 * @function buildMenu_
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildMenu_ = data => {
		// The menu's option(s).
		let options = '';
		// Generating option(s).
		for (
			let x = 0;
			x < data?.options
				?.length;
			x++
		) {
			// Generates the current
			// option.
			options += `
				<li>
					${
						data?.options[x]
						?.trim ()
					}
				</li>
			`;
		}
		// Returns the final results.
		return `
			<div class = "foot-menu">
				<h3>${data?.title}</h3>
				<ul>${options}</ul>
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
		// Whether parent id is not
		// null.
		if (parentId_ != null) {
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
								options: [
									"DevSecOps platform"
								]
							})}
							${buildMenu_ ({
								title: "Pricing",
								options: [
									"View plans",
									"Why premium?",
									"Why ultimate?"
								]
							})}
						</div>
						${buildMenu_ ({
							title: "Solutions",
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
						${buildMenu_ ({
							title: "Company",
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
							class = "foot-contact"
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
				parentId_
			).appendChild (footer);
    }
  }
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Footer};
