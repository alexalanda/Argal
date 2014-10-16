<link rel="stylesheet" href="static/css/bootstrap.min.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
	<td width="1180" bgcolor="#6688a6" height="23" align="center" ><img src="static/img/segmedico1.jpg" height="30" width="30"/><span style="color:#fff;"> SEGUIMIENTO MÉDICO</span>   
	</td>
	</tr>
</table>

<table border="0">
	<tr>
		<td>
			<div ng-show="eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">ID EVENTO:</span> {{eventoEditSelected.idEvento}} 
			<span style="color: #6688a6;">FECHA:</span>{{eventoEditSelected.fechaIngreso}} 
				<span style="color: #6688a6;">TITULAR:</span>
					{{eventoEditSelected.registroSeguroPersonal.nombreTitular}}&nbsp;
					{{eventoEditSelected.registroSeguroPersonal.appTitular}}&nbsp;
					{{eventoEditSelected.registroSeguroPersonal.apmTitular}}&nbsp;
				<span style="color: #6688a6;">PACIENTE:</span>
					{{eventoEditSelected.registroSeguroPersonal.nombrePaciente}}&nbsp;
					{{eventoEditSelected.registroSeguroPersonal.appPaciente}}&nbsp;
					{{eventoEditSelected.registroSeguroPersonal.apmPaciente}}&nbsp;
    		</div>
    		<div ng-show="eventoEditSelected.registroGastosMayores"> 
    		<span style="color: #6688a6;">ID EVENTO:</span> {{eventoEditSelected.idEvento}} 
			<span style="color: #6688a6;">FECHA:</span>{{eventoEditSelected.fechaIngreso}}
				<span style="color: #6688a6;">TITULAR:</span>
					{{eventoEditSelected.registroGastosMayores.nombreTitular}}&nbsp;
					{{eventoEditSelected.registroGastosMayores.appTitular}}&nbsp;
					{{eventoEditSelected.registroGastosMayores.apmTitular}}&nbsp;
				<span style="color: #6688a6;">PACIENTE:</span>
					{{eventoEditSelected.registroGastosMayores.nombrePaciente}}&nbsp;
					{{eventoEditSelected.registroGastosMayores.appPaciente}}&nbsp;
					{{eventoEditSelected.registroGastosMayores.apmPaciente}}&nbsp;
    		</div>			
		</td>
	</tr>
</table>

<div ng-controller="SeguimientoMedicoController" id="divAltaSeguimientoMedicoController" style="display:none" align="center" >
	<table  border="1">
		<tr>				
			<td align="center" bgcolor="#6688a6"><span style="color: #ffffff;">REGISTRAR ENTRADA DE BITÁCORA MÉDICA</span></td>
		</tr>
	</table>
	<table >																	
		<tr>
			<td><span style="color: #6688a6;">REPORTE MÉDICO:</span></td>
			<td><select ng-model="regreportemedicoselected" ng-options="reportemedico.descripcion for reportemedico in reportesmedicos" > 	  	  			 
				<option value="">Seleccione...</option></select>	 					 				  	  	
			</td>
			<td><span style="color: #6688a6;">OBSERVACIONES:</span></td>
			<td width="215">
				<textarea ng-model="bitacora.observaciones" ></textarea>		   					 					 		
			</td>		  			
			<td><span style="color: #6688a6;">FECHA:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />				        				   
			</td>										  	
	  	</tr>
	  </table>
	  <div ng-controller="SeguimientoMedicoController" id="divDef" style="display:none">
	  	<table>
	  	<tr>	  	
			<td><span style="color: #6688a6;">FECHA DEF.:</span></td>
			<td><input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt2" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" /></td>		
			<td><span style="color: #6688a6;">HORA DEF.:</span></td>
			<td><input type="time" id="exampleInput" name="input" ng-model="valueTime" placeholder="HH:mm" min="08:00" max="17:00" style="width: 100px"/></td>
		</tr>
	  	</table>
	  </div>	  
	  <table>
	  	<tr>
	  		<td></td><td></td>
			<td>
				<button class="btn btn-default" ng-click="guardarBitacora()">Guardar</button>
			</td>											
			<td>
				<button class="btn btn-default" ng-click="hideAltaSeguimientoMedicoForm()">Cancelar</button>
			</td>
			<td></td><td></td>
		</tr>
	  </table>			
</div>

<div ng-controller="SeguimientoMedicoController" id="divEditaSeguimientoMedicoController" style="display:none" align="center">
	<table border="2">
		<tr>				
			<td  align="center" bgcolor="#6688a6"><span style="color: #ffffff;">EDITAR ENTRADA DE BITÁCORA MÉDICA</span></td>
		</tr>
	</table>
	<table>																	
		<tr>
			<td><span style="color: #6688a6;">REPORTE MÉDICO:</span></td>
			<td><select ng-model="editregreportemedicoselected" ng-options="reportemedico.descripcion for reportemedico in reportesmedicos" ng-change="showFormNac()"> 	  	  			 
				<option value="">Seleccione...</option></select>	 					 				  	  	
			</td>
			<td><span style="color: #6688a6;">OBSERVACIONES:</span></td>
			<td width="215">
				<textarea ng-model="editbitacora.observaciones" ></textarea>		   					 					 		
			</td>		  			
			<td><span style="color: #6688a6;">FECHA:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />				        				   
			</td>									
	  	<tr/>
	  	<tr>
	  		<td></td><td></td>
			<td>
				<button class="btn btn-default" ng-click="guardarEditarBitacora()">Guardar</button>
			</td>											
			<td>
				<button class="btn btn-default" ng-click="hideEditaSeguimientoMedicoForm()">Cancelar</button>
			</td>
			<td></td><td></td>
		</tr>
	  </table>			
</div>				
			
<div id="divSeguimientoMedicoController" ng-controller="SeguimientoMedicoController" align="center">
	<table border="2">
		<tr>				
			<td width="1180" align="center" bgcolor="#6688a6"><span style="color: #ffffff;">BITACORAS MÉDICAS REGISTRADAS</span></td>
		</tr>
	</table>
	<table>
	 <tr><td> Buscar: <input ng-model="searchText"></td><td align="right">Agregar<a ng-click="showAltaSeguimientoMedicoForm()"><img src="static/img/agregarimplant.jpg" height="80" width="80"/></a>
	 </td></tr>
	</table>
  	<table width="1180px" class="table ng-table-rowselected" border="3" ng-table="tableParams" show-filter="true">
            <tr ng-repeat="bitacora in $data | filter:searchText"
                ng-click="bitacora.$selected = !bitacora.$selected; changeSelection(bitacora)"
                ng-class="{'active': bitacora.$selected}" >
                <td data-title="'IdBitácora'" sortable="'idBitacora'">
                    {{bitacora.idBitacora}}
                </td>
                <td data-title="'Fecha'" sortable="'fechaBitacora'">
                    {{bitacora.fechaBitacora | date:'shortDate'}}
                </td>
                <td data-title="'Estado del Paciente'" sortable="'idRegistroMedico'">
                    {{reportesmedicos[bitacora.idRegistroMedico].descripcion}}
                </td>
                <td data-title="'Observaciones'" sortable="'observaciones'">
                    {{bitacora.observaciones}}
                </td>
                <td data-title="">
                	<a ng-click="showEditaSeguimientoMedicoForm()"><img src="static/img/editar.jpg" height="20" width="20"/></a>
                </td>
                <td data-title="">
                	<a ng-click="eliminarGastoImproForm()"> 
                		<img height="20" width="20" src="static/img/borrar.jpg"/>
                	</a>
                </td>
                
            </tr>
    </table>
    
	<!--  table width="1180px" border=2>
   		<tr ng-show="tipoUsuarioLogin!=2">
			<td align="center">   
				<button class="btn btn-default" >Cerrar</button>
				<button class="btn btn-default" ng-click="showEditaSeguimientoMedicoForm()">Editar</button>	           			
				<button class="btn btn-default" ng-click="eliminarGastoImproForm()">Eliminar</button>
			</td>
		</tr>
	</table-->
</div>