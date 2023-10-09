
# IP Address Toolkit Library

This is a tool library that implements IPv4 adn IPv6 address operations, providing functions like IP address conversion, validation, subnet calculation, etc. It can facilitate various IP address processing tasks in network programming.

## Features

- IP address conversion: string to integer and vice versa
- IP address validation: check address validity
- Subnet check: determine if address are in the same subnet
- CIDR parsing: get address range info
- Subnet mask: generate mask from prefix
- IP range: represent address range
- And other functions

## Installation

```shell
# Using npm
$ npm install --save ip-toolkit
# or Using yarn
$ yarn install --save ip-toolkit
```

## IPv4 Usage

```js
const { IPv4 } = require('ip-toolkit')

// Convert IP address string to number 
IPv4.ip2long("192.168.0.1") // 3232235521
IPv4.ip2long("192.168.0.257") // false

// Convert IP number to address string
IPv4.long2ip(3232235521) // 192.168.0.1
IPv4.long2ip(-1) // false

// Validate if the IP address is valid
IPv4.isValidIP('172.16.1.1') // true
IPv4.isValidIP('172.16.01.1') // true
IPv4.isValidIP('172.16.01.1', {strict: true}) // false

// Validate if the CIDR address is valid
IPv4.isCIDR('172.16.1.1/0') // true
IPv4.isCIDR('172.16.0.1/32') // true
IPv4.isCIDR('172.16.1.1/33') // false
IPv4.isCIDR('172.16.01.1/32') // false

// Verify if two IP address are equal
IPv4.isEqual('192.168.0.1', 3232235521)  // true
IPv4.isEqual('192.168.1.10', '192.168.1.10') // true

//  Verify if the IP address is within the CIDR range
IPv4.contains('192.168.1.0/24', '192.168.1.5')    // true
IPv4.contains('192.168.1.0/24', '192.168.2.5')    // false

// Verify if an IP address is private 
IPv4.isPrivate('192.168.0.1') // returns true
IPv4.isPrivate('114.114.114.114') // returns false 

// Verify if the subnet mask is valid
IPv4.isValidMask(24) // true
IPv4.isValidMask('255.255.255.0') // true 
IPv4.isValidMask('255.255.256.0') // false

// Verify if a set of CIDR ranges have conflicts
IPv4.isConflict(['192.168.1.0/24', '192.168.0.0/16'])  // true
IPv4.isConflict(['192.168.1.0/24', '192.168.2.0/24'])  // false
IPv4.isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/16'])  // true
IPv4.isConflict(['192.168.1.0/24', '192.168.2.0/24', '192.168.3.0/24'])  // false

// Convert IPv4 address to binary and hex
IPv4.toBinHex('172.16.0.1');
// {
//   hex: '0xac100001',
//   decimal: 2886729729,
//   binary: '10101100000100000000000000000001' 
// }

// Converts IPv4 address to IPv6 format
IPv4.toIPv6Format('192.168.1.1');
// {
//   mapped: '::ffff:192.168.1.1',  
//   comperssed: "::ffff:c0a8:101"
//   expanded: '0000:0000:0000:0000:0000:ffff:c0a8:0101',
// }

// Calculate the inverse mask of a subnet mask
IPv4.toInverseMask(24);  // '0.0.0.255'
IPv4.toInverseMask(16);  // '0.0.255.255'
IPv4.toInverseMask('255.255.255.0');  // '0.0.0.255'
IPv4.toInverseMask('255.255.0.0');  // '0.0.255.255'

// Convert subnet mask string to mask length number
IPv4.toMaskLength('255.255.255.0') // 24 
IPv4.toMaskLength('255.255.256.0') // false

// Convert mask length to subnet mask string
IPv4.toSubnetMask(0) // 0.0.0.0
IPv4.toSubnetMask(8) // 255.0.0.0
IPv4.toSubnetMask(16) // 255.255.0.0
IPv4.toSubnetMask(24) // 255.255.255.0

// Verify if two IP address are on the same subnet
IPv4.isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0'); // true
IPv4.isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0'); // true

// Parse IPv4 CIDR address to get address range info
IPv4.parseCIDR('192.168.0.1/24')
// {
//   ipCount: 256,
//   usableCount: 254,
//   cidrMask: 24,
//   subnetMask: '255.255.255.0',
//   firstHost: '192.168.0.1',
//   lastHost: '192.168.0.254',
//   networkAddress: '192.168.1.0',
//   broadcastAddress: '192.168.1.255'
// }

// Parse IP address and subnet mask into CIDR info
IPv4.parseSubnet('192.168.0.1', '255.255.255.0')
// {
//   ipCount: 256,  
//   usableCount: 254,
//   cidrMask: 24, 
//   subnetMask: '255.255.255.0',
//   firstHost: '192.168.0.1', 
//   lastHost: '192.168.0.254',
//   networkAddress: '192.168.0.0',
//   broadcastAddress: '192.168.0.255' 
// }

// Create ipRange instance from start and end IPv4 integers
const range1 = IPv4.ipRange.fromLong(3232235777, 3232235876);
IPv4.range1.ipCount(); // 100
IPv4.range1.contains('192.168.1.11'); // true
IPv4.range1.long2ip() // [ '192.168.1.1', '192.168.1.100' ]

// Create ipRange instance from start and end IPv4 strings 
const range2 = IPv4.ipRange.fromString('192.168.1.1', '192.168.1.100');
IPv4.range2.ipCount() // 100
IPv4.range2.contains('192.168.1.11'); // true
IPv4.range2.ip2long() // [ 3232235777, 3232235876 ]

```

## IPv6 Usage

```js
const { IPv6 } = require('ip-toolkit')

// Convert IPv6 address string to number 
IPv6.ip2long('::ffff:ffff')   // 4294967295n 

// Convert IPv6 address number to string 
IPv6.ip2long(4294967295n)   // ::ffff:ffff

// Validate if the IPv6 address is valid
IPv6.isValidIP('f16c:f7ec:cfa2:e1c5:9a3c:cb08:801f:36b8') // true

// Validate if the IPv6 CIDR address is valid
IPv6.isCIDR('::9999:ffff/0') // true
IPv6isCIDR('::9999:ffff/128') // true
IPv6.isCIDR('::9999:ffff/291') // true

// Expands an abbreviated IPv6 address string into its full representation.
IPv6.expandedForm('2001:db8::1') // '2001:0db8:0000:0000:0000:0000:0000:0001'

// Compresses an expanded IPv6 address into shortened form.
IPv6.compressedForm('2001:0db8:0000:0000:0000:0000:0000:0001')  // '2001:db8::1' 

// Parse CIDR format address into address range info
IPv6.parseCIDR('::9999:ffff/118')
// {
//   ipCount: 1024n,  
//   cidrMask: 118, 
//   firstHost: '::9999:fc00', 
//   lastHost: '::9999:ffff',
// }

```

## Contributing

Issues and pull requests are welcome!

## Star on GitHub

If you find this project useful, please star it on [GitHub](https://github.com/meguoe/ip-toolkit) !

## License

This project is under the [MIT License.](https://github.com/meguoe/ip-toolkit/blob/main/LICENSE "MIT License.")
