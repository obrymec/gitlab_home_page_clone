/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @fileoverview Defines tests process for image, logo and icon view.
* @author Obrymec - obrymecsprinces@gmail.com
* @file icon_logo_image.test.js
* @supported DESKTOP, MOBILE
* @type {IconLogoImage}
* @created 2023-09-21
* @updated 2023-09-28
* @version 0.0.1
*/

// Custom dependencies.
import {clearStr} from "../../utilities/string/string.js";
import {
  buildImage,
  buildIcon,
  buildLogo,
  Images,
  Icons,
  Logos
} from "./icon_logo_image.js";

// Node plugin dependencies.
import expect from "expect.js";

// IconLogoImage component methods test.
describe ("IconLogoImage", function () {
  // Tests `buildImage` method.
  it (
    "`buildImage` method test.",
    function () {
      // The generated image.
      const image = clearStr ({
        input: buildImage ({
          fileName: Images.BADGE_6,
          data: {
            className: "img-class",
            title: "GitLab badge.",
            alt: "A GitLab badge.",
            idName: "img-test",
            height: 128,
            width: 128
          }
        })
      });
      // Must be an empty string.
      expect (
        buildImage ({})
      ).be.eql ('');
      // Must use `images` as
      // the root folder.
      expect (image).contain (
        "images"
      );
      // Must have height attr.
      expect (image).contain (
        "height"
      );
      // Must have width attr.
      expect (image).contain (
        "width"
      );
      // Must have title attr.
      expect (image).contain (
        "title"
      );
      // Must have class attr.
      expect (image).contain (
        "class"
      );
      // Must have alt attr.
      expect (image).contain (
        "alt"
      );
      // Must have an img tag.
      expect (image).contain (
        "img"
      );
      // Must have id attr.
      expect (image).contain (
        "id"
      );
    }
  );
  // Tests `buildIcon` method.
  it (
    "`buildIcon` method test.",
    function () {
      // The generated icon.
      const icon = clearStr ({
        input: buildIcon ({
          fileName: Icons.CERTIFICATE,
          data: {
            className: "icon-class",
            title: "A certificate.",
            alt: "Certification.",
            idName: "icon-test",
            height: 48,
            width: 48
          }
        })
      });
      // Must be an empty string.
      expect (
        buildIcon ({})
      ).be.eql ('');
      // Must use `icons` as the
      // root folder.
      expect (icon).contain (
        "icons"
      );
      // Must have height attr.
      expect (icon).contain (
        "height"
      );
      // Must have width attr.
      expect (icon).contain (
        "width"
      );
      // Must have title attr.
      expect (icon).contain (
        "title"
      );
      // Must have class attr.
      expect (icon).contain (
        "class"
      );
      // Must have alt attr.
      expect (icon).contain (
        "alt"
      );
      // Must have an img tag.
      expect (icon).contain (
        "img"
      );
      // Must have id attr.
      expect (icon).contain (
        "id"
      );
    }
  );
  // Tests `buildLogo` method.
  it (
    "`buildLogo` method test.",
    function () {
      // The generated icon.
      const logo = clearStr ({
        input: buildLogo ({
          fileName: Logos.GITLAB,
          data: {
            title: "A GitLab logog.",
            className: "logo-class",
            alt: "GitLab logo.",
            idName: "logo-test",
            height: 96,
            width: 96
          }
        })
      });
      // Must be an empty string.
      expect (
        buildIcon ({})
      ).be.eql ('');
      // Must use `logos` as the
      // root folder.
      expect (logo).contain (
        "logos"
      );
      // Must have height attr.
      expect (logo).contain (
        "height"
      );
      // Must have width attr.
      expect (logo).contain (
        "width"
      );
      // Must have title attr.
      expect (logo).contain (
        "title"
      );
      // Must have class attr.
      expect (logo).contain (
        "class"
      );
      // Must have alt attr.
      expect (logo).contain (
        "alt"
      );
      // Must have an img tag.
      expect (logo).contain (
        "img"
      );
      // Must have id attr.
      expect (logo).contain (
        "id"
      );
    }
  );
});
