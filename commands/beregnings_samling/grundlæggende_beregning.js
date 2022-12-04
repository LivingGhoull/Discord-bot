const math = require('mathjs')

module.exports = num => {
    try {
        return `${num} \n${math.evaluate(num).toString()}`
    } catch (error) {
        return "ERROR: " + error
    }
} 


