/**
* @fileoverview Defines a common button for focus.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-08-03
* @updated 2023-08-31
* @file button.js
* @version 0.0.2
* @type {Button}
*/

// Custom dependencies.
import {Icons, buildIcon} from "../icon_logo_image/icon_logo_image.js";
import {clearStr} from "../../utilities/string/string.js";

/**
 * @description Builds a flat button.
 * @param {{
 *  customAttr?: String=,
 *  className?: String=,
 *  idName?: String=,
 *  textId?: String=, 
 *  title?: String=,
 *  name?: String=,
 *  text: String
 * }} data The button data configs.
 *  It supports the following keys:
 *
 *  - String text: The text to be
 *    displayed on the button.
 *
 *  - String className: The button
 *    class name.
 *
 *  - String idName: The button id
 *    name.
 *
 *  - String title: The button's
 *    title text.
 *
 *  - String name: The button's
 *    name.
 *
 *  - String textId: The span's
 *    text tag id.
 *
 *  - String customAttr: The custom
 *    button's text attribute.
 * @function buildFlatButton
 * @public
 * @returns {String} String
 */
function buildFlatButton ({
  customAttr = '',
  className = '',
  idName = '',
  textId = '',
  title = '',
  name = '',
  text = ''
}) {
  // The custom attribute.
  const [attrName, attrValue] = (
    clearStr ({
      input: customAttr,
      clearSpaces: true
    }).split ('=')
  );
  // Builds the target flat button.
  return (`
    <button
      class = "flat-btn ${className}"
      title = "${title}"
      name = "${name}"
      id = "${idName}"
    >
      <span
        ${attrName} = ${attrValue}
        id = "${textId}"
      >
        ${text}
      </span>
      ${buildIcon ({
        fileName: Icons.RIGHT_ARROW
      })}
    </button>
  `);
}

/**
 * @description Builds a native button.
 * @param {{
 *  withIcon?: boolean=,
 *  className?: String=,
 *  customAttr?: String=,
 *  iconType?: String=,
 *  idName?: String=,
 *  textId?: String=,
 *  title?: String=,
 *  name?: String=,
 *  text: String
 * }} data The button data configs.
 *  It supports the following keys:
 *
 *  - String text: The text to be
 *    displayed on the button.
 *
 *  - boolean withIcon: Whether
 *    you want to add an icon to
 *    the right.
 *
 *  - String iconType: The icon
 *    type to be displayed (If
 *    and only if `withIcon` is
 *    set to `true`).
 *
 *  - String className: The button
 *    class name.
 *
 *  - String idName: The button
 *    id name.
 *
 *  - String title: The button's
 *    title text.
 *
 *  - String name: The button's
 *    name.
 *
 *  - String textId: The span's
 *    text tag id.
 *
 *  - String customAttr: The custom
 *    button's text attribute.
 * @function buildButton
 * @public
 * @returns {String} String
 */
function buildButton ({
  withIcon = false,
  customAttr = '',
  className = '',
  iconType = '',
  idName = '',
  textId = '',
  title = '',
  name = '',
  text = ''
}) {
  // The custom attribute.
  const [attrName, attrValue] = (
    clearStr ({
      input: customAttr,
      clearSpaces: true
    }).split ('=')
  );
  // Builds the target button.
  return (`
    <button
      class = "gen-btn ${className}"
      title = "${title}"
      name = "${name}"
      id = "${idName}"
    >
      ${(
        (
          typeof text === "string" &&
          text.trim ().length > 0
        )
        ? `<span
            ${attrName} = ${attrValue}
            id = "${textId}"
          >
            ${clearStr ({
              input: text
            })}
          </span>`
        : ''
      )}
      ${(
        (
          withIcon &&
          typeof iconType === "string" &&
          iconType.trim ().length > 0
        ) ? buildIcon ({
          fileName: iconType
        }) : ''
      )}
    </button>
  `);
}

/** 
 * @description Exports all
 *  public features.
 * @exports *
 */
export {
  buildFlatButton,
  buildButton
};
