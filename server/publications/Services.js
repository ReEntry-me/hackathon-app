// TODO: call this in entry file
export default function () {
  Meteor.publish('Services', function () {
    return Services.find();
  });
}
