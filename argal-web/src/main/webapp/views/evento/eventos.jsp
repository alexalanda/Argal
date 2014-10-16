<style>
    .ovh {overflow:hidden;}
</style>
<br>

<div ng-controller="EventoController" align="center">	
	<!-- TABLA PARA ADMINISTRADORES E IMPLANTS-->
	<center>
		<table width="1000">
			<tr style="color: #fff;">
				<td style="color:#6688a6;background: #fff;" align="center" width="1000">Eventos Registrados</td>				
				<td style="color:#6688a6;background: #fff;" align="center" width="1000">Buscar por: <input ng-model="searchText"></td>
			</tr>
		</table>
	</center>    
  	<table width="1000" style="background: #D3E0EC;" class="table ng-table-rowselected" ng-table="tableParamsEvento" show-filter="true">
            <tr ng-if="tipoUsuarioLogin==2" ng-repeat="evento in $data | filter:searchText"
                ng-click="evento.$selected = !evento.$selected; changeSelection(evento)"
                ng-class="{'active': evento.$selected}">
                <td  ng-show="tipoUsuarioLogin!=2" data-title="'IdEvento'" sortable="'idEvento'">
                    {{evento.idEvento}}
                </td>
                <td data-title="'Folio Hospital'" sortable="'folioHospital'">
                    {{evento.folioHospital}}
                </td>                
                <td ng-show="tipoUsuarioLogin!=2" data-title="'Folio Argal'" sortable="'folioArgal'">
                    {{evento.folioArgal}}
                </td>                
                <td data-title="'Fecha Ingreso'" sortable="'idEvento'">
                    {{evento.fechaIngreso | date:'shortDate'}}
                </td>
                <td ng-show="tipoUsuarioLogin!=2" data-title="'Cliente'" sortable="'idEvento'">
                    {{evento.cliente.razonSocialCliente}}
                </td>                
                <td data-title="'Hospital'" sortable="'hospital.nombreHospital'">
                    {{evento.hospital.nombreHospital}}
                </td>                                
                <td data-title="'Paciente'" sortable="'idEvento'">
                    <div ng-show="evento.registroGastosMayores">{{evento.registroGastosMayores.nombrePaciente}} {{evento.registroGastosMayores.appPaciente}} {{evento.registroGastosMayores.apmPaciente}}</div>
                    <div ng-show="evento.registroSeguroPersonal">{{evento.registroSeguroPersonal.nombrePaciente}} {{evento.registroSeguroPersonal.appPaciente}} {{evento.registroSeguroPersonal.apmPaciente}}</div>	
                </td>
                <td  align ="center" ng-show="tipoUsuarioLogin==2" data-title="'Días Transcurridos'" sortable="'idEvento'">                
                    {{fecha(evento)}}
                </td>
                <td ng-show="tipoUsuarioLogin==2" data-title="'Estado Actual Paciente'" sortable="'idEvento'">
                    {{evento.bitacoras[(evento.bitacoras.length)-1].descripcion}}
                </td>
                <td  ng-show="tipoUsuarioLogin>1" data-title="'Status del Evento'" sortable="'idEvento'">
                    <div ng-show="evento.statusEvento==1">ACTIVO</div>
                    <div ng-show="evento.statusEvento==2">EGRESO</div>
                    <div ng-show="evento.statusEvento==3">FINALIZADO</div>
                </td>
                <td ng-show="tipoUsuarioLogin==2" data-title="'Monto Gastos Actual'" sortable="'idEvento'">
                    	{{evento.gastos[(evento.gastos.length)-1].montoUnitario | currency:"$"}}
                </td>                                                                                   
                <td ng-show="tipoUsuarioLogin!=2" width="50" data-title="'Editar Datos'" >
                    <img src="static/img/editar.jpg" width="20" height="20" ng-click="openEventoById('modal1','EditarEventoController','views/evento/editar.jsp',evento.idEvento)"></img>
                </td>
                                
                <td ng-show="tipoUsuarioLogin!=2" width="50" data-title="'Control de Gastos'" >                
                    <img src="static/img/gastos1.jpg" width="20" height="20" ng-click="openEventoById('modal1','CedulaControlController','views/evento/cedula_control/cedula_control.jsp',evento.idEvento)"></img>
                </td>
                <td ng-show="tipoUsuarioLogin==2" width="50" data-title="'Resumen de Gastos'" >                
                    <img src="static/img/gastos1.jpg" width="20" height="20" ng-click="openEventoById('modal1','CedulaControlController','views/evento/cedula_control/cedula_control.jsp',evento.idEvento)"></img>
                </td>                                                               
                <td width="50" data-title="'Seguimiento Médico'" >
                    <img src="static/img/segmedico1.jpg" width="20" height="20" ng-click="openEventoById('modal1','SeguimientoMedicoController','views/evento/seguimiento_medico/seguimiento_medico.jsp',evento.idEvento)"></img>
                </td>
                <td ng-show="tipoUsuarioLogin!=2" width="50" data-title="'Egresar Paciente'" >
                    <a ng-click="openEventoById('modal1','AltaMedicaController','views/evento/alta_medica/alta_medica.jsp',evento.idEvento)"><img src="static/img/egresopaciente1.jpg" width="20" height="20"></img></a>
                </td>
                <td ng-show="tipoUsuarioLogin==2" width="50" data-title="'Datos de Egreso'" >
                    <a ng-click="openEventoById('modal1','AltaMedicaController','views/evento/alta_medica/alta_medica.jsp',evento.idEvento)"><img src="static/img/egresopaciente1.jpg" width="20" height="20"></img></a>
                </td>
                
                <td ng-show="tipoUsuarioLogin!=2" width="50" data-title="'Finalizar Evento'"  >
                    <a ng-click="openEventoById('modal1','AltaMedicaController','views/evento/finalizar_evento/finalizar_evento.jsp',evento.idEvento)"><img src="static/img/finalizarevento1.jpg" width="20" height="20"></img></a>
                </td>
                <td ng-show="tipoUsuarioLogin==2" width="50" data-title="'Balance Final'"  align="center">
                    <a ng-click="openEventoById('modal1','AltaMedicaController','views/evento/finalizar_evento/finalizar_evento.jsp',evento.idEvento)"><img src="static/img/finalizarevento1.jpg" width="20" height="20"></img></a>
                </td>
            </tr>
        </table>
    
        <!-- TABLA PARA CLIENTES -->                                                                                                                     
   

	<!-- button class="buttonappstyle" ng-click="openViewEvento('modal1','CedulaControlController','views/evento/cedula_control/cedula_control.jsp')">CONTROL DE GASTOS</button> -->	    			
	<!--button class="buttonappstyle" ng-click="openViewEvento('modal1','SeguimientoMedicoController','views/evento/seguimiento_medico/seguimiento_medico.jsp')">SEGUIMIENTO MÉDICO</button> -->			
	<!--button class="buttonappstyle" ng-click="openViewEvento('modal1','PolizaController','views/evento/poliza/poliza.jsp')">DATOS DE LA POLIZA</button> -->
	<!--button class="buttonappstyle" ng-click="openViewEvento('modal1','AltaMedicaController','views/evento/alta_medica/alta_medica.jsp')">EGRESO DE PACIENTES</button> -->
	<!-- button class="buttonappstyle" ng-click="openViewEvento('modal2','AltaMedicaController','views/evento/finalizar_evento/finalizar_evento.jsp')">FINALIZAR EVENTO</button> --> 
    
</div>