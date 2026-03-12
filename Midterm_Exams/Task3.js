//modified code
function composePipeline(fns) {
    return function(val) {
        let myresults = val;
        for (let i = 0; i < fns.length; i++) {
            myresults = fns[i](myresults);
        }
        return myresults;
    };
}

// Test Code
const add2 = x => x + 2;
const sqr = x => x * x;
const half = x => x / 2;
const pipeline = composePipeline([add2, sqr, half]);
console.log(pipeline(4));
