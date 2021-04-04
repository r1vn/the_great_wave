"use strict";
/* xdDirScan 2020-08-26 02.10 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdDirScan = void 0;
const fs = require('fs');
function xdDirScan(dirPathAbs, type = 'all', __origin = '', __isRecursiveCall = false, __itemList = []) {
    if (!__isRecursiveCall) {
        if (process.platform === 'win32') {
            dirPathAbs = dirPathAbs.replace(/\\/g, '/');
        }
        __origin = dirPathAbs = dirPathAbs.replace(/\/$/, '');
    }
    for (const itemName of fs.readdirSync(dirPathAbs)) {
        const itemPathAbs = dirPathAbs + '/' + itemName;
        const itemPathRel = itemPathAbs.slice(__origin.length + 1);
        if (fs.statSync(itemPathAbs).isDirectory()) {
            if (type === 'all' || type === 'dirs') {
                __itemList.push(itemPathRel);
            }
            xdDirScan(itemPathAbs, type, __origin, true, __itemList);
        }
        else if (type === 'all' || type === 'files') {
            __itemList.push(itemPathRel);
        }
    }
    return __itemList;
}
exports.xdDirScan = xdDirScan;
