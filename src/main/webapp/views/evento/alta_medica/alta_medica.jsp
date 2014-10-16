<link rel="stylesheet" href="static/css/bootstrap.min.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
	<td ng-show="idUsuarioLogin!=2" width="1180" bgcolor="#6688a6" height="23" align="center" ><img src="static/img/egresopaciente1.jpg" height="30" width="30"/><span style="color:#fff;"> EGRESO DE PACIENTE</span>   
	</td>
	
	<td ng-show="idUsuarioLogin==2" width="1180" bgcolor="#6688a6" height="23" align="center" ><img src="static/img/egresopaciente1.jpg" height="30" width="30"/><span style="color:#fff;"> DATOS DEL EGRESO</span>   
	</td>
	
	</tr>
</table>

<div id="divEgresoFormulario" ng-controller="AltaMedicaController">		
	<table>																	
		<tr>
			<td><span style="color: #6688a6;">FECHA DE EGRESO:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />				        				   
			</td>
			<td><span style="color: #6688a6;">DIAGNOSTICO DE EGRESO(ICD):</span></td>
			<td>
				<div style="float:left;" ng-controller="Cat_ICD_Controller" >  
					<input type="text" ng-model="tipoIcd3" ng-click="openAddIcd2('','views/cat_icd/cat_icd.jsp',3)" style="width: 180px;cursor: pointer;"/>
				</div>
			</td>
			<td>
				<div style="float:left;" ng-controller="Cat_ICD_Controller" >  
					<img  style="cursor: pointer;" src="static/img/buscar.jpg" height="25" width="25" ng-click="openAddIcd2('','views/cat_icd/cat_icd.jsp',3)">			
				</div>
			</td>
		</tr>
		<tr>			
			<td><span style="color: #6688a6;">TIPO DE PROCEDIMIENTO 1 (CPT):</span></td>
			<td>
				<div style="float:left;" ng-controller="Cat_Cpt_Controller" >  
					<input type="text" ng-model="tipoCpt1" ng-click="openAddCpt2('','views/cat_cpt/cat_cpt.jsp',1)" style="width: 180px;cursor: pointer;"/>
				</div>
			</td>
			<td>
				<div style="float:left;" ng-controller="Cat_Cpt_Controller" >  
					<img  style="cursor: pointer;" src="static/img/buscar.jpg" height="25" width="25" ng-click="openAddCpt2('','views/cat_cpt/cat_cpt.jsp',1)">			
				</div>
			</td>
			<td><span style="color: #6688a6;">TIPO DE PROCEDIMIENTO 2: (CPT)</span></td>
			<td>
				<div style="float:left;" ng-controller="Cat_Cpt_Controller" >  
					<input type="text" ng-model="tipoCpt2" ng-click="openAddCpt2('','views/cat_cpt/cat_cpt.jsp',2)" style="width: 180px;cursor: pointer;"/>
				</div>
			</td>
			<td>
				<div style="float:left;" ng-controller="Cat_Cpt_Controller" >  
					<img  style="cursor: pointer;" src="static/img/buscar.jpg" height="25" width="25" ng-click="openAddCpt2('','views/cat_cpt/cat_cpt.jsp',2)">			
				</div>
			</td>
			
		</tr>
		<tr>
	
			<td><span style="color: #6688a6;">EVENTOS NO DESEABLES DEL ENTORNO HOSPITALARIO:</span></td>
			<td width="215">
				<textarea ng-model="evento.eventosNoDeseablesEntornoHosp" ></textarea>		   					 					 		
			</td>
			<td><span style="color: #6688a6;">MOTIVO DE EGRESO:</span></td>
			<td width="215">
				<select ng-model="motivoEgresoSelected" ng-options="motivoegreso.descripcion for motivoegreso in motivosegresos" ng-change="showFormNac()">
							<option value="">Seleccione...</option>
				</select>		   					 					 		
			</td>		
		</tr>
		<tr ng-show="tipoUsuarioLogin!=2">
			<td></td>
			<td></td>  	
			<td>
				<button class="btn btn-default" ng-click="guardarAltaPaciente()">Guardar</button>
			</td>											
			<td>
				<button class="btn btn-default" ng-click="hideEditaSeguimientoMedicoForm()">Cancelar</button>
			</td>	
			<td></td>														 
			<td></td>
	  	</tr>
	  </table>
</div>
			<div ng-controller="AltaMedicaController" id="divDef" style="display:none">
			  	<table>
			  	<tr>	  	
					<td><span style="color: #6688a6;">FECHA DEF.:</span></td>
					<td><input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt2" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" /></td>		
					<td><span style="color: #6688a6;">HORA DEF.:</span></td>
					<td><input type="time" id="exampleInput" name="input" ng-model="valueTime" placeholder="HH:mm" min="08:00" max="17:00" style="width: 100px"/></td>
				</tr>
			  	</table>
	  		</div>

<div id="divShowDiagEgreso" style="display:none" ng-controller="AltaMedicaController">
	<center>		
		<br><span class="mensajeTitulo">Seleccione un Diagnóstico de Egreso:</span>
	</center>
	<div ng-controller="Cat_ICD_Controller_Egreso" >
	<form  name="selectcat_descform"  class="css-form">
    <smart-table class="table table-striped smart-table" table-title="Smart Table" config="globalConfig" columns="columnCollectionICD_Egreso" rows="rowCollectionICD_Egreso" ></smart-table>
    <div ng-show="tipoUsuarioLogin!=2" >    
		<button ng-click="showMainAltaMedicaForm()">Aceptar</button>	           
	</div>
	</form>        
	</div>	  
</div>

<div id="divShowProcedimiento" style="display:none" ng-controller="AltaMedicaController">
	<center>		
		<br><span class="mensajeTitulo">Seleccione un Procedimiento:</span>
	</center>
	<div ng-controller="Cat_ICD_Controller_Egreso"  >
	<form  name="selectcat_descform"  class="css-form">
    <smart-table class="table table-striped smart-table" table-title="Smart Table" config="globalConfig" columns="columnCollectionCPT" rows="rowCollectionCPT_Egreso" ></smart-table>
    <div >    
		<button ng-click="showMainAltaMedicaForm()">Aceptar</button>	           
	</div>
	</form>        
	</div>	  
</div>

