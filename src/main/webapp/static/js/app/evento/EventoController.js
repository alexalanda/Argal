var AltaEventoController= function($scope, $http, $timeout,$rootScope,$location,$modal){
	$scope.today = function() {
		$scope.dt = new Date();
		$scope.dt2 = new Date();
	};
    $scope.valueTime = new Date(0, 0, 1, 14, 57);
    $scope.valueTime2 = new Date(0, 0, 1, 14, 57);

    $scope.today();
	$scope.showWeeks = false;
	$scope.toggleWeeks = function () {
		$scope.showWeeks = ! $scope.showWeeks;
	};
	
	$scope.updateMedTrat = function(){
		console.log($scope.listaMedTrat);
		$rootScope.especialidadMedTratSel="";
		if ($scope.listaMedTrat.especialidadMedTratante.length>0){
			for (var i=0; i<$scope.listaMedTrat.especialidadMedTratante.length;i++){
				$rootScope.especialidadMedTratSel=$rootScope.especialidadMedTratSel+$scope.listaMedTrat.especialidadMedTratante[i].descripcion+",";
			}
		}
		switch ($scope.listaMedTrat.tipo){
			case 0:
				$rootScope.tipoMedTratSel="RED";
				break;
			case 1:
				$rootScope.tipoMedTratSel="NO RED";
				break;
			case 2:
				$rootScope.tipoMedTratSel="STAFF";					
				break;
			default:
				$rootScope.tipoMedTratSel="NINGUNA";
				break;
		}
		
	}
	
	$scope.clear = function () {
		$scope.dt = null;
		$scope.dt2 = null;
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
	
	$scope.oneAtATime = true;
	//$scope.listaTipoClienteSelected={idTipoSeguro:'',descripcion:''};		  	
	//filtro para poner todo el texto en may�sculas	
	$scope.master = {};		
	$scope.message = 'DATOS DEL INGRESO';
	$scope.mensajeError ="";
	$scope.companias={};
	$scope.hospSeleccionado="ok"+$rootScope.hospitalSeleccionado;
	$scope.tipoTratSl=$rootScope.tipoTratSl;	    
	$http.post('mvc/evento/getcombovalues').
		success(function(data, status, headers, config) {					 
			$scope.clientes=data[0];
			$scope.tiposseguro=data[1];
			$scope.tiposevento=data[2];
			$scope.medicosdictaminadores=data[4];		
			$scope.unidadesedades=[{descripcion:'AÑOS'},{descripcion:'MESES'},{descripcion:'DIAS'}];
			$scope.sexodatoscombo=[{descripcion:'MASCULINO'},{descripcion:'FEMENINO'}];
			$scope.parentescos=[{descripcion:'TITULAR'},{descripcion:'HIJA'},{descripcion:'HIJO'},{descripcion:'CONYUGE'},{descripcion:'MADRE'},{descripcion:'PADRE'}];
			$rootScope.nombreLogin=$rootScope.implantRoot.nombreImplant;
			$scope.antecedentes=[
			       {"idAntecedente":1,"nombre":"DIABETES MELLITUS"},
			       {"idAntecedente":2,"nombre":"CARDIOPATIA ISQUEMICA"},
			       {"idAntecedente":3,"nombre":"CARDIOPATIA VALVULAR"},
			       {"idAntecedente":4,"nombre":"HIPERTENSION ARTERIAL"},
			       {"idAntecedente":5,"nombre":"NEUMOPATIA CRONICA"},
			       {"idAntecedente":6,"nombre":"ENFERMEDAD VASCULAR CEREBRAL"},
			       {"idAntecedente":7,"nombre":"NEOPLASIAS"},
			       {"idAntecedente":8,"nombre":"HEPATOPATIAS"},
			       {"idAntecedente":9,"nombre":"NEFROPATIAS"},
			       {"idAntecedente":10,"nombre":"OTROS"},
			       {"idAntecedente":10,"nombre":"NINGUNO"}
			];
			$scope.censos=[
			  			   {"idCenso":1,"nombre":"SI"},
			  			   {"idCenso":2,"nombre":"NO"},			  			 
			  			];			
			$scope.jubilados=[
				  			   {"idJubilado":1,"nombre":"SI"},
				  			   {"idJubilado":2,"nombre":"NO"},			  			 
				  			];
			$scope.tiposparto=[
				  			   {"idTipoParto":1,"descripcion":"NATURAL"},
				  			   {"idTipoParto":2,"descripcion":"CESÁREA"},			  			 
				  			];
			$scope.espmedictratantes=[	    
			       {"idEspMedicoTratante":1,"nombre":"MAXILOFACIAL"},	    	   
			       //{"idEspMedicoTratante":1,"nombre":"GENETICA"},
			       {"idEspMedicoTratante":1,"nombre":"TOXICOLOGIA"}	    	   
			];						
			$http.post('mvc/evento/getmedicostratantes').
					success(function(data, status, headers, config) {
						$scope.medictratantes=data;			  
						console.log(data)
					}).
					error(function(data, status, headers, config) {
						alert(data);
					});
		}).error(function(data, status, headers, config) {
		}
	);
	    
	$scope.showTipoSeguroView = function(id) {		
	   	console.log($scope.listaTipoClienteSelected.idTipoSeguro);
	   	$scope.evento="";
	   	$scope.evento.tipoSeguro=$scope.listaTipoClienteSelected.idTipoSeguro;
	   	if ($scope.listaTipoClienteSelected.idTipoSeguro==1){
	   		$rootScope.idtipoSeguroSel="1";
	   		document.getElementById("tipoSeguroPersonalDIV").style.display = 'block';
	   		document.getElementById("tipoSeguroGastosMayoresDIV").style.display = 'none';
	   	}
	   	else{
	   		$rootScope.tipoSeguroSel=" Aseguradora";
	   		$rootScope.idtipoSeguroSel="2";
	   		document.getElementById("tipoSeguroPersonalDIV").style.display = 'none';
	   		document.getElementById("tipoSeguroGastosMayoresDIV").style.display = 'block';
	   	}
	   	
	};
	
	$scope.isUnchanged = function(evento) {
	   	//$scope.mensajeError ="* Los campos de correo electr�nico deben escribirse correctamente";
	    //return angular.equals(evento, $scope.master);        
	};          
	
	$scope.cargarHosp = function (){	    
	};	   
	
	/////////////////////////// VALIDACIONES DEL FORMULARIO DE ALTA DE EVENTO  ////////////////////////////////
	$scope.validaFormularioGuardarEventoSeccion1= function(){
		var msjCamposRequeridos="Falta por llenar campos en la secci\u00f3n 1).Los siguientes Campos son requeridos:\n";
		var numErrors=0;		
		if ($scope.hospitalSeleccionadoId==null || $scope.hospitalSeleccionadoId=="" ){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Hospital.\n";		
			numErrors++;		
		}
		if ($scope.listaClienteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Cliente.\n";		
			numErrors++;		
		}
		if ($scope.evento!=null){
			if ($scope.evento.folioHospitalario==null){ 
				msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Folio Hospitalario.\n";		
				numErrors++;		
			}
			if ($scope.evento.folioArgal==null){ 
				msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Folio Argal.\n";		
				numErrors++;		
			}
		}
		if ($scope.listaTipoClienteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Tipo de Cliente.\n";		
			numErrors++;		
		}
		if ($scope.listaTipoEventoSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Tipo de Evento.\n";		
			numErrors++;		
		}
		if ($scope.listaTipoClienteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar una fecha de Ingreso.\n";		
			numErrors++;		
		}
		if ($scope.valueTime==null || $scope.valueTime==""){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar una hora de Ingreso.\n";		
			numErrors++;		
		}
		if (numErrors>0){
			alert(msjCamposRequeridos);
			return false;
		}
		return true;
	}
	
	$scope.validaFormularioGuardarEventoSeccion2= function(idTipoSeguro,idTipoCliente){
		var msjCamposRequeridos="Falta por llenar campos en la secci\u00f3n 2).Los siguientes Campos son requeridos:\n";
		var numErrors=0;
		if (idTipoSeguro==1){
			if ($scope.evento.registroSeguroPersonal!=null){
				var testRSP=$scope.evento.registroSeguroPersonal;	
			}
			else{
				msjCamposRequeridos=msjCamposRequeridos+"* Debe llenar los campos del Titular.\n";		
				numErrors++;
				alert(msjCamposRequeridos);
				return false;
			}
		}
		if (idTipoSeguro==2){
			if ($scope.evento.registroGastosMayores!=null){
				var testRSP=$scope.evento.registroGastosMayores;	
			}
			else{
				msjCamposRequeridos=msjCamposRequeridos+"* Debe llenar los campos del Titular.\n";		
				numErrors++;
				alert(msjCamposRequeridos);
				return false;
			}
		}					
		if (testRSP.numeroNomina==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar un número de nómina.\n";		
			numErrors++;
		}
		if (testRSP.institucion==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar una Institución.\n";		
				numErrors++;
		}
		if (testRSP.numeroAutorizacion==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el número de autorización.\n";		
			numErrors++;
		}
		if (testRSP.nombreTitular==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el nombre del Titular.\n";		
			numErrors++;
		}
		if (testRSP.appTitular==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Paterno del Titular.\n";		
			numErrors++;
		}
		if (testRSP.apmTitular==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Titular.\n";		
			numErrors++;
		}
		if (idTipoCliente!=4){
			if (testRSP.nombrePaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Paciente.\n";		
				numErrors++;
			}
			if (testRSP.appPaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Paciente.\n";		
				numErrors++;
			}
			if (testRSP.apmPaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Paciente.\n";		
				numErrors++;
			}
			if (testRSP.edadPaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar la edad del Paciente.\n";		
				numErrors++;
			}
			if ($scope.unidadEdadPacienteSegPersonalSelected=="" || $scope.unidadEdadPacienteSegPersonalSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar la unidad de la edad del Paciente .\n";		
				numErrors++;
			}
			if ($scope.sexoPacienteSegPersonalSelected=="" || $scope.sexoPacienteSegPersonalSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el sexo del Paciente.\n";		
				numErrors++;
			}
			if ($scope.parentescoPacienteSegPersonalSelected=="" || $scope.parentescoPacienteSegPersonalSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el parentesco del Paciente.\n";		
				numErrors++;
			}			
		}
		if (idTipoCliente==4){
			if (testRSP.nombrePaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Nombre del Recien Nacido.\n";		
				numErrors++;
			}
			if ($scope.tipoPartoSelected=="" || $scope.tipoPartoSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el tipo de parto del recien nacido.\n";		
				numErrors++;
			}			
		}
							
		if (numErrors>0){
			alert(msjCamposRequeridos);
			return false;
		}
		return true;
	}

	$scope.validaFormularioGuardarEventoSeccion3= function(idTipoSeguro){
		var msjCamposRequeridos="Falta por llenar campos en la secci\u00f3n 3).Los siguientes Campos son requeridos:\n";
		var numErrors=0;		
		if ($scope.evento.numHabitacion=="" ){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Número de Habitación.\n";		
			numErrors++;		
		}
		if ($scope.antecedenteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Antecedente Patológico.\n";		
			numErrors++;		
		}
		//Solo cuando el tipo de Evento sea 2
		if ($scope.medDictaminadorSelected==null && idTipoSeguro==2){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Médico Dictaminador.\n";		
			numErrors++;		
		}
		if ($rootScope.idtipoIcd1==null || $rootScope.idtipoIcd1==""){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Diagnóstico de Ingreso 1.\n";		
			numErrors++;		
		}
		if ($rootScope.idtipoIcd2==null || $rootScope.idtipoIcd1==""){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Diagnóstico de Ingreso 2.\n";		
			numErrors++;		
		}
		if ($scope.listaMedTrat==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Médico Tratante.\n";		
			numErrors++;		
		}
		if (numErrors>0){
			alert(msjCamposRequeridos);
			return false;
		}
		return true;
	}
	/////////////////////////////////////////////////////END VALIDACIONES///////////////////////////////
	
	$scope.guardarEvento = function (){
		var valida=true;
		valida = $scope.validaFormularioGuardarEventoSeccion1();
		if (valida){
			valida=$scope.validaFormularioGuardarEventoSeccion2($scope.listaTipoClienteSelected.idTipoSeguro,$scope.listaTipoEventoSelected.idTipoEvento);
		}
		if (valida){
			valida=$scope.validaFormularioGuardarEventoSeccion3($scope.listaTipoClienteSelected.idTipoSeguro);
		}
		if (valida){		
				$scope.eventoInsert=new Object();
				//console.log("Scope");
			    //console.log($scope);
				//Datos generales en ambos tipos de seguro
				$scope.eventoInsert.horaIngreso=$scope.valueTime;   
				$scope.eventoInsert.folioArgal=$scope.evento.folioArgal; 
			    $scope.eventoInsert.folioHospital=$scope.evento.folioHospitalario;    
			    $scope.eventoInsert.implant=new Object();
			    $scope.eventoInsert.implant.idImplant=100;
			    $scope.eventoInsert.hospital=new Object();
			    $scope.eventoInsert.hospital.idHospital=$rootScope.hospitalSeleccionadoId;	    
			    	    
			    $scope.eventoInsert.medicoTratante=new Object();
			    $scope.eventoInsert.cliente=new Object();
			    $scope.eventoInsert.cliente.idCliente=$scope.listaClienteSelected.idCliente;	    	
			    $scope.eventoInsert.tipoSeguro=new Object();
			    $scope.eventoInsert.tipoSeguro.idTipoSeguro=$scope.listaTipoClienteSelected.idTipoSeguro;
			    $scope.eventoInsert.tipoEvento=new Object();
			    $scope.eventoInsert.tipoEvento.idTipoEvento=$scope.listaTipoEventoSelected.idTipoEvento;
			    
			    if ($scope.eventoInsert.tipoSeguro.idTipoSeguro==2){ 	
			    	$scope.eventoInsert.medicoTratante.nombre=$scope.listaMedTrat.nombre;
			    	$scope.eventoInsert.medicoTratante.idMedicoTratante=$scope.listaMedTrat.idMedicoTratante;
			    }
			    else{
			    	$scope.eventoInsert.medicoTratante.nombre="";
			    	$scope.eventoInsert.medicoTratante.idMedicoTratante=0;
			    }
			    $scope.eventoInsert.diagnosticoIngreso1=new Object();
			    $scope.eventoInsert.diagnosticoIngreso2=new Object();
			    $scope.eventoInsert.diagnosticoIngreso1.idIcd=$rootScope.idtipoIcd1;
			    $scope.eventoInsert.diagnosticoIngreso2.idIcd=$rootScope.idtipoIcd2;
			    if ($scope.eventoInsert.tipoSeguro.idTipoSeguro==2)
			    	$scope.eventoInsert.medicoDictaminador=$scope.medDictaminadorSelected.nombreImplant+ " " +$scope.medDictaminadorSelected.appImplant + " "+ $scope.medDictaminadorSelected.apmImplant;
			    $scope.eventoInsert.antecedente= new Object();
			    $scope.eventoInsert.antecedente.idAntecedente=$scope.antecedenteSelected.idAntecedente;
			    $scope.eventoInsert.antecedente.descripcion=$scope.antecedenteSelected.nombre;
			  
			    //$rootScope.idtipoIcd1=id;		
		
	
			    if ($scope.eventoInsert.tipoSeguro.idTipoSeguro==1){
			    	$scope.eventoInsert.registroSeguroPersonal=new Object();
			    	$scope.eventoInsert.registroSeguroPersonal.numeroNomina=$scope.evento.registroSeguroPersonal.numeroNomina;
			    	$scope.eventoInsert.registroSeguroPersonal.institucion=$scope.evento.registroSeguroPersonal.institucion;
			    	$scope.eventoInsert.registroSeguroPersonal.numAutorizacion=$scope.evento.registroSeguroPersonal.numeroAutorizacion;
			    	$scope.eventoInsert.registroSeguroPersonal.nombreTitular=$scope.evento.registroSeguroPersonal.nombreTitular;
			    	$scope.eventoInsert.registroSeguroPersonal.appTitular=$scope.evento.registroSeguroPersonal.appTitular;
			    	$scope.eventoInsert.registroSeguroPersonal.apmTitular=$scope.evento.registroSeguroPersonal.apmTitular;
			    	$scope.eventoInsert.registroSeguroPersonal.nombrePaciente=$scope.evento.registroSeguroPersonal.nombrePaciente;
			    	$scope.eventoInsert.registroSeguroPersonal.appPaciente=$scope.evento.registroSeguroPersonal.appPaciente;
			    	$scope.eventoInsert.registroSeguroPersonal.apmPaciente=$scope.evento.registroSeguroPersonal.apmPaciente;
			    	if ($scope.listaTipoEventoSelected.idTipoEvento!=4){
			    		$scope.eventoInsert.registroSeguroPersonal.edadPaciente=$scope.evento.registroSeguroPersonal.edadPaciente;
			    		$scope.eventoInsert.registroSeguroPersonal.unidadEdadPaciente=$scope.unidadEdadPacienteSegPersonalSelected.descripcion;
			    		$scope.eventoInsert.registroSeguroPersonal.sexoPaciente=$scope.sexoPacienteSegPersonalSelected.descripcion;
			    		$scope.eventoInsert.registroSeguroPersonal.relacionPaciente=$scope.parentescoPacienteSegPersonalSelected.descripcion;
			    	}
			    	else{
			    		console.log("DATOS;;;;");
			    		console.log($scope);			    		
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoFechaNacimiento=$scope.dt2;
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoHoraNacimiento=$scope.valueTime; 
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoTipoParto=$scope.tipoPartoSelected.descripcion;			    																	
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoTalla=$scope.evento.registroSeguroPersonal.nacimientoTalla;
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoPeso=$scope.evento.registroSeguroPersonal.nacimientoPeso;
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoApgar=$scope.evento.registroSeguroPersonal.nacimientoApgar;
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoSilverman=$scope.evento.registroSeguroPersonal.nacimientoSilverman;
			    		$scope.eventoInsert.registroSeguroPersonal.nacimientoMedicoTratante=$scope.listaMedTrat2.nombre;
			    	}
			    }
			    if ($scope.eventoInsert.tipoSeguro.idTipoSeguro==2){
			    	$scope.eventoInsert.registroGastosMayores=new Object();	    		
			    	$scope.eventoInsert.registroGastosMayores.numeroPoliza=$scope.evento.registroGastosMayores.numeroPoliza;	    		    			    		
			    	$scope.eventoInsert.registroGastosMayores.deduciblePoliza=$scope.evento.registroGastosMayores.deducible;
			    	$scope.eventoInsert.registroGastosMayores.coaseguroMedico=$scope.evento.registroGastosMayores.coaseguroMedico;
			    	$scope.eventoInsert.registroGastosMayores.sumaAsegurada=$scope.evento.registroGastosMayores.sumaAsegurada;
			    	$scope.eventoInsert.registroGastosMayores.montoCartaAutInicial=$scope.evento.registroGastosMayores.montoCartaAutInicial;
			    	$scope.eventoInsert.registroGastosMayores.tablaHonorariosMedicos=$scope.evento.registroGastosMayores.tablaHonorariosMedicos;
			    	$scope.eventoInsert.registroGastosMayores.nombreTitular=$scope.evento.registroGastosMayores.nombreTitular;
			    	$scope.eventoInsert.registroGastosMayores.appTitular=$scope.evento.registroGastosMayores.appTitular;
			    	$scope.eventoInsert.registroGastosMayores.apmTitular=$scope.evento.registroGastosMayores.apmTitular;
			    	$scope.eventoInsert.registroGastosMayores.nombrePaciente=$scope.evento.registroGastosMayores.nombrePaciente;
			    	$scope.eventoInsert.registroGastosMayores.appPaciente=$scope.evento.registroGastosMayores.appPaciente;
			    	$scope.eventoInsert.registroGastosMayores.apmPaciente=$scope.evento.registroGastosMayores.apmPaciente;
			    	if ($scope.listaTipoEventoSelected.idTipoEvento!=4){
			    		$scope.eventoInsert.registroGastosMayores.edadPaciente=$scope.evento.registroGastosMayores.edadPaciente;
			    		$scope.eventoInsert.registroGastosMayores.unidadEdadPaciente=$scope.unidadEdadPacienteSegPersonalSelected.descripcion;
			    		$scope.eventoInsert.registroGastosMayores.sexoPaciente=$scope.sexoPacienteSegPersonalSelected.descripcion;
			    		$scope.eventoInsert.registroGastosMayores.relacionPaciente=$scope.parentescoPacienteSegPersonalSelected.descripcion;
			    	}
			    	else{
			    		console.log("DATOS;;;;");
			    		console.log($scope);			    		
			    		$scope.eventoInsert.registroGastosMayores.nacimientoFechaNacimiento=$scope.dt2;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoHoraNacimiento=$scope.valueTime;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoTipoParto=$scope.tipoPartoSelected.descripcion;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoTalla=$scope.evento.registroGastosMayores.nacimientoTalla;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoPeso=$scope.evento.registroGastosMayores.nacimientoPeso;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoApgar=$scope.evento.registroGastosMayores.nacimientoApgar;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoSilverman=$scope.evento.registroGastosMayores.nacimientoSilverman;
			    		$scope.eventoInsert.registroGastosMayores.nacimientoMedicoTratante=$scope.listaMedTrat2.nombre;
			    	}	    			    		
			    }	    		    	
			    //alert($scope.evento.numHabitacion);
			    delete Array.prototype.toJSON;	    	
			    $http.defaults.headers.post["Content-Type"] = "application/json";
			    $http.post('mvc/evento/guardarevento',$scope.eventoInsert).
			    		success(function(data, status, headers, config) {
			    			alert("Se registró correctamente el evento!");
			    			$location.path('/showeventos');
			    		}).error(function(data, status, headers, config) {
			    	    // called asynchronously if an error occurs
			    	    // or server returns response with an error status.
			    		  alert(data);
			  });
		}
	};	    
	    
	$scope.openAddIcd = function (msg,url,idT) {
		$rootScope.idT=idT;
		var modalInstance = $modal.open({
	        templateUrl: url,
	        controller: Cat_ICD_Controller,
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
	    
	$scope.openAltaMedicoTratante = function (msg,url) {
	   	$scope.espmedictratantes.push({"idEspMedicoTratante":1,"nombre":"GENETICA"});
	    var modalInstanceAMT = $modal.open({	        	
	            templateUrl: url,
	            controller: ModalMedicoTratanteInstanceCtrl,
	            resolve: {
	          	  mensaje: function () {
	                    return msg;
	                  }
	            }
	    });
	    modalInstanceAMT.result.then(function (selectedItem) {          
	        	}, function () {          
	    });
	};
	    
	$scope.openEditarMedicoTratante = function (msg,url) {
	    var modalInstanceAMT = $modal.open({
	    	windowClass:'modal',
	        templateUrl: url,
	        controller: AltaMedTratanteInstanceCtrl,
	        resolve: {
				mensaje: function () {
						return msg;
	            }
			}
	    });
	    modalInstanceAMT.result.then(function (selectedItem) {          
	        }, function () {          
	    });
	};
};


var EditarEventoController= function($scope, $http, $timeout,$rootScope,$location,$modal){
	console.log("Editando el evento:");
	$scope.eventoEditSelected=$rootScope.eventoEditSelected;
	console.log($scope.eventoEditSelected);
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
	
	$scope.oneAtATime = true;
	//$scope.listaTipoClienteSelected={idTipoSeguro:'',descripcion:''};		  	
	//filtro para poner todo el texto en may�sculas	
	$scope.master = {};		
	$scope.message = 'DATOS DEL INGRESO';
	$scope.mensajeError ="";
	$scope.companias={};
	$scope.hospSeleccionado="ok"+$rootScope.hospitalSeleccionado;
	$scope.tipoTratSl=$rootScope.tipoTratSl;	    
	$http.post('mvc/evento/getcombovalues').
		success(function(data, status, headers, config) {					 
			$scope.clientes=data[0];
			$scope.tiposseguro=data[1];
			$scope.tiposevento=data[2];
			$scope.unidadesedades=[{descripcion:'AÑOS'},{descripcion:'MESES'},{descripcion:'DIAS'}];
			$scope.sexodatoscombo=[{descripcion:'MASCULINO'},{descripcion:'FEMENINO'}];
			$scope.parentescos=[{descripcion:'TITULAR'},{descripcion:'HIJA'},{descripcion:'HIJO'},{descripcion:'CONYUGE'},{descripcion:'MADRE'},{descripcion:'PADRE'}];
			$rootScope.nombreLogin="FAUSTO ORTEGA";
			$scope.antecedentes=data[3];				
						
			console.log($scope.eventoEditSelected.antecedente);
			//Llenar los combos con los valores
			if ($scope.eventoEditSelected.tipoEvento!=null){
				for (i=0;i<$scope.tiposevento.length;i++){
					if ($scope.tiposevento[i].idTipoEvento==$scope.eventoEditSelected.tipoEvento.idTipoEvento){
						$scope.listaTipoEventoSelected=$scope.tiposevento[i];
						break;
					}
				}				
			}
			if ($scope.eventoEditSelected.tipoSeguro!=null){
				for (i=0;i<$scope.tiposseguro.length;i++){
					if ($scope.tiposseguro[i].idTipoSeguro==$scope.eventoEditSelected.tipoSeguro.idTipoSeguro){
						$scope.listaTipoClienteSelected=$scope.tiposseguro[i];
						break;
					}
				}				
			}
			if ($scope.eventoEditSelected.cliente!=null){				
				for (i=0;i<$scope.clientes.length;i++){
					if ($scope.clientes[i].idCliente==$scope.eventoEditSelected.cliente.idCliente){
						$scope.listaClienteSelected=$scope.clientes[i];
						break;
					}
				}								
			}
			if ($scope.eventoEditSelected.antecedente!=null){
				for (i=0;i<$scope.antecedentes.length;i++){
					if ($scope.antecedentes[i].idAntecedente==$scope.eventoEditSelected.antecedente.idAntecedente){
						$scope.antecedenteSel=$scope.antecedentes[i];
						break;
					}
				}				
			}
			
			$scope.showTipoSeguroView();
			
			$scope.censos=[
			  			   {"idCenso":1,"nombre":"SI"},
			  			   {"idCenso":2,"nombre":"NO"},			  			 
			  			   ];			
			$scope.jubilados=[
				  			   {"idJubilado":1,"nombre":"SI"},
				  			   {"idJubilado":2,"nombre":"NO"},			  			 
				  			];
			$scope.espmedictratantes=[	    
			       {"idEspMedicoTratante":1,"nombre":"MAXILOFACIAL"},	    	   
			       //{"idEspMedicoTratante":1,"nombre":"GENETICA"},
			       {"idEspMedicoTratante":1,"nombre":"TOXICOLOGIA"}	    	   
			];						
			//registroGastosMayores
			if ($scope.eventoEditSelected.registroGastosMayores!=null){
				for (i=0;i<$scope.parentescos.length;i++){
					if ($scope.parentescos[i].descripcion==$scope.eventoEditSelected.registroGastosMayores.relacionPaciente){						
						$scope.parentescoPacienteGastosMayoresSelected=$scope.parentescos[i];
						break;
					}
				}
				for (i=0;i<$scope.unidadesedades.length;i++){
					if ($scope.unidadesedades[i].descripcion==$scope.eventoEditSelected.registroGastosMayores.unidadEdadPaciente){						
						$scope.unidadEdadPacienteGastosMayoresSelected=$scope.unidadesedades[i];
						break;
					}
				}
				for (i=0;i<$scope.sexodatoscombo.length;i++){
					if ($scope.sexodatoscombo[i].descripcion==$scope.eventoEditSelected.registroGastosMayores.sexoPaciente){						
						$scope.sexoPacienteGastosMayoresSelected=$scope.sexodatoscombo[i];
						break;
					}
				}
				//unidadEdadPacienteSegPersonalSelected "sexoPacienteSegPersonalSelected" unidadEdadPacienteGastosMayoresSelected	
				//sexoPacienteGastosMayoresSelected
			}
			if ($scope.eventoEditSelected.registroSeguroPersonal!=null){
				for (i=0;i<$scope.parentescos.length;i++){
					if ($scope.parentescos[i].descripcion==$scope.eventoEditSelected.registroSeguroPersonal.relacionPaciente){						
						$scope.parentescoPacienteSegPersonalSelected=$scope.parentescos[i];
						break;
					}
				}
				for (i=0;i<$scope.unidadesedades.length;i++){
					if ($scope.unidadesedades[i].descripcion==$scope.eventoEditSelected.registroSeguroPersonal.unidadEdadPaciente){						
						$scope.unidadEdadPacienteSegPersonalSelected=$scope.unidadesedades[i];
						break;
					}
				}
				for (i=0;i<$scope.sexodatoscombo.length;i++){
					if ($scope.sexodatoscombo[i].descripcion==$scope.eventoEditSelected.registroSeguroPersonal.sexoPaciente){						
						$scope.sexoPacienteSegPersonalSelected=$scope.sexodatoscombo[i];
						break;
					}
				}
				
			}
			$http.post('mvc/evento/getmedicostratantes').
					success(function(data, status, headers, config) {
						$scope.medictratantes=data;
						console.log("MedTRAt")
						console.log(data);
						if ($scope.eventoEditSelected.medicoTratante!=null){
							for (i=0;i<$scope.medictratantes.length;i++){
								if ($scope.medictratantes[i].idMedicoTratante==$scope.eventoEditSelected.medicoTratante.idMedicoTratante){
									$scope.listaMedTrat=$scope.medictratantes[i];
									$scope.especialidadMedTratanteEdit=$scope.medictratantes[i].especialidadMedTratante;
									break;
								}
							}				
						}
						
					}).
					error(function(data, status, headers, config) {
					});
		}).error(function(data, status, headers, config) {
		}
	);
	    
	$scope.showTipoSeguroView = function(id) {
		console.log("Show view tipo seguro");
	   	console.log($scope.listaTipoClienteSelected.idTipoSeguro);
	   	$scope.evento="";
	   	$scope.evento.tipoSeguro=$scope.listaTipoClienteSelected.idTipoSeguro;
	   	if ($scope.listaTipoClienteSelected.idTipoSeguro==1){
	   		$rootScope.tipoSeguroSel=" Banco";
	   		document.getElementById("tipoSeguroPersonalDIV").style.display = 'block';
	   		document.getElementById("tipoSeguroGastosMayoresDIV").style.display = 'none';
	   	}
	   	else{
	   		$rootScope.tipoSeguroSel=" Aseguradora";
	   		document.getElementById("tipoSeguroPersonalDIV").style.display = 'none';
	   		document.getElementById("tipoSeguroGastosMayoresDIV").style.display = 'block';
	   	}
	};
	
	$scope.isUnchanged = function(evento) {
	   	//$scope.mensajeError ="* Los campos de correo electr�nico deben escribirse correctamente";
	    //return angular.equals(evento, $scope.master);        
	};          
	
	$scope.cargarHosp = function (){	    
	};	   
	
	$scope.guardarEventoEditar = function (){
		var valida=true;
		valida = $scope.validaFormularioGuardarEventoSeccion1();
		if (valida){
			valida=$scope.validaFormularioGuardarEventoSeccion2($scope.listaTipoClienteSelected.idTipoSeguro,$scope.listaTipoEventoSelected.idTipoEvento);
		}
		if (valida){
			valida=$scope.validaFormularioGuardarEventoSeccion3($scope.listaTipoClienteSelected.idTipoSeguro);
		}
		if (valida){	
			$scope.eventoEditar=new Object();	    	
		    $scope.eventoEditar.implant=new Object();
		    $scope.eventoEditar.implant.idImplant=100;
		    $scope.eventoEditar.hospital=new Object();
		    $scope.eventoEditar.hospital.idHospital=1;	    	    	   
		    $scope.eventoEditar.cliente=new Object();
		    $scope.eventoEditar.cliente.idCliente=$scope.listaClienteSelected.idCliente;	    	
		    $scope.eventoEditar.tipoSeguro=new Object();
		    $scope.eventoEditar.tipoSeguro.idTipoSeguro=$scope.listaTipoClienteSelected.idTipoSeguro;
		    $scope.eventoEditar.tipoEvento=new Object();
		    $scope.eventoEditar.tipoEvento.idTipoEvento=$scope.listaTipoEventoSelected.idTipoEvento;
		    if ($scope.eventoEditar.tipoSeguro.idTipoSeguro==1){
		    	$scope.eventoEditar.registroSeguroPersonal=new Object();
		    	$scope.eventoEditar.registroSeguroPersonal.numeroNomina=$scope.eventoEditSelected.registroSeguroPersonal.numeroNomina;
		    	$scope.eventoEditar.registroSeguroPersonal.institucion=$scope.eventoEditSelected.registroSeguroPersonal.institucion;
		    	$scope.eventoEditar.registroSeguroPersonal.numAutorizacion=$scope.eventoEditSelected.registroSeguroPersonal.numeroAutorizacion;
		    	$scope.eventoEditar.registroSeguroPersonal.nombreTitular=$scope.eventoEditSelected.registroSeguroPersonal.nombreTitular;
		    	$scope.eventoEditar.registroSeguroPersonal.appTitular=$scope.eventoEditSelected.registroSeguroPersonal.appTitular;
		    	$scope.eventoEditar.registroSeguroPersonal.apmTitular=$scope.eventoEditSelected.registroSeguroPersonal.apmTitular;
		    	$scope.eventoEditar.registroSeguroPersonal.nombrePaciente=$scope.eventoEditSelected.registroSeguroPersonal.nombrePaciente;
		    	$scope.eventoEditar.registroSeguroPersonal.appPaciente=$scope.eventoEditSelected.registroSeguroPersonal.appPaciente;
		    	$scope.eventoEditar.registroSeguroPersonal.apmPaciente=$scope.eventoEditSelected.registroSeguroPersonal.apmPaciente;
		    	$scope.eventoEditar.registroSeguroPersonal.edadPaciente=$scope.eventoEditSelected.registroSeguroPersonal.edadPaciente;
		    	$scope.eventoEditar.registroSeguroPersonal.unidadEdadPaciente=$scope.unidadEdadPacienteSegPersonalSelected.descripcion;
		    	$scope.eventoEditar.registroSeguroPersonal.sexoPaciente=$scope.sexoPacienteSegPersonalSelected.descripcion;
		    	$scope.eventoEditar.registroSeguroPersonal.relacionPaciente=$scope.parentescoPacienteSegPersonalSelected.descripcion;
		    }
		    if ($scope.eventoEditar.tipoSeguro.idTipoSeguro==2){
		    	$scope.eventoEditar.registroGastosMayores=new Object();	    		
		    	$scope.eventoEditar.registroGastosMayores.numeroPoliza=$scope.eventoEditSelected.registroGastosMayores.numeroPoliza;	    		    			    		
		    	$scope.eventoEditar.registroGastosMayores.deduciblePoliza=$scope.eventoEditSelected.registroGastosMayores.deducible;
		    	$scope.eventoEditar.registroGastosMayores.coaseguroMedico=$scope.eventoEditSelected.registroGastosMayores.coaseguroMedico;
		    	$scope.eventoEditar.registroGastosMayores.sumaAsegurada=$scope.eventoEditSelected.registroGastosMayores.sumaAsegurada;
		    	$scope.eventoEditar.registroGastosMayores.montoCartaAutInicial=$scope.eventoEditSelected.registroGastosMayores.montoCartaAutInicial;
		    	$scope.eventoEditar.registroGastosMayores.tablaHonorariosMedicos=$scope.eventoEditSelected.registroGastosMayores.tablaHonorariosMedicos;
		    	$scope.eventoEditar.registroGastosMayores.nombreTitular=$scope.eventoEditSelected.registroGastosMayores.nombreTitular;
		    	$scope.eventoEditar.registroGastosMayores.appTitular=$scope.eventoEditSelected.registroGastosMayores.appTitular;
		    	$scope.eventoEditar.registroGastosMayores.apmTitular=$scope.eventoEditSelected.registroGastosMayores.apmTitular;
		    	$scope.eventoEditar.registroGastosMayores.nombrePaciente=$scope.eventoEditSelected.registroGastosMayores.nombrePaciente;
		    	$scope.eventoEditar.registroGastosMayores.appPaciente=$scope.eventoEditSelected.registroGastosMayores.appPaciente;
		    	$scope.eventoEditar.registroGastosMayores.apmPaciente=$scope.eventoEditSelected.registroGastosMayores.apmPaciente;
		    	$scope.eventoEditar.registroGastosMayores.edadPaciente=$scope.eventoEditSelected.registroGastosMayores.edadPaciente;
		    	$scope.eventoEditar.registroGastosMayores.unidadEdadPaciente=$scope.unidadEdadPacienteGastosMayoresSelected.descripcion;;
		    	$scope.eventoEditar.registroGastosMayores.sexoPaciente=$scope.sexoPacienteGastosMayoresSelected.descripcion;	    		
		    	$scope.eventoEditar.registroGastosMayores.relacionPaciente=$scope.parentescoPacienteGastosMayoresSelected.descripcion;	    			    		
		    }
		    $scope.eventoEditar.cliente=new Object();
		    $scope.eventoEditar.antecedente= new Object();
		    $scope.eventoEditar.antecedente.idAntecedente=$scope.antecedenteSel.idAntecedente;
		    console.log("GUARDANDO!!");
		    console.log($scope);
		    $scope.eventoEditar.antecedente=new Object();
		    $scope.eventoEditar.antecedente=$scope.antecedenteSelected;
		    
		    
		    delete Array.prototype.toJSON;	    	
		    $http.defaults.headers.post["Content-Type"] = "application/json";
		    $http.post('mvc/evento/guardareventoeditar',$scope.eventoEditar).
		    	success(function(data, status, headers, config) {
		    		  alert("Se registr� correctamente el evento!");
		    		  $location.path('/showeventos');
		    	}).error(function(data, status, headers, config) {
		    	    // called asynchronously if an error occurs
		    	    // or server returns response with an error status.
		    		  alert(data);
		    	});
		}
	};	    
	
/////////////////////////// VALIDACIONES DEL FORMULARIO DE ALTA DE EVENTO  ////////////////////////////////
	$scope.validaFormularioGuardarEventoSeccion1= function(){
		var msjCamposRequeridos="Falta por llenar campos en la secci\u00f3n 1).Los siguientes Campos son requeridos:\n";
		var numErrors=0;		
		if ($scope.hospitalSeleccionadoId==null || $scope.hospitalSeleccionadoId=="" ){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Hospital.\n";		
			numErrors++;		
		}
		if ($scope.listaClienteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Cliente.\n";		
			numErrors++;		
		}
		if ($scope.evento!=null){
			if ($scope.evento.folioHospitalario==null){ 
				msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Folio Hospitalario.\n";		
				numErrors++;		
			}
			if ($scope.evento.folioArgal==null){ 
				msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Folio Argal.\n";		
				numErrors++;		
			}
		}
		if ($scope.listaTipoClienteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Tipo de Cliente.\n";		
			numErrors++;		
		}
		if ($scope.listaTipoEventoSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Tipo de Evento.\n";		
			numErrors++;		
		}
		if ($scope.listaTipoClienteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar una fecha de Ingreso.\n";		
			numErrors++;		
		}
		if ($scope.valueTime==null || $scope.valueTime==""){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar una hora de Ingreso.\n";		
			numErrors++;		
		}
		if (numErrors>0){
			alert(msjCamposRequeridos);
			return false;
		}
		return true;
	}
	
	$scope.validaFormularioGuardarEventoSeccion2= function(idTipoSeguro,idTipoCliente){
		var msjCamposRequeridos="Falta por llenar campos en la secci\u00f3n 2).Los siguientes Campos son requeridos:\n";
		var numErrors=0;
		if (idTipoSeguro==1){
			if ($scope.evento.registroSeguroPersonal!=null){
				var testRSP=$scope.evento.registroSeguroPersonal;	
			}
			else{
				msjCamposRequeridos=msjCamposRequeridos+"* Debe llenar los campos del Titular.\n";		
				numErrors++;
				alert(msjCamposRequeridos);
				return false;
			}
		}
		if (idTipoSeguro==2){
			if ($scope.evento.registroGastosMayores!=null){
				var testRSP=$scope.evento.registroGastosMayores;	
			}
			else{
				msjCamposRequeridos=msjCamposRequeridos+"* Debe llenar los campos del Titular.\n";		
				numErrors++;
				alert(msjCamposRequeridos);
				return false;
			}
		}					
		if (testRSP.numeroNomina==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar un número de nómina.\n";		
			numErrors++;
		}
		if (testRSP.institucion==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar una Institución.\n";		
				numErrors++;
		}
		if (testRSP.numeroAutorizacion==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el número de autorización.\n";		
			numErrors++;
		}
		if (testRSP.nombreTitular==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el nombre del Titular.\n";		
			numErrors++;
		}
		if (testRSP.appTitular==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Paterno del Titular.\n";		
			numErrors++;
		}
		if (testRSP.apmTitular==""){
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Titular.\n";		
			numErrors++;
		}
		if (idTipoCliente!=4){
			if (testRSP.nombrePaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Paciente.\n";		
				numErrors++;
			}
			if (testRSP.appPaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Paciente.\n";		
				numErrors++;
			}
			if (testRSP.apmPaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Apellido Materno del Paciente.\n";		
				numErrors++;
			}
			if (testRSP.edadPaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar la edad del Paciente.\n";		
				numErrors++;
			}
			if ($scope.unidadEdadPacienteSegPersonalSelected=="" || $scope.unidadEdadPacienteSegPersonalSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar la unidad de la edad del Paciente .\n";		
				numErrors++;
			}
			if ($scope.sexoPacienteSegPersonalSelected=="" || $scope.sexoPacienteSegPersonalSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el sexo del Paciente.\n";		
				numErrors++;
			}
			if ($scope.parentescoPacienteSegPersonalSelected=="" || $scope.parentescoPacienteSegPersonalSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el parentesco del Paciente.\n";		
				numErrors++;
			}			
		}
		if (idTipoCliente==4){
			if (testRSP.nombrePaciente==""){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Nombre del Recien Nacido.\n";		
				numErrors++;
			}
			if ($scope.tipoPartoSelected=="" || $scope.tipoPartoSelected==null ){
				msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el tipo de parto del recien nacido.\n";		
				numErrors++;
			}			
		}
							
		if (numErrors>0){
			alert(msjCamposRequeridos);
			return false;
		}
		return true;
	}

	$scope.validaFormularioGuardarEventoSeccion3= function(idTipoSeguro){
		var msjCamposRequeridos="Falta por llenar campos en la secci\u00f3n 3).Los siguientes Campos son requeridos:\n";
		var numErrors=0;		
		if ($scope.evento.numHabitacion=="" ){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Número de Habitación.\n";		
			numErrors++;		
		}
		if ($scope.antecedenteSelected==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Antecedente Patológico.\n";		
			numErrors++;		
		}
		//Solo cuando el tipo de Evento sea 2
		if ($scope.medDictaminadorSelected==null && idTipoSeguro==2){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe Seleccionar un Médico Dictaminador.\n";		
			numErrors++;		
		}
		if ($rootScope.idtipoIcd1==null || $rootScope.idtipoIcd1==""){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Diagnóstico de Ingreso 1.\n";		
			numErrors++;		
		}
		if ($rootScope.idtipoIcd2==null || $rootScope.idtipoIcd1==""){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Diagnóstico de Ingreso 2.\n";		
			numErrors++;		
		}
		if ($scope.listaMedTrat==null){ 
			msjCamposRequeridos=msjCamposRequeridos+"* Debe ingresar el Médico Tratante.\n";		
			numErrors++;		
		}
		if (numErrors>0){
			alert(msjCamposRequeridos);
			return false;
		}
		return true;
	}
	/////////////////////////////////////////////////////END VALIDACIONES///////////////////////////////
	
	    
	$scope.openAddIcd = function (msg,url) {
	   	var modalInstance = $modal.open({
	        templateUrl: url,
	        controller: ModalClienteInstanceCtrl,
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
	    
	$scope.openAltaMedicoTratante = function (msg,url) {
	   	$scope.espmedictratantes.push({"idEspMedicoTratante":1,"nombre":"GENETICA"});
	    var modalInstanceAMT = $modal.open({	        	
	            templateUrl: url,
	            controller: AltaMedTratanteInstanceCtrl,
	            resolve: {
	          	  mensaje: function () {
	                    return msg;
	                  }
	            }
	    });
	    modalInstanceAMT.result.then(function (selectedItem) {          
	        	}, function () {          
	    });
	};
	    
	$scope.openEditarMedicoTratante = function (msg,url) {
	    var modalInstanceAMT = $modal.open({
	    	windowClass:'modal',
	        templateUrl: url,
	        controller: AltaMedTratanteInstanceCtrl,
	        resolve: {
				mensaje: function () {
						return msg;
	            }
			}
	    });
	    modalInstanceAMT.result.then(function (selectedItem) {          
	        }, function () {          
	    });
	};
};


var AltaMedTratanteInstanceCtrl = function($scope, $http, $rootScope) {

}

function LoadingController($scope, $http,$timeout) {
	  // This LoadingController is attached to the DOM inside the ng-repeat
	  // so it has access to the "group" object, which is provided by the ng-repeat

	  // We are going to watch the current scope for changes to group.anyOldValue
	  $scope.$watch(
	  
	    // This is the expression (on $scope) to watch
	    'group.anyOldValue',
	    
	    // This is the handler function that will be run "only" when the watched expression changes
	    function(value) {
	      // This first parameter is the changed value of group.anyOldValue
	      // A second parameter would hold the previous value if you wanted it
	      if ( value ) {
	        console.log('loading');
	        $timeout(function() {
	          console.log('loaded');
	          $scope.isLoaded = 'loaded';	          	          	          
	        }, 1000);
	      }
	    }
	    
	  );
	}

/*var EditarEventoController= function($scope, $http, $rootScope) {
	//filtro para poner todo el texto en may�sculas
	//$scope.implant = $rootScope.implant;					
    $scope.message = 'EDITAR UN EVENTO';
    $scope.mensajeError ="";
    $scope.isUnchanged = function(implant) {
    	$scope.mensajeError ="* Los campos de correo electr�nico deben escribirse correctamente";
        return angular.equals(implant, $scope.master);        
    };              
    $scope.evento=new Object();	    	
	$scope.evento.implant=new Object();
	$scope.evento.implant.idImplant=100;
	$scope.evento.hospital=new Object();
	$scope.evento.hospital.idHospital=1;
	$scope.evento.cliente=new Object();
	$scope.evento.cliente.idCliente=1;
	$scope.evento.tipoSeguro=new Object();
	$scope.evento.tipoSeguro.idTipoSeguro=1;
	$scope.evento.tipoEvento=new Object();
	$scope.evento.tipoEvento.idTipoEvento=1;
     
    $scope.guardarImplant123 = function (){    	
    	alert($scope.implant.nombreImplant);
    	alert($scope.implant.superMedico);
    	$http.post('mvc/implant/guardarimplant',$scope.implant).
    	  success(function(data, status, headers, config) {
    	    // this callback will be called asynchronously
    	    // when the response is available
    	  }).
    	  error(function(data, status, headers, config) {
    	    // called asynchronously if an error occurs
    	    // or server returns response with an error status.
    	  });
    };
};*/

var EventoController= function ($scope,$http,$rootScope,$location,$modal,$document,ngTableParams,$filter){		
	//Register a body reference to use later
	$scope.fecha= function (evento){
		console.log(evento);		
		var d1 = new Date(evento.fechaIngreso);
		console.log(d1);
		if (evento.fechaEgreso!="" && evento.fechaEgreso!=null )
			var d2 = new Date(evento.fechaEgreso);
		else
			var d2 = new Date();		
		console.log(d1.getDate() + "/"+ (d1.getMonth()+1)+"/"+d1.getFullYear());
		console.log(d2.getDate() + "/"+ (d2.getMonth()+1)+"/"+d2.getFullYear());
		//var d1 = moment(d1.getDate() + "/"+ (d1.getMonth()+1)+"/"+d1.getFullYear());		
		//var d2 = moment(d2.getDate() + "/"+ (d2.getMonth()+1)+"/"+d2.getFullYear());
		var d1 = moment([d1.getFullYear(), d1.getMonth(), d1.getDate()]);
		var d2 = moment([d2.getFullYear(), d2.getMonth(), d2.getDate()]);
		
		//var d1 = moment([2007, 0, 29]);
		//var d2 = moment([2007, 1, 28]);
		var days = d2.diff(d1, 'days'); 		
		console.log(days);
		return days;
	};
	var bodyRef = angular.element( $document[0].body );	
	$scope.rowCollectionEventos={};
    $scope.dateToday = new Date();
	$http.post('mvc/evento/gettipousuario').success(function(data, status, headers, config) {		
		if (data!=0){
			$rootScope.tipoUsuarioLogin=data;
			$scope.tipoUsuarioLogin=data;
		}
		$http.post('mvc/evento/geteventos',$scope.implant).success(function(data, status, headers, config) {
			  $scope.rowCollectionEventos=data;
			  console.log("DATOS DE EVENTOS");
			  console.log(data);
			  setDatosEventos(data);
		  }).error(function(data, status, headers, config) {
		});			
	  }).error(function(data, status, headers, config) {
	});
	
    $scope.columnCollectionEventos = [
        {label: 'IdEVENTO', map: 'idEvento'},
        {label: 'FECHA', map: 'fechaIngreso',formatFunction: 'date'},
        {label: 'FOLIO HOSPITAL', map: 'cliente.razonSocialCliente', headerTemplateUrl: 'views/evento/customHeader.html'},
        {label: 'FOLIO ARGAL', map: 'tipoEvento.descripcion', headerTemplateUrl: 'views/evento/customHeader.html'},
        {label: 'CLIENTE', map: 'hospital.nombreHospital', headerTemplateUrl: 'views/evento/customHeader.html'},
        {label: 'HOSPITAL', map: 'implant.nombreImplant', headerTemplateUrl: 'views/evento/customHeader.html'},
        {label: 'ASEGURADO', map: 'implant.nombreImplant', headerTemplateUrl: 'views/evento/customHeader.html'},
        {label: 'EDITAR DATOS', map: 'evento.idEvento',cellTemplateUrl: 'views/evento/editarevento.html'},
        {label: 'CONTROL DE GASTOS', map: 'evento.idEvento',cellTemplateUrl: 'views/evento/controlgastos.html'},
        {label: 'SEGUIMIENTO M�DICO', map: 'evento.idEvento',cellTemplateUrl: 'views/evento/segmedico.html'},        
        {label: 'EGRESAR PACIENTE', map: 'evento.idEvento',cellTemplateUrl: 'views/evento/egresopaciente.html'},
        {label: 'FINALIZAR EVENTO', map: 'evento.idEvento',cellTemplateUrl: 'views/evento/finalizarevento.html'}
    ];
    
    $scope.globalConfigEventos = {    	        
        isPaginationEnabled: true,
        isGlobalSearchActivated: false,        
        itemsByPage: 5,
        selectionMode: 'single',
        actions: {
            list: { url: '/GetUsers' },
            edit: { url: '/EditUser', title: 'Edit User', desc: 'Edit', iconClass: '' }, 
            add: { url: '/AddUser', title: 'Add User', buttonClass: 'pull-right', iconClass: 'icon-plus', desc: ' Add User' }, // TODO: zkontrolovat default description
            remove: { url: '/DelUser', title: 'Confirmation Dialog', msg: 'Do you really want to delete the user?' }
        }
    };
    
    $scope.messageEditarImplant="Eventos";
    //keep track of selected items
    $scope.$on('selectionChange', function (event, args) {    	    
    	$rootScope.eventoEditSelected=args.item;
        console.log(args);        
    });	
    
    $scope.editarImplant = function (){    	
    	alert("Editar");
    };
    
    $scope.eliminarImplant4 = function (){    	
    	alert("Editar");
    };
    //bodyRef.addClass('ovh');
    $scope.openEventoById = function (clase,ctr,url,id) {
    	//$rootScope.eventoEditSelected=    	
    	var evento=new Object();
    	evento.idEvento=id;
    	$http.post('mvc/evento/obtenereventobyid',evento).
    		success(function(data, status, headers, config) {
    			$rootScope.eventoEditSelected=data;
    			$scope.openViewEvento(clase,ctr, url);
    		}).
    		error(function(data, status, headers, config) {
    	});    	
   };
   
   $scope.openViewEvento = function (clase,ctr,url) {
   	//$rootScope.eventoEditSelected=
   	
   	var modalInstanceEstadoCuenta = $modal.open({
   			windowClass: clase,
   			templateUrl: url,
   			controller: ctr,
   			resolve: {          	  
   			}
   	});
   	modalInstanceEstadoCuenta.result.then(function (selectedItem) {
            //bodyRef.removeClass('ovh');
   	}, function () {                   
    });
   };
   
   var setDatosEventos= function (data){	   
	    $scope.data = data;
	        $scope.tableParamsEvento = new ngTableParams({
	            page: 1,            // show first page
	            count: 9,          // count per page
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
	        	$rootScope.evento={};
	        	$rootScope.evento.idEvento=args.idEvento;
	        	      
	        };
	};

   
};

app.directive('columnFilter', function () {
    return {
        restrict: 'C',
        require: '^smartTable',
        link: function (scope, element, attrs, ctrl) {
            scope.searchValue = '';
            scope.$watch('searchValue', function (value) {
                ctrl.search(value, scope.column);
            })
        }
    }
});

