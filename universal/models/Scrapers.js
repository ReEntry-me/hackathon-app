
const Scrapers = new Mongo.Collection('Scrapers');

Scrapers.attachSchema(
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
  Scrapers.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default Scrapers;