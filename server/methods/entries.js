import Resources from '../../universal/models/Resources.js';
import Organizations from '../../universal/models/Organizations.js';

export default function() {
    Meteor.methods({
        'approveResource': function(_id) {
            check(_id, String);

            if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                const r = Resources.findOne({ _id: _id });
                if (r) {
                    return Resources.update({ _id: _id }, {
                        $set: {
                            active: true,
                            approvedBy: Meteor.userId(),
                            approvedAt: new Date()
                        }
                    })
                } else {
                    throw new Meteor.Error(500, 'Error while approving Resource');
                }
            } else {
                throw new Meteor.Error(401, 'Unauthorized');
            }
        },
        'approveOrganization': function(_id) {
            check(_id, String);

            if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                const o = Organizations.findOne({ _id: _id });
                if (o) {
                    return Organizations.update({ _id: _id }, {
                        $set: {
                            active: true,
                            approvedBy: Meteor.userId(),
                            approvedAt: new Date()
                        }
                    })
                } else {
                    throw new Meteor.Error(500, 'Error while approving Organization');
                }
            } else {
                throw new Meteor.Error(401, 'Unauthorized');
            }
        },
        'resourceToOrg': function(_id) {
            check(_id, String);

            if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                const r = Resources.findOne({ _id: _id });
                if (r) {
                    const o = Organizations.insert(r);

                    if(r.active) {
                        Resources.update({ _id: o }, {
                            $set: {
                                active: r.active
                            }
                        });
                    }

                    Resources.update({ _id: _id }, {
                        $set: {
                            active: false
                        }
                    });
                } else {
                    throw new Meteor.Error(500, 'Error while approving Resource');
                }
            } else {
                throw new Meteor.Error(401, 'Unauthorized');
            }
        },
        'orgToResource': function(_id) {
            check(_id, String);

            if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                const o = Organizations.findOne({ _id: _id });
                if (o) {
                    const r = Resources.insert(o);

                    if(o.active) {
                        Resources.update({ _id: r }, {
                            $set: {
                                active: o.active
                            }
                        });
                    }

                    Organizations.update({ _id: _id }, {
                        $set: {
                            active: false
                        }
                    });
                } else {
                    throw new Meteor.Error(500, 'Error while approving Resource');
                }
            } else {
                throw new Meteor.Error(401, 'Unauthorized');
            }
        }
    });
}
