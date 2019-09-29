  var Client = require('ftp');

  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      //console.dir(list);
      for (let i=0; i<list.length; i+=1) {
        console.log(list[i].name, list[i].date);
       }
      c.end();
    });
  });
  // connect to localhost:21 as anonymous with password 1234
  c.connect({
    host: "localhost",
    port: 21,
    user: "anonymous",
    password: "1234",
    debug: console.log
  });
  console.log(c);

//https://github.com/mscdex/node-ftp