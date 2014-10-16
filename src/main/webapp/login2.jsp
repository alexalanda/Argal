<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<!--link rel="shortcut icon" type="image/ico" href="http://www.datatables.net/media/images/favicon.ico" /-->
		
		<title>FAM</title>
		<style type="text/css" title="currentStyle">
			@import "static/js/libs/css/demo_page.css";
			@import "static/js/libs/css/demo_table.css";
			@import "static/js/libs/js/jquery-ui-1.9.2.custom.css";
		</style>
		<script type="text/javascript" language="javascript" src="static/js/libs/js/jquery-1.9.1.js"></script>
		<script type="text/javascript" language="javascript" src="static/js/libs/js/jquery.custom.js"></script>
		<script type="text/javascript" language="javascript" src="static/js/libs/js/jquery.dataTables.js"></script>
		<script type="text/javascript" language="javascript" src="static/js/app/login/login.js"></script>		
		
		<script type="text/javascript" charset="utf-8">
			var oTable;			
			/*$(document).ready(function() {			
				$("#divlogin").dialog({
					draggable: false,
					resizeble: false,
					width: 300,
					height: 200,					
					open: function(event, ui){									
					}
				});
			});*/
			
		</script>
	</head>	
	<body id="dt_example">
	<form name="loginform" action="j_spring_security_check" >	
	<div id="divlogin" style="display:none">
		!!!Por favor teclee sus datos:<br>
		<table>
			<tr><td>User:</td><td><input type="text" id="j_username" name="j_username"/></td></tr>
			<tr><td>Password:</td><td><input type="password" name="j_password" id="j_password"/></td></tr>
			<tr><td><input type="button" value="Aceptar" onClick="login();"/></td></tr>
			<tr><td><input type="submit" value="Aceptar!"/></td></tr>
		</table>
	</form>			
		<div id="loading"></div>
	</div>	
	<center>
	<div id="divok" align="center">
		<h1>Bienvenido a fam</h1>
	<form name="loginform" action="j_spring_security_check" method="post">		
	  <p><img src="static/img/1.png"/></p>
	  <p>
		Por favor teclee sus datos:<br>
		${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message} </p>
	  <table>
			<tr><td>User:</td><td><input type="text" id="j_username" name="j_username"/></td></tr>
			<tr><td>Password:</td><td><input type="password" name="j_password" id="j_password"/></td></tr>		
			<tr><td></td><td><input type="submit" value="Aceptar"/></td></tr>
	  </table>
	</form>			
		</center>
	</div>	
	</body>
</html>