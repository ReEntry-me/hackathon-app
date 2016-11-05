// TODO: call this in entry file
export default function () {
  Meteor.publish('Conditions', function () {
    return Conditions.find();
  });
}
