function uploadJqueryForm(){	
   $('#result').html(''); 
   $("#form2").ajaxForm({
    success:function(data) { 
          //$('#result').html(data);
          alert("Se registr� correctamente la factura");
     },
     dataType:"text"
   }).submit();
}

//using FormData() object
function uploadFormData(){
	alert("OK3");
    $('#result').html(''); 
  	var oMyForm = new FormData();
  	oMyForm.append("file", file2.files[0]);
 
  	$.ajax({
    	url: 'http://localhost:8080/argal-web/mvc/cont/upload',
    	data: oMyForm,
    	dataType: 'text',
    	processData: false,
    	contentType: false,
    	type: 'POST',
    	success: function(data){
	    	alert("OK4");
      		$('#result').html(data);
    	}
  });
}

var AltaMedicaController = function($scope, $http, $timeout,$rootScope,$location,$modal) {
	$rootScope.eventoEgreso=new Object();
	console.log("GET VALUES ALTA MEDICA CONTROLLER!!!");
	$scope.valueTime = new Date(0, 0, 1, 14, 57);
	console.log($rootScope.eventoEditSelected);
	$rootScope.eventoEgreso=$rootScope.eventoEditSelected;
	if ($rootScope.eventoEgreso.diagnosticoEgreso1!=null)
		$scope.tipoIDCEgreso=$rootScope.eventoEgreso.diagnosticoEgreso1.descripcion;
	if ($rootScope.eventoEgreso.procedimiento1!=null)
		$scope.tipoProced1=$rootScope.eventoEgreso.procedimiento1.descripcion;
	if ($rootScope.eventoEgreso.procedimiento2!=null)
		$scope.tipoProced2=$rootScope.eventoEgreso.procedimiento2.descripcion;
	
	console.log("GET VALUES ALTA MEDICA CONTROLLER!!!");
	console.log($scope);
	$rootScope.evento=new Object();
	$scope.showSeleccionarICD = function(){
	  	document.getElementById("divShowDiagEgreso").style.display = 'block';
	 	document.getElementById("divEgresoFormulario").style.display = 'none';
	};
	$scope.showSeleccionarCPT = function(id){
		$rootScope.tipoCPTSelec = id;
		document.getElementById("divShowProcedimiento").style.display = 'block';
	 	document.getElementById("divEgresoFormulario").style.display = 'none';
	};
	    
	$scope.showMainAltaMedicaForm = function(){
	 	  document.getElementById("divShowDiagEgreso").style.display = 'none';
	  	  document.getElementById("divShowProcedimiento").style.display = 'none';
	  	  document.getElementById("divEgresoFormulario").style.display = 'block';
	};
	
	$scope.columnCollectionSeguimientoMedico = [
        {label: 'IdBitacora', map: 'idBitacora'},
        {label: 'Fecha', map: 'fechaBitacora',formatFunction: 'date'},
        {label: 'Registro', map: 'idRegistroMedico' },               
        {label: 'Observaciones', map: 'observaciones' }
    ];
	$scope.motivosegresos= [
	      {idMotivoEgreso: '1', descripcion: 'ALTA POR MEJOR�A CL�NICA'},	      
	      {idMotivoEgreso: '2', descripcion: 'ALTA VOLUNTARIA'},
	      {idMotivoEgreso: '3', descripcion: 'ALTA POR TRASLADO A OTRA UNIDAD HOSPITALARIA'},
	      {idMotivoEgreso: '4', descripcion: 'DEFUNCI�N'}
	];	        
        
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

	$scope.showFormNac = function(){
    	console.log($scope);
    	if ($scope.motivoEgresoSelected!=null){
    		if ($scope.motivoEgresoSelected.idMotivoEgreso==4)
    			document.getElementById("divDef").style.display = 'block';
    		else
    			document.getElementById("divDef").style.display = 'none';
    	}
    };
	
	
	$scope.guardarAltaPaciente = function (){
		$scope.eventoRegistroAltaPaciente= new Object();
		$scope.eventoRegistroAltaPaciente.idEvento=$rootScope.eventoEditSelected.idEvento;
		console.log("SAVE VALUES");
		console.log($scope);		
		$scope.eventoRegistroAltaPaciente.eventosNoDeseablesEntornoHosp=$scope.evento.eventosNoDeseablesEntornoHosp;
		$scope.eventoRegistroAltaPacientemotivoEgreso=$scope.motivoEgresoSelected.descripcion;
		$scope.eventoRegistroAltaPaciente.diagnosticoEgreso1= new Object();
		$scope.eventoRegistroAltaPaciente.diagnosticoEgreso1.idIcd=$rootScope.idtipoIcd3;
		$scope.eventoRegistroAltaPaciente.procedimiento1= new Object();
		$scope.eventoRegistroAltaPaciente.procedimiento1.idCpt=$rootScope.idtipoCpt1;
		$scope.eventoRegistroAltaPaciente.procedimiento2= new Object();
		$scope.eventoRegistroAltaPaciente.procedimiento2.idCpt=$rootScope.idtipoCpt2;
		$scope.eventoRegistroAltaPaciente.fechaDef=$scope.dt2;
		$scope.eventoRegistroAltaPaciente.horaDef=$scope.valueTime;
			
		delete Array.prototype.toJSON;	    	
		$http.defaults.headers.post["Content-Type"] = "application/json";				
		console.log("SAVE VALUES");
		console.log($scope.eventoRegistroAltaPaciente);
		$http.post('mvc/evento/registraraltapaciente',$scope.eventoRegistroAltaPaciente).
			success(function(data, status, headers, config) {
		    	  alert("Se registr� correctamente el Alta M�dica");		    	  
		    	  //$location.path('/showeventos');
		    }).error(function(data, status, headers, config) {
		        // called asynchronously if an error occurs
		        // or server returns response with an error status.
		    	  alert("Error al registrar el Alta M�dica"+data);
		    });				
		//$scope.hideAltaSeguimientoMedicoForm();
	};
		
};

var  AccordionDemoCtrl=function ($scope,$rootScope,$filter,ngTableParams,$http) {
	  $scope.oneAtATime = true;
	  $scope.subirFacturaVar=false;
	  $rootScope.eventoFactura=new Object();
	  $rootScope.factaprobSelected={"idFacturaAprobada":1,"nombre":"SI"};
	  //$rootScope.factaprobSelected={"idFacturaAprobada":1,"nombre":"NO"};
	  $scope.capitas = [
	                    {"idCapita":1,"nombre":"CH"},
		          	  	{"idCapita":2,"nombre":"NA"},
		          	  	{"idCapita":3,"nombre":"CH/NA"},
		          	  	{"idCapita":4,"nombre":"CH/NC"},
		          	  	{"idCapita":5,"nombre":"CH/NA/NC"},
		          	  	{"idCapita":6,"nombre":"NC/NA"}			  			 
	  ];
	  $scope.facturaAprobadaCombo=[
		  			   {"idFacturaAprobada":1,"nombre":"SI"},
		  			   {"idFacturaAprobada":2,"nombre":"NO"},			  			 
		  			];
	  $scope.groups = [
	    {
	      title: "Dynamic Group Header - 1",
	      content: "Dynamic Group Body - 1"
	    },
	    {
	      title: "Dynamic Group Header - 2",
	      content: "Dynamic Group Body - 2"
	    }
	  ];

	  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

	  $scope.addItem = function() {
	    var newItemNo = $scope.items.length + 1;
	    $scope.items.push('Item ' + newItemNo);
	  };
	  
	  var data= new Array();
	  var data0=
	  {
		      noFactura: "1",
		      aprobada: "SI",
		      monto: "10033.9",
		      detalle:"factura aprobada",
		      archivo:"ver"		    
	  };
	  //Variables rootPara los input
	  $rootScope.eventoFinalizarEventoForm=new Object();	  	
	  data.push(data0);
	  //
	  data=$rootScope.eventoEditSelected.facturas;
	  console.log("FACTURAS");
	  console.log(data);
	  $scope.montoAntesDesvios=0;
	  $scope.totalDesvios=0;
	  $scope.montoDespuesDesvios=0;
	  $scope.descuentoHospital=0;
	  $scope.cuentaFinalFacturacion=0;
	  $scope.numeroFacturasAprobadas=0;
	  $scope.numeroFacturasRechazadas=0;
	  $scope.coaseguroFinalizarEvento=0;
	  $scope.montoDesvioFacturacion=0;
	  $scope.montoAjusteFacturacion=0;
	  $scope.montoFacturacionCorregido=0;
	  $scope.eventoEditSelected=$rootScope.eventoEditSelected;
	  $scope.cuentaFinalEdoCuenta=0.0;
	  $scope.cuentaFinalDesviosFacturacion=0.0;
	  
	  console.log("!GASTOS TOTALES:"+$scope.eventoEditSelected);
	  eventoTmp=$rootScope.eventoEditSelected;
	  
		var arrayTmp = new Array();
		console.log(eventoTmp);
		
		$scope.subTotalTipoGasto1= 0.0;		
		$scope.subTotalTipoGasto2= 0.0;
		
		if (eventoTmp.tipoEvento.idTipoEvento==1 && eventoTmp.registroSeguroPersonal!=null){
			$scope.tipoSeguroTmp=1;
			$scope.eventoConCenso=true;
		}
		if (eventoTmp.tipoEvento.idTipoEvento==2 && eventoTmp.registroGastosMayores!=null){		
			$scope.tipoSeguroTmp=2;
			$scope.eventoConCenso=false;
		}
		arrayTmp = eventoTmp.gastos;
		//Total procedentes
		for (i=0;i<arrayTmp.length;i++){
			if (arrayTmp[i]!=null){
				if (arrayTmp[i].idTipoCargo!=null){
					console.log("TIPO CARGO:"+arrayTmp[i].idTipoCargo);
					if (arrayTmp[i].idTipoCargo==1 && arrayTmp[i].idRubro==2){
						console.log(arrayTmp[i].cantidad);
						console.log(arrayTmp[i].montoUnitario);
						var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;
						$scope.subTotalTipoGasto1=$scope.subTotalTipoGasto1+montoTmp;
					}					
				}
			}
		}	
		//Total desvios
		for (i=0;i<arrayTmp.length;i++){
			if (arrayTmp[i]!=null){
				if (arrayTmp[i].idTipoCargo!=null){
					console.log("TIPO CARGO2:"+arrayTmp[i].idTipoCargo);
					console.log(arrayTmp[i].cantidad);
					console.log(arrayTmp[i].montoUnitario);
					if (arrayTmp[i].idTipoCargo==2){
						var montoTmp=arrayTmp[i].cantidad*arrayTmp[i].montoUnitario;
						$scope.subTotalTipoGasto2=$scope.subTotalTipoGasto2+montoTmp;
					}					
				}
			}
		}

		//$scope.subTotalTipoGasto1=Math.round($scope.subTotalTipoGasto1);
		//$scope.subTotalTipoGasto2=Math.round($scope.subTotalTipoGasto2);
		
		/*SE CARGAN LOS VALORES SI ES QUE LOS HAY*/
		$scope.montoAntesDesvios=$scope.subTotalTipoGasto1;
		$scope.totalDesvios=$scope.subTotalTipoGasto2;
		$scope.eventoFinalizarEventoForm.ivaFinalizarEvento=eventoTmp.ivaFinalizarEvento;
		$scope.eventoFinalizarEventoForm.coaseguroFinalizarEvento=eventoTmp.coaseguroFinalizarEvento;
		$scope.eventoFinalizarEventoForm.deducibleFinalizarEvento=eventoTmp.deducibleFinalizarEvento;
		$scope.eventoFinalizarEventoForm.descuentoHospitalFinalizarEvento=eventoTmp.descuentoHospFinalizarEvento;
		//$scope.montoDespuesDesvios=parseFloat($scope.montoAntesDesvios)-parseFloat($scope.totalDesvios);
		$scope.montoDespuesDesvios=parseFloat($scope.montoAntesDesvios)-parseFloat($scope.totalDesvios);
		
		$scope.descuentoHospital=0.0;		
		for (i=0;i<data.length;i++){
			if (data[i].aprobada=="SI"){
				$scope.cuentaFinalFacturacion=parseFloat($scope.cuentaFinalFacturacion)+parseFloat(data[i].monto);
				$scope.numeroFacturasAprobadas=$scope.numeroFacturasAprobadas+1;
			}else{
				$scope.cuentaFinalDesviosFacturacion=parseFloat($scope.cuentaFinalDesviosFacturacion)+parseFloat(data[i].ajusteFactura);
				$scope.numeroFacturasRechazadas=$scope.numeroFacturasRechazadas+1;
			}			
			console.log(data[i].monto);		
		}
		
		$scope.montoDesvioFacturacion=0;
		$scope.montoAjusteFacturacion=0;
		$scope.montoFacturacionCorregido=$scope.cuentaFinalFacturacion-$scope.montoAjusteFacturacion;
		
		$scope.eventoEditSelected=$rootScope.eventoEditSelected;
		
		console.log("TOTAL1"+$scope.subTotalTipoGasto1);
		console.log("TOTAL2"+$scope.subTotalTipoGasto2);
		$scope.cuentaFinalEdoCuenta=$scope.montoDespuesDesvios;
		
	  console.log($scope.eventoEditSelected);
	  
	  $rootScope.dataFacturas = data;
	  $scope.dataFacturas = data;
      $scope.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 4,          // count per page
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
      
      $scope.updateMontoFinal=function (){
    	  console.log("DATOS Cuenta Final ");    	  
    	  console.log("Id Hospital:"+$rootScope.eventoEditSelected.hospital.idHospital);

    	  var por =0;
    	  if ($rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento!="" && $rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento>0)
    		  //por = 1-parseFloat($rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento)/100;
    		  
    	  console.log(por);
    	  var ivaTmp=0.0;
    	  var coaseguroTmp=0.0;
    	  var deducibleTmp=0.0;
    	  var descuentoTmp=0.0;
    	  var deducibleTmp2=0.0;    	  
    	  if ($rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento!="" && $rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento!=null)
    		  deducibleTmp2=parseFloat($rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento);
    	  
    	  if ($rootScope.eventoFinalizarEventoForm.ivaFinalizarEvento!="" && $rootScope.eventoFinalizarEventoForm.ivaFinalizarEvento!=null)
    		  ivaTmp=parseFloat($rootScope.eventoFinalizarEventoForm.ivaFinalizarEvento);
    	  
    	  if ($rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento!="" && $rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento!=null){    		  
    		  //coaseguroTmp=( parseFloat($scope.montoDespuesDesvios)-deducibleTmp2)*por;
    		  coaseguroTmp=( parseFloat($rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento))/100;
    	  }
    	  
    	  if ($rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento!="" && $rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento!=null)
    		  deducibleTmp=parseFloat($rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento);
    	  
    	  if ($rootScope.eventoFinalizarEventoForm.descuentoHospitalFinalizarEvento!="" && $rootScope.eventoFinalizarEventoForm.descuentoHospitalFinalizarEvento!=null)
    		  descuentoTmp=parseFloat($rootScope.eventoFinalizarEventoForm.descuentoHospitalFinalizarEvento);
    	  montoDespuesDesvios=$scope.montoDespuesDesvios;
    	  
    	  console.log("Monto:"+montoDespuesDesvios);
    	  console.log("IVA:"+ivaTmp);
    	  console.log("Coaseguro:"+coaseguroTmp);
    	  console.log("Deducible:"+deducibleTmp);
    	  console.log("Descuento:"+descuentoTmp);
    	  //Formula
    	  
    	  //$scope.cuentaFinalEdoCuenta=($scope.montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
    	 if ($rootScope.eventoEditSelected.registroSeguroPersonal!=null)
    		 $scope.cuentaFinalEdoCuenta=getCuentaFinalByIdHosp($rootScope.eventoEditSelected.hospital.idHospital,1,montoDespuesDesvios,ivaTmp,coaseguroTmp,descuentoTmp,deducibleTmp);
    	 else 
    		 $scope.cuentaFinalEdoCuenta=getCuentaFinalByIdHosp($rootScope.eventoEditSelected.hospital.idHospital,2,montoDespuesDesvios,ivaTmp,coaseguroTmp,descuentoTmp,deducibleTmp);
    	 
    	  $scope.cuentaFinalEdoCuenta=(parseFloat($scope.cuentaFinalEdoCuenta)).toFixed(2);
      };
      $scope.updateMontoFinal();
      
      function getCuentaFinalByIdHosp(idHosp,tipo,montoDespuesDesvios,ivaTmp,coaseguroTmp,descuentoTmp,deducibleTmp){
    	 //Fórmulas Banco
    	 if (tipo==1){
    		 switch(idHosp){
    	  		case 1://STAR MEDICA CENTRO
    	  			return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
    	  		case 2://SAICH
    	  			return (montoDespuesDesvios-descuentoTmp)+ivaTmp;
	    	  	case 3://MOCEL
	    	  		return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
	    	  	case 4://DALINDE
	    	  		return (montoDespuesDesvios-descuentoTmp)+ivaTmp;
	    	  	case 5://INFANTIL PRIVADO
	    	  		return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
	    	  	case 6://SEBP
	    	  		return (montoDespuesDesvios+ivaTmp);
	    	  	case 7://CMSH
	    	  		return (montoDespuesDesvios+ivaTmp);	  	
	    	  	default:	
	    	  		return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);   	  	
	    	  }
    	 }
    	 //Fórmula Seguros
    	 if (tipo==2){
    		 switch(idHosp){
    	  		case 1://STAR MEDICA CENTRO
    	  			return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
    	  		case 2://SAICH
    	  			return (montoDespuesDesvios-descuentoTmp)+ivaTmp;
	    	  	case 3://MOCEL
	    	  		return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
	    	  	case 4://DALINDE
	    	  		return (montoDespuesDesvios-descuentoTmp)+ivaTmp;
	    	  	case 5://INFANTIL PRIVADO
	    	  		return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
	    	  	case 6://SEBP
	    	  		return (montoDespuesDesvios+ivaTmp);
	    	  	case 7://CMSH
	    	  		return (montoDespuesDesvios+ivaTmp);	  	
	    	  	default:	
	    	  		return (montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);   	  	
	    	  }
    	 }
      }
      
      $scope.subirFactura=function (){    	  
    	  console.log("Revisar datos de la Factura");
    	  console.log($scope);
    	  console.log($rootScope);
    	   var data2={
    	      noFactura: $rootScope.eventoFactura.numeroFactura,
		      aprobada: $rootScope.factaprobSelected.nombre,
		      monto: $rootScope.eventoFactura.montoFactura,
		      detalle:"",
		      archivo:"factura"
		    };
    	   
    	  $scope.eventoFactura= new Object();
   		  //$scope.eventoRegistroBitacora.idEvento=$rootScope.eventoEditSelected.idEvento;
   		  $scope.eventoFactura.idEvento=$rootScope.eventoEditSelected.idEvento;
   		  console.log("SAVE FACTURA!!");
   		  console.log($scope);   		  
   		  $scope.eventoFactura.facturas = new Array(1);
   		  var factura=new Object();
   		  //factura.idEvento=$scope.eventoFactura.idEvento;
   		  factura.numeroFactura=$rootScope.eventoFactura.numeroFactura;
   		  factura.aprobada=$rootScope.factaprobSelected.nombre;
   		  factura.monto=$rootScope.eventoFactura.montoFactura;
   		  factura.detalle=$rootScope.eventoFactura.detalle;
   		  factura.observaciones=$rootScope.eventoFactura.detalle;
   		  factura.rutaFactura="";
   		  factura.ajusteFactura=$rootScope.eventoFactura.ajusteFactura;
   		  factura.tipoComprobanteFiscalCorregido=$rootScope.eventoFactura.tipoComprobanteFiscalCorregido;
   		  factura.montoComprobanteFiscalCorregido=$rootScope.eventoFactura.montoComprobanteFiscalCorregido;
   		  factura.folioComprobanteFiscalCorregido=$rootScope.eventoFactura.folioComprobanteFiscalCorregido;
   		  $scope.eventoFactura.facturas.push(factura);
   		  delete Array.prototype.toJSON;	    	
   		  $http.defaults.headers.post["Content-Type"] = "application/json";				
   		  console.log("SAVE VALUES FACTURA");
   		  console.log($scope.eventoFactura);
   		  $http.post('mvc/evento/guardarfactura',$scope.eventoFactura).
   		  		success(function(data, status, headers, config) {   		  			
   		  			uploadJqueryForm();   		  			   		  		
   		  			$rootScope.dataFacturas.push(factura);
   		  			//$location.path('/showeventos');
   		  		}).error(function(data, status, headers, config) {
   		    	  alert("Error al registrar la bit�cora"+data);
   		    });    	   
    	   $rootScope.dataFacturas.push(data2);
      };
      $scope.nuevaFacturaShow=function (){
    	 if ($scope.subirFacturaVar==false)
    		 $scope.subirFacturaVar=true;
    	 else
    		 $scope.subirFacturaVar=false;
      };
      $scope.finalizarEvento = function (evento){
  		$scope.eventoRegistroFinalizarEvento= new Object();
  		$scope.eventoRegistroFinalizarEvento.idEvento=$rootScope.eventoEditSelected.idEvento;
  		console.log("SAVE VALUES");
  		console.log($scope);
  		
  		$scope.eventoRegistroFinalizarEvento.montoAntesDesvios=$scope.evento.montoAntesDesvios;
  		$scope.eventoRegistroFinalizarEvento.montoDespuesDesvios=$scope.evento.montoDespuesDesvios;
  		$scope.eventoRegistroFinalizarEvento.descuentoHospital=$scope.evento.descuentoHospital;
  		$scope.eventoRegistroFinalizarEvento.difFacturacionMontMenosDesvios=$scope.evento.difFacturacionMontMenosDesvios;
  		$scope.eventoRegistroFinalizarEvento.comentariosDiferenciaFacturacion=$scope.evento.comentariosDiferenciaFacturacion;
  		$scope.eventoRegistroFinalizarEvento.descuentoNoAplicado=$scope.evento.descuentoNoAplicado;
  		$scope.eventoRegistroFinalizarEvento.cargosPersonales=$scope.evento.cargosPersonales;
  		$scope.eventoRegistroFinalizarEvento.totalDesvios=$scope.evento.totalDesvios;
  		$scope.eventoRegistroFinalizarEvento.ajusteFactura=$scope.evento.ajusteFactura;
  		$scope.eventoRegistroFinalizarEvento.tipoComprobanteFiscalCorregido=$scope.evento.tipoComprobanteFiscalCorregido;
  		$scope.eventoRegistroFinalizarEvento.folioComprobanteFiscalCorregido=$scope.evento.folioComprobanteFiscalCorregido;
  		$scope.eventoRegistroFinalizarEvento.montoComprobanteFiscalCorregido=$scope.evento.montoComprobanteFiscalCorregido;
  		//Justificaci�n Gastos
  		$scope.eventoRegistroFinalizarEvento.justificacionTerapiaIntensiva=$scope.evento.justificacionTerapiaIntensiva;
  		$scope.eventoRegistroFinalizarEvento.justificacionMedicamentos=$scope.evento.justificacionMedicamentos;
  		$scope.eventoRegistroFinalizarEvento.justificacionMaterialesEquipos=$scope.evento.justificacionMaterialesEquipos;
  		$scope.eventoRegistroFinalizarEvento.justificacionBancoSangre=$scope.evento.justificacionBancoSangre;
  		$scope.eventoRegistroFinalizarEvento.justificacionQuirofano=$scope.evento.justificacionQuirofano;
  		$scope.eventoRegistroFinalizarEvento.justificacionOtros=$scope.evento.justificacionOtros;
  		$scope.eventoRegistroFinalizarEvento.justificacionObservaciones=$scope.evento.justificacionObservaciones;
  		  		
  		delete Array.prototype.toJSON;	    	
  		$http.defaults.headers.post["Content-Type"] = "application/json";				
  		console.log("SAVE VALUES");
  		console.log($scope.eventoRegistroFinalizarEvento);
  		$http.post('mvc/evento/finalizarevento',$scope.eventoRegistroFinalizarEvento).
  			success(function(data, status, headers, config) {
  		    	  alert("Se finaliz� correctamente el Alta M�dica");		    	  
  		    	  //$location.path('/showeventos');
  		    }).error(function(data, status, headers, config) {
  		        // called asynchronously if an error occurs
  		        // or server returns response with an error status.
  		    	  alert("Error al finalizar el evento"+data);
  		    });				
  		//$scope.hideAltaSeguimientoMedicoForm();
  	};
  	
  	$scope.finalizarMontosEvento = function (evento){
  		$scope.eventoRegistroFinalizarEvento= new Object();
  		$scope.eventoRegistroFinalizarEvento.idEvento=$rootScope.eventoEditSelected.idEvento;
  		console.log("SAVE VALUES");
  		console.log($scope.eventoRegistroFinalizarEvento.idEvento);
  		console.log($scope);		
  		$scope.eventoRegistroFinalizarEvento.statusEvento=2;

  		$scope.eventoRegistroFinalizarEvento.ivaFinalizarEvento=$rootScope.eventoFinalizarEventoForm.ivaFinalizarEvento;
  		$scope.eventoRegistroFinalizarEvento.coaseguroFinalizarEvento=$rootScope.eventoFinalizarEventoForm.coaseguroFinalizarEvento;
  		$scope.eventoRegistroFinalizarEvento.deducibleFinalizarEvento=$rootScope.eventoFinalizarEventoForm.deducibleFinalizarEvento;
  		$scope.eventoRegistroFinalizarEvento.descuentoHospFinalizarEvento=$rootScope.eventoFinalizarEventoForm.descuentoHospitalFinalizarEvento;
  		  		  		
  		delete Array.prototype.toJSON;	    	
  		$http.defaults.headers.post["Content-Type"] = "application/json";				
  		console.log("SAVE VALUES");
  		console.log($scope.eventoRegistroFinalizarEvento);
  		$http.post('mvc/evento/finalizarmontosevento',$scope.eventoRegistroFinalizarEvento).
  			success(function(data, status, headers, config) {
  		    	  alert("Se finaliz� correctamente el Evento!");		    	  
  		    	  //$location.path('/showeventos');
  		    }).error(function(data, status, headers, config) {
  		        // called asynchronously if an error occurs
  		        // or server returns response with an error status.
  		    	  alert("Error al finalizar el evento"+data);
  		    });				
  		//$scope.hideAltaSeguimientoMedicoForm();
  	};
  	
};

var Cat_ICD_Controller_Egreso = function ($scope,$http,$rootScope) {
	scope=$scope;	
	$rootScope.rowCollectionICD_Egreso={};
	$rootScope.rowCollectionCPT_Egreso={};
	$http.post('mvc/evento/geticds').
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
		  $rootScope.rowCollectionICD_Egreso=data;
		  $http.post('mvc/evento/getcpts').
		  success(function(data2, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
			  console.log("CPTS");
			  console.log(data2);
			  $rootScope.rowCollectionCPT_Egreso=data2;
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		 });
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	 });
	$rootScope.columnCollectionICD_Egreso = [
        {label: 'Id', map: 'idIcd'},
        {label: 'Descripci�n', map: 'descripcion'}
    ];    
	$rootScope.columnCollectionCPT = [
	      {label: 'Id', map: 'idCpt'},
	      {label: 'Descripci�n', map: 'descripcion'}
	     ];
    scope.globalConfig = {    	        
        isPaginationEnabled: true,
        isGlobalSearchActivated: true,        
        itemsByPage: 10,
        selectionMode: 'single',
        actions: {
            list: { url: '/GetUsers' },
            edit: { url: '/EditUser', title: 'Edit User', desc: 'Edit', iconClass: '' }, 
            add: { url: '/AddUser', title: 'Add User', buttonClass: 'pull-right', iconClass: 'icon-plus', desc: ' Add User' }, // TODO: zkontrolovat default description
            remove: { url: '/DelUser', title: 'Confirmation Dialog', msg: 'Do you really want to delete the user?' }
        }
    }    
    scope.messageEditarImplant="Implants";
  //keep track of selected items
    scope.$on('selectionChange', function (event, args) {    	
    	if (args.item.idIcd!=null){
    		$rootScope.idTipoIDCEgreso=args.item.idIcd;
    		$rootScope.tipoIDCEgreso=args.item.descripcion;
    	}
    	if (args.item.idCpt!=null){
    		if ($rootScope.tipoCPTSelec==1){
    			$rootScope.idTipoProced1=args.item.idCpt;
    			$rootScope.tipoProced1=args.item.descripcion;
    		}
    		if ($rootScope.tipoCPTSelec==2){
    			$rootScope.idTipoProced2=args.item.idCpt;
        		$rootScope.tipoProced2	=args.item.descripcion;
    		}
    	}
        console.log(args);        
    });
    
    scope.editarImplant = function (){    	
    	alert("Editar");
    };
    scope.eliminarImplant2 = function (){    	
    	alert("Editar");
    };
};

