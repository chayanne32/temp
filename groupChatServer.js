var net = require('net');
//var HOST = '172.168.9.23';
var HOST = "172.16.9.19";
var PORT = 3001;
var readline = require('readline');

var index = 0;

var clients = [];

net.createServer(function(sock) {
 	
	if(index < 2){

	console.log('CONNECTED: ' + sock.remoteAddress +' : '+ sock.remotePort);
	sock.name = sock.remoteAddress + " : " + sock.remotePort
	//sock.name = "user"+index+": "

	index++;
	
	clients.push(sock);
    
	sock.on('data', function(data) { 	
		console.log(sock.name + data);	
		sendAll(data,sock); 	
    });
	}
	
}).listen(PORT, HOST);

function sendAll(message, sender)
{
	clients.forEach(function (client) {
		if(client !== sender)
		{
			client.write(message);  
		}
    });
    
    process.stdout.write(message);
}

console.log('Server listening on ' + HOST +':'+ PORT);