<link rel="stylesheet" href="static/css/bootstrap.min.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
		<td bgcolor="#6688a6" width="1180" height="23" align="center" ><img src="static/img/cliente.png" height="30" width="30"/> <span style="color:white"> Editar Cliente</span>
	   </td>
	    </tr><tr><td>Por favor modifique los datos deseados para el Cliente:</td>
	</tr>
</table>
<div ng-controller="EditarClienteController">
	<form  name="editarclienteform" class="css-form">
	<table>
		<tr>		
			<td>RAZ�N SOCIAL:</td>
			<td><input type="text" ng-model="cliente.razonSocialCliente" /></td>
			<td>DOMICILIO:</td>
			<td><input type="text" ng-model="cliente.domicilioCliente" size="30" required/></td>
		</tr>		  		  	  	  
		<tr>
			<td>CONMUTADOR:</td> 
			<td><input type="text" ng-model="cliente.conmutadorCliente" size="30" numbers-only="numbers-only"/></td>
	  		<td></td>
	  	  	<td></td>
	  	<tr/>
	  </table>
	  <span class="mensajeTitulo">DATOS DE CONTACTO</span> 
	  <table>
	  	<tr>
	  	  	<td>DIRECTOR M�DICO:</td> 
	  	  	<td><input type="text" ng-model="cliente.directorMedicoCliente" size="30"/></td>	  	
	  		<td>NOMBRE: 
	  	  	<td><input type="text" ng-model="cliente.nombreCliente" size="30"/></td>
	  	<tr/>
	  	<tr>
	  	  	<td>TEL�FONO OFICINA:</td>
	  	  	<td><input type="text" ng-model="cliente.telOfiCliente" size="30" numbers-only="numbers-only"/></td>	  	
	  		<td>TEL�FONO CELULAR:</td> 
	  		<td><input type="text" ng-model="cliente.telCelCliente" size="30" numbers-only="numbers-only"/></td>
	  	<tr/>
	  	<tr>
	  	  	<td>CORREO ELECTR�NICO:</td>
	  	  	<td><input type="email" ng-model="cliente.emailCliente" size="30"/></td>	  	
	  		<td></td> 
	  		<td></td>
	  	<tr/>
	  </table>
	  <alert ng-repeat="alert in alerts" type="alert.type" close="closeAlertEditarCliente($index)">{{alert.msg}}</alert>
	  <table>	  	  			  		  
		<tr>
			<td>
			</td>
			<td>  	  	
	  	  		<button class="btn btn-primary" ng-click="actualizarCliente(cliente)">Guardar</button>  	  		  	  		   
  			</td>
  			<td><button class="btn btn-warning" ng-click="cancelClienteForm()">Cancelar</button></td>
	  		<td><span class="mensajeError" ng-show="editarclienteform.$invalid">{{mensajeError}}</span></td>
  		</tr>
  		</table>   
	</form>
</div>    
    