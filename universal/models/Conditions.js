const Conditions = new Mongo.Collection('Conditions');

Conditions.attachSchema(
    new SimpleSchema({
        name: {
            type: String
        },
        parent: {
            type: String,
            optional: true
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

Conditions.permit(['insert', 'update', 'remove']).ifHasRole('admin').allowInClientCode();

export default Conditions;
