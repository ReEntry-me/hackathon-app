const emailsSchema = new SimpleSchema({
    address: {
        type: String,
        label: 'Address',
        optional: true,
        regEx: SimpleSchema.RegEx.Email,
        min: 3,
        max: 100
    },
    verified: {
        type: Boolean,
        label: 'Verified',
        optional: true,
        defaultValue: false
    }
});

const profileSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: 'First Name',
        optional: true
    },
    lastName: {
        type: String,
        label: 'Last Name',
        optional: true
    },
    jobTitle: {
        type: String,
        label: 'Job Title',
        optional: true
    },
    company: {
        type: String,
        label: 'Company',
        optional: true
    },
    bio: {
        type: String,
        label: 'Bio',
        optional: true,
        autoform: {
            rows: 3
        }
    }
});

Meteor.users.attachSchema(
    new SimpleSchema({
        emails: {
            type: [emailsSchema],
            label: 'Emails',
            optional: true
        },
        profile: {
            type: profileSchema,
            label: 'Profile',
            optional: true
        },
        services: {
            type: Object,
            label: 'Services',
            optional: true,
            blackbox: true
        },
        roles: {
            type: [String],
            label: 'Roles',
            optional: true,
            blackbox: true
        },
        saves: {
            type: [String],
            optional: true
        },
        conditions: {
            type: [String], //FK to Conditions
            optional: true,
            autoform: {
                type: 'selectize',
                multiple: true
            }
        },
        alerts: {
            type: [Object],
            optional: true,
            blackbox: true
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

Meteor.users.permit(['insert', 'update', 'remove']).ifHasRole('admin').allowInClientCode();
Meteor.users.permit(['update']).exceptProps(['emails', 'services', 'roles', 'alerts']).allowInClientCode();

export default Meteor.users;
