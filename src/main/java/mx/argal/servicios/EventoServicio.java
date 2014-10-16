package mx.argal.servicios;

import java.util.List;

import mx.argal.modelo.Cliente;
import mx.argal.modelo.Evento;
import mx.argal.modelo.Icd;
import mx.argal.modelo.Cpt;
import mx.argal.modelo.Implant;
import mx.argal.modelo.MedicoTratante;

//import mx.sep.sajja.datos.vo.FiltroBusquedaVO;
 
public interface EventoServicio {
	List<Evento> obtenerEventos();
	List<Evento> obtenerEventosByImplant(Implant implant);
	List<Evento> obtenerEventosByCliente(Cliente cliente);
	public boolean agregarEvento(Evento evento);
	public boolean agregarGasto(Evento evento);
	public List obtenerDatosCombo();	
	public List<Icd> obtenerIcds();
	public List<MedicoTratante> obtenerMedicosTratantes();
	public boolean guardarEditarGasto(Evento evento);
	public Evento obtenerEvento(Evento evento);
	public boolean agregarBitacora(Evento evento);
	public boolean editarBitacora(Evento evento);
	public boolean registrarAltaPaciente(Evento evento);
	public boolean finalizarEvento(Evento evento);
	public List<Cpt> obtenerCpts();
	public boolean agregarFactura(Evento evento);
	public boolean finalizarMontosEvento(Evento evento);
	public boolean eliminarGasto(Evento evento);
	public boolean agregarMedicoTratante(MedicoTratante medicoTratante);
	
}
