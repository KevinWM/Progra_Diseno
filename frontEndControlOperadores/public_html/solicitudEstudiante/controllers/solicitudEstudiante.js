
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
}]).controller('solicitudEstudianteCtrl',function ($scope, $location, $http, $state, solicitudEstudianteService) {
        
    
    $scope.loginData = {};
    $scope.horarioData = {};
    $scope.solicitudData = {};
    $scope.usuarioActual = "";
    
    $scope.doLogin = function() {

        $http.post("http://localhost/backEndControlOperadores/public/login", $scope.loginData)

            .success(function(response) {
            if(response.usuario != null)
            {   
                $scope.usuarioActual = response;
                //console.log($scope.usuarioActual);
                
                solicitudEstudianteService.id = $scope.usuarioActual.id;
                solicitudEstudianteService.usuario = $scope.usuarioActual.usuario;
                solicitudEstudianteService.contrasena = $scope.usuarioActual.contrasena;
                //console.log(solicitudEstudianteService);
                //$location.url("/administrador");
                
                $state.go('administrador');
            }                       
            else
            {
                alert("Usuario o contraseña incorrecta");
            }
            $scope.loginData.usuario = "";
            $scope.loginData.contrasena = "";
        });
    };
    
    $scope.filefield = {};
    
    $scope.doSolicitud = function(){
        //console.log($scope.solicitudData);
        
        $http.post("http://localhost/backEndControlOperadores/public/CrearFormulario", $scope.solicitudData)

            .success(function(response) {
            
            $scope.horarioData.idOperador = response.id;
            //console.log(response.id);
            $http.post("http://localhost/backEndControlOperadores/public/CrearHorarioDisponible", $scope.horarioData)

                .success(function(responseArchivo) {
                //console.log($scope.reporteMatricula);
                alert("Se envio Exitosamente !!");
                $scope.solicitudData.cedula = "";
                $scope.solicitudData.nombre = "";
                $scope.solicitudData.carnet = "";
                $scope.solicitudData.correo = "";
                $scope.solicitudData.telefono = "";
                $scope.solicitudData.direccion = "";
                $scope.solicitudData.ponderado = "";
                $scope.solicitudData.cuentaBanco = "";
                $scope.solicitudData.cuentaClienteBanco = "";
                $scope.solicitudData.justificacion = "";
            });
            
           
            var fd = new FormData()
            angular.forEach($scope.files,function(file){
                fd.append('file',file)
                fd.append('idFormulario', response.id)
            })
            
            $http.post("http://localhost/backEndControlOperadores/public/fileentry/add", fd,
            {
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}   
            })
                .success(function(d) {
            });
        });
    };
    
});
