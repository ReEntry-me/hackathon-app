import config from '../universal/config';
import createMainRoutes from '../universal/routes/mainRoutes';
import createHome from './components/home/home';
import createHeader from './components/header/header';
import createResources from './components/resources/resources';

createMainRoutes(FlowRouter);
createHome(Template);
createHeader(Template);
createResources(Template);

Meteor.startup(() => {
    AutoForm.setDefaultTemplate('semanticUI');
});
