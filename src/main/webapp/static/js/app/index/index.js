'use strict';

var app = angular.module('App', ['smartTable.table','fundoo.services','ui.bootstrap','ngResource','ngTable']);
//var app = angular.module('App','plunker'p ['smartTable.table','fundoo.services','ui.bootstrap']);
app.directive('numbersOnly', function(){
	   return {
		     require: 'ngModel',
		     link: function(scope, element, attrs, modelCtrl) {
		       modelCtrl.$parsers.push(function (inputValue) {
		           // this next if is necessary for when using ng-required on your input. 
		           // In such cases, when a letter is typed first, this parser will be called
		           // again, and the 2nd time, the value will be undefined
		           if (inputValue == undefined) return '' 
		           var transformedInput = inputValue.replace(/[^0-9-()]/g, ''); 
		           if (transformedInput!=inputValue) {
		              modelCtrl.$setViewValue(transformedInput);
		              modelCtrl.$render();
		           }         

		           return transformedInput;         
		       });
		     }
		   };
		});

app.directive('custom', function () {
    return {
        restrict: 'E',
        //include smart table controller to use its API if needed
        require: '^smartTable',
        template: '<a href="#" ng-click="showEditGastoImproForm();">Editar</a>',
        replace: true,
        link: function (scope, element, attrs, ctrl) {
            //can use scope.dataRow, scope.column, scope.formatedValue, and ctrl API            
        }
    };
});

app.config(['$routeProvider',
         function($routeProvider) {
           $routeProvider.
             when('/altaimplant', {
               templateUrl: 'views/implant/alta.jsp',
               controller: 'AltaImplantController'
             }).
             when('/showimplants', {
               templateUrl: 'views/implant/implants.jsp',
               controller: 'ImplantController'
             }).
             when('/altahospital', {
                 templateUrl: 'views/hospital/alta.jsp',
                 controller: 'AltaHospitalController'
               }).
               when('/showhospitales', {
                   templateUrl: 'views/hospital/hospitales.jsp',
                   controller: 'HospitalController'
                 }).
                 when('/showpermisos', {
                     templateUrl: 'views/permisos/permisos.jsp',
                     controller: 'PermisosController'
                   }).
                   when('/altacliente', {
                       templateUrl: 'views/cliente/alta.jsp',
                       controller: 'AltaClienteController'
                     }).
                     when('/showclientes', {
                         templateUrl: 'views/cliente/clientes.jsp',
                         controller: 'ClienteController'
                       }).
                       when('/altaevento', {
                           templateUrl: 'views/evento/alta.jsp',
                           controller: 'AltaEventoController'
                         }).                     
                         when('/showmedicostratantes', {
                             templateUrl: 'views/evento/editar_medtrat.jsp',
                             controller: 'MedicoTratanteController'
                           }).
                         when('/showeventos', {
                             templateUrl: 'views/evento/eventos.jsp',
                             controller: 'EventoController'
                           }).
                           when('/showlayout', {
                               templateUrl: 'views/reportes/layout.jsp',
                               controller: 'LayoutController'
                             }).
             otherwise({
               redirectTo: ''
             });
}]);
 
app.controller('ShowOrdersController', function($scope) { 
    $scope.message = 'This is Show orders screen'; 
});


app.controller('NavCtrl', ['$scope', '$location','$rootScope','$http', function ($scope, $location,$rootScope,$http) {
  //Se obtiene el usuario que hizo login
  var usuarioSeguridad= new Object();
  usuarioSeguridad.username="";
  $http.post('mvc/index/obteneruserseguridad',usuarioSeguridad).
	success(function(data, status, headers, config) {		
		//alert("Bienvenido!"+data.tipoUsuario);
		
		$rootScope.implantRoot= new Object();		  
		$rootScope.implantRoot.idImplant=100;
		$rootScope.implantRoot.nombreImplant=data.username;
		  
		$scope.breadcrumbs = [];
		if (data.tipoUsuario==3){
		  $scope.menu =   [		        
		        {text: 'Evento', href:'#/showeventos', img:'evento',children: [
		            {text:'Registrar', href:'#altaevento'},
		            {text:'Editar', href:'#showeventos'}
		        ]
		        },
		        {text: 'Catalogos', href:'',img:'catalogo', children: [
		          {text:'Implants', href:'#showimplants'},
		          {text:'Hospitales', href:'#showhospitales'},
		          {text:'Permisos', href:'#showpermisos'},
		          {text:'M&#233;dicos Tratantes',href:'#showmedicostratantes'},
		          {text:'Clientes', href:'#showclientes'},           
		        ]},
		        {text: 'Reportes', href:'/reportes', img:'reporte',children: [
		               {text:'Layout', href:'#showlayout'},            
		        ]},
		        {text: 'Cambiar Password', href:'/my-info',img:'password' },
		      ]
		  }
		  if (data.tipoUsuario==1){
			  $scope.menu =   [			   		        
			   		        {text: 'Eventos', href:'#/showeventos',img:'evento'
			   		        },
			   		        {text: 'Reportes', href:'/reportes', img:'reporte', children: [
			   		               {text:'Layout', href:'#showlayout'},            
			   		        ]},
			   		        {text: 'Cambiar Password', href:'/my-info' },
			   		      ]  
		  }
		  if (data.tipoUsuario==2){
			  $scope.menu =   [			   		        
			   		        {text: 'Eventos', href:'#/showeventos', img:'evento'
			   		        },
			   		        {text: 'Cambiar Password', href:'/my-info' },
			   		      ]  
		  }
		
	}).
	error(function(data, status, headers, config) {
		alert("ERROR AL OBTENER AL USUARIO!")
	});    
    
}]);
    

/* Directives */
app.directive('navMenu', ['$parse', '$compile', function($parse, $compile) {
    return {
        restrict: 'C', //Element
        scope:true,
        link: function (scope, element, attrs)
        {
            scope.selectedNode = null;

            scope.$watch( attrs.menuData, function(val)
            {
             var template = angular.element('<ul id="parentTreeNavigation"><li ng-repeat="node in ' + attrs.menuData + '" ng-class="{active:node.active && node.active==true, \'has-dropdown\': !!node.children && node.children.length}"><img src="static/img/{{node.img}}.jpg" height="30" width="30"/><a ng-href="{{node.href}}" ng-click="{{node.click}}" target="{{node.target}}" >{{node.text}}</a><sub-navigation-tree></sub-navigation-tree></li></ul>');
             var linkFunction = $compile(template);
             linkFunction(scope);
             element.html(null).append( template );
            }, true );
        }
    };
}])
.directive('subNavigationTree', ['$compile', function($compile)
{
    return {
        restrict: 'E', //Element
        scope:true,
        link: function (scope, element, attrs)
        {
            scope.tree = scope.node;

            if(scope.tree.children && scope.tree.children.length ){
                var template = angular.element('<ul class="dropdown "><li ng-repeat="node in tree.children" node-id={{node.' + attrs.nodeId + '}}  ng-class="{active:node.active && node.active==true, \'has-dropdown\': !!node.children && node.children.length}"><a ng-href="{{node.href}}" ng-click="{{node.click}}" target="{{node.target}}" ng-bind-html-unsafe="node.text"></a><sub-navigation-tree tree="node"></sub-navigation-tree></li></ul>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith( template );
            }
            else
            {
                element.remove();
            }
        }
     };
}]);

app.controller('MainCtrl', ['$rootScope','$scope', 'createDialog', function($rootScope,$scope, createDialogService) {
  $scope.launchInlineModal = function() {
            createDialogService({
  id: 'simpleDialog',
  template:
    '<div class="row-fluid">' +
    ' <h3>This is how the Simple Modal was launched</h3>' +
    ' <div>' +
    '   <div class="codebox">' +
    '<pre>' +
    'createDialog({\n' +
    '    id: "inlineDialog",\n' +
    '    <span style="color:red">template: "&lt;div>&lt;!--template HTML here...-->&lt;/div>"</span>\n' +
    '    title: "A Inline Modal Dialog",\n' +
    '    backdrop: true,\n' +
    '    success: {\n' +
    '        label: "Yay",\n' +
    '        fn: function(){\n' +
    '            console.log("Inline modal closed");\n' +
    '        }\n' +
    '    }\n' +
    '});\n' +
    '</pre>\n' +
    '   </div>\n' +
    ' </div>\n' +
    '</div>',
  title: 'A Inline Modal Dialog',
  backdrop: true,
  success: {label: 'Success', fn: function() {console.log('Inline modal closed');}}
});
    };
    $scope.launchObjectModal = function() {
            createDialogService({
  id: 'simpleDialog',
  template: angular.element(
    '<div class="row-fluid">' +
    ' <h3>This is how the Simple Modal was launched</h3>' +
    ' <div>' +
    '   <div class="codebox">' +
    '<pre>' +
    'createDialog({\n' +
    '    id: "objectDialog",\n' +
    '    <span style="color:red">template: angular.element("...")</span>\n' +
    '    title: "A Object Modal Dialog",\n' +
    '    backdrop: true,\n' +
    '    success: {\n' +
    '        label: "Yay",\n' +
    '        fn: function(){\n' +
    '            console.log("Object modal closed");\n' +
    '        }\n' +
    '    }\n' +
    '});\n' +
    '</pre>\n' +
    '   </div>\n' +
    ' </div>\n' +
    '</div>'),
  title: 'A Object Modal Dialog',
  backdrop: true,
  success: {label: 'Success', fn: function() {console.log('Object modal closed');}}
});
    };
  $scope.launchSimpleModal = function(id,title,url) {
            createDialogService(''+url, {
  id: id,
  title: ''+title,
  backdrop: true,  
  success: {label: 'Guardar', fn: function() {
	  console.log('Simple modal closed');	  
	  }}
  });
    };
    $scope.launchComplexModal = function() {
            createDialogService('complexModal.html', {
  id: 'complexDialog',
  title: 'A Complex Modal Dialog',
  backdrop: true,
  controller: 'ComplexModalController',
  success: {label: 'Success', fn: function() {console.log('Complex modal closed');}}
}, {
      myVal: 15,
      assetDetails: {
              name: 'My Asset',
              description: 'A Very Nice Asset'
      }
    });
    };
}])
.factory('SampleFactory', function() {
    return {
            sample: function() {
                    console.log('This is a sample');
            }
    };
})
.controller('ComplexModalController', ['$scope', 'SampleFactory', 'myVal', 'assetDetails',
     function($scope, SampleFactory, myVal, assetDetails) {
             $scope.myVal = myVal;
             $scope.asset = assetDetails;
             SampleFactory.sample();
}]);