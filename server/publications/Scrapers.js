// TODO: call this in entry file
export default function () {
  Meteor.publish('Scrapers', function () {
    return Scrapers.find();
  });
}
