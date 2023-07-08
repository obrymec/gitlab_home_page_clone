/**
* @fileoverview Imports and manages available tools to build home page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-07-06
* @version 0.0.1
* @file main.js
*/

// Custom dependencies.
import {Collaborators} from "./common/components/collaborators/collaborators.js";
import {Methodologies} from "./common/components/methodologies/methodologies.js";
import {Customers} from "./common/components/customers/customers.js"
import {Services} from "./common/components/services/services.js";
import {NavBar} from "./common/components/navbar/navbar.js";
import {Banner} from "./common/components/banner/banner.js";

// Creates a new instance
// of nav bar.
const navbar = new NavBar ({
	parentId: "main#root"
});
// Creates a new instance
// of banner.
const banner = new Banner ({
	parentId: "main#root"
});
// Creates a new instance
// of customers.
const customers = (
	new Customers ({
		parentId: "main#root"
	})
);
// Creates a new instance
// of services.
const services = (
	new Services ({
		parentId: "main#root"
	})
);
// Creates a new instance
// of collaborators.
const collaborators = (
	new Collaborators ({
		parentId: "main#root"
	})
);
// Creates a new instance
// of industry methodologies.
const methodologies = (
	new Methodologies ({
		parentId: "main#root"
	})
);

// Builds nav bar.
navbar.render ();
// Builds banner.
banner.render ();
// Builds customers
// logos support.
customers.render ();
// Builds provided
// services support.
services.render ();
// Builds collaborators.
collaborators.render ();
// Builds methodologies.
methodologies.render ();
