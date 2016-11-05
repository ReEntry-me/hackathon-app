const users = [
  {
    email: 'admin@test.com',
    password: 'supersecret'
  },
  {
    email: 'test@test.com',
    password: 'testpassword'
  }
];

export default function () {
  users.forEach(function (user) {
    if (typeof Meteor.users.findOne({ 'emails.address' : user.email }) !== 'object') {
      Accounts.createUser(user);
    }
  });
}
