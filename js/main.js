$(function(){
	var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
	var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
	var deck = [];
	var i=0, j=0, x=0;
	var player1, player2, middle;
	var stageCount = 0;
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
		this.best = [0];
		this.pairs = [];
		this.threes = [];
		this.fours = [];
		this.cards = function() {
			return 'Player '+playerNum+' has a '+this.val1+' of '+this.suit1+
				'\nand a '+this.val2+' of '+this.suit2;
		}
		this.card1Image = function() {
			return '<img src="card_images/'+this.val1+'_of_'+this.suit1.toLowerCase()+'.png" alt="'+this.val1+' of '+this.suit1+'" />'
		}
		this.card2Image = function() {
			return '<img src="card_images/'+
				this.val2+'_of_'+this.suit2.toLowerCase()+
				'.png" alt="'+this.val2+' of '+this.suit2+'" />'
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
		this.end = false;
		this.cards = function() {
			console.log('c1: '+this.val1+' of '+this.suit1);
			console.log('c2: '+this.val2+' of '+this.suit2);
			console.log('c3: '+this.val3+' of '+this.suit3);
			console.log('c4: '+this.val4+' of '+this.suit4);
			console.log('c5: '+this.val5+' of '+this.suit5);
		}
		this.card1Image = function() {
			return '<img src="card_images/'+
				this.val1+'_of_'+this.suit1.toLowerCase()+
				'.png" alt="'+this.val1+' of '+this.suit1+'" />'
		}
		this.card2Image = function() {
			return '<img src="card_images/'+
				this.val2+'_of_'+this.suit2.toLowerCase()+
				'.png" alt="'+this.val2+' of '+this.suit2+'" />'
		}
		this.card3Image = function() {
			return '<img src="card_images/'+
				this.val3+'_of_'+this.suit3.toLowerCase()+
				'.png" alt="'+this.val3+' of '+this.suit3+'" />'
		}
		this.card4Image = function() {
			return '<img src="card_images/'+
				this.val4+'_of_'+this.suit4.toLowerCase()+
				'.png" alt="'+this.val4+' of '+this.suit4+'" />'
		}
		this.card5Image = function() {
			return '<img src="card_images/'+
				this.val5+'_of_'+this.suit5.toLowerCase()+
				'.png" alt="'+this.val5+' of '+this.suit5+'" />'
		}
	}

/*=========== Create Deck ===============================================*/
	for (i=0; i<vals.length; i++) {
	  for (j=0; j<suits.length; j++) {
	    deck[x] = new Card(suits[j], vals[i]);
	    x++;
	  }
	}
	//akls;dfj;aklsdfj
	function getCard() {
		var min = Math.ceil(0);
		var max = Math.floor(deck.length - 1);
		var rand = Math.floor(Math.random() * (max - min)) + min;
		var newCard = deck[rand];
		deck.splice(rand, 1);
		return newCard;
	}


/*=========== DOM Manipulation ==========================================*/
	
	var $player1 = $('player1');
	var $player2 = $('player2');
	var $middle = $('middle');

	$('#play').click(function() {
		$('.introScreen').toggleClass('off');
		$('.gameScreen').toggleClass('off');
		$('#playerButtons').toggleClass('off');

		player1 = new Player(getCard(), 
			getCard(), 1000, true);
		player2 = new Player(getCard(), 
			getCard(), 1000, true);
		middle = new Middle(getCard(), getCard(), 
			getCard(), getCard(), getCard());
		
		$('#p1c1').html(player1.card1Image());
		$('#p1c2').html(player1.card2Image());
		$('#p2c1').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#p2c2').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c1').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c2').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c3').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c4').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c5').html('<img src="card_images/back.png" alt="Card Back" />');
		takeTurn();
	});

	$('#call').click(function() {
		var wins = ['a High Card', 'a Pair', 'two Pairs', 'Three of a Kind', 'a Straight!', 'a Flush!', 
		'a Full House!', 'Four of a Kind', 'a Straight Flush!!', 'a Royal Flush!!!!'];
		var p1Max = Math.max(...player1.best), p2Max = Math.max(...player2.best);
		if (stageCount < 4)
			takeTurn();
		else{
			$('#p2c1').html(player2.card1Image());
			$('#p2c2').html(player2.card2Image());
			var orderedP1 = p1CardVals.sort();
			var orderedP2 = p2CardVals.sort();
			var temp = winTest(orderedP1, orderedP2);
			$('#winModal').css("display", "block");
			if (temp === 1){
				$('#winText').text('Player 1 wins with '+wins[p1Max]);
			} else if (temp === 0){
				$('#winText').text('Player 2 wins with '+wins[p2Max]);
			} else {
				$('#winText').text('It\'s a draw!')
			}
			$('.newGame').click(function() {
				$('#winModal').css("display", "none");
			});
			$('.nope').click(function() {
				$('#winModal').css("display", "none");
			});
		}
	});
	

	//Modal Stuff
	$('#quitGame').click(function() {
		$('#myModal').css("display", "block");
	});
	$('.quit').eq(0).click(function() {
		$('#myModal').css("display", "none");
	});
	$('.close').eq(0).click(function() {
		location.reload();
		// $('#myModal').css("display", "none");
		// $('.gameScreen').toggleClass('off');
		// $('.introScreen').toggleClass('off');
	});

	$('#resetGame').click(function() {
		deck = [];
		x = 0;
		stageCount = 0;
		p1CardVals = [];
		p1CardSuits = [];
		p2CardVals = [];
		p2CardSuits = [];
		for (i=0; i<vals.length; i++) {
			for (j=0; j<suits.length; j++) {
		    	deck[x] = new Card(suits[j], vals[i]);
		    	x++;
			}
		}	
		console.log(deck)
		player1 = new Player(getCard(), 
			getCard(), 1000, true);
		player2 = new Player(getCard(), 
			getCard(), 1000, false);
		middle = new Middle(getCard(), getCard(), 
			getCard(), getCard(), getCard());
		
		$('#p1c1').html(player1.card1Image());
		$('#p1c2').html(player1.card2Image());
		$('#p2c1').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#p2c2').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c1').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c2').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c3').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c4').html('<img src="card_images/back.png" alt="Card Back" />');
		$('#m1c5').html('<img src="card_images/back.png" alt="Card Back" />');
		takeTurn();
	});


	window.onclick = function(event){
		if (event.target == $('#myModal')){
			$('#myModal').css("display", "none");
		}
	}

	



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
			console.log('Start!');
			//Pair Check
			if (p1CardVals[0] === p1CardVals[1]){
				player1.best.push(1);
				player1.pairs.push(p1CardVals[1]);
			}
			if (p2CardVals[0] === p2CardVals[1]){
				player2.best.push(1);
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

			console.log('Flop!');
			for (i=0; i<orderedP1.length; i++) {
				pairTest(orderedP1, player1, i);
				threeTest(orderedP1, player1, i);
				fourTest(orderedP1, player1, i);
				fhTest(orderedP1, player1, i);
				straightTest(orderedP1, player1, i);
				//Flush Check
				switch(p1CardSuits[i]) {
					case 'Hearts':
						p1HeartC++;
						break;
					case 'Spades':
						p1SpadeC++;
						break;
					case 'Diamonds':
						p1DiamondC++;
						break;
					case 'Clubs':
						p1ClubC++;
						break;
				}
			}
			if (p1HeartC >= 5 || p1SpadeC >= 5 || 
				p1DiamondC >= 5 || p1ClubC >= 5)
				player1.best.push(5);
			if (player1.best.indexOf(5) !== -1 && player1.best.indexOf(4) !== -1)
				player1.best.push(8)
			for (i=0; i<orderedP2.length; i++) {
				pairTest(orderedP2, player2, i);
				threeTest(orderedP2, player2, i);
				fourTest(orderedP2, player2, i);
				fhTest(orderedP2, player2, i);
				straightTest(orderedP2, player2, i);
				//Flush Check
				switch(p2CardSuits[i]) {
					case 'Hearts':
						p2HeartC++;
						break;
					case 'Spades':
						p2SpadeC++;
						break;
					case 'Diamonds':
						p2DiamondC++;
						break;
					case 'Clubs':
						p2ClubC++;
						break;
				}
			}
			if (p2HeartC >= 5 || p2SpadeC >= 5 || 
				p2DiamondC >= 5 || p2ClubC >= 5)
				player2.best.push(5);
			if (player2.best.indexOf(5) !== -1 && player2.best.indexOf(4) !== -1)
				player2.best.push(8)
			middle.turn = true;
			$('#m1c1').html(middle.card1Image());
			$('#m1c2').html(middle.card2Image());
			$('#m1c3').html(middle.card3Image());
 		} else if (middle.turn && !(middle.river)) {
			//After Flop is revealed
			p1CardVals.push(middle.val4);
			p1CardSuits.push(middle.suit4);
			p2CardVals.push(middle.val4);
			p2CardSuits.push(middle.suit4);
			var orderedP1 = p1CardVals.sort();
			var orderedP2 = p2CardVals.sort();
			var straight = p1CardVals;
			console.log('Turn!')
			//Loop through p1 cards
			for (i=0; i<orderedP1.length; i++) {
				pairTest(orderedP1, player1, i);
				threeTest(orderedP1, player1, i);
				fourTest(orderedP1, player1, i);
				fhTest(orderedP1, player1, i);
				straightTest(orderedP1, player1, i);
				//Flush Check
				switch(p1CardSuits[i]) {
					case 'Hearts':
						p1HeartC++;
						break;
					case 'Spades':
						p1SpadeC++;
						break;
					case 'Diamonds':
						p1DiamondC++;
						break;
					case 'Clubs':
						p1ClubC++;
						break;
				}
			}
			if ((p1HeartC >= 5 || p1SpadeC >= 5 || 
				p1DiamondC >= 5 || p1ClubC >= 5))
				player1.best.push(5);
			if (player1.best.indexOf(5) !== -1 && player1.best.indexOf(4) !== -1)
				player1.best.push(8)
			//Loop through p2 cards
			for (i=0; i<orderedP2.length; i++) {
				pairTest(orderedP2, player2, i);
				threeTest(orderedP2, player2, i);
				fourTest(orderedP2, player2, i);
				fhTest(orderedP2, player2, i);
				straightTest(orderedP2, player2, i);
				//Flush Check
				switch(p2CardSuits[i]) {
					case 'Hearts':
						p2HeartC++;
						break;
					case 'Spades':
						p2SpadeC++;
						break;
					case 'Diamonds':
						p2DiamondC++;
						break;
					case 'Clubs':
						p2ClubC++;
						break;
				}
			}
			if (p2HeartC >= 5 || p2SpadeC >= 5 || 
				p2DiamondC >= 5 || p2ClubC >= 5) {
				player2.best.push(5);
			}
			if (player2.best.indexOf(5) !== -1 && player2.best.indexOf(4) !== -1)
				player2.best.push(8)
			middle.river = true;
			$('#m1c4').html(middle.card4Image());
		} else if (middle.river) {
			//After River is revealed
			p1CardVals.push(middle.val5);
			p1CardSuits.push(middle.suit5);
			p2CardVals.push(middle.val5);
			p2CardSuits.push(middle.suit5);
			var orderedP1 = p1CardVals.sort();
			var orderedP2 = p2CardVals.sort();
			var straight = p1CardVals;

			console.log('River!');
			for (i=0; i<orderedP1.length; i++) {
				pairTest(orderedP1, player1, i);
				threeTest(orderedP1, player1, i);
				fourTest(orderedP1, player1, i);
				fhTest(orderedP1, player1, i);
				straightTest(orderedP1, player1, i);
				//Flush Check
				switch(p1CardSuits[i]) {
					case 'Hearts':
						p1HeartC++;
						break;
					case 'Spades':
						p1SpadeC++;
						break;
					case 'Diamonds':
						p1DiamondC++;
						break;
					case 'Clubs':
						p1ClubC++;
						break;
				}
			}
			if (p1HeartC >= 5 || p1SpadeC >= 5 || 
				p1DiamondC >= 5 || p1ClubC >= 5) {
				player1.best.push(5);
			}
			if (player1.best.indexOf(5) !== -1 && player1.best.indexOf(4) !== -1)
				player1.best.push(8)
			for (i=0; i<orderedP2.length; i++) {
				pairTest(orderedP2, player2, i);
				threeTest(orderedP2, player2, i);
				fourTest(orderedP2, player2, i);
				fhTest(orderedP2, player2, i);
				straightTest(orderedP2, player2, i);
				//Flush Check
				switch(p2CardSuits[i]) {
					case 'Hearts':
						p2HeartC++;
						break;
					case 'Spades':
						p2SpadeC++;
						break;
					case 'Diamonds':
						p2DiamondC++;
						break;
					case 'Clubs':
						p2ClubC++;
						break;
				}
			}
			if (p2HeartC >= 5 || p2SpadeC >= 5 || 
				p2DiamondC >= 5 || p2ClubC >= 5) {
				player2.best.push(5);
			}
			if (player2.best.indexOf(5) !== -1 && player2.best.indexOf(4) !== -1)
				player2.best.push(8)
			$('#m1c5').html(middle.card5Image());
		}
		console.log('P1 best: ' + player1.best)
		console.log('P2 best: ' + player2.best)
		stageCount++;
	}

	var pairTest = function(ordered, player, i) {
		if (ordered[i] === ordered[i+1] && ordered[i+1] != -1) {
			if (player.pairs.indexOf(ordered[i]) === -1) {
				if (player.best.indexOf(1) === -1){
					player.best.push(1);
					player.pairs.push(ordered[i]);
				} else if (player.best.indexOf(1) !== -1) {
					player.best.push(2);
					player.pairs.push(ordered[i]);
				}
			} 
		}
	}

	var threeTest = function(ordered, player, i) {
		if (ordered[i] === ordered[i+1] && 
			ordered[i] === ordered[i+2] && 
			ordered[i+2] != null) {
			if (player.threes.indexOf(ordered[i]) === -1){
				player.best.push(3);
				player.threes.push(ordered[i])
			}
		}
	}

	var fourTest = function(ordered, player, i) {
		//Four-of Check
		if (ordered[i] === ordered[i+1] && 
		ordered[i] === ordered[i+2] &&
		ordered[i] === ordered[i+3] &&
		ordered[i+3] != null) {
			player.best.push(7);
			player.fours.push(ordered[i])
		}
	}

	var fhTest = function(ordered, player, i) {
		if (player.threes[0] != null && player.pairs.length > 1){
			player.best.push(6);
		} 
	}

	var straightTest = function(ordered, player, i) {
		var temp = [];
		for (i=0;i<ordered.length;i++) {
			if (ordered[i] === 'Jack')
				temp.push(11);
			else if (ordered[i] === 'Queen')
				temp.push(12);
			else if (ordered[i] === 'King')
				temp.push(13);
			else if (ordered[i] === 'Ace') {
				temp.push(14);
				temp.push(1);
			} else
				temp.push(ordered[i])
		}
		temp.sort(function(a, b){return a-b});
		for (i=0;i<temp.length;i++){
			if (temp[i] === temp[i+1]-1 &&
			temp[i] === temp[i+2]-2 &&
			temp[i] === temp[i+3]-3 &&
			temp[i] === temp[i+4]-4 &&
			temp[i+4] != null &&
			player.best.indexOf(4) !== -1){
				player.best.push(4);
			}
		}
	}

	var winTest = function(ordered1, ordered2) {
		var wins = ['a High Card', 'a Pair', 'two Pairs', 'Three of a Kind', 'a Straight!', 'a Flush!', 
		'a Full House!', 'Four of a Kind', 'a Straight Flush!!', 'a Royal Flush!!!!'];
		var p1Max = Math.max(...player1.best), p2Max = Math.max(...player2.best);
		if (p1Max > p2Max){
			return 1;
			// console.log('P1 wins with '+wins[p1Max]);
		}
		else if (p1Max < p2Max){
			return 0;
			// console.log('P2 wins with '+wins[p2Max]);
		}
		else if (p1Max === p2Max) {
			if (p1Max === 1){
				if (player1.pairs[0] > player2.pairs[0]){
					return 1;
					// console.log('P1 wins with '+wins[p1Max]);
				} else if (player1.pairs[0] < player2.pairs[0]){
					return 0;
					// console.log('P2 wins with '+wins[p2Max]);
				} else {
					if (findHigh(ordered1) > findHigh(ordered2)){
						return 1;
						// console.log('P1 wins with '+wins[p1Max]);
					} else if (findHigh(ordered1) < findHigh(ordered2)){
						return 0;
						// console.log('P2 wins with '+wins[p2Max]);
					} else {
						return -1
						// console.log('It\'s a tie!');
					}
				}
			} else if (p1Max === 2){
				if (player1.pairs[0] > player2.pairs[0] && 
					player1.pairs[1] > player2.pairs[1]){
					return 1;
					// console.log('P1 wins with '+wins[p1Max]);
				} else if (player1.pairs[0] < player2.pairs[0] &&
					player1.pairs[1] < player2.pairs[1]){
					return 0
					// console.log('P2 wins with '+wins[p2Max]);
				} else {
					if (findHigh(ordered1) > findHigh(ordered2)){
						return 1
						// console.log('P1 wins with '+wins[p1Max]);
					} else if (findHigh(ordered1) < findHigh(ordered2)){
						return 0
						// console.log('P2 wins with '+wins[p2Max]);
					} else {
						return -1
						// console.log('It\'s a tie!');
					}
				}
			} else if (p1Max === 3){
				if (player1.threes[0] > player2.threes[0]) {
					return 1
					// console.log('P1 wins with '+wins[p1Max]);
				} else if (player1.threes[0] < player2.threes[0]) {
					return 0
					// console.log('P2 wins with '+wins[p2Max]);
				} else {
					return -1
					// console.log('It\'s a tie!');
				}
			} else if (p1Max === 7){
				if (player1.fours[0] > player2.fours[0]) {
					return 1
					// console.log('P1 wins with '+wins[p1Max]);
				} else if (player1.fours[0] < player2.fours[0]) {
					return 0
					// console.log('P2 wins with '+wins[p2Max]);
				} else {
					return -1
					// console.log('It\'s a tie!');
				}
			} else if (p1Max === 0){
				if (findHigh(ordered1) > findHigh(ordered2)){
					return 1
					// console.log('P1 wins with '+wins[p1Max]);
				} else if (findHigh(ordered1) < findHigh(ordered2)){
					return 0
					// console.log('P2 wins with '+wins[p2Max]);
				} else {
					return -1
					// console.log('It\'s a tie!');
				}
			} else {
				return -1
				// console.log('Someone probably wins, but idk who yet');
			}
		}
	}

	var findHigh = function(arr) {
		var temp = []
		for (i=0;i<arr.length;i++) {
			if (arr[i] === 'Jack')
				temp.push(11);
			else if (arr[i] === 'Queen')
				temp.push(12);
			else if (arr[i] === 'King')
				temp.push(13);
			else if (arr[i] === 'Ace')
				temp.push(14);
			else
				temp.push(arr[i])
		}
		return Math.max(...temp);
	}
});