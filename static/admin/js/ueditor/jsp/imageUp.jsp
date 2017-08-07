    <%@ page language="java" contentType="text/html; charset=utf-8"
        pageEncoding="utf-8"%>
    <%@ page import="cn.yr.chile.common.utils.EditorUploader" %>

    <%
    request.setCharacterEncoding("utf-8");
	response.setCharacterEncoding("utf-8");
    String entity = request.getParameter("entity");
    String id = request.getParameter("id");
    String uploadPlatform = request.getParameter("platform");
    EditorUploader up = new EditorUploader(request);
    up.setSavePath("ueditor");//指定存放在/images/upload/ueditor
    String[] fileType = {".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp"};
    up.setAllowFiles(fileType);
    up.setMaxSize(10000); //单位KB
    up.setEntity(entity);
    up.setEntityId(id);
    up.upload();
    String url = up.getAssetUrl();
    if("admin".equalsIgnoreCase(uploadPlatform)){
        url = up.getAdminAssetUrl();
    }
    response.getWriter().print("{'original':'"+up.getSaveName()+"','url':'"+url+"','title':'','state':'"+up.getState()+"'}");
    %>
