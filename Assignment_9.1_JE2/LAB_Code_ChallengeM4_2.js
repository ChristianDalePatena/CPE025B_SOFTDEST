let myDecorator = function(fn) {
    const cache = new Set(); 

    return function(...args) {
        
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log(`arguments already used: ${args}`);
        } else {
            cache.add(key);
            return fn(...args);
        }
    }
}


let sum = function(...args) {
    let retVal = 0;
    for (let arg of args) {
        retVal += arg;
    }
    console.log(`Sum: ${retVal}`);
    return retVal;
}

let dfn = myDecorator(sum);

dfn(2, 3, 4); // Sum: 9
dfn(4, 5);    // Sum: 9
dfn(2, 3, 4); // arguments already used: 2,3,4
dfn(4, 5);    // arguments already used: 4,5