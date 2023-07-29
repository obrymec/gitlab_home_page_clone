/**
* @fileoverview Collaborators UI component for the landing page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file collaborators.js
* @type {Collaborators}
* @created 2023-06-24
* @updated 2023-07-06
* @version 0.0.1
*/

/**
 * @public @class @classdesc Builds collaborators.
 * @param {Object<String, any>} data Contains
 *  a javascript object that supports the
 *  following key(s):
 *  - !String parentId: The parent id of
 * 		collaborators
 * @returns {Collaborators} Collaborators
 */
function Collaborators (data) {
	/**
 	 * @description The right arrow path.
	 * @constant {String}
 	 * @private {String}
	 * @field
	 */
	const rightArrowPath_ = `
		../../../../../assets/icons
		/right-arrow.svg
	`;
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
	 * @description Toggles customers body
	 * 	container opacity.
	 * @private {toggleBodyOpacity_}
	 * @function toggleBodyOpacity_
	 * @returns {void} void
	*/
	const toggleBodyOpacity_ = () => {
		// The customers body container
		// reference.
		const customersBody = (
			document.querySelector ("div.body")
		);
		// Hides body opacity.
		customersBody?.classList?.add (
			"cobs-opacity"
		);
		// After one second.
		window.setTimeout (() => {
			// Shows body opacity.
			customersBody?.classList?.remove (
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
	 * @private {toggleCustomerNode_}
	 * @function toggleCustomerNode_
	 * @returns {{customer: Element, node: Element}} Object
	*/
	const toggleCustomerNode_ = (
		customer, node, position, move
	) => {
		// Whether both tag aren't
		// null.
		if (
			node != null &&
			customer != null
		) {
			// Removes `cobs-display`
			// class's name from the
			// preview customer.
			customer?.classList?.remove (
				"cobs-display"
			);
			// Removes `cobs-selected-node`
			// class's name from the
			// preview node.
			node?.classList?.remove (
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
			customer?.classList?.add (
				"cobs-display"
			);
			// Adds `cobs-selected-node`
			// class's name to the
			// current node.
			node?.classList?.add (
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
	 * @private {swap_}
	 * @function swap_
	 * @returns {void} void
	*/
	const swap_ = () => {
		// The top arrow reference.
		const topArrow = (
			document.querySelector (
				"div.controls > svg:first-child"
			)
		);
		// The bottom arrow reference.
		const bottomArrow = (
			document.querySelector (
				"div.controls > svg:last-child"
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
			// Apply `click` event on the
			// current node.
			document.querySelector (
				`div.controls > div:nth-child(
					${(pos + 1)}
				)`
			)?.addEventListener (
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
							tags?.customer,
							tags?.node,
							pos,
							true
						);
					}, 300);
				}
			);
		});
		// Listens top arrow click event.
		topArrow?.addEventListener (
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
						tags?.customer,
						tags?.node,
						index,
						true
					);
				}, 300);
			}
		);
		// Listens bottom arrow click event.
		bottomArrow?.addEventListener (
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
						tags?.customer,
						tags?.node,
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
	const buildColaborator_ = data => {
		// Whether radius is enabled
		// or not.
		const applyBottomRightRadius = (
			data?.radius
			? " collaborators-border-radius"
			: ''
		);
		// The specific customer class
		// name.
		const customClassName = (
			data?.customClassName
				?.replaceAll (' ', '')?.length
			? ` ${data?.customClassName}`
			: ''
		);
		// Builds customer ui.
		return `
			<div class = "customer${customClassName}">
				<div
					class = "identity${applyBottomRightRadius}"
				>
					<div class = "profile">
						<img
							src = ${
								data?.profilePath
									?.replaceAll (' ', '')
									?.replaceAll ('\n', '')
									?.replaceAll ('\t', '')
							}
							alt = ''
						/>
					</div>
					<div class = "infos">
						<blockquote class = "description">
							"${
								data?.description
									?.replaceAll ('\n', '')
									?.replaceAll ('\t', '')
									?.trim ()
							}"
						</blockquote>
						<button class = "read-more">
							<label>${data?.buttonText}</label>
							<img
								src = "${rightArrowPath_}"
								alt = ''
							/>
						</button>
						<div class = "about">
							<div>
								<img
									src = "${
										data?.logoPath
											?.replaceAll (' ', '')
											?.replaceAll ('\n', '')
											?.replaceAll ('\t', '')
									}"
									height = "${data?.height}"
									width = "${data?.width}"
									alt = ''
								/>
							</div>
							<div>
								<label>${data?.name}</label>
								<p>
									${
										data?.role
											?.replaceAll ('\n', '')
											?.replaceAll ('\t', '')
											?.trim ()
									}
								</p>
							</div>
						</div>
					</div>
				</div>
				${(
					data?.showStatistics ?
					`<div class = "statistics">
						<div>
							<label>${data?.credit}</label>
							<p>
								${
									data?.creditComment
										?.replaceAll ('\n', '')
										?.replaceAll ('\t', '')
										?.trim ()
								}
							</p>
						</div>
						<div>
							<label>${data?.percent}</label>
							<p>
								${
									data?.percentComment
										?.replaceAll ('\n', '')
										?.replaceAll ('\t', '')
										?.trim ()
								}
							</p>
						</div>
					</div>`
					: ''
				)}
			</div>
		`;
	};

	/**
	 * @description Builds collaborators html
	 * 	structure as string format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// Whether parent id is not null.
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
				"collaborators"
			);
			// Adds a html structure to
			// the created section.
			section.innerHTML = `
				<div class = "header-title">
					<label>
						Lockheed Martin saves time, 
						money, and tech muscle 
						with GitLab
					</label>
				</div>
				<div class = "body">
					${buildColaborator_ ({
						customClassName: "cobs-display",
						buttonText: "Read more",
						showStatistics: true,
						name: "Alan Hohn",
						percent: "90%",
						height: "80px",
						width: "600px",
						credit: "80x",
						creditComment: (
							"faster CI pipeline builds"
						),
						logoPath: `
							../../../../../assets/logos
							/lockheed-martin.png
						`,
						profilePath: `
							../../../../../assets/images
							/hohn-alan.jpg
						`,
						role: `
							Director of Software Strategy,
							<br/>Lockheed Martin
						`,
						percentComment: `
							less time spent on system
							maintenance
						`,
						description: `
							By switching to GitLab and 
							automating deployment, teams 
							have moved from monthly or 
							weekly deliveries to daily 
							or multiple daily deliveries.
						`
					})}
					${buildColaborator_ ({
						buttonText: "Read more",
						name: "Jason Monoharan",
						showStatistics: true,
						percent: "20 hours",
						credit: "$150k",
						height: "70px",
						width: "300px",
						profilePath: `
							../../../../../assets/images
							/jason-manoharan.png
						`,
						logoPath: `
							../../../../../assets/logos
							/iron-mountain.svg
						`,
						creditComment: `
							approximate cost savings 
							per year
						`,
						role: `
							VP of Technology,
							<br/>Iron Mountain
						`,
						percentComment: `
							saved in onboarding time 
							per project
						`,
						description: `
							The vision that GitLab has 
							in terms of tying strategy 
							to scope and to code is very 
							powerful. I appreciate the 
							level of investment they are 
							continuing to make in the 
							platform.
						`
					})}
					${buildColaborator_ ({
						profilePath: `
							../../../../../assets/images
							/evano-connor.png
						`,
						logoPath: `
							../../../../../assets/logos
							/haven-tech.png
						`,
						buttonText: "Read more",
						name: "Evan O’Connor",
						showStatistics: true,
						percent: "66%",
						height: "70px",
						credit: "62%",
						width: "70px",
						percentComment: `
							of monthly users ran secure 
							scanner jobs
						`,
						role: `
							Platform Engineering Manager,
							<br/>Haven Technologies
						`,
						creditComment: `
							of monthly users ran secret 
							detection jobs
						`,
						description: `
							GitLab’s commitment to an open 
							source community meant that we 
							could engage directly with 
							engineers to work through 
							difficult technical 
							problems.
						`
					})}
					${buildColaborator_ ({
						buttonText: "Read more",
						showStatistics: true,
						credit: "1 million",
						name: "Rick Carey",
						percent: "12,000",
						height: "80px",
						width: "225px",
						percentComment: (
							"Active GitLab Users"
						),
						profilePath: `
							../../../../../assets/images
							/rick-carey.png
						`,
						logoPath: `
							../../../../../assets/logos
							/ubs.svg
						`,
						role: `
							Group Chief Technology Officer,
							<br/>UBS
						`,
						creditComment: `
							successful builds in first 
							six months
						`,
						description: `
							We have an expression at UBS, 
							‘all developers wait at the 
							same speed,’ so anything we 
							can do to reduce their waiting 
							time is value added. And 
							GitLab allows us to have that 
							integrated experience.
						`
					})}
					${buildColaborator_ ({
						buttonText: "Watch the video",
						name: "Lakshmi Venkatraman",
						showStatistics: false,
						height: "75px",
						width: "215px",
						radius: true,
						profilePath: `
							../../../../../assets/images
							/lakshmi-venkatrama.png
						`,
						logoPath: `
							../../../../../assets/logos
							/singleron.svg
						`,
						role: `
							Project Manager,
							<br/>Singleron Biotechnologies
						`,
						description: `
							GitLab allows us to collaborate 
							very well with team members and 
							between different teams. As a 
							project manager, being able to 
							track a project or the workload 
							of a team member helps prevent 
							a project from delays. When the 
							project is done, we can easily 
							automate a packaging process 
							and send results back to the 
							customer. And with GitLab, it 
							all resides within one house.
						`
					})}
				</div>
				<div class = "controls">
					<svg
						viewBox = "0 0 16 16"
						height = "16px"
						width = "16px"
					>
						<path
							fill-rule = "evenodd"
							clip-rule = "evenodd"
							d = "M10.78 2.22a.75.75 0 00-1.06 
							0L4.468 7.472a.75.75 0 000 
							1.06l5.252 5.252a.75.75 0 
							101.06-1.06L6.06 
							8.001l4.72-4.721a.75.75 
							0 000-1.06z"
						></path>
					</svg>
					<div
						class = "cobs-selected-node"
					></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<svg
						viewBox = "0 0 16 16"
						height = "16px"
						width = "16px"
					>
						<path
							fill-rule = "evenodd"
							clip-rule = "evenodd"
							d = "M5.22 2.22a.75.75 0 
							011.06 0l5.252 5.252a.75.75 
							0 010 1.06L6.28 13.784a.75.75 
							0 11-1.06-1.06l4.72-4.723L5.22 
							3.28a.75.75 0 010-1.06z"
						></path>
					</svg>
				</div>
			`;
			// Adds the below section
			// to the selected tag as
			// a child.
			document.querySelector (
				parentId_
			).appendChild (section);
			// Listens arrows interactions.
			swap_ ();
		}
	}
}

/**
 * @description Exports all public features.
 * @exports *
 */
export {Collaborators};
