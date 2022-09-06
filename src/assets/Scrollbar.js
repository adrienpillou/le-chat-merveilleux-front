

//solution 1?
var messageBody = document.getElementById("messageBody");
messageBody.scrollTop = messageBody.scrollHeight;
/*
//solution 2 ?
messageBody.lastChild.scrollIntoView();


//solution 3 ?
$('#messageBody').scrollTop($('#messageBody')[0].scrollHeight);

url stackoverflow : https://stackoverflow.com/questions/40903462/how-to-keep-a-scrollbar-always-bottom
PS: j'ai ajouté un id messageBody dans l'html chat-box
*/