package mx.argal.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import mx.argal.modelo.Evento;
import mx.argal.modelo.Implant;
import mx.argal.seguridad.modelo.UsuarioSeguridad;
import mx.argal.seguridad.servicios.MttoSeguridadServicio;
import mx.argal.seguridad.util.SeguridadUtil;
import mx.argal.servicios.ImplantServicio;
import mx.argal.servicios.UsuarioServicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/index")
public class IndexController {
	
	public final String ROLE_ADMINISTRADOR="ROLE_ADMINISTRADOR";
	public final String ROLE_IMPLANT="ROLE_IMPLANT";
	public final String ROLE_CLIENTE="ROLE_CLIENTE";
	
	@Autowired
	//private UsuarioServicio usuarioServicio;
	private ImplantServicio implantServicio;
	
	@Autowired
	private MttoSeguridadServicio mttoSeguridadServicio;

	
	@RequestMapping(method = RequestMethod.GET)
    public ModelAndView mostrarIndex(HttpServletRequest request){	    	    
    	UsuarioSeguridad usuario = SeguridadUtil.getUsuarioActual();    	
    	String rol="";
    	System.out.println("<OTIKA>RFCenLogin:"+usuario.getNombre());
    	System.out.println("<OTIKA>Login!"+((SecurityContextImpl)request.getSession().getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication().getPrincipal().toString());    	
    	if ( ((SecurityContextImpl)request.getSession().getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication().getAuthorities().size()>0){
    		Iterator it = ((SecurityContextImpl)request.getSession().getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication().getAuthorities().iterator();
    		while (it.hasNext()){
    			rol=it.next().toString();
    			request.getSession().setAttribute("rolUser",rol);
    			request.getSession().setAttribute("userSession",usuario.getUsername());    			
    			request.getSession().setAttribute("msj","Bienvenido "+usuario.getNombre());
    			break;
    		}    		
    	}     	
    	if ( rol.equals(ROLE_ADMINISTRADOR)) {    		
    		Implant implant=new Implant();
    		implant.setNickImplant(usuario.getUsername());
    		implant=this.implantServicio.obtenerImplantByNick(implant);
    		System.out.println("ID DEL IMPLANT:"+implant.getIdImplant());
			request.getSession().setAttribute("idImplantLogin",implant.getIdImplant());    			

    		return new ModelAndView("index/index", "usuario", usuario);
    	}
    	if ( rol.equals(ROLE_IMPLANT)) {
    		Implant implant=new Implant();
    		implant.setNickImplant(usuario.getUsername());
    		implant=this.implantServicio.obtenerImplantByNick(implant);
    		System.out.println("ID DEL IMPLANT:"+implant.getIdImplant());
			request.getSession().setAttribute("idImplantLogin",implant.getIdImplant());    			    	
    		return new ModelAndView("index/index", "usuario", usuario);
    	}
    	if ( rol.equals(ROLE_CLIENTE)) {        	
    		return new ModelAndView("index/index", "usuario", usuario);
    	}    	    	    	   
    	return new ModelAndView("index/index", "usuario", usuario);
    }
	
	@RequestMapping(value="/obteneruserseguridad",method = RequestMethod.POST)
    @ResponseBody
    //public boolean guardarImplant(@ModelAttribute(value="implant") Implant implant, BindingResult result){
    public UsuarioSeguridad obtenerUsuarioSeguridad(HttpServletRequest request, @RequestBody UsuarioSeguridad usuario){		
    	System.out.println("<OTIKA>Obteniendo UsuarioSeguridad!!!"+request.getSession().getAttribute("userSession"));
    	if (request.getSession().getAttribute("userSession")!=null)
    		usuario.setUsername(request.getSession().getAttribute("userSession").toString());
    	List<UsuarioSeguridad> userTmp = new ArrayList<UsuarioSeguridad>();
    	userTmp=this.mttoSeguridadServicio.consultarUsuariosByUser(usuario);
    	if (userTmp!=null){
    		if (request.getSession().getAttribute("rolUser").equals(ROLE_ADMINISTRADOR))
    			userTmp.get(0).setTipoUsuario(3);
    		if (request.getSession().getAttribute("rolUser").equals(ROLE_CLIENTE))
    			userTmp.get(0).setTipoUsuario(2);
    		if (request.getSession().getAttribute("rolUser").equals(ROLE_IMPLANT))
    			userTmp.get(0).setTipoUsuario(1);
    		return userTmp.get(0);
    	}
    	else
    		return null;
	}

}
