package mx.argal.servicios;

import java.util.List;
import java.util.ArrayList;

import mx.argal.dao.EventoDao;
import mx.argal.dao.ClienteDao;
import mx.argal.dao.ImplantDao;
import mx.argal.dao.TipoEventoDao;
import mx.argal.dao.TipoSeguroDao;
import mx.argal.modelo.Cliente;
import mx.argal.modelo.Evento;
import mx.argal.modelo.Icd;
import mx.argal.modelo.Cpt;
import mx.argal.modelo.Implant;
import mx.argal.modelo.MedicoTratante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import mx.sep.sajja.datos.vo.FiltroBusquedaVO;


@Service
public class EventoServicioImpl implements EventoServicio {

	@Autowired
	private EventoDao eventoDao;
	@Autowired
	private TipoEventoDao tipoEventoDao;
	@Autowired
	private TipoSeguroDao tipoSeguroDao;
	@Autowired
	private ClienteDao clienteDao;
	@Autowired
	private ImplantDao implantDao;

	@Override
	public List<Evento> obtenerEventos() {
		// TODO Auto-generated method stub
		try{
			return this.eventoDao.obtenerEventos();
		}
		catch (Exception e){			
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<Evento> obtenerEventosByImplant(Implant implant) {
		// TODO Auto-generated method stub
		try{
			return this.eventoDao.obtenerEventosByImplant(implant);
		}
		catch (Exception e){			
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<Evento> obtenerEventosByCliente(Cliente cliente) {
		// TODO Auto-generated method stub
		try{
			return this.eventoDao.obtenerEventosByCliente(cliente);
		}
		catch (Exception e){			
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public Evento obtenerEvento(Evento evento) {
		// TODO Auto-generated method stub
		try{
			return this.eventoDao.obtenerEvento(evento);
		}
		catch (Exception e){			
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean agregarEvento(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.agregarEvento(evento);
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean eliminarGasto(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.eliminarGastoEvento(evento);
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean guardarEditarGasto(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.guardarEditarGasto(evento);
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}


	@Override
	@SuppressWarnings(value = { "all" })
	public List obtenerDatosCombo() {
		// TODO Auto-generated method stub
		List datosCombo = new ArrayList();
		try{
			datosCombo.add(this.clienteDao.obtenerClientesActivos());
			datosCombo.add(this.tipoSeguroDao.obtenerTiposSeguro());
			datosCombo.add(this.tipoEventoDao.obtenerTiposEvento());						
			datosCombo.add(this.eventoDao.obtenerAntecedentes());
			datosCombo.add(this.implantDao.obtenerImplants());		
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return datosCombo;
	}
	
	@Override
	public List<Icd> obtenerIcds() {
		// TODO Auto-generated method stub
		return this.eventoDao.obtenerIcds();
	}
	
	@Override
	public List<Cpt> obtenerCpts() {
		// TODO Auto-generated method stub
		return this.eventoDao.obtenerCpts();
	}

	@Override
	public List<MedicoTratante> obtenerMedicosTratantes() {
		// TODO Auto-generated method stub
		List<MedicoTratante>  medicosTratantes  = new ArrayList<MedicoTratante>();
		try{
			medicosTratantes=this.eventoDao.obtenerMedicosTratantes();
		}
		catch(Exception e){
			System.out.println("ERROR"+e.getMessage());
			}
		return medicosTratantes;
		}
	
	@Override
	public boolean agregarGasto(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.agregarGasto(evento);
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean agregarBitacora(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.agregarBitacora(evento);
			return true;
		}
		catch(Exception e){
			System.out.println("ERROR GUARDANDO LA BITACORA:"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean agregarFactura(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.agregarFactura(evento);
			return true;
		}
		catch(Exception e){
			System.out.println("ERROR GUARDANDO LA FACTURA:"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean finalizarMontosEvento(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.finalizarMontosEvento(evento);
			return true;
		}
		catch(Exception e){
			System.out.println("ERROR GUARDANDO LA FACTURA:"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}

	
	@Override
	public boolean editarBitacora(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.editarBitacora(evento);
			return true;
		}
		catch(Exception e){
			System.out.println("ERROR GUARDANDO LA BITACORA:"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	@Override
	public boolean registrarAltaPaciente(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.registrarAltaPaciente(evento);
			return true;
		}
		catch(Exception e){
			System.out.println("ERROR GUARDANDO LA BITACORA:"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	@Override
	public boolean finalizarEvento(Evento evento) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.finalizarEvento(evento);
			return true;
		}
		catch(Exception e){
			System.out.println("ERROR GUARDANDO LA BITACORA:"+e.getMessage());
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean agregarMedicoTratante(MedicoTratante medicoTratante) {
		// TODO Auto-generated method stub
		try{
			this.eventoDao.agregarMedicoTratante(medicoTratante);
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	

}
