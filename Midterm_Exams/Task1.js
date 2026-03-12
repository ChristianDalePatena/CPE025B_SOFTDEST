// Modified Code
function sumDeepStrictNumbers(arr) {
    let sum = 0;
    for (const element of arr) { // checks if the elements of array is valid 
        if (Array.isArray(element)) {
            sum += sumDeepStrictNumbers(element);
        } else if (typeof element === 'number' && !isNaN(element)) { // identifies if it is not recurse 
            sum += element;
        }
    }
    return sum;

}
// Test Code
const testArray1 = [10, ['5', [true, 5]], null, [undefined, [10, NaN]]];
console.log(sumDeepStrictNumbers(testArray1));
