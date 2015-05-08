//conn is distant person




var deckObject = function(){
    //your deck
    var playersDeck = new Array();
    /*
    creates the deck and shuffles it
    */
    var cardValues = { "2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":11,"Q":12,"K":13,"A":14};
    
    var createShuffledDeck =  function(){
        var values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        var types = ['&hearts;','&diams;','&clubs;','&spades;'];
        var deck = new Array();;
        for(var i = 0; i < values.length; i++){
            for(var j = 0; j < types.length; j++){
                deck.push(values[i] + types[j]);
            }
        }
        var shuffledDeck = new Array();
        for(i = deck.length; i != 0; i--){
            var index = Math.floor(Math.random() * (deck.length-1));
            shuffledDeck.push(deck[index]);
            deck.splice(index,1);
        }
        return shuffledDeck;
    };
    /*
    takes conn and playerDeck and gives each there cards
    */
    var spreadCardOut = function(){
        var deck = createShuffledDeck();
        console.log(deck.length);
        for(var i = deck.length-1; i  > 0; i-=2){
            console.log(deck[i]);
            playersDeck.push(deck[i])
            connHelper.sCard(deck[i-1]);
        }
    };
    
    var removeTopCard = function(){
        var firstCard = playersDeck[0];
        playersDeck.shift(); //removes first card
        connHelper.sCardSent(firstCard);
        return firstCard;
    };
    var addCard = function(value){
        playersDeck.push(value);
    }
    var pliceCard= function(card){
        console.log(card.length);
        if(card.length == 2){
            return card.slice(0,1);
        }
        if(card.length == 3){
            return card.slice(0,2);   
        }
    }
    var compareCards = function(opponentsCard, playerCard){
            var oCard = pliceCard(opponentsCard);
            var pCard = pliceCard(playerCard);
            console.log(oCard)
            console.log(pCard)
            if(cardValues[oCard] > cardValues[pCard]){
                return 0;
            }
            else if(cardValues[oCard] <  cardValues[pCard]){
                return 1;
            }
            // if ther equal
            else{
                return 2;
            }
    }
    
    var battle = function(opponentsCard, playersCard){
        var outCome = compareCards(opponentsCard,playersCard);
        console.log(outCome);
        if(outCome === 2){
            //war
        }
        else  if( outCome  === 1){ //player wins
            addCard(opponentsCard);
            addCard(playersCard);
        }
        else{
            connHelper.sCardSent(playersCard);
            connHelper.sCardSent(opponentsCard);
        }
        if(outCome <= 1 ){
            connHelper.sRest();
        }
        
    };
    
    var war = function(oCard, pCard){
        
    };
    return{
        newGame:spreadCardOut,
        removeTopCard:removeTopCard,
        addCard:addCard,
        battle:battle,
        war:war
    };
}();