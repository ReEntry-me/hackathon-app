// TODO: call this in entry file
export default function () {
  Meteor.publish('Tags', function () {
    return Tags.find();
  });
}
