var psiTurk = PsiTurk(uniqueId, adServerLoc, mode);

// Are you debugging the code and wish to skip instructions/quiz?
var DEBUGTASK = false; // skip instructions only
var DEBUGPOST = false; // skip instructions and task

// VERSION 3.0.0: condition is from 0 to 9, tells which of 10 orderings of conditions to use
// Magnitude rather than probability of reward is controlled by performance
// AND now we are doing four games in a row with four diff conditions (two rules, two incents)
var ngames = 4;
var game =0; // starts at 0 and increases !
var PSITURKcondition = condition; // these two variables are passed by the psiturk server process
var PSITURKcounterbalance = counterbalance;  // they tell you which condition you have been assigned to

// these were generated in generate_exp4_conditions.py from a selected random seed
var conditionorders = [[2, 3, 0, 1], [1, 0, 3, 2], [1, 2, 3, 0], [1, 2, 3, 0], [0, 2, 1, 3], [0, 3, 2, 1], [2, 0, 3, 1], [2, 3, 1, 0], [3, 1, 2, 0], [1, 2, 0, 3]];
var counterbalancing = [[16, 3, 25, 24], [33, 15, 1, 4], [34, 4, 25, 1], [36, 6, 43, 17], [8, 19, 16, 32], [7, 1, 26, 47], [41, 21, 32, 28], [1, 41, 6, 30], [37, 16, 44, 43], [32, 18, 26, 42]];

var conds = conditionorders[PSITURKcondition];
var cbs = counterbalancing[PSITURKcondition];

var bonusearned = 0; // cumulative keep track of all bonuses earned so far 

var rules = [1,3];
var ticketvalues = [0.08/4,4.92/4]; // 4 for the max number of tickets that can be won each game

var NLEARNINGREPS = 4; // number of times each stim is seen during learning (mult by 8 for ntrials)

// Pre-load html pages 
var pages = [
	"instructions.html",
	"transition.html",
	"quiz.html",
	"restart.html",
	"learnstage.html",
	"teststage.html",
	"bonusstage.html",
	"postquestionnaire.html"
];

// In javascript, defining a function as `async` makes it return  a `Promise`
// that will "resolve" when the function completes. Below, `init` is assigned to be the
// *returned value* of immediately executing an anonymous async function.
// This is done by wrapping the async function in parentheses, and following the
// parentheses-wrapped function with `()`.
// Therefore, the code within the arrow function (the code within the curly brackets) immediately
// begins to execute when `init is defined. In the example, the `init` function only
// calls `psiTurk.preloadPages()` -- which, as of psiTurk 3, itself returns a Promise.
//
// The anonymous function is defined using javascript "arrow function" syntax.
const init = (async () => {
    await psiTurk.preloadPages(pages);
})()

/********************
* TASK-GENERAL CODE *
********************/

// Globals defined initially.


// psiTurk.preloadPages(pages);

var instruct_stage = "instructions.html";

// Stimulus info
var ncards = 8,
	cardnames = [
	"static/images/STIM00.png",
	"static/images/STIM01.png",
	"static/images/STIM02.png",
	"static/images/STIM03.png",
	"static/images/STIM04.png",
	"static/images/STIM05.png",
	"static/images/STIM06.png",
	"static/images/STIM07.png"],
	categorynames= [ "A", "B" ];
var allstims = [0,1,2,3,4,5,6,7];

var instruction_images = [
	"static/images/cardgroups00.png",	
	"static/images/cardgroups01.png",
	"static/images/cardgroups02.png",
	"static/images/cardgroups03.png",
	"static/images/incentives00.png",
	"static/images/incentives01.png",
	"static/images/learning00.png",
	"static/images/learning01.png",
	"static/images/marblebag.png",
	"static/images/allcards00.png",
	"static/images/allcards01.png",
	"static/images/allcards02.png",	
	"static/images/allcards03.png",	
	"static/images/allcards04.png",	
	"static/images/taskparts00.png",
	"static/images/taskparts01.png",
	"static/images/taskparts02.png",
	"static/images/taskparts03.png",
	"static/images/test00.png",
	"static/images/test01.png"];

psiTurk.preloadImages(cardnames);
psiTurk.preloadImages(instruction_images);


// Interface variables
var cardh = 180, cardw = 140, upper = 0, left = 0, imgh = 100, imgw = 100;

// Tasks
catfuns = [
	function (num) {
		// Shepard type I
		//0  0 0 0 - 0
		//1  0 0 1 - 1
		//2  0 1 0 - 0
		//3  0 1 1 - 1
		//4  1 0 0 - 0
		//5  1 0 1 - 1
		//6  1 1 0 - 0
		//7  1 1 1 - 1

		return num % 2;
	},
	function (num) {
		// Shepard type II
		//0  0 0 0 - 0
		//1  0 0 1 - 1
		//2  0 1 0 - 1
		//3  0 1 1 - 0
		//4  1 0 0 - 0
		//5  1 0 1 - 1
		//6  1 1 0 - 1
		//7  1 1 1 - 0

		return ((num&2)/2)^(num&1);
	},
	function (num) {
		// Shepard type III
		//0  0 0 0 - 1
		//1  0 0 1 - 0	 E
		//2  0 1 0 - 1	 E
		//3  0 1 1 - 0
		//4  1 0 0 - 1
		//5  1 0 1 - 1  E
		//6  1 1 0 - 0  E
		//7  1 1 1 - 0

		if (num & 1) { return ((num%8)===5) ? 1 : 0; }
		else { return (num % 8)===6 ? 0 : 1; }
	},
	function (num) {
		// Shepard type IV
		//0  0 0 0 - 1
		//1  0 0 1 - 1		E
		//2  0 1 0 - 1	E
		//3  0 1 1 - 0 E
		//4  1 0 0 - 1 E
		//5  1 0 1 - 0	E
		//6  1 1 0 - 0	   E
		//7  1 1 1 - 0

		var score = 0; // prototypicality score
		if ( num & 1 ) { score++; }
		if ( num & 2 ) { score++; }
		if ( num & 4 ) { score++; }
		return (score>=2) ? 0 : 1;
	},
	function (num) {
		// Shepard type V
		//0  0 0 0 - 1
		//1  0 0 1 - 0
		//2  0 1 0 - 1
		//3  0 1 1 - 0
		//4  1 0 0 - 1
		//5  1 0 1 - 0
		//6  1 1 0 - 0  E
		//7  1 1 1 - 1  E

		if (num & 1) { return (num%8 === 7) ? 1 : 0; }
		else { return (num%8 === 6) ? 0 : 1; }
	},
	function (num) {
		// Shepard type VI
		//0  0 0 0 - 1
		//1  0 0 1 - 0
		//2  0 1 0 - 0
		//3  0 1 1 - 1
		//4  1 0 0 - 0
		//5  1 0 1 - 1
		//6  1 1 0 - 1
		//7  1 1 1 - 0		
		
		if (num & 1) { return (num&2)^((num&4)/2) ? 1:0; }
		else { return (num&2)^((num&4)/2) ? 0:1; }
	}
];
var catfun;
var catresponse;
// var conditionObj;
var nmarbles;
var ticketvalue;

// Stimulus counterbalancer
var getstim = function(theorystim,conditionObj) {
	assert( theorystim < 8, "Stim >=8 ("+theorystim+")");
	assert( theorystim >= 0, "Stim less than 0 ("+theorystim+")");
	var flippedstim = theorystim^conditionObj.dimvals; // Here the stim identities are flipped
		/* Detail on the above line: ^ is bitwise XOR operator. 
		/ dimvals is either 0 or 1, and theorystim is between 0 and 7 inclusive. 
		/ When dimvals is 0, flippedstim will be the same decimal number as theorystim.
		/ When dimvals is 1, flippedstim will swap 0 with 1 and vice versa, 
		/ 2 with 3 and vice versa,
		/ 4 with 5 et,
		/ 6 with 7. 
		/ So we have these groups [0,1] [2,3] [4,5] [6,7] where flippedstim will be the 
		/ partner of the original value of theorystim IF dimvals is 1. 
		*/
	var bits = new Array();
	for (var i=0; i<3; i++) {
		bits.push( flippedstim&Math.pow(2,i) ? 1 : 0 );
		/* Ampersand & is bitwise AND operator.
			note: flippedstim is between 0 and 7 inclusive
			note: Math.pow(2,i) == 2**i and 0<i<3 so the expression has possible decimal values 1,2,4 (in binary, 1, 10, 100)
			x & 1 returns 1 for odd numbers x=[1,3,5,7] else 0
			x & 2 returns 2 for x=[2,3,6,7] else 0
			x & 4 returns 4 for x=[4,5,6,7] else 0
			The ? 1:0 portion just means change any "1,2,4" result to simply 1, else 0 
		   SO, bits contains the category (0 or 1) of the stimulus under these three rules (right?)
			e.g., for 
			x=0 bits=[0,0,0]; x=1 bits=[1,0,0]
			x=2 bits=[0,1,0]; x=3 bits=[1,1,0]
			x=4 bits=[0,0,1]; x=5 bits=[1,0,1]
			x=6 bits=[0,1,1]; x=7 bits=[1,1,1]
		*/
	}
	
	changeorder(bits, conditionObj.dimorder); // This function is defined in utils.js
	
	var multiples = [1, 2, 4];
	var ret = 0;
	for (i=0; i<3; i++) {
		ret += multiples[i] * bits[i]; // Here we convert from binary [bits] to decimal
	}
	return ret;
};

// Mutable global variables
var responsedata = [],
	currentblock = 1,
	instructround = 0,
	currenttrial = 1,
	totalmisses = 0,
	datastring = "";

/**************************************
* INSTRUCTIONS & COMPREHENSION CHECK
**************************************/
var loop = 1;
var quiz = function(conditionObj,complete_fn) {

	function record_responses() {
		var allRight = true;

		// Use jquery selector to select all input elements and then process each of them
		$("form :input").each( function(i, val) {
			psiTurk.recordTrialData({'phase':"INSTRUCTQUIZ", 'question':this.name, 'answer':this.value, 'checked':this.checked});

			// Check the answers on the dropdown menus questions,
			// where the value tells us which option they selected
			if(this.id==='rule' && this.value != 'ruleYes'){
				allRight = false;
			}else if(this.id==='group' && this.value != 'groupEven'){
				allRight = false;
			}else if(this.id==='test' && this.value != 'testEight'){
				allRight = false;
			}else if(this.id==='marbles' && this.value != 'marblesZero'){
				allRight = false;
			}else if(this.id==='help' && this.value != 'helpNo'){
				allRight = false;
			}else if(this.id==="games" && this.value != 'gamesD'){
				allRight = false;
			}else if(this.id==='fill' && this.checked!=true ){ allRight = false; }
			else if(this.id==='shape' && this.checked!=true ){ allRight = false; }
			else if(this.id==='size' && this.checked!=true ){ allRight = false; }
			else if(this.id==='pattern' && this.checked!=false ){ allRight = false; }
			else if(this.id==='borderstyle' && this.checked!=false ){ allRight = false; }
			else if(this.id==='bordercolor' && this.checked!=false ){ allRight = false; };
		});
		return allRight;
	};

	psiTurk.showPage('quiz.html')

	// // Incentive question's multiple choice answers depend on condition
	// $('select[id=incent] option[value="incentA"]').html('$'+(1*ticketvalue).toFixed(2));
	// $('select[id=incent] option[value="incentB"]').html('$'+(2*ticketvalue).toFixed(2));
	// $('select[id=incent] option[value="incentC"]').html('$'+(3*ticketvalue).toFixed(2));
	// $('select[id=incent] option[value="incentD"]').html('$'+(4*ticketvalue).toFixed(2));

	$('#continue').click(function () {
		if(record_responses()){

			// Record that the user has finished the instructions and
			// moved on to the experiment. This changes their status code
			// in the database.
			psiTurk.recordUnstructuredData('instructionloops', loop);
			psiTurk.finishInstructions();
			// Move on to the experiment
			submit_data(complete_fn);
		} else {
			loop++;
			psiTurk.showPage('restart.html');
			$('.continue').click(function() {
				//Normally would be psiturk.doinstructions here, but we have custom fxn in instructions.js 
				submit_data(function () { 
							doCustomInstructions(psiTurk, conditionObj, instruct_stage, function () {
							  quiz( conditionObj, function() {
							    introduceGame(conditionObj, function() {
								  currentview = new CardLabeling(conditionObj, true);
								})
							  })
							})
				});
			});
		}
	});
};

/*
Before each game, introduce the game by saying what number game it is and what the 
reward will be for good performance (incentive level) 
*/
var introduceGame = function(conditionObj, callback) {
	// display transition page html
	psiTurk.showPage('transition.html')
	console.log("ticketval: "+conditionObj.ticketvalue)
	var gameInt = conditionObj.game + 1;
	$('h1').text("Game " + gameInt + " of " + ngames);
	var ticketimg="";
	if (conditionObj.ticketcolor === "blue"){ //low value
		ticketimg = "static/images/1ticket.png";
	} else if (conditionObj.ticketcolor === "gold"){ //high value
		ticketimg = "static/images/1ticket-gold.png";
	} else {
		console.log("error finding image to use for ticket. ticket value not in possible values")
	}

	// add custom javascript to personalize for ensuing game round
	$('.main').append("<p>In the next game, each bonus ticket is worth <b>$"+conditionObj.ticketvalue.toFixed(2)+"</b>.</p>"+
				"<img src='" + ticketimg + "' class='center'>" +
				"<p>Note: the grouping of the eight cards into two groups has been reset." +
				" The rule from previous rounds does <b>NOT</b> carry over.</p>");

	// continue button in the html 
	$('#continue').click(callback); // maybe don't need extra function wrapping
	$('#continue').attr('style', 'width: auto;');
	$("p").attr("style", "font-size: 150%");

}

/*
Card Labeling Task
-Present stimulus, record category response from subj, give feedback (or not)

TODO:
- 
*/
var CardLabeling = function(conditionObj, givefeedback) {

	// if (DEBUGTASK) {
	// 	console.log(mycondition);
	// 	console.log(mycounterbalance);
	// 	console.log(conditionObj);
	// 	console.log(givefeedback);
	// }
	// console.log(conditionObj);

	var i,
		self = this, // make 'this' accessble by privileged methods
		lock,
		buttonson,
		prescard,
		testcardsleft = new Array();

	var blocktrial = 1;

	var nRepeats = conditionObj.nRepeats;
	catfun = catfuns[conditionObj.rule];

	self.hits = new Array(); // Not hits as in HITs, hits as in "hit vs. miss" aka "correct get"

	var buttons = '<p id="prompt">Which group does the object belong to?\
		<div id="inputs">\
				<input type="button" id="CategoryA" value="A" class="responseButton">\
				<input type="button" id="CategoryB" value="B" class="responseButton">\
		</div>';

	// This is our "stage" base html page to put stuff on (buttons, text)
	if (givefeedback){
		psiTurk.showPage('learnstage.html');
	} else {
		psiTurk.showPage('teststage.html');
	}
	
	// In the "query" element of our html page, present the A and B buttons
	var addbuttons = function() {

		buttonson = new Date().getTime();
		$('#query').html( buttons );
		$('input').click( function(){
			catresponse(this.value);
		});
		$('#query').show();
	};

	// On button click, do this. Was the category selection a hit (correct) or a miss (incorrect)?
	// givefeedback BOOLEAN determining whether FEEDBACK provided TO SUBJECT
	catresponse = function (buttonid){
		if (lock) { return false; }
		var phase; // learning phase or testing phase?
		var rt = new Date().getTime() - buttonson,
			washit,
			resp = categorynames.indexOf(buttonid), // should be "A" or "B"
			actual = catfun(prescard); // should be "A" or "B"
		washit = resp === actual;
		lock = true;

		// Depending on whether givefeedback is true or false, we know we are in learn or test phase
		if (givefeedback===true) {
			phase='learn';
			var hitmessage = '<span style="color: #0F0;"><p style="font-size: 42px;">CORRECT.</p>';
			var missmessage = '<span style="color: #F00;"><p style="font-size: 42px;">INCORRECT!</p>';
			var respmessages = ['<p style="font-size: 24px">The correct answer was A.</p></span>',
								'<p style="font-size: 24px">The correct answer was B.</p></span>'];
			$('#query').html((washit ? hitmessage : missmessage) + respmessages[actual]);
		} else {
			phase='test';
			if (washit) {conditionObj.testscore+=1;} // add a correct answer to their test score (max 8) if they got the answer right
			$('#query').html('<p style="font-size: 24px">Your response has been recorded.</p></span>')
		};

		setTimeout( function() {
				$("#stim").hide();
				$("#query").hide();
				setTimeout( nextcard, 500); // go to the next trial (or next block) //NOTE does this need to be nextcard()?
			}, 
			1500); // CHANGE THIS TO SHOW FEEDBACK LONGER? TBD
		self.hits.push( washit );

		// this is irrelevant for my uses
		if (! washit) totalmisses += 1;

		// NOTE: condition and counterbalance are integers that psiturk defines in exp.html
		// the range of these integers is determined by config.txt (num_conds and num_counters)
		psiTurk.recordTrialData({'phase':phase,
								 'game':conditionObj.game,
								 'ticketvalue':conditionObj.ticketvalue,
								 'rule':conditionObj.rule,
								 'dimorder': conditionObj.dimorder,
								 'dimvals': conditionObj.dimvals,
								 'condition': PSITURKcondition,
								 'counterbalance': PSITURKcounterbalance,
								 'ticketcolor':conditionObj.ticketcolor,
								 'block':currentblock,
								 'trial':currenttrial,
								 'blocktrial':blocktrial,
								 'nrepeats':nRepeats,
								 'theorystim':prescard,
								 'actualstim':getstim(prescard,conditionObj),
								 'correct':actual,
								 'resp':resp,
								 'hitormiss':washit,
								 'rt':rt,
								 'bonustodate':bonusearned
								});

		currenttrial++;

		return false;
	};

	// At the end of the learning phase, move to the test phase
	var finishblock = function() {

		currentblock++;
		var message,
			complete_fn;

		if (givefeedback===true) {
			complete_fn = function() { currentview = new CardLabeling(conditionObj,false); };
			message = '<h1>Learning round complete</h1>' +
						'<p>Round complete!</p>' +
						'<p>Now, you will complete a short <b>test</b>. You will see each ' +
						'item <strong>once</strong> and report whether it is in group A ' +
						'or in group B.</p>' +
						'<p>Your performance in this next part will determine your bonus payment.</p>';
		} else { //After test, move to bonus-determining phase
			complete_fn = function() {currentview = new bonus_mag(conditionObj);}; 
			message = '<h1>Test complete</h1>' +
						'<p>Press <strong>continue</strong> to see your score.</p>' +
						'<p>We will use your score to determine your bonus earnings for this game.</p>';
		}

		$('body').html( message + '<input type="button" id="continue" value="Continue"></input>');
		
		$('#continue').click(function(){ submit_data(complete_fn); });
		$('#continue').attr('style', 'width: auto;');
		$("p").attr("style", "font-size: 150%");

		// if (conditionObj.game < ngames-1){
		// 	$('#continue').click(function(){ submit_data(complete_fn); });
		// 	$('#continue').attr('style', 'width: auto;');
		// 	$("p").attr("style", "font-size: 150%");
		// } else {
		// 	$('#continue').click(function(){ submit_data(complete_fn); });
		// 	$('#continue').attr('style', 'width: auto;');
		// 	$("p").attr("style", "font-size: 150%");
		// }
		
	};

	var nextcard = function () {
		var done = false;
		if (! testcardsleft.length) {
			finishblock();
		}
		else {
			prescard = testcardsleft.pop();
			//stimimage = testcardpaper.image( cardnames[getstim(prescard)], 0, 0, imgw, imgh);
			$("#stim").attr("src", cardnames[getstim(prescard,conditionObj)]);
			setTimeout(
				function(){
							$('#stim').show();
						},
						100);
			
			setTimeout(
				function(){
					lock=false;
					addbuttons();
				},
				600);
		}
	};


	// If learning phase, nTrials
	if (givefeedback===true){
		testcardsleft = new Array(nRepeats).fill(allstims).flat(); 
		// console.log(testcardsleft)
	} else { // If testing phase, 8 trials (one per stim)
		testcardsleft = allstims.slice(0);
	}
	
	// Shuffle the cards randomly and present next one
	shuffle(testcardsleft);
	$("#stim").attr("width", imgw);
	$('#query').hide();
	nextcard();
	return self; // What if this line isn't here? Should be the same?
};

// Below functions handle data submission and errors in submission
let submit_data = function(complete_fn) {
		psiTurk.saveData({
			success: function(){ complete_fn(); },
			error: function() { prompt_resubmit(complete_fn); }
		});    	
};
let prompt_resubmit = function(complete_fn) {
	var error_message = "<h1>Oops!</h1><p>Something went wrong saving your data. This might happen if you lose your internet connection momentarily. Press the button to resubmit. </p><button id='resubmit'>Resubmit</button>";
	document.body.innerHTML = error_message;
	$("#resubmit").click(resubmit(complete_fn));
};
let resubmit = function(complete_fn) {
	document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
	reprompt = setTimeout(prompt_resubmit(complete_fn), 10000);
	
	psiTurk.saveData({
		success: function() {
			clearInterval(reprompt); 
			complete_fn();
		}, 
		error: function() { prompt_resubmit(complete_fn); }
	});
};

/****************
 * Bonus *
 -Get test score from ajax call to custom.py route
 -Show their score on the test
 -Show marbles in bag (nCorrect, nMarbles), and corresponding probability of bonus
 -Show them their system clock and describe what result would get them bonus
 -Let them click to stop the clock
 -Use clock milliseconds result to determine bonus payment
 -Save bonus payment to database
 -Move to complete_fn (questionnaire)
****************/

// var bonus = function() {
// 	// compute bonus route gives us score on the test and resulting bonusprob
// 	complete_fn = function(){
// 		submit_data( function(){
// 			currentview = new Questionnaire();
// 		});
// 	};

// 	psiTurk.showPage('bonusstage.html');

// 	var nblue=(testscore>4 ? testscore-4 : 0);
// 	console.log(testscore)
// 	console.log(nblue)

// 	// Show score and resulting probability of bonus. show marbles bag
// 	var bonusprob = nblue/nmarbles * 100;

// 	displaytext(["Your score on the test was: "+testscore+" correct out of 8 test questions.",
// 		"Therefore, " + nblue + " marble(s) in your bag turned blue."]);
// 	displaymarbles(nmarbles, nblue);

// 	$(".instruct-content").append("<p>The chance of picking a blue marble out of your bag is " + nblue + " out of " + nmarbles + ". This gives you a " + bonusprob + "% chance of winning the bonus $" + conditionObj.bonusvalue + ".</p>" +
// 		"<p>You will now stop the clock below to randomly determine if you get the bonus. The last two digits of the millisecond clock will be a number between 00 and 99. If this number is below " + bonusprob + ", you win the $" + conditionObj.bonusvalue + " bonus.</p>");
	
// 	// event listener stops clock and then saves the ms precision number
// 	var clockinterval = 10 //ms
// 	let cbtn = document.getElementById("clockbtn");
// 	var myclock = document.getElementById("clock")
// 	var timer = null;
// 	var update = true;
// 	cbtn.addEventListener("click", function(){
// 		cbtn.disabled=true;
// 		update = false;
// 		clearInterval(timer);  // Cancel the timer
// 		// get current time on frozen clock
// 		var timestop = document.getElementById("clock").textContent;
// 		var lasttwodigits = timestop.slice(-5,-3); //string slice from clock string
// 		//add text below that's like "ok the last two digits of this are xx"
// 		var message = "<p>The last two digits are " + lasttwodigits + ".</p>"
// 		$('.belowclock').append( message );

// 		// do the math and then tell them if they won 
// 		var win = lasttwodigits<=bonusprob;
// 		var winmsg = "You win the $10 bonus! </br>";
// 		var losemsg = "Sorry, you didn't win the $10 bonus. </br>";
// 		var contmsg = "Press next to continue: "
// 		$('.belowclock').append((win ? winmsg : losemsg) + contmsg);

// 		// save data of clock time when paused, bonus prob, and resulting bonus
// 		psiTurk.recordTrialData({'phase':'bonus',
// 								'testscore':testscore,
// 								'timestop':timestop,
// 								'lasttwodigits':lasttwodigits,
// 								'bonusprob':bonusprob,
// 								'bonus': (win ? conditionObj.bonusvalue : 0),
// 							});

// 		//continue button 
// 		// Add button
// 		var btn = document.createElement("button");
// 		btn.innerHTML = "Next"; 
// 		$('.belowclock').append(btn);
// 		btn.addEventListener("click", complete_fn);
// 	});
	
// 	// Get a reference to the timer and start the clock
// 	timer = setInterval(function() {currentTime(myclock,update)}, clockinterval);

// };

function currentTime(myclock,updateclock) {
	var date = new Date(); /* creating object of Date class */
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var ms = date.getMilliseconds();
	var midday = "AM";
	midday = (h >= 12) ? "PM" : "AM"; /* assigning AM/PM */
	h = (h == 0) ? 12 : ((h > 12) ? (h - 12): h); /* assigning hour in 12-hour format */
	if(m<10){m='0'+m;}
	if(s<10){s='0'+s;}
	if(ms<100){ms='0'+ms;}
	if(ms<10){ms='0'+ms;}

	// format into string
	// var myclock = document.getElementById("clock")
	if (myclock && updateclock) {myclock.textContent = h + ":" + m + ":" + s + ":"+ ms +" " + midday;}
	// only edit the clock if the clock element exists
}

var bonus_mag = function(conditionObj) {
	// compute bonus route gives us score on the test and resulting bonusprob
	if (conditionObj.game + 1 < ngames){
		// this game is over so move to next
		complete_fn = function(){
			submit_data( function(){
				// update the condition object for the next game
				game++;
				var mycondition = conds[game];
				var mycounterbalance = cbs[game];
				// Manually assign condition to subject regardless of counterbalance
				var newconditionObj = {
							game: game,
							ticketvalue: ticketvalues[Math.floor(mycondition/2)], // number of points each correct answer is worth
							rule: rules[mycondition % 2],// two of six possible rules being tested 
							dimorder: Math.floor(mycounterbalance/8),//"{{ dimorder }}", // 0-NDIMORDERS-6; which order to order the dimensions
							dimvals: mycounterbalance % 8,//"{{ dimvals }}", // 0-NFDIMFLIPS-8, whether a '0' means 0 or 1 in terms of the stim.
							nRepeats: NLEARNINGREPS, //# such that nTrials will be 8 * nRepeats during learning
							testscore: 0,
							ticketcolor: (mycondition < 2) ? 'blue' : 'gold' 
							};
				introduceGame(newconditionObj,function(){
					currentview = new CardLabeling(newconditionObj, true);
				})
			});
		};
	} else { // we have done all games already
		complete_fn = function(){
			submit_data( function(){
				currentview = new Questionnaire();
			});
		};
	};
	

	psiTurk.showPage('bonusstage.html');

	var nblue=(conditionObj.testscore>4 ? conditionObj.testscore-4 : 0);
	console.log(conditionObj.testscore)
	console.log(nblue)

	$('.clockdiv').hide();

	// Show score and resulting probability of bonus. show marbles bag
	var bonusprob = nblue/nmarbles * 100;

	bonusearned += nblue*conditionObj.ticketvalue;

	var ticketimg="";
	if (conditionObj.ticketcolor === "blue" && nblue>0){ //low value
		ticketimg = "static/images/"+nblue+"ticket.png";
	} else if (conditionObj.ticketcolor === "gold" && nblue>0){ //high value
		ticketimg = "static/images/"+nblue+"ticket-gold.png";
	} else {
		console.log("no tickets earned")
	}

	displaytext(["Your score on the test was: "+conditionObj.testscore+" correct out of 8 test questions.",
		"This means you earned " + nblue +" "+ conditionObj.ticketcolor + " ticket(s).",
		"<img src='" + ticketimg + "' class='center'>",
		"Therefore, you have earned a $" + (nblue*conditionObj.ticketvalue).toFixed(2) + " bonus.",
		"This means your total bonus winnings so far comes to: $" + bonusearned.toFixed(2)]);

	// save data of clock time when paused, bonus prob, and resulting bonus
	psiTurk.recordTrialData({'game':conditionObj.game,
							'phase':'bonus',
							'rule':conditionObj.rule,
							'testscore':conditionObj.testscore,
							'timestop':null,
							'lasttwodigits':null,
							'bonusprob':bonusprob,
							'ticketvalue':conditionObj.ticketvalue,
							'ticketcolor':conditionObj.ticketcolor,
							'bonus': (nblue*conditionObj.ticketvalue).toFixed(2),
							'totalbonustodate': bonusearned,
						});

	// Add button
	var btn = document.createElement("button");
	btn.innerHTML = "Next"; 
	$('.belowclock').append(btn);
	btn.addEventListener("click", complete_fn);

};

// All above code defines the task itself: the game proper.
// Now we will code the questionnaire that occurs after the task ends:
/****************
 * Questionnaire *
****************/
var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});
		$('input').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
				clearInterval(reprompt); 
				psiTurk.computeBonus('compute_bonus', function(){ // NOTE: just complete HIT here since bonus calculated before
					psiTurk.completeHIT(); // when finished saving compute bonus, the quit
				}); 


			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
		record_responses();
		psiTurk.saveData({
			success: function(){
				psiTurk.computeBonus('compute_bonus', function() { 
					psiTurk.completeHIT(); // when finished saving compute bonus, the quit
				}); 
			}, 
			error: prompt_resubmit});
	});
	
	
};


/*******************
 * Run Task
 ******************/
/* Alas, now that we have defined all the functions necessary to conduct our task, 
   it is time to tell the computer what to do first. So we say, "Hey, please begin with the 
   instructions, and then when you finish the instructions do the quiz, and then when you
   finish the quiz do the experiment." VOILA

   So if you wanted to just debug and not deal with the instruction pages, could just do
   currentview = new experiment(); 
*/
$(window).on('load', async () => {
    await init;

	var mycondition = conds[game];
	var mycounterbalance = cbs[game];
	// Manually assign condition to subject regardless of counterbalance
	var conditionObj = {
				game: game,
				ticketvalue: ticketvalues[Math.floor(mycondition/2)], // number of points each correct answer is worth
				rule: rules[mycondition % 2],// two of six possible rules being tested 
				dimorder: Math.floor(mycounterbalance/8),//"{{ dimorder }}", // 0-NDIMORDERS-6; which order to order the dimensions
				dimvals: mycounterbalance % 8,//"{{ dimvals }}", // 0-NFDIMFLIPS-8, whether a '0' means 0 or 1 in terms of the stim.
				nRepeats: NLEARNINGREPS, //# such that nTrials will be 8 * nRepeats during learning
				testscore: 0,
				ticketcolor: (mycondition < 2) ? 'blue' : 'gold' 
				};

	console.log("game:"+game)
	// console.log("conds:"+conds)

	// If debugging, present only part of the experiment, otherwise run full exp
	if(DEBUGTASK===true || conditionObj.game>0){
		currentview = new CardLabeling(conditionObj, true);
	} else if (DEBUGPOST===true){
		currentview = new bonus_mag();
	} else{ // its the first game and you're not debugging
		// run custom instructions code from instructions.js
		doCustomInstructions(psiTurk, conditionObj, instruct_stage,function () {
		 quiz( conditionObj, function() {
		  introduceGame(conditionObj, function() {
			currentview = new CardLabeling(conditionObj, true);})
		 })
		});

	};
  
	

	
});


