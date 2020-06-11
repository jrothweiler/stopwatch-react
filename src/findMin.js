import getUnix from './getUnix.js';
//find min 
function findMin(array) {
    return array.reduce(
        (acc, val, idx) => getUnix(val) < getUnix(acc.val) ? {idx, val} : acc,
        {idx: -1, val: '99:99,99'}
    ).idx;
}


export default findMin;