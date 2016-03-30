#! /usr/bin/env node
require('shelljs/global');

mkdir('-p','dist');

var files = ls('src/*.html');
var regexp = /<!--include (.*)-->/;

for(var i = 0; i < files.length; i++) {
  var filename = files[i].split('/');
  if ( filename[filename.length-1].charAt(0) == '_' ) {
    continue;
  }
  cp(files[i], 'tmp.html');
  sed('-i', regexp, function(something) {
    var match = regexp.exec(something);
    var partial = 'src/' + match[1];
    if ( !test('-f', partial) ) return something;
    return cat(partial);
  }, 'tmp.html');
  mv('tmp.html', 'dist/' + filename[filename.length-1]);
}
