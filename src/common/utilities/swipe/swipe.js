/**
* @fileoverview Defines a class to manage touch
*   screen events on mobile.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-28
* @updated 2023-08-12
* @type {SwipeEvent}
* @file swipe.js
* @version 0.0.3
*/

// Enumerations.
/**
 * @description All supported touch
 * 	screen event types.
 * @constant {{
 * 	SWIPE_RIGHT: String,
 *	SWIPE_DOWN: String,
 *	SWIPE_LEFT: String,
 *	SWIPE_UP: String
 * }}
 * @exports
 * @public
 * @enum
 */
export const EventType = {
	SWIPE_RIGHT: "right",
	SWIPE_DOWN: "down",
	SWIPE_LEFT: "left",
	SWIPE_UP: "up"
};

/**
 * @classdesc Manages touch screen
 * 	events on mobile devices.
 * @type {SwipeEvent}
 * @public
 * @class
 * @returns {SwipeEvent} SwipeEvent
 */
function SwipeEvent () {
	/**
	 * @description Listens a touch screen
	 * 	event on the given tag.
	 * @param {{
	 * 	tagId: String,
	 * 	callback?: ?Function (
	 * 		swipeDir: String
	 * 	)
	 * }} configs The swipe manager data's
	 * 	configurations. It supports the
	 * 	following keys:
	 * 	- Function callback: The method
	 * 		to be called when a swipe is
	 * 		detected.
	 * 	- String tagId: The target HTML
	 * 		tag's id within the DOM.
	 * @constant {Function}
	 * @private {Function}
	 * @function swipe_
	 * @returns {void} void
	 */
	const swipe_ = ({callback, tagId}) => {
		// The tag's reference.
		const tag = (
			document.querySelector (
				tagId.toString ()
			)
		);
		// Whether the given tag is
		// really defined in the DOM.
		if (tag instanceof Element) {
			// The maximum time allowed
			// to travel that distance.
			let allowedTime = 300;
			// The min distance traveled
			// to be considered swipe.
			let threshold = 150;
			// The maximum distance allowed 
			// at the same time in
			// perpendicular direction.
			let restraint = 100;
			// The elapsed time since
			// the screen drag.
			let elapsedTime;
			// The start time to a
			// touch screen motion.
			let startTime;
			// The swipe direction.
			let swipedir;
			// The start point on x axis.
			let startX;
			// The start point on y axis.
			let startY;
			// The distance on x asis.
			let distX;
			// The distance on y asis.
			let distY;
			// Listens `touchstart` event.
			tag.addEventListener (
				"touchstart", event => {
					// Sets swipe direction.
					swipedir = "none";
					// Records time when finger
					// first makes contact
					// with surface.
					startTime = (
						new Date ().getTime ()
					);
					// Gets touch start x pos.
					startX = (
						event
							.changedTouches[0]
							.pageX
					);
					// Gets touch start y pos.
					startY = (
						event
							.changedTouches[0]
							.pageY
					);
				}, false
			);
			// Listens `touchend` event.
			tag.addEventListener (
				"touchend", event => {
					// Gets time elapsed.
					elapsedTime = (
						new Date ().getTime ()
							- startTime
					);
					// Gets horizontal distance
					// traveled by finger while
					// in contact with surface.
					distX = (
						event
							.changedTouches[0]
							.pageX - startX
					);
					// Gets vertical distance traveled
					// by finger while in contact with
					// surface.
					distY = (
						event
							.changedTouches[0]
							.pageY - startY
					);
					// Whether swipe meets this test.
					if (
						elapsedTime <= allowedTime
					) {
						// Whether swipe meets this
						// 2nd test for horizontal.
						if (
							Math.abs (distX) >= threshold &&
							Math.abs (distY) <= restraint
						) {
							// Whether distance traveled
							// is negative, it indicates
							// left swipe.
							swipedir = (
								(distX < 0) ?
								EventType.SWIPE_LEFT :
								EventType.SWIPE_RIGHT
							);
						}
						// Whether swipe meets this
						// 2nd test for vertical.
						else if (
							Math.abs (distY) >= threshold &&
							Math.abs (distX) <= restraint
						) {
							// Whether distance traveled
							// is negative, it indicates
							// up swipe.
							swipedir = (
								(distY < 0) ?
								EventType.SWIPE_UP :
								EventType.SWIPE_DOWN
							);
						}
					}
					// Calls the passed callback
					// with the detected swipe
					// direction.
					callback (swipedir);
				}, false
			);
		// Otherwise.
		} else {
			// Undefined tag.
			throw new Error (
				"The given tag isn't defined."
			);
		}
	};

	/**
	 * @description Listens a right swipe
	 * 	event.
	 * @param {{
	 * 	feedback?: ?Function,
	 * 	tagId: String
	 * }} configs The swipe listener data's
	 * 	configurations. It supports the
	 * 	following keys:
	 * 	- Function feedback: The method
	 * 		to be called when a right swipe
	 * 		is detected.
	 * 	- String tagId: The target HTML
	 * 		tag's id within the DOM.
	 * @constant {Function}
	 * @function swipeRight
	 * @public
	 * @returns {void} void
	 */
	this.swipeRight = ({
		feedback = null,
		tagId = ''
	}) => this.listen ({
		eventType: EventType.SWIPE_RIGHT,
		feedback,
		tagId
	});

	/**
	 * @description Listens a swipe down
	 * 	event.
	 * @param {{
	 * 	feedback?: ?Function,
	 * 	tagId: String
	 * }} configs The swipe listener data's
	 * 	configurations. It supports the
	 * 	following keys:
	 * 	- Function feedback: The method
	 * 		to be called when a swipe down
	 * 		is detected.
	 * 	- String tagId: The target HTML
	 * 		tag's id within the DOM.
	 * @constant {Function}
	 * @function swipeDown
	 * @public
	 * @returns {void} void
	 */
	this.swipeDown = ({
		feedback = null,
		tagId = ''
	}) => this.listen ({
		eventType: EventType.SWIPE_DOWN,
		feedback,
		tagId
	});

	/**
	 * @description Listens a left swipe
	 * 	event.
	 * @param {{
	 * 	feedback?: ?Function,
	 * 	tagId: String
	 * }} configs The swipe listener data's
	 * 	configurations. It supports the
	 * 	following keys:
	 * 	- Function feedback: The method
	 * 		to be called when a left swipe
	 * 		is detected.
	 * 	- String tagId: The target HTML
	 * 		tag's id within the DOM.
	 * @constant {Function}
	 * @function swipeLeft
	 * @public
	 * @returns {void} void
	 */
	this.swipeLeft = ({
		feedback = null,
		tagId = ''
	}) => this.listen ({
		eventType: EventType.SWIPE_LEFT,
		feedback,
		tagId
	});

	/**
	 * @description Listens a swipe up
	 * 	event.
	 * @param {{
	 * 	feedback?: ?Function,
	 * 	tagId: String
	 * }} configs The swipe listener data's
	 * 	configurations. It supports the
	 * 	following keys:
	 * 	- Function feedback: The method
	 * 		to be called when a swipe up
	 * 		is detected.
	 * 	- String tagId: The target HTML
	 * 		tag's id within the DOM.
	 * @constant {Function}
	 * @function swipeUp
	 * @public
	 * @returns {void} void
	 */
	this.swipeUp = ({
		feedback = null,
		tagId = ''
	}) => this.listen ({
		eventType: EventType.SWIPE_UP,
		feedback,
		tagId
	});

	/**
	 * @description Listens a swipe event.
	 * @param {{
	 * 	eventType: EventType,
	 * 	feedback?: ?Function,
	 * 	tagId: String
	 * }} configs The swipe listener data's
	 * 	configurations. It supports the
	 * 	following keys:
	 * 	- Function feedback: The method
	 * 		to be called when a swipe is
	 * 		detected.
	 * 	- String tagId: The target HTML
	 * 		tag's id within the DOM.
	 *	- EventType eventType: The swipe
	 *		event's type to listen.
	 * @constant {Function}
	 * @function listen
	 * @public
	 * @returns {void} void
	 */
	this.listen = ({
		feedback = null,
		eventType = '',
		tagId = ''
	}) => swipe_ ({
		tagId,
		callback: direction => {
			// Whether the feedback is defined.
			if (
				typeof feedback === "function"
			) {
				// Whether the detected swipe
				// direction matches with the
				// passed direction.
				if (eventType === direction) {
					// Calls the passed feedback.
					feedback ();
				}
			}
		}
	});
}

/**
 * @description Exports an object
 *  instance this class by default.
 * @exports SwipeEvent
 */
export default new SwipeEvent ();
