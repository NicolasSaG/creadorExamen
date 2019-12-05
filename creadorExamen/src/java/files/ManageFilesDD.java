/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package files;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

/**
 *
 * @author fnico
 */
public class ManageFilesDD extends HttpServlet {

    private boolean isMultipart;
    private String filePath;
    private int maxFileSize = 50 * 1024*1024;
    private int maxMemSize = 4 * 1024*1024;
    private File file ;

    public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, java.io.IOException {
   
        
        String ruta = request.getRealPath("/");
        String nom = "";
        
        
      //leer arhcivo de preguntas, obtener la ultima, jalar nombres de archivos y ponerselos en el archivo xml,
      //guardarlos despues
      // Check that we have a file upload request
      
      //obtener la ruta del lugar en el que estoy del servidor
      filePath = request.getRealPath("/"); 
      isMultipart = ServletFileUpload.isMultipartContent(request);
      response.setContentType("text/html");
      java.io.PrintWriter out = response.getWriter( );
   
      if( !isMultipart ) {
          System.out.println("Server: error, archivo multiparte");
         return;
      }
                
      DiskFileItemFactory factory = new DiskFileItemFactory();
   
      // maximum size that will be stored in memory
      factory.setSizeThreshold(maxMemSize);
   
      // Location to save data that is larger than maxMemSize.
      factory.setRepository(new File(filePath));

      // Create a new file upload handler
      ServletFileUpload upload = new ServletFileUpload(factory);
   
      // maximum file size to be uploaded.
      upload.setSizeMax( maxFileSize );

      try { 
         // Parse the request to get file items.
         List fileItems = upload.parseRequest(request);
	
         // Process the uploaded file items
         Iterator i = fileItems.iterator();

         while ( i.hasNext () ) {
            FileItem fi = (FileItem)i.next();
            if ( !fi.isFormField () ) {
               // Get the uploaded file parameters
               String fieldName = fi.getFieldName();
               String fileName = fi.getName();
               String contentType = fi.getContentType();
               boolean isInMemory = fi.isInMemory();
               long sizeInBytes = fi.getSize();
               nom = fileName;
               // Write the file
               if( fileName.lastIndexOf("\\") >= 0 ) {
                  file = new File( filePath + "images"+ fileName.substring( fileName.lastIndexOf("\\"))) ;
               } else {
                  file = new File( filePath +"images"+ fileName.substring(fileName.lastIndexOf("\\")+1)) ;
               }
               fi.write( file ) ;
               nom = fileName;
                System.out.println("Archivo subido: " + fileName);
            }
         }
         } catch(Exception ex) {
            System.out.println(ex);
         }
      
      try{
            SAXBuilder builder = new SAXBuilder();
            File questions = new File(ruta+"questions.xml");
            Document document = builder.build(questions);
            Element root = document.getRootElement();
            List lista = root.getChildren("question");
                //leer todos los usuarios del archivo
            Element lastQuestion =(Element)lista.get(lista.size()-1);
            List<Element> listDrag = lastQuestion.getChildren("drags");
            Element drags =  listDrag.get(0);
            List<Element> dragsList =  drags.getChildren();
            System.out.println("elementos en drag: "+ listDrag.size());
            System.out.println("elementos dentro de drags: "+ dragsList.size());
            for (int i = 0; i < dragsList.size(); i++) {       
                
                Element option = dragsList.get(i);
                option.setAttribute("src", nom);
            }
            try {
                FileWriter writer = new FileWriter(ruta+"questions.xml");
                XMLOutputter outputter = new XMLOutputter();
                outputter.setFormat(Format.getPrettyFormat());
                outputter.output(document, writer);
                //outputter.output(document, System.out);
                writer.close(); // close writer
            } catch (IOException e) {
                e.printStackTrace();
            } 
        }
        catch(JDOMException e){
            //e.printStackTrace();
        }
      
      }
      
      public void doGet(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, java.io.IOException 
      {

         throw new ServletException("GET method used with " +
            getClass( ).getName( )+": POST method required.");
      }
}
