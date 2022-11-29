var psiTurk = PsiTurk(uniqueId, adServerLoc, mode);

// Are you debugging the code and wish to skip instructions/quiz?
var DEBUGTASK = false; // skip instructions only
var DEBUGPOST = false; // skip instructions and task

// Card category recognition rather than rule discovery. Multiple trials instead of games
// Magnitude rather than probability of reward is controlled by performance
// AND now we are doing four games in a row with four diff conditions (two rules, two incents)
var nCardsShown = 24; // needs to be even if difference is even
var difference = 2;

var nCardRows = 3;
var nCardCols = nCardsShown/nCardRows;
var columnWidth = 1/nCardCols;

var less = (nCardsShown - difference)/2; // 5
var more = nCardsShown-less; // 7 when ncards is 12 and diff 2

var nTrials = 40; // 40 for final exp 
var trial=0; // starts at 0 and goes to 39

var score = 0; // cumulative keep track of all points earned so far 
var bonusValue = 10; // amount of bonus that can be won


// in this exp, we set two conditions (rule=1 or rule=3, zero indexed)
// there will be 10 possible counterbalance conditions just to systematically randomize the rules everyone gets
var PSITURKcondition = condition; // these two variables are passed by the psiturk server process
var PSITURKcounterbalance = counterbalance;  // they tell you which condition you have been assigned to

// 
var ruleConditions = [0,1,3]; // What rules are we testing? e.g., 1 2 and 4 (zero indexed)
var mycondition = ruleConditions[PSITURKcondition]; // same for ALL trials

// 40 random numbers between 0 and 47 (one for each trial)
// 10 such lists (take the PSITURKcounterbalance-th one)
var counterbalancing = [[19, 38, 40,  9, 40, 31, 45, 12, 27, 39, 26, 25,  6, 45, 12,  2, 11, 21,   5,  0, 12, 21, 41, 15, 26, 19, 33, 39, 15, 36,  1,  1, 43, 15, 22, 39,  19, 25,  2, 10,],
	[44, 35, 32, 13, 22, 38, 31, 30, 14,  0, 21,  6, 32, 34, 32, 14, 31, 14,  19, 16,  6,  2, 18, 21, 27, 43, 10,  7, 42, 19, 21, 37,  6,  4, 22, 43,   8, 21, 32, 36,],
	[11,  1, 41, 26, 37, 41, 39, 17, 32, 35, 23, 42, 29, 42, 38,  4, 29, 32,  21, 27, 33, 40, 27, 31, 34, 36,  0, 27, 11, 36, 32, 24, 25, 14, 41, 37,   6, 21,  5,  7,],
	[ 4, 16, 38,  9, 47, 43,  6, 31,  2,  0, 15, 32, 15,  2, 34, 22, 42,  2,  40, 25,  1, 14, 16, 38, 20, 23,  6,  2, 45, 23, 38, 23, 24, 21, 42, 35,  31, 42,  3,  9,],
	[21,  1, 16, 17, 38, 11,  4, 43, 16, 28, 29, 35, 35, 39, 10, 16,  7, 20,  33,  8, 17,  6, 36, 10, 35, 25, 42, 17, 30,  0,  9, 38, 41, 29, 32, 24,  45,  4,  2, 20,],
	[ 1, 41, 35, 13, 18, 34,  3, 35, 21, 12, 37, 22, 17,  0, 36,  4, 20, 21,   8, 29, 21, 32, 45,  3, 42, 35,  9, 13, 17, 35,  6, 39,  7, 41, 47, 41,  24, 42, 33, 23,], 
	[17, 41, 26, 20, 16, 15,  8,  9, 31,  3,  5, 16, 47, 24, 28,  7, 47, 42,  23, 28, 39, 45,  5,  8,  3,  4, 45,  8, 16, 19,  8, 22, 28,  6,  7,  3,  47,  4,  3, 13,], 
	[41, 19,  0, 28, 13, 34, 10, 36, 13, 16,  0, 20, 19, 17,  1, 16, 47, 17,  47, 11,  4, 40, 29,  5, 20, 11, 32, 42, 22, 17, 44, 26, 20, 37, 37, 41,  29, 47, 29, 30,], 
	[13, 17, 36, 20, 46, 11, 45, 10, 40, 39,  0, 16, 30, 15, 17, 36, 10,  3,  32, 40, 31, 45,  8, 43, 33, 16, 35, 43, 31, 43, 31, 25, 28, 32, 27, 33,  12, 18,  4, 31,],
	[13,  2, 13, 43, 28, 42,  5,  1, 11, 35,  2, 31,  1, 41, 42,  2, 26, 43,  39,  1, 23, 29, 12,  5,  9, 45, 13,  9, 36, 40, 36, 25, 34, 22, 46, 47,  20, 18, 33,  3,]]

var cbs = counterbalancing[PSITURKcondition];

allRoundsPointVals = [ 0,0,0,0,0,0,0,0,
			1,1,1,1,1,1,1,1,
			2,2,2,2,2,2,2,2,
			4,4,4,4,4,4,
			8,8,8,8,8,
			16,16,16,
			32,32];

// Shuffle the rounds randomly and present next one
shuffle(allRoundsPointVals);
var alltrials = allRoundsPointVals.slice(0,nTrials); // if fewer than 40 trials

// Pre-load html pages 
var pages = [
	"instructions.html",
	"transition.html",
	"quiz.html",
	"restart.html",
	"stage.html",
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
	"static/images/allcards00.png",
	"static/images/allcards01.png",
	"static/images/allcards02.png",	
	"static/images/allcards03.png",	
	"static/images/allcards04.png",	
	];

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

// Stimulus counterbalancer
var getstim = function(theorystim,conditionObj) {
	assert( theorystim < 8, "Stim >=8 ("+theorystim+")");
	assert( theorystim >= 0, "Stim less than 0 ("+theorystim+")");
	var flippedstim = theorystim^conditionObj.dimvals; // Here the stim identities are flipped
		/* Detail on the above line: ^ is bitwise XOR operator. 
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
	instructround = 0,
	currenttrial = 1,
	totalmisses = 0;

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
			}else if(this.id==='help' && this.value != 'helpNo'){
				allRight = false;
			}else if(this.id==="games" && this.value != 'gamesC'){
				allRight = false;
			}else if(this.id==="chance" && this.value != 'chanceA'){
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
			// TODO: if they are going to be starting their 6th loop, just end the exp? 
			psiTurk.showPage('restart.html');
			$('.continue').click(function() {
				//Normally would be psiturk.doinstructions here, but we have custom fxn in instructions.js 
				submit_data(function () { 
							doCustomInstructions(psiTurk, conditionObj, instruct_stage, function () {
							  quiz( conditionObj, function() {
							    introduceGame(conditionObj, function() {
								  currentview = new CardLabeling(conditionObj);
								})
							  })
							})
				});
			});
		}
	});
};

/*
Before each trial, introduce the game by saying what number trial it is and what the 
rule is and what the points level is 
*/
var introduceGame = function() {
	// display transition page html
	// $('h1').text("Game timeeee");
	// var ticketimg="";
	if (trial>=nTrials) {
		finishblock();
	}else {
		var mycounterbalance = cbs[trial];
	var points = alltrials[trial];
    var dimorder = Math.floor(mycounterbalance/8);//"{{ dimorder }}", // 0-NDIMORDERS-6; which order to order the dimensions
	var dimvals = mycounterbalance % 8;//"{{ dimvals }}", // 0-NFDIMFLIPS-8, whether a '0' means 0 or 1 in terms of the stim.
	var ruletext="Text generation error - please email the HIT requester."; 

	$.ajax({
        dataType: "json",
        url: "/rule_to_text",
        data: {rule: mycondition, dimorder: dimorder, dimvals: dimvals},
        success: function(data){
            ruletext = data.results;
        }
    }).done( ()=>{
    	psiTurk.showPage('transition.html')

    	var conditionObj = {
					trial: trial,
					rule: mycondition,// declared at the top, same for all trials
					ruletext: ruletext, // text description of the rule
					dimorder: dimorder,
					dimvals: dimvals,
					ncards: nCardsShown,
					ntrials: nTrials, 
					points: points,
					bonusvalue: bonusValue
					};

		// add custom javascript to personalize for ensuing game round
		$('.main').append("<p>ROUND " + String(trial + 1) +" of " + conditionObj.ntrials + "</p>");
		$('.main').append("<p>This round is worth <b>" + points + " point(s)</b>.</p><br>");
		$('.main').append("<p>The rule on this round is: </p>");
		$('.main').append("<p>" + conditionObj.ruletext + "</p><br>");

		// continue button in the html 
		$('#continue').click(function() {
				currentview = new CardLabeling(conditionObj);}); // maybe don't need extra function wrapping
		$('#continue').attr('style', 'width: auto;');
		$("p").attr("style", "font-size: 150%");
	});
	}
}

// At the end of the learning phase, move to the test phase
var finishblock = function() {

	var message,
		complete_fn;

	complete_fn = function() {currentview = new bonus();}; 
	message = '<h1>Task complete</h1>' +
			'<p>Press <strong>continue</strong> to see your score.</p>' +
			'<p>We will use your score to determine your bonus earnings for this game.</p>';


	$('body').html( message + '<input type="button" id="continue" value="Continue"></input>');
	
	$('#continue').click(function(){ submit_data(complete_fn); });
	$('#continue').attr('style', 'width: auto;');
	$("p").attr("style", "font-size: 150%");
	
};

/*
Card Labeling Task
-Present stimulus, record category response from subj, give feedback (or not)

TODO:
- 
*/
var CardLabeling = function(conditionObj) {

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
		points,
		pointroundsleft,
		alltrials,
		allcards,
		moreA;

	var blocktrial = 1;

	var nRepeats = conditionObj.nRepeats;
	catfun = catfuns[conditionObj.rule];

	self.hits = new Array(); // Not hits as in HITs, hits as in "hit vs. miss" aka "correct get"

	// This is our "stage" base html page to put stuff on (buttons, text)
	psiTurk.showPage('stage.html');
	$('#rule').html( '<p>'+conditionObj.ruletext+'</p>' );

	// In the "query" element of our html page, present the A and B buttons
	var addbuttons = function(trial) {

	// TODO: Display points and round numbers 
		var buttons = '	<span><input type="button" id="CategoryA" value="A" class="responseButton"></span>\
					<span id="points"><p style="font-size:24px"><b>' + conditionObj.points  + ' point(s)</b></p></span>\
					<span id="round">Round '+ String(trial + 1) +'/' + conditionObj.ntrials +'</span>\
					<span><input type="button" id="CategoryB" value="B" class="responseButton"></span>';

		buttonson = new Date().getTime();
		$('#query').addClass('distributed')
		$('#query').html( buttons );
		$('input').click( function(){
			catresponse(this.value);
		});
		$('#query').show();
	};

	var addcards = function(moreA) {
		allcards = [];
		var cardshtml = '';
		var numA, numB, nxt;

		if (moreA){
			numA=more;
			numB=less;
		} else {
			numA=less;
			numB=more;
		}

		// label acards and bcards 
		var aCards = [];
		var bCards = [];
		for (i=0; i<8; i++){
			var prescard = allstims[i];
			var cname = cardnames[getstim(prescard, conditionObj)];
			var label = catfun(prescard);
			if (label === 0){ // put this card in the A cards list
				aCards.push(cname);
			} else {
				bCards.push(cname);
			}
		}

		for (var i=0; i<numA; i++) {
			allcards.push(aCards[randrange(0,4)]); // grab a random Group A card several times
		}
		for (var i=0; i<numB; i++){
			allcards.push(bCards[randrange(0,4)]);
		}
		shuffle(allcards);

		for (var r=0; r<nCardRows; r++) {
			cardshtml += '<div class="row">'

			for (var c=0; c<nCardCols; c++){
				nxt = allcards[ r*nCardCols + c];

				cardshtml += '<span class="column" style="width:'+columnWidth.toPrecision(4)+'vw">';
				cardshtml += '<img class="card" src="' + nxt + '">';
				cardshtml += '</span>'; // end column span
			}

			cardshtml += '</div>' // end row div
		}

		$('#cards').html(cardshtml);
		$('#cards').show();
	}

	// On button click, do this. Was the category selection a hit (correct) or a miss (incorrect)?
	catresponse = function (buttonid){
		if (lock) { return false; }
		var phase='task'; // no different learning or testing phase in this version
		var rt = new Date().getTime() - buttonson,
			washit,
			resp = categorynames.indexOf(buttonid), // buttonid should be "A" or "B" so resp will be index 0 or 1
			actual = moreA ? 0 : 1; // if moreA, then A (0) is correct. else, B (1) is correct
		washit = resp === actual;
		lock = true;

		// TODO add the point value of the current trial rather than just adding 1
		if (washit) {score+=conditionObj.points;} // add a correct answer to their test score (max 8) if they got the answer right
		$('#query').removeClass('distributed').addClass('center')
		$('#query').html('<p style="font-size:24px">Your response has been recorded.</p></span>')
		$("#cards").hide();
		setTimeout( function() {
				$("#query").hide();
				setTimeout( introduceGame(), 500); // go to the next trial (or next block) //NOTE does this need to be nextcard()?
			}, 
			1500); // CHANGE THIS TO SHOW FEEDBACK LONGER? TBD
		self.hits.push( washit );

		// this is irrelevant for my uses
		if (! washit) totalmisses += 1;

		// NOTE: condition and counterbalance are integers that psiturk defines in exp.html
		// the range of these integers is determined by config.txt (num_conds and num_counters)
		psiTurk.recordTrialData({'phase':phase,
								 'rule':conditionObj.rule,
								 'dimorder': conditionObj.dimorder,
								 'dimvals': conditionObj.dimvals,
								 'condition': PSITURKcondition,
								 'counterbalance': PSITURKcounterbalance,
								 'trial':trial,
								 'ntrials':conditionObj.ntrials,
								 'points':conditionObj.points,
								 'allcards':allcards,
								 'moreA':moreA,
								 'correct':actual,
								 'resp':resp,
								 'hitormiss':washit,
								 'rt':rt,
								 'scoretodate':score
								});

		trial++;

		return false;
	};

	var nextcard = function () {
		var done = false;

		moreA = Math.random() < 0.5; 

		//stimimage = testcardpaper.image( cardnames[getstim(prescard)], 0, 0, imgw, imgh);
		// $("#stim").attr("src", cardnames[getstim(prescard,conditionObj)]);
		setTimeout(
			function(){
					// SHOW THE CARDS
						addcards(moreA);
					},
					100);
		
		setTimeout(
			function(){
				lock=false;
				addbuttons(trial);
			},
			100);
	};

	

	// $("#stim").attr("width", imgw);
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

var bonus = function() {
	// compute bonus route gives us score on the test and resulting bonusprob
	complete_fn = function(){
		submit_data( function(){
			currentview = new Questionnaire();
		});
	};

	psiTurk.showPage('bonusstage.html');

	var bonusprob = score-100;
	if (bonusprob < 0){
		bonusprob = 0;
	}
	console.log(score)
	console.log(bonusprob)

	// Show score and resulting probability of bonus.
	displaytext(["You earned "+score+" points out of 200 possible points across the game.",
		"Remember, your chance at the bonus is your score minus 100 points, or zero if you earned 100 points or less."]);

	$(".instruct-content").append("<p>This gives you a " + bonusprob + "% chance of winning the bonus $" + bonusValue + ".</p>" +
		"<p>You will now stop the clock below to randomly determine if you get the bonus. The last two digits of the millisecond clock will be a number between 00 and 99. If this number is below " + bonusprob + ", you win the $" + bonusValue + " bonus.</p>");
	
	// event listener stops clock and then saves the ms precision number
	var clockinterval = 10 //ms
	let cbtn = document.getElementById("clockbtn");
	var myclock = document.getElementById("clock")
	var timer = null;
	var update = true;
	cbtn.addEventListener("click", function(){
		cbtn.disabled=true;
		update = false;
		clearInterval(timer);  // Cancel the timer
		// get current time on frozen clock
		var timestop = document.getElementById("clock").textContent;
		var lasttwodigits = timestop.slice(-5,-3); //string slice from clock string
		//add text below that's like "ok the last two digits of this are xx"
		var message = "<p>The last two digits are " + lasttwodigits + ".</p>"
		$('.belowclock').append( message );

		// do the math and then tell them if they won 
		var win = lasttwodigits<=bonusprob;
		var winmsg = "You win the $" + bonusValue + " bonus! </br>";
		var losemsg = "Sorry, you didn't win the $" + bonusValue + " bonus. </br>";
		var contmsg = "Press next to continue: "
		$('.belowclock').append((win ? winmsg : losemsg) + contmsg);

		// save data of clock time when paused, bonus prob, and resulting bonus
		psiTurk.recordTrialData({'phase':'bonus',
								'condition':PSITURKcondition,
								'rule':mycondition,
								'counterbalance':PSITURKcounterbalance,
								'ntrials':nTrials,
								'score':score,
								'timestop':timestop,
								'lasttwodigits':lasttwodigits,
								'bonusprob':bonusprob,
								'bonusvalue':bonusValue,
								'win': win,
								'bonus': (win ? bonusValue : 0),
							});

		//continue button 
		// Add button
		var btn = document.createElement("button");
		btn.innerHTML = "Next"; 
		$('.belowclock').append(btn);
		btn.addEventListener("click", complete_fn);
	});
	
	// Get a reference to the timer and start the clock
	timer = setInterval(function() {currentTime(myclock,update)}, clockinterval);

};

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

	// Manually assign condition to subject regardless of counterbalance
	var cObj = {ncards: nCardsShown,
		bonusvalue: bonusValue,
		rule: mycondition,
	}

	// If debugging, present only part of the experiment, otherwise run full exp
	if(DEBUGTASK===true){
		currentview = new introduceGame();
	} else if (DEBUGPOST===true){
		currentview = new bonus();
	} else{ // its the first game and you're not debugging
		// run custom instructions code from instructions.js
		doCustomInstructions(psiTurk, cObj, instruct_stage,function () {
		 quiz( cObj, function() {
		  introduceGame()
		 })
		});
	};

		
	    
  

	
  
	

	
});


