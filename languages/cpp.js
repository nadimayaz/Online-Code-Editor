
var execSync = require('child_process').execSync;
var spawnSync= require('child_process').spawnSync;
var config=require('../config.js');
var utils=require('../utility/utils.js');

exports.compile=function(projectID,code,input){
		console.log(2);
	   var path=config.PATH(projectID);
	   path='..'+path;
	   console.log(path);
	  // utils.makedir(path);
		console.log(5);
	   console.log("makedir path done");
	   utils.write(path,code,input,"cpp");
	   var msg= new Array();
    //   out=execSync("g++ "+ __dirname+'/'+path+"main.cpp -o " +__dirname+'/'+ path+"main.run");
	  
	   var spawn=spawnSync("g++" ,[ __dirname+'/'+ path+ "main.cpp", "-o",__dirname+'/'+  path+"main.run"]);
	   console.log(String(spawn.stderr));
		
	   msg.push(spawn.status);
	   msg.push(String(spawn.stderr));
	   return msg;
	   

	   /*,function(error,stdout,stderr){
    	   var msg="";
		   var success;
		   var compile_info =new Array();
    	   if(error!=null && error.code!='0')
   		    {
    	         msg="<b>***********COMPILATION ERROR***************<br></b>"+stderr+"<b>************************************</b>";
   		         msg=utils.replaceAll(msg,path,"");
   	     	     msg=utils.replaceAll(msg,'\n','<br>');
				 console.log("Compilation Error : ",msg);
				 compile_info.push(false);
				 compile_info.push(msg);
				 return compile_info;
			}
			else{
                 if(stderr){
                      msg="<b>***********WARNING***************<br></b>"+stderr+"<b>************************************</b><br>";
				  }
                  msg+="<b>***********COMPILATION SUCCESS***************<br></b>";
                  msg=utils.replaceAll(msg,path,"");
                  msg=utils.replaceAll(msg,'\n','<br>');
				  console.log("Compilation Success : ",msg);
				  compile_info.push(true);
				  compile_info.push(msg);
				  return compile_info;
			}
	  });
	  */
};

exports.run=function(projectID){
			
		  var path='..' + config.PATH(projectID);
	
		  var spawn=spawnSync("execute ",[ __dirname + '/' +path +"main.run",
				  __dirname + '/' + path + "main.run ",__dirname + '/' + path + "input.txt"]);
		  console.log(spawn.stdout);
 /*         exec("../execute "+path+"main.run main.run "+path+"input.txt",function(error,stdout,stderr){
              if(error){
                 msg+="<b>***********RUNTIME ERROR***************<br></b>"+error+"<b>************************************</b>";
				 istrue=false;
			  }
              if(stdout)
                 msg+="<b>***********OUTPUT***************<br></b>"+stdout+"</br><b>************************************</b>";
              else if(!msg)
                 msg+="<b>***********COMPILATION SUCCESS***************<br></b>";
              msg=utils.replaceAll(msg,path,"");
              msg=utils.replaceAll(msg,'\n','<br>');
			  run_info.push(istrue);
			  run_info.push(msg);
           });      */
};
