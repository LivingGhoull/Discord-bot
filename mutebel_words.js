const badWords = ['cunt', 'fuck', 'fucking', 'bitch', 'die', 'dø', 'kælling'] 

module.exports = msg => {
    let check = false
    let content = msg.content.split(' ')
	content.forEach(newWord => {
		badWords.forEach(badWord => {
			if (newWord.toLowerCase().includes(badWord)) {
                check = true
			}
		});
	});
    return check
}
	
