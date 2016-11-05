
const Scope = new Mongo.Collection('Scope');

Scope.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
if (Meteor.isServer) {
  Scope.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Scope;
