
const Sources = new Mongo.Collection('Sources');

Sources.attachSchema(
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
  Sources.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Sources;
