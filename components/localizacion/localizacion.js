/**
 * Created by mauro on 8/08/16.
 */

//API GOOGLE GEOLOCATION: AIzaSyC-EruDI3hSYlJyr1wr9KskAsJdlnfkRsw

Loc = new Mongo.Collection('location');
Zona = new Mongo.Collection('zona');


if(Meteor.isClient){

    Tracker.autorun(function (computation) {
        if(Geolocation.latLng()){
            computation.stop();
            Loc.insert(Geolocation.latLng());
            Meteor.call('locationStart');
        }

    });


    Template.localizacion.helpers({
        localizacion: function () {
            return Zona.findOne().nombre;
        }
    });

}

if(Meteor.isServer){
    Meteor.startup(function () {
        Loc.remove({});
    });
    Meteor.methods({
        locationStart: function () {
            getLocalizacion();
            SyncedCron.start();
        }
    });
}

function getLocalizacion() {
    var latitud = Loc.find().fetch()[0].lat;
    var longitud = Loc.find().fetch()[0].lng;
    var get = Meteor.wrapAsync(HTTP.get);
    var res = get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitud + ',' + longitud + '&key=AIzaSyDgTUtkw0w6HV4xvrds7kDEzXVjhNY-l8k');
    var content = JSON.parse(res.content);

    var ciudad = {
        nombre : content.results[2].formatted_address
    };

    Zona.remove({});
    Zona.insert(ciudad);
}

SyncedCron.add({
    name: 'Get location',
    schedule: function (parser) {
        return parser.text('every 30 minute');
    },
    job: getLocalizacion
});