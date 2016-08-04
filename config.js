



exports.PATH=function(projectID){
	return '/'+ config.path + projectID + '/';	
};

var config=
{
	path: 'cache/',
	port : 8000
};

exports.PORT=config.port;
