Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class Inspiring {
	
	// Get an inspiring quote.
	// 
	/** @type {string}*/
	static get quote(){
		
		return this.quotes[~~(this.quotes.length * Math.random())];
	}
	
	// A list of inspirational quotes.
	// 
	/** @type {Array<string>}*/
	static get quotes(){
		
		return [
			"Every great developer you know got there by solving problems they were unqualified to solve until they actually did it. — Patrick McKenzie",
			"No one in the brief history of computing has ever written a piece of perfect software. It’s unlikely that you’ll be the first. — Andy Hunt",
			"One of the best programming skills you can have is knowing when to walk away for a while. — Oscar Godson",
			"The only way to do great work is to love what you do. — Steve Jobs",
			"It always seems impossible until it is done. — Nelson Mandela",
			"Don’t let yesterday take up too much of today. — Will Rogers",
			"Opportunities don't happen, you create them. — Chris Grosser",
			"Love your family, work super hard, live your passion. — Gary Vaynerchuk",
			"Somewhere, something incredible is waiting to be known. — Carl Sagan",
			"When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. — Henry Ford",
			"Everything you've ever wanted is sitting on the other side of fear. — George Addair",
			"More is lost by indecision than wrong decision. — Marcus Tullius Cicero",
			"If it makes you nervous, you’re doing it right. — Childish Gambino",
			"Keep your eyes on the stars, and your feet on the ground. — Theodore Roosevelt",
			"The question isn't who is going to let me; it's who is going to stop me. — Ayn Rand",
			"Rivers know this: there is no hurry. We shall get there some day. — A.A. Milne",
			"If you believe something needs to exist, if it's something you want to use yourself, don't let anyone ever stop you from doing it. — Tobias Lütke",
			"Don't let someone else's opinion of you become your reality. — Les Brown",
			"Setting goals is the first step in turning the invisible into the visible. — Tony Robbins"
		];
	}
	
	// Formats the given quote for a pretty console output.
	// 
	/** @param {string} quote*/
	// @returns {string}
	static formatForConsole(quote){
		
		const [text,author] = quote.split(' — ');
		
		return (`\n  \x1b[1m“ $` + text + ` ”\x1b[1m\n  <dim>— $` + author + `</dim>\n`);
	}
};
exports.Inspiring = Inspiring;
