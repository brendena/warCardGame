var playingField = function(){
    var playerHand = new Array();
    var opponentHand = new Array();
    
    var addCardToPlayerHand = function(card){
        playerHand.push(card)
    };
    var addCardToOpponentHand = function(card){
        opponentHand.push(card);
    }
    var getPlayerHandSize = function(){
        return playerHand.length;
    }
    var getOpponentsHandSize = function(){
        return opponentHand.length;
    }
    var flushBothHands = function(){
        layerHand = new Array();
        opponentHand = new Array();
    }
    var addPlayersHandBackToDeck = function(){
        var i;
        for(i = 0; i < playerHand.length; i++){
            deckObject.addCard(playerHand[i]);
            deckObject.addCard(opponentHand[i]);
        }
    }
    var addOpponentHandToOpponentDeck = function(){
        var i;
        for(i = 0; i < playerHand.length; i++){
            connHelper.sCard(player[i]);
            connHelper.sCard(opponentHand[i]);
        }

    }
    return{
        getHandSize:{
            opponent:getOpponentsHandSize,
            player:getPlayerHandSize
        },
        addCard:{
            opponent:addCardToOpponentHand,
            player:addCardToPlayerHand
        }
    };
}();





var resetCards = function(){
    console.log("reset")
    setTimeout(function(){
        $('#opponentsCardObject').toggleClass('flippedToBack');
        $('#playerCardObject').toggleClass('flippedToBack');
    },2000);

}

var addELForFlip = function(id){
    //if the cards on its back then you can flip it
    var that = $('#' + id);//this is stupid
    console.log(that);
    console.log("1")
    if(that.hasClass('flippedToBack')){
        console.log("2")
        that.toggleClass('flippedToBack');
        //check to see if the other players deckObject flipped
        console.log("oppenents size " + playingField.getHandSize.opponent());
        connHelper.sFlipCard();
        if(playingField.getHandSize.opponent() >= 1){
            //deckObject.battle($('#opponentsCard').html(),$('#playersCard').html());
            //resetCards();
            console.log('war');
        }
    };

};

var createNewCard = function(type, number,value){
    var content = document.querySelector('template').content;
    var clone = document.importNode(content, true);
    clone.childNodes[1].childNodes[1].id = type + "CardObject" + number;
    clone.childNodes[1].childNodes[1].childNodes[1].childNodes[0].id = type + "Card" + number ;
    clone.childNodes[1].childNodes[1].childNodes[1].childNodes[0].innerHTML  = value;
    return clone;
};

$('.deck').click(function(){
   if(playingField.getHandSize.player() == 0){
      var cardValue = deckObject.removeTopCard();
      var element = createNewCard('player',1,cardValue);
      $('#player').append(element)
                  .click(function(){
                      addELForFlip('playerCardObject1');
                  });
                  
      //add card to playing field
      playingField.addCard.player(cardValue);
   }
});

var addOpponentsCard = function(cardValue){
    console.log("asdf opnents size " + playingField.getHandSize.opponent());
    if(playingField.getHandSize.opponent() == 0){
        var element = createNewCard('opponent',1,cardValue);
        $('#opponent').append(element);
        //add card to playing field
        playingField.addCard.opponent(cardValue);
    }
}

