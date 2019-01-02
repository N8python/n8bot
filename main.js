messageNum = 1;
questions = [];
var jsonResult;
$(init);

function init() {
  jsonResult = $.getJSON("database.json", data => {
    questions = Object.keys(data);
  });
  $("#goButton").click(() => {
    if (document.getElementById("chat").value !== "") {
      $("#chatArea").append(` <div id=${messageNum} class="w3-animate-right">
                              <p class="player-message">${document.getElementById("chat").value}</p>
                              <i class="fa fa-caret-down w3-jumbo player-icon"></i>
                            </div>`);
      $("#" + messageNum).hide().fadeIn();
      messageNum++;
      getResponse();
      document.getElementById("chat").value = ""

    }
  });
  $("#chat").keypress(e => {
    if (e.which === 13) {
      if (document.getElementById("chat").value !== "") {
        $("#chatArea").append(` <div id=${messageNum} class="w3-animate-right">
                              <p class="player-message">${document.getElementById("chat").value}</p>
                              <i class="fa fa-caret-down w3-jumbo player-icon"></i>
                            </div>`);
        $("#" + messageNum).hide().fadeIn();
        messageNum++;
        getResponse();



      }
    }
  });
}

async function getResponse() {
  var response = document.getElementById("chat").value.toLowerCase();
  response+=" ";
  var answer = "";
  questions.forEach(question=>{
    if(response.includes(question)){
      answer = jsonResult.responseJSON[question];
      return;
    }
  })
  if (answer === ""){
    answer = "idk";
  }
  $("#chatArea").append(` <div id=${messageNum} class="w3-animate-left">
                        <p class="message">${answer}</p>
                        <i class="fa fa-caret-down w3-jumbo chatbot-icon"></i>
                      </div>`);
  $("#" + messageNum).hide().fadeIn();
  messageNum++;
  document.getElementById("chat").value=""

}
