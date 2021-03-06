var _ = require('underscore'),
    ffi = require('node-ffi'),
    common = require('./windows_common');

var ifinfo = module.exports;

var iphlpapi = new ffi.Library('iphlpapi', {
	'GetAdaptersAddresses': ['ulong', ['ulong', 'ulong', 'pointer', 'pointer', 'pointer']]
});

iphlpapi.IPAdapterAddresses = ffi.Struct([
	['ulong', 'length'], ['ulong', 'ifIndex'],
	['pointer', 'next'], ['string', 'name'],
	['pointer', 'firstUnicast'], ['pointer', 'firstAnycast'],
	['pointer', 'firstMulticast'], ['pointer', 'firstDNS'],
	['pointer', 'dnsSuffix'], ['pointer', 'description'],
	['pointer', 'friendlyName'],
	['uint8', 'phy0'], ['uint8', 'phy1'], ['uint8', 'phy2'],
	['uint8', 'phy3'], ['uint8', 'phy4'], ['uint8', 'phy5'],
	['uint8', 'phy6'], ['uint8', 'phy7'],
	['ulong', 'physicalLength'], ['ulong', 'flags'],
	['ulong', 'mtu'], ['ulong', 'ifType']
	// The struct goes on, but this is all the information we need
]);

iphlpapi.unicastAddress = ffi.Struct([
	['ulong', 'length'], ['ulong', 'flags'],
	['pointer', 'next'], ['pointer', 'sockaddr'],
	['int', 'sockaddrLength'], ['int', 'prefixOrigin'],
	['int', 'suffixOrigin'], ['int', 'dadState'],
	['ulong', 'validLifetime'], ['ulong', 'preferredLifetime'],
	['ulong', 'leaseLifetime'], ['uint8', 'prefixLength']
]);

iphlpapi.getAdaptersAddresses = function() {
	var size = new ffi.Pointer(ffi.Bindings.TYPE_SIZE_MAP.ulong);
	size.putULong(15 * 1024);
	var result, buffer;
	do {
		buffer = new ffi.Pointer(size.getULong());
		result = iphlpapi.GetAdaptersAddresses(0, 0x80 | 0x10 | 0x8 | 0x4 | 0x2, // Skip anycast, multicast, DNS Servers; include gateways, prefixes
			ffi.Pointer.NULL, buffer, size);
		if(result !== 111 && result !== 0) {
			common.error(result);
		}
	} while(result === 111); // 111 == ERROR_BUFFER_OVERFLOW
	
	return iphlpapi.readAdapterAddressesToArray(buffer);
};

iphlpapi.readAdapterAddressesToArray = function(buffer) {
	var arr = [];
	var head = buffer;
	while(!head.isNull()) {
		var addresses = new iphlpapi.IPAdapterAddresses(head);
		arr.push(addresses);
		head = addresses.next;
	}
	return arr;
};

ifinfo.interfaces = function() {
	var addresses = iphlpapi.getAdaptersAddresses();
	var result = [];
	
	_.each(addresses, function(description) {
		result.push({
			name: description.name,
			description: common.readUCS2(description.description),
			physicalAddress: [description.phy0, description.phy1, description.phy2, description.phy3, description.phy4, description.phy5, description.phy6, description.phy7].slice(0, description.physicalLength),
			type: common.IFTYPE_TO_BPF_MAP[description.ifType] || common.IFTYPE_TO_BPF_MAP.other
		});
	});
	
	return result;
};
