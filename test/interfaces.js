var expect = require('expect.js');
var ifinfo = require('../');

describe('interfaces', function() {
	var interfaces;
	
	beforeEach(function() {
		interfaces = ifinfo.interfaces();
	});
	
	it('should return an object', function() {
		expect(interfaces).to.be.an('object');
	});
	
	it('should contain at least one interface', function() {
		expect(interfaces).to.not.be.empty();
	});
	
	it('should have a string property "name"', function() {
		expect(interfaces[0].name).to.be.a('string');
	});
	
	it('should have a string property "description"', function() {
		expect(interfaces[0].description).to.be.a('string');
	});
	
	it('should have a property "physicalAddress"', function() {
		expect(interfaces[0]).to.have.property('physicalAddress');
	});
	
	it('should have a numerical property "type"', function() {
		expect(interfaces[0].type).to.be.a('number');
	});
});
