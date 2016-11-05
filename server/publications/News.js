// TODO: call this in entry file
export default function () {
  Meteor.publish('News', function () {
    return News.find();
  });
}
