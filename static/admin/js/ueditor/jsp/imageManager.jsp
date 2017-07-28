<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="javax.servlet.ServletContext"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javolution.util.FastMap" %>
<%@ page import="org.ofbiz.base.util.string.FlexibleStringExpander" %>
<%@ page import="org.ofbiz.base.util.UtilProperties" %>
<%
    //仅做示例用，请自行修改
	String path = "ueditor";
	String imgStr ="";
    String storageParentPath = getStorageParentPath();
	String realpath = storageParentPath +"/"+path;
	List<File> files = getFiles(realpath, new ArrayList());
	for(File file :files ){
		imgStr+=file.getPath().replace(File.separator, "/").replace(storageParentPath, "")+"ue_separate_ue";
	}
	if(imgStr!=""){
        imgStr = imgStr.substring(0,imgStr.lastIndexOf("ue_separate_ue")).replace(File.separator, "/").trim();
    }
	out.print(imgStr);		
%>
<%!
public List getFiles(String realpath, List files) {
	
	File realFile = new File(realpath);
	if (realFile.isDirectory()) {
		File[] subfiles = realFile.listFiles();
		for(File file :subfiles ){
			if(file.isDirectory()){
				getFiles(file.getAbsolutePath(),files);
			}else{
				if(!getFileType(file.getName()).equals("")) {
					files.add(file);
				}
			}
		}
	}
	return files;
}

public String getStorageParentPath(){
    Map<String, Object> context = FastMap.newInstance();
    return FlexibleStringExpander.expandString(UtilProperties.getPropertyValue("upload", "upload.server.path"), context);
}

public String getRealPath(HttpServletRequest request,String path){
	ServletContext application = request.getSession().getServletContext();
	String str = application.getRealPath(request.getServletPath());
	return new File(str).getParent();
}

public String getFileType(String fileName){
	String[] fileType = {".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp"};
	Iterator<String> type = Arrays.asList(fileType).iterator();
	while(type.hasNext()){
		String t = type.next();
		if(fileName.endsWith(t)){
			return t;
		}
	}
	return "";
}
%>