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
public class ServletModPreg extends HttpServlet {
   @Override
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/html");
      response.getWriter().println("Servlet Para modificación de preguntas");
   }

   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {

      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/plain");
      String ruta = request.getRealPath("/");
      ruta += "questions.xml";

      // File preguntas = new File(ruta+"questions.xml");

      String interactionId = request.getParameter("id");

      String text = request.getParameter("text");

      String dragObject1 = request.getParameter("dragObject1");
      String dragObject2 = request.getParameter("dragObject2");
      String dragObject3 = request.getParameter("dragObject3");
      String dragObject4 = request.getParameter("dragObject4");
      ArrayList<String> drags = new ArrayList<String>();
      drags.add(dragObject1);
      drags.add(dragObject2);
      drags.add(dragObject3);
      drags.add(dragObject4);

      String targetObject1 = request.getParameter("targetObject1");
      String targetObject2 = request.getParameter("targetObject2");
      String targetObject3 = request.getParameter("targetObject3");
      String targetObject4 = request.getParameter("targetObject4");
      ArrayList<String> target = new ArrayList<String>();
      target.add(targetObject1);
      target.add(targetObject2);
      target.add(targetObject3);
      target.add(targetObject4);
      
      
      String answer = request.getParameter("answer");

 



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
         
         //Element rootElem = rootElement.getChild("question");
         
         
         
         Attribute atributo = rootElem.getAttribute("id");
         atributo.setValue(interactionId);
         atributo = rootElem.getAttribute("text");
         
         atributo.setValue(text);
         
         atributo = rootElem.getAttribute("answer");
         atributo.setValue(answer);
         
         List<Element> list = rootElem.getChildren();
         

         for (int temp = 0; temp < list.size(); temp++) {
            
            Element pregunta = list.get(temp);
            List<Element> objetos = pregunta.getChildren();
            for(int seleccion = 0; seleccion < objetos.size(); seleccion++ ){
                Element dragsTargets = objetos.get(seleccion);
                String sal= dragsTargets.toString();
            
                if(temp == 0){
                    //si son drags

                    dragsTargets.setText(drags.get(seleccion));   
                }
                else if(temp == 1){
                    //si son targets

                    //out.println(seleccion);
                    dragsTargets.setText(target.get(seleccion));
                }
                    
            }
                
            
                
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
      response.sendRedirect("http://localhost:3000/questions");
   }
}
