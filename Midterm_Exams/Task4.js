//modified code
const memo = {};
function power(base, exp) {
    if (exp > 0){
        result = 1
        for (let i = 0; i < exp; i++) {
            result = result * base
        }
        return result
    }
    else if (exp == 0) {
        return 1
    }
    
    else {
        result = 1
        for (let i = 0; i < Math.abs(exp); i++) {
            result = result / base
        }
        return result
    }
}

// Test Code
console.log(power(2, 5));
console.log(power(2, -2));