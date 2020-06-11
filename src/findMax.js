import getUnix from './getUnix.js';
//find max
function findMax(array) {
    return array.reduce(
        (acc, val, idx) => getUnix(val) > getUnix(acc.val) ? {idx, val} : acc,
        {idx: -1, val: '00:00,00'}
    ).idx;
}


export default findMax;