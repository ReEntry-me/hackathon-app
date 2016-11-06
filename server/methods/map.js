import Markers from '../../universal/models/Markers.js';
import Resources from '../../universal/models/Resources.js';
import Organizations from '../../universal/models/Organizations.js';

export default function() {
    Meteor.methods({
        'clearMap': () => Markers.remove({ userId: Meteor.userId() })
    });
}
