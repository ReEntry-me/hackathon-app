
const Tags = new Mongo.Collection('Tags');

Tags.attachSchema(
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
  Tags.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Tags;
