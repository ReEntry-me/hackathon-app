import { renderBasic, renderSlim } from './helpers.js';

export default function(FlowRouter) {
    FlowRouter.route('/', {
        action: () => renderBasic('home')
    });

    FlowRouter.route('/resources', {
        action: () => renderBasic('resources')
    });

    FlowRouter.route('/organizations', {
        action: () => renderBasic('organizations')
    });

    FlowRouter.notFound = {
        action: () => renderSlim('notFound')
    };
}
