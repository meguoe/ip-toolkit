
# IP Toolkit Functions Library
A library of useful functions related to IP (v4 and v6).

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

IPv4.ip2long("192.168.0.1") // 3232235521
IPv4.ip2long("192.168.0.257") // false

IPv4.long2ip(3232235521) // 192.168.0.1
IPv4.long2ip(-1) // false

IPv4.isValidIP('172.16.1.1') // true
IPv4.isValidIP('172.16.01.1') // true
IPv4.isValidIP('172.16.01.1', {strict: true}) // false

IPv4.isSameSubnet('192.168.1.10', '192.168.1.100', '255.255.255.0'); // true
IPv4.isSameSubnet('192.168.1.10', '192.168.2.100', '255.255.255.0'); // true

IPv4.toSubnetMask(0) // 0.0.0.0
IPv4.toSubnetMask(8) // 255.0.0.0
IPv4.toSubnetMask(16) // 255.255.0.0
IPv4.toSubnetMask(24) // 255.255.255.0

const range1 = IPv4.ipRange.fromLong(3232235777, 3232235876);
IPv4.range1.getSize(); // 100
IPv4.range1.hasIp('192.168.1.11'); // true
IPv4.range1.long2ip() // [ '192.168.1.1', '192.168.1.100' ]
// or 
const range2 = IPv4.ipRange.fromString('192.168.1.1', '192.168.1.100');
IPv4.range2.getSize() // 100
IPv4.range2.hasIp('192.168.1.11'); // true
IPv4.range2.ip2long() // [ 3232235777, 3232235876 ]
```
