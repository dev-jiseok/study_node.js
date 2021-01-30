var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

var app = http.createServer(function(request,response){
    var url_ = request.url;
    var queryData = url.parse(url_,true).query;
    var pathname = url.parse(url_,true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome!';
          var description = 'Hello, Node.js';
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list+'</ul>';
          var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
        })
          
      }
      else{
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome!';
          var description = 'Hello, Node.js';
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list+'</ul>';
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          var title = queryData.id;
          var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
      response.writeHead(200);
      response.end(template);
      });
    });
    }
  }
      
    else{
      response.writeHead(404);
      response.end('not found');
    }
   
});
app.listen(3000);