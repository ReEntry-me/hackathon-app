import Resources from '../../../universal/models/Resources.js';
import Organizations from '../../../universal/models/Organizations.js';
import Conditions from '../../../universal/models/Conditions.js';

export default function(Template) {
    Template['resources'].created = function() {
        this.subscribe('Organizations');
        this.subscribe('Resources');
        this.subscribe('self.users');
    }

    Template['organizations'].created = function() {
        this.subscribe('Organizations');
        this.subscribe('Resources');
        this.subscribe('self.users');
    }

    Template['entryEdit'].created = function() {
        this.subscribe('Organizations');
    }

    Template['resources'].helpers({
        availHeight: function() {
            //this is an ugly hack and needs to be fixed...later
            const windowHeight = window.innerHeight;
            const headerHeight = $('#header').height() || 36;
            const footerHeight = $('.page-footer').height() || 70;
            const rem = 18;
            const availHeight = windowHeight - headerHeight - footerHeight + rem;
            return availHeight;
        },
        getOrgName: function() {
            return Organizations.findOne({_id: this.organizationId}).name
        },
        resources: () => Resources.find(),
        isAdmin: () => Roles.userIsInRole(Meteor.userId(), 'admin'),
        isUser: () => Roles.userIsInRole(Meteor.userId(), 'contributor') || Roles.userIsInRole(Meteor.userId(), 'admin'),
        phoneFormat: (phone) => Phoneformat.formatLocal('US', phone),
        organization: (_id) => Organizations.findOne({_id:_id}),
        webFormat: function(address) {
            address = address.match(/http(s)*:\/\/[a-z0-9\.]+(\/|$)/gi);
            address = address[0].replace(/http(s)*:\/\//i,'');
            return address.replace(/\/$/,'');
        },
        isSaved: function() {
            const u = Meteor.user();
            return _.has(u, 'saves') && u.saves.indexOf(this._id) > -1;
        }
    });

    Template['organizations'].helpers({
        organizations: () => Organizations.find(),
        orgResources: (_id) => Resources.find({
            $and: [
                {'organization.organizationId': _id},
                {'organization.organizationId': { $exists: true }}
            ]
        }),
        isAdmin: () => Roles.userIsInRole(Meteor.userId(), 'admin'),
        isUser: () => Roles.userIsInRole(Meteor.userId(), 'contributor') || Roles.userIsInRole(Meteor.userId(), 'admin'),
        phoneFormat: (phone) => Phoneformat.formatLocal('US', phone),
        webFormat: function(address) {
            address = address.match(/http(s)*:\/\/[a-z0-9\.]+(\/|$)/gi);
            address = address[0].replace(/http(s)*:\/\//i,'');
            return address.replace(/\/$/,'');
        },
        isMultiArea: function(areas) {
            return areas.length > 1;
        },
        isSaved: function() {
            const u = Meteor.user();
            return _.has(u, 'saves') && u.saves.indexOf(this._id) > -1;
        }
    });

    Template['entryEdit'].helpers({
        entryType: function() {
            return this.entryType || 'resource';
        },
        mode: function() {
            if (this._id) return 'Edit'
            return 'Add'
        },
        type: function() {
            if (this._id) return 'update'
            return 'insert'
        },
        doc: function() {
            if(this.entryType === 'organization') {
                return Organizations.findOne(this._id);
            } else {
                return Resources.findOne(this._id);
            }
        },
        entries: function() {
            if(this.entryType === 'organization') {
                return Organizations;
            } else {
                return Resources;
            }
        }
    });

    Template['resources'].events({
        'click .save': function() {
            Meteor.users.update({_id: Meteor.userId()}, {$push: {saves: this._id}}, function(e) {
                if(e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Saved resource');
                }
            });
        },
        'click .unsave': function() {
            Meteor.users.update({_id: Meteor.userId()}, {$pull: {saves: this._id}}, function(e) {
                if(e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Removed saved resource');
                }
            });
        },
        'click .add-resource': () => SemanticModal.generalModal('entryEdit', {entryType: 'resource'}),
        'click .add-organization': () => SemanticModal.generalModal('entryEdit', {entryType: 'organization'}),
        'click .change-to-organization': function() {
            Meteor.call('resourceToOrg', this._id, function(e) {
                if (e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Changed resource to organization')
                }
            });
        },
        'click .approve': function() {
            Meteor.call('approveResource', this._id, function(e) {
                if (e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Approved resource')
                }
            });
        },
        'click .edit': function() {
            SemanticModal.generalModal('entryEdit', { _id: this._id, entryType: 'resource' });
        },
        'click .remove': function() {
            Resources.remove({_id: this._id}, function(e) {
                if (e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Removed resource')
                }
            });
        }
    });

    Template['organizations'].events({
        'click .save': function() {
            Meteor.users.update({_id: Meteor.userId()}, {$push: {saves: this._id}}, function(e) {
                if(e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Saved organization');
                }
            });
        },
        'click .unsave': function() {
            Meteor.users.update({_id: Meteor.userId()}, {$pull: {saves: this._id}}, function(e) {
                if(e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Removed saved organization');
                }
            });
        },
        'click .add-resource': () => SemanticModal.generalModal('entryEdit', {entryType: 'resource'}),
        'click .add-organization': () => SemanticModal.generalModal('entryEdit', {entryType: 'organization'}),
        'click .change-to-resource': function() {
            Meteor.call('orgToResource', this._id, function(e) {
                if (e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Changed organization to resource')
                }
            });
        },
        'click .approve': function() {
            Meteor.call('approveOrganization', this._id, function(e) {
                if (e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Approved organization')
                }
            });
        },
        'click .edit': function() {
            SemanticModal.generalModal('entryEdit', { _id: this._id, entryType: 'organization' });
        },
        'click .remove': function() {
            //This should probably be turned into a method call that removes sub-entities
            Organizations.remove({_id: this._id}, function(e) {
                if (e) {
                    toastr.error(e.message);
                } else {
                    toastr.success('Removed organization')
                }
            });
        }
    });

    const entryEditFormHooks = {
        onSuccess: function() {
            $('.ui.modal').modal("hide");
            toastr.success('Success');
        }
    };

    AutoForm.addHooks(['entryEditForm'], entryEditFormHooks);
}
