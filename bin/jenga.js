#! /usr/bin/env node
require('shelljs/global');

var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .default({ s : 'src', d : 'dist'})
    .alias('s', 'source')
    .describe('s', 'Set the source directory')
    .alias('d', 'dest')
    .describe('d', 'Set the destination directory')
    .help('h')
    .alias('h', 'help')
    .argv,
    src = remove_trailing_slashes(argv.s),
    dest = remove_trailing_slashes(argv.d);

if (src == '.') {
  console.log('Jenga can not build html files from the root of your project.');
  return;
}

if (test('-d', src)) {
  var paths = find(src).filter(function(file) { return file.match(/\.html$/); });

  if (paths.length) {
    mkdir('-p', dest);

    var regexp = /<!--include (.*)-->/;

    for(var i = 0; i < paths.length; i++) {
      var path_parts = paths[i].split('/'),
          filename = path_parts[path_parts.length-1],
          tempfile = Math.floor(Math.random() * 10000000) + '.tmp';
      path_parts.shift();
      path_parts.pop();
      var path = path_parts.join('/');
      if ( filename.charAt(0) == '_' ) {
        continue;
      }
      cp(paths[i], tempfile);
      sed('-i', regexp, function(sedfound) {
        var match = regexp.exec(sedfound),
            partial = src + '/' + match[1];
        if ( !test('-f', partial) ) return sedfound;
        return cat(partial);
      }, tempfile);
      mkdir('-p', dest + '/' + path);
      mv(tempfile, dest + '/' + path + '/' + filename);
    }
  } else {
    console.log('There are no files in ' + src + ' to build.');
  }
} else {
  console.log(src + ' is not a directory.');
}

function remove_trailing_slashes(string) {
  return string.replace(/\/+$/, '');
}
