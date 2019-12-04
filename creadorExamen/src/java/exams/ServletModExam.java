package exams;

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
public class ServletModExam extends HttpServlet {
   @Override
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/html");
      response.getWriter().println("Servlet Para modificación de Examenes");
   }

   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {

      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/plain");
      String ruta = request.getRealPath("/");
      ruta += "exams.xml";

      // File preguntas = new File(ruta+"questions.xml");

      String interactionId = request.getParameter("id");
      String Titulo = request.getParameter("texto");
      
      
      String Pregunta0 = request.getParameter("Pregunta0");
      String Pregunta1 = request.getParameter("Pregunta1");
      String Pregunta2 = request.getParameter("Pregunta2");
      String Pregunta3 = request.getParameter("Pregunta3");
      String Pregunta4 = request.getParameter("Pregunta4");
      String Pregunta5 = request.getParameter("Pregunta5");
      String Pregunta6 = request.getParameter("Pregunta6");
      String Pregunta7 = request.getParameter("Pregunta7");
      String Pregunta8 = request.getParameter("Pregunta8");
      String Pregunta9 = request.getParameter("Pregunta9");
      
      ArrayList<String> preguntas = new ArrayList<String>();
      preguntas.add(Pregunta0);
      preguntas.add(Pregunta1);
      preguntas.add(Pregunta2);
      preguntas.add(Pregunta3);
      preguntas.add(Pregunta4);
      preguntas.add(Pregunta5);
      preguntas.add(Pregunta6);
      preguntas.add(Pregunta7);
      preguntas.add(Pregunta8);
      preguntas.add(Pregunta9);
      
      try {
         File inputFile = new File(ruta);
         SAXBuilder saxBuilder = new SAXBuilder();
         Document document = saxBuilder.build(inputFile);
         Element rootElement = document.getRootElement();

         List<Element> todosLosExamenes = rootElement.getChildren();
         
         //List<Element> todasLasPreguntas = rootElement.getChildren();
         
         Element rootElem = rootElement.getChild("exam");
         Attribute identifi;
         //localizar el examen deseado
         for(int i = 0;i!=todosLosExamenes.size();i++){
             rootElem = todosLosExamenes.get(i);
             identifi = rootElem.getAttribute("id");
             String no = identifi.getValue();
             if(no.equals(interactionId))
                   break;
             
         }
         
         //aquí ya se va a tener el examen que se quiere
         
         Attribute atributo = rootElem.getAttribute("id");
         atributo.setValue(interactionId);
         atributo = rootElem.getAttribute("text");
         
         atributo.setValue(Titulo);

         
         
         List<Element> list = rootElem.getChildren();
         

            for(int seleccion = 0; seleccion < list.size(); seleccion++ ){
                Element pregunta = list.get(seleccion);
                pregunta.setText(preguntas.get(seleccion));   
         }
         

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
      response.sendRedirect("http://localhost:8080/exams");
   }
}
