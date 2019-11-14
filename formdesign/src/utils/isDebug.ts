import {noop} from "lodash";

const debugConf = (window as any).lbfdDebug; // eslint-disable-line @typescript-eslint/no-explicit-any

let debugMap: {[key: string]: boolean} = {};
if (Array.isArray(debugConf)) {
    debugConf.forEach((key) => {
        if (typeof key === "string") {
            debugMap[key] = true;
        }
    });
} else if (typeof debugConf === "object") {
    debugMap = debugConf;
}

const isDebug = function isDebug(name?: string, defaultOn = false) {
    if (debugConf === undefined) {
        return false;
    }
    if (name === undefined) {
        return true;
    }
    if (debugMap[name] === true) {
        return true;
    }
    if (defaultOn && (debugMap[name] !== false)) {
        return true;
    }
    return false;
};

if (isDebug()) {
    console.log("%cdebug is on", "color:limegreen;font-size:x-large"); // eslint-disable-line no-console
    console.log("debug Setting:"); // eslint-disable-line no-console
    console.log(`%c${JSON.stringify(debugConf, undefined, "  ")}`, "color:dodgerblue"); // eslint-disable-line no-console
}

export default isDebug;

export const debugLog = function debugLog(name: string, defaultOn = false) {
    return isDebug(name, defaultOn)
        ? (...args: unknown[]) => {
            console.log(`%c[${name}]`, "color:coral", ...args); // eslint-disable-line no-console
        }
        : noop;
};

debugConf.isDebug = isDebug;
