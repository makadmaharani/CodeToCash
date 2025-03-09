// Mobile Menu Toggle
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

// Function to handle CPT Code and Treatment submission
function checkBill() {
    const cptCode = document.getElementById("cpt-code")?.value;
    const treatment = document.getElementById("treatment")?.value;
    const resultDiv = document.getElementById("bill-result");

    if (!cptCode || !treatment) {
        resultDiv.innerText = "Please enter both CPT code and treatment!";
        return;

    fetch("http://localhost:3000/verifyCPT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submittedCPT: cptCode, treatment: treatment }),
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = data.message;
        if (data.correctCode) {
            resultDiv.innerHTML += `<br>Correct CPT Code: ${data.correctCode}`;
        }
    })

    
    .catch(error => {
        console.error("Error:", error);
        resultDiv.innerText = "There was an error processing your request.";
    });
}


    document.addEventListener("DOMContentLoaded", function () {
        const checkBillButton = document.getElementById("check-bill-button");
        
        if (checkBillButton) {
            checkBillButton.addEventListener("click", checkBill);
        } else {
            console.error("Button not found! Check your HTML.");
        }
    });
}
