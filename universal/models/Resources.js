import commonSchemas from './commonSchemas.js';
import Organizations from './Organizations.js';
const Resources = new Mongo.Collection('Resources');

const organizationList = function() {
    const o = Organizations.find({}, {
        fields: {
            name: 1
        }
    }).fetch();
    
    var arr = [];

    for (var i in o) {
        arr.push({
            label: o[i].name,
            value: o[i]._id
        });
    }

    return arr;
};

const organizationSchema = new SimpleSchema({
    organizationId: {
        type: String,
        label: 'Organization',
        optional: false,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            type: 'selectize',
            options: organizationList
        }
    },
    relationship: {
        type: String,
        optional: false,
        autoform: {
            type: 'selectize',
            options: [
                {label: 'Member', value: 'member'}, 
                {label: 'Location', value: 'location'}
            ]
        }
    }
});

const googlePlaceOptions = function() {
    return {
        type: 'googleUI',
        stopTimeoutOnKeyup: false,
        googleOptions: {
            componentRestrictions: { country: 'us' }
        }
    }
}

const locations = new SimpleSchema({
    address: {
        type: commonSchemas.location,
        optional: true,
        autoform: {
            type: 'googleplace',
            afFieldInput: {
                opts: googlePlaceOptions
            }
        }
    }
});

Resources.attachSchema(
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
        address: {
            type: commonSchemas.location,
            optional: true,
            autoform: {
                type: 'googleplace',
                afFieldInput: {
                    opts: googlePlaceOptions
                }
            }
        },
        areaServed: {
            type: [locations],
            optional: true
        },
        phone: {
            type: String,
            optional: true,
            regEx: /(([2-9]{1})([0-9]{2})([0-9]{3})([0-9]{4}))$/
        },
        website: {
            type: String,
            optional: true,
            regEx: /^(ht)tp(s?)\:\/\/(([a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+)+)|localhost)(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?([\d\w\.\/\%\+\-\=\&amp;\?\:\\\&quot;\'\,\|\~\;]*)$/
        },
        organization: {
            type: [organizationSchema],
            optional: true
        },
        conditions: {
            type: [String], //FK to Conditions
            optional: true,
            autoform: {
                type: 'selectize',
                multiple: true
                    //TODO: add options here
            }
        },
        active: {
            type: Boolean,
            optional: false
        },
        approvedBy: {
            type: String, //FK to Meteor.users
            optional: true,
            regEx: SimpleSchema.RegEx.Id
        },
        approvedAt: {
            type: String,
            optional: true
        },
        createdBy: {
            type: String, //FK to Meteor.users
            denyUpdate: true,
            regEx: SimpleSchema.RegEx.Id,
            optional: true, //sometimes this is sent from a job - no user id
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

Resources.before.insert(function(userId, doc) {
    doc.active = false;
});

Resources.permit(['insert', 'update', 'remove']).ifHasRole('admin').allowInClientCode();
Resources.permit(['insert', 'update']).ifHasRole('contributor').exceptProps(['active', 'approvedBy', 'approvedAt', 'createdBy', 'createdAt']).allowInClientCode();

export default Resources;
