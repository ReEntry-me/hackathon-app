const Markers = new Mongo.Collection('Markers');

Markers.allow({
    insert: () => true,
    update: () => true,
    remove: () => true
});

export default Markers;
