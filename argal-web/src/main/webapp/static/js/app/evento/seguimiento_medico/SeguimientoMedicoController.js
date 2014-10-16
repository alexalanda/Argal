var SeguimientoMedicoController = function($scope, $http, $timeout,$rootScope,$location,$modal,$filter,ngTableParams) {
	$rootScope.regreportemedicoselected=new Object();
	$rootScope.editregreportemedicoselected = new Object();
	$scope.eventoEditSelected=$rootScope.eventoEditSelected;	
	$scope.subtotalGastosProcedente="";	
	$scope.subtotalGastosDesviado="";
	$rootScope.rowCollectionSeguimientoMedico=$rootScope.eventoEditSelected.bitacoras;
	
	
	var setDatosBitacoras= function (data){
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
	        	$rootScope.editbitacora={};	
	        	$rootScope.editbitacora.idBitacora=args.idBitacora;
	        	$rootScope.editbitacora.observaciones=args.observaciones;
	        	console.log("SELECTED");
	            console.log($rootScope.editbitacora);        
	         }
	};
	console.log($rootScope.rowCollectionSeguimientoMedico);
	setDatosBitacoras($rootScope.rowCollectionSeguimientoMedico);
	
	$scope.tipopartos=[
	                    {'idTipoParto':1, 'descripcion':'PARTO NATURAL'},
	                    {'idTipoParto':2, 'descripcion':'CES�REA'}
	                 ];
	$scope.medicostratantes=[
	                    {'id':1, 'nombre':'NICOL�S RIBIERA'},
	                    {'id':2, 'nombre':'ANASTASIO RIBERA'}
	                 ];
	
	$scope.reportesmedicos=[
	   {'idRegistroMedico':1, 'descripcion':'PACIENTE ESTABLE'},
	   {'idRegistroMedico':2, 'descripcion':'EN ESPERA DE RESULTADOS'},
	   {'idRegistroMedico':3, 'descripcion':'PACIENTE EN ESPERA DE ALTA'},
	   {'idRegistroMedico':4, 'descripcion':'PACIENTE GRAVE'},
	   {'idRegistroMedico':5, 'descripcion':'PACIENTE TERMINAL'},	  
	   {'idRegistroMedico':6, 'descripcion':'PACIENTE EN ESPERA DE DIAGNOSTICO'}
	];
			
    
    $scope.showFormNac = function(){
    	console.log($scope);
    	if ($scope.regreportemedicoselected!=null){
    		if ($scope.regreportemedicoselected.idRegistroMedico==5)
    			document.getElementById("divDef").style.display = 'block';
    		else
    			document.getElementById("divDef").style.display = 'none';
    	}
    };
    
    $scope.showAltaSeguimientoMedicoForm = function(){
    	document.getElementById("divSeguimientoMedicoController").style.display = 'none';
    	document.getElementById("divAltaSeguimientoMedicoController").style.display = 'block';
    };
    
    $scope.$on('selectionChange', function (event, args) {    	    	
    	//$rootScope.cliente=args.item;
      });
    
    $scope.showEditaSeguimientoMedicoForm = function(){
    	console.log($scope);
    	document.getElementById("divSeguimientoMedicoController").style.display = 'none';
    	document.getElementById("divEditaSeguimientoMedicoController").style.display = 'block';
    };
    
    $scope.hideAltaSeguimientoMedicoForm = function(){
    	document.getElementById("divSeguimientoMedicoController").style.display = 'block';
    	document.getElementById("divAltaSeguimientoMedicoController").style.display = 'none';
    };
    $scope.hideEditaSeguimientoMedicoForm = function(){
    	document.getElementById("divSeguimientoMedicoController").style.display = 'block';
    	document.getElementById("divEditaSeguimientoMedicoController").style.display = 'none';
    };
    
    $scope.today = function() {
		$scope.dt = new Date();
		$scope.dt2 = new Date();
	};
	$scope.today();
	$scope.showWeeks = false;
	$scope.toggleWeeks = function () {
		$scope.showWeeks = ! $scope.showWeeks;
	};

	$scope.clear = function () {
		$scope.dt = null;
		$scope.dt2 = null;
	};
	$scope.valueTime = new Date(0, 0, 1, 14, 57);
	// Disable weekend selection
	$scope.disabled = function(date, mode) {
	  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = ( $scope.minDate ) ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};
	$scope.dateOptions = {
	    'year-format': "'yy'",
	    'starting-day': 1
	};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
	$scope.format = $scope.formats[0];
	
	$scope.guardarEditarBitacora = function (){
		$scope.eventoRegistroBitacora= new Object();
		$scope.eventoRegistroBitacora.idEvento=$rootScope.eventoEditSelected.idEvento;
		console.log("SAVE VALUES");
		console.log($scope);
		$scope.eventoRegistroBitacora.bitacoras=new Array(1);
		var bitacora=new Object();
		bitacora.idBitacora=$rootScope.editbitacora.idBitacora;
		bitacora.idRegistroMedico=$scope.editregreportemedicoselected.idRegistroMedico;
		bitacora.observaciones=$rootScope.editbitacora.observaciones;
		bitacora.descripcion=$scope.editregreportemedicoselected.descripcion;
		$scope.eventoRegistroBitacora.bitacoras.push(bitacora);
		delete Array.prototype.toJSON;	    	
		$http.defaults.headers.post["Content-Type"] = "application/json";				
		console.log("SAVE VALUES");
		console.log($scope.eventoRegistroBitacora);
		$http.post('mvc/evento/guardareditarbitacora',$scope.eventoRegistroBitacora).
			success(function(data, status, headers, config) {
		    	  alert("Se actualiz� correctamente la bit�cora");
		    	  $rootScope.rowCollectionSeguimientoMedico=data.bitacoras;
		    	  $rootScope.eventoEditSelected.bitacoras=data.bitacoras;
		    	  //$location.path('/showeventos');
		    }).error(function(data, status, headers, config) {
		        // called asynchronously if an error occurs
		        // or server returns response with an error status.
		    	  alert("Error al registrar la bit�cora"+data);
		    });		
				
		$scope.hideEditaSeguimientoMedicoForm();
	};
	$scope.guardarBitacora = function (){
		$scope.eventoRegistroBitacora= new Object();
		$scope.eventoRegistroBitacora.idEvento=$rootScope.eventoEditSelected.idEvento;
		console.log("SAVE VALUES");
		console.log($scope);
		$scope.eventoRegistroBitacora.bitacoras=new Array(1);
		var bitacora=new Object();
		bitacora.idRegistroMedico=$scope.regreportemedicoselected.idRegistroMedico;
		bitacora.observaciones=$scope.bitacora.observaciones;
		bitacora.descripcion=$scope.editregreportemedicoselected.descripcion;
		$scope.eventoRegistroBitacora.bitacoras.push(bitacora);
		delete Array.prototype.toJSON;	    	
		$http.defaults.headers.post["Content-Type"] = "application/json";				
		console.log("SAVE VALUES");
		console.log($scope.eventoRegistroBitacora);
		$http.post('mvc/evento/guardarbitacora',$scope.eventoRegistroBitacora).
			success(function(data, status, headers, config) {
		    	  alert("Se registr� correctamente la bit�cora");
		    	  $rootScope.rowCollectionSeguimientoMedico=data.bitacoras;
		    	  $rootScope.eventoEditSelected.bitacoras=data.bitacoras;
		    	  //$location.path('/showeventos');
		    }).error(function(data, status, headers, config) {
		        // called asynchronously if an error occurs
		        // or server returns response with an error status.
		    	  alert("Error al registrar la bit�cora"+data);
		    });		
				
		$scope.hideAltaSeguimientoMedicoForm();
	};
};
