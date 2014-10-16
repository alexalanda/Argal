<br>
<center>
  <h5>EDITAR DATOS DEL EVENTO</h5>
</center> 

<div style="overflow: scroll; height:600px;  visibility:visible z-index:1" ng-controller="EditarEventoController" align="center">
	<table border="1">
	<tr>
		<td bgcolor="#6688a6"><span style="color: #ffffff;">1) DATOS GENERALES DEL INGRESO</span></td>				
	</tr>
	<tr>
		<td>
  			<table>
				<tr>		
					<td width="112">ARGAL IMPLANT:</td> 
					<td width="129">{{eventoEditSelected.implant.nombreImplant}} {{eventoEditSelected.implant.appImplant}}</td>
					<td width="120">HOSPITAL: </td>
					<td width="170">
						<div ng-controller="MainCtrl" >{{eventoEditSelected.hospital.nombreHospital}}
						<button ng-click="launchSimpleModal('showgridhosp','Seleccione un Hospital','views/hospital/gridhosp.jsp')">Otro...</button></div>
					</td>
					<td width="87">CLIENTE:</td> 
			  		<td width="145">
			  			<select ng-model="listaClienteSelected" ng-options="cliente.razonSocialCliente for cliente in clientes"> 	  	  			 
							<option value="">Seleccione...</option>
						</select>	 					 		
			  		</td>
				</tr>		  		  	  	  
				<tr>
					<td>TIPO DE CLIENTE:</td> 
		  			<td><select  ng-model="listaTipoClienteSelected" ng-options="tiposeguro.descripcion for tiposeguro in tiposseguro"  
			  			ng-change="showTipoSeguroView()">
							<option value="">Seleccione...</option>
						</select>
					</td>	  	
		  			<td>TIPO DE EVENTO:</td>  
		  			<td><select ng-model="listaTipoEventoSelected" ng-options="tipoevento.descripcion for tipoevento in tiposevento">
						<option value="">Seleccione...</option></select>
					</td>
					<td>FECHA INGRESO:</td> 
					<td>
				   		<input type="text" class="form-control" size=20 datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />			
				   		<button class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>				            				    		
		  			</td>		  	
		  		</tr>		  
			</table>
		</td>
	</tr>		
	</table>		                             	
	<div  id="tipoSeguroPersonalDIV" style="display:none">
	<table border="1">
		<tr>
			<td bgcolor="#6688a6"><span style="color: #ffffff;">2) DATOS DEL PACIENTE (BANCO)</span></td>
		</tr>
		<tr>
			<td>
				<table border=0> 
					<tr>
						<td>NO. NOMINA:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.numeroNomina" size="30"/></td>	  	
						<td>INSTITUCION:</td> 
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.institucion" size="30"/></td>
						<td>NO. AUTORIZACI�N:</td>
						<td><input type="email" ng-model="eventoEditSelected.registroSeguroPersonal.numeroAutorizacion" size="30"/></td>	  							
					</tr>
				</table>
				DATOS DEL TITULAR
				<table border=0>
					<tr>
						<td>NOMBRE:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.nombreTitular" /></td>
						<td>APELLIDO PATERNO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.appTitular" /></td> 
						<td>APELLIDO MATERNO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.apmTitular" /></td>
					</tr>
					<tr>
						<td>JUBILADO:</td>
						<td><select ng-model="censoSelected" ng-options="censo.nombre for censo in censos">
								<option value="">Seleccione...</option>
							</select>
						</td>
						<td>CENSO:</td>
						<td><select ng-model="censoSelected" ng-options="censo.nombre for censo in censos">
								<option value="">Seleccione...</option>
							</select>
						</td>
						<td></td>
						<td>
						</td> 
						
					</tr>
				</table>
				DATOS DEL PACIENTE
				<table border=0>
					<tr>
						<td>NOMBRE:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.nombrePaciente" /></td>
						<td>APELLIDO PATERNO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.appPaciente" /></td> 
						<td>APELLIDO MATERNO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.apmPaciente" /></td>
					</tr>						
					</table>
					<table width="787">
					<tr>
						<td width="88">EDAD:<input type="text" ng-model="eventoEditSelected.registroSeguroPersonal.edadPaciente" size="5"/>
						</td>
						<td width="235">UNIDAD:
							<select ng-model="unidadEdadPacienteSegPersonalSelected" ng-options="unidad.descripcion for unidad in unidadesedades">
								<option value="">Seleccione...</option>
							</select>							  			
						</td>												
						<td width="182">SEXO:
						<select ng-model="sexoPacienteSegPersonalSelected" ng-options="unidad.descripcion for unidad in sexodatoscombo">
							<option value="">Seleccione...</option>
						</select></td>
						<td width="262">PARENTESCO
						<select ng-model="parentescoPacienteSegPersonalSelected" ng-options="unidad.descripcion for unidad in parentescos">
							<option value="">Seleccione...</option>
						</select>
						<!-- evento.registroSeguroPersonal.unidadEdadPaciente -->  				
						</td>
					</tr>  			
				</table>		
			</td>
		</tr>
	</table>	
	</div>

	<div id="tipoSeguroGastosMayoresDIV" style="display:none">
	<table border="1">
		<tr>
			<td bgcolor="#6688a6"><span style="color: #ffffff;">2) DATOS DEL PACIENTE (ASEGURADORA)</span></td>
		</tr>
		<tr>
			<td>
				<table> 
					<tr>
						<td>NO.POLIZA:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.numeroPoliza" size="30"/></td>	  	
						<td>DEDUCIBLE:</td> 			
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.deducible" size="30"/></td>
					</tr>
					<tr>
						<td>COASEGURO MEDICO/HOSPITALARIO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.coaseguroMedico" size="30"/></td>	  	
						<td>SUMA ASEGURADA:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.sumaAsegurada" size="30"/></td>
					</tr>
					<tr>
						<td>MONTO DE CARTA DE AUTORIZACI�N INICIAL:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.montoCartaAutInicial" size="30"/></td>	  	
						<td>TABULACI�N DE HONORARIOS M�DICOS:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.tablaHonorariosMedicos" size="30"/></td>
					</tr>
				</table>
				DATOS DEL TITULAR
				<table>
					<tr>
						<td>NOMBRE:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.nombreTitular" /></td>
						<td>APELLIDO PATERNO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.appTitular" /></td>   				
						<td>APELLIDO MATERNO:</td>
						<td><input type="text" ng-model="eventoEditSelected.registroGastosMayores.apmTitular" /></td>  				
					</tr>					
				</table>
				DATOS DEL PACIENTE
				<table>				
					<tr>
						<td width="202">NOMBRE:
						<input type="text" ng-model="eventoEditSelected.registroGastosMayores.nombrePaciente" size="20"></td>
						<td width="146">APELLIDO PATERNO:</td>
						<td width="163"><input type="text" ng-model="eventoEditSelected.registroGastosMayores.appPaciente" /></td> 					
						<td width="111">APELLIDO MATERNO:</td>
						<td width="145"><input type="text" ng-model="eventoEditSelected.registroGastosMayores.apmPaciente" /></td>
					</tr>
				</table>
				<table width="787">
					<tr>
						<td width="88">EDAD:<input type="text" ng-model="eventoEditSelected.registroGastosMayores.edadPaciente" size="5"/>
						</td>
						<td width="235">UNIDAD:
							<select ng-model="unidadEdadPacienteGastosMayoresSelected" ng-options="unidad.descripcion for unidad in unidadesedades">
								<option value="">Seleccione...</option>
							</select>							  			
						</td>												
						<td width="182">SEXO:
						<select ng-model="sexoPacienteGastosMayoresSelected" ng-options="unidad.descripcion for unidad in sexodatoscombo">
							<option value="">Seleccione...</option>
						</select></td>
						<td width="262">PARENTESCO
						<select ng-model="parentescoPacienteGastosMayoresSelected" ng-options="unidad.descripcion for unidad in parentescos">
							<option value="">Seleccione...</option>
						</select>
						<!-- evento.registroSeguroPersonal.unidadEdadPaciente -->  				
						</td>
					</tr>  			
				</table>	
			</td>
		</tr>
	</table>	
	</div>	 	
	<table border="1">
		<tr>
			<td bgcolor="#6688a6"><span style="color: #ffffff;">3) DATOS DE INGRESO HOSPITALARIO </span></td>				
		</tr> 			
		<tr>
			<td>
				<table border=0>
				<tr>		
					<td width="131">FOLIO HOSPITALARIO:</td> 
					<td width="187"><input type="text" ng-model="evento.folioHospital" /></td>
					<td>FOLIO ARGAL:</td>
					<td><input type="text" ng-model="eventoEditSelected.folioArgal" /></td>					
				</tr>		  		  	  	
				<tr>		
					<td width="131">NUMERO HABITACION:</td> 
					<td width="187"><input type="text" ng-model="eventoEditSelected.numHabitacion" /></td>
					<td>ANTECEDENTES:</td>
					<td><select ng-model="antecedenteSel" ng-options="antecedente.descripcion for antecedente in antecedentes"> 	  	  			 
					 		<option value="">Seleccione</option>
					 	</select>				 		
					</td>					
				</tr>		  		  	  	  
				<tr>					
			  		<td>DIAGNOSTICO DE INGRESO1:</td>
					<td>
						{{tipoTratamientoSel}}  
						<button class="btn btn-default" ng-click="openAddIcd('','views/cat_icd/cat_icd.jsp')">Agregar</button>
					</td>
					<td>DIAGNOSTICO DE INGRESO2:</td>		  	  
				  	<td>
						{{tipoTratamientoSel}}<button class="btn btn-default" ng-click="openAddIcd('','views/cat_icd/cat_icd.jsp')">Agregar</button>				
					</td>
				</tr>
				<tr>	  	
					<td>MEDICO TRATANTE:</td>  
					<td><select ng-model="listaMedTrat" ng-options="medtrat.nombre for medtrat in medictratantes" ng-change="updateMedTrat()"> 	  	  			 
				 			<option value="">Seleccione...</option>
				 		</select>
				 		<button class="btn btn-default" ng-click="openAltaMedicoTratante('','views/evento/altamedtrat.jsp')">Nuevo</button>
				 	</td>		  	  				  		
					<td>ESPECIALIDAD:{{especialidadMedTratanteEdit.descripcion}}</td>  								
					<td>�ES DE LA RED?:
						<input type="checkbox" ng-model="eventoEditSelected.red" />
					</td>															
			  	</tr>
			</table>
		</td></tr>
	</table>	   		
	<button class="btn btn-default" ng-click="guardarEventoEditar(eventoEditSelected)" >Guardar Evento</button>  		
	<span class="mensajeError" ng-show="altaeventoform.$invalid">{{mensajeError}}</span>  	 	  	    	  				  	   
</div>    
    