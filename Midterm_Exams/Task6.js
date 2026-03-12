function firstUniqueChar(str) {
    const s = str.toLowerCase();
    const count = {};
    for (const mychar of s) {
        count[mychar] = (count[mychar] || 0) + 1;
    }

    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) {
            return str[i];
        }
    }
}

// Test Code
console.log(firstUniqueChar('sTreSS'));
console.log(firstUniqueChar('aabbc'));
