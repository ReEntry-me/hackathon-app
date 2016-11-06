import Conditions from '../../universal/models/Conditions.js';

export default function() {
    Meteor.publish('Conditions', function() {
        var fields = {
            createdBy: 0,
            createdAt: 0
        };

        if (Roles.userIsInRole(this.userId, 'contributor') ||
            Roles.userIsInRole(this.userId, 'admin')) {
            fields = {};
        }

        return Conditions.find(query, {
            fields: fields
        });
    });
}
