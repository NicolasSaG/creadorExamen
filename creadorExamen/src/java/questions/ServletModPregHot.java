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
public class ServletModPregHot extends HttpServlet {
   @Override
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType("text/html");
      response.getWriter().println("Servlet Para modificación de preguntas hotspost");
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

      String hotspotInstanceName1 = request.getParameter("hotspotInstanceName1");
      String hotspotInstanceName2 = request.getParameter("hotspotInstanceName2");
      String hotspotInstanceName3 = request.getParameter("hotspotInstanceName3");
      String hotspotInstanceName4    = request.getParameter("hotspotInstanceName4");
      ArrayList<String> hotsposts = new ArrayList<String>();
      hotsposts.add(hotspotInstanceName1);
      hotsposts.add(hotspotInstanceName2);
      hotsposts.add(hotspotInstanceName3);
      hotsposts.add(hotspotInstanceName4);

      String correct1 = request.getParameter("correct1");
      String correct2 = request.getParameter("correct2");
      String correct3 = request.getParameter("correct3");
      String correct4 = request.getParameter("correct4");
     
      if(correct1 == null){
        correct1 = "false";
      }
      if(correct2 == null){
        correct2 = "false";
      }
      if(correct3 == null){
        correct3 = "false";
      }
      if(correct4 == null){
        correct4 = "false";
      }
      
      ArrayList<String> corrects = new ArrayList<String>();
      corrects.add(correct1);
      corrects.add(correct2);
      corrects.add(correct3);
      corrects.add(correct4);
      String mini1 = "";
      String mini2 = "";
      String mini3 = "";
      String mini4 = "";
      String answerAtt = "";
      
    
        if(correct1.equals("true")) mini1="1-1;"; 
            else mini1="1-0;";
            if(correct2.equals("true")) mini2="2-1;"; 
            else mini2="2-0;";
            if(correct3.equals("true")) mini3="3-1;"; 
            else mini3="3-0;";
            if(correct4.equals("true")) mini4="4-1" ; 
            else mini4="4-0" ;
            
            answerAtt = "" + mini1+mini2+mini3+mini4;   
 
      
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
         atributo.setValue(answerAtt);
         
         List<Element> list = rootElem.getChildren();
         

         for (int temp = 0; temp < list.size(); temp++) {       
            Element pregunta = list.get(temp);
            List<Element> objetos = pregunta.getChildren();
            for(int seleccion = 0; seleccion < objetos.size(); seleccion++ ){
                Element hotspostsE = objetos.get(seleccion);
                String sal= hotspostsE.toString();
                if(temp == 0){
                    //si son drags
                    hotspostsE.setText(hotsposts.get(seleccion));   
                }
                else if(temp == 1){
                    //si son targets
                    //out.println(seleccion);
                    hotspostsE.setText(corrects.get(seleccion));
                }
                    
            }      
         }
         

         try {
                FileWriter writer = new FileWriter(ruta);
                XMLOutputter outputter = new XMLOutputter();
                outputter.setFormat(Format.getPrettyFormat());
                outputter.output(document, writer);
                //outputter.output(document, System.out);
                writer.close(); // close writer
            } catch (IOException e) {
                e.printStackTrace();
            } 
      } catch (JDOMException e) {
         e.printStackTrace();
      } catch (IOException e) {
         e.printStackTrace();
      }
      response.sendRedirect("http://localhost:8080/");
   }
}
