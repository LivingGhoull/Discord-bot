const math = require('mathjs')

module.exports = num => {
    try {
        return `Beregning der skal udføres: ${num} \nResultat af beregning: ${math.evaluate(num).toString()}`
    } catch (error) {
        return "ERROR: " + error
    }
} 


