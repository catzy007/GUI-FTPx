var day=29;
var month=08;
var year=2019;
var DlDate = new Date(year,month,day);
//console.log(DlDate);

var Client = require('ftp');

var c = new Client();
c.on('ready', function() {
  c.list(function(err, list) {
    if (err) throw err;
    //console.dir(list);
    for (let i=0; i<list.length; i+=1) {
      //only list file that more than DlDate
      if(list[i].date > DlDate){
        console.log(list[i].name, list[i].date);
      }
    }
  c.end();
  });
});
// connect to localhost:21 as anonymous with password 1234
c.connect({
  host: "localhost",
  port: 21,
  user: "efi4",
  password: "1033",
  debug: console.log
});
//console.log(c);

//https://github.com/mscdex/node-ftp
