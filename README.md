#ng-fetch

We start to implement ng-fetch (new generation - fetch), because the normal fetch api is not able to add missing features, for YEARS ....
like upload, download progress ... and cancel requests. I want to have an lib that i can use in node and on the browser.

So we used polyfills:

Browser:
- Buffer

Node
- FormData / File

everything here is open-source :), be free to be part of it.

TODO: all features description
TODO: add more examples

###Simple example (node and browser)

_response object always has_

**status**: http status code // negative codes if exception is raised

**headers**: response headers

**response**: response content as buffer

**special if you use multipart/form-data**


add specific polyfill for runtime

```ts
// for browser add node buffer to browser
import 'ng-fetch/browser';

// for node add browser formdata, file, blob to node
import 'ng-fetch/node';
```

```ts
import ngFetch from 'ng-fetch';

(async () => {
    const apiResponse = await ngFetch('http://api.plos.org/search?q=title:DNA');
    /*
     * Show response {
     * status: 200,
     * headers: {
     *   date: 'Sat, 01 May 2021 21:40:39 GMT',
     *   'content-type': 'application/json;charset=utf-8',
     *   'content-length': '19284',
     *   connection: 'close',
     *   'last-modified': 'Fri, 30 Apr 2021 22:20:02 GMT',
     *   etag: '"ZjljNjQwMDAwMDAwMDAwMFNvbHI="'
     * },
     * response: <Buffer 7b 0a 20 20 22 72 65 73 70 6f 6e 73 65 22 3a 7b 22 6e 75 6d 46 6f 75 6e 64 22 3a 35
     *   34 30 38 2c 22 73 74 61 72 74 22 3a 30 2c 22 6d 61 78 53 63 6f 72 ... 19234 more bytes>
     * }
     */
    console.log('Show response object', apiResponse);
    const content = JSON.parse(apiResponse.response.toString());

    /*
     * Show api response content {
     * response: {
     *   numFound: 5408,
     *   start: 0,
     *   maxScore: 6.5337167,
     *   docs: [
     *     [Object], [Object],
     *     [Object], [Object],
     *     [Object], [Object],
     *     [Object], [Object],
     *     [Object], [Object]
     *   ]
     *  }
     * }
     */
    console.log('Show api response content', content);
})();
```


