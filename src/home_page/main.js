/**
* @fileoverview Imports and manages available
*		tools to build home page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-08-31
* @version 0.0.6
* @file main.js
*/

// Custom dependencies.
import {Collaborators} from "./components/collaborators/collaborators.js";
import {Methodologies} from "./components/methodologies/methodologies.js";
import {Customers} from "./components/customers/customers.js";
import {Resources} from "./components/resources/resources.js";
import {Services} from "./components/services/services.js";
import {Pricing} from "./components/pricing/pricing.js";
import {NavBar} from "./components/navbar/navbar.js";
import {Banner} from "./components/banner/banner.js";
import {Badges} from "./components/badges/badges.js";
import {Footer} from "./components/footer/footer.js";
import {FAQ} from "./components/faq/faq.js";

// Builds navbar section.
// new NavBar ().render ();
// Builds banner section.
new Banner ().render ();
// // Builds customers section.
new Customers ().render ();
// // Builds services section.
new Services ().render ();
// Builds collaborators section.
new Collaborators ().render ();
// // Builds methodologies section.
// new Methodologies ().render ();
// // Builds badges section.
// new Badges ().render ();
// // Builds pricing section.
// new Pricing ().render ();
// // Builds resources section.
// new Resources ().render ();
// // Builds faq section.
// new FAQ ().render ();
// // Buidls footer section.
new Footer ().render ();
