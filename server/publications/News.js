// TODO: call this in entry file
export default function() {
    Meteor.publish('News', function() {
        var query = {
            active: true
        };

        if (Roles.userIsInRole(this.userId, 'contributor') ||
            Roles.userIsInRole(this.userId, 'admin')) {
            query = {}
        }

        return News.find(query, {
            fields: {
                approvedBy: 0,
                approvedAt: 0,
                createdBy: 0,
                createdAt: 0
            }
        });
    });
}
