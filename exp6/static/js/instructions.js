// Custom instructions for category learning experiment 

var bluehex = "#5e97f2";
var redhex = "#bd2e24";


var loadcards = function(cObj){
	var nrounds = 40;
	var nCardsShown = cObj.ncards;

	var card_features = [  {"text":["In this HIT, you will be shown a screen with various cards.",
									"The cards can be sorted into groups based on the picture on the card.",
									"There are 8 different cards."], 
							 "images":["allcards00.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["The shape on the card can be <b>LARGE</b> or <b>SMALL</b>."], 
							 "images":["allcards01.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["Some cards have <b>SQUARES</b>, and some have <b>TRIANGLES</b>."], 
							 "images":["allcards02.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["The color filling the shape can be <b>BLACK</b> or <b>WHITE</b>."], 
							 "images":["allcards03.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["Review: Each card has a shape with a size and color."], 
							 "images":["allcards04.png"],
							 "marbles":[null,null],
							"clock":null
							}
							];

	var card_groups = [{"text":["Four of the cards belong to Group A, and four belong to Group B.",
								"Your job is to identify which cards belong to each group."], 
						"images":["allcards00.png"],
						"marbles":[null,null],
							"clock":null
						},
						{"text":["In this example, all the cards with <b>LARGE</b> shapes are in Group A, and all the cards with <b>SMALL</b> shapes are in Group B. "], 
						 "images":["cardgroups00.png"],
						 "marbles":[null,null],
							"clock":null
						},
						{"text":["In this example, all the cards with <b>SQUARE</b> shapes are in Group A, and all the cards with <b>TRIANGLE</b> shapes are in Group B."], 
						 "images":["cardgroups01.png"],
						 "marbles":[null,null],
							"clock":null
						},
						{"text":["However, the groups could be more complicated.",
						"Here, all the <b>SQUARES</b> are in Group A except for the <b>SMALL BLACK SQUARE.</b>"], 
						 "images":["cardgroups02.png"],
						 "marbles":[null,null],
							"clock":null
						},
						{"text":["There are many different ways the cards can be separated into two groups.",
						"For example, try to think of a rule that explains this grouping:"], 
						 "images":["cardgroups03.png"],
						 "marbles":[null,null],
							"clock":null
						},
						{"text":["There are many different ways the cards can be separated into two groups.",
						"For example, try to think of a rule that explains this grouping:",
						"\“White large shapes and small black shapes are in Group A\” is one rule that works."], 
						 "images":["cardgroups03.png"],
						 "marbles":[null,null],
							"clock":null
						},
						{"text":["Review: half of the cards are in Group A and half are in Group B."], 
						"images":["allcards00.png"],
						"marbles":[null,null],
							"clock":null
						}
						];

	var task_parts  = [
							{"text":["Before you start, we will tell you the rule that determines which cards are in Group A and which are in Group B. ",
							"On each round, you will see "+ nCardsShown+" cards. ",
							"Your job is to determine whether there are more Group A cards or more Group B cards on the screen that round."], 
							 "images":["taskimg01.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["Press the corresponding button (A or B) to answer whether there are more Group A cards or more Group B cards on the screen according to the rule.",
							"If you answer correctly, you will earn the number of points shown on top of the screen. ",
							"Earning more points helps increase your chance of winning the $10 bonus.",
							"You won't be told how many points you have earned until the end of all 40 rounds."], 
							 "images":["taskimg02.png"],
							 "marbles":[null,null],
							"clock":null
							}
							];
	var incentives = [{"text":["Now I will explain how to increase the chance of winning the $10 bonus.",
					"There are <b>40 rounds</b> of the game. Each round is worth a certain amount of points. ",
					"If you choose the correct answer, you will earn that number of points. ",
					"If you choose the wrong answer, you earn 0 points that round. ",
					"In total, there are 2 rounds offering 32 points for a correct answer, 3 rounds offering 16 points, 5 rounds offering 8 points, 6 rounds offering 4 points, 8 rounds offering 2 points, 8 rounds offering 1 point, and 8 rounds offering 0 points.",
					"This means that you will face 40 rounds with the possibility of winning 200 points in total."],
					"images":null,
					"marbles":[null, null],
							"clock":null
					},
					{"text":["The total number of points you can possibly earn is 200 points. ",
					"Since you would get about 100 points if you were just guessing each round, we want to reward you for your performance <b>above</b> 100 points. ",
					"The number of points you get above 100 points will be your probability (chance) at the bonus. ",
					"For example, if you earn 180 points over the whole game, you have an 80% chance of winning the $10 bonus.",
					"If you earn 100 points or less, your chance at winning the bonus is 0% (no bonus), meaning you will receive only the experiment base pay."],
					"images":null,
					"marbles":[null,null],
							"clock":null
					}
					];

	var clockpractice = [ {"text":["<b>Winning the Bonus</b>",
									"To determine if you win the bonus, we will let you stop a clock like the one below. This is your computer clock, presenting the time down to the millisecond (1/1000th of a second).",
									"If the last two digits of the stopped clock are less than your probability of winning, you win the $10 bonus. If the digits are above the probability, you do not win the bonus.",
									"Now, try to stop the clock showing the current time to millisecond precision.",
									"It is impossible for you to control the last two digits of the millisecond clock because of the time it takes the human brain and hand to respond.",
									"The purpose of this is to generate a random number to give you a fair chance at winning the bonus which we (the experimenters) cannot control.",
									"To confirm this randomness, you can start and stop the clock below as many times as you want, to check if you can stop it at a number of your choice."
									],
						"images":null,
						"marbles":[null,null],
						"clock":true
					}
					];

	var review = [  {"text":["<b>Let's review!</b>",
							"There are eight cards, each with a particular SHAPE, SIZE, and COLOR. ",
							"Cards are in Group A or Group B depending on a specific rule. ",
							"Use the rule to determine whether there are more Group A or more Group B cards on each round. ",
							"The more points you earn, the higher your chance at winning the $10 bonus."], 
							 "images":["allcards00.png"],
							 "marbles":[null,null],
							"clock":null
					},
					{"text":["Most importantly, <strong>please do not</strong> use any writing, drawings, or your phone or computer to help you answer each round.",
							"We are cognitive scientists interested in how people identify things using their own minds.",
							"We rely on your honesty for this. Please do your best and it is ok to make mistakes. ",
							"When you're ready to continue, press <strong>Next</strong>."],
					"images":null,
					"marbles":[null,null],
							"clock":null
					}
					];

	// var instruct_cards = [].concat(card_features,card_groups,task_parts, incentives_prob, clockpractice, review);
	var instruct_cards = [].concat(card_features,card_groups,task_parts, incentives, clockpractice, review);

	// var instruct_cards = [].concat(card_features,clockpractice,review);

	return instruct_cards;
};

//Display text
// input to function is array of strings which will be separated by lines
var displaytext = function(strings){
	var fulltext = "";
	for (i=0;i<strings.length;i++){
		fulltext += "<p>" + strings[i] + "</p>";
	}
	d3.select("body").select(".instruct-content")
				.html(fulltext)
};

//Display image(s)
// fname = image filenames
// TODO handle when fname is array of multiple filenames so that those images are displayed side-by-side
var displayimage = function( fname ){
	if (!fname){
		return;
	} else if (fname.length == 1) {
		d3.select("body").select(".instruct-content")
				.append("img")
		    	.attr("src", "static/images/" + fname)
		    	.attr("class", 'center');
	} else {
		for (var img=0; img<fname.length; img++){
			d3.select("body").select(".instruct-content")
				.append("img")
		    	.attr("src", "static/images/" + fname[img])
		    	.attr("class","center");
		}
	}
};

var displayclock = function( showClock ){
	// var timer=null; // move to within [if !showclock] block?
	// if showclock is null or false, donot show clock 
	var update=true;
	if (!showClock){
		var timer=null;
		return;
	} else {
		var timer;
		var clockinterval = 10 //ms
		var instrdiv = document.getElementById("instruct-content");
		// Add clock
		var clock = document.createElement('span');
		clock.setAttribute("id", "clock");
		instrdiv.appendChild(clock);

		var br = document.createElement("br");
		instrdiv.appendChild(br);
		//.insertAdjacentElement("beforeend", clock);

		// Add button
		var cbtn = document.createElement("button");
		cbtn.innerHTML = "Start/Stop"; 
		instrdiv.appendChild(cbtn);

		// Add event listener to button that starts or stops clock depending on current state
		cbtn.addEventListener("click", function(){
		  if(timer !== null){
		  	update = false;
			clearInterval(timer);  // Cancel the timer
			timer = null;  // Reset the timer because the clock is now not ticking.
		  } else {
		  	update = true;
			timer = setInterval(function() {currentTime(clock,update)}, clockinterval);
		  }
		});
		// Get a reference to the timer and start the clock
		timer = setInterval(function(){currentTime(clock,update)}, clockinterval);
	}
}

//Display marbles using d3
var displaymarbles = function( nmarbles, nblue ) {

	if (!nmarbles){
		return;
	};

	// var w = 500;
	// var h = 500;
	var marblerad = 8;

	var xspacing = 40; //w/10; //50
	var yspacing = 40; //h/10; //50
	var xpad = xspacing/2; //25
	var ypad = yspacing/2; //25

	var rows,columns;
	if (nmarbles<8){
		rows = 1;
		columns = nmarbles;
	} else {
		// assert( nmarbles%8==0, "Number of marbles not divisible by 8 ("+nmarbles+")");
		rows = Math.ceil(nmarbles/8);
		columns = 8;
	};

	var w = xspacing * 9;
	var h = yspacing * (rows + 1)

	var dataset = [];
	for (var i=0; i<nmarbles; i++){
		dataset.push({"radius": marblerad, 
					 "color" : redhex, 
					 "xloc": (i%columns) * xspacing + xpad , // x location: column number * xspacing plus padding
					 "yloc": Math.floor(i/8) * yspacing + ypad // y location: ypad from top plus spacing * row number
					});
	};

	// var nblue = 3;
	for (var ii = 0; ii < nblue; ii++){
		dataset[ii].color = bluehex
	};

	var svg = d3.select("body").select(".instruct-content")
	            .append("svg")
	            .attr("width", w)
	            .attr("height", h);

	var circles = svg.selectAll("circle")
	                  .data(dataset)
	                  .enter()
	                  .append("circle");

	circles.attr("cx", function(d) {
	            return d.xloc;
	        })
	        .attr("cy", function(d) {
	            return d.yloc;
	        })
	        .attr("r", function(d) {
	            return d.radius;
	        })
	        .style("fill",function(d) {
	            return d.color;
	        })
};


var doCustomInstructions = function(psiturk_object, cond, stage, callback) {
		instructionController = new CustomInstructions(psiturk_object, cond, stage, callback);
		instructionController.loadFirstPage();
};


/*****************************************************
* CUSTOM INSTRUCTIONS 
*   - code based on psiturk's default instruction player
******************************************************/
var CustomInstructions = function(psiturk_object, cond, stage, callback) {

	var self = this;
	var psiturk = psiturk_object;
	var currentscreen = 0, timestamp;
	var cObj = cond;
	var instruct_stage = stage;
	// var instruction_pages = pages; 
	var complete_fn = callback;
	var instruct_cards = loadcards(cObj)

	var loadPage = function() {

		// show the page
		psiturk.showPage(instruct_stage);
		// pam idea: show just a generic stage page (instructions.html)
		// but use the currentscreen counter as a signal to a separate function
		// that describes what is shown on that page

		displaytext(instruct_cards[currentscreen].text)
		displayimage(instruct_cards[currentscreen].images)
		displaymarbles(instruct_cards[currentscreen].marbles[0],instruct_cards[currentscreen].marbles[1])
		displayclock(instruct_cards[currentscreen].clock)

		// connect event handler to previous button
		if(currentscreen != 0) {  // can't do this if first page
			$('.instructionsnav').on('click.psiturk.instructionsnav.prev', '.previous', function() {
				prevPageButtonPress();
			});
		} else { // if first page, don't show prev button
			$('.previous').hide();
		}

		// connect event handler to continue button
		$('.instructionsnav').on('click.psiturk.instructionsnav.next', '.continue', function() {
			nextPageButtonPress();
		});
		
		// Record the time that an instructions page is first presented
		timestamp = new Date().getTime();

	};

	var prevPageButtonPress = function () {

		// Record the response time
		var rt = (new Date().getTime()) - timestamp;
		viewedscreen = currentscreen;
		currentscreen = currentscreen - 1;
		if (currentscreen < 0) {
			currentscreen = 0; // can't go back that far
		} else {
			psiturk.recordTrialData({"phase":"INSTRUCTIONS", "indexOf":viewedscreen, "action":"PrevPage", "viewTime":rt});
			loadPage(instruct_cards[currentscreen]);
		}

	}

	var nextPageButtonPress = function() {

		// Record the response time
		var rt = (new Date().getTime()) - timestamp;
		viewedscreen = currentscreen;
		currentscreen = currentscreen + 1;

		if (currentscreen == instruct_cards.length) {
			psiturk.recordTrialData({"phase":"INSTRUCTIONS", "indexOf":viewedscreen, "action":"FinishInstructions", "viewTime":rt});
			finish();
		} else {
			psiturk.recordTrialData({"phase":"INSTRUCTIONS", "indexOf":viewedscreen, "action":"NextPage", "viewTime":rt});
			loadPage(instruct_cards[viewedscreen]);
		}

	};

	var finish = function() {

		// unbind all instruction related events
		$('.continue').unbind('click.psiturk.instructionsnav.next');
		$('.previous').unbind('click.psiturk.instructionsnav.prev');

		// NOTE: removing this line because after the instructions come the quiz
		// which they have to pass before psiturk.finishInstructions() is called
		// Record that the user has finished the instructions and 
		// moved on to the experiment. This changes their status code
		// in the database.
		// psiturk.finishInstructions();

		// Move on to the experiment after submitting data 
		submit_data(callback);
	};



	/* public interface */
	self.getIndicator = function() {
		return {"currently_viewing":{"indexOf":currentscreen, "template":pages[currentscreen]}, "instruction_deck":{"total_pages":instruction_pages.length, "templates":instruction_pages}};
	}

	self.loadFirstPage = function () { loadPage(); }

	// log instruction are starting
	psiturk.recordTrialData({"phase":"INSTRUCTIONS", "templates":pages, "action":"Begin"});

	return self;
};

