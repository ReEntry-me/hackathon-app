export default function() {
    Meteor.publish('self.users', function() {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId}, {
                fields: {
                    services: 0
                }
            });
        }

        return this.ready();
    });
}
