/**
 * Created by alejandro on 4/25/2016.
 */

'use strict';

angular.module('ASPStore')
    .controller('administradorCtrl',function ($scope, $location, $state, solicitudEstudianteService, $http) {
        
    $scope.usuarioActual = solicitudEstudianteService;
    $scope.usuario = $scope.usuarioActual.usuario;
    $scope.listSolicitudes = "";
    $scope.listLaboratorios = "";
    $scope.horarioDataDisponile = {};
    $scope.laboratorioData = {};
    $scope.labEditData = {};
    $scope.labActual = {};

    $http.get("http://localhost/backEndControlOperadores/public/VerFormularios")

            .success(function(response) {
                $scope.listSolicitudes = response;
            });



    $scope.salir = function (){

        $scope.usuarioActual = "";
        $state.go('solicitudEstudiante');
    };

    $scope.loadHorarioDisponible = function(id){
        //console.log(document.getElementById(id));
        $http.get("http://localhost/backEndControlOperadores/public/VerHorarioDisponible/"+id)

            .success(function(response) {
                $scope.horarioDataDisponile.lManana = response.lManana;
                $scope.horarioDataDisponile.kManana = response.kManana;
                $scope.horarioDataDisponile.mManana = response.mManana;
                $scope.horarioDataDisponile.jManana = response.jManana;
                $scope.horarioDataDisponile.vManana = response.vManana;
                $scope.horarioDataDisponile.sManana = response.sManana;

                $scope.horarioDataDisponile.lTarde = response.lTarde;
                $scope.horarioDataDisponile.kTarde = response.kTarde;
                $scope.horarioDataDisponile.mTarde = response.mTarde;
                $scope.horarioDataDisponile.jTarde = response.jTarde;
                $scope.horarioDataDisponile.vTarde = response.vTarde;
                $scope.horarioDataDisponile.sTarde = response.sTarde;

                $scope.horarioDataDisponile.lNoche = response.lNoche;
                $scope.horarioDataDisponile.kNoche = response.kNoche;
                $scope.horarioDataDisponile.mNoche = response.mNoche;
                $scope.horarioDataDisponile.jNoche = response.jNoche;
                $scope.horarioDataDisponile.vNoche = response.vNoche;
                $scope.horarioDataDisponile.sNoche = response.sNoche;

            });
    };

    $scope.crearLaboratorio = function(){

        $http.post("http://localhost/backEndControlOperadores/public/CrearLaboratorio", $scope.laboratorioData)
            .success(function(response) {
            var alertPopup = alert("Agregado Exitosamente!!", document.getElementById('listLabs').click());
            $scope.loadLaboratorios();
            $scope.laboratorioData.nombre = "";
        });
    };

    $scope.loadLaboratorios = function(){
        $http.get("http://localhost/backEndControlOperadores/public/VerLaboratorios")
        .success(function(response) {

            $scope.listLaboratorios = response;
        });
    };

    $scope.obtenerLabActual = function(labActual){

        $scope.labActual = labActual;
        $scope.nombreLabActual = labActual.nombre;
        $scope.labEditData.nombre = $scope.labActual.nombre;
    };
    
    $scope.modificarLab = function(){
        $http.put("http://localhost/backEndControlOperadores/public/EditarLaboratorio/"+$scope.labActual.id, $scope.labEditData)
        .success(function(response) {
            $scope.loadLaboratorios();
            alert("Modificado Exitosamente!!", $state.go('labsAdministrador'));
        });
    };
    
    $scope.eliminarLab = function(){
        $http.delete("http://localhost/backEndControlOperadores/public/EliminarLaboratorio/"+$scope.labActual.id)
        .success(function(response) {
            $scope.loadLaboratorios();
            alert("Eliminado Exitosamente", $state.go('labsAdministrador'));
        });
    };
});
