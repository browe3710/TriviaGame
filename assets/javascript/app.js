$(document).ready( function() {
    var questions = [
      {
        question: "This film, released in 2002 and directed by Kurt Wimmer, stars christian Bale and Taye Diggs.",
        answers: ["Equilibrium", "Ultraviolet", "Matrix", "The Machinist"],
        values: [true, false, false, false],
        gif: "https://media0.giphy.com/media/nnjmsiCa1SvZu/giphy.gif",
      },
      {
        question: "What is the Name of the movie Chritian Bale lost 62 pounds going from 173 pounds to 110 pounds?'.",
        answers: ["American Psycho", "The Dark Knight", "The Machinist", "The fighter"],
        values: [false, false, true, false],
        gif: "https://media3.giphy.com/media/2e9HcBfKLV35m/giphy.gif",
      },
      {
        question: "This 2000 movie Christain Bale was told was career suicide and wanted a bigger name for the role?",
        answers: ["American Hustle", "American Psycho", "The Prestige", "Empire of the Sun"],
        values: [false, true, false, false],
        gif: "https://media3.giphy.com/media/bbt9VUuWbiTjG/giphy.gif",
      },
      {
        question: "In what movie did Christian Bale first appear in?",
        answers: ["Reign of Fire", "American Psycho", "Empire of the Sun", " Anastasia: The Mystery of Anna"],
        values: [false, false, false, true],
        gif: "https://media2.giphy.com/media/11XDf5OOEDxMT6/giphy.gif",
      },
      {
        question: "In what movie that Chritian Bale starred in produced the most money opening weekend?",
        answers: ["The Dark Knight Riese", "The Dark Knight", "Public Enimies", "Batman Begins"],
        values: [true, false, false, false],
        gif: "https://media1.giphy.com/media/NAiBFJnzb2AsE/giphy.gif",
      }]
  
   
    var currentQuestion = 0;
    var correct = 0; 
    var wrong = 0; 
    var none = 0; 
  
    
    $("#start").on("click", function() {
     $("#start").fadeToggle("slow", displayQ) 
    
    })
  
 function displayQ() {
      
      $(".message-content").remove();
      $("#start").remove();
      
      var questionArea = $("<div>");
      questionArea.attr("id", "question-area")
      var timer = $("<h2>")
      var question = $("<h2>")
  
      questionArea.appendTo("#content")
      timer.appendTo(questionArea)
      question.appendTo(questionArea)
  
      var time = 30;
      timer.html("<h2>" + time + " seconds remaining</h2>")
      
      var countDown = setInterval( function() {
        time--;
        timer.html("<h2>" + time + " seconds remaining</h2>")
  
        if (time === 0) {
          clearInterval(countDown)
          questionArea.fadeToggle("slow", timedOut)
          none++;
        }
      }, 1000);
  question.html(questions[currentQuestion].question)
  
      for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
        var answers = $("<button>")
        answers.html(questions[currentQuestion].answers[i])
        answers.addClass("answer-buttons")
        answers.attr("value", questions[currentQuestion].values[i])
        answers.attr("id", "a" + i)
        answers.appendTo(questionArea)
      };
  
      $("#a0").animate({"left": "+=600px"})
  
  
  
      $(".answer-buttons").on("click", function() {
        console.log($(this).attr("value"));
  
        if ($(this).attr("value") === "true") {
          questionArea.fadeToggle("slow", displayCorrect)
          clearInterval(countDown);
          correct++;
        };
        if ($(this).attr("value") === "false") {
          questionArea.fadeToggle("slow", displayWrong)
          clearInterval(countDown)
          wrong++;
        };
      });
    };
  
 function displayCorrect() {
      var cycle = setTimeout(displayQ, 10000)
      var messageArea = $("<div>");    
      messageArea.addClass("message-content")
      var winMessage = $("<h2>");
      var detail = $("<h2>")
      var image = $("<img>")
      messageArea.appendTo($("#content"));
      winMessage.appendTo($(messageArea));
      detail.appendTo($(messageArea))
      image.appendTo($(messageArea))
      winMessage.text("Correct!");
      detail.text(questions[currentQuestion].detail)
      image.attr("src", questions[currentQuestion].gif)
  
  
      if (currentQuestion === (questions.length - 1)) {
        clearTimeout(cycle);
        var gameEnd = setTimeout( gameOver, 10000)
      }
      currentQuestion++;
    };
    function displayWrong() {
      var cycle = setTimeout(displayQ, 10000);
      var messageArea = $("<div>");
      messageArea.addClass("message-content")
      var lossMessage = $("<h2>");
      var detail = $("<h2>")
      var image = $("<img>")
      messageArea.appendTo($("#content"));
      lossMessage.appendTo(messageArea)
      detail.appendTo($(messageArea))
      image.appendTo($(messageArea))
      lossMessage.html("Wrong! The right answer was: " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);
      detail.text(questions[currentQuestion].detail)
      image.attr("src", questions[currentQuestion].gif)
  
      if (currentQuestion === (questions.length - 1)) {
        clearTimeout(cycle);
        var gameEnd = setTimeout( gameOver, 10000)
      }
      currentQuestion++;
    };
function timedOut() {
      var cycle = setTimeout(displayQ, 10000);
      var messageArea = $("<div>");
      messageArea.addClass("message-content")
      var lossMessage = $("<h2>");
      var detail = $("<h2>")
      var image = $("<img>")
      messageArea.appendTo($("#content"));
      lossMessage.appendTo(messageArea)
      detail.appendTo($(messageArea))
      image.appendTo($(messageArea))
      lossMessage.html("You timed out! The right answer was: " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);
      detail.text(questions[currentQuestion].detail)
      image.attr("src", questions[currentQuestion].gif)
  
      if (currentQuestion === (questions.length - 1)) { 
        clearTimeout(cycle);
        var gameEnd = setTimeout( gameOver, 10000)
      }
      currentQuestion++;
    };
function gameOver() {
      $(".message-content").remove();
      var totalCorrect = $("<h3>")
      var totalIncorrect = $("<h3>")
      var totalNone = $("<h3>")
      var restart = $("<button>")
      totalCorrect.appendTo($("#content"))
      totalCorrect.html("You got " + correct + " correct!")
      totalIncorrect.appendTo("#content")
      totalIncorrect.html("You got " + wrong + " wrong.")
      totalNone.appendTo("#content")
      
      if (none === 1) {
        totalNone.html("You didn't answer " + none + " question.")
      }
      if (none > 1 || none === 0) {
        totalNone.html("You didn't answer " + none + " questions.")
      }
      
      
      restart.addClass("restart")
      restart.text("Restart")
      restart.appendTo($("#content"))
  
      $(".restart").on("click", function() {
        totalCorrect.remove();
        totalIncorrect.remove();
        totalNone.remove();
        restart.remove();
        currentQuestion = 0;
        correct = 0; 
        wrong = 0; 
        none = 0;
        displayQ();
      })
  
    }
  
  })
  