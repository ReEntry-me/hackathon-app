import Markers from '../../../universal/models/Markers.js';
import Resources from '../../../universal/models/Resources.js';

export default function(Template) {
    var MAP_ZOOM = 12;

    Template.Map.helpers({
        mapOptions: function() {
            if (GoogleMaps.loaded()) {
                const loc = Geolocation.latLng();
                if (loc) {
                    return {
                        center: new google.maps.LatLng(loc.lat, loc.lng),
                        zoom: 8
                    };
                }
            }
        },
        markersCount: function() {
        	return Markers.find().fetch().length;
        },
        mapHeight: function() {
            //this is an ugly hack and needs to be fixed...later
        	const windowHeight = window.innerHeight;
	        const headerHeight = $('#header').height() || 36;
	        const footerHeight = $('.page-footer').height() || 70;
	        const mapButtonsHeight = $('.map-buttons').height() || 58;
	        const rem = 18;
	        const mapHeight = windowHeight - headerHeight - footerHeight - mapButtonsHeight + rem;
	        return mapHeight;
        },
        mapMargin: function() {
	        return $('#header').height() || 36;
        },
        resources: function() {
            var r = Resources.find({'address.lat':{$exists: true}, 'address.lng':{$exists: true}}).fetch();
            return r;
        },
        triggerMapRebuild: function() {
            Meteor.call('clearMap');
            var r = Resources.find({'address.lat':{$exists: true}, 'address.lng':{$exists: true}}).fetch();
                
            for (var i in r) {
                if (r[i].address && r[i].address.lat && r[i].address.lng) {
                    Markers.insert({
                        lat: r[i].address.lat,
                        lng: r[i].address.lng,
                        userId: Meteor.userId()
                    });
                }
            }
        }
    });

    Template.Map.events({
    	'click .clearMap': () => Meteor.call('clearMap')
    });

    Template.Map.created = function() {
        this.subscribe('Markers');
        this.subscribe('Resources');
        window.Resources = Resources;
    }

    Meteor.startup(function() {
        GoogleMaps.load({
            key: 'AIzaSyCt3pW2VtREfojA9R26omKn5sVfGYsQlao',
            libraries: 'places'
        });
    });

    Template.Map.onCreated(function() {
        var self = this;

        GoogleMaps.ready('map', function(map) {
            var marker;
            var markers = {};

            // Create and move the marker when latLng changes.
            self.autorun(function() {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;

                // If the marker doesn't yet exist, create it.
                if (!marker) {
                    var icon = '/marker.png';
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latLng.lat, latLng.lng),
                        map: map.instance,
                        icon: icon
                    });
                }
                // The marker already exists, so we'll just change its position.
                else {
                    marker.setPosition(latLng);
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });

            // google.maps.event.addListener(map.instance, 'dblclick', function(event) {
            //     Markers.insert({
            //         lat: event.latLng.lat(),
            //         lng: event.latLng.lng(),
            //         userId: Meteor.userId()
            //     });
            // });

            Markers.find().observe({
                added: function(document) {
                    // Create a marker for this document
                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.lng),
                        map: map.instance,
                        // We store the document _id on the marker in order 
                        // to update the document within the 'dragend' event below.
                        id: document._id
                    });

                    // This listener lets us drag markers on the map and update their corresponding document.
                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
                    });

                    // Store this marker instance within the markers object.
                    markers[document._id] = marker;
                },
                changed: function(newDocument, oldDocument) {
                    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
                },
                removed: function(oldDocument) {
                    // Remove the marker from the map
                    markers[oldDocument._id].setMap(null);

                    // Clear the event listener
                    google.maps.event.clearInstanceListeners(
                        markers[oldDocument._id]);

                    // Remove the reference to this marker instance
                    delete markers[oldDocument._id];
                }
            });
        });
    });
}
