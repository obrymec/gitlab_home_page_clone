/**
* @fileoverview Imports and manages available
*		tools to build home page.
* @author Obrymec - obrymecsprinces@gmail.com
* @project GitLab - https://www.google.com
* @supported DESKTOP, MOBILE
* @created 2023-06-16
* @updated 2023-07-21
* @version 0.0.5
* @file main.js
*/

// Custom dependencies.
import {Collaborators} from "./common/components/collaborators/collaborators.js";
import {Methodologies} from "./common/components/methodologies/methodologies.js";
import {Customers} from "./common/components/customers/customers.js";
import {Resources} from "./common/components/resources/resources.js";
import {Services} from "./common/components/services/services.js";
import {NavBar} from "./common/components/navbar/navbar.js";
import {Banner} from "./common/components/banner/banner.js";
import {Badges} from "./common/components/badges/badges.js";
import {Footer} from "./common/components/footer/footer.js";
import {FAQ} from "./common/components/faq/faq.js";

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
// Creates a new instance
// of badges.
const badges = new Badges ({
	parentId: "main#root"
});
// Creates a new instance
// of resources.
const resources = (
	new Resources ({
		parentId: "main#root"
	})
);
// Creates a new instance
// of FAQ section.
const faq = new FAQ ({
	parentId: "main#root"
});
// Creates a new instance
// of footer section.
const footer = new Footer ({
	parentId: "main#root"
});

// Builds navbar section.
navbar.render ();
// Builds banner section.
banner.render ();
// Builds customers section.
customers.render ();
// Builds services section.
services.render ();
// Builds collaborators section.
collaborators.render ();
// Builds methodologies section.
methodologies.render ();
// Builds badges section.
badges.render ();
// Builds resources section.
resources.render ();
// Builds faq section.
faq.render ();
// Buidls footer section.
footer.render ();
