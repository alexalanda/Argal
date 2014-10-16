<link rel="stylesheet" href="static/css/bootstrap.min.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
		<td bgcolor="#6688a6" width="1180" height="23" align="center" ><img src="static/img/icdlist.png" height="30" width="30"/> <span style="color:white"> NUEVO MEDICO TRATANTE</span>
	   </td>
	    </tr><tr><td></td>
	</tr>
</table>

<div ng-controller="AltaMedicoTratanteController">
	<form  name="altamedtratform" class="css-form">
	<table>
			<tr>		
				<td>NOMBRE:</td> 
				<td><input type="text" ng-model="nombreMT" /></td>
				<td>APELLIDO PATERNO:</td>
				<td><input type="text" ng-model="appMT" size="30" />					 				  	 
				<td>APELLIDO MATERNO:</td>
				<td><input type="text" ng-model="apmMT" size="30" />
			<tr/>
			<tr>	
				<td>TIPO MÉDICO:</td>
				<td><select ng-model="tipoMTSelected" ng-options="tipoMT.descripcion for tipoMT in tiposMT"> 	  	  			 
							<option value="">Seleccione...</option>
						</select>	 	
				</td>		
			
				<td>  	  	
  	  			<button ng-click="guardarMedicoTratante()" >Guardar</button>
  				</td>
  				<td></td>
	  			<td><span class="mensajeError" ng-show="altamedtratform.$invalid">{{mensajeError}}</span>
	  			</td>
  			</tr>
  		</table>   
	</form>                             

<table width="728" border="1">
  <tr>
    <td width="290">CARDIOLOGIA</td>
    <td width="40"><input type="checkbox" ng-model="especialidad1"/></td>
    <td width="244">INMUNOLOGIA</td>
    <td width="38"><input type="checkbox" ng-model="especialidad2"/></td>
    <td width="38">PEDIATRIA</td>
    <td width="38"><input type="checkbox" ng-model="especialidad3"/></td>
  </tr>
  <tr>
    <td>CIRUGIA VASCULAR PERIFERICA</td>
    <td><input type="checkbox" ng-model="especialidad4"/></td>
    <td>MAXILOFACIAL</td>
    <td><input type="checkbox" ng-model="especialidad5"/></td>
    <td>PSIQUIATRIA</td>
    <td><input type="checkbox" ng-model="especialidad6"/></td>
  </tr>
  <tr>
    <td>ENDOCRINOLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad7"/></td>
    <td>NEFROLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad8"/></td>
    <td>REUMATOLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad9"/></td>
  </tr>
  <tr>
    <td>GASTROENTEROLOGIA MEDICA</td>
    <td><input type="checkbox" ng-model="especialidad10"/></td>
    <td>NEUMOLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad11"/></td>
    <td>TOXICOLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad12"/></td>
  </tr>
  <tr>
    <td>GASTROENTEROLOGIA QUIRURGICA</td>
    <td><input type="checkbox" ng-model="especialidad13"/></td>
    <td>NEUROLOGIA MEDICA</td>
    <td><input type="checkbox" ng-model="especialidad14"/></td>
    <td>TRAUMATOLOGIA Y ORTOPEDIA</td>
    <td><input type="checkbox" ng-model="especialidad15"/></td>
  </tr>
  <tr>
    <td>GENETICA</td>
    <td><input type="checkbox" ng-model="especialidad16"/></td>
    <td>NEUROLOGIA QUIRURGICA</td>
    <td><input type="checkbox" ng-model="especialidad17"/></td>
    <td>UROLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad18"/></td>
  </tr>
  <tr>
    <td>GINECOLOGIA Y OBSTETRICIA</td>
    <td><input type="checkbox" ng-model="especialidad19"/></td>
    <td>ONCOLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad20"/></td>
    <td>VARIOS</td>
    <td><input type="checkbox" ng-model="especialidad21"/></td>
  </tr>
  <tr>
    <td>HEMATOLOGIA</td>
    <td><input type="checkbox" ng-model="especialidad22"/></td>
    <td>OTORRINOLARINGOLOTGIA</td>
    <td><input type="checkbox" ng-model="especialidad23"/></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<p>&nbsp;</p>
</div>