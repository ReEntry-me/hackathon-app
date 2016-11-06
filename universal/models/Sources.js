const Sources = new Mongo.Collection('Sources');

Sources.attachSchema(
    new SimpleSchema({
        name: {
            type: String
        },
        description: {
            type: String,
            optional: true,
            autoform: {
                rows: 6
            }
        },
        createdBy: {
            type: String, //FK to Meteor.users
            denyUpdate: true,
            regEx: SimpleSchema.RegEx.Id,
            autoValue: function() {
                if (this.isInsert) {
                    return this.userId;
                } else if (this.isUpsert) {
                    return {
                        $setOnInsert: this.userId
                    };
                }
            }
        },
        createdAt: {
            type: Date,
            denyUpdate: true,
            autoValue: function() {
                if (this.isInsert) {
                    return new Date();
                } else if (this.isUpsert) {
                    return {
                        $setOnInsert: new Date()
                    };
                }
            }
        }
    })
);

// Collection2 already does schema checking
if (Meteor.isServer) {
    Sources.allow({
        insert: () => false,
        update: () => false,
        remove: () => false
    });
}

export default Sources;
