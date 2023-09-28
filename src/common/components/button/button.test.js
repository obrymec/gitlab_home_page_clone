/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @fileoverview Defines tests process for button.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @file button.test.js
* @created 2023-09-21
* @updated 2023-09-28
* @version 0.0.1
* @type {Button}
*/

// Custom dependencies.
import {clearStr} from "../../utilities/string/string.js";
import {buildButton, buildFlatButton} from "./button.js";

// Node plugin dependencies.
import expect from "expect.js";

// Button component methods test.
describe ("Button", function () {
  // Tests `buildButton` method.
  it (
    "`buildButton` method test.",
    function () {
      // The generated button.
      const button = clearStr ({
        input: buildButton ({
          title: "A simple button.",
          idName: "button-test",
          text: "Click Me !",
          withIcon: false
        })
      });
      // Must not have img tag.
      expect (button).not.contain (
        "img"
      );
      // Must contain button tag.
      expect (button).contain (
        "button"
      );
      // Must have title attr.
      expect (button).contain (
        "title"
      );
      // Must contain span tag.
      expect (button).contain (
        "span"
      );
      // Must have id attr.
      expect (button).contain (
        "id"
      );
    }
  );
  // Tests `buildFlatButton` method.
  it (
    "`buildFlatButton` method test.",
    function () {
      // The generated flat button.
      const flatButton = clearStr ({
        input: buildFlatButton ({
          title: "A simple flat button.",
          idName: "flat-button-test",
          text: "Click me please !"
        })
      });
      // Must contain button tag.
      expect (flatButton).contain (
        "button"
      );
      // Must have title attr.
      expect (flatButton).contain (
        "title"
      );
      // Must contain span tag.
      expect (flatButton).contain (
        "span"
      );
      // Must have name attr
      // with an empty value.
      expect (flatButton).contain (
        "name"
      );
      // Must not have img tag.
      expect (flatButton).contain (
        "img"
      );
      // Must have id attr.
      expect (flatButton).contain (
        "id"
      );
    }
  );
});
