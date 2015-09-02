var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/../debug.log', {flags : 'w'});
var log_stdout = process.stdout;

//overriding console.log
console.log = function() { //
	log_file.write(util.format(arguments) + '\n');
	log_stdout.write(util.format(arguments) + '\n');
};