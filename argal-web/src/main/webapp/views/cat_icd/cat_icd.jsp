<link rel="stylesheet" href="static/css/bootstrap.min.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
<table heigth="50px" border="0">
	<tr>
		<td bgcolor="#6688a6" width="1180" height="23" align="center" ><img src="static/img/icdlist.png" height="30" width="30"/> <span style="color:white"> Seleccione un ICD</span>
	   </td>
	    </tr><tr><td></td>
	</tr>
</table>

<div ng-controller="Cat_ICD_Controller">
<table><tr><td> Buscar: <input ng-model="searchText"></td>
</tr></table>
<table width="719px" class="table ng-table-rowselected" border="3" ng-table="tableParams" show-filter="true">    
            <tr ng-repeat="icd in $data | filter:searchText"
                ng-click="icd.$selected = !icd.$selected; changeSelection(icd)"
                ng-class="{'active': icd.$selected}" >
                <td data-title="'IdIcd'" sortable="'idIcd'">
                    {{icd.idIcd}}
                </td>
                <td data-title="'Nombre'" sortable="'descripcion'">
                    {{icd.descripcion}}
                </td>
                <td data-title="'Clave'" sortable="'clave'">
                    {{icd.clave}}
                </td>
                <td data-title="">
                	<a ng-click="selectICD1(icd.idIcd,icd.descripcion)"> 
                		Seleccionar
                	</a>
                </td>
                
            </tr>
        </table>
</div>
   