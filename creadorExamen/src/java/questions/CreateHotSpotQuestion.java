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
public class CreateHotSpotQuestion extends HttpServlet {
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
        String hotspotInstanceName1 = "";
        String hotspotInstanceName2 = "";
        String hotspotInstanceName3 = "";
        String hotspotInstanceName4 = "";
        String correct1 = "";
        String correct2 = "";
        String correct3 = "";
        String correct4 = "";
        String qtype = "";
        
        String mini1 = "";
        String mini2 = "";
        String mini3 = "";
        String mini4 = "";
        String answerAtt = "";
        
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
            hotspotInstanceName1 = question.get("hotspotInstanceName1").toString();
            hotspotInstanceName2 = question.get("hotspotInstanceName2").toString();
            hotspotInstanceName3 = question.get("hotspotInstanceName3").toString();
            hotspotInstanceName4 = question.get("hotspotInstanceName4").toString();
            correct1 = question.get("correct1").toString();
            correct2 = question.get("correct2").toString();
            correct3 = question.get("correct3").toString();
            correct4 = question.get("correct4").toString();
            qtype = question.get("qtype").toString();
            
            
            
            
            if(correct1.equals("true")) mini1="1-1;"; 
            else mini1="1-0;";
            if(correct2.equals("true")) mini2="2-1;"; 
            else mini2="2-0;";
            if(correct3.equals("true")) mini3="3-1;"; 
            else mini3="3-0;";
            if(correct4.equals("true")) mini4="4-1" ; 
            else mini4="4-0" ;
            
            answerAtt = "" + mini1+mini2+mini3+mini4;
            
            
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

            newQuestion.setAttribute("type", "2");
            newQuestion.setAttribute("answer", answerAtt);
            
            //crear hotspot instances
            Element newDrag = new Element("hotsposts");
            Element option;
            option = new Element("option").setText(hotspotInstanceName1);
            //option.setAttribute("img", "img1.jpg");
            newDrag.addContent(option);
            
            option = new Element("option").setText(hotspotInstanceName2);
            //option.setAttribute("img", "img2.jpg");
            newDrag.addContent(option);
            
            
            option = new Element("option").setText(hotspotInstanceName3);
            //option.setAttribute("img", "img3.jpg");
            newDrag.addContent(option);
            
            
            option = new Element("option").setText(hotspotInstanceName4);
            //option.setAttribute("img", "img4.jpg");
            newDrag.addContent(option);
            newQuestion.addContent(newDrag);
            //fin drags
            
            //crear corerctos
            Element newTarget = new Element("corrects");
            option = new Element("option").setText(correct1);
            //option.setAttribute("img", "img1.jpg");
            newTarget.addContent(option);
            
            option = new Element("option").setText(correct2);
            //option.setAttribute("img", "img2.jpg");
            newTarget.addContent(option);
            
            
            option = new Element("option").setText(correct3);
            //option.setAttribute("img", "img3.jpg");
            newTarget.addContent(option);
            
            
            option = new Element("option").setText(correct4);
            //option.setAttribute("img", "img4.jpg");
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
