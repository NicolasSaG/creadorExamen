package exams;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;
/**
 *
 * @author fnico
 */
public class CreateExam extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        
        response.setContentType("text/html");
        response.getWriter().println("create exam get");
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONArray preguntas;
        response.addHeader("Access-Control-Allow-Origin", "*"); 
        response.setContentType("text/plain");
        
        //convertir body de request en string
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String data = buffer.toString();
        
        //obtener atributos de string json
        try {
            Object obj = new JSONParser().parse(data);
            JSONObject jo = (JSONObject) obj; 
            Map questions = ((Map)jo.get("aux"));
            preguntas = (JSONArray) questions.get("questions");
            for (Object pregunta : preguntas) {
                System.out.println(pregunta);
            }
        } catch (ParseException ex) {
            //response.getWriter().println("error:" + ex.getMessage());
        }
        
        String ruta = request.getRealPath("/");

        /*try{
            SAXBuilder builder = new SAXBuilder();
            File questions = new File(ruta+"questions.xml");
            Document document = builder.build(questions);
            Element root = document.getRootElement();
            List lista = root.getChildren("question");
            
            Element newQuestion = new Element("question");
            
            
            root.addContent(newQuestion); 
            document.setContent(root);
            try {
                FileWriter writer = new FileWriter(ruta+"questions.xml");
                XMLOutputter outputter = new XMLOutputter();
                outputter.setFormat(Format.getPrettyFormat());
                outputter.output(document, writer);
                outputter.output(document, System.out);
                writer.close(); // close writer
            } catch (IOException e) {
                e.printStackTrace();
            } 
                    
        }
        catch(JDOMException e){
            //e.printStackTrace();
        } */ 
        //response.getWriter().println("datra: //"+data);
    }
}
