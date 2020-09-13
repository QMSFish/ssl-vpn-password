// 把一个数组分成好几个数组
export function divideArray(arr, size) {
    let index = 0;
    const newArray = [];
    while (index < arr.length) {
        newArray.push(arr.slice(index, index + size));
        index = index + size;
    }
    return newArray;
}