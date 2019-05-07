const fs = require('fs');
const util = require('util');

function calObjectFromString(calData) {
	calData = calData.replace('\r','');
	var lines = calData.split('\n');
	var parsedData = {'IGNORED': 'ignored'};
	var previousKey = 'IGNORED';
	var re = /^[a-zA-Z].*:.*/;
	for (var i = 0; i < lines.length; i++)
	{
		var line = lines[i];
		if (line.match(re)) {
//			console.log('Extracting key/value from: ' + line);
			var tokens = line.split(':');
			parsedData[tokens[0]] = tokens[1];
			previousKey = tokens[0];
		} else {
//			console.log('Did not find a key in line: ' + line);
			parsedData[previousKey] += tokens[1];
		}
	}
	delete parsedData.IGNORED;
	return parsedData;
}

function postFromCal(calStr, tagsStr) {
	var calObj = calObjectFromString(calStr);
//	return util.inspect(calObj); // TODO REMOVE!

	var calStr = '---\n'
		+ 'title: ' + calObj.SUMMARY + '\n'
		+ 'layout: post' + '\n'
		+ 'date: ' + formatDate(calObj.DTSTAMP) + '\n'
		+ 'tags: ' + tagsStr + '\n'
		+ '---\n'
		+ '## ' + calObj.SUMMARY + '\n\n';
		if (calObj.DESCRIPTION) {
			calStr += calObj.DESCRIPTION + '\n';
		}
		return calStr;
}

function formatDate(dt) {
	return dt ? util.format('%s-%s-%s %s:%s:%s', dt.slice(0,3), dt.slice(4,5), dt.slice(6,7), dt.slice(8,9), dt.slice(10,11), dt.slice(12,13)) : '';
}

module.exports = {
	writePost: function(calendarObject) {
		return new Promise((resolve, reject) => {
//			console.log('Logging to file: ' + file + ' (' + ')');
			var etag = calendarObject.data.props.getetag;
			var file = 'maps_' + etag.slice(1,-1) + '.md';
			console.log('Logging to file: ' + file);
			
//			delete calendarObject.calendar;

			var data = postFromCal(calendarObject.calendarData);
			
//			var data = util.inspect(calendarObject, { compact: false, depth: 6} );
			//del data.calendar;
			fs.writeFile(file, data, function(err) {
				err ? reject() : resolve(0);
//				if (err) { reject() } else { resolve(0); }
			});
		});
	}
};
