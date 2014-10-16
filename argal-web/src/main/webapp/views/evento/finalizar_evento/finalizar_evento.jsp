<script type="text/javascript">
	//using jquery.form.js
</script>
<table width="1100" border="1">
	<tr>
		<td heigth="70px">
			<table width="1100" heigth="70px" border="1">
				<tr>
					<td ng-show="idUsuarioLogin!=2" width="1100" align="center" bgcolor="#6688a6"><h5><span style="color: #ffffff;">FINALIZAR EVENTO</span></h5>
					</td>
					<td ng-show="idUsuarioLogin==2" width="1100" align="center" bgcolor="#6688a6"><h5><span style="color: #ffffff;">BALANCE DEL EVENTO</span></h5>
					</td>
				</tr>
			</table>
			<div ng-controller="AccordionDemoCtrl"> 		 
				<tabset>
					<tab heading="FACTURACIÓN">
						<br>
						<!--accordion-group heading="FACTURACIÓN" is-open="true"-->
						<table width="1000px" border="0" ng-show="subirFacturaVar" align="center">
							<tr>
								<td width="1000px" align="center" bgcolor="#6688a6"><h6><span style="color: #ffffff;">INGRESE LOS DATOS DE LA NUEVA FACTURA:</span></h6></td>
							</tr>
						</table>    
						<table width="1000px" border="0" ng-show="subirFacturaVar" align="center">
							<tr>
								<td><span style="color: #6688a6;">APROBADA:</span>			
									<select style="width: 150px" ng-model="factaprobSelected" ng-options="factaprob.nombre for factaprob in facturaAprobadaCombo">
										<option value="">Seleccione...</option>
									</select>		        				        				  
								</td>																	
								<td style="width: 130px">
									<span style="color: #6688a6;">NUMERO DE FACTURA:
								</td>
								<td>
									<input type="text" ng-model="eventoFactura.numeroFactura" /></span>
								</td>				 					 				  	  							
								<td style="width: 65px">
									<span style="color: #6688a6;">MONTO:$</span>
								</td>
								<td>			
									<input type="text" ng-model="eventoFactura.montoFactura" />
								</td>
							</tr>
						</table>
						<table width="1000px" border="0" ng-show="subirFacturaVar">
							<tr>		   					 					 					
								<td style="width: 340px;><span style="color: #6688a6;">OBSERVACIONES:</span>			
									<textarea style="width: 320px; height:103px" ng-model="eventoFactura.detalle" ></textarea>		   					 					 		
								</td>
								<td align="center">
									<form id="form2" method="post" action="/argal-web/mvc/cont/upload" enctype="multipart/form-data">
										<!-- File input -->    
										<span style="color: #6688a6;">SELECCIONE EL ARCHIVO PARA ADJUNTAR FACTURA:</span><BR><input name="file2" id="file2" type="file" /><br/>
										<input name="idEventoHidden" id="idEventoHidden" type="hidden" value="2"/>  					
										<!-- button value="Submit" onclick="uploadJqueryForm()" >Subir Archivo</button><i>Using JQuery Form Plugin</i><br/> -->					
										<div id="result"></div>
									</form>					
								</td>
								<td>
									<button ng-click="subirFactura()"><h5>GUARDAR FACTURA</h5></button>
								</td>			
							</tr>		
						</table>	
						<table ng-show="factaprobSelected.idFacturaAprobada==2" border=0 >
							<tr>
								<td><h5>Llene los siguientes datos para Facturas rechazadas:</h5></td>
							</tr>
						</table>
						<table ng-show="factaprobSelected.idFacturaAprobada==2" border=1 >
							<tr>
								<td>
									<span style="color: #6688a6;">AJUSTE FACTURA:</span>
									<input type="text" ng-model="eventoFactura.ajusteFactura" />
								</td>			
								<td><span style="color: #6688a6;">TIPO DE COMPROBANTE FISCAL CORREGIDO:</span>			
									<input type="text" ng-model="eventoFactura.tipoComprobanteFiscalCorregido" />				        				   
								</td>
								<td><span style="color: #6688a6;">FOLIO COMPROBANTE FISCAL CORREGIDO:</span>
									<input type="text" ng-model="eventoFactura.folioComprobanteFiscalCorregido" />
								</td>		  	
								<td><span style="color: #6688a6;">MONTO COMPROBANTE FISCAL CORREGIDO:</span>
									<input type="text" ng-model="eventoFactura.montoComprobanteFiscalCorregido" />	 					 				  	  	
								</td>			
							</tr>
						</table>
						<button ng-click="nuevaFacturaShow()" ng-show="subirFacturaVar"><h5>CANCELAR</h5></button>
	
						<table style="width: 1000px" border=0 ng-show="!subirFacturaVar">	
							<tr>
								<td style="width: 600px" align="center">
									<h5>Facturas Aprobadas:</h5>
									<table style="width: 400px"  class="table ng-table-rowselected" ng-table="tableParams" show-filter="false" border=0>	  	
										<tr ng-repeat="factura in dataFacturas | filter:{aprobada: 'SI'}"
												ng-click="factura.$selected = !factura.$selected; changeSelection(factura)"
											ng-class="{'active': factura.$selected}" >
											<td  data-title="'NoFactura'">
												{{factura.numeroFactura}}
											</td>			                
											<td data-title="'Monto'" sortable="'monto'">
												{{factura.monto | currency:"$"}}
											</td>
											<td data-title="''">
												<a href="#" onclick="window.open('views/evento/finalizar_evento/viewfactura.jsp','Ver Factura','height=800,width=800')">ver</a>			                    
											</td>                                
											<td>
												<div ng-show="!editarEvento && tipoUsuarioLogin!=2" >
													<a href="#" ng-click="eliminarGasto(gasto.idGasto)"><img height="20" width="20" src="static/img/borrar.jpg"/></a>
												</div>
											</td>
										</tr>
									</table>
								</td>
								<td align="left">
									<h5>SubTotal Facturación: </h5>{{cuentaFinalFacturacion | currency:"$"}}			                  			    			 
								</td>
							</tr>
						</table>        	 
						<table style="width: 1000px" border=0 ng-show="!subirFacturaVar">
							<tr>
								<td align="center">
									<h5>Facturas Rechazadas:</h5>                
									<table style="width: 700px"  class="table ng-table-rowselected" ng-table="tableParams" show-filter="false" border=0>	  	
										<tr ng-repeat="factura in dataFacturas | filter:{aprobada: 'NO'}"
												ng-click="factura.$selected = !factura.$selected; changeSelection(factura)"
														ng-class="{'active': factura.$selected}" >
											<td data-title="'NoFactura'">
												{{factura.numeroFactura}}
											</td>
											<td data-title="'Monto'" sortable="'aprobada'">
												{{factura.monto | currency:"$"}}
											</td>
										   <td data-title="'Ajuste Factura'">
												{{factura.ajusteFactura | currency:"$"}}
										   </td>
										   <td data-title="'Tipo Comp. Fiscal'" sortable="'aprobada'">
												{{factura.tipoComprobanteFiscalCorregido}}
										   </td>
										   <td data-title="'Folio Comp. Fiscal'" sortable="'aprobada'">
												{{factura.folioComprobanteFiscalCorregido}}
										   </td>
										   <td data-title="'Monto Comp. Fiscal'" sortable="'aprobada'">
												{{factura.montoComprobanteFiscalCorregido | currency:"$"}}
										   </td>			                                               
										   <td>
										   <td data-title="''">
										   		<div ng-show="!editarEvento" >
													<a href="#" onclick="window.open('views/evento/finalizar_evento/viewfactura.jsp','Ver Factura','height=800,width=800')">ver</a>
												</div>			                    
										   </td>
										   <td>               
												<div ng-show="!editarEvento && tipoUsuarioLogin!=2">
													<a href="#" ng-click="eliminarGasto(gasto.idGasto)"><img height="20" width="20" src="static/img/borrar.jpg"/></a>
												</div>
										   </td>
										</tr>			
									</table>          	 
								</td>       
								<td align="left">
									<h5>Monto Acumulado Desvíos Facturación: </h5>{{cuentaFinalDesviosFacturacion | currency:"$"}}
								</td>			
							</tr>
						</table>
						<button ng-show="tipoUsuarioLogin!=2" ng-click="nuevaFacturaShow()" ng-show="!subirFacturaVar"><h5>Subir Nueva Factura</h5></button>
						<!-- /accordion-group -->
					</tab>    
					
					<tab heading="FINALIZAR MONTOS">      
						<div ng-show="eventoConCenso && tipoUsuarioLogin!=2">
							Evento de Banco, Por favor llene los siguientes datos (Titular - Jubilado):
							<br>
							<table width="500" border="0" align="left">
								<tr>    	
									<td><span style="color: #6688a6;"><br>CAPITA:</span></td>
									<td><select ng-model="capitaSelected" ng-options="capita.nombre for capita in capitas">
											<option value="">Seleccione...</option>
										</select>					
									</td>
									<td><span style="color: #6688a6;">CANTIDAD CUBIERTA POR CONVENIO:</span></td>
									<td><input type="text" ng-model="evento.registroSeguroPersonal.nombreTitular" /></td>				
								</tr>
							</table>
						</div>    
	      	
						<table width="800" border="3" align="center" style="font-size:10px;">
							<tr>
								<td>
									<table width="250" border="1" align="center">
										<tr>
											<td align="center" bgcolor="#6688a6"><span style="color: #ffffff;">FINALIZAR MONTOS DEL EVENTO</span></td>    						
										</tr>
									</table>    				
									<table width="250" border="1" align="center">																	
										<tr>								
											<td width="100px"><span style="color: #6688a6;">MONTO ANTES DE DESVÍOS:</span></td>
											<td width="150">{{montoAntesDesvios | currency:"$"}}</td>						        				        				  
										</tr>
										<tr>				
											<td><span style="color: #6688a6;">TOTAL DESVÍOS:</span></td>			
											<td>{{totalDesvios | currency:"$"}}</td>
										</tr>	
										<tr>								
											<td width="100px"><span style="color: #6688a6;">MONTO DESPUES DE DESVÍOS:</span></td>
											<td width="150">{{montoAntesDesvios | currency:"$"}}</td>						        				        				  
										</tr>					
										<tr>				
											<td><span style="color: #6688a6;">IVA: $</span></td>
											<td><input type="text" ng-model="eventoFinalizarEventoForm.ivaFinalizarEvento" ng-change="updateMontoFinal()" value=0/></td>
										</tr>
										<tr>				
											<td><span style="color: #6688a6;">COASEGURO: (%)</span></td>	 		
											<td><input type="text" ng-model="eventoFinalizarEventoForm.coaseguroFinalizarEvento" ng-change="updateMontoFinal()" value=0/></td>
										</tr>
										<tr>				
											<td><span style="color: #6688a6;">DEDUCIBLE: $</span></td>			
											<td><input type="text" ng-model="eventoFinalizarEventoForm.deducibleFinalizarEvento" ng-change="updateMontoFinal()"/></td>		   					 					 									
										</tr>
										<tr>
											<td><span style="color: #6688a6;">DESCUENTOS HOSPITAL: $</span></td>
											<td><input type="text" ng-model="eventoFinalizarEventoForm.descuentoHospitalFinalizarEvento" ng-change="updateMontoFinal()"/></td>							
										</tr>						
									</table>
								</td>			
								<td>
									<table width="250" border="1" align="center">
										<tr>
											<td align="center" bgcolor="#6688a6"><span style="color: #ffffff;">MONTOS DE FACTURACIÓN</span>
											</td>
										</tr>
									</table>    				
									<table width="250" border="1" align="center">																	
										<tr>								
											<td width="100px"><span style="color: #6688a6;"># FACTURAS APROBADAS:</span></td>
											<td width="150">{{numeroFacturasAprobadas}}</td>						        				        				  
										</tr>
										<tr>				
											<td width="100px"><span style="color: #6688a6;"># FACTURAS RECHAZADAS:</span></td>
											<td width="150">{{numeroFacturasRechazadas | currency:"$"}}</td>
										</tr>
										<tr>				
											<td><span style="color: #6688a6;">MONTO TOTAL DESVÍOS FACTURACIÓN:</span></td>			
											<td>{{cuentaFinalDesviosFacturacion | currency:"$"}}</td>		   					 					 									
										</tr>
										<tr>				
											<td><span style="color: #6688a6;">MONTO AJUSTE FACTURACIÓN: $</span></td>
											<td><input type="text" ng-model="montoAjusteFacturacionFinalizarEvento" /></td>
										</tr>
										<tr>				
											<td><span style="color: #6688a6;">MONTO FACTURACIÓN CORREGIDO: $</span></td>
											<td><input type="text" ng-model="montoFacturacionCorregidoFinalizarEvento" /></td>
										</tr>
										<tr>						
											<td></td>
											<td></td>
										</tr>
									</table>
									<span style="color: #6688a6;">MONTO FINAL FACTURACIÓN: $</span>{{cuentaFinalFacturacion | currency:"$"}}
								</td>
							</tr>	
						</table>
						<center><button ng-show="tipoUsuarioLogin!=2"  class="btn btn-default" ng-click="finalizarMontosEvento()" ng-show="subirFacturaVar">FINALIZAR EVENTO</button></center>			     				        				   	
					</tab>    
				</tabset>  
			</div>
		</td>
	</tr>
</table>