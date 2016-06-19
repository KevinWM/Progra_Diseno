/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

angular
  .module('ASPStore', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/solicitudEstudiante');
    $urlRouterProvider.otherwise('/solicitudEstudiante');
    

      //este estado al ser abstracto recibe un nombre
    $stateProvider
        
    
    .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'common/views/base.html'
      })

        //cada uno de los estados no abstractos cargan una base de una vista dentro de la vista principas del proyectos en el ui-view
    .state('solicitudEstudiante', {
          url: '/solicitudEstudiante',
          parent: 'base',
          templateUrl: 'solicitudEstudiante/views/solicitudEstudiante.html',
          controller: 'solicitudEstudianteCtrl'
        })

    .state('administrador', {
          url: '/administrador/administrador',
          parent: 'base',
          templateUrl: 'administrador/views/administrador.html',
          controller: 'administradorCtrl'
        })
        
    .state('solicitudAdministrador', {
          url: '/administrador/solicitudAdministrador',
          parent: 'base',
          templateUrl: 'administrador/views/solicitudAdministrador.html',
          controller: 'administradorCtrl'
        })

    .state('labsAdministrador', {
          url: '/administrador/labsAdministrador',
          parent: 'base',
          templateUrl: 'administrador/views/labsAdministrador.html',
          controller: 'administradorCtrl'
        })
      /*
        .state('dashboard',{
            url: '/dashboard',
            parent: 'base',
            templateUrl: 'dashboard/views/dashboard.html',
            controller: 'DashBoardCtrl'
            //si usa la opcion "controlerAs: (nombre) para referirse a las variables se usa el this. nombre dde la variable que este usando"
        })*/
      
  });

