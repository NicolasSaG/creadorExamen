package questions;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

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
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;
/**
 *
 * @author fnico
 */
public class CreateQuestion extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        
        response.setContentType("text/html");
        response.getWriter().println("create question get");
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
        String interactionId = "", text = "";
        String dragObject1 = "";
        String dragObject2 = "";
        String dragObject3 = "";
        String dragObject4 = "";
        String targetObject1 = "";
        String targetObject2 = "";
        String targetObject3 = "";
        String targetObject4 = "";
        String answer = "";
        
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
            Map question = ((Map)jo.get("data")); 
            interactionId = question.get("interactionId").toString();
            text = question.get("text").toString();
            dragObject1 = question.get("dragObject1").toString();
            dragObject2 = question.get("dragObject2").toString();
            dragObject3 = question.get("dragObject3").toString();
            dragObject4 = question.get("dragObject4").toString();
            targetObject1 = question.get("targetObject1").toString();
            targetObject2 = question.get("targetObject2").toString();
            targetObject3 = question.get("targetObject3").toString();
            targetObject4 = question.get("targetObject4").toString();
            answer = question.get("answer").toString();
            
        } catch (ParseException ex) {
            //response.getWriter().println("error:" + ex.getMessage());
        }
        
        String ruta = request.getRealPath("/");

        try{
            SAXBuilder builder = new SAXBuilder();
            File questions = new File(ruta+"questions.xml");
            Document document = builder.build(questions);
            Element root = document.getRootElement();
            List lista = root.getChildren("question");
            
            Element newQuestion = new Element("question");
            newQuestion.setAttribute("id", interactionId);
            newQuestion.setAttribute("text", text);
            newQuestion.setAttribute("answer", answer);
            
            //crear draaags
            Element newDrag = new Element("drags");
            Element option;
            option = new Element("option").setText(dragObject1);
            option.setAttribute("img", "img1.jpg");
            newDrag.addContent(option);
            
            option = new Element("option").setText(dragObject2);
            option.setAttribute("img", "img2.jpg");
            newDrag.addContent(option);
            
            
            option = new Element("option").setText(dragObject3);
            option.setAttribute("img", "img3.jpg");
            newDrag.addContent(option);
            
            
            option = new Element("option").setText(dragObject4);
            option.setAttribute("img", "img4.jpg");
            newDrag.addContent(option);
            newQuestion.addContent(newDrag);
            //fin drags
            
            //crear targets
            Element newTarget = new Element("targets");
            option = new Element("option").setText(targetObject1);
            option.setAttribute("img", "img1.jpg");
            newTarget.addContent(option);
            
            option = new Element("option").setText(targetObject2);
            option.setAttribute("img", "img2.jpg");
            newTarget.addContent(option);
            
            
            option = new Element("option").setText(targetObject3);
            option.setAttribute("img", "img3.jpg");
            newTarget.addContent(option);
            
            
            option = new Element("option").setText(targetObject4);
            option.setAttribute("img", "img4.jpg");
            newTarget.addContent(option);
            
            newQuestion.addContent(newTarget);
            //fin targets
            
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
        }  
        //response.getWriter().println("datra: //"+data);
    }
}
