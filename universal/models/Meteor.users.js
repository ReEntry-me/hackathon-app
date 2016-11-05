const emailsSchema = new SimpleSchema({
    address: {
        type: String,
        label: 'Address',
        optional: false,
        regEx: SimpleSchema.RegEx.Email,
        min: 3,
        max: 100
    },
    verified: {
        type: Boolean,
        label: 'Verified',
        optional: false,
        defaultValue: false
    }
});

const profileSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: 'First Name',
        optional: false
    },
    lastName: {
        type: String,
        label: 'Last Name',
        optional: false
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
        optional: true
    }
});

Meteor.users.attachSchema(
    new SimpleSchema({
        emails: {
            type: emailsSchema,
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
  Meteor.users.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Meteor.users;
