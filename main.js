//conn is distant person
var conn;
//peer is local person
var peer = new Peer({key: 'obug60hpyawwb3xr'});

//when i create my connection
peer.on('open', function(id){
    $('#pid').text(id);
});

//when i receive data
peer.on('connection', function(conn) {
  conn.on('data', function(data){
    console.log(data);
  });
});

//when clicked it takes the value from connectWith input and connect with peer.
$('#connectWithButton').click(function(){
    conn = peer.connect($('#connectWith').val());
    conn.on('open', function(){
      cards.create();
      conn.send('hi!');
    });
});


var cards = {
    create: function(){
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
            console.log(deck[index]);
            deck.splice(index,1);
        }
        for(i = shuffledDeck.length; i != 0; i-=2){
            conn.send(shuffledDeck[i]);
        }
    }
}
