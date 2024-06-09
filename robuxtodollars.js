const robuxItems = document.querySelectorAll('[data-testid="Robux"]')
console.log("testamento")
robuxItems.forEach((elem) => {
	let possibleSpan = elem.nextSibling;
	console.log("elem")
	if(possibleSpan){
		console.log("span")
		console.log(possibleSpan.nodeValue)
	}
	//deleteUser(userItem);
});