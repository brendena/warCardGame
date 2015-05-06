//conn is distant person
var conn;
//peer is local person
var peer = new Peer({key: 'obug60hpyawwb3xr'});


var cards = function(){
    //your deck
    var playersDeck = new Array();
    
    /*
    creates the deck and shuffles it
    */
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
            var index = Math.floor(Math.random() * (deck.length));
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
        for(var i = deck.length; i != 0; i-=2){
            playersDeck.push(deck[i])
            conn.send({card: deck[i-1]});
        }
    };
    
    var removeTopCard = function(){
        var firstCard = playersDeck[0];
        playersDeck.shift(); //removes first card
        conn.send({flipCard: firstCard});
        return firstCard;
    };
    var addCard = function(value){
        playersDeck.push(value);
    }
    
    return{
        newGame:spreadCardOut,
        removeTopCard:removeTopCard,
        addCard:addCard
    };
}();


//when i create my connection
peer.on('open', function(id){
    $('#pid').text(id);
});

//when i receive data
peer.on('connection', function(othersConn) {
  if(typeof conn === 'undefined'){
    conn = peer.connect(othersConn.peer);
    console.log("asdfasdf");
  }
  console.log("connectiong");
  othersConn.on('data', function(data){
    if(data.hasOwnProperty('card')){
        cards.addCard(data.card)
        console.log(data)
    }
    else if(data.hasOwnProperty('flipCard')){
        $('#opponentsCard').html(data.flipCard);
    }
    else{
        console.log(data);
    }
  });
});

//when clicked it takes the value from connectWith input and connect with peer.
$('#connectWithButton').click(function(){
    conn = peer.connect($('#connectWith').val());
    conn.on('open', function(){
      cards.newGame();
      conn.send('hi!');
    });
});

$('#flipCard').click(function(){
    $('#playersCard').html(cards.removeTopCard());
});



