const Ratings = new Mongo.Collection('Ratings');

Ratings.attachSchema(
    new SimpleSchema({
        title: {
            type: String
        },
        content: {
            type: String
        },
        createdAt: {
            type: Date,
            denyUpdate: true
        }
    })
);

// Collection2 already does schema checking
if (Meteor.isServer) {
    Ratings.allow({
        insert: () => false,
        update: () => false,
        remove: () => false
    });
}

export default Ratings;
