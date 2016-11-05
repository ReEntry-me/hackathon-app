// TODO: call this in entry file
export default function () {
  Meteor.publish('Ratings', function () {
    return Ratings.find();
  });
}
