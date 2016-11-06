import Organizations from '../../universal/models/Organizations.js';

export default function() {
    Meteor.publish('Organizations', function() {
        var query = {
            active: true
        };

        if (Roles.userIsInRole(this.userId, 'contributor') ||
            Roles.userIsInRole(this.userId, 'admin')) {
            query = {}
        }

        return Organizations.find(query, {
            fields: {
                approvedBy: 0,
                approvedAt: 0,
                createdBy: 0,
                createdAt: 0
            }
        });
    });
}
