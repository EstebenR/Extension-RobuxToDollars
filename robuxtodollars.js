const processedElements = new Set();

// Function to check if a value is a number
function isNumeric(value) {
	const cleanedValue = value.replace(/,/g, ''); // Remove commas
	return !isNaN(parseFloat(cleanedValue));
}

// Function to convert Robux to dollars and append the value
function robuxToDollars() {
	// Select all elements with the data-testid="Robux" attribute
	const robuxElements = document.querySelectorAll('[data-testid="Robux"]');

	// Iterate over each selected element
	robuxElements.forEach((element) => {
		if(processedElements.has(element)){
			return;
		}

		// Get the next sibling of the current element
		const nextSibling = element.nextElementSibling;

		// Mark this element as processed
		processedElements.add(element);

		// Check if the next sibling exists, its value is numeric
		if (nextSibling && isNumeric(nextSibling.textContent)) {
			// Remove commas from the numeric value
			const numericValue = parseFloat(nextSibling.textContent.replace(/,/g, ''));
			const newValue = numericValue * 0.0035;

			// Append the calculated value to the original value
			nextSibling.textContent += ` = $${newValue.toFixed(2)}`;
		} else {
			console.log("No valid numeric sibling found for element:", element);
		}
	});
}

// Function to observe changes in the DOM
function observeDOMChanges() {
	// Create a MutationObserver instance
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			// Check if new nodes are added
			if (mutation.addedNodes.length > 0) {
				// Run the function to convert Robux to dollars
				robuxToDollars();
			}
		});
	});

	// Start observing the document body for child node additions
	observer.observe(document.body, { childList: true, subtree: true });
}

console.log("Hello!");

// Run the function initially in case the elements are already loaded
robuxToDollars();

// Start observing the DOM for changes
observeDOMChanges();
