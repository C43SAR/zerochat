var username = prompt("Enter Name: ");
var password = prompt("Enter Password: ");

function sendMessage(){
	var message = document.getElementById('message').value;
	firebase.database().ref("messages").push().set({
		"sender": username,
		"senderPwd": password,
		"message": message
	});
	message = '';
	return false;
}

firebase.database().ref("messages").on("child_added", function(e){
	var html = "";
	html+="<li id='message-" + e.key + "'>";
	if(e.val().sender == username && e.val().senderPwd == password){
		html += "<button data-id='" + e.key + "' onclick='deleteMessage(this)'>";
		html += "Delete";
		html += "</button> ";
	}
	html+=e.val().sender+": "+e.val().message;
	html+="</li>";

	document.getElementById("messages").innerHTML+=html;
});

function deleteMessage(e){
	var msgId = e.getAttribute('data-id');
	firebase.database().ref("messages").child(msgId).remove();
}

firebase.database().ref("messages").on("child_removed", function(e){
	document.getElementById("message-" + e.key).innerHTML = "This message was deleted.";
});