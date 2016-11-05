
const Conditions = new Mongo.Collection('Conditions');

Conditions.attachSchema(
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
  Conditions.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Conditions;
