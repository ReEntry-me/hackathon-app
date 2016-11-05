
const Organizations = new Mongo.Collection('Organizations');

Organizations.attachSchema(
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
  Organizations.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Organizations;
