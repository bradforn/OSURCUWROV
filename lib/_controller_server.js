"use strict";


const WebSocketServer = require('ws').Server;
const merge           = require('mout/object/merge');
const Splitter        = require('stream-split'); 


class ControllerServer {

  constructor(server, options) {

    this.options = merge({
        whateverWeWant : 1080,
	weCanMake : "dudududuhhhhh!",
    }, options);

    this.wss = new WebSocketServer({ server });


    this.new_client = this.new_client.bind(this);
    this.receive_data = this.receive_data.bind(this);

    this.wss.on('connection', this.new_client);
  }

  


/*
  start_feed() {
    var readStream = this.get_feed();
    this.readStream = readStream;

    readStream = readStream.pipe(new Splitter(NALseparator));
    readStream.on("data", this.broadcast);
  }

  get_feed() {
    throw new Error("to be implemented");
  }

  broadcast(data) {
    this.wss.clients.forEach(function(socket) {

      if(socket.buzy)
        return;

      socket.buzy = true;
      socket.buzy = false;

      socket.send(Buffer.concat([NALseparator, data]), { binary: true}, function ack(error) {
        socket.buzy = false;
      });
    });
  }
*/
  new_client(socket) {

    var self = this;
    console.log('New client connected to controller server...');

/*
    socket.send(JSON.stringify({
      action : "init",
      whateverWeWant  : this.options.whateverWeWant,
      weCanMake : this.options.weCanMake,
    }));

    socket.on("message", function(data){

      var cmd = "" + data, action = data.split(' ')[0];
      console.log("Incomming action '%s'", action);

      if(action == "REQUESTSTREAM")
        self.start_feed();
      if(action == "STOPSTREAM")
        self.readStream.pause();
*/
    });

    socket.on('close', function() {
      self.readStream.end();
      console.log('stopping client interval');
    });
  }

  

};


module.exports = _Server;
