package questions;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author
 */
public class BorrarPreg extends HttpServlet {
   @Override
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/html");
      response.getWriter().println("Servlet Para Borrar Preguntas");
   }

   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {

      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/plain");
      String ruta = request.getRealPath("/");
      ruta += "questions.xml";

      // File preguntas = new File(ruta+"questions.xml");

      String interactionId = request.getParameter("idPreg");


      

      PrintWriter out = response.getWriter();
 
      try {
         File inputFile = new File(ruta);
         SAXBuilder saxBuilder = new SAXBuilder();
         Document document = saxBuilder.build(inputFile);
         Element rootElement = document.getRootElement();

         
         List<Element> todasLasPreguntas = rootElement.getChildren();
         
         
         Element rootElem = rootElement.getChild("question");
         Attribute identifi;
         //localizar la pregunta desada
         for(int i = 0;i!=todasLasPreguntas.size();i++){
             rootElem = todasLasPreguntas.get(i);
             identifi = rootElem.getAttribute("id");
             String no = identifi.getValue();
             if(no.equals(interactionId))
                   break;
         }
         
         
         rootElement.removeContent(rootElem);
         
         /*
         List<Element> contenido = rootElem.getChildren();
         
         for(int i = 0; i!=contenido.size();i++){
             Element basura = contenido.get(i);
             rootElem.removeContent(basura);
             
         }
         rootElem.removeContent();
         
         */
         
         out.println("Se borrado la pregunta");
          //out.print(document);
         try {
                FileWriter writer = new FileWriter(ruta);
                XMLOutputter outputter = new XMLOutputter();
                outputter.setFormat(Format.getPrettyFormat());
                outputter.output(document, writer);
                outputter.output(document, System.out);
                writer.close(); // close writer
            } catch (IOException e) {
                e.printStackTrace();
            } 
      } catch (JDOMException e) {
         e.printStackTrace();
      } catch (IOException e) {
         e.printStackTrace();
      }
      response.sendRedirect("http://localhost:8080/questions");

   }
}

