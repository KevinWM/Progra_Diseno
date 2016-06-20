/**
 * Created by alejandro on 4/25/2016.
 */

'use strict';

angular.module('ASPStore').directive('fileInput' ,['$parse', function($parse){
    return{
        restrict:'A',
        link:function(scope,elm,attrs){
            elm.bind('change',function(){
                $parse(attrs.fileInput)
                .assign(scope,elm[0].files)
            scope.$apply()
            })
        }
    }
}])
    .controller('administradorCtrl',function ($scope, $location, $state, solicitudEstudianteService, $http) {
        
    $scope.usuarioActual = solicitudEstudianteService;
    $scope.usuario = $scope.usuarioActual.usuario;
    $scope.listSolicitudes = "";
    $scope.listLaboratorios = "";
    $scope.horarioDataDisponile = {};
    $scope.solicitudEditData = {};
    $scope.laboratorioData = {};
    $scope.labEditData = {};
    $scope.labActual = {};
    $scope.idFormularioActual = "";



    $http.get("http://localhost/backEndControlOperadores/public/VerFormularios")

            .success(function(response) {
                $scope.listSolicitudes = response;
            });

    $scope.loadSolicitudes = function(){

        $http.get("http://localhost/backEndControlOperadores/public/VerFormularios")

            .success(function(response) {
                $scope.listSolicitudes = response;
            });
    };


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

    $scope.loadArchivoMatricula = function(id) {

        $scope.infoArchivo = {};

        $http.get("http://localhost/backEndControlOperadores/public/fileentry/getInfo/"+id
            ).success(function(response) {
            $scope.infoArchivo = response;
        });

        $http({
                url : "http://localhost/backEndControlOperadores/public/fileentry/get/"+id,
                method : 'GET',
                params : {},
                headers : {
                    'Content-type' : undefined,
                },
                responseType : 'arraybuffer'
                }).success(function(data, status, headers, config) {
                // TODO when WS success
                var file = new Blob([ data ], {
                    type : 'application/csv'
                });

                //trick to download store a file having its URL
                var fileURL = URL.createObjectURL(file);
                var a         = document.createElement('a');
                a.href        = fileURL;
                a.target      = '_blank';
                a.download    = $scope.infoArchivo.nombreOriginal;
                document.body.appendChild(a);
                a.click();
            }).error(function(data, status, headers, config) {
        });
    };


    $scope.eliminarLab = function(){
        $http.delete("http://localhost/backEndControlOperadores/public/EliminarLaboratorio/"+$scope.labActual.id)
        .success(function(response) {
            $scope.loadLaboratorios();
            alert("Eliminado Exitosamente", $state.go('labsAdministrador'));
        });
    };

    $scope.loadFormularioEdit = function(formularioActual){

        $scope.idFormularioActual = formularioActual.id;

        $scope.nombreEstudiante = formularioActual.nombre;
        $scope.solicitudEditData.cedula = formularioActual.cedula;
        $scope.solicitudEditData.nombre = formularioActual.nombre;
        $scope.solicitudEditData.carnet = formularioActual.carnet;
        $scope.solicitudEditData.correo = formularioActual.correo;
        $scope.solicitudEditData.telefono = formularioActual.telefono;
        $scope.solicitudEditData.direccion = formularioActual.direccion;
        $scope.solicitudEditData.ponderado = formularioActual.ponderado;
        $scope.solicitudEditData.cuentaBanco = formularioActual.cuentaBanco;
        $scope.solicitudEditData.cuentaClienteBanco = formularioActual.cuentaClienteBanco;
        $scope.solicitudEditData.justificacion = formularioActual.justificacion;

        $scope.loadHorarioDisponible(formularioActual.id);
    };

    $scope.modificarFormulario = function(){

        $http.put("http://localhost/backEndControlOperadores/public/EditarFormulario/"+$scope.idFormularioActual, $scope.solicitudEditData)
        .success(function(responseFormularioEdit) {

            $http.put("http://localhost/backEndControlOperadores/public/EditarHorarioDisponible/"+$scope.idFormularioActual, $scope.horarioDataDisponile)
            .success(function(responseHorarioEdit) {
                $scope.loadSolicitudes();
                alert("Modificado Exitosamente!!", $state.go('solicitudAdministrador'));
            });
        });
    };

    $scope.eliminarFormulario = function(){

        $http.delete("http://localhost/backEndControlOperadores/public/EliminarFormulario/"+$scope.idFormularioActual)
        .success(function(responseFormularioEliminar) {

            $http.delete("http://localhost/backEndControlOperadores/public/EliminarHorarioDisponible/"+$scope.idFormularioActual)
            .success(function(responseHorarioEliminar) {
                $scope.loadSolicitudes();
                alert("Eliminado Exitosamente!!", $state.go('solicitudAdministrador'));
            });
        });
    };
});
