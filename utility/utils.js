
var fs = require('fs');
var execSync = require('child_process').execSync;

exports.makedir=function(path){
		console.log(__dirname);
		console.log(3);
        execSync("mkdir "+__dirname+'/'+path);//,function(error,stdout,stderr){
//				console.log("error",error);
//				console.log("stdout",stdout);
//				console.log("stderr",stderr);
			console.log(4);
	//	});
};

exports.write=function(path,code,input,ext){
	console.log("write called");
	console.log(6);
	fs.writeFileSync(__dirname + '/'+path + "main."+ ext,code);//,function(err){

		console.log(7);
		console.log("main.cpp invoked");
		fs.writeFileSync(__dirname +'/' + path+"input.txt",input)//,function(err){
		
		console.log(8);
	//	});
//	});
};


exports.replaceAll=function(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
