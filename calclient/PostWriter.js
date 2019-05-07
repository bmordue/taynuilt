const fs = require('fs');
const util = require('util');

module.exports = {
	writePost: function(calendarObject) {
		return new Promise((resolve, reject) => {
//			console.log('Logging to file: ' + file);
			var etag = calendarObject.data.props.getetag;
			var file = 'dump_' + etag.slice(1,-1) + '.json';
			console.log('Logging to file: ' + file);

			var data = util.inspect(calendarObject, { compact: false, depth: 6} );
			fs.writeFile(file, data, function(err) {
				err ? reject() : resolve(0);
//				if (err) { reject() } else { resolve(0); }
			});
		});
	}
};
