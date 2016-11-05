
const Resources = new Mongo.Collection('Resources');

Resources.attachSchema(
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
  Resources.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Resources;
