var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uid = require('uid');
var bodyParser = require('body-parser');
var config=require('./config.js');
var cpp=require('./languages/cpp.js');
var execSync = require('child_process').execSync;
console.log(cpp);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

var names=[];
var users={};
server.listen(8000,function(){console.log('Server is up.');});

app.get('/*',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
   
app.post("/compile", function(req, res) {
  
	console.log(1);
    var code = req.body.code, input = req.body.input, projectID = req.headers.referer.split('/')[3];
	var compile_info=new Array();
	compile_info=cpp.compile(projectID,code,input);
	if(compile_info[0])
		res.send(compile_info[1]);
	else{
		cpp.run(projectID);
	//	res.send(run_info[1]);
	}

});


var codes={};
io.on('connection',function(socket){
	console.log("Connected");
    if((socket.handshake.headers.referer=="http://192.168.1.6:8000/")||( socket.handshake.headers.referer=="http://localhost:8000/")){
        var projectid=uid();
        socket.projectID=projectid;
        socket.join(projectid);
		execSync("mkdir cache/" + projectid);
        socket.emit('projectID',projectid);
    }
    else{
        var projectid=socket.handshake.headers.referer.split('/')[3];
        socket.projectID=projectid;
        socket.join(projectid);
        socket.emit('edited',codes[socket.projectID]);
    }
    
    socket.on('compile_msg',function(msg){
        io.in(socket.projectID).emit('compile_msg',msg);
    })
    socket.on('edited',function(code){
        codes[socket.projectID]=code;
        socket.broadcast.to(socket.projectID).emit('edited',code);//Send to all in the room except the sender.
    })



	socket.on('user',function(data){
				names.push(data);
				users[socket.id]=data;
	//			io.sockets.emit('names',names);
	});

	socket.on('chat message',function(message){
			if(message){
				io.in(socket.projectID).emit('chat message',users[socket.id]+" :: "+message);
				//console.log("Message Emitted from: " + users[socket.id]);
			}
		});

	socket.on('disconnect',function(){
		if( !(socket.id in users )) return;
		var tmp=users[socket.id];
		names.splice(names.indexOf(users[socket.id]),1);
		delete users[socket.id];
		socket.broadcast.to(socket.projectID).emit('out',tmp);
		socket.broadcast.to(socket.projectID).emit('names',names);
		});
});
