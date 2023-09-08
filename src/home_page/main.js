/**
* @fileoverview Imports and manages available
*		components to build home page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-09-08
* @version 0.0.7
* @file main.js
*/

// Custom dependencies.
import {Collaborators} from "./components/collaborators/collaborators.js";
import {Methodologies} from "./components/methodologies/methodologies.js";
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

// Global attributes.
window.store = Redux.createStore ((
  currentState = {
    collaborators: new Collaborators (),
    methodologies: new Methodologies (),
    customers: new Customers (),
    resources: new Resources (),
    services: new Services (),
    pricing: new Pricing (),
    navbar: new NavBar (),
    banner: new Banner (),
    badges: new Badges (),
    footer: new Footer (),
    faq: new FAQ (),
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
  // Returns the current
  // state's data.
  return currentState;
});

// The current global state.
const state = window.store.getState ();
// Builds navbar section.
state.navbar.render ();
// Builds banner section.
// state.banner.render ();
// Builds customers section.
// state.customers.render ();
// Builds services section.
// state.services.render ();
// Builds collaborators section.
state.collaborators.render ();
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
// state.footer.render ();
