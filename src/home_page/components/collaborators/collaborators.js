/**
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Collaborators UI component.
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file collaborators.js
* @type {Collaborators}
* @created 2023-06-24
* @updated 2023-08-24
* @version 0.0.2
*/

// Custom dependencies.
import {buildFlatButton} from "../../../common/components/button/button.js";
import {clearStr} from "../../../common/utilities/string/string.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildImage,
	buildIcon,
	buildLogo,
	Images,
	Icons,
	Logos
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds collaborators section.
 * @public
 * @class
 * @returns {Collaborators} Collaborators
 */
function Collaborators () {
	/**
	 * @description Toggles customers body
	 * 	container opacity.
	 * @function toggleBodyOpacity_
	 * @private {Function}
	 * @returns {void} void
	 */
	const toggleBodyOpacity_ = () => {
		// The customers body container
		// reference.
		const customersBody = (
			document.querySelector (
				"div.body"
			)
		);
		// Hides body opacity.
		customersBody.classList.add (
			"cobs-opacity"
		);
		// After one second.
		window.setTimeout (() => {
			// Shows body opacity.
			customersBody.classList
				.remove (
					"cobs-opacity"
				)
		}, 300);
	};

	/**
	 * @description Toggles customer and node
	 * 	elements together by affect their
	 * 	display css property.
	 * @param {Element} customer The customer
	 * 	tag reference.
	 * @param {Element} node The node tag
	 * 	reference.
	 * @param {int} position The target tag
	 * 	element position inside the DOM.
	 * @param {boolean} move Whether we want
	 * 	to go to the next customer and node.
	 * @function toggleCustomerNode_
	 * @private {Function}
	 * @returns {{
	 * 	customer: Element,
	 * 	node: Element
	 * }} Object
	 */
	const toggleCustomerNode_ = (
		customer,
		node,
		position,
		move
	) => {
		// Whether both tag aren't `null`.
		if (
			node != null &&
			customer != null
		) {
			// Removes `cobs-display`
			// class's name from the
			// preview customer.
			customer.classList.remove (
				"cobs-display"
			);
			// Removes `cobs-selected-node`
			// class's name from the
			// preview node.
			node.classList.remove (
				"cobs-selected-node"
			);
		}
		// Updates customer.
		customer = (
			document.querySelector (
				`div.body > div.customer:nth-child(
					${position}
				)`
			)
		);
		// Updates the node.
		node = (
			document.querySelector (
				`div.controls > div:nth-child(
					${(position + 1)}
				)`
			)
		);
		// Whether we want to go to
		// the next customer and
		// node.
		if (move) {
			// Adds `cobs-display`
			// class's name to the
			// current customer.
			customer.classList.add (
				"cobs-display"
			);
			// Adds `cobs-selected-node`
			// class's name to the
			// current node.
			node.classList.add (
				"cobs-selected-node"
			);
		}
		// Returns tags references.
		return {
			customer: customer,
			node: node
		};
	};

	/**
	 * @description Swaps between customers.
	 * @private {Function}
	 * @function swap_
	 * @returns {void} void
	 */
	const swap_ = () => {
		// The top arrow reference.
		const topArrow = (
			document.querySelector (
				"div.controls > img:first-child"
			)
		);
		// The bottom arrow reference.
		const bottomArrow = (
			document.querySelector (
				"div.controls > img:last-child"
			)
		);
		// The current tags reference.
		let tags = toggleCustomerNode_ (
			null, null, 1, false
		);
		// The current customer index.
		let index = 1;
		// Listens all nodes interactions.
		[1, 2, 3, 4, 5].forEach (pos => {
			// Apply `click` event on
			// the current node.
			document.querySelector (
				`div.controls > div:nth-child(
					${(pos + 1)}
				)`
			).addEventListener (
				"click",
				() => {
					// Toggle customer body.
					toggleBodyOpacity_ ();
					// Sets the current index.
					index = pos;
					// After 300 miliseconds.
					window.setTimeout (() => {
						// Updates view.
						tags = toggleCustomerNode_ (
							tags.customer,
							tags.node,
							pos,
							true
						);
					}, 300);
				}
			);
		});
		// Listens top arrow click event.
		topArrow.addEventListener (
			"click",
			() => {
				// Toggle customer body.
				toggleBodyOpacity_ ();
				// After 300 miliseconds.
				window.setTimeout (() => {
					// Sets the current index.
					index--;
					// Whether index is less
					// than one.
					if (index < 1) index = 5;
					// Updates view.
					tags = toggleCustomerNode_ (
						tags.customer,
						tags.node,
						index,
						true
					);
				}, 300);
			}
		);
		// Listens bottom arrow click event.
		bottomArrow.addEventListener (
			"click",
			() => {
				// Toggle customer body.
				toggleBodyOpacity_ ();
				// After 300 miliseconds.
				window.setTimeout (() => {
					// Sets the current index.
					index++;
					// Whether index is great
					// than five.
					if (index > 5) index = 1;
					// Updates view.
					tags = toggleCustomerNode_ (
						tags.customer,
						tags.node,
						index,
						true
					);
				}, 300);
			}
		);
	};

	/**
	 * @description Builds a collaborator html
	 * 	structure with a few parameters.
	 * @param {Object<String, String>} data
	 * 	Contains the collaborator data.
	 * @function buildColaborator_
	 * @constant {String}
	 * @private
	 * @returns {String} String
	 */
	const buildColaborator_ = data => `
		<div
			class = "customer${(
				data.customClassName ?
				` ${data.customClassName}`
				: ''
			)}"
		>
			<div
				class = "identity${(
					data.radius ?
					" collaborators-border-radius"
					: ''
				)}"
			>
				<div class = "profile">
					${buildImage ({
						fileName: data.profilePath,
					})}
				</div>
				<div class = "infos">
					<blockquote
						class = "description"
					>
						"${
							clearStr ({
								input: data.description
							})
						}"
					</blockquote>
					${buildFlatButton ({
						text: data.buttonText,
						className: "read-more"
					})}
					<div class = "about">
						<div>
							${buildLogo ({
								fileName: data.logoPath,
								data: {
									height: data.height,
									width: data.width
								}
							})}
						</div>
						<div>
							<label>${data.name}</label>
							<p>
								${
									clearStr ({
										input: data.role
									})
								}
							</p>
						</div>
					</div>
				</div>
			</div>
			${(
				data.showStatistics ?
				`<div class = "statistics">
					<div>
						<label>${data.credit}</label>
						<p>
							${
								clearStr ({
									input: (
										data.creditComment
									)
								})
							}
						</p>
					</div>
					<div>
						<label>${data.percent}</label>
						<p>
							${
								clearStr ({
									input: (
										data.percentComment
									)
								})
							}
						</p>
					</div>
				</div>`
				: ''
			)}
		</div>
	`;

	/**
	 * @description Builds collaborators
	 * 	html structure as string format.
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
			"collaborators"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div class = "header-title">
				<label>
					${lang.getText ("tr25")}
				</label>
			</div>
			<div class = "body">
				${buildColaborator_ ({
					percentComment: lang.getText ("tr31"),
					creditComment: lang.getText ("tr28"),
					description: lang.getText ("tr32"),
					buttonText: lang.getText ("tr26"),
					customClassName: "cobs-display",
					logoPath: Logos.LOCKHEED_MARTIN,
					profilePath: Images.HOHN_ALAN,
					name: lang.getText ("tr27"),
					showStatistics: true,
					percent: "90%",
					height: "80px",
					width: "600px",
					credit: "80x",
					role: `
						${lang.getText ("tr29")},
						<br/>${lang.getText ("tr30")}
					`
				})}
				${buildColaborator_ ({
					percent: `20 ${lang.getText ("tr34")}`,
					percentComment: lang.getText ("tr38"),
					creditComment: lang.getText ("tr35"),
					profilePath: Images.JASON_MANOHARAN,
					description: lang.getText ("tr39"),
					buttonText: lang.getText ("tr26"),
					logoPath: Logos.IRON_MOUNTAIN,
					name: lang.getText ("tr33"),
					showStatistics: true,
					credit: "$150k",
					height: "70px",
					width: "300px",
					role: `
						${lang.getText ("tr36")},
						<br/>${lang.getText ("tr37")}
					`
				})}
				${buildColaborator_ ({
					percentComment: lang.getText ("tr41"),
					creditComment: lang.getText ("tr44"),
					description: lang.getText ("tr45"),
					buttonText: lang.getText ("tr26"),
					profilePath: Images.EVANO_CONNOR,
					name: lang.getText ("tr40"),
					logoPath: Logos.HAVEN_TECH,
					showStatistics: true,
					percent: "66%",
					height: "70px",
					credit: "62%",
					width: "70px",
					role: `
						${lang.getText ("tr42")},
						<br/>${lang.getText ("tr43")}
					`
				})}
				${buildColaborator_ ({
					percentComment: lang.getText ("tr48"),
					credit: `1 ${lang.getText ("tr46")}`,
					creditComment: lang.getText ("tr51"),
					description: lang.getText ("tr52"),
					buttonText: lang.getText ("tr26"),
					profilePath: Images.RICK_CAREY,
					name: lang.getText ("tr47"),
					showStatistics: true,
					logoPath: Logos.UBS,
					percent: "12,000",
					height: "80px",
					width: "225px",
					role: `
						${lang.getText ("tr49")},
						<br/>${lang.getText ("tr50")}
					`,
				})}
				${buildColaborator_ ({
					profilePath: Images.LAKSHMI_VENKATRAMA,
					description: lang.getText ("tr57"),
					buttonText: lang.getText ("tr53"),
					name: lang.getText ("tr54"),
					logoPath: Logos.SINGLERON,
					showStatistics: false,
					height: "75px",
					width: "215px",
					radius: true,
					role: `
						${lang.getText ("tr55")},
						<br/>${lang.getText ("tr56")}
					`
				})}
			</div>
			<div class = "controls">
				${buildIcon ({
					fileName: Icons.RIGHT_ARROW
				})}
				<div
					class = "cobs-selected-node"
				></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				${buildIcon ({
					fileName: Icons.RIGHT_ARROW
				})}
			</div>
		`;
		// Adds the below section
		// to the selected tag as
		// a child.
		document.querySelector (
			"main"
		).appendChild (section);
		// Listens arrows interactions.
		swap_ ();
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Collaborators};
