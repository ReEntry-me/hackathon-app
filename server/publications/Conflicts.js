// TODO: call this in entry file
export default function () {
  Meteor.publish('Conflicts', function () {
    return Conflicts.find();
  });
}
