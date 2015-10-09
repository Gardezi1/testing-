Meteor.startup(function() {
 
  GoogleMaps.load({
    key: 'AIzaSyBEicIR2jCEbHZzeJfFVWnGH-eNz2vxCGU',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});

