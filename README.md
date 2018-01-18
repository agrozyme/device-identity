# Device Identity

A encoder / decoder of device identity for IoT

# Installation

```cmd
npm install --save device-identity
```

# Usage

```javascript
import Identity from 'device-identity';

let numberIdentity = 0x001F112233445566;
let identity = Identity.from(numberIdentity);

//  Device part index: 0x00 ~ 0x1F
//  index = 0x1F
const index = identity.index;

//  Organizationally unique identifier (OUI) in MAC Address
//  organization = 0x112233
const organization = identity.organization;

//  Network Interface Controller (NIC) Specific / Device part state code
//  code = 0x445566
const code = identity.code;

let identity = new Identity(code, organization, index);

//  Get number identity
//  numberIdentity = 0x001F112233445566;
let numberIdentity = identity.toNumber();

//  Get string identity
//  stringIdentity = '001F112233445566';
let stringIdentity = identity.toString();

//  Get MAC Address
//  address = 0x112233445566
identity.index = 0;
let address = identity.toNumber();
```
