$('#chatEntered').click(function(){
    addDialog($('#chatInput').val(),false);
    connHelper.sChatMessage($('#chatInput').val());
});

var addDialog = function(info,opponent){
    $('#chatDialog').append(function(){
       var element = document.createElement('p');
       if(opponent) element.className = 'opponentsChat chatMessage';
       else element.className = 'yourChat chatMessage';
       element.innerHTML = info;
       return element;
    });
}

//when clicked it takes the value from connectWith input and connect with peer.
$('#connectWithButton').click(function(){
    connHelper.init(
      function(){
        return peer.connect($('#connectWith').val());},
      function(){
        deckObject.newGame();
        $("#gameConnectionBox").css('display','none');
    });
});





