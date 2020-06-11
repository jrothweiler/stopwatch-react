//find min 
function findMin(array) {
    return array.reduce(
        (acc, val, idx) => getUnix(val) < getUnix(acc.val) ? {idx, val} : acc,
        {idx: -1, val: '99:99,99'}
    ).idx;
}

function getUnix(format){
    let res= parseInt(format.substring(0,2))*60+parseInt(format.substring(3,5))+parseInt(format.substring(6,8))*0.01;
    return res;
}
export default findMin;