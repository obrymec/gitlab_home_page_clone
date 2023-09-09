/**
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Collaborators UI component.
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file collaborators.js
* @type {Collaborators}
* @created 2023-06-24
* @updated 2023-09-09
* @version 0.0.2
*/

// Custom dependencies.
import {listenLoadEvent} from "../../../common/utilities/browser/browser.js";
import {buildFlatButton} from "../../../common/components/button/button.js";
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	animateText,
	getUpdates,
	clearStr,
} from "../../../common/utilities/string/string.js";
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
	// Attributes.
	/**
	 * @description The description
	 * 	process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let descriptionId_ = null;
	/**
	 * @description The percent
	 * 	comment process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let percentId_ = null;
	/**
	 * @description The company
	 * 	process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let companyId_ = null;
	/**
	 * @description The controls 
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let controls_ = null;
	/**
	 * @description The credit
	 * 	comment process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let creditId_ = null;
	/**
	 * @description The role
	 * 	process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let roleId_ = null;
	/**
	 * @description The name
	 * 	process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let nameId_ = null;
	/**
	 * @description The body
	 * 	tag reference.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let body_ = null;
	/**
	 * @description The current
	 * 	collaborator position's
	 * 	index.
	 * @private {int}
	 * @type {int}
	 * @field
	 */
	let index_ = 0;

	/**
	 * @description Toggles collaborators
	 * 	body container visibility.
	 * @param {boolean} visible Whether
	 * 	we wanna to show or hide
	 * 	collaborators section.
	 * @function toggleBodyOpacity_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const setBodyOpacity_ = (
		visible
	) => {
		// Whether visibility
		// is set to `true`.
		if (visible) {
			// Shows body.
			body_.classList.remove (
				"cobs-opacity"
			);
		// Otherwise.
		} else {
			// Hides body.
			body_.classList.add (
				"cobs-opacity"
			);
		}
	};

	/**
	 * @description Toggles collaborator
	 * 	and node elements together
	 * 	by affect their display
	 * 	css property.
	 * @param {Element} collaborator The
	 * 	collaborator tag reference.
	 * @param {Element} node The node
	 * 	tag reference.
	 * @param {int} position The target
	 * 	tag element position inside the
	 * 	DOM.
	 * @param {boolean} move Whether
	 * 	we want to go to the next
	 * 	collaborator and node.
	 * @function toggleCollaboratorNode_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {{
	 * 	collaborator: Element,
	 * 	node: Element
	 * }} Object
	 */
	const toggleCollaboratorNode_ = (
		collaborator,
		node,
		position,
		move
	) => {
		// Whether both tags aren't
		// `null`.
		if (
			node != null &&
			collaborator != null
		) {
			// Removes `cobs-selected-node`
			// class's name from the
			// previous node.
			node.classList.remove (
				"cobs-selected-node"
			);
			// Removes `cobs-display`
			// class's name from the
			// previous collaborator.
			collaborator.classList
				.remove (
					"cobs-display"
				);
		}
		// Updates collaborator.
		collaborator = (
			body_.children[position]
		);
		// Updates node.
		node = (
			controls_.children[
				(position + 1)
			]
		);
		// Whether we want to go to
		// the next collaborator and
		// node.
		if (move) {
			// Adds `cobs-selected-node`
			// class's name to the
			// current node.
			node.classList.add (
				"cobs-selected-node"
			);
			// Adds `cobs-display`
			// class's name to the
			// current collaborator.
			collaborator.classList
				.add (
					"cobs-display"
				);
			// Animates the previous
			// collaborator.
			animate_ (
				collaborator,
				getDataList_ ()[
					Array.prototype.indexOf
						.call (
							collaborator
								.parentNode
								.children,
							collaborator
						)
				]
			);
		}
		// Returns tags references.
		return {
			collaborator,
			node
		};
	};

	/**
	 * @description Swaps between
	 * 	collaborators.
	 * @constant {Function}
	 * @private {Function}
	 * @function swap_
	 * @returns {void} void
	 */
	const swap_ = () => {
		// The current tags refs.
		let tags = (
			toggleCollaboratorNode_ (
				null, null, index_, false
			)
		);
		// Listens top arrow `click`
		// event.
		controls_.firstElementChild
			.addEventListener (
				"click", () => {
					// Hides collaborators body.
					setBodyOpacity_ (false);
					// After 300 milliseconds.
					window.setTimeout (() => {
						// Shows collaborators body.
						setBodyOpacity_ (true);
						// Sets the current index.
						index_--;
						// Whether index is less
						// than one.
						if (index_ < 0) index_ = 4;
						// Updates view.
						tags = (
							toggleCollaboratorNode_ (
								tags.collaborator,
								tags.node,
								index_,
								true
							)
						);
					}, 300);
				}
		);
		// Listens bottom arrow `click`
		// event.
		controls_.lastElementChild
			.addEventListener (
				"click", () => {
					// Hides collaborators body.
					setBodyOpacity_ (false);
					// After 300 milliseconds.
					window.setTimeout (() => {
						// Shows collaborators body.
						setBodyOpacity_ (true);
						// Sets the current index.
						index_++;
						// Whether index is bigger
						// than five.
						if (index_ > 4) index_ = 0;
						// Updates view.
						tags = toggleCollaboratorNode_ (
							tags.collaborator,
							tags.node,
							index_,
							true
						);
					}, 300);
				}
		);
		// Listens all interactions
		// over controls's nodes.
		[0, 1, 2, 3, 4].forEach (
			pos => {
				// Listens `click` event
				// on the current node.
				controls_.children[(pos + 1)]
					.addEventListener (
						"click", () => {
							// Whether the current
							// node's index is not
							// equal to the global
							// collaborator index.
							if (pos !== index_) {
								// Hides collaborators
								// body.
								setBodyOpacity_ (false);
								// Sets the current
								// index.
								index_ = pos;
								// After 300 milliseconds.
								window.setTimeout (
									() => {
										// Shows collaborators
										// body.
										setBodyOpacity_ (true);
										// Updates view.
										tags = (
											toggleCollaboratorNode_ (
												tags.collaborator,
												tags.node,
												pos, true
											)
										);
									}, 300
								);
							}
						}
					);
			}
		);
	};

	/**
	 * @description Builds a collaborator
	 * 	html structure with a few
	 * 	parameters.
	 * @param {{
	 * 	percentComment: Object<String, any>,
	 * 	creditComment: Object<String, any>,
	 * 	description: Object<String, any>,
	 * 	button: Object<String, any>,
	 * 	role: Object<String, any>,
	 * 	customClassName: String,
	 * 	showStatistics: boolean,
	 * 	profilePath: String,
	 * 	logoPath: String,
	 * 	radius: boolean,
	 * 	height: String,
	 * 	width: String
	 * }} data The collaborator data. This
	 * 	map supports the following keys:
	 *
	 * 	- String customClassName: The
	 * 		specific associated class.
	 *
	 * 	- boolean radius: Whether we want
	 * 		to put a radius to borders.
	 *
	 * 	- String profilePath: The collaborator
	 * 		identity.
	 *
	 * 	- Object description: The collaborator
	 * 		citation vision.
	 *
	 * 	- Object button: The button's text
	 * 		data.
	 *
	 * 	- String logoPath: The collaborator
	 * 		enterprise logo's path.
	 *
	 * 	- String height: The logo's height.
	 *
	 *	- String width: The logo's width.
	 *
	 * 	- Object role: The job role accuped
	 * 		by the collaborator.
	 *
	 * 	- boolean showStatistics: Whether
	 * 		we wish to display a collaborator
	 * 		states.
	 *
	 * 	- Object creditComment: The comment
	 * 		given by collaborator about his
	 * 		credit.
	 *
	 * 	- Object percentComment: The comment
	 * 		provided by collaborator about his
	 * 		work rendering.
	 * @function buildCollaborator_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {String} String
	 */
	const buildCollaborator_ = ({
		customClassName,
		showStatistics,
		percentComment,
		creditComment,
		description,
		profilePath,
		logoPath,
		button,
		radius,
		height,
		width,
		role,
	}) => `
		<div
			class = "collaborator${(
				customClassName
				? ` ${customClassName}`
				: ''
			)}"
		>
			<div
				class = "cobs-identity${(
					radius ?
					" cobs-border-radius"
					: ''
				)}"
			>
				<div class = "cobs-profile">
					${buildImage ({
						fileName: profilePath,
						data: {
							idName: (
								"cobs-img"
							)
						}
					})}
				</div>
				<div class = "cobs-infos">
					<blockquote
						class = "cobs-description"
					>
						"<q
							id = "cobs-data"
							cobs-index = "${
								description.id
							}::${description.pos}"
						></q>"
					</blockquote>
					${buildFlatButton ({
						textId: "cobs-data",
						text: button.value,
						className: (
							"cobs-read-more"
						),
						iconId: (
							"cobs-img"
						),
						customAttr: (
							`cobs-index = ${
								button.id
							}::${button.pos}`
						)
					})}
					<div class = "cobs-about">
						<div>
							${buildLogo ({
								fileName: logoPath,
								data: {
									height: height,
									width: width,
									idName: (
										"cobs-img"
									)
								}
							})}
						</div>
						<div>
							<span></span>
							<p>
								<span
									id = "cobs-data"
									cobs-index = "${
										role.id
									}::${role.pos}"
								></span>,
								<br/>
								<span></span>
							</p>
						</div>
					</div>
				</div>
			</div>
			${(
				showStatistics ?
				`<div
					class = "cobs-statistics"
				>
					<div>
						<span></span>
						<p
							id = "cobs-data"
							cobs-index = "${
								creditComment.id
							}::${creditComment.pos}"
						></p>
					</div>
					<div>
						<span></span>
						<p
							id = "cobs-data"
							cobs-index = "${
								percentComment.id
							}::${percentComment.pos}"
						></p>
					</div>
				</div>`
				: ''
			)}
		</div>
	`;

	/**
	 * @description Returns collaborators
	 * 	data list.
	 * @function getDataList_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Array<Object<String, any>>}
	 */
	const getDataList_ = () => [
		{
			customClassName: "cobs-display",
			logoPath: Logos.LOCKHEED_MARTIN,
			company: lang.getText ("tr30"),
			profilePath: Images.HOHN_ALAN,
			name: lang.getText ("tr27"),
			percent: "<span>90</span>%",
			credit: "<span>80</span>x",
			showStatistics: true,
			height: "80px",
			width: "600px",
			percentComment: {
				value: lang.getText ("tr31"),
				id: "tr31",
				pos: 1
			},
			creditComment: {
				value: lang.getText ("tr28"),
				id: "tr28",
				pos: 2
			},
			description: {
				value: lang.getText ("tr32"),
				id: "tr32",
				pos: 3
			},
			button: {
				value: lang.getText ("tr26"),
				id: "tr26",
				pos: 4
			},
			role: {
				value: lang.getText ("tr29"),
				id: "tr29",
				pos: 5
			}
		},
		{
			company: lang.getText ("tr37"),
			logoPath: Logos.IRON_MOUNTAIN,
			credit: "$<span>150</span>k",
			name: lang.getText ("tr33"),
			showStatistics: true,
			height: "70px",
			width: "300px",
			profilePath: (
				Images.JASON_MANOHARAN
			),
			percentComment: {
				value: lang.getText ("tr38"),
				id: "tr38",
				pos: 6
			},
			creditComment: {
				value: lang.getText ("tr35"),
				id: "tr35",
				pos: 7
			},
			description: {
				value: lang.getText ("tr39"),
				id: "tr39",
				pos: 8
			},
			button: {
				value: lang.getText ("tr26"),
				id: "tr26",
				pos: 9
			},
			role: {
				value: lang.getText ("tr36"),
				id: "tr36",
				pos: 10
			},
			percent: clearStr ({
				input: `
					<span>20</span> 
					${lang.getText ("tr34")}
				`
			})
		},
		{
			company: lang.getText ("tr43"),
			name: lang.getText ("tr40"),
			percent: "<span>66</span>%",
			logoPath: Logos.HAVEN_TECH,
			credit: "<span>62</span>%",
			showStatistics: true,
			height: "70px",
			width: "70px",
			profilePath: (
				Images.EVANO_CONNOR
			),
			percentComment: {
				value: lang.getText ("tr41"),
				id: "tr41",
				pos: 11
			},
			creditComment: {
				value: lang.getText ("tr44"),
				id: "tr44",
				pos: 12
			},
			description: {
				value: lang.getText ("tr45"),
				id: "tr45",
				pos: 13
			},
			button: {
				value: lang.getText ("tr26"),
				id: "tr26",
				pos: 14
			},
			role: {
				value: lang.getText ("tr42"),
				id: "tr42",
				pos: 15
			}
		},
		{
			profilePath: Images.RICK_CAREY,
			company: lang.getText ("tr50"),
			percent: "<span>12</span>,000",
			name: lang.getText ("tr47"),
			showStatistics: true,
			logoPath: Logos.UBS,
			height: "80px",
			width: "225px",
			percentComment: {
				value: lang.getText ("tr48"),
				id: "tr48",
				pos: 16
			},
			creditComment: {
				value: lang.getText ("tr51"),
				id: "tr51",
				pos: 17
			},
			description: {
				value: lang.getText ("tr52"),
				id: "tr52",
				pos: 18
			},
			button: {
				value: lang.getText ("tr26"),
				id: "tr26",
				pos: 19
			},
			role: {
				value: lang.getText ("tr49"),
				id: "tr42",
				pos: 20
			},
			credit: clearStr ({
				input: `
					<span>1</span> 
					${lang.getText ("tr46")}
				`
			})
		},
		{
			company: lang.getText ("tr56"),
			name: lang.getText ("tr54"),
			logoPath: Logos.SINGLERON,
			showStatistics: false,
			height: "75px",
			width: "215px",
			radius: true,
			profilePath: (
				Images.LAKSHMI_VENKATRAMA
			),
			description: {
				value: lang.getText ("tr57"),
				id: "tr57",
				pos: 21
			},
			button: {
				value: lang.getText ("tr53"),
				id: "tr53",
				pos: 22
			},
			role: {
				value: lang.getText ("tr55"),
				id: "tr55",
				pos: 23
			}
		}
	];

	/**
	 * @description Animates a specific
	 * 	collaborator.
	 * @param {Element} item The target
	 * 	collaborator tag reference.
	 * @param {Object<String, any>} data
	 * 	The target collaborator raw's
	 * 	data.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = (
		item, {
			showStatistics,
			percentComment,
			creditComment,
			description,
			company,
			percent,
			credit,
			role,
			name
		}
	) => {
		// Whether statistics
		// are allowed.
		if (showStatistics) {
			// The regexp to extract
			// a specific numerical
			// value.
			const regex = (
				/<span>[0-9]+<\/span>/g
			);
			// Destroys percent
			// comment process
			// id.
			window.clearInterval (
				percentId_
			);
			// Destroys credit
			// comment process
			// id.
			window.clearInterval (
				creditId_
			);
			// The percent initial
			// value.
			let percentWorth = {
				value: 0
			};
			// The credit initial
			// value.
			let creditWorth = {
				value: 0
			};
			// The percent counter.
			const percentCounter = (
				item.children[1]
				.children[1]
				.children[0]
			);
			// The credit counter.
			const creditCounter = (
				item.children[1]
					.children[0]
					.children[0]
			);
			// The percent comment.
			const percentText = (
				item.children[1]
					.children[1]
					.children[1]
			);
			// The credit comment.
			const creditText = (
				item.children[1]
				.children[0]
				.children[1]
			);
			// Resets percent
			// counter.
			percentCounter
				.textContent = '0';
			// Resets credit
			// counter.
			creditCounter
				.textContent = '0';
			// Clears percent
			// comment.
			percentText
				.textContent = '';
			// Clears credit
			// comment.
			creditText
				.textContent = '';
			// Animates percent
			// comment.
			percentId_ = (
				animateText ({
					interval: 25,
					target: (
						percentText
					),
					text: (
						percentComment
							.value
					)
				})
			);
			// Animates credit
			// comment.
			creditId_ = (
				animateText ({
					interval: 25,
					target: (
						creditText
					),
					text: (
						creditComment
							.value
					)
				})
			);
			// Animates percent
			// value.
			anime ({
				targets: percentWorth,
				easing: "linear",
				round: 1,
				value: parseInt (
					percent.split (
						"<span>"
					)[1].split (
						"</span>"
					)[0]
				),
				update: () => (
					percentCounter
						.textContent = (
							percent
								.replace (
									regex,
									percentWorth
										.value
								)
						)
				)
			});
			// Animates credit
			// value.
			anime ({
				targets: creditWorth,
				easing: "linear",
				round: 1,
				value: parseInt (
					credit.split (
						"<span>"
					)[1].split (
						"</span>"
					)[0]
				),
				update: () => (
					creditCounter
						.textContent = (
							credit
								.replace (
									regex,
									creditWorth
										.value
								)
						)
				)
			});
		}
		// Destroys description
		// process id.
		window.clearInterval (
			descriptionId_
		);
		// Destroys company
		// process id.
		window.clearInterval (
			companyId_
		);
		// Destroys name
		// process id.
		window.clearInterval (
			nameId_
		);
		// Destroys role
		// process id.
		window.clearInterval (
			roleId_
		);
		// The description.
		const about = (
			item.children[0]
				.children[1]
				.children[0]
				.children[0]
		);
		// The name.
		const fullName = (
			item.children[0]
				.children[1]
				.children[2]
				.children[1]
				.children[0]
		);
		// The company.
		const industry = (
			item.children[0]
				.children[1]
				.children[2]
				.children[1]
				.children[1]
				.children[2]
		);
		// The role.
		const workRole = (
			item.children[0]
				.children[1]
				.children[2]
				.children[1]
				.children[1]
				.children[0]
		);
		// Clears about.
		about
			.textContent = '';
		// Clears name.
		fullName
			.textContent = '';
		// Clears company.
		industry
			.textContent = '';
		// Clears role.
		workRole
			.textContent = '';
		// Animates name.
		nameId_ = (
			animateText ({
				target: fullName,
				interval: 50,
				text: name
			})
		);
		// Animates company.
		companyId_ = (
			animateText ({
				target: industry,
				text: company,
				interval: 50
			})
		);
		// Animates role.
		roleId_ = (
			animateText ({
				text: role.value,
				target: workRole,
				interval: 50
			})
		);
		// Animates about.
		descriptionId_ = (
			animateText ({
				target: about,
				interval: 10,
				text: (
					description
						.value
				)
			})
		);
	};

	/**
	 * @description Builds collaborators
	 * 	html structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// The raw's data.
		const cobs = getDataList_ ();
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
			<div
				class = "cobs-header-title"
			>
				<span
					cobs-index = "tr25::0"
					id = "cobs-data"
				>
					${lang.getText ("tr25")}
				</span>
			</div>
			<div class = "cobs-body">
				${buildCollaborator_ (
					cobs[0]
				)}
				${buildCollaborator_ (
					cobs[1]
				)}
				${buildCollaborator_ (
					cobs[2]
				)}
				${buildCollaborator_ (
					cobs[3]
				)}
				${buildCollaborator_ (
					cobs[4]
				)}
			</div>
			<div
				class = "cobs-controls"
			>
				${buildIcon ({
					fileName: (
						Icons.RIGHT_ARROW
					),
					data: {
						idName: "cobs-img"
					}
				})}
				<div
					class = "${
						"cobs-selected-node"
					}"
				></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				${buildIcon ({
					fileName: (
						Icons.RIGHT_ARROW
					),
					data: {
						idName: "cobs-img"
					}
				})}
			</div>
			<div
				class = "${
					"skeleton-loading"
				}"
			></div>
		`;
		// Adds the above section
		// to the selected tag as
		// a child.
		document.querySelector (
			"main"
		).appendChild (section);
		// The controls tag ref.
		controls_ = (
			document.querySelector (
				"div.cobs-controls"
			)
		);
		// The body tag ref.
		body_ = (
			document.querySelector (
				"div.cobs-body"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#cobs-img"
				)
			),
			onReady: () => {
				// Listens any interaction.
				swap_ ();
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				section.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					section.lastElementChild
						.remove ()
				), 200);
				// Called when any changement
				// is detected by redux.
				window.store.subscribe (
					() => {
						// Changes all tags
						// text's content
						// with a textual
						// animation.
						animateTextContent (
							getUpdates ({
								attrPrefix: (
									"cobs-index"
								),
								textualsId: (
									"cobs-data"
								)
							})
						);
					}
				);
				// Focus on the current
				// section for scrolling.
				new ScrollManager ({
					max: 200,
					min: 0,
					onEnter: () => {
						// Shows collaborators
						// section.
						setBodyOpacity_ (
							true
						);
						// Animates the active
						// collaborator item.
						animate_ (
							body_.children[
								index_
							],
							cobs[index_]
						);
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (5);
					},
					onLeave: () => {
						// Hides collaborators
						// section.
						setBodyOpacity_ (
							false
						);
					}
				});
			}
		});
	}
}

/**
 * @description Exports
 * 	all public features.
 * @exports *
 */
export {Collaborators};
