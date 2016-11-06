import commonSchemas from './commonSchemas.js';

const Organizations = new Mongo.Collection('Organizations');

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

Organizations.attachSchema(
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
        conditionsPos: {
            type: [String], //FK to Conditions
            label: 'Positive Conditions',
            optional: true,
            autoform: {
                type: 'selectize',
                multiple: true
                    //TODO: add options here
            }
        },
        conditionsNeg: {
            type: [String], //FK to Conditions
            label: 'Negative Conditions',
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

Organizations.before.insert(function(userId, doc) {
    doc.active = false;
});

Organizations.permit(['insert', 'update', 'remove']).ifHasRole('admin').allowInClientCode();
Organizations.permit(['insert', 'update']).ifHasRole('contributor').exceptProps(['active', 'approvedBy', 'approvedAt', 'createdBy', 'createdAt']).allowInClientCode();

export default Organizations;
