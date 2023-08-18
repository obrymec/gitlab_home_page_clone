/**
* @fileoverview Defines a function as class to
*   manage application global languages.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2021-07-28
* @updated 2023-08-19
* @file language.js
* @type {Language}
* @version 0.0.1
*/

// Custom dependencies.
import {getCookie, setCookie} from "../browser/browser.js";
import english from "../../i18n/english.js";

/**
 * @classdesc Languages manager.
 * @param {{
 *  defaultLanguage: int,
 *  cookieName: String,
 *  languages: Array<{
 *    data: Object<String, String>=,
 *    keywords: Array<String>,
 *    name: String,
 *    id: int
 *  }>
 * }} configs The manager's data
 *  configurations. It supports
 *  the following keys:
 *
 *  - String cookieName: The cookie's
 *    name to save inside browser.
 *
 *  - int defaultLanguage: The index
 *    of the default language to
 *    used from supported
 *    languages list.
 *
 *  - Array languages: The supported
 *    languages list.
 * @type {Language}
 * @public
 * @class
 * @returns {Language} Language
 */
function Language ({
  defaultLanguage = -1,
  cookieName = "none",
  languages = []
}) {
  // Attributes.
  /**
   * @description The active
   *  language's id.
   * @private {?int=}
   * @field
   */
  let activeId_ = null;

  /**
   * @description Returns the target
   *  language's data.
   * @param {String} id The fetched
   *  language's id from browser's
   *  cookies.
   * @function fetchLanguage_
   * @private {Function}
   * @returns {?{
   *  data: Object<String, String>,
   *  keywords: Array<String>,
   *  name: String,
   *  id: int
   * }} ?Object
   */
  const fetchLanguage_ = id => {
    // Updates cache.
    activeId_ = parseInt (id);
    // Returns the target
    // language's data.
    return (
      languages?.length > 0
      ? Object.assign (
        languages[activeId_],
        {id: activeId_}
      ) : null
    );
  };

  /**
   * @description Checks whether an
   *  element's index is valid with
   *  available languages list.
   * @param {int} index The item's
   *  position index.
   * @function isValidIndex_
   * @private {Function}
   * @returns {boolean} boolean
   */
  const isValidIndex_ = index => {
    // Whether index is valid.
    if (
      Number.isInteger (index)
      && index < languages?.length
      && index > -1
    ) {
      // It's fine.
      return true;
    // Otherwise.
    } else {
      // The index is out
      // of range.
      throw new Error (`
        The target language
        doesn't exist.
      `);
    }
  };

  /**
   * @description Checks whether the
   *  passed `key` is defined inside
   *  the active language's data.
   * @param {{
   *  data: Object<String, any>,
   *  key: String
   * }} configs The search data
   *  configurations. It supports
   *  the following keys:
   *
   *  - String key: The key's name.
   *
   *  - Object data: The target
   *    language's data.
   * @private {Function}
   * @function has_
   * @returns {boolean} boolean
   */
  const has_ = ({key, data}) => {
    // Whether the key is a string.
    if (
      typeof key === "string"
      && key.trim ().length > 0
    ) {
      // Returns the test result.
      return (
        data?.hasOwnProperty (key)
      );
    // Otherwise.
    } else {
      // Invalid key format type.
      throw new Error (`
        The given key's name
        must be a non empty
        String.
      `);
    }
  };

  /**
   * @description Checks whether the
   *  passed `key` is defined inside
   *  the active language's data.
   * @param {String} key The key's
   *  name. 
   * @function hasKey
   * @public
   * @returns {boolean} boolean
   */
  this.hasKey = key => has_ ({
    key,
    data: (
      this.getActiveLanguage ()
        ?.data
    )
  });

  /**
   * @description Returns available
   *  languages list.
   * @function getLanguages
   * @public
   * @returns {Array<{
   *  data: Object<String, String>,
   *  keywords: Array<String>,
   *  name: String,
   *  id: int
   * }>} Array
   */
  this.getLanguages = () => (
    languages.map (
      (language, id) => (
        Object.assign (
          language, {id}
        )
      )
    )
  );

  /**
   * @description Returns language's
   *  text according to the given key.
   * @param {String} key The key's name
   *  associated to the returned text.
   * @function getText
   * @public
   * @returns {?String} ?String
   */
  this.getText = key => {
    // The fetched active language's
    // data.
    const {data} = (
      this.getActiveLanguage ()
    );
    // Whether data has the
    // passed key.
    if (has_ ({key, data})) {
      // Returns key's value.
      return data[key];
    }
    // Returns `null` for
    // others cases.
    return null;
  }

  /**
   * @description Checks whether the
   *  given `keys` are defined inside
   *  the active language's data.
   * @param {Array<String>} keys The
   *  key's names list. 
   * @function hasKeys
   * @public
   * @returns {boolean} boolean
   */
  this.hasKeys = keys => {
    // Whether the given key(s)
    // is an array.
    if (Array.isArray (keys)) {
      // The fetched active
      // language's data.
      const {data} = (
        this.getActiveLanguage ()
      );
      // Checking key(s) existance.
      for (const key of keys) {
        // Whether ever least
        // key isn't defined.
        if (!has_ ({key, data})) {
          // Returns `false`.
          return false;
        }
      }
      // All key(s) are defined.
      return true;
    // Otherwise.
    } else {
      // Invalid keys format type.
      throw new Error (`
        The given key's name(s)
        must be an array of
        String(s).
      `);
    }
  }

  /**
   * @description Returns the active
   *  language data.
   * @function getActiveLanguage
   * @public
   * @returns {?{
   *  data: Object<String, String>,
   *  keywords: Array<String>,
   *  name: String,
   *  id: int
   * }} ?Object
   */
  this.getActiveLanguage = () => {
    // The saved active language
    // inside navigator cookies.
    const id = (
      getCookie (
        cookieName.toString ()
      )
    );
    // Whether no active language
    // is in cache.
    if (activeId_ == null) {
      // Whether an active language
      // is saved inside cookies.
      if (typeof id === "string") {
        // Fetches the target 
        // language's data.
        return fetchLanguage_ (id);
      // Whether the passed default
      // language exists.
      } else if (
        isValidIndex_ (defaultLanguage)
      ) {
        // Returns the default language's
        // data by default.
        return (
          languages?.length > 0
          ? Object.assign (
            languages[defaultLanguage],
            {id: defaultLanguage}
          ) : null
        );
      }
    // Otherwise.
    } else {
      // Whether an active language
      // is saved inside cookies.
      if (typeof id === "string") {
        // Fetches the target 
        // language's data.
        return fetchLanguage_ (id);
      // Whether the passed default
      // language exists.
      } else {
        // Returns the target
        // language's data.
        return (
          languages?.length > 0
          ? Object.assign (
            languages[activeId_],
            {id: activeId_}
          ) : null
        );
      }
    }
  }

  /**
   * @description Overrides the active
   *  language inside browser's cookies.
   * @param {String|int} id The target
   *  language's id.
   * @function setActiveLanguage
   * @public
   * @returns {void} void
   */
  this.setActiveLanguage = id => {
    // Whether id is an integer.
    if (Number.isInteger (id)) {
      // Whether the passed id
      // is valid.
      if (isValidIndex_ (id)) {
        // Updates browser cookie
        // to the new active
        // language.
        setCookie (
          cookieName.toString (),
          id.toString ()
        );
      }
    // Otherwise.
    } else {
      // Transforms the given
      // id into string.
      id = (
        id.toString ()
          .toLowerCase ()
          .trim ()
      );
      // Searching the target
      // language.
      for (
        let y = 0;
        y < languages?.length;
        y++
      ) {
        // Whether ever there
        // are a match with
        // the language's name.
        const matchName = (
          languages[y]?.name
            ?.toLowerCase ()
            ?.trim ()
            ?.includes (id)
        );
        // Whether ever there are
        // a match with the
        // language's keywords.
        const matchKeywords = (
          languages[y]?.keywords
            ?.indexOf (id) > -1
        );
        // Whether least matches
        // pass the test.
        if (
          matchKeywords
          || matchName
        ) {
          // Updates browser cookie
          // to the new active
          // language.
          setCookie (
            cookieName.toString (),
            y.toString ()
          );
          // Gets out of the for
          // loop.
          break;
        }
      }
    }
  }
}

/**
 * @description Exports an object
 *  instance of this class by
 *  default.
 * @exports Language
 */
export default new Language ({
  cookieName: "gitlabCloneAL",
  languages: [english],
  defaultLanguage: 0
});
