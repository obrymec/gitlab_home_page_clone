/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @fileoverview Defines the service worker to
*  manage application when it's offline.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @file service_worker.js
* @created 2023-09-23
* @updated 2023-09-29
* @version 0.0.1
*/

// Attributes.
const catchName = "gitlab-clone-v1";
const staticAssets = [
  "./src/home_page/main.js",
  "./manifest.json",
  "./index.html",
  "./style.css",
  "./"
];

// Listens `activate` event.
self.addEventListener (
  "activate", () => {
    // Claims clients.
    self.clients.claim ();
  }
);

// Listens `install` event.
self.addEventListener (
  "install", async () => {
    // Creates a cache for
    // the project for
    // offline case.
    const cache = (
      await caches.open (
        catchName
      )
    );
    // Adds all statics assets
    // files path to the
    // created cache.
    await cache.addAll (
      staticAssets
    );
    // Returns the state.
    return self.skipWaiting ();
  }
);

// Listens `fetch` event.
self.addEventListener (
  "fetch", async event => {
    // The request to do.
    const req = event.request;
    // The request url.
    const url = new URL (
      req.url
    );
    // Whether there are
    // a match.
    if (
      url.origin === 
        location.origin
    ) {
      // Sends a response.
      event.respondWith (
        cacheFirst_ (req)
      );
    // Otherwise.
    } else {
      // Sends another
      // response.
      event.respondWith (
        networkAndCache_ (req)
      );
    }
  }
);

/**
 * @description Checks whether
 *  our created cache exists.
 * @param {Request} req The
 *  request that is performed.
 * @function cacheFirst_
 * @private {Function}
 * @async
 * @returns {
 *  Response|Promise<Response>
 * } Response | Promise
 */
async function cacheFirst_ (
  req
) {
  // The created cache
  // data.
  const cache = (
    await caches.open (
      catchName
    )
  );
  // The cached data.
  const cached = (
    await cache.match (
      req
    )
  );
  // Returns the final
  // result that pass
  // this test.
  return (
    cached || fetch (req)
  );
}

/**
 * @description Returns the data
 *  defined into the created
 *  cache.
 * @param {Request} req The
 *  request that is performed.
 * @function networkAndCache_
 * @private {Function}
 * @async
 * @returns {Response} Response
 */
async function networkAndCache_ (
  req
) {
  // The created cache
  // data.
  const cache = (
    await caches.open (
      catchName
    )
  );
  // Tries the following
  // lines of code.
  try {
    // The fetched data.
    const fresh = (
      await fetch (req)
    );
    // Gets response clone.
    await cache.put (
      req, fresh.clone ()
    );
    // Returns the final
    // result.
    return fresh;
  // An error occurred
  } catch (exp) {
    // The cached data.
    const cached = (
      await cache.match (
        req
      )
    );
    // Returns the final
    // result.
    return cached;
  }
}
