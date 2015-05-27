

function triggerNewEvent(target,eventName,eventData)
    {
        eventData={detail:eventData};
        var event = target.createEvent('Events');
        event.initEvent(eventName, false, false);
        if (eventData) {
            for (var i in eventData) {
                if (eventData.hasOwnProperty(i)) {
                    event[i] = eventData[i];
                }
            }
        }
        target.dispatchEvent(event);
    }


 function listenEvent(target,eventName,fnSuccess,fnError)
 {
        target.addEventListener(eventName, function(event)
        {
            if(event.detail.fn=="success")
            {
            	if($.isFunction(fnSuccess))
            	{
            		fnSuccess(event.detail);
            	}
                
            }else
            if(event.detail.fn=="error")
            {
            	if($.isFunction(fnError))
            	{
            		fnError(event.detail);
            	}
            }
       }); 
 }



function downloadSincronized(options)
{
    var that=this;
    that.baseFolder="imgs_app";
    that.folder=options.folder;
    that.fnReady=options.fnReady;
    that.first=true;
    
    that.cnt_rest=0;
    that.cnt_total=0;
    that.cnt_download=0;
    that.cnt_reader=0;
    
    that.imgDirectory=new Array();
    that.imgs=new Array();
    that.imgsToJson=new Array();
    that.jsonLocal={};
    that.stepDownload="none";
    that.nameJsonLocal="./bd_imgs_"+that.folder+".json";
    that.inicializate(); 
}

downloadSincronized.prototype=
{
		check_directory:function(callbackSuccess,dataSuccess,callbackFail,dataFail)
		{
			var that=this;
		    
		    
		            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		                fileSystem.root.getDirectory(that.baseFolder, {create: true, exclusive: false}, function(dirEntry) 
		                {
		                	console.log("make folder base");
		                	dirEntry.getDirectory(that.folder,{create: true, exclusive: false},function(_dirEntry)
		                			{
		                				console.log("make folder category");
		                				var directoryReader = _dirEntry.createReader();
		                				directoryReader.readEntries(function(entries)
		                						{
		                							for (var i=0; i<entries.length; i++) {
		                									
		                									
		                									if("./"+entries[i].name!=that.nameJsonLocal)
		                									{
		                										console.log(entries[i].name);
		                										that.imgDirectory.push(entries[i].name);
			                									that.imgsToJson.push(entries[i].name);
		                									}
		                									
		                							}
		                							
		                							that.writeJsonLocal({func:function()
		                								{
		                									triggerNewEvent(document,"inicializate",{ 'ready': true ,fn:"success" });
		                								}});
		                						},function(error){});
		                			},function(evt)
		                			{
		                				triggerNewEvent(document,"inicializate",{ 'ready': true ,fn:"success" });
		                				console.log("fallo interno");
		                			});
		                	
		                        
		                }, function(evt){
		                    console.log("fallo");
						
					}); //colocar el fail
		            }, null); //colocar el fail 
		    
		}
   ,
		//metodo privado inicia las descargas sincronizadas
	_iniDownLoad:function()
	    {
			var that=this;
	    	if(that.first==true && that.stepDownload=="none")
	        {
	            that.first=false;
	            that.stepDownload="first";
	            triggerNewEvent(document,"downloadImg",{ 'ready': true ,fn:"success",'step':that.stepDownload, error:'none' });
	        }
	    }
	,  fileSystemOpen:function(folder,remoteFile,type,fileOpen,callbackSuccess,dataSuccess,callbackFail,dataFail)
        {
			var that=this;
	        var op={create: true, exclusive: false};
	        if(type=="create" || type=="writer")
	        {
	            op={create: true, exclusive: false};
	        }else
	        if(type=="reader")
	        {
	            op={create: false, exclusive: false};
	        }
	        
	        if(fileOpen=="undefined" || fileOpen==null || fileOpen.open=="undefined" || fileOpen.open==null || fileOpen.open==false)
	        {
	                var fileName =remoteFile.substring(remoteFile.lastIndexOf('/')+1);
	                var pathFileName=that.baseFolder+"/"+that.folder+"/"+fileName;
	                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	                    
	                    fileSystem.root.getFile(pathFileName, op, function(fileEntry) 
	                    {
	                    	if($.isFunction(callbackSuccess))
                            {
	                            callbackSuccess({"open":true,"folder":that.folder,"remoteFile":remoteFile,"fileName":fileName,"FileSystem":fileSystem,"Entry":fileEntry,"dataSuccess":dataSuccess});
                            }
	                    }, function(evt){
	                        
	                            if($.isFunction(callbackFail))
	                            {
	                                callbackFail(evt);
	                            }
						
					}); //colocar el fail
	                }, null); //colocar el fail 
	        }else
	        if(fileOpen.open==true)
	        {
	            callbackSuccess(fileOpen);
	        }
    }
	,		
	//inicio de todos los listener y eventos del plugin
	inicializate:function()
    {
        var that=this;
        
        that.check_directory(null,null,null,null);
        listenEvent(document, "inicializate", function(){
        	
        	
        	
	        listenEvent(document,'downloadImg', function (event) 
	        {
	            if(event.ready==true )
	            {
	                
	                if(event.step!='last')
	                {
	                	
	                	//verificar los eventos y su sincronizacion
	                    if(that.imgs.length>0)
	                    {
	                        var img=that.imgs.shift();
	                        if(that.imgs.length==0)
	                        {
	                            that.stepDownload="last";
	                        }else
	                        {
	                            that.stepDownload="middle";
	                        }
	
	                        that.downLoadImg(img.remoteFile,{"idDom":img.idDom,"step":that.stepDownload},null);
	                    }
	                }
	            }
	        }, function(event)
	        {
	        	alert("Internet Fail");
	        	 if(event.ready==true )
		            {
		                
		                if(event.step!='last')
		                {
		                	
		                	//verificar los eventos y su sincronizacion
		                    if(that.imgs.length>0)
		                    {
		                        var img=that.imgs.shift();
		                        if(that.imgs.length==0)
		                        {
		                            that.stepDownload="last";
		                        }else
		                        {
		                            that.stepDownload="middle";
		                        }
		                        that.downLoadImg(img.remoteFile,{"idDom":img.idDom,"step":that.stepDownload},null);
		                    }
		                }
		            }
	        	
	        	console.log("donfail");
	            //funcion de error
	        });
	        
	        listenEvent(document,'readJson', 
	        function (event) 
	        {
	        	
	            that.imgsToJson=new Array();
	            if(event.ready==true)
	            {
	            	
	                that.fnReady(event);
	                that._iniDownLoad();
	                //fn success
	            }
	        },
	        function(event)
	        {
	            that.imgsToJson=new Array();
	            if(event.ready==true )
	            {
	            	
	            	console.log("bd json no leido (No existe o archivo corrupto)");
	                that.fnReady(event);
	                that._iniDownLoad();
	                	
	            }
	        }
	        );
	        
	        listenEvent(document, "endProcces", function(event)
	        		{
	        			console.log("endProcces");
	        			that.cleanDir();
	        		}, null);
	        
	        		
	                that.readJsonLocal();
        }, null);
    }
        ,
    

    
    loadImg:function(remoteFile,idDom) 
    {
    
        var that=this;
        var nameImg=remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        var find=false;
        that.cnt_total++;
        that.cnt_rest++;
        
        
        if(!$.isEmptyObject(that.get_jsonLocal()))
        {
        
        	if(that.get_jsonLocal().img.length>0)
        	{
        		$.each(that.get_jsonLocal().img,function(key,value)
        		{
        		            if(value==nameImg)
        		            {
        		                find=true;
        		            }
        		});
        	}
        }
        
        if(find==false)
        {
        	
        	that.cnt_download++;
        	console.log("donwloading");
        	that.imgs.push({"remoteFile":remoteFile,"idDom":idDom});
            //descargar las imagenes en series (una detras de la otra a travez de eventos)   
        }else
        {
        	
        	that.cnt_reader++;
        	console.log("leyendo");
            that.readImg(remoteFile,idDom,null);
            //leer imagen desde el celular
        }
    }
    ,
    readJsonLocal:function()
    {
        var that=this;
        var _callbackSuccess_=function(fs)
        {
            
            fs.Entry.file(function(file) 
            {
                var reader = new FileReader();
                reader.onerror=function(event)
                {
                    console.log("error:"+event.target.error);
                    triggerNewEvent(document,"readJson",{ ready:true,fn:"error",'exists': false ,'error':event.target.error.code,'json':{}});
                };
                reader.onload=function(event)
                {

                	that.jsonLocal=null;
                	that.jsonLocal=$.parseJSON(event.target.result);
                    triggerNewEvent(document,"readJson",{ ready:true,fn:"success",'exists': true , 'error':0});
                };
                reader.onloadend = function(event) 
                {  

                    //triggerNewEvent(document,"readJson",{ ready:true,fn:"success",'exists': true , 'error':0,'json':event.target.result});
                };
                reader.readAsText(file);
            }, function(evt)
            {   
                //funcion de error;
                    triggerNewEvent(document,"readJson",{ ready:true,fn:"error",'exists': false ,'error':evt.target.error.code,'json':{}});
                //evt.target.error.code 
            }); 
        }

		var _callbackfail_=function(event)
		{
	            
			triggerNewEvent(document,"readJson",{ ready:true,fn:"error",'exists': false ,'error':1000,'json':{}});
		}
	    that.fileSystemOpen(that.folder,that.nameJsonLocal,"reader",null,_callbackSuccess_,null,_callbackfail_,null);   
    }
    ,
    downLoadImg:function(remoteFile,data,fileOpen)
    {
      console.log("download img:"+remoteFile);
       var that=this;
       var _callbackSuccess_=function(fs)
       {
        var ft = new FileTransfer();
        ft.download(fs.remoteFile,fs.Entry.toURL(), function(entry) {
        	
        		
        	    that.readImg(fs.remoteFile,fs.dataSuccess.idDom,fs);
                triggerNewEvent(document,"downloadImg",{ 'ready': true ,fn:"success", "step":fs.dataSuccess.step,"fileName":fs.fileName,'error':'none' });
                                              
                 }, function(error)
                 {
                         triggerNewEvent(document,"downloadImg",{ 'ready': true ,fn:"error", "step":fs.dataSuccess.step,"fileName":fs.fileName,'error':error });
                 });        
       }
           that.fileSystemOpen(that.folder,remoteFile,"create",fileOpen,_callbackSuccess_,{"idDom":data.idDom,"step":data.step},null,null);
    }
    ,
    readImg:function(remoteFile,idDom,fileOpen)
    {   
    	console.log("read img local (cellphone)");
    	var that=this;
        var _callbackSuccess_=function(fs)
        {
            fs.Entry.file(function(file) {
                var reader = new FileReader();
                reader.onerror=function(event)
                {

                }
                reader.onload= function(event) 
                {
                   that.cnt_rest--;
                   if(that.cnt_rest<=0)
                   {
                	   that.set_imgsToJson(fs.fileName,{func:function()
                		   {
                		   		triggerNewEvent(document,"endProcces",{ 'ready': true ,fn:"success"});
                		   }});
                	   
                   }else
                   {
                	   that.set_imgsToJson(fs.fileName,null);   
                   }
                   
                   var dwnldImg = document.getElementById(fs.dataSuccess.idDom);
                   dwnldImg.src = event.target.result;
                   
                };
                
                reader.readAsDataURL(file);
            }, function()
            {
            	
            });                        
        }
        that.fileSystemOpen(that.folder,remoteFile,"reader",fileOpen,_callbackSuccess_,{"idDom":idDom},null,null);
    }
    ,
    
    writeJsonLocal:function(data)
    {
    	
    	console.log("write json local (cellphone)");
    	var that=this;
    	var _callbackSuccess_=function(fs)
    	{
    		 fs.Entry.createWriter(function(writer)
    				 {
    			  writer.onwrite = function(evt) {
    				  
    				  
    				  if(!$.isEmptyObject(data))
    				  {
    					  if($.isFunction(data.func))
        				  {
        					  data.func();
        				  }  
    				  }
    			    };
    			    	writer.write(that.get_imgsToJson());
    				 }, function(event){
    					 /*faail*/});
    	}
    	that.fileSystemOpen(that.folder,that.nameJsonLocal,"writer",null,_callbackSuccess_,null,null,null);
    }
    ,
    cleanDir:function()
    {
    	console.log("check and delete others imgs");
    	var that=this;
    	var find=false;
        for(var i=0;i<that.imgDirectory.length;i++)
        {
        	
        	if(!$.isEmptyObject(that.get_imgsToJson()))
            {
        		
    	        for(var j=0;j<that.get_imgsToJson().img.length;j++)
    	        {
    	            if(that.imgDirectory[i]==that.get_imgsToJson().img[j])
    	            {
    	                find=true;
    	                break;
    	            }
    	        }
    	        if(find==false)
    	        {
    	            that.delImg(that.imgDirectory[i]);
    	        }
    	        find=false;
    	        
            }
        }
    }
    ,
    
    delImg:function(nameImg)
    {
    	var that=this;
    	console.log("-delete img-:"+nameImg);
    	var _callbackSuccess_=function(fs)
    	{
    		fs.Entry.remove(function(entry){
    		},function(error){/*fail*/});
    	}
        that.fileSystemOpen(that.folder,"./"+nameImg,"reader",null,_callbackSuccess_,null,null,null);
    }
    ,
        
    set_imgsToJson:function(fileName,data)
    {
        var that=this;
        that.imgsToJson.push(fileName);
        that.writeJsonLocal(data);
        console.log("add fileName to json:"+fileName+" and write local (cellphone)");
    },
    
    get_imgsToJson:function()
    {
        var that=this;
        return {"img":that.imgsToJson};
    },
    
    get_jsonLocal:function()
    {
        var that=this;
        return that.jsonLocal;
    }
    
};



    
    
    




