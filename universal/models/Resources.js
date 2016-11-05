import commonSchemas from './commonSchemas.js';
const Resources = new Mongo.Collection('Resources');

const organizationSchema = new SimpleSchema({
    organizationId: {
        type: String,
        optional: false
    },
    relationship: {
        type: String,
        optional: false
    }
})

const locations = new SimpleSchema({
    address: {
        type: commonSchemas.location,
        optional: true,
        autoform: {
            type: 'googleplace'
        }
    }
})

Resources.attachSchema(
    new SimpleSchema({
        name: {
            type: String
        },
        description: {
            type: String,
            optional: true
        },
        address: {
            type: commonSchemas.location,
            optional: true
        },
        areaServed: {
            type: [locations],
            optional: true
        },
        website: {
            type: String,
            optional: true
        },
        organization: {
            type: [organizationSchema],
            optional: true
        },
        conditions: {
            type: [String], //FK to Conditions
            optional: true
        },
        approvedBy: {
            type: String, //FK to Meteor.users
            optional: true
        },
        approvedAt: {
            type: String,
            optional: true
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
    Resources.allow({
        insert: () => false,
        update: () => false,
        remove: () => false
    });
}

export default Resources;
