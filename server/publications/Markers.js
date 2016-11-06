import Markers from '../../universal/models/Markers.js';

export default function() {
    Meteor.publish('Markers', function() {
        if (this.userId) {
            return Markers.find({ userId: this.userId });
        }
        return this.ready();
    });
}
