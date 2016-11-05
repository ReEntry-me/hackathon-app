// TODO: call this in entry file
export default function () {
  Meteor.publish('Sources', function () {
    return Sources.find();
  });
}
