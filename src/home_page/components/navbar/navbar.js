/**
* @fileoverview NavBar UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-07-14
* @file navbar.js
* @type {NavBar}
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds a navbar.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of the
 * 		 nav bar.
 * @returns {NavBar} NavBar
 */
function NavBar (data) {
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
 	 * @description The gitlab icon.
	 * @constant {!String}
 	 * @private {!String}
	 * @field
	 */
	const gitLabIcon_ = `
		<img
			src = "../../../../../assets/logos/gitlab.svg"
			alt = ''
		/>
	`;
	/**
 	 * @description The right arrow icon.
	 * @constant {!String}
 	 * @private {!String}
	 * @field
	 */
	const rightArrowIcon_ = `
		<svg
			viewBox = "0 0 16 16"
			height = "16px"
			width = "16px"
			fill = "#000"
		>
			<path
				fill-rule = "evenodd"
				clip-rule = "evenodd"
				d = "M5.22 2.22a.75.75 0 0 1 
				1.06 0l5.252 5.252a.75.75 0 
				0 1 0 1.06L6.28 13.784a.75.75 
				0 1 1-1.06-1.06l4.72-4.723L5.22 
				3.28a.75.75 0 0 1 0-1.06Z"
			></path>
		</svg>
	`;
	/**
 	 * @description The sign in icon.
	 * @constant {!String}
 	 * @private {!String}
	 * @field
	 */
	const signInIcon_ = `
		<svg
			viewBox = "0 0 16 16"
			class = "sign-in"
			height = "16px"
			width = "16px"
		>
			<path
				fill-rule = "evenodd"
				clip-rule = "evenodd"
				d = "M10.5 5a2.5 2.5 0 11-5 0 2.5 
				2.5 0 015 0zm.514 2.63a4 4 0 10-6.028 
				0A4.002 4.002 0 002 11.5V13a2 2 0 002 
				2h8a2 2 0 002-2v-1.5a4.002 4.002 0 
				00-2.986-3.87zM8 9H6a2.5 2.5 0 00-2.5 
				2.5V13a.5.5 0 00.5.5h8a.5.5 0 
				00.5-.5v-1.5A2.5 2.5 0 0010 9H8z"
			></path>
		</svg>
	`;
	/**
 	 * @description The search icon.
	 * @constant {!String}
 	 * @private {!String}
	 * @field
	 */
	const searchIcon_ = `
		<svg
			viewBox = "0 0 16 16"
			height = "16px"
			width = "16px"
			fill = "none"
		>
			<path
				fill = "currentColor"
				fill-rule = "evenodd"
				clip-rule = "evenodd"
				d = "M10.4765 11.8907C9.49572 12.5892 
				8.29583 13 7 13C3.68629 13 1 10.3137 
				1 7C1 3.68629 3.68629 1 7 1C10.3137 1 
				13 3.68629 13 7C13 8.29583 12.5892 
				9.49572 11.8907 10.4765L14.7071 
				13.2929C15.0976 13.6834 15.0976 
				14.3166 14.7071 14.7071C14.3166 
				15.0976 13.6834 15.0976 13.2929 
				14.7071L10.4765 11.8907ZM11 7C11 
				9.20914 9.20914 11 7 11C4.79086 
				11 3 9.20914 3 7C3 4.79086 4.79086 
				3 7 3C9.20914 3 11 4.79086 11 7Z"
			></path>
		</svg>
	`;

	/**
	 * @description Builds navbar html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Whether parent id is not null.
		if (parentId_ != null) {
			// Creates a nav tag.
			const nav = document.createElement (
				"nav"
			);
			// Adds a class's name to the
			// created nav.
			nav.classList.add ("navbar");
			// Adds a html structure to the
			// created nav.
			nav.innerHTML = `
				<menu class = "nav-menu-popup">
					<header>
						${gitLabIcon_}
						<svg
							viewBox = "0 0 16 16"
							fill = "#171321"
							height = "16px"
							width = "16px"
						>
							<path
								fill-rule = "evenodd"
								clip-rule = "evenodd"
								d = "M4.28 3.22a.75.75 0 0 
								0-1.06 1.06L6.94 8l-3.72 
								3.72a.75.75 0 1 0 1.06 
								1.06L8 9.06l3.72 3.72a.75.75 
								0 1 0 1.06-1.06L9.06 
								8l3.72-3.72a.75.75 0 0 
								0-1.06-1.06L8 6.94 4.28 
								3.22Z"
							></path>
						</svg>
					</header>
					<section>
						<div>
							<label>Why GitLab</label>
						</div>
						<div>
							<label>Platform</label>
						</div>
						<div>
							<label>Solutions</label>
							${rightArrowIcon_}
						</div>
						<div>
							<label>Pricing</label>
						</div>
						<div>
							<label>Resources</label>
							${rightArrowIcon_}
						</div>
						<div>
							<label>Company</label>
							${rightArrowIcon_}
						</div>
						<div>
							<label>Contact us</label>
							${rightArrowIcon_}
						</div>
						<div>
							${signInIcon_}
							<label>Sign in</label>
						</div>
					</section>
					<button>
						<span>Get free trial</span>
					</button>
				</menu>
				<button class = "free-trial-btn-no-radius">
					<span>Get free trial</span>
					<svg
						viewBox = "0 0 16 16"
						height = "16px"
						width = "16px"
					>
						<path
							fill-rule = "evenodd"
							clip-rule = "evenodd"
							d = "M10.159 10.72a.75.75 0 
							1 0 1.06 1.06l3.25-3.25L15 
							8l-.53-.53-3.25-3.25a.75.75 
							0 0 0-1.061 1.06l1.97 
							1.97H1.75a.75.75 0 1 0 0 
							1.5h10.379l-1.97 1.97Z"
						></path>
					</svg>
				</button>
				<section class = "nav-data">
					<div class = "left-data">
						<span>${searchIcon_}</span>
						${gitLabIcon_}
						<label title = "Why GitLab">
							Why GitLab
						</label>
						<label title = "Platform">
							Platform
						</label>
						<label title = "Solutions">
							Solutions
						</label>
						<label title = "Pricing">
							Pricing
						</label>
						<label title = "Resources">
							Resources
						</label>
						<label title = "Company">
							Company
						</label>
						<label title = "Contact us">
							Contact us
						</label>
					</div>
					<div class = "right-data">
						${searchIcon_}
						<button class = "free-trial-btn">
							<span>Get free trial</span>
						</button>
						<button
							class = "sign-in-btn"
							title = "Sign in"
						>
							Sign in
						</button>
						${signInIcon_}
						${searchIcon_}
						<svg
							class = "emburger-menu"
							viewBox = "0 0 16 16"
							height = "16px"
							width = "16px"
						>
							<path
								fill-rule = "evenodd"
								clip-rule = "evenodd"
								d = "M0 3.75A.75.75 0 0 1 .75 
								3h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 
								0 0 1 0 3.75ZM0 8a.75.75 0 0 
								1 .75-.75h14.5a.75.75 0 0 1 0 
								1.5H.75A.75.75 0 0 1 0 8Zm.75 
								3.5a.75.75 0 0 0 0 1.5h14.5a.75.75 
								0 0 0 0-1.5H.75Z"
							></path>
						</svg>
					</div>
				</section>
			`;
			// Adds the below nav section
			// to the selected tag as a
			// child.
			document.querySelector (
				parentId_
			).appendChild (nav);
		}
	}
}

/**
 * @description Exports all public features.
 * @exports *
 */
export {NavBar};
