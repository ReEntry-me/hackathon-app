export default function() {
    Meteor.publish('Meteor.users', function() {
        if (this.userId) {
            if (Roles.userIsInRole(this.userId, 'admin')) {
                return Meteor.users.find({}, {
                    fields: {
                        services: 0
                    }
                });
            } else {
                return Meteor.users.find({ _id: this.userId }, {
                    fields: {
                        services: 0
                    }
                });
            }
        }

        return this.ready();
    });
}
