<table width="890" border="1">
	<tr>
		<td width="890" align="center" bgcolor="#6688a6"><span style="color: #ffffff;">LAYOUT GENERAL</span></td>
	</tr>
</table>
<table width="890" border="1">
	<tr>
		<td width="890" align="center" bgcolor="#6688a6"><span style="color: #ffffff;">LAYOUT GENERAL-BANCO</span></td>
	</tr>
</table>				
	<table width="880">																	
		<tr>
			<td><span style="color: #6688a6;">FECHA DE INICIO:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)"  close-text="Close" />				        				   
			</td>
			<td><span style="color: #6688a6;">FECHA DE FIN:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt2" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" close-text="Close" />				        				   
			</td>		  	
			<td><span style="color: #6688a6;">¿EVENTOS FINALIZADOS?:</span></td>
			<td><input type="checkbox" ng-model="evento.red" /></td>
		</tr>		
		<tr>				
			<td></td>  	
			<td></td>
			<td>												
				<a href="mvc/reportes/obtenerlayoutbanco">GENERAR LAYOUT</a>
			</td>	
			<td></td>													
			<td></td>	
			<td></td>													  
	  	</tr>
	  </table>
<table width="890" border="1">
	<tr>
		<td width="890" align="center" bgcolor="#6688a6"><span style="color: #ffffff;">LAYOUT GENERAL-ASEGURADORA</span></td>
	</tr>
</table>				
	<table width="880">																	
		<tr>
			<td><span style="color: #6688a6;">FECHA DE INICIO:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)"  close-text="Close" />				        				   
			</td>
			<td><span style="color: #6688a6;">FECHA DE FIN:</span></td>
			<td>
		        <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt2" is-open="opened" min="minDate" max="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" close-text="Close" />				        				   
			</td>		  	
			<td><span style="color: #6688a6;">¿EVENTOS FINALIZADOS?:</span></td>
			<td><input type="checkbox" ng-model="evento.red" /></td>
		</tr>		
		<tr>				
			<td></td>  	
			<td></td>
			<td>												
				<a href="mvc/reportes/obtenerlayoutbanco">GENERAR LAYOUT</a>
			</td>	
			<td></td>													
			<td></td>	
			<td></td>													  
	  	</tr>
	  </table>
	  