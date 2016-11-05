// TODO: call this in entry file
export default function () {
  Meteor.publish('Organizations', function () {
    return Organizations.find();
  });
}
