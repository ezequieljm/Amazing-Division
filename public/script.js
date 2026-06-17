document.getElementById('btnCalculate').addEventListener('click', async () => {
    const n1 = document.getElementById('numerator').value;
    const n2 = document.getElementById('denominator').value;
    const resultContainer = document.getElementById('result-container');

    // Basic client-side validation to ensure inputs are not empty
    if (n1 === '' || n2 === '') {
        resultContainer.style.color = 'orange';
        resultContainer.innerHTML = 'Please fill in both fields.';
        return;
    }

    try {
        // Fetch data from the Express backend API using query parameters
        const response = await fetch(`/api/divide?n1=${n1}&n2=${n2}`);
        const data = await response.json();

        (data.status === 'success') 
            ? (resultContainer.style.color = 'green', resultContainer.innerHTML = `<h1>Result: ${data.value}</h1>`)
            : (resultContainer.style.color = 'red', resultContainer.innerHTML = `<h1>Error: ${data.error}</h1>`)

    } catch (error) {
        // Handles network issues or total server crash
        resultContainer.style.color = 'red';
        resultContainer.innerHTML = `<h1>Critical Server Error</h1>`;
    }
});
