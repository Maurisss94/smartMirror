if(Meteor.isClient){

	Template.hora.helpers({
    hora: function() {
      var fecha = Chronos.liveMoment();
      return fecha.format('HH:mm:ss');
    }
});
}