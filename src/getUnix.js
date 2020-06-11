function getUnix(format){
    let res= parseInt(format.substring(0,2))*60+parseInt(format.substring(3,5))+parseInt(format.substring(6,8))*0.01;
    return res;
}
export default getUnix;