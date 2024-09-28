# @capi-utils/device-info

## Installation

```bash
npm install @capi-utils/device-info
```

## Usage

```ts
import { deviceInfo } from '@capi-utils/device-info';

console.log(deviceInfo.name); // Linux
console.log(deviceInfo.runOn); // Android 8.0.0
console.log(deviceInfo.model); // SM-G981B
console.log(deviceInfo.screenSize); // { width: 375, height: 812, availWidth: 375, availHeight: 812 }
console.log(deviceInfo.isMobile); // true
```
