// Back-end logic
function Player(name, turnTotal, gameTotal) {
  this.win = false;
  this.active = false;
  this.name = name;
  this.turnTotal = turnTotal;
  this.gameTotal = gameTotal;
};

var player1 = new Player("", 0, 0)
var player2 = new Player("", 0, 0)

  // Front-End Logic:
$("#userInput").submit(function(event) {
  event.preventDefault();

  $("#gameTotal1").text(0)
  $("#gameTotal2").text(0)

  var player1Name = $("#player1Name").val();
  var player2Name = $("#player2Name").val();
  $(".displayName1").text(player1Name)
  $(".displayName2").text(player2Name)

  var player1 = new Player(player1Name, 0, 0)
    player1.active = true;
  var player2 = new Player(player2Name, 0, 0)

  var roll = 0;
  if ($("#twoDice").is(":checked")) {
    $("#roll").hide();
    $("#roll2").show();
  }
  console.log(player1.gameTotal)

  // Start Prototypes

  Player.prototype.activeSwitch = function() {
    if (player1.active) {
      player1.active = false
      player2.active = true
      $(".whoseTurn").text(player2.name)
    }
    else {
      player1.active = true
      player2.active = false
      $(".whoseTurn").text(player1.name)
    }
  };

  Player.prototype.hold = function() {
    $(".rolledNumbers").empty();
    this.gameTotal += this.turnTotal
    this.turnTotal = 0
    this.checkWin();
    this.activeSwitch();
  }

  Player.prototype.checkWin = function() {
    if (this.gameTotal >= 100) {
      alert(this.name + " is the winner!!")
      player1.gameTotal = 0;
      player2.gameTotal = 0;
      $("#gameTotal1").text(0)
      $("#gameTotal2").text(0)
    }
  }

// End Prototypes

  $(".whoseTurn").text(player1.name)
  $(".gameArea").show();

  $("#roll").click(function() {
    var roll = Math.floor(Math.random() * 6) + 1;

    Player.prototype.roll = function() {
      if (roll > 1) {
        this.turnTotal += roll
        $(".rolledNumbers").append(roll + ", ");
        $("#turnTotal").text(this.turnTotal);
      }
      else if (roll === 1) {
        $(".lastNumber").text(0)
        this.turnTotal = 0
        $(".rolledNumbers").empty();
        $("#turnTotal").text(this.turnTotal)
        alert("Sorry, you rolled a '1'. Now it is the other player's turn!")
        this.activeSwitch();
      }
    };

    $(".lastNumber").text(roll + ", ")

      if (player1.active) {
        player1.roll();
      }
      else if (player2.active) {
        player2.roll();
      };

  });

  $("#roll2").click(function() {
    var roll = Math.floor(Math.random() * 6) + 1;
    var roll2 = Math.floor(Math.random() * 6) + 1;

    Player.prototype.twoDice = function() {
      if ((roll > 1) && (roll2 > 1)) {
        this.turnTotal += roll
        this.turnTotal += roll2
        $(".rolledNumbers").append((roll + roll2) + ", ");
        $("#turnTotal").text(this.turnTotal);
      }
      else if ((roll === 1) && (roll2 === 1)) {
        this.gameTotal = 0;
        alert("Oh no! You rolled 2 ones! You've lost all your points for this game so far.")
        this.turnTotal = 0
        $("#turnTotal").text(this.turnTotal)
        $("#gameTotal1").text(player1.gameTotal);
        $("#gameTotal2").text(player2.gameTotal);
        $(".lastNumber").text(0)
        $(".rolledNumbers").empty();
        this.activeSwitch();
      }
      else if ((roll === 1) || (roll2 === 1)) {
        $(".lastNumber").text(0)
        this.turnTotal = 0
        $(".rolledNumbers").empty();
        $("#turnTotal").text(this.turnTotal)
        alert("Sorry, you rolled a '1'. Now it is the other player's turn!")
        this.activeSwitch();
      }
    };

      $(".lastNumber").text(roll + ", " + roll2)
      if (player1.active) {
        player1.twoDice();
      }
      else if (player2.active) {
        player2.twoDice();
      };


  });

  $("#hold").click(function() {
    $(".sorry").text("")
    if (player1.active) {
      player1.hold();
      $("#gameTotal1").text(player1.gameTotal)
      $("#turnTotal").text(player1.turnTotal)
      $(".lastNumber").text(0)

    }
    else if (player2.active) {
      player2.hold();
      $("#gameTotal2").text(player2.gameTotal)
      $("#turnTotal").text(player2.turnTotal)
      $(".lastNumber").text(0)
    }
  })

});
