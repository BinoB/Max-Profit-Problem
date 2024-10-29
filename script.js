function calculateMaxProfit(timeUnits, multiOutput, theaterCount, pubCount, parkCount, totalEarnings) {
    let theaterEarnings = 0;
    let pubEarnings = 0;
    let parkEarnings = 0;

    // Handling special case for multiple outputs.
    if (timeUnits === 7) {
        multiOutput = 1;
    }

    if (timeUnits > 5) {
        theaterEarnings = (timeUnits - 5) * 1500;
    }

    if (timeUnits > 4) {
        pubEarnings = (timeUnits - 4) * 1000;
    }

    if (timeUnits > 10) {
        parkEarnings = (timeUnits - 10) * 3000;
    }

    const maxEarnings = Math.max(theaterEarnings, pubEarnings, parkEarnings);
    totalEarnings += maxEarnings;

    if (maxEarnings > 0) {
        if (maxEarnings === theaterEarnings) {
            timeUnits -= 5;
            theaterCount++;
        } else if (maxEarnings === pubEarnings) {
            timeUnits -= 4;
            pubCount++;
        } else {
            timeUnits -= 10;
            parkCount++;
        }
    }

    return [timeUnits, multiOutput, theaterCount, pubCount, parkCount, totalEarnings];
}

function handleInput() {
    let userInput = document.getElementById("timeInput").value;
    let totalEarnings = 0;
    let theaterCount = 0;
    let pubCount = 0;
    let parkCount = 0;
    let multiOutput = 0;

    userInput = parseInt(userInput); 

    const result1Element = document.getElementById("result1");
    const result2Element = document.getElementById("result2");
    result1Element.innerHTML = "";
    result2Element.innerHTML = "";

    while (userInput > 4) {
        [userInput, multiOutput, theaterCount, pubCount, parkCount, totalEarnings] = calculateMaxProfit(
            userInput,
            multiOutput,
            theaterCount,
            pubCount,
            parkCount,
            totalEarnings
        );
    }
    
    // Show remaining time units
    document.getElementById("remainingTime").innerHTML = `Time Units Left: ${userInput}`;
    document.getElementById("earnings").innerHTML = `Earnings: $${totalEarnings}`;

    // Display results based on multiple output
    if (multiOutput === 1) {
        result1Element.innerHTML = `Solution1 => T: ${theaterCount}, P: ${pubCount}, C: ${parkCount}`;
        result2Element.innerHTML = `Solution2 => T: ${theaterCount - 1}, P: ${pubCount + 1}, C: ${parkCount}`;
		
    } else {
        result1Element.innerHTML = `Solution1 => T: ${theaterCount}, P: ${pubCount}, C: ${parkCount}`;
    }
}

// Add event listener to the button
document.getElementById("calculateBtn").addEventListener("click", handleInput);
