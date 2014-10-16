var CedulaControlController = function($scope, $http, $timeout,$rootScope,$location,$modal) {
	$scope.eventoEditSelected=$rootScope.eventoEditSelected;
	console.log($rootScope.eventoEditSelected);
	$scope.subtotalGastosProcedente="";	
	$scope.subtotalGastosDesviado="";
	$rootScope.subTotalTipoGastoResumen1=0.0;
	$rootScope.subTotalTipoGastoResumen2=0.0;
	$rootScope.subTotalTipoGastoResumen3=0.0;
	
	//Obtener el resumen de gastos
	var arrayTmp = new Array();
	arrayTmp = $rootScope.eventoEditSelected.gastos;
	console.log(arrayTmp.length);
	//Obtener el total de gastos seg�n el tipo seleccionado		
	for (i=0;i<arrayTmp.length;i++){
		if (arrayTmp[i]!=null){
			if (arrayTmp[i].idTipoCargo!=null){
				if (arrayTmp[i].idTipoCargo==1 && arrayTmp[i].idArea==1){				
					var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;					
					$rootScope.subTotalTipoGastoResumen1=montoTmp;					
				}
				if (arrayTmp[i].idTipoCargo==2){				
					var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;
					$rootScope.subTotalTipoGastoResumen2=$rootScope.subTotalTipoGastoResumen2+montoTmp;					
				}
				if (arrayTmp[i].idTipoCargo==3){				
					var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;
					$rootScope.subTotalTipoGastoResumen3=$rootScope.subTotalTipoGastoResumen3+montoTmp;					
				}
			}
		}
	}	
	//-----------------------------------------
	
	//Al seleccionar un tipo de Cargo, se llama a �sta function	
	$scope.addSubtotales= function (){
		$rootScope.workspaces = new Array();
		var eventoTmp=$rootScope.eventoEditSelected;
		
		if (eventoTmp.tipoEvento!=null){
			console.log("Seleccionado el tipo de Cargo:");
			console.log(eventoTmp.tipoEvento.idTipoEvento);
			console.log(eventoTmp);
		}
		var arrayTmp = new Array();
				
		$scope.subTotalTipoGasto= 0.0;		
		$scope.subTotalTipoGasto2= 0.0;
		
		//Obtener tipo de Seguro, banco o aseguradora
		if (eventoTmp.tipoEvento.idTipoEvento==1 && eventoTmp.registroSeguroPersonal!=null){
			$scope.tipoSeguroTmp=1;			
		}
		if (eventoTmp.tipoEvento.idTipoEvento==2 && eventoTmp.registroGastosMayores!=null){			
			$scope.tipoSeguroTmp=2;
		}
		arrayTmp = eventoTmp.gastos;
		
		//Obtener el total de gastos seg�n el tipo seleccionado		
		for (i=0;i<arrayTmp.length;i++){
			if (arrayTmp[i]!=null){
				if (arrayTmp[i].idTipoCargo!=null){
					if (arrayTmp[i].idTipoCargo==$scope.tipocargoselected.idTipoCargo && $scope.tipocargoselected.idTipoCargo==1){
						var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;
						if (arrayTmp[i].idRubro==1)
							$scope.subTotalTipoGasto=$scope.subTotalTipoGasto+montoTmp;
						else
							$scope.subTotalTipoGasto2=$scope.subTotalTipoGasto2+montoTmp;
					}
					else{
						if (arrayTmp[i].idTipoCargo==$scope.tipocargoselected.idTipoCargo){
						var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;
						$scope.subTotalTipoGasto=$scope.subTotalTipoGasto+montoTmp;
						}
					}
				}
			}
		}
						
		$scope.subTotalTipoGasto=Math.round($scope.subTotalTipoGasto);
		$scope.subTotalTipoGasto2=Math.round($scope.subTotalTipoGasto2);
		
		$rootScope.tipocargoselected=new Object();
		//Se guardan en rootScope los tipos de area seg�n se selecciona
		console.log("TIPO DE CARGO:");
		console.log($scope.tipocargoselected.idTipoCargo);
		console.log($scope.tipocargoselected);
				
		$rootScope.tipocargoselected=$scope.tipocargoselected;
		
		console.log("TOTAL GASTOS:");
		console.log($scope.subTotalTipoGasto);
		
		/*if ($scope.tipocargoselected.idTipoCargo==1){
			$scope.subtotalesMsj="SUB-TOTAL GASTOS PROCEDENTES:$32423.00";
		}
		else{
			$scope.subtotalesMsj="SUB-TOTAL DESV�OS:$5433.00";
		}*/
		if ($scope.tipocargoselected.idTipoCargo==1){
			$rootScope.tipoareaselected={'idArea':1, 'descripcion':'PISO'};
			$rootScope.tipoareaedocuentaselected={'idArea':1, 'descripcion':'PISO'};
			$scope.addWorkspace();
		}
	};
	$scope.causascargos=[
	       	 {'idCausaCargo':1, 'descripcion':'NO UTILIZADO'},
	       	 {'idCausaCargo':2, 'descripcion':'DUPLICADO'},
	       	 {'idCausaCargo':3, 'descripcion':'NO INDICADO POR DIAGN�STICO'},
	       	 {'idCausaCargo':4, 'descripcion':'NO APARECE EN INDICACIONES M�DICAS'},
	       	 {'idCausaCargo':5, 'descripcion':'COSTO INDEBIDO'}
	       	];		
	$scope.tiposcargoedocuenta=[
	       	         {'idTipoCargoEdoCuenta':1, 'descripcion':'PARCIAL'},
	       	         {'idTipoCargoEdoCuenta':2, 'descripcion':'EGRESO'},
	       	         {'idTipoCargoEdoCuenta':3, 'descripcion':'FINAL'}	       	         
	       	       ];
	$scope.tiposcargos=[
	         {'idTipoCargo':1, 'descripcion':'ESTADO DE CUENTA'},	         
	         {'idTipoCargo':2, 'descripcion':'DESVIO'},
	         {'idTipoCargo':3, 'descripcion':'DESGLOSE DE GASTOS RELEVANTES'}
	       ];
	$scope.areascargosEdoCuenta=[
	                  {'idArea':1, 'descripcion':'ESTADO DE CUENTA PARCIAL'},
	                  {'idArea':1, 'descripcion':'ESTADO DE CUENTA FINAL'}
	        ];
	$scope.areascargos=[
	         {'idArea':1, 'descripcion':'PISO'},
	         {'idArea':2, 'descripcion':'QUIROFANO'},
	         {'idArea':3, 'descripcion':'TERAPIA INTENSIVA, INTERMEDIA, NEONATAL'},
	         {'idArea':4, 'descripcion':'URGENCIAS'},
	         {'idArea':5, 'descripcion':'GASTOS PERSONALES'}
	       ];	
	$scope.rubroscargos=[	       	 
	       	 {'idRubro':1, 'descripcion':'MEDICAMENTOS'},
	       	 {'idRubro':2, 'descripcion':'MATERIAL'},
	       	 {'idRubro':3, 'descripcion':'LABORATORIO Y RX'},
	       	 {'idRubro':4, 'descripcion':'TERAPIA RESPIRATORIA'},
	       	 {'idRubro':5, 'descripcion':'HABITACIONES'},
	       	 {'idRubro':6, 'descripcion':'ANESTESIA (MAQ Y GAS)'},
	       	 {'idRubro':7, 'descripcion':'RENTAS DE EQUIPOS'},
	       	 {'idRubro':8, 'descripcion':'INSUMOS PROVEEDOR EXTERNO'},
	       	 {'idRubro':9, 'descripcion':'CUBICULOS'},
	       	 {'idRubro':10, 'descripcion':'TERAPIA INTENSIVA'},
	       	 {'idRubro':11, 'descripcion':'BANCO DE SANGRE'},
	       	 {'idRubro':12, 'descripcion':'QUIROFANO'},
	         {'idRubro':13, 'descripcion':'TIEMPOS DE SALA'}	  
	       ];
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();
	$scope.showWeeks = false;
	$scope.toggleWeeks = function () {
		$scope.showWeeks = ! $scope.showWeeks;
	};

	$scope.clear = function () {
		$scope.dt = null;
	};

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
	
	$scope.guardarGasto = function (){
		$scope.eventoRegistroGasto= new Object();
		$scope.eventoRegistroGasto.idEvento=$rootScope.eventoEditSelected.idEvento;		
		if ($rootScope.eventoEditSelected!=null){
			//$scope.eventoRegistroGasto=$rootScope.eventoEditSelected;			
			$scope.eventoRegistroGasto.gastos=new Array(1);						
			console.log($scope.eventoRegistroGasto.gastos);
			console.log($scope);
			var gasto=new Object();
			gasto.idTipoCargo=$scope.regtipocargoselected.idTipoCargo;
			$rootScope.idTipoCargoRegistros=$scope.regtipocargoselected.idTipoCargo;
			//Si el gasto no es desv�o
			console.log
			if (gasto.idTipoCargo>=2){
				gasto.idArea=$scope.regtipoareaselected.idArea;
			}
			else{
				gasto.idArea=1;
			}
			if (gasto.idTipoCargo==1){
				gasto.nombre="EDO DE CUENTA";
				console.log("!TIPO DE GASTO");
				console.log($scope.tiposcargoedocuentaselected);
				if ($scope.tiposcargoedocuentaselected==1){
					gasto.idArea=1;
				}
				else
					gasto.idArea=2;
			}
			if (gasto.idTipoCargo==3) 
				gasto.nombre="GASTO RELEVANTE";
			if (gasto.idTipoCargo==2){
				gasto.idRubro=$scope.regtiporubroselected.idRubro;
				gasto.idRazon=$scope.regrazonesAltaGastoImproSelected.idCausaCargo;
				gasto.cantidad=$scope.cargo.cantidad;
				gasto.nombre=$scope.cargo.nombre;
			}
			else{
				gasto.idRubro=1;
				gasto.idRazon=1;				
				gasto.cantidad=1;
			}
			gasto.montoUnitario=$scope.cargo.montoUnitario;
			gasto.fechaIngreso="";
			
			
			gasto.rutaEvidencia="";
			$scope.eventoRegistroGasto.gastos.push(gasto);
			delete Array.prototype.toJSON;	    	
		    $http.defaults.headers.post["Content-Type"] = "application/json";
		    console.log("SAVE VALUES");
		    console.log($scope.eventoRegistroGasto);
		    $http.post('mvc/evento/guardargasto',$scope.eventoRegistroGasto).
		    	success(function(data, status, headers, config) {
		    		  alert("Se registr� correctamente el gasto!");
		    		  $rootScope.eventoEditSelected=data;		    		  
		    		  $scope.addSubtotales();
		    		  //$location.path('/showeventos');
		    	}).error(function(data, status, headers, config) {
		    	    // called asynchronously if an error occurs
		    	    // or server returns response with an error status.
		    		  alert("Error guardando el registro"+data);
		    });
		}				
		$scope.hideAltaCedulaControlForm();
	};
	    
    $scope.showAltaCedulaControlForm = function(){
    	document.getElementById("divTableCedulaControl").style.display = 'none';
    	document.getElementById("divAltaCedulaControlController").style.display = 'block';
    };
    
    $scope.hideAltaCedulaControlForm = function(){
    	document.getElementById("divTableCedulaControl").style.display = 'block';
    	document.getElementById("divAltaCedulaControlController").style.display = 'none';
    };    
    
	var setAllInactive = function() {
	       angular.forEach($scope.workspaces, function(workspace) {	        	
	       	workspace.active = false;
	       });
	};
	 
	var addNewWorkspace = function(titulo,rowCollection) {
		var id = $rootScope.workspaces.length + 1;	        
	    $rootScope.workspaces.push({
	    		id: id,
	            name: titulo,
	            active: true,
	            rowCollection:rowCollection	            
	    });
	};
	 
	$rootScope.workspaces = new Array();
	
	$scope.addWorkspace = function () {	        
		console.log("Se crean las colecciones de gastos seg�n el tipo!");
		console.log($scope.tipoareaselected);
		console.log($scope.tipoareaedocuentaselected);
		console.log("------------");
		setAllInactive();
		if ($scope.tipoareaedocuentaselected!=null)
			$scope.tipoareaselected=$scope.tipoareaedocuentaselected;
		
		if ($scope.tipoareaselected!=null || $scope.tipoareaedocuentaselected!=null){
						
			console.log("NOT NULL");
			console.log($scope.tipoareaselected);
			$rootScope.tipoareaselected=new Object();
			$rootScope.tipoareaselected=$scope.tipoareaselected;
			$rootScope.workspaces= new Array();		
			$scope.rowCollectionA1= new Array(3);
			for (l=0;l<3;l++)
				$scope.rowCollectionA1[l]= new Array();
			var eventoTmp=$rootScope.eventoEditSelected;
			console.log("EVENTOS DATA REC");			
			var arrayTmp = new Array();
			console.log(eventoTmp);
			console.log(eventoTmp.registroSeguroPersonal);			
			arrayTmp = eventoTmp.gastos;			
			console.log("GETTING DATA!");
			console.log($rootScope.tipoareaselected);
			console.log($rootScope.tipocargoselected);
			console.log(arrayTmp);
			var indexR1=0;
			var indexR2=0;
			var indexR3=0;
			var indexR4=0;
			var indexR5=0;
			var indexR6=0;
			for (i=0;i<arrayTmp.length;i++){
				console.log("CHECKING GASTOS, total:"+arrayTmp.length);				
				console.log("TIPO DE CARGO:");
				console.log($rootScope.tipocargoselected);
				console.log(arrayTmp[i].idTipoCargo);
				// Si el tipo de GASTO ==1				
				if ($rootScope.tipocargoselected.idTipoCargo==1){
					if (arrayTmp[i]!=null && arrayTmp[i]!="" && arrayTmp[i].idTipoCargo==1 && $rootScope.tipoareaselected.idArea==1){								
					//Se agrega �ste gasto
					console.log("Este gasto se toma en cuenta");
					console.log(arrayTmp[i]);
					if (arrayTmp[i].idRubro==1){ 
						$scope.rowCollectionA1[0][indexR1++]=arrayTmp[i];
						console.log("INDEX"+indexR1);
					}
					if (arrayTmp[i].idRubro==2){
						$scope.rowCollectionA1[1][indexR2++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==3){ 
						$scope.rowCollectionA1[2][indexR3++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==4){ 
						$scope.rowCollectionA1[3][indexR4++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==5){ 
						$scope.rowCollectionA1[4][indexR5++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==6){ 
						$scope.rowCollectionA1[5][indexR6++]=arrayTmp[i];
					}
				}	
				}
				if ($rootScope.tipocargoselected.idTipoCargo==2){
					if (arrayTmp[i]!=null && arrayTmp[i]!=""){
					if (arrayTmp[i].idArea==$rootScope.tipoareaselected.idArea && arrayTmp[i].idTipoCargo==$rootScope.tipocargoselected.idTipoCargo){				
					if (arrayTmp[i].idRubro==1){ 
						$scope.rowCollectionA1[0][indexR1++]=arrayTmp[i];
						console.log("INDEX"+indexR1);
					}
					if (arrayTmp[i].idRubro==2){
						$scope.rowCollectionA1[1][indexR2++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==3){ 
						$scope.rowCollectionA1[2][indexR3++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==4){ 
						$scope.rowCollectionA1[3][indexR4++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==5){ 
						$scope.rowCollectionA1[4][indexR5++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==6){ 
						$scope.rowCollectionA1[5][indexR6++]=arrayTmp[i];
					}
					}
					}
				}
				if ($rootScope.tipocargoselected.idTipoCargo==3){
					if (arrayTmp[i]!=null && arrayTmp[i]!=""){
					if (arrayTmp[i].idArea==$rootScope.tipoareaselected.idArea && arrayTmp[i].idTipoCargo==$rootScope.tipocargoselected.idTipoCargo){				
					if (arrayTmp[i].idRubro==1){ 
						$scope.rowCollectionA1[0][indexR1++]=arrayTmp[i];
						console.log("INDEX"+indexR1);
					}
					if (arrayTmp[i].idRubro==2){
						$scope.rowCollectionA1[1][indexR2++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==3){ 
						$scope.rowCollectionA1[2][indexR3++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==4){ 
						$scope.rowCollectionA1[3][indexR4++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==5){ 
						$scope.rowCollectionA1[4][indexR5++]=arrayTmp[i];
					}
					if (arrayTmp[i].idRubro==6){ 
						$scope.rowCollectionA1[5][indexR6++]=arrayTmp[i];
					}
					}
					}
				}
			}											
			console.log($scope.rowCollectionA1); 
			console.log("Se establecen las pesta�as seg�n el tipo de cargo!");
			console.log("check");
			console.log($scope.tipocargoselected);
			if ($rootScope.tipocargoselected.idTipoCargo==1){
				var encabezadosTipoArea1=["ESTADO DE CUENTA PARCIAL","ESTADO DE CUENTA FINAL"];
				for (j=0;j<3;j++){
					var arrayTmp2=$scope.rowCollectionA1[j];
					console.log("check");
					console.log(arrayTmp2);			
					if (arrayTmp2!="" && arrayTmp2!=null){
						addNewWorkspace(encabezadosTipoArea1[j],arrayTmp2);
					}									
				}	
			}
			else{
				for (j=0;j<3;j++){
					var arrayTmp2=$scope.rowCollectionA1[j];
					console.log("check");
					console.log(arrayTmp2);			
					if (arrayTmp2!="" && arrayTmp2!=null){
						addNewWorkspace($scope.rubroscargos[j+1].descripcion,arrayTmp2);
					}				
				}
			}
		}
	};     
};


var TabsChildController = function($scope, $log,$rootScope,ngTableParams, $http){
	$rootScope.editarEvento=false;
	//$scope.cargoEdit=new Object();
	$rootScope.cargoEdit=new Object();
	
	$rootScope.regEdittipoareaselected= new Object();
 	$rootScope.regEdittiporubroselected = new Object();
 	$rootScope.regEditrazonesAltaGastoImproSelected = new Object();
 	
 	$scope.regEdittipoareaselected=new Object();
	$scope.regtiporubroselected=new Object();
	$scope.regrazonesAltaGastoImproSelected=new Object();
	
    $scope.columnCollectionGlobal= [
           {label: 'ID GASTO', map: 'idGasto'},
	       {label: 'DESCRIPCION', map: 'nombre'},
	       {label: 'CANTIDAD', map: 'cantidad'},
	       {label: 'MONTO', map: 'montoUnitario'}
	       ];
	                         	 
     $scope.globalConfigGlobal = {    	        
	       isPaginationEnabled: true,
	       isGlobalSearchActivated: true,        
	       itemsByPage: 5,
	       selectionMode: 'single',
	       actions: {
	    	   list: { url: '/GetUsers' },
	    	   edit: { url: '/EditUser', title: 'Edit User', desc: 'Edit', iconClass: '' }, 
	    	   add: { url: '/AddUser', title: 'Add User', buttonClass: 'pull-right', iconClass: 'icon-plus', desc: ' Add User' }, // TODO: zkontrolovat default description
	    	   remove: { url: '/DelUser', title: 'Confirmation Dialog', msg: 'Do you really want to delete the user?' }
	       }
	  };
     
     $scope.$on('selectionChange', function (event, args) {    	    
     	//$rootScope.implant=args.item;
     	$rootScope.gastoSelected=args.item;
        console.log(args);        
     });
     
     $scope.showEditarCedulaControlForm = function(idTipoCargo,idGasto,idArea,nombre,montoUnitario, cantidad){
    	 
     	//document.getElementById("divTableCedulaControl").style.display = 'none';
     	document.getElementById("divEditarCedulaControlController").style.display = 'block';		
     	 
     	$rootScope.regEdittipoareaselected.idArea=idArea;
     	$rootScope.regEdittiporubroselected.idRubro=nombre;
     	$rootScope.regEditrazonesAltaGastoImproSelected.idCausaCargo=1;	 			
     	$rootScope.cargoEdit.nombre=nombre;
     	$rootScope.cargoEdit.montoUnitario=montoUnitario;
     	$rootScope.cargoEdit.cantidad=cantidad;
     	$rootScope.idGasto=idGasto;
     	$rootScope.editarGastoEvento=true;
     	$rootScope.idTipoCargo=idTipoCargo;
     };
     
     $scope.hideEditarCedulaControlForm = function(){
    	$rootScope.editarGastoEvento=false;
     	document.getElementById("divTableCedulaControl").style.display = 'block';
     	document.getElementById("divEditarCedulaControlController").style.display = 'none';
     };
     
     $scope.guardarGastoEdit = function (){    	
    	$scope.eventoRegistroGasto= new Object(); 							
 		var idGasto=$rootScope.gastoSelected;
 		console.log("SAVING"); 		
 		console.log($scope);
 		console.log($rootScope.regEdittipoareaselected);
 		console.log($rootScope.regEdittiporubroselected);
 		console.log($rootScope.regEditrazonesAltaGastoImproSelected); 		
 		console.log($rootScope.cargoEdit.nombre);
 		console.log($rootScope.cargoEdit.montoUnitario);
 		console.log($rootScope.cargoEdit.cantidad);
 		console.log($rootScope.idGasto);
 		console.log($rootScope.editarGastoEvento);
 		console.log($rootScope.eventoEditSelected.registroSeguroPersonal); 		
 		console.log($rootScope.idTipoCargo);

 		var eventoRegistroGasto= new Object();  			
 		eventoRegistroGasto.idEvento=$rootScope.eventoEditSelected.idEvento; 			 		
 		eventoRegistroGasto.gastos=new Array(1); 			 			
 		var gastoEdit= new Object();
 			gastoEdit.idGasto=$rootScope.idGasto;
 			gastoEdit.idTipoCargo=$rootScope.idTipoCargo;
 			gastoEdit.idArea=$rootScope.regEdittipoareaselected.idArea;
 			gastoEdit.idRubro=1;
 			gastoEdit.idRazon=$rootScope.regEditrazonesAltaGastoImproSelected.idCausaCargo;	
 			gastoEdit.fechaIngreso="";
 			gastoEdit.nombre=$rootScope.cargoEdit.nombre;
 			gastoEdit.montoUnitario=$rootScope.cargoEdit.montoUnitario;
 			gastoEdit.cantidad=$rootScope.cargoEdit.cantidad;
 			gastoEdit.rutaEvidencia="";		
 			eventoRegistroGasto.gastos.push(gastoEdit);
 			$rootScope.eventoEditSelected.gastos=eventoRegistroGasto.gastos;
 			delete Array.prototype.toJSON;	    	
 		    $http.defaults.headers.post["Content-Type"] = "application/json";
 		    console.log("SAVE VALUES");
 		    console.log(eventoRegistroGasto);
 		    //console.log($rootScope.eventoEditSelected);
 		    $http.post('mvc/evento/guardareditargasto',eventoRegistroGasto).
 		    	success(function(data, status, headers, config) {
 		    		$rootScope.eventoEditSelected=data; 		    				    		 		    		 
 		    		alert("Se actualiz� correctamente el gasto!");
 		    		$scope.addSubtotales();  
 		    		  //$location.path('/showeventos');
 		    	}).error(function(data, status, headers, config) {
 		    	    // called asynchronously if an error occurs
 		    	    // or server returns response with an error status.
 		    		  alert(data);
 		    });
 		 		
 		
 		$scope.hideEditarCedulaControlForm();
     };						
    
     $scope.eliminarGasto = function (idGasto){    	 
  		$scope.eventoRegistroGasto= new Object();
  		$scope.eventoRegistroGasto.idEvento=$rootScope.eventoEditSelected.idEvento;
  		$scope.eventoRegistroGasto.gastos=new Array(1); 			 			
 		var gastoEdit= new Object();
 		gastoEdit.idGasto=idGasto; 			
 		$scope.eventoRegistroGasto.gastos.push(gastoEdit);
 		//$rootScope.eventoEditSelected.gastos=eventoRegistroGasto.gastos;
  		if (confirm("�Seguro que desea eliminar el gasto:"+idGasto+"?")){
  			delete Array.prototype.toJSON;	    	
 		    $http.defaults.headers.post["Content-Type"] = "application/json";
 		    console.log("DELETE VALUES");
 		    console.log($scope.eventoRegistroGasto);
 		    $http.post('mvc/evento/eliminargasto',$scope.eventoRegistroGasto).
 		    	success(function(data, status, headers, config) {
 		    		  $rootScope.eventoEditSelected=data;
 		    		  alert("Se elimin� correctamente el gasto!");
 		    		  //$location.path('/showeventos');
 		    	}).error(function(data, status, headers, config) {
 		    	    // called asynchronously if an error occurs
 		    	    // or server returns response with an error status.
 		    		  alert(data);
 		    });
  		}
      };
};


