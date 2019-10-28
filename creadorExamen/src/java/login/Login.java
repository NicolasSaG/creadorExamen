package login;

import java.io.BufferedReader;
import java.io.File;
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
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;
/**
 *
 * @author fnico
 */
public class Login extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/plain");
        response.getWriter().println("datooos get");
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
        String username = "", password = "";
        HttpSession session = request.getSession();
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
            Map user = ((Map)jo.get("user")); 
            username = user.get("username").toString();
            password = user.get("password").toString();
        } catch (ParseException ex) {
            //response.getWriter().println("error:" + ex.getMessage());
        }
        
        String ruta = request.getRealPath("/");
        boolean userExists = false;
        //buscar usaurios en el archivo xml
        try{
            SAXBuilder builder = new SAXBuilder();
            File users = new File(ruta+"users.xml");
            Document document = builder.build(users);
            Element root = document.getRootElement();
            List lista = root.getChildren("usuario");
                //leer todos los usuarios del archivo
                for(int i = 0; i < lista.size(); i++){
                    Element elemento = (Element)lista.get(i);
                    String xmlUsername = elemento.getAttributeValue("username");
                    String xmlPassword = elemento.getAttributeValue("password");             
                    if(username.compareTo(xmlUsername) == 0 && password.compareTo(xmlPassword) == 0){
                        userExists = true;
                        session.setAttribute("username", xmlUsername);
                        break;
                    } 
                }
                if(userExists){
                    response.getWriter().println("http://localhost:3000/welcome");
                }else{
                    response.getWriter().println("http://localhost:3000/greetings");
                }
        }
        catch(JDOMException e){
            //e.printStackTrace();
        }  
        //response.getWriter().println("datra: //"+data);
    }
}
