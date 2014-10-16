package mx.argal.web.util;

import jxl.*; 
import java.io.*; 

public class ReadExcel { 

	public void leerArchivoExcel(String archivoDestino) { 
			try { 
				Workbook archivoExcel = Workbook.getWorkbook(new File(archivoDestino)); 
				System.out.println("N�mero de Hojas\t"+ archivoExcel.getNumberOfSheets()); 
				for (int sheetNo = 0; sheetNo < archivoExcel.getNumberOfSheets(); sheetNo++){ // Recorre 
					// cada    
					// hoja                                                                                                                                                       					 
					Sheet hoja = archivoExcel.getSheet(sheetNo); 
					int numColumnas = hoja.getColumns(); 
					int numFilas = hoja.getRows(); 
					String data; 
					System.out.println("Nombre de la Hoja\t" + archivoExcel.getSheet(sheetNo).getName()); 
					for (int fila = 0; fila < numFilas; fila++) { // Recorre cada 
						// fila de la 
						//hoja 
						for (int columna = 0; columna < numColumnas; columna++) { // Recorre                                                                                
							// cada                                                                                
							// columna                                                                            
							// de                                                                                
							// la                                                                                
							// fila 
							data = hoja.getCell(columna, fila).getContents(); 
							System.out.print(data + " "); 

						} 
						System.out.println("\n"); 
				     } 
				} 
			} catch (Exception ioe) { 
				ioe.printStackTrace(); 
			} 
	}
} 
