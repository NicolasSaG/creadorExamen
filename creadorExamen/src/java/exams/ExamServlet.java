package exams;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom.Document;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.json.XML;
import org.json.JSONObject;

public class ExamServlet extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException
	{
        response.addHeader("Access-Control-Allow-Origin", "*");
	response.setContentType("text/plain;charset=UTF-8");
	PrintWriter out = response.getWriter();
        String ruta= request.getRealPath("/");
        
        SAXBuilder builder = new SAXBuilder();
        File questionsdoc = new File(ruta+"exams.xml");
        byte[] b=Files.readAllBytes(questionsdoc.toPath());
        String xmlQ= new String(b);
        
        JSONObject jsonQ=XML.toJSONObject(xmlQ);
        String jsonQString=jsonQ.toString(4);
        out.print(jsonQString);
        }
}
