
Meteor.users.attachSchema(
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
  Meteor.users.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Meteor.users;
