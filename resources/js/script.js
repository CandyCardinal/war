var firstPlayer = [];
var secondPlayer = [];
var playedCards = [];
var cards = [] // declares the variable cards as an array
var $draw = $("#draw");
var $firstPlayer = $("#firstPlayer");
var $secondPlayer = $("#secondPlayer");
var $firstPlayerNumber = $("#firstPlayerNumber");
var $secondPlayerNumber = $("#secondPlayerNumber");
var $firstPlayerSuit = $("#firstPlayerSuit");
var $secondPlayerSuit = $("#secondPlayerSuit");
var $winner = $("#winner");
var $player1Count = $("#player1Count");
var $player2Count = $("#player2Count");

for (i = 1; i < 14; i++) { // uses the numbers 1 through 13 to represent ace through king
    for (k = 1; k < 5; k++) { // uses the numbers 1 through 4 to represent the four suits [diamonds, clubs, hearts and spades]
        j = [i,k];          // creates and array with the card's number and suit
        cards.push(j);      // adds that card number to the array cards
    }
}
// This code makes 52 cards

cards.shuffle = function() {
    console.log("shuffle");
    var input = this;
    for (var i = cards.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = cards[randomIndex][0];
        var itemAtSecond = cards[randomIndex][1];
        input[randomIndex][0] = input[i][0];
        input[randomIndex][1] = input[i][1];
        input[i][0] = itemAtIndex;
        input[i][1] = itemAtSecond;
    }
    return input;
}
// end of shuffle function

    cards.shuffle();

var half = cards.length/2;
for (i=0; i<half; i++) {
    firstPlayer.push(cards[i]);
}

cards.splice(0, half); //splice cuts off half the deck

secondPlayer = cards;


$player1Count.html(firstPlayer.length);
$player2Count.html(secondPlayer.length);

function endGame(){
    if(firstPlayer.length == 0){
        $winner.html("GAME OVER </br> Player Two Wins </br> Player One has no more cards to play.");
    }
    if(secondPlayer.length == 0){
        $winner.html("GAME OVER </br> Player One Wins </br> Player Two has no more cards to play.");
    }
    $winner.css("color", "red");
    $winner.css("font-weight", "bold");
    $("#end").css("display", "none");
    $firstPlayerNumber.html("");
    $secondPlayerNumber.html("");
    $draw.off(); // .off means that the funtion wont work anymore
}

//draw function:
function assign(){

    $firstPlayer.css("border-color", "black");
    $secondPlayer.css("border-color", "black");

    if(firstPlayer.lenght == 0 || secondPlayer.length == 0){ // || means or
        endGame();
    }

    $draw.on('click', function() {
        assign();
    })


    console.log("assign");
    $firstPlayerSuit.empty();
    $secondPlayerSuit.empty();

    $firstPlayerSuit.css("display", "block");
    $secondPlayerSuit.css("display", "block");

    var number1 = firstPlayer[0][0];
    var number2 = secondPlayer[0][0];

    $firstPlayerNumber.html(number1);
    $secondPlayerNumber.html(number2);

    suit1 = firstPlayer[0][1];
    suit2 = secondPlayer[0][1];

    if (suit1 == 1) {
        suit1 = "<img src='./resources/images/heart.png'/>";
    }
    if (suit1 == 2) {
        suit1 = "<img src='./resources/images/diamond.png'/>";
    }
    if (suit1 == 3) {
        suit1 = "<img src='./resources/images/club.png'/>";
    }
    if (suit1 == 4) {
        suit1 = "<img src='./resources/images/spade.png'/>";
    }
    if (suit2 == 1) {
        suit2 = "<img src='./resources/images/heart.png'/>";
    }
    if (suit2 == 2) {
        suit2 = "<img src='./resources/images/diamond.png'/>";
    }
    if (suit2 == 3) {
        suit2 = "<img src='./resources/images/club.png'/>";
    }
    if (suit2 == 4) {
        suit2 = "<img src='./resources/images/spade.png'/>";
    }

        if (number1<11){
            for (i=0; i<number1; i++) {
                $firstPlayerSuit.append(suit1);
            } 
        } else {
            if (number1 == 11) {
                var numberImg1 = "<img src='./resources/images/jack.png'/>";
                $firstPlayerSuit.append(suit1);
                $firstPlayerNumber.html(numberImg1);
            }
            if (number1 == 12) {
                numberImg1 = "<img src='./resources/images/queen.png'/>";
                $firstPlayerSuit.append(suit1);
                $firstPlayerNumber.html(numberImg1);
            }
            if (number1 == 13) {
                numberImg1 = "<img src='./resources/images/king.png'/>";
                $firstPlayerSuit.append(suit1);
                $firstPlayerNumber.html(numberImg1);
            }
                
            }

    for (i=0; i<number1; i++) {
        $firstPlayerSuit.append(suit1);
    };
    for (i=0; i<number2; i++) {
        $secondPlayerSuit.append(suit2);
    }

    playedCards.push(firstPlayer[0]);
    playedCards.push(secondPlayer[0]);
    firstPlayer.splice(0,1);
    secondPlayer.splice(0,1);
    $player1Count.html(firstPlayer.length);
    $player2Count.html(secondPlayer.length);

    console.log("call greater");
    greater();

}

function war (){
    $winner.html("This means war!");
    console.log("war");
    for (i=0; i<3; i++) {
        playedCards.push(firstPlayer[0]);
        playedCards.push(secondPlayer[0]);
        firstPlayer.splice(0,1);
        secondPlayer.splice(0,1);
        console.log("put down a card", number1, number2);
    }

    $firstPlayerSuit.css("display", "none");
    $secondPlayerSuit.css("display", "none");

    numberImg1 = "<img style='height:14rem;' src='./resources/images/card.png'/>";
    $firstPlayerNumber.html(numberImg1);
    numberImg2 = "<img style='height:14rem;' src='./resources/images/card.png'/>";
    $secondPlayerNumber.html(numberImg2);

    var audio = new Audio('drop.mp3'); // creates an audio variable
    audio.play(); // plays the audio

    window.setTimeout(function() { // this function makes it so that the computer waits a bit beofre playing the audio
        audio.play();
    }, 1000); // the 1000ms is equivalent to one second
    window.setTimeout(function() {
        audio.play();
    }, 1800); // gotta make it longer so that the computer doesnt run both functions simutaniously
    window.setTimeout(function() {
        console.log("call assign");
        assign();
        audio.play();
    }, 2600); // this is the 4th card, it gets placed a bit later than other cards
 
}

function greater(){
    if (number1 > number2) {
        $winner.html("Player One Wins");
        for (i=0; i<playedCards.length; i++) {
            firstPlayer.push(playedCards[i]);
            console.log("pushed a card to player 1");
        } 
        $player1Count.html(firstPlayer.length);
        playedCards=[];
    } else if (number2 > number1) {
            $winner.html("Player Two Wins");
            for (i=0; i<playedCards.length; i++) {
                secondPlayer.push(playedCards[i]);
                console.log("pushed a card to player 2");
            }
            $player2Count.html(secondPlayer.length)
            playedCards=[];
        } else if (number1 == number2) {
            war();
}   
}


$draw.on('click', function () {
    assign();
})




// $("#practice").append(cards);
// $("#practice").append(cards.join(", "));
// $("#practice").append(cards[51]);
// $("#practice").append("  " + cards.length);
/* buncha array tests and all

var list = ["apple", "banana", "ornage"];

var L = list.length;

var fakeCards = [];

// $("#practice").append("list length before " + fakeCards.length);

for(i=1; i<53; i++){
    fakeCards.push(i);
}


var passengers = [
    ["Lee", "red", "grapes"],
    ["Dave", "blue", "oranges"],
];

list.push("grapes");
$("#practice").html(list[list.length-1]);

/* for (i = 0; i < 10; i++) {

    $("#practice").append(i);

}


*/

