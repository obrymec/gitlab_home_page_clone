/**
* @fileoverview Imports and manages available
*		tools to build home page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-08-03
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
new NavBar ().render ();
// Builds banner section.
// new Banner ({parentId: "main"}).render ();
// // Builds customers section.
// new Customers ({parentId: "main"}).render ();
// // Builds services section.
// new Services ({parentId: "main"}).render ();
// // Builds collaborators section.
// new Collaborators ({parentId: "main"}).render ();
// // Builds methodologies section.
// new Methodologies ({parentId: "main"}).render ();
// // Builds badges section.
// new Badges ({parentId: "main"}).render ();
// // Builds pricing section.
// new Pricing ({parentId: "main"}).render ();
// // Builds resources section.
// new Resources ({parentId: "main"}).render ();
// // Builds faq section.
// new FAQ ({parentId: "main"}).render ();
// // Buidls footer section.
// new Footer ({parentId: "main"}).render ();
