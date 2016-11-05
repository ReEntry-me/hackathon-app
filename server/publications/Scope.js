// TODO: call this in entry file
export default function () {
  Meteor.publish('Scope', function () {
    return Scope.find();
  });
}
