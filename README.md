#downloadImgSincronized

Downloads sincronized (save and read img in the movil) , plugin js for Apps IOS &amp;amp; ANDROID on ApacheCordova
Descargas Sincronizadas (Guardar y leer imgs en el smartphone), plugins js para Aplicaiones moviles en Ios y Android en ApacheCordova


Idioma Español

Este Plug-in esta creado para ApacheCordova, realiza la función de descargar imágenes y guardarlas en el smartphone, este crea una base de datos tipo json para mantener un registro de las imágenes descargadas y la próxima vez cuando se solicita una imagen preguntamos en nuestra base de datos local si la tenemos y si la encontramos no la descargamos sino que leemos localmente, pero si en la próxima ejecución hay imágenes locales que no usamos, estas se borraran para no usar memoria local innecesaria, la base de datos se actualiza automáticamente en cada ejecución, manteniendo la información mas recién de las imágenes que tenemos.

Este Plug-in mejora la velocidad hasta 10 veces la apertura de las aplicaciones que necesitan descargar imágenes pero ocasionalmente se cambiaran 

 El Plug-in solo necesita un arreglo de las url de los servidores para descargar las imagenes y el nombre de la clasificación;  del resto, el hará todo por ti.


Sistema Operativo: Android & Ios (Puede ser probado en el smartphone o en los emuladores)

Obligatorio: Este plugin debe ser compilado en ApacheCordova, no funciona  en navegadores web

uso:

*Esperamos el evento deviceready generado por el smartphone 
*creamos un arreglo con data tipo json, con 2 datos
	-> remoteFile=Url de la imagen en internet
	-> idDom = Este id del src de la etiqueta imagen, donde se mostrara luego de ser descargada o leida localmente
* Instaciar el objeto downloadSincronized pasar como parametro 
    ->folder= nombre de carpeta donde se guardaran las imagenes 
	->fnReady=funcion que se ejecutara cuando el plugin termine de verificar las imagenes internas con la base de datos local

Ejemplo:
<!--
<script type="text/javascript" charset="utf-8">     

document.addEventListener("deviceready", ready, true);  
    function ready() {


       var remoteImg=new Array();
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps0.png",idDom:"dwnldImg0"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps1.png",idDom:"dwnldImg1"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps2.png",idDom:"dwnldImg2"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps3.png",idDom:"dwnldImg3"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps4.png",idDom:"dwnldImg4"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps5.png",idDom:"dwnldImg5"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps6.png",idDom:"dwnldImg6"});
       
       
       objDonwload=new downloadSincronized({'folder':'menu',"fnReady":function(event)
       		{
	           for(var i=0;i<remoteImg.length;i++)
	           {
	        	   objDonwload.loadImg(remoteImg[i].remoteFile,remoteImg[i].idDom);
	           }
                    
       		}
       });
       
        
    }
    
</script>

<body>
   <img src="img/ajax-loader.gif" id="dwnldImg0" />
    <img src="img/ajax-loader.gif" id="dwnldImg1" />
    <img src="img/ajax-loader.gif" id="dwnldImg2" />
    <img src="img/ajax-loader.gif" id="dwnldImg3" />
    <img src="img/ajax-loader.gif" id="dwnldImg4" />
    <img src="img/ajax-loader.gif" id="dwnldImg5" />
    <img src="img/ajax-loader.gif" id="dwnldImg6" />
    <img src="img/ajax-loader.gif" id="dwnldImg7" />
    <img src="img/ajax-loader.gif" id="dwnldImg8" />
    <img src="img/ajax-loader.gif" id="dwnldImg9" />
    <img src="img/ajax-loader.gif" id="dwnldImg10" />
    
 </body>
 -->


Nota: aun tiene detalles, que seran solucionados en la proxima version


/**/-------------------------------------------------------------------------------------------/**/


English Language

This plug-in is created for ApacheCordova, performs the function of downloading images and save them on your smartphone, this creates a json type data base to keep track of the downloaded images and next time when an image is requested wonder in our database local data if we have and if we find it not downloaded but we read locally, but if we do not use local images in the next run, they will be deleted to avoid unnecessary use local memory, the database is automatically updated on every implementation, most recently holding the information of the images we have.


This plug-in enhances the speed up to 10 times the opening of applications that need to download images but occasionally change
The Plug-in only needs an array of servers URL to download the images and the name of the classification; the rest, he will do everything for you.


Operating System: Android & Ios (can be tested in the smartphone or emulators)
Required: This plugin must be compiled in ApacheCordova not work in web browsers


use:

* We expect the event generated by the smartphone deviceready
* create an arrangement with json data type, with 2 data
	-> RemoteFile = URL of the image in internet
	-> IdDom = This image src id tag, where it will then be shown to be downloaded or read locally
* Instaciar the object passed as a parameter downloadSincronized
    -> folder = folder name where the images are saved
	-> fnReady = function to be performed when the plug end of verifying internal images with local database

example:
<!--
<script type="text/javascript" charset="utf-8">     

document.addEventListener("deviceready", ready, true);  
    function ready() {


       var remoteImg=new Array();
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps0.png",idDom:"dwnldImg0"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps1.png",idDom:"dwnldImg1"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps2.png",idDom:"dwnldImg2"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps3.png",idDom:"dwnldImg3"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps4.png",idDom:"dwnldImg4"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps5.png",idDom:"dwnldImg5"});
       remoteImg.push({remoteFile:"http://www.maquilapps.com/assets/steps6.png",idDom:"dwnldImg6"});
       
       
       objDonwload=new downloadSincronized({'folder':'menu',"fnReady":function(event)
       		{
	           for(var i=0;i<remoteImg.length;i++)
	           {
	        	   objDonwload.loadImg(remoteImg[i].remoteFile,remoteImg[i].idDom);
	           }
                    
       		}
       });
       
        
    }
    
</script>

<body>
   <img src="img/ajax-loader.gif" id="dwnldImg0" />
    <img src="img/ajax-loader.gif" id="dwnldImg1" />
    <img src="img/ajax-loader.gif" id="dwnldImg2" />
    <img src="img/ajax-loader.gif" id="dwnldImg3" />
    <img src="img/ajax-loader.gif" id="dwnldImg4" />
    <img src="img/ajax-loader.gif" id="dwnldImg5" />
    <img src="img/ajax-loader.gif" id="dwnldImg6" />
    <img src="img/ajax-loader.gif" id="dwnldImg7" />
    <img src="img/ajax-loader.gif" id="dwnldImg8" />
    <img src="img/ajax-loader.gif" id="dwnldImg9" />
    <img src="img/ajax-loader.gif" id="dwnldImg10" />
    
 </body>
-->

Note: even has details, which will be fixed in the next version
