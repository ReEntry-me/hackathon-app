import setupBrowserPolicy from './config/security.js';
import loadFixtures from './loaders/fixtures.js';
import loadUsers from './loaders/users.js';

import loadUsersPubs from './publications/Meteor.users.js';
loadUsersPubs();

import loadSelfUsersPubs from './publications/self.users.js';
loadSelfUsersPubs();

import loadResourcesPubs from './publications/Resources.js';
loadResourcesPubs();

import loadOrganizationsPubs from './publications/Organizations.js';
loadOrganizationsPubs();

import loadEntryMethods from './methods/entries.js';
loadEntryMethods();

import loadMapMethods from './methods/map.js';
loadMapMethods();

import loadScrapeMethods from './methods/scrape.js';
loadScrapeMethods();

import loadMarkers from './publications/Markers.js';
loadMarkers();

setupBrowserPolicy(BrowserPolicy);

import serverRoutes from '../universal/routes/server.js';
serverRoutes();

Meteor.startup(() => {
  loadUsers();
  //loadFixtures([{ foo: 'bar' }], myCollection);
});
