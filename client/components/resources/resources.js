import Resources from '../../../universal/models/Resources.js';

export default function(Template) {
    Template['resourceEdit'].helpers({
        mode: function() {
            if (this._id) return 'Edit'
            return 'Add'
        },
        type: function() {
            if (this._id) return 'update'
            return 'insert'
        },
        Resources: () => Resources,
        optsGoogleplace: function() {
            return {
                type: 'googleUI',
                stopTimeoutOnKeyup: false,
                googleOptions: {
                  componentRestrictions: { country:'us' }
                }
            }
        }
    });

    Template['resourceEditButton'].events({
        'click .edit': () => SemanticModal.generalModal('resourceEdit', { _id: 'foo' })
    });

    Template['resourceAddButton'].events({
        'click .add': () => SemanticModal.generalModal('resourceEdit')
    });
}
