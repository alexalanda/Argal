<link rel="stylesheet" href="static/css/bootstrap.min.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
		<td bgcolor="#6688a6" width="1180" height="23" align="center" ><img src="static/img/implant.jpg" height="30" width="30"/> <span style="color:white"> Agregar Implant</span>
	   </td>
	    </tr><tr><td>Por favor ingrese los datos del nuevo Implant:</td>
	</tr>
</table>
<div ng-controller="AltaImplantController">
	<form name="altaimplantform" class="css-form">
	<table>
		<tr>		
			<td>NOMBRE:</td>
			<td><input type="text" ng-model="implant.nombreImplant" /></td>
			<td>APELLIDO PATERNO :</td>
			<td><input type="text" ng-model="implant.appImplant" size="30" required/></td>
		</tr>		  		  	  	  
		<tr>
			<td>APELLIDO MATERNO:</td> 
	  	  	<td><input type="text" ng-model="implant.apmImplant" size="30"/></td>
	  		<td>NEXTEL:</td> 
	  	  	<td><input type="text" ng-model="implant.nextelImplant" size="30"/></td>
	  	</tr>
	  	<tr>
	  	  	<td>ID:</td> 
	  	  	<td><input type="text" ng-model="implant.idNextelImplant" size="30"/></td>	  	
	  		<td>CELULAR:</td> 
	  	  	<td><input type="text" ng-model="implant.celularImplant" size="30" numbers-only="numbers-only"/></td>
	  	</tr>
	  	<tr>
	  	  	<td>TEL�FONO OFICINA:</td>
	  	  	<td><input type="text" ng-model="implant.telOfiImplant" size="30" numbers-only="numbers-only"/></td>	  	
	  		<td>PUESTO:</td> 
	  		<td><input type="text" ng-model="implant.puestoImplant" size="30"/></td>
	  	</tr>
	  	<tr>
	  		<td>CORREO ELECTR�NICO INSTITUCIONAL:</td>
	  	  	<td><input type="email" ng-model="implant.emailInstImplant" size="30"/></td>	  	
	  		<td>CORREO ELECTRONICO PERSONAL:</td>
	  	  	<td><input type="email" ng-model="implant.emailPersImplant" size="30"/></td>
	  	</tr>
  		<tr>
  			<td>�SUPER M�DICO?</td>
  			<td><input type="checkbox" ng-model="implant.superMedico" /></td>
  			<td></td> 
  		</tr>  			  		  
		<tr>
			<td>
			</td>
			<td>  	  	
  	  			<!--  button ng-click="guardarImplant(implant)"  ng-disabled="altaimplantform.$invalid || isUnchanged(implant)">Guardar</button-->
  			</td>
  			<td></td>
	  		<td><span class="mensajeError" ng-show="altaimplantform.$invalid">{{mensajeError}}</span></td>
  		</tr>
  		</table>   
	</form>
	<alert ng-repeat="alert in alerts" type="alert.type" close="closeAlertEditarImplant($index)">{{alert.msg}}</alert>
  <table align="center">			
		<tr><td></td>
			<td>  	  	
	  	  		<button class="btn btn-primary" ng-click="guardarImplant(implant)"  ng-disabled="altaimplantform.$invalid || isUnchanged(implant)">Guardar</button>  	  		  	  		   
  			</td>
  			<td><button class="btn btn-warning" ng-click="cancelImplForm()">Cerrar</button></td>
	  		<td><span class="mensajeError" ng-show="editarimplantform.$invalid">{{mensajeError}}</span></td>	  		            
  		</tr>
  		</table>   
	<script type="text/ng-template" id="modalAltaImplant.html">
	  <div class="modal-header">
            <h3>Notificaci�n</h3>
        </div>
        <div class="modal-body">
            {{mensajeDialogoAltaImplant}}
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="resetImplForm()">Agregar Otro</button>
            <button class="btn btn-warning" ng-click="cancelImplForm()">Cerrar</button>
        </div>
    </script>
	
</div>    
    