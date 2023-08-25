/**
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @fileoverview Banner UI component.
* @supported DESKTOP, MOBILE
* @created 2023-06-17
* @updated 2023-08-24
* @file banner.js
* @type {Banner}
* @version 0.0.2
*/

// Custom dependencies.
import {clearJSStyle} from "../../../common/utilities/browser/browser.js";
import {buildButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import lang from "../../../common/utilities/language/language.js";
import {
	buildImage,
	buildIcon,
	Images,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds banner section.
 * @public
 * @class
 * @returns {Banner} Banner
 */
function Banner () {
	// Attributes.
	/**
	 * @description The banner right
	 * 	container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let bannerRight_ = null;
	/**
	 * @description The banner left
	 * 	container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let bannerLeft_ = null;

	/**
	 * @description Animates the banner
	 * 	for large screens.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const largeAnimation_ = () => {
		// Animates banner background.
		const timeline = bgAnimation_ ();
		// Animates the left container.
		timeline.add ({
			translateX: ["-50%", "0%"],
			targets: bannerLeft_,
			opacity: [0.0, 1.0]
		}, 300);
		// Animates the right container.
		timeline.add ({
			translateX: ["50%", "0%"],
			targets: bannerRight_,
			opacity: [0.0, 1.0]
		}, 300);
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates the banner
	 * 	for small screens.
	 * @function smallAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const smallAnimation_ = () => {
		// Animates banner background.
		const timeline = bgAnimation_ ();
		// Animates the first element.
		timeline.add ({
			targets: bannerLeft_.children[0],
			translateY: ["-20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Animates the second element.
		timeline.add ({
			targets: bannerLeft_.children[1],
			translateY: ["20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Animates the third element.
		timeline.add ({
			targets: bannerLeft_.children[2],
			translateY: ["-20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Animates the first element.
		timeline.add ({
			targets: bannerLeft_.children[3],
			translateY: ["20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates the banner
	 * 	regardless the detected screen
	 * 	format (Desktop & Mobile).
	 * @function animateBanner_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const animateBanner_ = () => {
		// The banner right tag reference.
		bannerRight_ = (
			document.querySelector (
				"div.banner-right"
			)
		);
		// The banner left tag reference.
		bannerLeft_ = (
			document.querySelector (
				"div.banner-left"
			)
		);
		// The animation timeline.
		let timeline = null;
		// Listens screen format.
		new ScreenManager ({
			disableDetection: true,
			mediumScreen: {
				max: 770,
				min: 421
			},
			smallScreen: {
				max: 420,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 771
			},
			onMedium: () => {
				// Animates the banner
				// for medium screens.
				timeline = (
					smallAnimation_ ()
				);
			},
			onSmall: () => {
				// Animates the banner
				// for small screens.
				timeline = (
					smallAnimation_ ()
				);
			},
			onLarge: () => {
				// Animates the banner
				// for large screens.
				timeline = (
					largeAnimation_ ()
				);
			}
		});
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates the big
	 * 	container with a gradient.
	 * @function bgAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const bgAnimation_ = () => {
		// Creates a timeline with
		// default parameters.
		const timeline = (
			anime.timeline ({
				easing: "linear",
				autoplay: false,
				duration: 120,
				delay: 140,
				complete: function () {
					// Waits for 250 milisecond
					// before add paddings.
					window.setTimeout (() => (
						clearJSStyle ({
							direction: this.direction,
							targets: [
								{
									ref: bannerLeft_.children[0],
									start: "bl-first-as",
									end: "bl-first-af"
								},
								{
									ref: bannerLeft_.children[1],
									start: "bl-second-as",
									end: "bl-second-af"
								},
								{
									ref: bannerLeft_.children[2],
									start: "bl-third-as",
									end: "bl-third-af"
								},
								{
									ref: bannerLeft_.children[3],
									start: "bl-four-as",
									end: "bl-four-af"
								},
								{
									start: "banner-right-as",
									end: "banner-right-af",
									ref: bannerRight_
								},
								{
									start: "banner-left-as",
									end: "banner-left-af",
									ref: bannerLeft_
								},
								{
									start: "banner-as",
									end: "banner-af",
									ref: (
										this.children[0]
											.animatables[0]
											.target
									)
								}
							]
						})
					), 250);
				}
			})
		);
		// Animates background's
		// width size.
		return timeline.add ({
			targets: "section.banner",
			width: ["0%", "100%"]
		});
	};

	/**
	 * @description Applies caroussel
	 * 	effect.
	 * @constant {Function}
	 * @function caroussel
	 * @private {Function}
	 * @returns {void} void
	 */
	const caroussel_ = () => {
		// The first progress thumb.
		const progressThumb1 = (
			document.querySelector (
				"div#progress-1"
			)
		);
		// The second progress thumb.
		const progressThumb2 = (
			document.querySelector (
				"div#progress-2"
			)
		);
		// The third progress thumb.
		const progressThumb3 = (
			document.querySelector (
				"div#progress-3"
			)
		);
		// The first screenshot.
		const screenshot1 = (
			document.querySelector (
				"img#screenshot-1"
			)
		);
		// The second screenshot.
		const screenshot2 = (
			document.querySelector (
				"img#screenshot-2"
			)
		);
		// The third screenshot.
		const screenshot3 = (
			document.querySelector (
				"img#screenshot-3"
			)
		);
		// Adds the progress
		// animation to the
		// first progress.
		progressThumb1
			.classList.add (
				"progress-thumb"
			);
		// Fadein the first
		// screeshot.
		screenshot1
			.classList.add (
				"fade-in"
			);
		// After for 4.1s.
		window.setTimeout (() => {
			// Removes the progress
			// animation from the
			// previous thumb.
			progressThumb1
				.classList.remove (
					"progress-thumb"
				);
			// Adds the progress
			// animation to the
			// second progress.
			progressThumb2
				.classList.add (
					"progress-thumb"
				);
			// Fadeout the previous
			// screeshot.
			screenshot1
				.classList.remove (
					"fade-in"
				);
			// Fadein the second
			// screeshot.
			screenshot2
				.classList.add (
					"fade-in"
				);
			// After for 4.1s.
			window.setTimeout (() => {
				// Removes the progress
				// animation from the
				// previous thumb.
				progressThumb2
					.classList.remove (
						"progress-thumb"
					);
				// Adds the progress
				// animation to the
				// third progress.
				progressThumb3
					.classList.add (
						"progress-thumb"
					);
				// Fadeout the previous
				// screeshot.
				screenshot2
					.classList.remove (
						"fade-in"
					);
				// Fadein the third
				// screeshot.
				screenshot3
					.classList.add (
						"fade-in"
					);
				// After for 4.1s.
				window.setTimeout (() => {
					// Removes the progress
					// animation from the
					// previous thumb.
					progressThumb3
						.classList.remove (
							"progress-thumb"
						);
					// Fadeout the previous
					// screeshot.
					screenshot3
						.classList.remove (
							"fade-in"
						);
					// Calls inside itself.
					caroussel_ ();
				}, 4100);
			}, 4100);
		}, 4100);
	};

	/**
	 * @description Builds banner html
	 * 	structure as string format.
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
			"banner"
		);
		// Adds another class's
		// name to our section.
		section.classList.add (
			"banner-as"
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div
				class = "${
					"banner-left banner-left-as"
				}"
			>
				<span
					class = "bl-first-as"
				>
					<label>
						${lang.getText ("tr10")}
					</label>
				</span>
				<h1
					class = "bl-second-as"
				>
					${lang.getText ("tr11")}
				</h1>
				<label
					class = "bl-third-as"
				>
					${lang.getText ("tr12")}
					<br/>
					${lang.getText ("tr13")}
				</label>
				<div
					class = "bl-four-as"
				>
					${buildButton ({
						text: lang.getText ("tr9")
					})}
					<button>
						${lang.getText ("tr14")}
						${buildIcon ({
							fileName: Icons.ROUNDED_PLAY
						})}
					</button>
				</div>
				<div>
					<span>
						<div id = "progress-1"></div>
					</span>
					<span>
						<div id = "progress-2"></div>
					</span>
					<span>
						<div id = "progress-3"></div>
					</span>
				</div>
			</div>
			<div
				class = "${
					"banner-right banner-right-as"
				}"
			>
				${buildImage ({
					fileName: Images.SCREENSHOT_1,
					data: {idName: "screenshot-1"}
				})}
				${buildImage ({
					fileName: Images.SCREENSHOT_2,
					data: {idName: "screenshot-2"}
				})}
				${buildImage ({
					fileName: Images.SCREENSHOT_3,
					data: {idName: "screenshot-3"}
				})}
			</div>
		`;
		// Adds the below section to
		// the main tag as a child.
		document.querySelector (
			"main"
		).appendChild (section);
		// Animates the banner.
		animateBanner_ ().play ();
		// Launches caroussel.
		caroussel_ ();
	}
}

/**
 * @description Exports all
 * 	public features.
 * @exports *
 */
export {Banner};
