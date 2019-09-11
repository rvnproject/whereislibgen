# WhereIsLibgen

Fetches the URLs currently [listed on WikiData as working for Libgen](https://www.wikidata.org/wiki/Q22017206),
and hosts a webpage listing those URLs (and a service to automatically redirect the visitor to those URLs at `/go`),
and that is always up-to-date with whatever Libgen URLs are currently valid.
Try it out at https://whereislibgen.now.sh/.

## Running Locally

Make sure you have [Node](http://nodejs.org/) installed.

```sh
$ git clone git@github.com:rvnproject/whereislibgen.git # or clone your own fork
$ cd whereislibgen
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Now.sh

You can deploy it to [Now.sh](https://zeit.co/now) using the following command.
Note that you need your own account there (you will be asked to create one when
running the command), and that it will be deployed to a separate subdomain.

```
$ npx now
```

(`npx` [is provided by the Node package manager](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).)

## Navigating the source code

The app is written in Javascript and is really quite simple. It consists of a
single file, [index.html](/index.html). The meat of the application is the
function `getUrls` at the bottom of the file, which fetches the current Libgen
URLs from WikiData (using [SPARQL](https://www.wikidata.org/wiki/Wikidata:SPARQL_tutorial)).

It also starts a small web server using [Express](https://expressjs.com/), to
serve the following endpoints:

- `/favicon.ico` - the [Favicon](https://en.wikipedia.org/wiki/Favicon)
- `/api` - providing the list of URLs as [JSON](https://en.wikipedia.org/wiki/JSON)
- `/go` - directly redirect the user to the URL currently listed on WikiData as preferred
- `/go/*` - directly redirect the user to the preferred URL, passing on anything beind `/go/` to that URL. This allows users to e.g. directly append a DOI or a link to an article to find it on Libgen.
- `/` - a simple HTML page listing the URLs for human consumption, and providing links to e.g. this source code :)
