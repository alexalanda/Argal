<table width="1000"  border=2>
	<tr>
		<td style="width: 1000px" align="center" bgcolor="#6688a6"><h5><span style="color: #ffffff;">CONTROL DE GASTOS</span></td></h5>		
	</tr>
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
				<span style="color: #6688a6;">FECHA INGRESO:</span>{{eventoEditSelected.fechaIngreso | date:dateFormat}}
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
<table width="1000"  border=1>
	<tr>
		<td ng-show="eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">TIPO DE CLIENTE:</span>BANCO			    										   
		</td>
		<td ng-show="!eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">TIPO DE CLIENTE:</span>ASEGURADORA			    										   
		</td>
		<td ng-show="eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">INSTITUCIÓN:</span>{{eventoEditSelected.registroSeguroPersonal.institucion}}			    										   
		</td>
		<td ng-show="!eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">SUMA ASEGURADA:</span>{{eventoEditSelected.registroGastosMayores.sumaAsegurada}}			    										   
		</td>
		<td ng-show="eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">NO. AUTORIZACIÓN:</span>{{eventoEditSelected.registroSeguroPersonal.numAutorizacion}}			    										   
		</td>
		<td ng-show="!eventoEditSelected.registroSeguroPersonal">
			<span style="color: #6688a6;">MONTO DE CARTA DE AUTORIZACIÓN INICIAL:</span>{{eventoEditSelected.registroGastosMayores.montoCartaAutInicial}}			    										   
		</td>			
	</tr>
	<tr>
		<td>
			<span style="color: #6688a6;">TOTAL ESTADO DE CUENTA: $</span>{{subTotalTipoGastoResumen1}}			    					    										  
		</td>
		<td>
			<span style="color: #6688a6;">TOTAL DESVÍOS: $</span>{{subTotalTipoGastoResumen2}}		    										   
		</td>
		<td>
			<span style="color: #6688a6;">TOTAL GASTOS RELEVANTES: $</span>{{subTotalTipoGastoResumen3}}			    										   
		</td>			  	
	</tr>	
</table>
TipoUsuario
{{tipoUsuarioLogin}}
<div align="right" ng-show="tipoUsuarioLogin!=2"><button class="btn btn-default" ng-click="showAltaCedulaControlForm()">REGISTRAR GASTO</button></div>
<table width="900"  border=0>
	<tr>
		<td>
			<div ng-controller="CedulaControlController" id="divAltaCedulaControlController" style="display:none">		
				<form  name="altaCedulaControlControllerForm" class="css-form">
				<center><h4>REGISTRO DE GASTOS</h4></center>
				<table width="882" >
					<tr>				
						<td><span style="color: #6688a6;">TIPO DE CARGO:</span></td>
						<td><select ng-model="regtipocargoselected" ng-options="tipoCargo.descripcion for tipoCargo in tiposcargos"> 	  	  			 
							<option value="">Seleccione...</option></select>	 					 				  	  	
						</td>
						<td ng-show="regtipocargoselected.idTipoCargo==1"><span style="color: #6688a6;">TIPO ESTADO DE CUENTA:</span></td>					
						<td ng-show="regtipocargoselected.idTipoCargo==1"><select ng-model="tiposcargoedocuentaselected" ng-options="tipocargoedocuenta.descripcion for tipocargoedocuenta in tiposcargoedocuenta" > 	  	  			 
								<option value="">Seleccione...</option>
								</select>
						</td>	
						<td ng-show="regtipocargoselected.idTipoCargo==2 || regtipocargoselected.idTipoCargo==3"><span style="color: #6688a6;">AREA:</span></td>
						<td ng-show="regtipocargoselected.idTipoCargo==2 || regtipocargoselected.idTipoCargo==3" width="215">
							<select ng-model="regtipoareaselected" ng-options="tipoarea.descripcion for tipoarea in areascargos" > 	  	  			 
				 					<option value="">Seleccione...</option>
				 			</select>	 					 		
			  			</td>
			  			<td ng-show="regtipocargoselected.idTipoCargo==2"><span style="color: #6688a6;">RUBRO:</span></td>
			   			<td width="215" ng-show="regtipocargoselected.idTipoCargo==2">
			   				<select ng-model="regtiporubroselected" ng-options="tiporubro.descripcion for tiporubro in rubroscargos" > 	  	  			 
				 				<option value="">Seleccione...</option>
				 			</select>	 					 		
			  			</td>	
			  		</tr>
			  		<tr>		  		
						<td ng-show="regtipocargoselected.idTipoCargo==2"><span style="color: #6688a6;">CAUSA:</span></td>
						<td ng-show="regtipocargoselected.idTipoCargo==2">
							<select ng-model="regrazonesAltaGastoImproSelected" ng-options="razonesGastoImpro.descripcion for razonesGastoImpro in causascargos"> 	  	  			 
					 			<option value="">Seleccione...</option>
					 		</select>	 					 		
			  			</td>			  	  	 
						<td><span style="color: #6688a6;">FECHA:</span></td>
						<td>
				       		<input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />
				       		<span class="input-group-btn">
				       		<button class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
					       	</span>				    
						</td>				
						<td ng-show="regtipocargoselected.idTipoCargo==2"><span style="color: #6688a6;">PRODUCTO:</span></td>
		  	  			<td ng-show="regtipocargoselected.idTipoCargo==2"><input type="text" ng-model="cargo.nombre" size="30" /></td>
		  	  		</tr>
		  	  		<tr>
						<td ng-show="regtipocargoselected.idTipoCargo==2"><span style="color: #6688a6;">MONTO UNITARIO:</span></td>
						<td ng-show="regtipocargoselected.idTipoCargo==1 || regtipocargoselected.idTipoCargo==3"><span style="color: #6688a6;">MONTO:</span></td>					
		  	  			<td ng-show="regtipocargoselected.idTipoCargo>=1"><input type="text" ng-model="cargo.montoUnitario" size="30" /></td>	  				
		  	  			<td ng-show="regtipocargoselected.idTipoCargo==2"><span style="color: #6688a6;">CANTIDAD:</span></td>
		  	  			<td ng-show="regtipocargoselected.idTipoCargo==2"><input type="text" ng-model="cargo.cantidad" size="30" /></td>
		  	  			<td><span style="color: #6688a6;">EVIDENCIA:</span></td>
		  	  			<td><input type="file" ng-model="cargo.rutaEvidencia" size="30" /></td>
		  			<tr/>
			  		<tr>
		  				<td></td>
		  				<td></td>
						<td>
							<button class="btn btn-default" ng-click="guardarGasto()">Guardar</button>
						</td>					
						<td></td>
						<td>
							<button class="btn btn-default" ng-click="hideAltaCedulaControlForm()">Cancelar</button>
						</td>
						<td></td>
					</tr>
	  			</table>
				</form>
			</div>			
			
			<div id="divTableCedulaControl" ng-controller="CedulaControlController">	   						
				<table width="882"  border=0>			
			   		<tr>	    			
		    			<td style="width: 100px"><h5>FILTRAR POR:</h5></td>
			    		<td width=350><span style="color: #6688a6;">TIPO DE CARGO:</span>		   			
			   				<select style="width: 200px" ng-model="tipocargoselected" ng-options="tipocargo.descripcion for tipocargo in tiposcargos" ng-change="addSubtotales()">	  	  			 
			 					<option value="">Seleccione...</option>
			 				</select>	 					 		
			  			</td>			  		
			  			<!-- td ng-show="tipocargoselected.idTipoCargo==1"><span style="color: #6688a6;">TIPO ESTADO DE CUENTA:</span>			   		
			   			<select style="width: 200px" ng-model="tipoareaedocuentaselected" ng-options="tipoareaedocuenta.descripcion for tipoareaedocuenta in areascargosEdoCuenta"  ng-change="addWorkspace()">	 	  	  			 
				 				<option value="">Seleccione...</option>
				 		</select>
			  			</td> -->		
			  			<td ng-show="tipocargoselected.idTipoCargo>=2"><span style="color: #6688a6;">AREA:</span>			   		
				   			<select style="width: 200px" ng-model="tipoareaselected" ng-options="tipoarea.descripcion for tipoarea in areascargos"  ng-change="addWorkspace()">	 	  	  			 
				 				<option value="">Seleccione...</option>
				 			</select>
			  			</td>				  		
						<td>
							<div ng-show="tipocargoselected.idTipoCargo==1">
								<span style="color: #6688a6;">SUBTOTAL ESTADO DE CUENTA PARCIAL:$</span>{{subTotalTipoGasto}}					
								<span style="color: #6688a6;">SUBTOTAL ESTADO DE CUENTA FINAL:$</span>{{subTotalTipoGasto2}}
							</div>
							<div ng-show="tipocargoselected.idTipoCargo==2">
								<span style="color: #6688a6;">SUBTOTAL DESVIOS:$</span>{{subTotalTipoGasto}}					
							</div>
							<div ng-show="tipocargoselected.idTipoCargo==3">
								<span style="color: #6688a6;">SUBTOTAL GASTOS RELEVANTES:$</span>{{subTotalTipoGasto}}					
							</div>
						</td>
						<td></td>
						<td></td>				
					</tr>
				</table>		
			<tabset>
    			<tab ng-repeat="workspace in workspaces" heading="{{workspace.name}}" active=workspace.active>             			
            		<div ng-controller="TabsChildController"> 
  						Filtrar: <input ng-model="searchText">                
  						<table width="501" class="table ng-table-rowselected" ng-table="tableParams" show-filter="true">
            				<tr ng-repeat="gasto in workspace.rowCollection | filter:searchText">
               					<td data-title="'IdGasto'" sortable="'nombre'">                    		
                   					{{gasto.idGasto}}                    		                    			
               					</td>                		
               					<td>               					
               					<div ng-show="editarGastoEvento && gasto.idGasto==idGasto && tipocargoselected.idTipoCargo>1">                		                		                		                    		                    
                   					Area:<select ng-model="regedittipoareaselected" ng-options="tipoarea.descripcion for tipoarea in areascargos" > 	  	  			 
			 								<option value="">Seleccione...</option>
			 							 </select>			 										 			                    	                		                			                    		                  
                   					<div ng-show="tipocargoselected.idTipoCargo==2">
                   					Rubro:<select ng-model="regEdittiporubroselected" ng-options="tiporubro.descripcion for tiporubro in rubroscargos" > 	  	  			 
			 								<option value="">Seleccione...</option>
			 							  </select>
			 						</div>
			 						<div ng-show="tipocargoselected.idTipoCargo==2">				 			                    		                    		
                   					Causa:<select ng-model="regEditrazonesAltaGastoImproSelected" ng-options="razonesGastoImpro.descripcion for razonesGastoImpro in causascargos">
                   					      	<option value="">Seleccione...</option>
										  </select>
                   				    </div>                    																											
                   				</div>                    		 
               					</td> 	  	  			 					 	
			               		<td data-title="'Producto'" sortable="'nombre'">
			                   		<div ng-show="!editarGastoEvento || gasto.idGasto!=idGasto">
			                    			{{gasto.nombre}}
			                   		</div> 
			                   		<div ng-show="editarGastoEvento && gasto.idGasto==idGasto"> 
			                   			<input type="text" ng-model="cargoEdit.nombre" size="30" />
			                   		</div> 
			               		</td>
			               		<td data-title="'Fecha'" sortable="'fechaIngreso'">
			               			<div ng-show="!editarGastoEvento || gasto.idGasto!=idGasto">
			                    		{{gasto.fechaIngreso | date:dateFormat}}
			                   		</div> 
			                   		<div ng-show="editarGastoEvento && gasto.idGasto==idGasto"> 
			                   			<input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" />
			                   			<br><br><br>				        		
						        		<button class="btn btn-default" ng-click="guardarGastoEdit()">Guardar</button>
			                   		</div>
			               		</td>
			               		<td ng-show="tipocargoselected.idTipoCargo!=2" data-title="'Monto'" sortable="'nombre'">
			                		<div ng-show="!editarGastoEvento || gasto.idGasto!=idGasto">
				                    	{{gasto.montoUnitario}} 
			                    	</div>
			                    	<div ng-show="editarGastoEvento && gasto.idGasto==idGasto">
			                    		<input type="text" ng-model="cargoEdit.montoUnitario" size="30" />
			                    	</div>
			                		</td>
			                		<td ng-show="tipocargoselected.idTipoCargo==2" data-title="'Monto Unitario'" sortable="'nombre'">
			                			<div ng-show="!editarGastoEvento || gasto.idGasto!=idGasto">
				                    		{{gasto.montoUnitario}} 
			                    		</div>
			                    	<div ng-show="editarGastoEvento && gasto.idGasto==idGasto">
			                    		<input type="text" ng-model="cargoEdit.montoUnitario" size="30" />
			                    	</div>
			                	</td>
			                	<td ng-show="tipocargoselected.idTipoCargo==2" data-title="'Cantidad'" sortable="'nombre'">
			                		<div ng-show="!editarGastoEvento || gasto.idGasto!=idGasto">
			                    		{{gasto.cantidad}}
			                    	</div>
			                    	<div ng-show="editarGastoEvento && gasto.idGasto==idGasto">
			                    		<input type="text" ng-model="cargoEdit.cantidad" size="30" />
			                    		<br><br><br>
			                    		<button class="btn btn-default" ng-click="hideEditarCedulaControlForm()">Cancelar</button>
			                    	</div> 
			                	</td>
			                	<td data-title="'Evidencia'" sortable="'nombre'">
			                		<div ng-show="!editarGastoEvento || gasto.idGasto!=idGasto">
			                    		{{gasto.rutaEvidencia}}
			                    	</div>
			                    	<div ng-show="editarGastoEvento && gasto.idGasto==idGasto">
			                    		<input type="text" ng-model="cargoEdit.cantidad" size="30" />
			                    	</div> 
			                	</td>
			                	<td ng-show="tipoUsuarioLogin!=2" data-title="''" >                			
			                		ok<div ng-show="editarEvento || gasto.idGasto!=1000">
			                			<a href="#" ng-click="eliminarGasto(gasto.idGasto)"><img height="20" width="20" src="static/img/borrar.jpg"/></a>
			                		</div>                						   				                    	
			                	</td>
			                	<td ng-show="tipoUsuarioLogin!=2" data-title="''" >                    		
			                    	ok<div ng-show="editarEvento || gasto.idGasto!=1000">
			                    		<a href="#" ng-click="showEditarCedulaControlForm(gasto.idTipoCargo,gasto.idGasto,gasto.idArea,gasto.nombre,gasto.montoUnitario,gasto.cantidad)"><img src="static/img/editar.jpg" height="20" width="20"/></a>
			                    	</div> 
			                	</td>
            				</tr>
        				</table>		            	          
     				</div>     
    			</tab>
    		</tabset>    	  
    		<div ng-controller="TabsChildController" id="divEditarCedulaControlController" style="display:none">    	
    			<table width="1000" >
	    			<tr>
						<td align="center" bgcolor="#6688a6"><span style="color: #ffffff;">EDITAR REGISTRO DE GASTO ACTIVO</span></td>
					</tr>
				</table>												    
			</div>		
		</td>
	</tr>
</table>