# project-faccination
##### Vaccination against fake websites
&NewLine;

### Tech Stack
*Auth0
*Digital Ocean
*Azure Services
*Node.js

### What is project-faccination about?
This project, built at Auth0 hackathon, is an attempt at making a nifty service with a chromium based browser extension, a webapp and some apis at informing the user about the safety of the website a user is viewing. We are using an npm package [page-data-parser](https://www.npmjs.com/package/page-metadata-parser) to find out simple metadata like domain, subdomain etc of a page and then use [Bing Entity Search](https://azure.microsoft.com/en-in/services/cognitive-services/bing-entity-search-api/) to establish the validity of the domain to its content.
The service provides a score to every website, which will be categorized into 3 types for the end user for simplicity sake- Safe, Caution, Fake.

The basic functionality will be extended upon in the webapp, where the user can look up for any website, check if the website is genuine or not, and also see a side by side visual comparision of how the genuine website looks in comparision to the fake website!

### How it works?
The browser extension sends the current URL to the backend. We use a npm package to get the metadata of the url, and then use [Bing Entity Search](https://azure.microsoft.com/en-in/services/cognitive-services/bing-entity-search-api/) to find out the closest literal match of the domain to the domain being browsed by the user, giving us an idea of what the user might be looking for. In the web app, we have used another npm package which takes in the url and throws out pictures of how the website uses, without actually opening the website itself, vs the actual website of which the website is a spoof. This helps in educating the user about what are the visual cues that can be used to detect a fake website from a real one.


### Installation

#### Backend
The backend is not yet hosted on a server, we were this close to host it on a Digital ocean droplet but couldn't, so you'll have to host a server locally for now.
* Clone this repository `git clone https://github.com/Chinmay-KB/project-faccination.git`
* Navigate to cloned folder -> server
* npm install
* node app.js
* API will be available at localhost with port 80.


#### Browser Extension
The extension is not yet available on the Chrome web store, so we have to sideload it.
* Clone this repository `git clone https://github.com/Chinmay-KB/project-faccination.git`
* Open [chrome://extensions](chrome://extensions) on Google Chrome, or [edge://extensions](edge://extensions) on Microsoft Edge(Chromium based)
* Enable Developer Mode
* Click on Load Unpacked Extensions
* Navigate to `project-faccination/extension` and click OK.

#### Web App
The web app is not yet on cloud server, so we have to sideload it.
* Clone this repository `git clone https://github.com/Chinmay-KB/project-faccination.git`
* Navigate to cloned folder -> client/auth0-web
* npm install
* npm run start
* App will be available at localhost with port 3000.
