// TODO: call this in entry file
export default function () {
  Meteor.publish('ScrapedData', function () {
    return ScrapedData.find();
  });
}
