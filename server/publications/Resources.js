import Resources from '../../universal/models/Resources.js';

export default function() {
    Meteor.publish('Resources', function() {
        var query = {
            active: true
        };
        
        if (Roles.userIsInRole(this.userId, 'contributor') ||
            Roles.userIsInRole(this.userId, 'admin')) {
            query = {}
        }

        return Resources.find(query, {
            fields: {
                approvedBy: 0,
                approvedAt: 0,
                createdBy: 0,
                createdAt: 0
            }
        });
    });
}
