const math = require('mathjs')

module.exports = num => {
    try {
        let fx = 'f(x)'    
        let x = num[2]
        
        fx = fx.replace('x',x)
        let xSplit = num.split('=')[0].trim()

        if (xSplit == fx) {
            xSplit = num.split('=')[1]
            if (xSplit.includes('x')) {
                let xInNum = xSplit.replace('x', x)
                return `Beregning der skal udføres: ${num}\n${xInNum}\nResultat af beregning: ${math.evaluate(xInNum).toString()}`
            }
            else{
                return "ERROR: x findes ikke i funktionen"
            }
        }
        else{
            return "Din f(x) er ikke skrivet rigtigt"
        }
    } catch (error) {
        return error
    }
} 