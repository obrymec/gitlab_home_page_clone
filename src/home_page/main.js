/**
* @fileoverview Imports and manages available
*		tools to build home page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-09-06
* @version 0.0.7
* @file main.js
*/

// Custom dependencies.
import {Collaborators} from "./components/collaborators/collaborators.js";
import {Methodologies} from "./components/methodologies/methodologies.js";
import {listenLoadEvent} from "../common/utilities/browser/browser.js";
import {Customers} from "./components/customers/customers.js";
import {Resources} from "./components/resources/resources.js";
import lang from "../common/utilities/language/language.js";
import {Services} from "./components/services/services.js";
import {Pricing} from "./components/pricing/pricing.js";
import {NavBar} from "./components/navbar/navbar.js";
import {Banner} from "./components/banner/banner.js";
import {Badges} from "./components/badges/badges.js";
import {Footer} from "./components/footer/footer.js";
import {FAQ} from "./components/faq/faq.js";
import {
  stopAutoScrolling,
  autoScroll
} from "../common/utilities/scroll/scroll.js";

// Global attributes.
window.store = Redux.createStore ((
  currentState = {
    processId: null,
    activeLanguage: (
      lang.getActiveLanguage ()
        .name
    )
  },
  action
) => {
  // Whether action's type is
  // equal to `SET_LANGUAGE`.
  if (
    action.type === "SET_LANGUAGE"
  ) {
    // Sets the global state data.
    currentState.activeLanguage = (
      action.payload
    );
    // Changes active language.
    lang.setActiveLanguage (
      action.payload
    );
  }
  // Whether redux starts.
  if (
    action.type.startsWith (
      "@@redux/INIT"
    )
  ) {
    // Listens `scroll` event.
    window.addEventListener (
      "scroll", (e) => {
        // console.log (e);
        // Whether the process
        // is running.
        // if (processId != null) {
        //   // Destroy auto scroll
        //   // background process.
        //   stopAutoScrolling (
        //     processId
        //   );
        // }
      }
    );
    // When html, css and js
    // are loaded and ready.
    // window.addEventListener (
    //   "DOMContentLoaded",
    //   () => listenLoadEvent ({
    //     tags: (
    //       document
    //         .querySelectorAll ("img")
    //     ),
    //     onReady: () => {
    //       // Starts auto scroll program.
    //       currentState.processId = (
    //         autoScroll ({
    //           interval: 6000,
    //           infinite: true,
    //           tagIds: [
    //             "section.banner",
    //             "section.customers",
    //             "section.services",
    //             "section.collaborators",
    //             "section.methodologies",
    //             "section.badges",
    //             "section.pricing",
    //             "section.resources",
    //             "section.faq",
    //             "section.footer"
    //           ]
    //         })
    //       );
    //     }
    //   })
    // );
  }
  // Returns the current
  // state's data.
  return currentState;
});

// Builds navbar section.
new NavBar ().render ();
// Builds banner section.
new Banner ().render ();
// Builds customers section.
new Customers ().render ();
// Builds services section.
// new Services ().render ();
// Builds collaborators section.
// new Collaborators ().render ();
// Builds methodologies section.
// new Methodologies ().render ();
// Builds badges section.
// new Badges ().render ();
// Builds pricing section.
// new Pricing ().render ();
// Builds resources section.
// new Resources ().render ();
// Builds faq section.
// new FAQ ().render ();
// Builds footer section.
// new Footer ().render ();
