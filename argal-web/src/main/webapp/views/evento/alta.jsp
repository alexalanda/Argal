<table heigth="50px" border="0">
	<tr>
		<td width="1200" height="23" align="center" ><img src="static/img/regevento.jpg" height="30" width="30"/> REGISTRAR EVENTO (registrado por: {{nombreLogin}})
	    <hr color="#6688a6" /></td>
	</tr>
</table>
<div ng-controller="AltaEventoController" align="center">
	<table border="1">
	<tr>
		<td bgcolor="#6688a6"><span style="color: #ffffff;">1) DATOS GENERALES DEL INGRESO</span></td>			
	</tr>
	<tr>
		<td>
  			<table border=0>
				<tr>		
					<td width="120">HOSPITAL: </td>
					<td width="170">
						<div ng-controller="HospitalController" style="float:left;" > 
							<input type="text" ng-model="hospitalSeleccionadoTxt" ng-click="openShowHosp('','views/hospital/gridhosp.jsp')" style="width: 120px;cursor: pointer;"/>
						</div>
						<div ng-controller="HospitalController" style="float:left;"><img  style="cursor: pointer;" src="static/img/buscar.jpg" height="25" width="25" ng-click="openShowHosp('','views/hospital/gridhosp.jsp')"></div>
						
					</td>
					<td width="131">ID HOSPITALARIO:</td> 
					<td width="187"><input type="text" ng-model="evento.folioHospitalario" /></td>
					<td>FOLIO ARGAL:</td>
					<td><input type="text" ng-model="evento.folioArgal" /></td>
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
				   		<input style="float:left;" type="text" class="form-control" size=15 datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />			
				   		<button style="float:left;" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>				            				    		
		  			</td>		  	
		  			<td width="112">HORA INGRESO:</td> 
					<td width>
						<input type="time" id="exampleInput" name="input" ng-model="valueTime" placeholder="HH:mm" min="08:00" max="17:00" style="width: 100px"/>
        			</td>					
		  		</tr>		  
			</table>
		</td>
	</tr>		
	</table>		                             	
	<div  id="tipoSeguroPersonalDIV" style="display:none">
	<table border="0">
		<tr>
			<td bgcolor="#6688a6"><span style="color: #ffffff;">2) DATOS DEL PACIENTE (BANCO)</span></td>
		</tr>
		<tr>
			<td>
				<span style="color: #6688a6;">DATOS DEL TITULAR</span>		
				<table border=1><tr><td>				
				<table border=0> 
					<tr>
						<td>NO. NOMINA:</td>
						<td><input type="text" ng-model="evento.registroSeguroPersonal.numeroNomina" size="30"/></td>	  	
						<td>INSTITUCION:</td> 
						<td><input type="text" ng-model="evento.registroSeguroPersonal.institucion" size="30"/></td>
						<td>NO. AUTORIZACIÓN:</td>
						<td><input type="email" ng-model="evento.registroSeguroPersonal.numeroAutorizacion" size="30"/></td>	  							
					</tr>
					<tr>
						<td>JUBILADO:</td>
						<td><select style="width: 120px" ng-model="censoSelected" ng-options="censo.nombre for censo in censos">
								<option value="">Seleccione...</option>
							</select>
						</td>
						<td>CENSO:</td>
						<td><select style="width: 120px" ng-model="censoSelected" ng-options="censo.nombre for censo in censos">
								<option value="">Seleccione...</option>
							</select>
						</td>
						<td></td>
					</tr>
				</table>
				<table border=0>
					<tr>
						<td>NOMBRE:</td>
						<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.nombreTitular" /></td>
						<td>APELLIDO PATERNO:</td>
						<td width="250px"><input  type="text" ng-model="evento.registroSeguroPersonal.appTitular" /></td> 
						<td>APELLIDO MATERNO:</td>
						<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.apmTitular" /></td>
					</tr>			
				</table>
				</td></tr></table>
				
				<span style="color: #6688a6;">DATOS DEL PACIENTE</span>		
				<table border=1>
					<tr>
						<td>				
							<table ng-show="listaTipoEventoSelected.idTipoEvento!=4" width="1180" border=0>
								<tr>
									<td>NOMBRE:</td>
									<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.nombrePaciente" /></td>
									<td >APELLIDO PATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.appPaciente" /></td> 
									<td>APELLIDO MATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.apmPaciente" /></td>
								</tr>						
							</table>
							<table ng-show="listaTipoEventoSelected.idTipoEvento!=4" width="1180" border=0>
								<tr>
									<td>EDAD:</td><td><input type="text" ng-model="evento.registroSeguroPersonal.edadPaciente" style="width: 80px" />
									</td>
									<td>UNIDAD:
										<select style="width: 100px" ng-model="unidadEdadPacienteSegPersonalSelected" ng-options="unidad.descripcion for unidad in unidadesedades">
											<option value="">Seleccione...</option>
										</select>							  			
									</td>												
									<td>SEXO:
										<select style="width: 150px" ng-model="sexoPacienteSegPersonalSelected" ng-options="unidad.descripcion for unidad in sexodatoscombo">
											<option value="">Seleccione...</option>
										</select>
									</td>
									<td>PARENTESCO
										<select style="width: 200px" ng-model="parentescoPacienteSegPersonalSelected" ng-options="unidad.descripcion for unidad in parentescos">
											<option value="">Seleccione...</option>
										</select>								  				
									</td>
								</tr>  			
							</table>
							<table ng-show="listaTipoEventoSelected.idTipoEvento==4" width="1180" border=0>
								<tr>
									<td>NOMBRE RECIEN NACIDO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.nombrePaciente" /></td>
									<td>APELLIDO PATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.appPaciente" /></td> 
									<td>APELLIDO MATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroSeguroPersonal.apmPaciente" /></td>
									<td></td>
								</tr>						
							</table>
							<table ng-show="listaTipoEventoSelected.idTipoEvento==4" width="1180" border=1>
								<tr>
									<td>FECHA NACIMIENTO:</td>
									<td>
										<input style="float:left;" type="text" class="form-control" size=15 datepicker-popup="{{format}}" ng-model="dt2" is-open="opened" min="minDate" max="'2035-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />			
								   		<button style="float:left;" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
									</td>			
									<td>HORA NACIMIENTO:</td>
									<td>
										<input type="time" id="exampleInput" name="input" ng-model="valueTime2" placeholder="HH:mm" min="08:00" max="17:00" style="width: 100px"/>									  			
									</td>							
									<td>TIPO PARTO:</td>
									<td>
										<select style="width: 150px" ng-model="tipoPartoSelected" ng-options="tipoparto.descripcion for tipoparto in tiposparto">
											<option value="">Seleccione...</option>
										</select>
									</td>
									<td>TALLA:<input type="text" ng-model="evento.registroSeguroPersonal.nacimientoTalla" /></td>																		
								</tr>
								<tr ng-show="listaTipoEventoSelected.idTipoEvento==4">
									<td>PESO:</td>
									<td><input type="text" ng-model="evento.registroSeguroPersonal.nacimientoPeso" /></td>
									<td>APGAR:</td>
									<td><input type="text" ng-model="evento.registroSeguroPersonal.nacimientoApgar" /></td>												
									<td>SILVERMAN:</td>
									<td><input type="text" ng-model="evento.registroSeguroPersonal.nacimientoSilverman" /></td>
									<td>MÉDICO:
										<div style="float:left;">
											<select  ng-model="listaMedTrat2" ng-options="medtrat.nombre for medtrat in medictratantes">	 
					 							<option value="">Seleccione...</option>
					 						</select>
				 						</div>			
									</td>
								</tr>  			
							</table>								
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
				<span style="color: #6688a6;">DATOS DEL TITULAR</span>		
				<table border=1>
					<tr>
						<td>							
							<table  border=0> 
								<tr>
									<td width="100px">NO.POLIZA:</td>
									<td width="150px"><input type="text" ng-model="evento.registroGastosMayores.numeroPoliza"/></td>	  	
									<td width="100px">DEDUCIBLE:</td> 			
									<td><input type="text" ng-model="evento.registroGastosMayores.deducible" /></td>
									<td>COASEGURO MEDICO/HOSPITALARIO:</td>
									<td><input type="text" ng-model="evento.registroGastosMayores.coaseguroMedico" /></td>	  						
								</tr>
								<tr>						
									<td>SUMA ASEGURADA:</td>
									<td><input type="text" ng-model="evento.registroGastosMayores.sumaAsegurada"/></td>
									<td>MONTO DE CARTA DE AUTORIZACIÓN INICIAL:</td>
									<td><input type="text" ng-model="evento.registroGastosMayores.montoCartaAutInicial" /></td>	  	
									<td>TABULACIÓN DE HONORARIOS MÉDICOS:</td>
									<td><input type="text" ng-model="evento.registroGastosMayores.tablaHonorariosMedicos" size="30"/></td>
								</tr>
							</table>
				
							<table>
								<tr>
									<td>NOMBRE:</td>
									<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.nombreTitular" /></td>
									<td >APELLIDO PATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.appTitular" /></td>   				
									<td>APELLIDO MATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.apmTitular" /></td>  				
								</tr>					
							</table>
				 		</td>
				 	</tr>
				</table>
				<span style="color: #6688a6;">DATOS DEL PACIENTE</span>	
														
				<table border=1>
					<tr>
						<td>							
							<table ng-show="listaTipoEventoSelected.idTipoEvento!=4" width="1180" border=0>				
								<tr>
									<td>NOMBRE:</td>
									<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.nombrePaciente" size="20"></td>
									<td>APELLIDO PATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.appPaciente" /></td> 					
									<td>APELLIDO MATERNO:</td>
									<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.apmPaciente" /></td>
								</tr>
							</table>
							<table ng-show="listaTipoEventoSelected.idTipoEvento!=4" width="1180" border=0>
								<tr>
									<td>EDAD:</td><td>
										<input type="text" ng-model="evento.registroGastosMayores.edadPaciente" style="width: 80px"/>
										</td>
									<td>UNIDAD:
										<select ng-model="unidadEdadPacienteGastosMayoresSelected" ng-options="unidad.descripcion for unidad in unidadesedades" style="width: 100px">
											<option value="">Seleccione...</option>
										</select>							  			
									</td>												
									<td>SEXO:
									<select ng-model="sexoPacienteGastosMayoresSelected" ng-options="unidad.descripcion for unidad in sexodatoscombo" style="width: 150px">
										<option value="">Seleccione...</option>
									</select></td>
									<td>PARENTESCO
									<select ng-model="parentescoPacienteGastosMayoresSelected" ng-options="unidad.descripcion for unidad in parentescos" style="width: 200px">
										<option value="">Seleccione...</option>
									</select>
									<!-- evento.registroSeguroPersonal.unidadEdadPaciente -->  				
									</td>
								</tr>  			
							</table>
							<table ng-show="listaTipoEventoSelected.idTipoEvento==4" width="1180" border=0>
					<tr>
						<td>NOMBRE RECIEN NACIDO:</td>
						<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.nombrePaciente" /></td>
						<td>APELLIDO PATERNO:</td>
						<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.appPaciente" /></td> 
						<td>APELLIDO MATERNO:</td>
						<td width="250px"><input type="text" ng-model="evento.registroGastosMayores.apmPaciente" /></td>
						<td></td>
					</tr>						
				</table>
				<table ng-show="listaTipoEventoSelected.idTipoEvento==4" width="1180">
					<tr>
						<td>FECHA NACIMIENTO:</td>
						<td>
							<input style="float:left;" type="text" class="form-control" size=15 datepicker-popup="{{format}}" ng-model="dt2" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />			
							<button style="float:left;" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
						</td>			
						<td>HORA NACIMIENTO:</td>
						<td>
							<input type="time" id="exampleInput" name="input" ng-model="valueTime2" placeholder="HH:mm" min="08:00" max="17:00" style="width: 100px"/>									  			
						</td>							
						<td>TIPO PARTO:</td>
						<td>
							<select style="width: 150px" ng-model="tipoPartoSelected2" ng-options="tipoparto.descripcion for tipoparto in tiposparto">
								<option value="">Seleccione...</option>
							</select>
						</td>
						<td>TALLA:<input type="text" ng-model="evento.registroGastosMayores.nacimientoTalla" /></td>																		
					</tr>
					<tr ng-show="listaTipoEventoSelected.idTipoEvento==4">
						<td>PESO:</td>
						<td><input type="text" ng-model="evento.registroGastosMayores.nacimientoPeso" /></td>
						<td>APGAR:</td>
						<td><input type="text" ng-model="evento.registroGastosMayores.nacimientoApgar" /></td>												
						<td>SILVERMAN:</td>
						<td><input type="text" ng-model="evento.registroGastosMayores.nacimientoSilverman" /></td>
						<td>MÉDICO:
							<div style="float:left;">
								<select  ng-model="listaMedTrat3" ng-options="medtrat.nombre for medtrat in medictratantes">	 
									<option value="">Seleccione...</option>
								</select>
				 			</div>			
						</td>
					</tr>  			
				</table>		
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
					<td width="131">NÚMERO HABITACION:</td> 
					<td width="187"><input type="text" ng-model="evento.numHabitacion" /></td>
					<td>ANTECEDENTES PATOLÓGICOS (SOLO APLICA GASTOS MÉDICOS MAYORES):</td>
					<td><select ng-model="antecedenteSelected" ng-options="antecedente.nombre for antecedente in antecedentes"> 	  	  			 
					 		<option value="">Seleccione...</option></select>				 		
					</td>
							  		<td ng-show="idtipoSeguroSel!=1">
						MÉDICO DICTAMINADOR:
					</td>
					<td ng-show="idtipoSeguroSel!=1">
						<select style="width: 200px" ng-model="medDictaminadorSelected" ng-options="meddictaminador.nombreImplant + ' ' + meddictaminador.appImplant + ' ' + meddictaminador.apmImplant for meddictaminador in medicosdictaminadores">
							<option value="">Seleccione...</option>
						</select>
					</td>
				</tr>		  		  	  	  
				<tr>															
			  		<td>DIAGNOSTICO DE INGRESO1:</td>
					<td>
						<div style="float:left;" ng-controller="Cat_ICD_Controller" >  
							<input type="text" ng-model="tipoIcd1" ng-click="openAddIcd2('','views/cat_icd/cat_icd.jsp',1)" style="width: 180px;cursor: pointer;"/>
						</div>
				  	</td>
					<td>
						<div style="float:left;" ng-controller="Cat_ICD_Controller" >  
							<img  style="cursor: pointer;" src="static/img/buscar.jpg" height="25" width="25" ng-click="openAddIcd2('','views/cat_icd/cat_icd.jsp',1)">			
						</div>
					</td>
					<td>DIAGNOSTICO DE INGRESO2:</td>		  	  
				  	<td>
				  		<div style="float:left;" ng-controller="Cat_ICD_Controller" >  
							<input type="text" ng-model="tipoIcd2" ng-click="openAddIcd2('','views/cat_icd/cat_icd.jsp',2)" style="width: 180px;cursor: pointer;"/>
						</div>
					</td>
					<td>
				  		<div style="float:left;" ng-controller="Cat_ICD_Controller" >  
							<img  style="cursor: pointer;" src="static/img/buscar.jpg" height="25" width="25" ng-click="openAddIcd2('','views/cat_icd/cat_icd.jsp',2)">			
						</div>
					</td>		  	
					
				</tr>
			  	<tr>			
					<td>MEDICO TRATANTE:</td>  
					<td>
						<div style="float:left;">
							<select  ng-model="listaMedTrat" ng-options="medtrat.nombre for medtrat in medictratantes" ng-change="updateMedTrat()" > 	  	  			 
					 			<option value="">Seleccione...</option>
					 		</select>
				 		</div>
				 	</td><td>
				 		<div style="float:left;">
				 		<img  style="cursor: pointer" src="static/img/nuevomedico.jpg" height="25" width="23" ng-click="openAltaMedicoTratante('','views/evento/altamedtrat.jsp')">								
				 		</div>
				 	</td>		  	  				  		
					<td>ESPECIALIDAD:{{especialidadMedTratSel}} </td>  								
																									
			  		<td>TIPO MÉDICO:{{tipoMedTratSel}}						
						<!-- input type="checkbox" ng-model="evento.red" / -->
					</td>
			  	</tr>
			</table>
			
		</td></tr>
	</table>	   		
	<button class="btn btn-default" ng-click="guardarEvento(evento)" >Guardar Evento</button>  		
	<span class="mensajeError" ng-show="altaeventoform.$invalid">{{mensajeError}}</span>  	 	  	    	  				  	   
</div>    
    