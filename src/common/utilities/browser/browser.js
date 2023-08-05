/**
* @fileoverview Defines a multitude of methods
*   to manage common navigator treatments.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-07-28
* @updated 2023-08-04
* @file browser.js
* @type {Browser}
* @version 0.0.3
*/

/**
 * @description Creates or changes a cookie.
 * @param {{
 *  expireDay: int=,
 *  name: String,
 *  value: any
 * }} data The cookie data configurations.
 *  It supports the following keys:
 *  - String name: The cookie's name.
 *  - any value: The cookie's value.
 *  - int= expireDay: The cookie's
 *    life length.
 * @function setCookie
 * @public
 * @returns {void} void
 */
function setCookie ({
  expireDay = 1,
  value,
  name
}) {
  // Corrects the given cookie name.
  name = (
    typeof name === "string"
    ? name.trim () : ''
  );
  // Corrects the given exipre day.
  expireDay = (
    Number.isInteger (expireDay)
    ? expireDay : 0
  );
  // Whether a cookie name is
  // specified.
  if (name.length > 0) {
    // Creates a new date instance.
    let date = new Date ();
    // Converts the given expires
    // date into day format.
    date.setTime (
      date.getTime () +
      (expireDay * 24 * 60 * 60 * 1000)
    );
    // Calculates the UTC date
    // format.
    const expires = (
      "expires=" +
      date.toUTCString ()
    );
    // Sets the target cookie.
    document.cookie = (`
      ${name}=${value};
      ${expires};path=/
    `.replaceAll ('\n', '')
     .replaceAll (' ', '')
    );
  }
}

/**
 * @description Returns the target
 *  cookie value.
 * @param {String} name The cookie
 *  name.
 * @function getCookie
 * @public
 * @returns {any} any
 */
function getCookie (name) {
  // The corrected cookie name.
  name = (
    typeof name === "string"
    ? name.trim () : ''
  );
  // Whether a cookie name is
  // specified.
  if (name.length > 0) {
    // The cookie parts.
    const cookieName = `${name}=`;
    // The cookie's data.
    const cookieData = (
      document?.cookie?.split (';')
    );
    // Searching the target cookie.
    for (
      let i = 0;
      i < cookieData?.length;
      i++
    ) {
      // Searching cookie value.
      while (
        cookieData[i]?.charAt (0) === ' '
      ) {
        // The current cookie's part.
        cookieData[i] = (
          cookieData[i]?.substring (1)
        );
      }
      // Whether a value has been
      // found.
      if (
        cookieData[i]?.indexOf (
          cookieName
        ) === 0
      ) {
        // Returns the found value.
        return (
          cookieData[i]?.substring (
            cookieName.length,
            cookieData[i]?.length
          )
        );
      }
    }
  }
}

/** 
 * @description Exports all
 *  public features.
 * @exports *
 */
export {getCookie, setCookie};
