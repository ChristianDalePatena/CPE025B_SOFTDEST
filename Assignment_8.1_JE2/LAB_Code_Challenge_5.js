
let deepComp = function(src, trg) {
    let retVal = Object.keys(src).length === Object.keys(trg).length;

    if (retVal) {
        for (let property in src) {

            if (typeof src[property] === typeof trg[property]) {

                if (typeof src[property] === 'object' && src[property] !== null && trg[property] !== null) {
                    retVal = deepComp(src[property], trg[property]);
                } else {
                    retVal = src[property] === trg[property];
                }

            } else {
                retVal = false;
            }

            if (!retVal) break;
        }
    }

    return retVal;
};



let image1 = {
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    details: {
        year: 1503,
        location: "Louvre"
    }
};

let image2 = {
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    details: {
        year: 1503,
        location: "Louvre"
    }
};

let image3 = {
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    details: {
        year: 1889,
        location: "MoMA"
    }
};

//comparison either true or false
console.log(deepComp(image1, image2)); 
console.log(deepComp(image1, image3)); 