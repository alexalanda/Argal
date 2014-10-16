var ModalMedicoTratanteInstanceCtrl = function ($scope, $modalInstance,$route,$location,mensaje) {
  $scope.mensajeDialogoAltaImplant=mensaje;  
  $scope.resetImplForm = function () {
    $modalInstance.close();
    $route.reload();
  };
  $scope.closeMedTrat = function () {
    $modalInstance.dismiss('openAltaMedicoTratante');
    //$location.path('/showimplants');  
  };  

};

var AltaMedicoTratanteController= function($scope, $http, $rootScope,$route,$modal, $log){
		//filtro para poner todo el texto en may�sculas	
	    $scope.isUnchanged = function(implant) {
	    	$scope.mensajeError ="* Los campos de correo electr�nico deben escribirse correctamente";
	        return angular.equals(implant, $scope.master);        
	    };          
		$scope.tiposMT=[
		  			   {"idTipoMT":0,"descripcion":"RED"},
		  			   {"idTipoMT":1,"descripcion":"NO RED"},
		  			   {"idTipoMT":2,"descripcion":"INTERINO"}		  			   	 
		  			  ];
	    //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";	    
	    $scope.guardarMedicoTratante = function (){    		    		  
	    	console.log("MEDCOSTRAT");
	    	
	    	console.log($scope);
	    	$scope.medicoTratante=new Object();
	    	$scope.medicoTratante.idMedicoTratante=0;
	    	$scope.medicoTratante.nombre=$scope.nombreMT+ " " + $scope.appMT + " " + $scope.apmMT;
	    	$scope.medicoTratante.tipo=$scope.tipoMTSelected.idTipoMT;
	    	$scope.medicoTratante.especialidadMedTratante = new Array();
	    	var especialidades = new Array();
	    	if ($scope.especialidad1){
	    		var especialidadMedicoTratante = new Object();
	    		especialidadMedicoTratante.idMedicoTratante=0;
	    		especialidad.descripcion="CARDIOLOGIA";
	    		especialidades.push(especialidadMedicoTratante);
	    	}
	    	if ($scope.especialidad2){
	    		var especialidadMedicoTratante = new Object();
	    		especialidadMedicoTratante.idMedicoTratante=0;
	    		especialidadMedicoTratante.descripcion="INMUNOLOGIA";
	    		especialidades.push(especialidadMedicoTratante);
	    	}
	    	if ($scope.especialidad3){
	    		var especialidadMedicoTratante = new Object();
	    		especialidadMedicoTratante.idMedicoTratante=0;
	    		especialidadMedicoTratante.descripcion="PEDIATRIA";
	    		especialidades.push(especialidadMedicoTratante);
	    	}
	    	$scope.medicoTratante.especialidadMedTratante=especialidades;
	    	console.log($scope.medicoTratante);
	    	delete Array.prototype.toJSON;	    	
	    	$http.defaults.headers.post["Content-Type"] = "application/json";
	    	$http.post('mvc/evento/guardarmedtrat',$scope.medicoTratante).
	    	  success(function(data, status, headers, config) {
	    		  //$scope.openDialogImpl();
	    		  alert("Se guardó correctamente");
	    		  $scope.closeMedTrat();
	    		  $scope.alerts = 
	     			 [{ type: 'success', msg: 'Implant Agregado con Exito!'}];    		                 
	     		  $route.reload();    	
	    	  }).
	    	  error(function(data, status, headers, config) {
	    		  alert("Error! Intente de nuevo!");
	    	  });
	    };
	    	    
	    $scope.openEditarMedTrat = function () {
	    	alert("ok")
	        var modalInstance = $modal.open({
	          templateUrl: 'modalAltaImplant.html',
	          controller: ModalMedicoTratanteInstanceCtrl,
	          resolve: {
	        	  mensaje: function () {
	                  return "SE AGREG� CORRECTAMENTE AL IMPLANT!";
	                }
	          }
	        });
	        modalInstance.result.then(function (selectedItem) {	          
	        }, function () {          
	        });
	      };	     
};

var EditarMedicoTratanteController= function($scope, $http, $rootScope,$route,$modal, $log){
	$scope.implant = $rootScope.implant;					
    $scope.message = 'EDITAR DATOS DE UN IMPLANT';
    $scope.mensajeError ="";
    $scope.isUnchanged = function(implant) {
    	$scope.mensajeError ="* Los campos de correo electr�nico deben escribirse correctamente";
        return angular.equals(implant, $scope.master);        
    };          
        
    
    $scope.actualizarImplant = function (){    	    	
    	$http.post('mvc/implant/actualizarimplant',$scope.implant).
    	  success(function(data, status, headers, config) {
    		  $scope.alerts = 
    			 [{ type: 'success', msg: 'Implant Actualizado con Exito!'}];    		                 
    		  $route.reload();    		  
    	  }).
    	  error(function(data, status, headers, config) {
    		  $scope.alerts = 
   			  [{ type: 'danger', msg: 'ERROR! No se pudieron aplicar los cambios, intente de nuevo.' }];    		                      
    	  });
    };
    
    $scope.closeAlertEditarImplant = function(index) {
      $scope.alerts.splice(index, 1);
    };    
                
};

var MedicoTratanteController= function ($scope,$http,$rootScope,$route,$modal,$filter,ngTableParams) {	
	$http.post('mvc/evento/getmedicostratantes',$scope.implant).
	  success(function(data, status, headers, config) {		 		  
		  setDatosMedTrat(data);
	  }).
	  error(function(data, status, headers, config) {
		  alert("Error al cargar los implants! Intente de nuevo.");
	 });
	
	var setDatosMedTrat= function (data){
	    $scope.data = data;
	        $scope.tableParams = new ngTableParams({
	            page: 1,            // show first page
	            count: 10,          // count per page
	            filter: {
	                //name: 'M'       // initial filter
	            },
	            sorting: {
	                //name: 'asc'     // initial sorting
	            }
	        }, {
	            total: data.length, // length of data
	            getData: function ($defer, params) {
	                // use build-in angular filter
	                var filteredData = params.filter() ?
	                        $filter('filter')(data, params.filter()) :
	                        data;
	                var orderedData = params.sorting() ?
	                        $filter('orderBy')(filteredData, params.orderBy()) :
	                        data;

	                params.total(orderedData.length); // set total for recalc pagination
	                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	            }
	        });

	        $scope.changeSelection = function(args) {
	        	$rootScope.medicoTratanteSel={};
	        	}
	};
    
    $scope.editarImplant = function (){    	
    	alert("Editar Implant");
    };
    $scope.cancelImplForm = function () {
        $modalInstance.dismiss('cancelImplForm');
      };
    $scope.eliminarDesactImplant = function (){    	
    	if (confirm("Desea eliminar al Implant: "+$scope.implant.nombreImplant+"?")){
    		delete Array.prototype.toJSON;	    	
	    	$http.defaults.headers.post["Content-Type"] = "application/json";	    	
    		$http.post('mvc/implant/eliminarimplant',$scope.implant).
    		  success(function(data, status, headers, config) {    		
    			  $scope.openEditarImplant('SE ELIMINÓ CORRECTAMENTE AL IMPLANT!','eliminardesacimpldialog.html');    			  
    			  $route.reload();    			  
    		  }).
    		  error(function(data, status, headers, config) {
    			  alert("ERROR AL ELIMINAR AL IMPLANT! Intente de nuevo");
    		 });	
    	}    	
    };
    $scope.openEditarMedTrat = function (msg,url) {
        var modalInstance = $modal.open({
        	windowClass: "modal",
          templateUrl: url,
          controller: ModalMedicoTratanteInstanceCtrl,
          resolve: {
        	  mensaje: function () {
                  return msg;
                }
          }
        });
        modalInstance.result.then(function (selectedItem) {          
        }, function () {          
        });
      };

    $scope.openEditarImplant = function (msg,url) {
        var modalInstance = $modal.open({
        	windowClass: "modal",
          templateUrl: url,
          controller: ModalImplantInstanceCtrl,
          resolve: {
        	  mensaje: function () {
                  return msg;
                }
          }
        });
        modalInstance.result.then(function (selectedItem) {          
        }, function () {          
        });
      };
};

 