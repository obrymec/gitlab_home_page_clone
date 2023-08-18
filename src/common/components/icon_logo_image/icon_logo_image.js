/**
* @fileoverview Defines icon, logo and image view.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file icon_logo_image.js
* @type {IconLogoImage}
* @created 2023-08-03
* @updated 2023-08-18
* @version 0.0.3
*/
 
// Custom dependencies.
import {clearStr} from "../../utilities/string/string.js";

// Enumerations.
/**
 * @description All available logos.
 * @constant {{
 *  GITLAB_LOGO_TEXT: String,
 *  LOCKHEED_MARTIN: String,
 *  IRON_MOUNTAIN: String,
 *  HAVEN_TECH: String,
 *  SINGLERON: String,
 *  FACEBOOK: String,
 *  T_MOBILE: String,
 *  GOLDMAN: String,
 *  LINKDIN: String,
 *  YOUTUBE: String,
 *  AIRBUS: String,
 *  GITLAB: String,
 *  MARTIN: String,
 *  NVIDIA: String,
 *  TWITER: String,
 *  UBS: String
 * }}
 * @public
 * @enum
 */
const Logos = {
  GITLAB_LOGO_TEXT: "gitlab-logo-text.svg",
  LOCKHEED_MARTIN: "lockheed-marting.png",
  IRON_MOUNTAIN: "iron-mountain.svg",
  HAVEN_TECH: "haven-tech.png",
  SINGLERON: "singleron.svg",
  FACEBOOK: "facebook.svg",
  T_MOBILE: "t-mobile.svg",
  GOLDMAN: "goldman.svg",
  LINKDIN: "linkdin.svg",
  YOUTUBE: "youtube.svg",
  AIRBUS: "airbus.svg",
  GITLAB: "gitlab.svg",
  MARTIN: "martin.svg",
  NVIDIA: "nvidia.svg",
  TWITER: "twiter.svg",
  UBS: "ubs.svg"
};
/**
 * @description All available icons.
 * @constant {{
 *  LONG_RIGHT_ARROW: String,
 * 	CODE_SUGGESTION: String,
 *  EMBURGER_MENU: String,
 *	METHODOLOGY_1: String,
 *	METHODOLOGY_2: String,
 *	METHODOLOGY_3: String,
 *  METHODOLOGY_4: String,
 *  METHODOLOGY_5: String,
 *  BOTTOM_ARROW: String,
 *  ROUNDED_PLAY: String,
 *  CERTIFICATE: String,
 *  RIGHT_ARROW: String,
 *  RESOURCE_1: String,
 *  RESOURCE_2: String,
 *  RESOURCE_3: String,
 *  RESOURCE_4: String,
 *  RESOURCE_5: String,
 *  RESOURCE_6: String,
 *  VERIFIED: String,
 *  SIGN_IN: String,
 *  CHECKED: String,
 *  SEARCH: String,
 *  PLANET: String,
 *  REPORT: String,
 *  CLOSE: String,
 *  DOC: String
 * }}
 * @public
 * @enum
 */
const Icons = {
  LONG_RIGHT_ARROW: "long-right-arrow.svg",
  CODE_SUGGESTION: "code-suggestion.svg",
  EMBURGER_MENU: "emburger-menu.svg",
  METHODOLOGY_1: "methodology-1.svg",
  METHODOLOGY_2: "methodology-2.svg",
  METHODOLOGY_3: "methodology-3.svg",
  METHODOLOGY_4: "methodology-4.svg",
  METHODOLOGY_5: "methodology-5.svg",
  BOTTOM_ARROW: "bottom-arrow.svg",
  ROUNDED_PLAY: "rounded-play.svg",
  CERTIFICATE: "certificate.svg",
  RIGHT_ARROW: "right-arrow.svg",
  RESOURCE_1: "resource-1.svg",
  RESOURCE_2: "resource-2.svg",
  RESOURCE_3: "resource-3.svg",
  RESOURCE_4: "resource-4.svg",
  RESOURCE_5: "resource-5.svg",
  RESOURCE_6: "resource-6.svg",
  VERIFIED: "verified.svg",
  CHECKED: "checked.svg",
  SIGN_IN: "sign-in.svg",
  PLANET: "planet.svg",
  REPORT: "report.svg",
  SEARCH: "search.svg",
  CLOSE: "close.svg",
  DOC: "doc.svg"
};

/**
 * @description All available images.
 * @constant {{
 * 	LAKSHMI_VENKATRAMA: String,
 *  JASON_MANOHARAN: String,
 *  METHODOLOGY_1: String,
 *  METHODOLOGY_2: String,
 *  METHODOLOGY_3: String,
 *  METHODOLOGY_4: String,
 *  METHODOLOGY_5: String,
 *  EVANO_CONNOR: String,
 *  SCREENSHOT_1: String,
 *  SCREENSHOT_2: String,
 *  SCREENSHOT_3: String,
 *  RESOURCE_1: String,
 *  RESOURCE_2: String,
 *  RESOURCE_3: String,
 *  RESOURCE_4: String,
 *  RESOURCE_5: String,
 *  RESOURCE_6: String,
 *  RICK_CAREY: String,
 *  HOHN_ALAN: String,
 *  BADGE_1: String,
 *  BADGE_2: String,
 *  BADGE_3: String,
 *  BADGE_4: String,
 *  BADGE_5: String,
 *  BADGE_6: String,
 *  BADGE_7: String,
 *  BADGE_8: String,
 *  EXPERTS: String
 * }}
 * @public
 * @enum
 */
const Images = {
  LAKSHMI_VENKATRAMA: "lakshmi-venkatrama.png",
  JASON_MANOHARAN: "jason-manoharan.png",
  METHODOLOGY_1: "methodology-1.png",
  METHODOLOGY_2: "methodology-2.png",
  METHODOLOGY_3: "methodology-3.png",
  METHODOLOGY_4: "methodology-4.png",
  METHODOLOGY_5: "methodology-5.png",
  EVANO_CONNOR: "evano-connor.png",
  SCREENSHOT_1: "screenshot-1.svg",
  SCREENSHOT_2: "screenshot-2.svg",
  SCREENSHOT_3: "screenshot-3.svg",
  RESOURCE_1: "resource-1.png",
  RESOURCE_2: "resource-2.png",
  RESOURCE_3: "resource-3.png",
  RESOURCE_4: "resource-4.png",
  RESOURCE_5: "resource-5.png",
  RESOURCE_6: "resource-6.png",
  RICK_CAREY: "rick-carey.png",
  HOHN_ALAN: "hohn-alan.jpg",
  BADGE_1: "badge-1.svg",
  BADGE_2: "badge-2.svg",
  BADGE_3: "badge-3.svg",
  BADGE_4: "badge-4.svg",
  BADGE_5: "badge-5.svg",
  BADGE_6: "badge-6.svg",
  BADGE_7: "badge-7.svg",
  BADGE_8: "badge-8.svg",
  EXPERTS: "experts.png"
};

/**
 * @description Builds a view that
 *  can represent an icon, logo
 *  and image.
 * @param {{
 *  className?: String=,
 *  fileName: String,
 *  idName?: String=,
 *  height?: String=,
 *  width?: String=,
 *  title?: String=,
 *  name?: String=,
 *  alt?: String=,
 *  root: String
 * }} origin The original's path
 *  to load an icon, logo or
 *  image. It supports the
 *  keys following:
 *
 *  - String root: The root
 *    folder's path.
 *
 *  - String fileName: The icon,
 *    logo or image to be loaded.
 *
 *  - String alt: The image, logo,
 *    or icon alt text.
 *
 *  - String className: The logo,
 *    image or icon class name.
 *
 *  - String idName: The logo,
 *    image or icon id name.
 *
 *  - String title: The image,
 *    logo or icon title text.
 *
 *  - String name: The image
 *    name.
 *
 *  - String height: The image
 *    width.
 *
 *  - String width: The image
 *    height.
 * @function buildView_
 * @private {Function}
 * @returns {String} String
 */
function buildView_ ({
  className = '',
  fileName = '',
  idName = '',
  height = '',
  title = '',
  width = '',
  name = '',
  root = '',
  alt = ''
}) {
  // Builds the target view.
  return (
    (
      typeof fileName === "string" &&
      fileName.trim ().length > 0 &&
      typeof root == "string" &&
      root.trim ().length > 0
    ) ? `
      <img
        class = "${className}"
        height = "${height}"
        title = "${title}"
        width = "${width}"
        id = "${idName}"
        name = "${name}"
        alt = "${alt}"
        src = "${
          clearStr ({
            clearSpaces: true,
            input: `
              ../../../../../assets/
              ${root}/${fileName}
            `
          })
        }"
      />
    ` : ''
  );
}

/**
 * @description Builds image view.
 * @param {{
 *  data?: Object<String, String>=,
 *  fileName: String
 * }} configs The data configs to
 *  create the target element. It
 *  supports the following keys:
 *
 *  - String fileName: The target
 *    image file's name in app
 *    assets.
 *
 *  - Object data: The created tag
 *    attributes.
 * @function buildIcon
 * @public
 * @returns {String} String
*/
function buildImage ({
  fileName = '',
  data = {}
}) {
  // Builds the target image.
  return buildView_ ({
    root: "images",
    fileName,
    ...data
  });
}

/**
 * @description Builds icon view.
 * @param {{
 *  data?: Object<String, String>=,
 *  fileName: String
 * }} configs The data configs to
 *  create the target element. It
 *  supports the following keys:
 *
 *  - String fileName: The target
 *    icon file's name in app
 *    assets.
 *
 *  - Object data: The created tag
 *    attributes.
 * @function buildIcon
 * @public
 * @returns {String} String
 */
function buildIcon ({
  fileName = '',
  data = {}
}) {
  // Builds the target icon.
  return buildView_ ({
    root: "icons",
    fileName,
    ...data
  });
}

/**
 * @description Builds logo view.
 * @param {{
 *  data?: Object<String, String>=,
 *  fileName: String
 * }} configs The data configs to
 *  create the target element. It
 *  supports the following keys:
 *
 *  - String fileName: The target
 *    logo file's name in app
 *    assets.
 *
 *  - Object data: The created
 *    tag attributes.
 * @function buildIcon
 * @public
 * @returns {String} String
 */
function buildLogo ({
  fileName = '',
  data = {}
}) {
  // Builds the target logo.
  return buildView_ ({
    root: "logos",
    fileName,
    ...data
  });
}

/** 
 * @description Exports all
 *  public features.
 * @exports *
 */
export {
  buildImage,
  buildIcon,
  buildLogo,
  Images,
  Icons,
  Logos
};
