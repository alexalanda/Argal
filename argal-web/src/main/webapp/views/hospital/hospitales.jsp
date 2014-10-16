<style>
.ng-table-rowselected tr {
    cursor: pointer;
}
</style>
<br>
<table width="1180" heigth="50px" border="0">
	<tr>
		<td width="1180" height="23" align="center" ><img src="static/img/hospital.jpg" height="30" width="30"/> Hospitales
	    <hr color="#6688a6" /></td>
	</tr>
</table>

<div ng-controller="HospitalController" align="center">
<table width="719px">
 <tr><td> Buscar: <input ng-model="searchText"></td><td align="right">Agregar<a ng-click="openEditarHosp('','views/hospital/alta.jsp')"><img src="static/img/agregarhospital.jpg" height="80" width="80"/></a>
 </td></tr></table>
  
  	<table width="719px" class="table ng-table-rowselected" border="3" ng-table="tableParams" show-filter="true">
            <tr ng-repeat="hosp in $data | filter:searchText"
                ng-click="hosp.$selected = !hosp.$selected; changeSelection(hosp)"
                ng-class="{'active': hosp.$selected}" >
                <td data-title="'IdHospital'" sortable="'idHospital'">
                    {{hosp.idHospital}}
                </td>
                <td data-title="'Nombre'" sortable="'nombreHospital'">
                    {{hosp.nombreHospital}}
                </td>
                <td data-title="'Estado'" sortable="'estadoHospital'">
                    {{hosp.estadoHospital}}
                </td>
                <td data-title="'Municipio'" sortable="'municipioDelHospital'">
                    {{hosp.municipioDelHospital}}
                </td>
 				<td data-title="'Tel�fono M�dulo'" sortable="'telModuloHospital'">
                    {{hosp.telModuloHospital}}
                </td>
                <td data-title="">
                	<a ng-click="openEditarHosp('','views/hospital/editar.jsp')"><img src="static/img/editar.jpg" height="20" width="20"/></a>
                </td>
                <td data-title="">
                	<a ng-click="eliminarDesactHosp()"> 
                		<img height="20" width="20" src="static/img/borrar.jpg"/>
                	</a>
                </td>
                
            </tr>
        </table>
    	
      

	<script type="text/ng-template" id="eliminardesachospdialog.html">
	  <div class="modal-header">
            <h3>Notificaci�n</h3>
        </div>
        <div class="modal-body">
            {{mensajeDialogoAltaHosp}}
        </div>
        <div class="modal-footer">            
            <button class="btn btn-warning" ng-click="cancelHospForm()">Cerrar</button>
        </div>
    </script> 
    
</div>