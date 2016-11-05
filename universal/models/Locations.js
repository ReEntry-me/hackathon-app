
const Locations = new Mongo.Collection('Locations');

Locations.attachSchema(
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
  Locations.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Locations;
