const math = require('mathjs')

module.exports = num => {
    try {
        return `${num} \n${math.simplify(num).toString()}`
    } catch (error) {
        return "ERROR: " + error
    }
} 


