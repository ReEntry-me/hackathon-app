export default function() {
    Meteor.publish('Meteor.users', function() {
        if (this.userId) {
            var query = {
                _id: this.userId
            };

            var fields = {
                services: 0
            };

            if (Roles.userIsInRole(this.userId, 'contributor')) {
                //contributors can see other contributors, as well as admins, but not all users
                query = {
                    roles: {
                        $in: ['admin', 'contributor']
                    }
                }

                //even if you can see other contributors & admins, you don't get to see private info
                fields = {
                    services: 0,
                    saves: 0,
                    conditions: 0,
                    alerts: 0
                }
            }

            if (Roles.userIsInRole(this.userId, 'admin')) {
                //admins can see everyone
                query = {}

                //even admins don't get to see private info
                fields = {
                    services: 0,
                    saves: 0,
                    conditions: 0,
                    alerts: 0
                }
            }

            return Meteor.users.find(query, {
                fields: {
                    services: 0
                }
            });
        }

        return this.ready();
    });
}
