<link rel="stylesheet" href="static/css/bootstrap.min.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
		<td bgcolor="#6688a6" width="1180" height="23" align="center" ><img src="static/img/agregarhospital.jpg" height="30" width="30"/> <span style="color:white"> Agregar Hospital</span>
	   </td>
	    </tr><tr><td>Por favor ingrese los datos del nuevo Hospital:</td>
	</tr>
</table>
<div ng-controller="AltaHospitalController">
	<form  name="altahospitalform" class="css-form">
	<table>
		<tr>		
			<td>NOMBRE:</td>
			<td><input type="text" ng-model="hospital.nombreHospital" /></td>
			<td>CALLE Y N�MERO:</td>
			<td><input type="text" ng-model="hospital.direccionHospital" size="30" required/></td>
		</tr>		  		  	  	  		
	  	<tr>
	  	  	<td>COLONIA:</td>
	  	  	<td><input type="text" ng-model="hospital.coloniaHospital" size="30"/></td>	  	
	  		<td>MUNICIPIO/DELEGACI�N:</td> 
	  		<td><input type="text" ng-model="hospital.municipioDelHospital" size="30"/></td>
	  	</tr>
	  	<tr>
	  		<td>C.P.:</td>
	  	  	<td><input type="text" ng-model="hospital.cpHospital" size="30"/></td>	  	
	  		<td>PAIS:</td>
	  	  	<!--td><input type="text" ng-model="hospital.paisHospital" size="30"/></td-->
	  	  	<td><select ng-model="paisSel" ng-options="pais.pais for pais in paises" ng-change="updateCiudadHospForm()">
		 		<option value="">Seleccione un pa�s...</option>
	 			</select>
	 		</td>
	  	</tr>
  		<tr>
  			<td>ESTADO:</td>
  			<td>
  				<div class="animate-switch-container" ng-switch on="paisSel.id" ng-show="showciudadinput">
  				<input type="text" ng-model="hospital.estadoHospital" ng-switch-default size="30"/>  				
  				<select ng-controller="AltaHospitalController" ng-model="estadoSel1" ng-switch-when="1" ng-options="estado.estado for estado in estados" ng-change="updateEstadoHospForm()">
		 			<option value="">Seleccione un estado...</option>
	 			</select>
  				</div>
  			</td>
  			<td>CIUDAD:</td> 
  			<td><input type="text" ng-model="hospital.ciudadHospital" size="30" /></td>
  		</tr>
  		<tr>
  			<td>CONMUTADOR:</td>
  			<td><input type="text" ng-model="hospital.conmutadorHospital" size="30"/></td>
  			<td>TEL�FONO DIRECTO DE M�DULO:</td> 
  			<td><input type="text" ng-model="hospital.telModuloHospital" size="30" numbers-only="numbers-only"/></td>
  		</tr>  			  		  
		<tr>
			<td>
			</td>
			<td>  	  	
  	  		<!--  button ng-click="guardarHospital(hospital)"  ng-disabled="altahospitalform.$invalid || isUnchanged(hospital)">Guardar</button-->
  			</td>
  			<td></td>
	  		<td><span class="mensajeError" ng-show="altahospitalform.$invalid">{{mensajeError}}</span></td>
  		</tr>
  		</table>   
	</form>
	<alert ng-repeat="alert in alerts" type="alert.type" close="closeAlertEditarImplant($index)">{{alert.msg}}</alert>
	
	<table align="center">			
		<tr><td></td>
			<td>  	  	
	  	  		<button class="btn btn-primary" ng-click="guardarHospital(hospital)"  ng-disabled="altahospitalform.$invalid || isUnchanged(hospital)"">Guardar</button>  	  		  	  		   
  			</td>
  			<td><button class="btn btn-warning" ng-click="cancelImplForm()">Cerrar</button></td>
	  		<td><span class="mensajeError" ng-show="editarimplantform.$invalid">{{mensajeError}}</span></td>	  		            
  		</tr>
  		</table>   
	<script type="text/ng-template" id="modalAltaHosp.html">
	  <div class="modal-header">
            <h3>Notificaci�n</h3>
        </div>
        <div class="modal-body">
            {{mensajeDialogoAltaHosp}}
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="resetHospForm()">Agregar Otro</button>
            <button class="btn btn-warning" ng-click="cancelHospForm()">Cerrar</button>
        </div>
    </script>
</div>    
    