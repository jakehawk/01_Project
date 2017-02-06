$(function(){
	var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
	var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
	var deck = [];
	var i=0, j=0, x=0;

/*=========== Constructors ==============================================*/
	var Card = function(suit, val) {
		this.suit = suit;
		this.val = val;
	}

	function Player(card1, card2, chips, turn) {
		this.card1 = card1;
		this.card2 = card2;
		this.chips = chips;
		this.turn = turn;
		this.best = 0;
		this.cards = function() {
			console.log('Player 1 has a '+this.card1.val+' of '+this.card1.suit+
				' and a '+this.card2.val+' of '+this.card2.suit);
		}
	}

	function Middle(card1, card2, card3, card4, card5) {
		this.card1 = card1;
		this.card2 = card2;
		this.card3 = card3;
		this.flop = false;
		this.card4 = card4;
		this.turn = false;
		this.card5 = card5;
		this.river = false;
		this.cards = function() {
			console.log('c1: '+this.card1.val+' of '+this.card1.suit);
			console.log('c2: '+this.card2.val+' of '+this.card2.suit);
			console.log('c3: '+this.card3.val+' of '+this.card3.suit);
			console.log('c4: '+this.card4.val+' of '+this.card4.suit);
			console.log('c5: '+this.card5.val+' of '+this.card5.suit);
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
		var p1c1 = player1.card1.val,
		p1c2 = player1.card2.val,
		p2c1 = player2.card1.val, 
		p2c2 = player2.card2.val,
		mc1 = middle.card1.val,
		mc2 = middle.card2.val,
		mc3 = middle.card3.val,
		mc4 = middle.card4.val,
		mc5 = middle.card5.val;

		var p1Pair = (p1c1===p1c2),
		p2Pair = (p2c1===p2c2),
		flopPair = (mc1===mc2 || mc1===mc3 || mc2===mc3),
		p1Flop = (p1c1===mc1 || p1c1===mc2 || p1c1===mc3 ||
			p1c2===mc1 || p1c2===mc2 || p1c2===mc3),
		p2Flop = (p2c1===mc1 || p2c1===mc2 || p2c1===mc3 ||
			p2c2===mc1 || p2c2===mc2 || p2c2===mc3),
		turnPair = (mc1===mc4 || mc2===mc4 || mc3===mc4),
		p1Turn = (p1c1===mc4 || p1c2===mc4),
		p2Turn = (p2c1===mc4 || p2c2===mc4),
		riverPair = (mc1===mc5 || mc2===mc5 || mc3===mc5 || mc4===mc5),
		p1River = (p1c1===mc5 || p1c2===mc5),
		p2River = (p2c1===mc5 || p2c2===mc5);


		if(middle.flop === false){
			if(p1Pair){
				console.log('You have a pair!');
				player1.best = 1;
			} else if (p2Pair){
				console.log('P2 has a pair!');
				player2.best = 1;
			} else{ 
				console.log('No initial pairs!');
			}
			middle.flop = true;
		} else if (middle.flop && !(middle.turn)) {
			if (flopPair) {
				console.log('Both players now have a pair');
				player1.best = 1;
				player2.best = 1;
			} else if (p1Flop) {
				console.log('You have a pair using the flop!');
				player1.best = 1;
			} else if (p2Flop) {
				console.log('P2 has a pair using the flop!');
				player2.best = 1;
			} else 
				console.log('Still no pair in the flop');
			middle.turn = true;
		} else if (middle.turn && !(middle.river)) {
			if (turnPair) {
				console.log('Both players now have a pair');
				player1.best = 1;
				player2.best = 1;
			} else if (p1Turn) {
				console.log('You have a pair using the turn!');
				player1.best = 1;
			} else if (p2Turn) {
				console.log('P2 has a pair using the turn!');
				player2.best = 1;
			} else 
				console.log('Still no pair in the turn');
			middle.river = true;
		} else if (middle.river) {
			if (riverPair) {
				console.log('Both players now have a pair');
				player1.best = 1;
				player2.best = 1;
			} else if (p1River) {
				console.log('You have a pair using the river!');
				player1.best = 1;
			} else if (p2River) {
				console.log('P2 has a pair using the river!');
				player2.best = 1;
			} else 
				console.log('Still no pair in the river');
		}
		console.log('flop: '+middle.flop);
		console.log('turn: '+middle.turn);
		console.log('river: '+middle.river);
	}
	console.log(player1.cards());
	console.log(player2.cards());
	console.log(middle.cards());
	takeTurn();
	takeTurn();
	takeTurn();
	takeTurn();

	




/*=========== DOM Manipulation ==========================================*/
	$('#play').click(function() {
		window.location.href = 'game.html';
	});

	// $('#player1').click(takeTurn());
});