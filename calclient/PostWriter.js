const fs = require('fs');
const util = require('util');

function calObjectFromString(calData) {
	var lines = calData.split('\n\r');
	var parsedData = {'IGNORED': 'ignored'};
	var latest = 'IGNORED';
	var re = /^[a-zA-Z].*:.*/;
	for (int i = 0; i < lines.length; i++)
	{
		var line = lines[0];
		if (line.match(re)) {
			var tokens = line.split(':');
			parsedData[tokens[0]] = tokens[1];
			previousKey = tokens[0];
		} else {
			parsedData[previousKey] += tokens[1];
		}
	}
	delete parsedData.IGNORED;
	return parsedData;
}

function postFromCal(calStr) {
	var calObj = calObjectFromString(calStr);

	return '---\r\n'
		+ 'title: ' + calObj.SUMMARY + '\r\n'
		+ 'layout: post' + '\r\n'
		+ 'date: ' + formatDate(calObj.DTSTAMP) + '\r\n'
		+ 'tags: [wacky]\r\n'
		+ '---\r\n'
		+ '## ' + calObj.SUMMARY + '\r\n\r\n'
		+ calObj.DESCRIPTION + '\r\n'
}

function formatDate(dt) {
	return util.format('%s-%s-%s %s:%s:%s', dt.slice(0,3), dt.slice(4,5), dt.slice(6,7), dt.slice(8,9), dt.slice(10,11), dt.slice(12,13);
}

module.exports = {
	writePost: function(calendarObject) {
		return new Promise((resolve, reject) => {
//			console.log('Logging to file: ' + file + ' (' + ')');
			var etag = calendarObject.data.props.getetag;
			var file = 'dump_' + etag.slice(1,-1) + '.json';
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
