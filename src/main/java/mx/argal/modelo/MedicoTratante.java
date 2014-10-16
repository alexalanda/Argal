package mx.argal.modelo;

import java.util.Date;
import java.util.List;

public class MedicoTratante extends BaseModelo {
	
	private Integer idMedicoTratante;
	private String nombre;
	private List<EspecialidadMedTratante> especialidadMedTratante;
	private Integer tipo;
	
	public Integer getTipo() {
		return tipo;
	}
	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}
	public List<EspecialidadMedTratante> getEspecialidadMedTratante() {
		return especialidadMedTratante;
	}	
	public void setEspecialidadMedTratante(
			List<EspecialidadMedTratante> especialidadMedTratante) {
		this.especialidadMedTratante = especialidadMedTratante;
	}
	public Integer getIdMedicoTratante() {
		return idMedicoTratante;
	}
	public void setIdMedicoTratante(Integer idMedicoTratante) {
		this.idMedicoTratante = idMedicoTratante;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public MedicoTratante(){
		
	}
	
	public MedicoTratante(Integer idMedicoTratante, String nombre,List<EspecialidadMedTratante> especialidadMedTratante, Integer tipo) {
		super();
		this.idMedicoTratante = idMedicoTratante;
		this.nombre = nombre;
		this.especialidadMedTratante=especialidadMedTratante;
		this.tipo=tipo;
	}

}
