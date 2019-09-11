const fetch = require('node-fetch');

const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const { URL } = require('url');
const PORT = process.env.PORT || 5000

express()
  .use(favicon(path.join(__dirname, 'favicon.ico')))
  .get('/api', (req, res) => getUrls().then((urls) => res.send(urls)))
  .get('/go', (req, res) => getUrls().then((urls) => res.redirect(urls[0])))
  .get('/go/*', (req, res) => getUrls().then((urls) => {
    const url = new URL(encodeURIComponent(req.params[0]), urls[0]);
    res.redirect(url.toString());
  }))
  .get('/', async (req, res) => {
    if (req.hostname === 'whereislibgen.herokuapp.com') {
      return res.redirect('https://whereislibgen.now.sh/');
    }
    const urls = await getUrls();

    const list = urls.slice(1).map(url => {
      return `<li><a href="${url}">${url}</a></li>`;
    }).join('');

    const page = `
<html>
    <head>
      <title>Where is Libgen now?</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
// Relevant Bulma styles:
body,hr,html,li,p,ul{margin:0;padding:0}ul{list-style:none}html{-webkit-box-sizing:border-box;box-sizing:border-box}*{-webkit-box-sizing:inherit;box-sizing:inherit}:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}html{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}aside,footer{display:block}body{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif}body{color:#4a4a4a;font-size:1rem;font-weight:400;line-height:1.5}a{color:#3273dc;cursor:pointer;text-decoration:none}a:hover{color:#363636}hr{background-color:#dbdbdb;border:none;display:block;height:1px;margin:1.5rem 0}strong{color:#363636;font-weight:700}.button.is-focused:not(:active),.button:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(50,115,220,.25);box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.button.is-white.is-focused:not(:active),.button.is-white:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(255,255,255,.25);box-shadow:0 0 0 .125em rgba(255,255,255,.25)}.button.is-black.is-focused:not(:active),.button.is-black:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(10,10,10,.25);box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.button.is-light.is-focused:not(:active),.button.is-light:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(245,245,245,.25);box-shadow:0 0 0 .125em rgba(245,245,245,.25)}.button.is-dark.is-focused:not(:active),.button.is-dark:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(54,54,54,.25);box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.button.is-primary.is-focused:not(:active),.button.is-primary:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(0,209,178,.25);box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.button.is-link.is-focused:not(:active),.button.is-link:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(50,115,220,.25);box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.button.is-info.is-focused:not(:active),.button.is-info:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(32,156,238,.25);box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.button.is-success.is-focused:not(:active),.button.is-success:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(35,209,96,.25);box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.button.is-warning.is-focused:not(:active),.button.is-warning:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(255,221,87,.25);box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.button.is-danger.is-focused:not(:active),.button.is-danger:focus:not(:active){-webkit-box-shadow:0 0 0 .125em rgba(255,56,96,.25);box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.container{margin:0 auto;position:relative}@media screen and (min-width:1024px){.container{max-width:960px;width:960px}}@media screen and (min-width:1216px){.container{max-width:1152px;width:1152px}}@media screen and (min-width:1408px){.container{max-width:1344px;width:1344px}}.content li+li{margin-top:.25em}.content p:not(:last-child){margin-bottom:1em}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}@media screen and (min-width:1024px){a.navbar-item.is-active:not(:hover),a.navbar-link.is-active:not(:hover){background-color:transparent}}

.lead {
  font-size: 2rem;
  text-align: center;
  margin: 12.5vh 0;
}

strong {
  display: block;
  font-size: 5rem;
  text-align: center;
  margin-bottom: 25vh 0;
}

hr {
  margin: 12.5vh 0;
}

.tip {
  margin: 1rem 0;
}

.tip a {
  font-weight: bold;
}

footer {
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

footer .separator {
  margin: 0 0.5rem;
}

@media (max-width: 800px) {
  .lead {
    font-size: 1.5rem;
  }

  strong {
    font-size: 3rem;
  }

  footer p:last-child {
    margin-top: 2rem;
    text-align: center;
  }

  footer .separator {
    display: block;
  }
}

@media (max-width: 500px) {
  .lead {
    font-size: 1rem;
  }

  strong {
    font-size: 2rem;
  }
}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <p class="lead">Libgen is currently available at:</p>
          <p><strong><a href="${urls[0]}">${urls[0]}</a></strong></p>
          <hr/>
          <aside>
            <p>And also at:</p>
            <ul>
              ${list}
            </ul>
          </aside>
          <p class="tip">Tip: bookmark the following link — it's always up to date! <a href="./go" title="Libgen">Libgen</a>.</p>
          <footer>
            <p>
              Is <a href="https://en.wikipedia.org/wiki/Library_Genesis" title="Wikipedia on Libgen">Libgen</a> down, not working, or blocked? Where Is Libgen Now always lists several alternative working links to active Libgen mirrors.
            </p>
            <p>
              Powered by <a href="https://www.wikidata.org/">Wikidata</a>
              <span class="separator">·</span>
              <a href="https://github.com/rvnproject/whereislibgen" title="Modify this website">Source code</a>
              <span class="separator">·</span>
              <a href="https://twitter.com/share?text=Where%20is%20Libgen%20now%20%3F&url=https%3A%2F%2Fwhereislibgen.now.sh&via=rvnproject" title="Share on Twitter">Share on Twitter</a>
              <span class="separator">·</span>
              By <a href="https://ravenproject.me/">Raven Project</a> based on the <a href="https://flockademic.com/?utm_source=whereisscihub.now.sh&utm_medium=website&utm_campaign=whereisscihub&utm_content=footer" title="Visit Flockademic.com">Flockademic</a> work — homepages for Open Access researchers
            </p>
          </footer>
        </div>
      </div>
    </body>
</html>
    `;

    res.send(page);
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))

async function getUrls() {
  const libgenId = 'Q22017206';
  const officialWebsiteProperty = 'P856';
  const sparql = `
    SELECT ?urls WHERE {
      { wd:${libgenId} p:${officialWebsiteProperty} [wikibase:rank wikibase:NormalRank; ps:${officialWebsiteProperty} ?urls]. }
    }
    `;
  const response = await fetch(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparql)}`);
  const data = await response.json();
  const urls = data.results.bindings.map(result => result.urls.value);

  return urls.sort(compareUrls);
}

function compareUrls(url1, url2) {
  // URL beginning with `https://`, and ending in a non-digit character (of the TLD) and a potential trailing slash
  const httpsDomainRE = /^https:\/\/(.*)\D\/?$/;
  // URL beginning with `http://`, and ending in a non-digit character (of the TLD) and a potential trailing slash
  const httpDomainRE = /^http:\/\/(.*)\D\/?$/;

  // Regular URL's pointing to an HTTPS address come first
  if (httpsDomainRE.test(url1)) {
    return -1;
  } else if(httpsDomainRE.test(url2)) {
    return 1;
  // IP addresses using HTTPS come second
  } else if(url1.substr(0, 5) === 'https') {
    return -1;
  } else if(url2.substr(0, 5) === 'https') {
    return 1;
  // Only then come regular domains hosted through naked HTTP
  } else if(httpDomainRE.test(url1)) {
    return -1;
  } else if(httpDomainRE.test(url2)) {
    return 1;
  }
  // And if both are an IP address through naked HTTP, we don't care which comes first:
  return 0;
}
