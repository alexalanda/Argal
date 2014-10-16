package mx.argal.web.controller;
import java.io.IOException;
import java.util.Calendar;
import java.util.Iterator;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.util.FileCopyUtils;
import mx.argal.web.util.UploadFile;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;

@Controller
@RequestMapping("/cont")
public class RestController {
	UploadFile ufile;	
public RestController(){
System.out.println("init RestController");
ufile = new UploadFile();
}
@RequestMapping(value = "/get/{value}", method = RequestMethod.GET)
public void get(HttpServletResponse response,@PathVariable String value){
	try {
	response.setContentType(ufile.type);
	response.setContentLength(ufile.length);
	FileCopyUtils.copy(ufile.bytes, response.getOutputStream());
	} catch (IOException e) {
		System.out.println(e.getMessage());
	}
}
@RequestMapping(value = "/upload", method = RequestMethod.POST)
public @ResponseBody String upload(MultipartHttpServletRequest request, HttpServletResponse response) { 
	Iterator<String> itr =request.getFileNames();
	MultipartFile mpf = request.getFile(itr.next());
	System.out.println(mpf.getOriginalFilename() +" uploaded!");	
	System.out.println(request.getParameter("idEventoHidden"));
	String subCarpeta= request.getParameter("idEventoHidden");
	try {
		ufile.idEvento = mpf.getBytes().length;
		ufile.length = mpf.getBytes().length;
		ufile.bytes= mpf.getBytes();
		ufile.type = mpf.getContentType();
		ufile.name = mpf.getOriginalFilename();		
	//Saving file
		String content = "This is the content to write into file";		 		
		String filename= "c:\\logs\\facturas\\"+subCarpeta+"\\"+ ufile.name;
		String s = "Java Code Geeks - Java Examples";
		File file = new File(filename);		
		FileOutputStream fos = null;
		fos = new FileOutputStream(file);
		fos.write(ufile.bytes);		
		fos.close();
		System.out.println("Done"+ufile.length);
	}
	catch (IOException e) {
		e.printStackTrace();
}
return "<img src='http://localhost:8080/argal-web/mvc/cont/get/"+Calendar.getInstance().getTimeInMillis()+"'/>";
	//return null;
}

@RequestMapping(value = "/uploadgasto", method = RequestMethod.POST)
public @ResponseBody String uploadGasto(MultipartHttpServletRequest request, HttpServletResponse response) { 
	Iterator<String> itr =request.getFileNames();
	MultipartFile mpf = request.getFile(itr.next());
	System.out.println(mpf.getOriginalFilename() +" uploaded!");	
	System.out.println(request.getParameter("idEventoHidden"));
	String subCarpeta= request.getParameter("idEventoHidden");
	try {
		ufile.idEvento = mpf.getBytes().length;
		ufile.length = mpf.getBytes().length;
		ufile.bytes= mpf.getBytes();
		ufile.type = mpf.getContentType();
		ufile.name = mpf.getOriginalFilename();		
		//Saving file
		String content = "This is the content to write into file";		 		
		String filename= "c:\\logs\\gastos\\"+subCarpeta+"\\"+ ufile.name;
		String s = "Java Code Geeks - Java Examples";
		File file = new File(filename);		
		FileOutputStream fos = null;
		fos = new FileOutputStream(file);
		fos.write(ufile.bytes);		
		fos.close();
		System.out.println("Done"+ufile.length);
	}
	catch (IOException e) {
		e.printStackTrace();
}
return "<img src='http://localhost:8080/argal-web/mvc/cont/get/"+Calendar.getInstance().getTimeInMillis()+"'/>";
	//return null;
}
}