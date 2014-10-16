package mx.argal.dao;

import java.util.List;


import mx.argal.modelo.Antecedente;
import mx.argal.modelo.Cliente;
import mx.argal.modelo.Evento;
import mx.argal.modelo.Icd;
import mx.argal.modelo.Cpt;
import mx.argal.modelo.Implant;
import mx.argal.modelo.MedicoTratante;

public interface EventoDao {
	
	public List<Evento> obtenerEventos();
	public List<Evento> obtenerEventosByImplant(Implant implant);
	public List<Evento> obtenerEventosByCliente(Cliente cliente);
	public void agregarEvento(Evento evento);
	public void agregarGasto(Evento evento);
	public List<Icd> obtenerIcds();
	public List<MedicoTratante> obtenerMedicosTratantes();
	public void guardarEditarGasto(Evento evento);
	public Evento obtenerEvento(Evento evento);
	public void agregarBitacora(Evento evento);
	public void editarBitacora(Evento evento);
	public List<Evento> obtenerEventosBanco();
	public void registrarAltaPaciente(Evento evento);
	public void finalizarEvento(Evento evento);
	public List<Cpt> obtenerCpts();
	public void agregarFactura(Evento evento);
	public void finalizarMontosEvento(Evento evento);
	public void eliminarGastoEvento(Evento evento);
	public List<Antecedente> obtenerAntecedentes();
	public void agregarMedicoTratante(MedicoTratante medicoTratante);
}
