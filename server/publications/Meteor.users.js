// TODO: call this in entry file
export default function () {
  Meteor.publish('Meteor.users', function () {
    return Meteor.users.find();
  });
}
