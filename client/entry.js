import config from '../universal/config';
import createMainRoutes from '../universal/routes/mainRoutes';
import createHome from './components/home/home';
import createHeader from './components/header/header';
import createEntries from './components/entries/entries';
import createMap from './components/Map/Map';

createMainRoutes(FlowRouter);
createHome(Template);
createHeader(Template);
createEntries(Template);
createMap(Template);

Meteor.startup(() => {
    AutoForm.setDefaultTemplate('semanticUI');
});
