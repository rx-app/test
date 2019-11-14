const getOffset = function getOffset(ele: HTMLElement) {
    if (ele.offsetParent !== null) {
        return ele.offsetParent.getBoundingClientRect();
    }
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {width, height, x: 0, y: 0, top: 0, left: 0, right: width, bottom: height};
};
export default getOffset;
