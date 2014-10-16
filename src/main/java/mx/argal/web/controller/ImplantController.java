package mx.argal.web.controller;

import java.util.ArrayList;
import java.util.List;

import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import mx.argal.modelo.Implant;
import mx.argal.seguridad.modelo.UsuarioSeguridad;
import mx.argal.seguridad.servicios.MttoSeguridadServicio;
import mx.argal.seguridad.util.SeguridadUtil;
import mx.argal.servicios.EventoServicio;
import mx.argal.servicios.ImplantServicio;
import mx.argal.servicios.UsuarioServicio;

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
 * Controller encargado de devolver la vista principal o index de la aplicación.
 * 
 * El path colocado en la anotación @RequestMappig corresponde a la cofiguración dentro
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
@RequestMapping("/implant")
public class ImplantController {
	
	public final String ROLE_ADMINISTRADOR="ROLE_ADMINISTRADOR";
	public final String ROLE_USUARIO="ROLE_USUARIO";
	public final String ROLE_CAPTURISTA="ROLE_CAPTURISTA";
	
	@Autowired
	//private UsuarioServicio usuarioServicio;
	private ImplantServicio implantServicio;	
	@Autowired
	private MttoSeguridadServicio mttoSeguridadServicio;
	
	
	@RequestMapping(value="/guardarimplant",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean guardarImplant(@RequestBody Implant implant){
    	System.out.println("<OTIKA>Guardando!!!"+implant.getIdImplant());
    	System.out.println("<OTIKA>Guardando!!!"+implant.getSuperMedico());
    	String nickTmp=implant.getNombreImplant().substring(0,1)+implant.getAppImplant();
    	implant.setNickImplant(nickTmp);
    	boolean result=this.implantServicio.agregarImplant(implant);
    	UsuarioSeguridad usuarioSeguridad = new UsuarioSeguridad();
    	usuarioSeguridad.setNombre(implant.getNombreImplant()+" "+implant.getAppImplant());
    	//Create nick Implant for secure    	
    	boolean checkForExistentName=false;
    	if (!checkForExistentName){
    		usuarioSeguridad.setUsername(nickTmp);
    		usuarioSeguridad.setPassword(nickTmp);
    		if (implant.getSuperMedico())
    			usuarioSeguridad.setTipoUsuario(3);
    		else
    			usuarioSeguridad.setTipoUsuario(1);
    		mttoSeguridadServicio.agregarUsuarioSeguridad(usuarioSeguridad);    		
    	}
    	return result;  
	}
	
	@RequestMapping(value="/actualizarimplant",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean actualizarImplant(@RequestBody Implant implant){
    	System.out.println("<OTIKA>Guardando!!!"+implant.getIdImplant());
    	System.out.println("<OTIKA>Guardando!!!"+implant.getSuperMedico());
    	return this.implantServicio.actualizarImplant(implant); 
	}
	
	@RequestMapping(value="/eliminarimplant",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean eliminarImplant(@RequestBody Implant implant){
    	System.out.println("<OTIKA>Eliminando!!!"+implant.getIdImplant());
    	System.out.println("<OTIKA>Eliminado!!!"+implant.getSuperMedico());
    	return this.implantServicio.eliminarImplant(implant); 
	}
	
	@RequestMapping(value="/getimplants",method = RequestMethod.POST)
    @ResponseBody
    public List<Implant> obtenerImplants(){
		//System.out.println("<OTIKA>TEST:"+this.eventoServicio.obtenerEventos());
		//System.out.println("<OTIKA>TEST:"+this.eventoServicio.obtenerEventos().get(0).getImplant().getNombreImplant());
		return this.implantServicio.obtenerImplantsActivos();
	}
	
	@RequestMapping(value="/getimplantbyid",method = RequestMethod.GET)
    @ResponseBody
    public Implant obtenerImplantsById(){
		Implant implant = this.implantServicio.obtenerImplantById(100);
		System.out.println(implant.getHospitalesConPermisos().get(0).getIdHospital());
		return implant;
	} 
	 
	@RequestMapping(value="/agregarpermisohospimp",method = RequestMethod.POST)  
    @ResponseBody 
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean agregarPermisoHospImplant(@RequestBody Implant implant){
    	System.out.println("<OTIKA>Guardando!!!"+implant.getIdImplant());
    	System.out.println("<OTIKA>Guardando!!!"+implant.getHospitalesConPermisos().get(0).getIdHospital());
    	return this.implantServicio.agregarPermisoHospImplant(implant); 
	}
	
	@RequestMapping(value="/eliminarpermisohospimp",method = RequestMethod.POST)  
    @ResponseBody 
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public boolean eliminarPermisoHospImplant(@RequestBody Implant implant){
    	System.out.println("<OTIKA>Eliminando!!!"+implant.getIdImplant());
    	System.out.println("<OTIKA>Eliminando!!!"+implant.getHospitalesConPermisos().get(0).getIdHospital());
    	return this.implantServicio.eliminarPermisoHospImplant(implant); 
	}
}
