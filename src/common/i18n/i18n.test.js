/**
* @fileoverview Defines tests process for i18n
*  module.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-09-21
* @updated 2023-09-21
* @file i18n.test.js
* @version 0.0.1
* @type {I18n}
*/

// Custom dependencies.
import english from "./english.js";
import french from "./french.js";

// Node plugin dependencies.
import expect from "expect.js";

// I18n module methods test.
describe ("I18n", function () {
  // Tests `english` object content.
  it (
    "`english` object content test.",
    function () {
      // The english keys.
      const keys = Object.keys (
        english
      );
      // Must have (03) keys.
      expect (keys).to.length (3);
      // Must have `keywords` key.
      expect (keys).to.contain (
        "keywords"
      );
      // Must have `name` key.
      expect (keys).to.contain (
        "name"
      );
      // Must have `data` key.
      expect (keys).to.contain (
        "data"
      );
      // Must not be an array.
      expect (
        english
      ).not.to.be.an (Array);
      // `data` key should not
      // be an array.
      expect (
        english.data
      ).not.to.be.an (Array);
      // Must be an object.
      expect (
        english
      ).to.be.an (Object);
      // `data` key should be
      // an object.
      expect (
        english.data
      ).to.be.an (Object);
      // `keywords` key should
      // be an array.
      expect (
        english.keywords
      ).to.be.an (Array);
      // `name` key should be
      // a string.
      expect (
        english.name
      ).equal ("english");
    }
  );
  // Tests `french` object content.
  it (
    "`french` object content test.",
    function () {
      // The french keys.
      const keys = Object.keys (
        french
      );
      // Must have (03) keys.
      expect (keys).to.length (3);
      // Must have `keywords` key.
      expect (keys).to.contain (
        "keywords"
      );
      // Must have `name` key.
      expect (keys).to.contain (
        "name"
      );
      // Must have `data` key.
      expect (keys).to.contain (
        "data"
      );
      // Must not be an array.
      expect (
        french
      ).not.to.be.an (Array);
      // `data` key should not
      // be an array.
      expect (
        french.data
      ).not.to.be.an (Array);
      // Must be an object.
      expect (
        french
      ).to.be.an (Object);
      // `data` key should be
      // an object.
      expect (
        french.data
      ).to.be.an (Object);
      // `keywords` key should
      // be an array.
      expect (
        french.keywords
      ).to.be.an (Array);
      // `name` key should be
      // a string.
      expect (
        french.name
      ).equal ("french");
    }
  );
});
