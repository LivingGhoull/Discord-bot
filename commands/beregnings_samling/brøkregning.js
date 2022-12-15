const math = require('mathjs')

module.exports = num => {
    try {
        let numArray = num.split(' ')

        let sign = numArray[1]
        let newNum = 'fejl'

        let fraction1 = parseInt(numArray[0].split('/')[1])
        let fraction2 = parseInt(numArray[2].split('/')[1])
        
        let nævner = () => {
            for (let i = 1; fraction1 < fraction2; i++) {
                let fraction = fraction1 * i
                if (fraction == fraction2) {
                    return i
                }
                else if (fraction > fraction2) {
                    return false;
                }
                            
            }
        }

        let result = nævner()
    
        if (sign == '+' || sign == '-') {

            console.log(numArray[0].split('/')[1])
            console.log(numArray[2].split('/')[1])

            if (numArray[0].split('/')[1] != numArray[2].split('/')[1]) {
                if (result) {
                    let firstfraktorT = math.evaluate(`(${numArray[0].split('/')[0]} * ${result})`)
                    let firstfraktorN = math.evaluate(`(${numArray[0].split('/')[1]} * ${result})`)
                    let fraktorPlusMinus = math.evaluate(`${firstfraktorT} ${sign} ${numArray[2].split('/')[0]}`)

                    let trin1 = `(${numArray[0].split('/')[0]} * ${result})/(${numArray[0].split('/')[1]} * ${result}) ${sign} ${numArray[2]}`
                    let trin2 = `${firstfraktorT}/${firstfraktorN} ${sign} ${numArray[2]}`
                    let trin3 = `${firstfraktorT}+${numArray[2].split('/')[0]}/${firstfraktorN}`

                    return newNum = `Beregning der skal udføres: ${num}\n${trin1}\n${trin2}\n${trin3}\nResultat af beregning: ${fraktorPlusMinus}/${firstfraktorN}\n`
                }
                else {
                    let arr1 = []
                    let arr2 = []

                    let nævner = () => {
                        for (let i = 1; i < 100; i++) {
                            let nextI = 10
                            let final = []

                            let aa1 = 1
                            let aa2 = 1

                            arr1.push(fraction1 * i)
                            arr2.push(fraction2 * i)

                            if(i == nextI){
                                arr1.forEach(a1 => {
                                    arr2.forEach(a2 => {
                                        if (a1 == a2) {
                                            final.push(aa1)
                                            final.push(aa2)
                                        }
                                        aa2 += 1
                                    })
                                    aa2 = 1
                                    aa1 += 1
                                })
                                nextI += 10
                                arr1 = []
                                arr2 = []
                            }
                            if (final.length > 1) {
                                return final
                            }
                        }
                    }

                    let result = nævner()

                    let firstfraktorT = math.evaluate(`(${numArray[0].split('/')[0]} * ${result[0]})`)
                    let firstfraktorN = math.evaluate(`(${numArray[0].split('/')[1]} * ${result[0]})`)

                    let secondfraktorT = math.evaluate(`(${numArray[2].split('/')[0]} * ${result[1]})`)
                    let secondfraktorN = math.evaluate(`(${numArray[2].split('/')[1]} * ${result[1]})`)

                    let fraktorPlusMinus = math.evaluate(`${firstfraktorT} ${sign} ${secondfraktorT}`)

                    let trin1 = `(${numArray[0].split('/')[0]} * ${result[0].toString()})/(${numArray[0].split('/')[1].toString()} * ${result[0].toString()})  ${sign}  (${numArray[2].split('/')[0]} * ${result[1].toString()})/(${numArray[2].split('/')[1].toString()} * ${result[1].toString()}) `
                    let trin2 = `${firstfraktorT}/${firstfraktorN} ${sign} ${secondfraktorT}/${secondfraktorN}`
                    let trin3 = `${firstfraktorT}+${secondfraktorT}/${firstfraktorN}`

                    return newNum = `Beregning der skal udføres: ${num}\n${trin1}\n${trin2}\n${trin3}\nResultat af beregning: ${fraktorPlusMinus}/${firstfraktorN}`
                }
            }            
            else{
                return newNum = `${num}`
            }

        }
        else if (sign == '*') {
            let fraktorT = math.evaluate(`(${numArray[0].split('/')[0]} * ${numArray[2].split('/')[0]})`)
            let fraktorN = math.evaluate(`(${numArray[0].split('/')[1]} * ${numArray[2].split('/')[1]})`)

            let trin1 = `(${numArray[0].split('/')[0]} * ${numArray[2].split('/')[0]}) / (${numArray[0].split('/')[1]} * ${numArray[2].split('/')[1]})`
            
            return newNum = `Beregning der skal udføres: ${num}\n${trin1}\nResultat af beregning:  ${fraktorT}/${fraktorN}`
        }
        else if (sign == '/') {
            let fraktorT = math.evaluate(`(${numArray[0].split('/')[0]} * ${numArray[2].split('/')[1]})`)
            let fraktorN = math.evaluate(`(${numArray[0].split('/')[1]} * ${numArray[2].split('/')[0]})`)

            let trin1 = `(${numArray[0].split('/')[0]} * ${numArray[2].split('/')[1]}) / (${numArray[0].split('/')[1]} * ${numArray[2].split('/')[0]})`
            
            return newNum = `Beregning der skal udføres: ${num}\n${trin1}\nResultat af beregning: ${fraktorT}/${fraktorN}`
        }
        else{
            return "ERROR: tegn kan ikke bruges"
        }
    } catch (error) {
        return "ERROR: " + error
    }
} 


