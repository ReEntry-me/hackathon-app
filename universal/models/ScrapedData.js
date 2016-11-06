const ScrapedData = new Mongo.Collection('ScrapedData');

if (Meteor.isServer) {
  ScrapedData.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default ScrapedData;
