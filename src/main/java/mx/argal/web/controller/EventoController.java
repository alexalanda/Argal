package mx.argal.web.controller;

import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.Iterator;
import javax.servlet.http.HttpServletRequest;
import mx.argal.modelo.Cliente;
import mx.argal.modelo.Evento;
import mx.argal.modelo.Icd;
import mx.argal.modelo.Cpt;
import mx.argal.modelo.Implant;
import mx.argal.modelo.MedicoTratante;
import mx.argal.seguridad.modelo.UsuarioSeguridad;
import mx.argal.seguridad.util.SeguridadUtil;
import mx.argal.servicios.ClienteServicio;
import mx.argal.servicios.EventoServicio;
import mx.argal.servicios.EventoServicio;
import mx.argal.servicios.ImplantServicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller encargado de devolver la vista principal o index de la aplicaci√≥n.
 * 
 * El path colocado en la anotaci√≥n @RequestMappig corresponde a la cofiguraci√≥n dentro
 * del archivo web.xml
 * 
 * <pre>
 * {@code
 *   <welcome-file-list>
 *       <welcome-file>mvc/index</welcome-file>
 *   </welcome-file-list>   
 * }
 * </pre>
 * 
 * @author SmartSolutions
 *
 */
@Controller
@RequestMapping("/evento")
public class EventoController {
	
	public final String ROLE_ADMINISTRADOR="ROLE_ADMINISTRADOR";
	public final String ROLE_IMPLANT="ROLE_IMPLANT";
	public final String ROLE_CLIENTE="ROLE_CLIENTE";
	
	@Autowired
	private EventoServicio eventoServicio;	
	
	@Autowired
	private ImplantServicio implantServicio;
	
	@Autowired
	private ClienteServicio clienteServicio;
	
	@RequestMapping(value="/guardareventoeditar",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean guardarEventoEditar(@RequestBody Evento evento,HttpServletRequest request){
		if (request.getSession().getAttribute("idImplantLogin")!=null){
			evento.getImplant().setIdImplant(Integer.parseInt(request.getSession().getAttribute("idImplantLogin").toString()));
		}
			
    	System.out.println("<OTIKA>Guardando!!!"+evento.getImplant().getIdImplant());
    	System.out.println("<OTIKA>Guardando Aseguradora!!!"+evento.getRegistroGastosMayores());
    	System.out.println("<OTIKA>Guardando Banco!!"+evento.getRegistroSeguroPersonal());
    	/*Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	evento.setFechaCaptura(date);
    	evento.setFechaIngreso(date);*/
    	return true;
    	//return this.eventoServicio.agregarEvento(evento); 
	}
	
	@RequestMapping(value="/guardarevento",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean guardarEvento(@RequestBody Evento evento,HttpServletRequest request){
		if (request.getSession().getAttribute("idImplantLogin")!=null){
			evento.getImplant().setIdImplant(Integer.parseInt(request.getSession().getAttribute("idImplantLogin").toString()));
		}
		
		System.out.println("<OTIKA>Guardando!!!"+evento.getImplant().getIdImplant());
		System.out.println("<OTIKA>Guardando!!!"+evento.getHoraIngreso());    	
		System.out.println("<OTIKA>Guardando Aseguradora!!!"+evento.getRegistroGastosMayores());
    	System.out.println("<OTIKA>Guardando Banco!!"+evento.getRegistroSeguroPersonal());
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	evento.setFechaCaptura(date);
    	evento.setFechaIngreso(date);
    	
    	return this.eventoServicio.agregarEvento(evento); 
	}
	
	@RequestMapping(value="/guardarmedtrat",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean guardarMedicoTratante(@RequestBody MedicoTratante medicoTratante,HttpServletRequest request){
		System.out.println("<OTIKA>Guardando!!!"+medicoTratante);
    	//return this.eventoServicio.agregarEvento(evento); 
		this.eventoServicio.agregarMedicoTratante(medicoTratante);
		return true;
	}
	
	@RequestMapping(value="/obtenereventobyid",method = RequestMethod.POST)
    @ResponseBody
    public Evento obtenerEvento(@RequestBody Evento evento){
    	System.out.println("<OTIKA>Obteniendo evento!!!"+evento.getIdEvento());    	    	
    	return this.eventoServicio.obtenerEvento(evento); 
	}
	
	@RequestMapping(value="/gettipousuario",method = RequestMethod.POST)
    @ResponseBody
    public int tipoUsuario(HttpServletRequest request){
    	System.out.println("<OTIKA>Obteniendo tipo usuario!!!");    	    	
    	int tipoUsuario=0;
    	String rol = ""+request.getSession().getAttribute("rolUser");
    	if (rol.equals(ROLE_ADMINISTRADOR))
    		return 3;
    	if (rol.equals(ROLE_IMPLANT))
    		return 1;
    	if (rol.equals(ROLE_CLIENTE))
    		return 2;
    	return 0;
	}

	
	@RequestMapping(value="/geteventos",method = RequestMethod.POST)
    @ResponseBody
    public List<Evento> obtenerEventos(HttpServletRequest request){
		System.out.println("<OTIKA>TEST:"+this.eventoServicio.obtenerEventos());
		String nickImplant=""+request.getSession().getAttribute("userSession");
		System.out.println("<OTIKA>TEST GET EVENTOS FOR:"+nickImplant);
		
		String rol="";
		rol=""+request.getSession().getAttribute("rolUser");
		System.out.println("<OTIKA>TEST GET EVENTOS WHIT ROLE:"+rol);
		if (rol!=null){
			if (rol.equals(ROLE_IMPLANT)){
				Implant implant = new Implant();
				implant.setNickImplant(nickImplant);
				implant=this.implantServicio.obtenerImplantByNick(implant);
				return this.eventoServicio.obtenerEventosByImplant(implant);
			}
			if (rol.equals(ROLE_CLIENTE)){
				Cliente cliente = new Cliente();
				cliente.setNickCliente(nickImplant);				
				cliente = this.clienteServicio.obtenerClienteByNick(cliente);
				return this.eventoServicio.obtenerEventosByCliente(cliente);
			}
		}
		return this.eventoServicio.obtenerEventos();
	}
	
	@RequestMapping(value="/getcombovalues",method = RequestMethod.POST)
    @ResponseBody
    public List obtenerComboValues(){
		System.out.println("<OTIKA>Getcombovalues");
		return this.eventoServicio.obtenerDatosCombo();
	}
	
	@RequestMapping(value="/geticds",method = RequestMethod.POST)
    @ResponseBody
    public List<Icd> obtenerIcds(){
		System.out.println("<OTIKA>GetIcds");
		return this.eventoServicio.obtenerIcds();
	}
	
	@RequestMapping(value="/getcpts",method = RequestMethod.POST)
    @ResponseBody
    public List<Cpt> obtenerCpts(){
		System.out.println("<OTIKA>GetCpts");
		return this.eventoServicio.obtenerCpts();
	}

	@RequestMapping(value="/getmedicostratantes",method = RequestMethod.POST)
    @ResponseBody
    public List<MedicoTratante> obtenerMedicosTratantes(){
		System.out.println("<OTIKA>GetcombovaluesMT");
		List<MedicoTratante>  medicosTratantes  = new ArrayList<MedicoTratante>();
		try{
			medicosTratantes=eventoServicio.obtenerMedicosTratantes();
			System.out.println("<OTIKA>"+medicosTratantes.size());
			System.out.println(medicosTratantes.get(0));
			System.out.println(medicosTratantes.get(1));

		}
		catch(Exception e){
			System.out.println("ERROR:"+e.getMessage());
		}
		return medicosTratantes;
	}
	
	@RequestMapping(value="/guardargasto",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento guardarGasto(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Guardando GASTO!!"+evento.getGastos());    	
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	evento.setFechaCaptura(date);
    	evento.setFechaIngreso(date);
    	evento.getGastos().get(1).setFechaIngreso(date);
    	this.eventoServicio.agregarGasto(evento);
    	return this.eventoServicio.obtenerEvento(evento);
	}
	
	@RequestMapping(value="/eliminargasto",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento EliminarGasto(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Eliminando GASTO!!"+evento.getGastos());    	    	
    	this.eventoServicio.eliminarGasto(evento);
    	return this.eventoServicio.obtenerEvento(evento);
	}
	
	
	
	@RequestMapping(value="/guardareditargasto",method = RequestMethod.POST)
    @ResponseBody
	public Evento guardarEditarGasto(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Actualizando Gasto evento!!"+evento.getGastos());    	
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	evento.setFechaCaptura(date);
    	evento.setFechaIngreso(date);
    	evento.getGastos().get(1).setFechaIngreso(date);
    	this.eventoServicio.guardarEditarGasto(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	System.out.println(evento);
    	return evento;    			
	} 	
	
	@RequestMapping(value="/guardarbitacora",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento guardarBitacora(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Guardando Bit·cora!!"+evento.getBitacoras());    	
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	if (evento.getBitacoras().get(0)!=null)
    		evento.getBitacoras().get(0).setFechaBitacora(date);    	
    	else {if (evento.getBitacoras().get(1)!=null)
    		evento.getBitacoras().get(1).setFechaBitacora(date);
    	}
    	this.eventoServicio.agregarBitacora(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	return evento;
	}
	
	@RequestMapping(value="/guardarfactura",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento guardarFactura(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Guardando Facturas!!"+evento.getFacturas());    	
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	/*if (evento.getBitacoras().get(0)!=null)
    		evento.getBitacoras().get(0).setFechaBitacora(date);    	
    	else {if (evento.getBitacoras().get(1)!=null)
    		evento.getBitacoras().get(1).setFechaBitacora(date);
    	}*/
    	this.eventoServicio.agregarFactura(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	return evento;
	}
	
	@RequestMapping(value="/finalizarmontosevento",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento finalizarMontosEvento(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Finalizando Evento!!"+evento);    	
    	/*if (evento.getBitacoras().get(0)!=null)
    		evento.getBitacoras().get(0).setFechaBitacora(date);    	
    	else {if (evento.getBitacoras().get(1)!=null)
    		evento.getBitacoras().get(1).setFechaBitacora(date);
    	}*/
    	this.eventoServicio.finalizarMontosEvento(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	return evento;
	}

	
	@RequestMapping(value="/guardareditarbitacora",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento guardarEditarBitacora(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Guardando Bit·cora!!"+evento.getBitacoras());    	
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	if (evento.getBitacoras().get(0)!=null)
    		evento.getBitacoras().get(0).setFechaBitacora(date);    	
    	else {if (evento.getBitacoras().get(1)!=null)
    		evento.getBitacoras().get(1).setFechaBitacora(date);
    	}
    	this.eventoServicio.editarBitacora(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	return evento;
	}
	
	@RequestMapping(value="/registraraltapaciente",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento altaPaciente(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Guardando AltaPaciente!!"+evento);    	
    	Date date = new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	evento.setFechaEgreso(date);
    	this.eventoServicio.registrarAltaPaciente(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	return evento;
	}
	
	
	@RequestMapping(value="/finalizarevento",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public Evento finalizarEvento(@RequestBody Evento evento){    	
    	System.out.println("<OTIKA>Guardando Bit·cora!!"+evento);    	    	
    	this.eventoServicio.finalizarEvento(evento);
    	evento=this.eventoServicio.obtenerEvento(evento);
    	return evento;
	}
			
}
