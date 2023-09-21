/**
* @fileoverview Defines tests process for browser
*  module.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @file browser.test.js
* @created 2023-09-21
* @updated 2023-09-21
* @type {Browser}
* @version 0.0.1
*/

// Custom dependencies.
import {clearStr} from "../string/string.js";
import {listenLoadEvent} from "./browser.js";
import {
  buildImage,
  Images
} from "../../components/icon_logo_image/icon_logo_image.js";

// Node plugin dependencies.
import MockBrowser from "mock-browser/lib/MockBrowser.js";

// Browser module methods test.
describe ("Browser", function () {
  // Creates a fake browser.
  const browser = new MockBrowser ();
  // The fake document.
  const document = (
    browser.getDocument ()
  );
  // Tests `listenLoadEvent` method.
  it (
    "`listenLoadEvent` method test.",
    function () {
      // Creates a section tag.
      const section = (
        document.createElement (
          "section"
        )
      );
      // Adds (04) children.
      section.innerHTML = clearStr ({
        input: `
          ${buildImage ({
            fileName: (
              Images.LAKSHMI_VENKATRAMA
            )
          })}
          ${buildImage ({
            fileName: (
              Images.JASON_MANOHARAN
            )
          })}
          ${buildImage ({
            fileName: (
              Images.EVANO_CONNOR
            )
          })}
          ${buildImage ({
            fileName: (
              Images.HOHN_ALAN
            )
          })}
        `
      });
      // Listens load event on
      // every images inside
      // the section tag.
      listenLoadEvent ({
        tags: section.children
      });
    }
  );
});
