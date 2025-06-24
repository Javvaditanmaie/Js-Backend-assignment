// script.js
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

const API_BASE_URL = 'http://localhost:3000/api';

const displayBustedResult = (user) => {
    console.log("Received user:", user);
    resultsContainer.innerHTML = `
        <div class="card">
            <img src="${user.picture}" alt="User picture">
            <h3>BUSTED!</h3>
            <p><strong>${user.firstname} ${user.lastname}</strong> (${user.age}) was found in our database.</p>
            <p>They live in ${user.city}.</p>
        </div>
    `;
};

const displaySafeResult = (message) => {
    resultsContainer.innerHTML = `<p class="safe">${message}</p>`;
};

const displayError = (message) => {
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailToSearch = searchInput.value.trim();

    if (!emailToSearch) {
        displayError('Please enter an email address.');
        return;
    }

    resultsContainer.innerHTML = '<p>Searching...</p>';

    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                email: emailToSearch
            }
        });

        displayBustedResult(response.data);

    } catch (error) {
        if (error.response && error.response.status === 400) {
            if (error.response.data.message === "not in the list") {
                displaySafeResult(error.response.data.message);
            } else {
                displayError(error.response.data.error || 'Bad request');
            }
        } else {
            displayError('Could not connect to the server. Please try again later.');
        }
    }
});
