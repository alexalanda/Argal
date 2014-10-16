package mx.argal.servicios;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import mx.argal.dao.EventoDao;
import mx.argal.modelo.Evento;
import mx.argal.modelo.Gasto;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
/*Librerías para trabajar con archivos excel*/
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import mx.sep.sajja.datos.vo.FiltroBusquedaVO;


@Service
public class ReportesServicioImpl implements ReportesServicio {
	
	@Autowired
	private EventoDao eventoDao;
	private List<String> encabezados;
	private List<String> contenidoCeldas;
	
	 
	@Override
	public File generarLayoutBanco() {
		/*La ruta donde se creará el archivo*/
        String rutaArchivo = System.getProperty("user.home")+"/ejemploExcelJava.xls";
        /*Se crea el objeto de tipo File con la ruta del archivo*/
        File archivoXLS = new File(rutaArchivo);
        /*Si el archivo existe se elimina*/
        if(archivoXLS.exists()) archivoXLS.delete();
        List<Evento> eventos = eventoDao.obtenerEventosBanco();
        /*Se crea el archivo*/
        encabezados = this.getEncabezadosBanco(encabezados);
        contenidoCeldas = this.getContenidoCeldasBanco(eventos);
        System.out.println("DATOS2:"+encabezados.size());
        
        System.out.println("DATOS:"+contenidoCeldas.size());
        
       	
        try { 
			archivoXLS.createNewFile();
			/*Se crea el libro de excel usando el objeto de tipo Workbook*/
	        Workbook libro = new HSSFWorkbook();
	        /*Se inicializa el flujo de datos con el archivo xls*/
	        FileOutputStream archivo = new FileOutputStream(archivoXLS);	        
	        /*Utilizamos la clase Sheet para crear una nueva hoja de trabajo dentro del libro que creamos anteriormente*/
	        Sheet hoja = libro.createSheet("LayoutBanco");
	        
	         
	        CellStyle style = libro.createCellStyle();
            style.setFillForegroundColor(IndexedColors.CORNFLOWER_BLUE.getIndex());
            style.setFillPattern(CellStyle.SOLID_FOREGROUND);            
        
	        /*Hacemos un ciclo para inicializar los valores de 10 filas de celdas*/
	        int d=0;
            for(int f=0;f<eventos.size()+3;f++){
	        	/*La clase Row nos permitirá crear las filas*/
	        	Row fila = hoja.createRow(f);      	  
	        	   	
	        	/*Cada fila tendrá 5 celdas de datos*/
	        	for(int c=0;c<94;c++){
	        		/*Creamos la celda a partir de la fila actual*/
	        		Cell celda = fila.createCell(c);	        	
	        		/*Si la fila es la número 0, estableceremos los encabezados*/
	        		if(f==1){	        		
	        			if (c==19){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Jubilado");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            19, //first column (0-based)
                	            19  //last column  (0-based)
	        				));
	        			}
	        			if (c==38){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Seguimiento Diario");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            38, //first column (0-based)
                	            40  //last column  (0-based)
	        				));
	        			}
	        			if (c==41){
	        				celda.setCellStyle(style);	        				
	        				celda.setCellValue("Recién Nacidos");	        				
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            41, //first column (0-based)
                	            44  //last column  (0-based)
	        				));	        				
	        			}
	        			if (c==45){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Desvíos en Cargos en Piso");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            45, //first column (0-based)
                	            49  //last column  (0-based)
	        				));
	        			}
	        			if (c==50){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Desvíos en Quirófano");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            50, //first column (0-based)
                	            55  //last column  (0-based)
	        				));
	        			}
	        			if (c==56){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Desvíos en Terpia Intensiva, Intermedia y Neonatal");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            56, //first column (0-based)
                	            61  //last column  (0-based)
	        				));
	        			}
	        			if (c==62){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Desvíos en Urgencias");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            62, //first column (0-based)
                	            66  //last column  (0-based)
	        				));
	        			}
	        			if (c==83){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Justificación del Gasto Elevado");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            83, //first column (0-based)
                	            88  //last column  (0-based)
	        				));
	        			}
	        			if (c==92){
	        				celda.setCellStyle(style);
	        				celda.setCellValue("Defunción");
	        				hoja.addMergedRegion(new CellRangeAddress(
                	            1, //first row (0-based)
                	            1, //last row  (0-based)
                	            92, //first column (0-based)
                	            95  //last column  (0-based)
	        				));
	        			}
	        		}
                if(f==2){
                	hoja.autoSizeColumn(17);
                	style = libro.createCellStyle();
                    style.setFillForegroundColor(IndexedColors.AQUA.getIndex());
                    style.setFillPattern(CellStyle.SOLID_FOREGROUND);                                       
                    celda.setCellValue(this.encabezados.get(c));
                   // System.out.println("VALOR:::::"+this.encabezados.get(c));
                    celda.setCellStyle(style);
                    
                }
                if (f>2){
                    /*Si no es la primera fila establecemos un valor*/
                	System.out.println("Get value for d:"+d);
                	if (d<940){
                		System.out.println("Valor:"+this.contenidoCeldas.get(d));      	
                		celda.setCellValue(this.contenidoCeldas.get(d++));
                	}
                	//System.out.println("VALOR!!:::"+this.contenidoCeldas.get(c)+"->"+c);
                }               
	        }
	        	
        }
              
			libro.write(archivo);
			archivo.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("<OTIKA>ERROR!"+e.getMessage());
			e.printStackTrace();
		}
        /*Cerramos el flujo de datos*/        
        return archivoXLS;
	}
	
	private List<String> getEncabezadosBanco(List <String> encabezados) {
		// TODO Auto-generated method stub
		encabezados = new ArrayList<String>();
		encabezados.add("Mes");encabezados.add("Semana");encabezados.add("Hospital");
		encabezados.add("Habitación");encabezados.add("Estado");encabezados.add("Municipio / Ciudad");
		encabezados.add("Institución");encabezados.add("Fecha de captura");encabezados.add("Fecha Ingreso Paciente");
		encabezados.add("Fecha Alta del Paciente");	encabezados.add("Fecha Reporte Alta");encabezados.add("Días de Estancia Hospitalaria");
		encabezados.add("Nombre del Titular");encabezados.add("Nombre del Paciente");encabezados.add("Estatus Paciente");
		encabezados.add("Sexo");encabezados.add("Edad");encabezados.add("Unidad");
		encabezados.add("Condición del Asegurado");encabezados.add("Censo(SI / NO)");
		encabezados.add("Capita");
		encabezados.add("Tipo Beneficiario");
		encabezados.add("No. Autorización");encabezados.add("No. Nómina");encabezados.add("Médico Tratante");
		encabezados.add("Especialidad");encabezados.add("Red");	encabezados.add("Interconsultas");
		encabezados.add("Diagnóstico Ingreso 1");encabezados.add("ICD 1");encabezados.add("Diagnóstico Ingreso 2");
		encabezados.add("ICD 2");encabezados.add("Diagnóstico Egreso");	encabezados.add("ICD Egreso");
		encabezados.add("Procedimiento 1");encabezados.add("CPT 1");encabezados.add("Procedimiento 2");
		encabezados.add("CPT 2");encabezados.add("Tipo Evento");
		encabezados.add("Monto Anterior");
		encabezados.add("Monto Actual");encabezados.add("Observaciones Clínicas Relevantes");encabezados.add("Tipo de Parto");
		encabezados.add("Peso (gramos)");encabezados.add("Talla (cm)");encabezados.add("Apgar");
		encabezados.add("Material");encabezados.add("Medicamento");encabezados.add("Laboratorio y RX");
		encabezados.add("Terapia respiratoria");encabezados.add("Habitaciones");encabezados.add("Material");
		encabezados.add("Medicamento");encabezados.add("Anestesia (maq y gas)");encabezados.add("Rentas de equipos");
		encabezados.add("Insumos proveedor externo");encabezados.add("Tiempos de sala");encabezados.add("Material");
		encabezados.add("Medicamento");encabezados.add("Laboratorio y RX");encabezados.add("Rentas de equipos");
		encabezados.add("Terapia Respiratoria");encabezados.add("Cubiculos");encabezados.add("Material");encabezados.add("Medicamentos");
		encabezados.add("Laboratorio y RX");encabezados.add("Rentas de equipo");encabezados.add("Cubiculo");
		
		encabezados.add("Monto antes de desvíos");
		encabezados.add("Total desvíos");
		encabezados.add("Monto despues de desvíos");
		encabezados.add("Descuentos Hospital");
		encabezados.add("Cuenta Final Facturación");
		//Facturación Aprobada
		encabezados.add("Número de Facturas Aprobadas");
		encabezados.add("Monto Facturas Aprobadas");
		//Facturación Rechazada
		encabezados.add("Número de Facturas Rechazadas");
		encabezados.add("Monto Desvios Factución");
		
		encabezados.add("Monto ajustes de Facturacion");
		encabezados.add("Monto Facturación Corregido");
		
		encabezados.add("Descuento No aplicado");
		encabezados.add("Descuento Adicional después de la Factura");
		encabezados.add("Total Real Facturación");
		encabezados.add("Comentarios Facturación Corregida");
		encabezados.add("Cargos Personales");encabezados.add("Total Desvíos");encabezados.add("Terapia Intensiva");
		encabezados.add("Medicamentos");encabezados.add("Materiales y Equipo");encabezados.add("Banco de Sangre");encabezados.add("Quirófano");
		encabezados.add("Otros");encabezados.add("Observaciones");encabezados.add("Hora Defunción");encabezados.add("Causa Directa Defunción");
		encabezados.add("Capita");
		encabezados.add("Cantidad Cubierta");
		
		System.out.println("ENCABEZADOS:"+encabezados.size());
		return encabezados;
	}

	private List<String> getContenidoCeldasBanco(List<Evento> eventos) {		
		// TODO Auto-generated method stub
		List<String>contenidoCeldas= new ArrayList<String>();
		//System.out.println("EVENTOS"+eventos.size());
		for(int f=0;f<eventos.size();f++){						
			Evento evento = new Evento();
			evento=eventos.get(f);
			System.out.println("EVENTO DE:"+eventos.get(f).getRegistroSeguroPersonal().getNombreTitular());
			contenidoCeldas.add(""+evento.getFechaIngreso().getMonth());//Mes
			contenidoCeldas.add(""+evento.getFechaIngreso().getDay());//Semana
			contenidoCeldas.add(""+evento.getHospital().getNombreHospital());//Hospital
			contenidoCeldas.add(""+evento.getNumHabitacion());//Habitación
			contenidoCeldas.add(""+evento.getHospital().getEstadoHospital());//Estado
			contenidoCeldas.add(""+evento.getHospital().getMunicipioDelHospital());//Municipio / Ciudad			
			contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getInstitucion());//Institución			
			contenidoCeldas.add(""+evento.getFechaCaptura());//Fecha de captura
			contenidoCeldas.add(""+evento.getFechaIngreso());//Fecha Ingreso Paciente
			contenidoCeldas.add(""+evento.getFechaIngreso());//Fecha Alta del Paciente
			contenidoCeldas.add(""+evento.getFechaIngreso());//Fecha Reporte Alta 
			contenidoCeldas.add(""+1);//Días de Estancia Hospitalaria
			//Se obtienen los datos si es banco
			if (evento.getRegistroSeguroPersonal()!=null){
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getNombreTitular()+" "+evento.getRegistroSeguroPersonal().getAppTitular()+ " " + evento.getRegistroSeguroPersonal().getApmTitular());//Nombre del Titular
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getNombrePaciente()+" "+evento.getRegistroSeguroPersonal().getAppPaciente()+ " " + evento.getRegistroSeguroPersonal().getApmPaciente());//Nombre del Paciente
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getRelacionPaciente());//Estatus Paciente
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getSexoPaciente());//Sexo
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getEdadPaciente());//Edad
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getUnidadEdadPaciente());//Unidad
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getCondicionPaciente());//Condición del Asegurado
				contenidoCeldas.add("SI");//Censo(SI / NO)
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getCapita());//Capita
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getRelacionPaciente());//Tipo Beneficiario
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getNumAutorizacion());//No. Autorización
				contenidoCeldas.add(""+evento.getRegistroSeguroPersonal().getNumeroNomina());//No. Nómina
			}
			else{
				contenidoCeldas.add("0");//Nombre del Titular
				contenidoCeldas.add("0");//Nombre del Paciente
				contenidoCeldas.add("0");//Estatus Paciente
				contenidoCeldas.add("0");//Sexo
				contenidoCeldas.add("0");//Edad
				contenidoCeldas.add("0");//Unidad
				contenidoCeldas.add("0");//Condición del Asegurado
				contenidoCeldas.add("0");//Censo  (SI / NO)
				contenidoCeldas.add("0");//CAPITA
				contenidoCeldas.add("0");//Tipo Beneficiario
				contenidoCeldas.add("0");//No. Autorización
				contenidoCeldas.add("0");//No. Nómina
			}
			
			//Datos comúnes
			if (evento.getMedicoTratante()!=null){
				contenidoCeldas.add(""+evento.getMedicoTratante().getNombre());//Médico Tratante
				contenidoCeldas.add(""+evento.getMedicoTratante().getEspecialidadMedTratante());//Especialidad
				contenidoCeldas.add("SI");//Red
			}
			else{
				contenidoCeldas.add("0");//Médico Tratante
				contenidoCeldas.add("0");//Especialidad
				contenidoCeldas.add("0");//Red
			}			
			contenidoCeldas.add("0");//Interconsultas
			if (evento.getDiagnosticoIngreso1()!=null){
				contenidoCeldas.add("0"+evento.getDiagnosticoIngreso1().getDescripcion());//Diagnóstico Ingreso 1
				contenidoCeldas.add("0"+evento.getDiagnosticoIngreso1().getIdIcd());//ICD 1
			}
			else{
				contenidoCeldas.add("0");//Diagnóstico Ingreso 1
				contenidoCeldas.add("0");//ICD 1
			}
			if (evento.getDiagnosticoIngreso2()!=null){
				contenidoCeldas.add(""+evento.getDiagnosticoIngreso2().getDescripcion());//Diagnóstico Ingreso 2
				contenidoCeldas.add(""+evento.getDiagnosticoIngreso2().getIdIcd());//ICD 2
			}
			else{
				contenidoCeldas.add("0");//Diagnóstico Ingreso 2
				contenidoCeldas.add("0");//ICD 2
			}
			contenidoCeldas.add("0");//Diagnóstico Egreso
			contenidoCeldas.add("0");//ICD Egreso
			contenidoCeldas.add("0");//Procedimiento 1	
			contenidoCeldas.add("0");//CPT 1
			contenidoCeldas.add("0");//Procedimiento 2	
			contenidoCeldas.add("0");//CPT 2
			if (evento.getTipoEvento()!=null){
				contenidoCeldas.add(""+evento.getTipoEvento().getDescripcion());//Tipo Evento
			}
			else{
				contenidoCeldas.add("0");//Tipo Evento
			}
			contenidoCeldas.add("");//Monto Anterior
			contenidoCeldas.add("");//Monto Actual
			contenidoCeldas.add("");//Observaciones Clínicas Relevantes
			contenidoCeldas.add("");//Tipo de Parto
			contenidoCeldas.add("");//Peso (gramos)
			contenidoCeldas.add("");//Talla (cm)
			contenidoCeldas.add("");//Apgar
			contenidoCeldas.add("");//Material
			contenidoCeldas.add("");//Medicamento
			contenidoCeldas.add("");//Laboratorio y RX
			contenidoCeldas.add("");//Terapia respiratoria
			contenidoCeldas.add("");//Habitaciones
			contenidoCeldas.add("");//Material
			contenidoCeldas.add("");//Medicamento
			contenidoCeldas.add("");//Anestesia (maq y gas)
			contenidoCeldas.add("");//Rentas de equipos
			contenidoCeldas.add("");//Insumos proveedor externo
			contenidoCeldas.add("");//Tiempos de sala
			contenidoCeldas.add("");//Material
			contenidoCeldas.add("");//Medicamento	
			contenidoCeldas.add("");//Laboratorio y RX
			contenidoCeldas.add("");//Rentas de equipos
			contenidoCeldas.add("");//Terapia Respiratoria
			contenidoCeldas.add("");//Cubiculos
			contenidoCeldas.add("");//Material
			contenidoCeldas.add("");//Medicamentos
			contenidoCeldas.add("");//Laboratorio y RX
			contenidoCeldas.add("");//Rentas de equipo
			contenidoCeldas.add("");//Cubiculo
			
			List<Gasto> gastosTmp=evento.getGastos();
			Float montoAntesDesviosEdoCuenta= (float) 0.0;
			Float montoAntesDesvios= (float) 0.0;
			Float desvios = (float) 0.0;
			
			for (int i=0; i<gastosTmp.size();i++){
				Gasto gastoTmp = gastosTmp.get(i);
				if (gastoTmp!=null){
					if (gastoTmp.getIdTipoCargo()==1){
						if (gastoTmp.getIdRubro()==1){
							montoAntesDesviosEdoCuenta=montoAntesDesviosEdoCuenta+gastoTmp.getMontoUnitario();	
						}
						if (gastoTmp.getIdRubro()==2){
							montoAntesDesvios=montoAntesDesvios+gastoTmp.getMontoUnitario();
						}
					}
					if (gastoTmp.getIdTipoCargo()==2){
						desvios=desvios+gastoTmp.getMontoUnitario();
					}
				}
			}
			contenidoCeldas.add(""+montoAntesDesvios);//Monto antes de desvíos
			contenidoCeldas.add(""+desvios);//Total desvíos
			/*
			System.out.println("Monto Antes Desvíos Edo Cuenta:"+montoAntesDesviosEdoCuenta);
			System.out.println("Monto Antes Desvíos Edo Cuenta Final:"+montoAntesDesvios);
			System.out.println("Monto Desvíos"+desvios);
			System.out.println(evento.getIvaFinalizarEvento());
			System.out.println(evento.getCoaseguroFinalizarEvento());
			System.out.println(evento.getDeducibleFinalizarEvento());
			System.out.println(evento.getDescuentoHospFinalizarEvento());
			//Cálculo de desvíos totales
			*/
			Float ivaFinalizarEvento= (float)0.0;
			if (evento.getIvaFinalizarEvento()!=null)
				ivaFinalizarEvento=evento.getIvaFinalizarEvento();
			Float coaseguroFinalizarEvento = (float)0.0;
			if (evento.getCoaseguroFinalizarEvento()!=null){
				coaseguroFinalizarEvento=evento.getCoaseguroFinalizarEvento()/100;
			}
			Float deducibleFinalizarEvento = (float)0.0;
			if (evento.getDeducibleFinalizarEvento()!=null)
				deducibleFinalizarEvento=evento.getDeducibleFinalizarEvento();
			Float descuentoHospFinalizarEvento = (float)0.0;
			if (evento.getDescuentoHospFinalizarEvento()!=null)
				descuentoHospFinalizarEvento=evento.getDescuentoHospFinalizarEvento();
			//$scope.cuentaFinalEdoCuenta=($scope.montoDespuesDesvios+ivaTmp-deducibleTmp-descuentoTmp)*(1-coaseguroTmp);
			
			Float montoCuentaFinalEdoCuenta = (montoAntesDesvios + ivaFinalizarEvento - deducibleFinalizarEvento - descuentoHospFinalizarEvento)* (1-coaseguroFinalizarEvento);  
			//System.out.println("Cálculo cuenta final:"+montoCuentaFinalEdoCuenta);
			contenidoCeldas.add(montoAntesDesvios.toString());//Monto despues de desvíos
			contenidoCeldas.add("");//Descuentos Hospital
			contenidoCeldas.add("");//Cuenta Final Facturación
			contenidoCeldas.add("");//Diferencia Factuación - Monto después de Desvíos
			contenidoCeldas.add("");//Comentarios diferencia 
			contenidoCeldas.add("");//Número de Factura
			contenidoCeldas.add("");//Aprobada / Rechazada
			contenidoCeldas.add("");//Detalle
			contenidoCeldas.add("");//Ajuste Factura
			contenidoCeldas.add("");//Tipo de Comprobante Fiscal Corregido	
			contenidoCeldas.add("");//Folio Comprobante Fiscal Corregido
			contenidoCeldas.add("");//Monto de Comprobante Fiscal Corregido	
			contenidoCeldas.add("");//Descuento No aplicado
			contenidoCeldas.add("");//Cargos Personales
			contenidoCeldas.add("");//Total Desvíos
			contenidoCeldas.add("");//Terapia Intensiva
			contenidoCeldas.add("");//Medicamentos
			contenidoCeldas.add("");//Materiales y Equipo
			contenidoCeldas.add("bs");//Banco de Sangre
			contenidoCeldas.add("0");//Quirófano
			contenidoCeldas.add("0");//Otros
			contenidoCeldas.add("0");//Observaciones
			contenidoCeldas.add("0");//Hora Defunción	
			contenidoCeldas.add("0");//Causa Directa Defunción
			contenidoCeldas.add("");//Capita
			contenidoCeldas.add("");//Cantidad
			
		}		
		return contenidoCeldas;
	}
}
