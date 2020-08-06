function calculateSquare(number){
	return new Promise((resolve, reject) =>{
		setTimeout(()=>{
			if(typeof(number) !== 'number') return reject(new Error('Invalid data type'))
			const res = number*number
			return resolve(res)
		},1000)
	})
}

module.exports = calculateSquare;