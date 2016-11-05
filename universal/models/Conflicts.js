
const Conflicts = new Mongo.Collection('Conflicts');

Conflicts.attachSchema(
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
  Conflicts.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Conflicts;
