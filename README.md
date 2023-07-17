
# IP Address Toolkit Library

This is a tool library that implements IPv4 address operations, providing functions like IP address conversion, validation, subnet calculation, etc. It can facilitate various IP address processing tasks in network programming.

## Installation

```shell
# Using npm
$ npm install --save ip-toolkit
# or Using yarn
$ yarn install --save ip-toolkit
```

## Usage

```js
const { IPv4 } =require('ip-toolkit')

//  Verify if the IP address is within the CIDR range
IPv4.contains('192.168.1.0/24', '192.168.1.5')    // true
IPv4.contains('192.168.1.0/24', '192.168.2.5')    // false

// Convert IP address string to number 
IPv4.ip2long("192.168.0.1") // 3232235521
IPv4.ip2long("192.168.0.257") // false

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

// Parse IP address and subnet mask into CIDR info
IPv4.parseSubnet('192.168.0.1', '1.255.255.0')    // false
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

// Verify if two IP address are equal
IPv4.isEqual(32322355, 3232235521)  // false
IPv4.isEqual(3232235521, 3232235521)  // true
IPv4.isEqual('192.168.0.1', 3232235521)  // true
IPv4.isEqual('192.168.1.10', '192.168.1.10') // true
IPv4.isEqual('192.168.01.10', '192.168.1.010') // true

// Verify if an IP address is private 
IPv4.isPrivate('192.168.0.1') // returns true
IPv4.isPrivate('114.114.114.114') // returns false 

// Verify if two IP address are on the same subnet
IPv4.isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0'); // true
IPv4.isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0'); // true

// Validate if the IP address is valid
IPv4.isValidIP('172.16.1.1') // true
IPv4.isValidIP('172.16.01.1') // true
IPv4.isValidIP('172.16.01.1', {strict: true}) // false

// Verify if the subnet mask is valid
IPv4.isValidMask(24) // true
IPv4.isValidMask('255.255.255.0') // true 
IPv4.isValidMask('255.255.256.0') // false

// Convert IP number to address string
IPv4.long2ip(3232235521) // 192.168.0.1
IPv4.long2ip(-1) // false

// Parse IPv4 CIDR address to get address range info
IPv4.parseCIDR('192.168.0.1/24')
//   {
//     ipCount: 256,
//     usableCount: 254,
//     cidrMask: 24,
//     subnetMask: '255.255.255.0',
//     firstHost: '192.168.0.1',
//     lastHost: '192.168.0.254',
//     networkAddress: '192.168.1.0',
//     broadcastAddress: '192.168.1.255'
//   }

IPv4.parseSubnet('192.168.0.1', '1.255.255.0')    // false
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
```

## Features

- IP address conversion: string to integer and vice versa
- IP address validation: check address validity
- Subnet check: determine if address are in the same subnet
- CIDR parsing: get address range info
- Subnet mask: generate mask from prefix
- IP range: represent address range

## Contributing

Issues and pull requests are welcome!

## Star on GitHub

If you find this project useful, please star it on [GitHub](https://github.com/meguoe/ip-toolkit) !

## License

This project is under the [MIT License.](https://github.com/meguoe/ip-toolkit/blob/main/LICENSE "MIT License.")
