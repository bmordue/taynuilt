const fs = require('fs');
const util = require('util');

const POST_TAGS = '[maps]';

function calObjectFromString(calDataRaw) {
	var calData = String(calDataRaw);

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

function postFromCal(calStr, tagsStr = '[]') {
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
//	console.log('formatDate, in: ' + dt);
	var outStr = dt ? util.format('%s-%s-%s %s:%s:%s', dt.slice(0,4), dt.slice(4,6), dt.slice(6,8), dt.slice(9,11), dt.slice(11,13), dt.slice(13,15)) : '';
	return outStr;
//	console.log(util.format('in: %s  |  out: %s', dt, outStr));
}

function slugFromSummary(calData) {
	console.log('slug from SUMMARY: ', calData.SUMMARY);
	if (!calData.SUMMARY) { return 'untitled'; }
//	var slug = calData.SUMMARY.replace('\r', '').replace(/[\)\(]/g,'').replace(/\s/g, '-').replace('\'', '').toLowerCase();
	var slug = calData.SUMMARY.replace(/\s/g, '-').replace(/[^\w-]/g, '').replace(/^-*/g,'').replace(/-*$/g, '').toLowerCase();
	console.log('sanitized slug: ' + slug);
	return slug;
}

function filenameFromCal(calData) {
//	console.log('filename from calData: ' + util.inspect(calData, {compact: false}));
	var dt = calData.DTSTAMP;
	var dateStr = dt ? util.format('%s-%s-%s-', dt.slice(0,4), dt.slice(4,6), dt.slice(6,8)) : '1900-01-01-';
	return dateStr + slugFromSummary(calData) + '.md'
}

module.exports = {
	writePost: function(calendarObject) {
		return new Promise((resolve, reject) => {
			var etag = calendarObject.data.props.getetag;
			var file = 'maps_' + etag.slice(1,-1) + '.md';
			console.log('Logging to file: ' + file);

			var data = postFromCal(calendarObject.calendarData);

			fs.writeFile(file, data, function(err) {
				err ? reject() : resolve(0);
			});
		});
	},

	writePostFromIcs: function(filename) {
		return new Promise((resolve, reject) => {
			var calData = fs.readFileSync(filename);
			var postData = postFromCal(calData, POST_TAGS);
			var newFilename = filenameFromCal(calObjectFromString(calData));
			fs.writeFile(newFilename, postData, function(err) {
				err ? reject() : resolve(0);
			});
		});
	}
};
