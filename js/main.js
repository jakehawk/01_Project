$(function(){
	var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
	var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
	var deck = [];
	var i=0, j=0, x=0;
	var p1CardVals = [],
		p1CardSuits = [],
		p2CardVals = [],
		p2CardSuits = [];


/*=========== Constructors ==============================================*/
	var Card = function(suit, val) {
		this.suit = suit;
		this.val = val;
	}

	function Player(card1, card2, chips, turn) {
		this.val1 = card1.val;
		this.suit1 = card1.suit;
		this.val2 = card2.val;
		this.suit2 = card2.suit;
		this.chips = chips;
		this.turn = turn;
		this.best = 0;
		this.pairs = [];
		this.threes = [];
		this.cards = function() {
			console.log('Player has a '+this.val1+' of '+this.suit1+
				' and a '+this.val2+' of '+this.suit2);
		}
	}

	function Middle(card1, card2, card3, card4, card5) {
		this.val1 = card1.val;
		this.suit1 = card1.suit;
		this.val2 = card2.val;
		this.suit2 = card2.suit;
		this.val3 = card3.val;
		this.suit3 = card3.suit;
		this.val4 = card4.val;
		this.suit4 = card4.suit;
		this.val5 = card5.val;
		this.suit5 = card5.suit;
		this.flop = false;
		this.turn = false;
		this.river = false;
		this.cards = function() {
			console.log('c1: '+this.val1+' of '+this.suit1);
			console.log('c2: '+this.val2+' of '+this.suit2);
			console.log('c3: '+this.val3+' of '+this.suit3);
			console.log('c4: '+this.val4+' of '+this.suit4);
			console.log('c5: '+this.val5+' of '+this.suit5);
		}
	}

/*=========== Create Deck ===============================================*/
	for (i=0; i<vals.length; i++) {
	  for (j=0; j<suits.length; j++) {
	    deck[x] = new Card(suits[j], vals[i]);
	    x++;
	  }
	}

	function getCard(deck) {
		var min = Math.ceil(0);
		var max = Math.floor(deck.length - 1);
		var rand = Math.floor(Math.random() * (max - min)) + min;
		var newCard = deck[rand];
		deck.splice(rand, 1);
		return newCard;
	}

	var player1 = new Player(getCard(deck), 
		getCard(deck), 
		1000, true);
	var player2 = new Player(getCard(deck),
		getCard(deck), 
		1000, false);
	var middle = new Middle(getCard(deck), getCard(deck), 
		getCard(deck), getCard(deck), getCard(deck));





/*=========== Game Logic ================================================*/
	
	var takeTurn = function() {
		var p1SpadeC=0, p1ClubC=0, p1HeartC=0, p1DiamondC=0,
		p2SpadeC=0, p2ClubC=0, p2HeartC=0, p2DiamondC=0;
		if (!(middle.flop)) {
			//Before middle is revealed
			p1CardVals.push(player1.val1);
			p1CardSuits.push(player1.suit1);
			p1CardVals.push(player1.val2);
			p1CardSuits.push(player1.suit2);
			p2CardVals.push(player2.val1);
			p2CardSuits.push(player2.suit1);
			p2CardVals.push(player2.val2);
			p2CardSuits.push(player2.suit2);
			if (p1CardVals[0] === p1CardVals[1] && 
				player1.best < 1){
				player1.best = 1;
				player1.pairs.push(p1CardVals[1]);
			}
			if (p2CardVals[0] === p2CardVals[1] && 
				player1.best < 1){
				player2.best =1;
				player2.pairs.push(p2CardVals[1]);
			}
			middle.flop = true;
		} else if (middle.flop && !(middle.turn)) {
			//After Flop is revealed
			p1CardVals.push(middle.val1);
			p1CardVals.push(middle.val2);
			p1CardVals.push(middle.val3);
			p1CardSuits.push(middle.suit1);
			p1CardSuits.push(middle.suit2);
			p1CardSuits.push(middle.suit3);
			p2CardVals.push(middle.val1);
			p2CardVals.push(middle.val2);
			p2CardVals.push(middle.val3);
			p2CardSuits.push(middle.suit1);
			p2CardSuits.push(middle.suit2);
			p2CardSuits.push(middle.suit3);
			var orderedP1 = p1CardVals.sort();
			var orderedP2 = p2CardVals.sort();
			var straight = p1CardVals;
			for (i=0; i<orderedP1.length-1; i++) {
				//Pair Check
				if (orderedP1[i] === orderedP1[i+1]) {
					if (player1.pairs.indexOf(orderedP1[i]) === -1 && 
						player1.best < 1) {
						player1.best = 1;
						player1.pairs.push(orderedP1[i]);
					}
					if (player1.pairs.length > 1 && 
						player1.best < 2)
						player1.best = 2;
				}
			}
			// 	//Three-of Check
			// 	if (orderedP1[i] === orderedP1[i+1] && 
			// 		orderedP1[i] === orderedP1[i+2] && 
			// 		orderedP1[i+2] != null) {
			// 		if (player1.threes.indexOf(orderedP1[i]) === -1 && 
			// 			player1.best < 3){
			// 			player1.best = 3;
			// 			player1.threes.push(orderedP1[i])
			// 		}
			// 	}
			// 	//Flush Check
			// 	switch(p1CardSuits[i]) {
			// 		case 'Hearts':
			// 			p1HeartC++;
			// 		case 'Spades':
			// 			p1SpadeC++;
			// 		case 'Diamonds':
			// 			p1DiamondC++;
			// 		case 'Clubs':
			// 			p1ClubC++;
			// 	}
			// }
			// if ((p1HeartC >= 5 || p1SpadeC >= 5 || 
			// 	p1DiamondC >= 5 || p1ClubC >= 5) && 
			// 	player1.best < 5) {
			// 	player1.best = 5;
			// }
			for (i=0; i<orderedP2.length-1; i++) {
				//Pair Check
				if (orderedP2[i] === orderedP2[i+1]) {
					if (player2.pairs.indexOf(orderedP2[i]) === -1 && 
						player2.best < 1) {
						player2.best = 1;
						player2.pairs.push(orderedP2[i]);
					}
					if (player2.pairs.length > 1 && 
						player2.best < 2)
						player2.best = 2;
				}
			}
			// 	//Three-of Check
			// 	if (orderedP2[i] === orderedP2[i+1] && 
			// 		orderedP2[i] === orderedP2[i+2] && 
			// 		orderedP2[i+2] != null) {
			// 		if (player2.threes.indexOf(orderedP2[i]) === -1 && 
			// 			player2.best < 3){
			// 			player2.best = 3;
			// 			player2.threes.push(orderedP2[i])
			// 		}
			// 	}
			// 	//Flush Check
			// 	switch(p2CardSuits[i]) {
			// 		case 'Hearts':
			// 			p2HeartC++;
			// 		case 'Spades':
			// 			p2SpadeC++;
			// 		case 'Diamonds':
			// 			p2DiamondC++;
			// 		case 'Clubs':
			// 			p2ClubC++;
			// 	}
			// }
			// if (p2HeartC >= 5 || p2SpadeC >= 5 || 
			// 	p2DiamondC >= 5 || p2ClubC >= 5 && 
			// 	player2.best < 5) {
			// 	player2.best = 5;
			// }
		} else if (middle.turn && !(middle.river)) {
			//After Flop is revealed
			p1CardVals.push(middle.val4);
			p1CardSuits.push(middle.suit4);
			p2CardVals.push(middle.val4);
			p2CardSuits.push(middle.suit4);
			var orderedP1 = p1CardVals.sort();
			var orderedP2 = p2CardVals.sort();
			var straight = p1CardVals;
			for (i=0; i<orderedP1.length-1; i++) {
				//Pair Check
				if (orderedP1[i] === orderedP1[i+1]) {
					if (player1.pairs.indexOf(orderedP1[i]) === -1 && 
						player1.best < 1) {
						player1.best = 1;
						player1.pairs.push(orderedP1[i]);
					}
					if (player1.pairs.length > 1 && 
						player1.best < 2)
						player1.best = 2;
				}
			}
			// 	//Three-of Check
			// 	if (orderedP1[i] === orderedP1[i+1] && 
			// 		orderedP1[i] === orderedP1[i+2] && 
			// 		orderedP1[i+2] != null) {
			// 		if (player1.threes.indexOf(orderedP1[i]) === -1 && 
			// 			player1.best < 3){
			// 			player1.best = 3;
			// 			player1.threes.push(orderedP1[i])
			// 		}
			// 	}
			// 	//Flush Check
			// 	switch(p1CardSuits[i]) {
			// 		case 'Hearts':
			// 			p1HeartC++;
			// 		case 'Spades':
			// 			p1SpadeC++;
			// 		case 'Diamonds':
			// 			p1DiamondC++;
			// 		case 'Clubs':
			// 			p1ClubC++;
			// 	}
			// }
			// if ((p1HeartC >= 5 || p1SpadeC >= 5 || 
			// 	p1DiamondC >= 5 || p1ClubC >= 5) && 
			// 	player1.best < 5) {
			// 	player1.best = 5;
			// }
			for (i=0; i<orderedP2.length-1; i++) {
				//Pair Check
				if (orderedP2[i] === orderedP2[i+1]) {
					if (player2.pairs.indexOf(orderedP2[i]) === -1 && 
						player2.best < 1) {
						player2.best = 1;
						player2.pairs.push(orderedP2[i]);
					}
					if (player2.pairs.length > 1 && 
						player2.best < 2)
						player2.best = 2;
				}
			}
			// 	//Three-of Check
			// 	if (orderedP2[i] === orderedP2[i+1] && 
			// 		orderedP2[i] === orderedP2[i+2] && 
			// 		orderedP2[i+2] != null) {
			// 		if (player2.threes.indexOf(orderedP2[i]) === -1 &&
			// 			player2.best<3){
			// 			player2.best = 3;
			// 			player2.threes.push(orderedP2[i])
			// 		}
			// 	}
			// 	//Flush Check
			// 	switch(p2CardSuits[i]) {
			// 		case 'Hearts':
			// 			p2HeartC++;
			// 		case 'Spades':
			// 			p2SpadeC++;
			// 		case 'Diamonds':
			// 			p2DiamondC++;
			// 		case 'Clubs':
			// 			p2ClubC++;
			// 	}
			// }
			// if ((p2HeartC >= 5 || p2SpadeC >= 5 || 
			// 	p2DiamondC >= 5 || p2ClubC >= 5) && 
			// 	player2.best < 5) {
			// 	player2.best = 5;
			// }
		} else if (middle.turn && !(middle.river)) {
			//After Flop is revealed
			p1CardVals.push(middle.val4);
			p1CardSuits.push(middle.suit4);
			p2CardVals.push(middle.val4);
			p2CardSuits.push(middle.suit4);
			var orderedP1 = p1CardVals.sort();
			var orderedP2 = p2CardVals.sort();
			var straight = p1CardVals;
			for (i=0; i<orderedP1.length-1; i++) {
				//Pair Check
				if (orderedP1[i] === orderedP1[i+1]) {
					if (player1.pairs.indexOf(orderedP1[i]) === -1 && 
						player1.best < 1) {
						player1.best = 1;
						player1.pairs.push(orderedP1[i]);
					}
					if (player1.pairs.length > 1 && 
						player1.best < 2)
						player1.best = 2;
				}
			}
		}
		console.log('P1 best: ' + player1.best)
		console.log('P2 best: ' + player2.best)
	}

	takeTurn();
	takeTurn();
	takeTurn();
	takeTurn();

	console.log(player1.cards());
	console.log(player2.cards());
	console.log(middle.cards());

	var winTest = function() {
		if (player1.best > player2.best)
			console.log('P1 wins!')
		else if (player1.best < player2.best)
			console.log('P2 wins!')
		else if (player1.best === player2.best) {
			if (vals.indexOf(player1.pairs) > vals.indexOf(player2.pairs)){
				console.log('P1 wins!');
			}
			else if (vals.indexOf(player1.pairs) < vals.indexOf(player2.pairs)){
				console.log('P2 wins!');
			} else {
				console.log('It\'s a tie');
			}
		}
	}

	winTest();

	




/*=========== DOM Manipulation ==========================================*/
	$('#play').click(function() {
		window.location.href = 'game.html';
	});

	// $('#player1').click(takeTurn());
});




	// var takeTurn = function() {
	// 	var p1c1 = player1.val1,
	// 	p1c2 = player1.val2,
	// 	p2c1 = player2.val1, 
	// 	p2c2 = player2.val2,
	// 	mc1 = middle.val1,
	// 	mc2 = middle.val2,
	// 	mc3 = middle.val3,
	// 	mc4 = middle.val4,
	// 	mc5 = middle.val5;

	// 	//Pair booleans
	// 	var p1Pair = (p1c1===p1c2),
	// 	p2Pair = (p2c1===p2c2),
	// 	flopPair = (mc1===mc2 || mc1===mc3 || mc2===mc3),
	// 	p1c1Flop = (p1c1===mc1 || p1c1===mc2 || p1c1===mc3),
	// 	p1c2Flop = (p1c2===mc1 || p1c2===mc2 || p1c2===mc3),
	// 	p2c1Flop = (p2c1===mc1 || p2c1===mc2 || p2c1===mc3),
	// 	p2c2Flop = (p2c2===mc1 || p2c2===mc2 || p2c2===mc3),
	// 	turnPair = (mc1===mc4 || mc2===mc4 || mc3===mc4),
	// 	p1c1Turn = (p1c1===mc4),
	// 	p1c2Turn = (p1c2===mc4),
	// 	p2c1Turn = (p2c1===mc4),
	// 	p2c2Turn = (p2c2===mc4),
	// 	riverPair = (mc1===mc5 || mc2===mc5 || mc3===mc5 || mc4===mc5),
	// 	p1c1River = (p1c1===mc5),
	// 	p1c2River = (p1c2===mc5),
	// 	p2c1River = (p2c1===mc5),
	// 	p2c2River = (p2c2===mc5);

	// 	//Two Pairs booleans



	// 	if(middle.flop === false){
	// 		if(p1Pair){
	// 			player1.best = 1;
	// 			player1.pairs = p1c1;
	// 		} else if (p2Pair){
	// 			player2.best = 1;
	// 			player2.pairs = p2c1;
	// 		} else
	// 		middle.flop = true;
	// 	} else if (middle.flop && !(middle.turn)) {
	// 		if (flopPair) {
	// 			player1.best = 1;
	// 			player2.best = 1;
	// 		} else if (p1c1Flop) {
	// 			player1.best = 1;
	// 			player1.pairs = p1c1;
	// 		} else if (p1c2Flop) {
	// 			player1.best = 1;
	// 			player1.pairs = p1c2;
	// 		} else if (p2c1Flop) {
	// 			player2.best = 1;
	// 			player2.pairs = p2c1;
	// 		} else if (p2c2Flop) {
	// 			player2.best = 1;
	// 			player2.pairs = p2c2;
	// 		}
	// 		middle.turn = true;
	// 	} else if (middle.turn && !(middle.river)) {
	// 		if (turnPair) {
	// 			player1.best = 1;
	// 			player2.best = 1;
	// 		} else if (p1c1Turn) {
	// 			player1.best = 1;
	// 			player1.pairs = p1c1;
	// 		} else if (p1c2Turn) {
	// 			player1.best = 1;
	// 			player1.pairs = p1c2;
	// 		} else if (p2c1Turn) {
	// 			player2.best = 1;
	// 			player2.pairs = p2c1;
	// 		} else if (p2c2Turn) {
	// 			player2.best = 1;
	// 			player2.pairs = p2c2;
	// 		}
	// 		middle.river = true;
	// 	} else if (middle.river) {
	// 		if (riverPair) {
	// 			player1.best = 1;
	// 			player2.best = 1;
	// 		} else if (p1c1River) {
	// 			player1.best = 1;
	// 			player1.pairs = p1c1;
	// 		} else if (p1c2River) {
	// 			players1.best = 1;
	// 			players1.pairs = p1c2;
	// 		} else if (p2c1River) {
	// 			players2.best = 1;
	// 			players2.pairs = p2c1;
	// 		} else if (p2c2River) {
	// 			players2.best = 1;
	// 			players2.pairs = p2c2;
	// 		}
	// 	}
	// }