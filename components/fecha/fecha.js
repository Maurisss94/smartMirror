// Meteor client
// Fecha actual del sistema formatada.
if(Meteor.isClient){

	var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

	Template.fecha.helpers({
    fecha: function() {
      var fecha = Chronos.liveMoment().toDate();
      f = diasSemana[fecha.getDay()] + ", " + fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear();
      return f;
    }
});
}