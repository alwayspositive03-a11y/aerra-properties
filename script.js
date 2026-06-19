const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyPessQeD4PqRRSO6xEa6p-qG5nOfrkYdrVkfgveo3-aTY2Xw-32OatnzhuMUnrTU_S/exec";

document.getElementById("leadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        project: document.getElementById("project").value,
        requirement: document.getElementById("requirement").value
    };

    try {

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        document.getElementById("message").innerHTML =
            "✓ Enquiry submitted successfully";

        document.getElementById("leadForm").reset();

    } catch (error) {

        console.error(error);

        document.getElementById("message").innerHTML =
            "Server Error";

    }
});