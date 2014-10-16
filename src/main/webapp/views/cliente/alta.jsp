<link rel="stylesheet" href="static/css/bootstrap.min.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
		<td bgcolor="#6688a6" width="1180" height="23" align="center" ><img src="static/img/cliente.png" height="30" width="30"/> <span style="color:white"> Agregar Cliente</span>
	   </td>
	    </tr><tr><td>Por favor ingrese los datos del nuevo Cliente:</td>
	</tr>
</table>
<div ng-controller="AltaClienteController">
	<form  name="altaclienteform" class="css-form">
	<table>
		<tr>		
			<td>RAZÓN SOCIAL:</td>
			<td><input type="text" ng-model="cliente.razonSocialCliente" /></td>
			<td>DOMICILIO:</td>
			<td><input type="text" ng-model="cliente.domicilioCliente" size="30" required/></td>
		</tr>		  		  	  	  
		<tr>
			<td>DIRECTOR MÉDICO:</td> 
	  	  	<td><input type="text" ng-model="cliente.directorMedicoCliente" size="30"/></td>
			<td>CONMUTADOR:</td> 
	  	  	<td><input type="text" ng-model="cliente.conmutadorCliente" size="30" numbers-only="numbers-only"/></td>
	  		<td></td> 
	  	  	<td></td>
	  	<tr/>
	  </table>
	  <span class="mensajeTitulo">DATOS DE CONTACTO</span>
	  <table>
	  	<tr>	  	  		  	
	  		<td>NOMBRE: 
	  	  	<td><input type="text" ng-model="cliente.nombreCliente" size="30"/></td>
	  	  	<td>PUESTO: 
	  	  	<td><input type="text" ng-model="cliente.nombreCliente" size="30"/></td>
	  	<tr/>
	  	<tr>
	  	  	<td>TELÉFONO OFICINA:</td>
	  	  	<td><input type="text" ng-model="cliente.telOfiCliente" size="30" numbers-only="numbers-only"/></td>	  	
	  		<td>TELÉFONO CELULAR:</td> 
	  		<td><input type="text" ng-model="cliente.telCelCliente" size="30" numbers-only="numbers-only"/></td>
	  	<tr/>
	  	<tr>
	  	  	<td>CORREO ELECTRÓNICO:</td>
	  	  	<td><input type="email" ng-model="cliente.emailCliente" size="30"/></td>	  	
	  		<td></td> 
	  		<td></td>
	  	<tr/>	  	  			  		  
		<tr>
			<td>
			</td>
			<td>  	  	
  	  		<button ng-click="guardarCliente(cliente)"  ng-disabled="altaclienteform.$invalid || isUnchanged(cliente)">Guardar</button>
  			</td>
  			<td></td>
	  		<td><span class="mensajeError" ng-show="altaclienteform.$invalid">{{mensajeError}}</span></td>
  		</tr>
  		</table>   
	</form>
	
	<script type="text/ng-template" id="modalAltaCliente.html">
	  <div class="modal-header">
            <h3>Notificación</h3>
        </div>
        <div class="modal-body">
            {{mensajeDialogoAltaCliente}}
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="resetClienteForm()">Agregar Otro</button>
            <button class="btn btn-warning" ng-click="cancelClienteForm()">Cerrar</button>
        </div>
    </script>
    
</div>    
    