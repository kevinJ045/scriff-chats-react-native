
export const Logger = {
	timeout: 0,
	log(...texts: string[]){
		const text = texts.join(' ');
		try{
			clearTimeout(Logger.timeout);
			Logger.dispatch(text);
			Logger.timeout = setTimeout(() => Logger.dispatch(''), 2000) as any;
		} catch(e){
			console.log(text);
		}
	},
	dispatch(text: string){},
	set: false
} 