package questions;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom.Document;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.json.XML;
import org.json.JSONObject;

public class QuestionsServlet extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException
	{
	response.setContentType("text/html;charset=UTF-8");
	PrintWriter out = response.getWriter();
        String ruta= request.getRealPath("/");
        
        try{
        SAXBuilder builder = new SAXBuilder();
        File questionsdoc = new File(ruta+"questions.xml");
        Document doc = builder.build(questionsdoc);
        String xmlQ=doc.toString();
        JSONObject jsonQ=XML.toJSONObject(xmlQ);
        String jsonQString=jsonQ.toString(4);
        System.out.println(jsonQString);
        }catch(JDOMException e){}
        
        
        }
}
