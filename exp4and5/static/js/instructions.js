// Custom instructions for category learning experiment 

var bluehex = "#5e97f2";
var redhex = "#bd2e24";


var loadcards = function(cObj){
	var nreps = cObj.nRepeats;
	var ticketvalues = [0.08/4,4.92/4];
	var nmarbles;

	var card_features = [  {"text":["In this HIT, you will play four rounds of a game where you learn what groups cards belong to.",
									"The groups will be different for each game."], 
							 "images":["allcards00.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["There are 8 different cards."], 
							 "images":["allcards00.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["The shape on the card can be <b>large</b> or <b>small</b>."], 
							 "images":["allcards01.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["Some cards have SQUARES, and some have TRIANGLES."], 
							 "images":["allcards02.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["The color filling the shape can be BLACK or WHITE."], 
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
								"Your job is to learn which cards belong to each group."], 
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

	var task_parts  = [  {"text":["Each game has two parts.",
								"In Part 1, you will LEARN which cards are in Group A and which cards are in Group B through trial and error.",
								"In Part 2, you take a short TEST."], 
							 "images":["taskparts00.png"],
							 "marbles":[null,null]
							},
							{"text":["In Part 1, you will see all of the 8 cards " + nreps + " times each.",
							"That means you make a total of " + nreps*8 + " card choices in Part 1.",
							"Every time you choose A or B, you are told whether you are right or wrong so you can learn the card groups."], 
							 "images":["taskparts01.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["In Part 2, you will see all of the 8 cards ONCE each. That means there are eight questions on the test.",
							"When you choose A or B, you are not told if you are right or wrong."], 
							 "images":["taskparts02.png"],
							 "marbles":[null,null],
							"clock":null
							},
							{"text":["You can increase the amount of your <b>BONUS</b> winnings by doing well on the test."], 
							 "images":["taskparts03mag.png"],
							 "marbles":[null,null],
							"clock":null
							}
							];
	var incentives_mag = [{"text":["Now I will explain how to increase the amount of your bonus payment.",
					"In each game, you will have a chance to earn <b>bonus tickets</b> depending on how well you do.",
					"In some games, you can earn blue bonus tickets that are worth <b>$"+ticketvalues[0].toFixed(2)+ "</b> each. <img src='static/images/1ticket.png' class='center'>",
					"In other games, you can earn gold bonus tickets that are worth <b>$"+ticketvalues[1].toFixed(2)+ "</b> each. <img src='static/images/1ticket-gold.png' class='center'>"],
					"images":null,
					"marbles":[null, null],
							"clock":null
					},
					{"text":["Answering more questions correctly on the <b>test</b> earns you more <b>bonus tickets</b>.",
					"The tickets are gold or blue depending on the game. You will play 2 games with blue tickets and 2 games with gold tickets (four games total)."],
					"images":["incentives02.png"],
					"marbles":[null, null],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get all 8 correct, your bonus will be <b>$" + (4*ticketvalues[0]).toFixed(2) + "</b> in a game with <b>blue</b> tickets,",
					"<img src='static/images/4ticket.png' class='center'>",
					"or <b>$" + (4*ticketvalues[1]).toFixed(2) + "</b> in a game with <b>gold</b> tickets.",
					"<img src='static/images/4ticket-gold.png' class='center'>"],
					"images":null,
					"marbles":[null,null],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 7 correct, your bonus will be <b>$" + (3*ticketvalues[0]).toFixed(2) + "</b> in a game with <b>blue</b> tickets,",
					"<img src='static/images/3ticket.png' class='center'>",
					"or <b>$" + (3*ticketvalues[1]).toFixed(2) + "</b> in a game with <b>gold</b> tickets.",
					"<img src='static/images/3ticket-gold.png' class='center'>"],
					"images":null,
					"marbles":[null,null],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 6 correct, your bonus will be <b>$" + (2*ticketvalues[0]).toFixed(2) + "</b> in a game with <b>blue</b> tickets,",
					"<img src='static/images/2ticket.png' class='center'>",
					"or <b>$" + (2*ticketvalues[1]).toFixed(2) + "</b> in a game with <b>gold</b> tickets.",
					"<img src='static/images/2ticket-gold.png' class='center'>"],
					"images":null,
					"marbles":[null,null],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 5 correct, your bonus will be <b>$" + (1*ticketvalues[0]).toFixed(2) + "</b> in a game with <b>blue</b> tickets,",
					"<img src='static/images/1ticket.png' class='center'>",
					"or <b>$" + (1*ticketvalues[1]).toFixed(2) + "</b> in a game with <b>gold</b> tickets.",
					"<img src='static/images/1ticket-gold.png' class='center'>"],
					"images":null,
					"marbles":[null,null],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 4 or fewer correct, you do <b>not</b> earn any bonus tickets.",
					"If your test score is 4 or less, you will receive only the experiment base pay."],
					"images":null,
					"marbles":[null,null],
							"clock":null
					},
					{"text":["The bonus you earn on each game will be added to your experiment base payment.",
					"Your total bonus payment will be the sum of all your ticket earnings from the four games.",
					"So do your best on the test to earn more tickets and increase your bonus!"],
					"images":null,
					"marbles":[null,null],
							"clock":null
					},
					{"text":["You will play the game FOUR TIMES. Twice with blue tickets, and twice with gold tickets.",
					"Before each game, you will be informed which bonus tickets you can earn in that game."],
					"images":null,
					"marbles":[null,null],
							"clock":null
					}
					]

	var incentives_prob = [{"text":["Now I will explain how to increase your chances at winning a $10 bonus.",
					"Imagine a bag full of red and blue marbles. We pull out a marble at random. If the marble is blue, you win the extra $10. If the marble is red, you receive only the base payment."],
					"images":['incentives00.png'],
					"marbles":[null, null],
							"clock":null
					},
					{"text":["Let’s look inside the bag.",
					"There are " + nmarbles + " marbles in the bag."],
					"images":null,
					"marbles":[nmarbles,0],
							"clock":null
					},
					{"text":["There are " + nmarbles + " marbles in the bag.",
					"They are all red, but we can turn up to 4 of them blue if you do well on the test."],
					"images":null,
					"marbles":[nmarbles,4],
							"clock":null
					},
					{"text":["Answering more questions correctly on the <b>test</b> turns some of the marbles <b>blue</b>.",
					"This increases your chance at winning the extra $10."],
					"images":["incentives01.png"],
					"marbles":[null,null],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get all 8 correct, we will turn 4 of the red marbles blue.",
					"This corresponds to a " + (100*4/nmarbles).toFixed(2) + "% chance of winning $10."],
					"images":null,
					"marbles":[nmarbles,4],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 7 correct, we will turn 3 of the red marbles blue.",
					"This corresponds to a " + (100*3/nmarbles).toFixed(2) + "% chance of winning $10."],
					"images":null,
					"marbles":[nmarbles,3],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 6 correct, we will turn 2 of the red marbles blue.",
					"This corresponds to a " + (100*2/nmarbles).toFixed(2) + "% chance of winning $10."],
					"images":null,
					"marbles":[nmarbles,2],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 5 correct, we will turn 1 of the red marbles blue.",
					"This corresponds to a " + (100*1/nmarbles).toFixed(2) + "% chance of winning $10."],
					"images":null,
					"marbles":[nmarbles,1],
							"clock":null
					},
					{"text":["Remember, there are 8 questions total on the <b>test</b>.",
					"If you get 4 or fewer correct, none of the marbles will turn blue.",
					"This corresponds to a 0.00% chance of winning $10, which means no chance to win."],
					"images":null,
					"marbles":[nmarbles,0],
							"clock":null
					},
					{"text":["You win an extra $10 if we pull a blue marble out of the bag.",
					"So do your best on the test to increase your chances of winning!"],
					"images":null,
					"marbles":[nmarbles,4],
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
					]

	var review = [  {"text":["<b>Let's review!</b>",
							"There are eight cards, each with a particular SHAPE, SIZE, and COLOR.",
							"You learn which cards belong to Group A and Group B in Part 1 using trial and error.",
							"In Part 2, you take a test to give your best guess at the group for each card.",
							"Doing better on the test increases your bonus payment."], 
							 "images":["allcards00.png"],
							 "marbles":[null,null],
							"clock":null
					},
					{"text":["Most importantly, <strong>please do not</strong> use any writing, drawings, or your phone or computer to help you remember.",
							"We are cognitive scientists interested in how people learn using their own minds.",
							"We rely on your honesty for this. Please try to figure out which group name goes with each card on your own. ",
							"While the task may be difficult at first, it will get easier as you go, and it is ok to make mistakes.",
							"When you're ready to continue, press <strong>Next</strong>."],
					"images":null,
					"marbles":[null,null],
							"clock":null
					}
					];

	// var instruct_cards = [].concat(card_features,card_groups,task_parts, incentives_prob, clockpractice, review);
	var instruct_cards = [].concat(card_features,card_groups,task_parts, incentives_mag, review);

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

