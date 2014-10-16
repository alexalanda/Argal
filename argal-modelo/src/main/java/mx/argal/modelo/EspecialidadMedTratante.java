package mx.argal.modelo;

import java.util.Date;

public class EspecialidadMedTratante extends BaseModelo {
	
	private Integer idMedicoTratante;
	private String descripcion;
		
	public Integer getIdMedicoTratante() {
		return idMedicoTratante;
	}
	public void setIdMedicoTratante(int idMedicoTratante) {
		this.idMedicoTratante = idMedicoTratante;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public EspecialidadMedTratante(){
		
	}
	
	public EspecialidadMedTratante(Integer idMedicoTratante, String descripcion) {
		super();
		this.idMedicoTratante = idMedicoTratante;
		this.descripcion = descripcion;
	}
 	
}
