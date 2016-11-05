// TODO: call this in entry file
export default function () {
  Meteor.publish('Resources', function () {
    return Resources.find();
  });
}
