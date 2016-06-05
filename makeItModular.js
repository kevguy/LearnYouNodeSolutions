// Exercise: Make It Modular
var fs = require('fs');

module.exports = function (dir, ext, callback){
	var extension = '.' + ext;

	fs.readdir(dir, function(err, list){

		if (err){
			callback(err, null);
		} else {

			files = [];

			for (i = 0; i < list.length; ++i){

				if (list[i].indexOf(extension) >= 0){
					files.push(list[i]);
				}
			}
			callback(null, files);
		}
	});
};