var os = require('os');

switch(os.type()) {
case 'Windows_NT':
	module.exports = require('./windows_nt');
	break;
default:
	throw new Error('Unsupported operating system: ' + os.type());
}
