import Markers from '../../universal/models/Markers.js';

export default function() {
    Meteor.methods({
        'clearMap': () => Markers.remove({userId: Meteor.userId()})
    });
}
