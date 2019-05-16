const util = require('util');
const path = require('path');
const fs = require('fs');
const postWriter = require('./PostWriter');


function processWackyIdeas(calendar) {
//    console.log('BEFORE SYNC Calendar data for ' + calendar.displayName);
//    console.log(calendar);

    var actions = calendar.objects.map(postWriter.writePost, '[maps]'); // array of promises for all items
//    var actions = [postWriter.writePost(calendar.objects[0])];
    return Promise.all(actions);
}

function processMaps(calendar) {
  return new Promise(resolve => {
    resolve('processed ' + calendar.displayName);
  });
}

// https://gist.github.com/lovasoa/8691344
function walk(dir, callback) {
	fs.readdir(dir, function(err, files) {
		if (err) throw err;
		files.forEach(function(file) {
			var filepath = path.join(dir, file);
			fs.stat(filepath, function(err,stats) {
				if (stats.isDirectory()) {
					walk(filepath, callback);
				} else if (stats.isFile()) {
					callback(filepath, stats);
				}
			});
		});
	});
}

function readDir() {
	var actions = [];
	walk('./input', function(filepath, stats) {
		console.log('read: ' + filepath);
		actions.push(postWriter.writePostFromIcs(filepath, '[maps]'));
	});
	Promise.all(actions)
//		.then(console.log)
		.catch(console.log)
//		.then(() => {console.log('done');});

}

function main() {
  readDir();
}

main();
