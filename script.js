const accessKey = "l4PG_l-jEdrao0k4ZJ5rvLHcK_KXYQeJU10U5m5SFCw";

const formElement = document.querySelector("form");
const inputBarElement = document.getElementById("search-bar");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more-button");
const errorMessage = document.getElementById("error-message");
const errorNetwork = document.getElementById("error-network");

document.getElementById("search-form").addEventListener("submit", function (event) {
    var searchTerm = document.getElementById("search-bar").value.trim();

    if (searchTerm === "") {
        event.preventDefault();
        alert("Please enter a search term");
    }
});

let inputData = "";
let page = 1;

async function SearchImages() {
    inputData = inputBarElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        if (results.length === 0) {
            showMore.style.display = "none";
            errorMessage.style.display = "block";
            // errorMessage.textContent = "No results found.";
        } else {
            results.map((result) => {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("search-data");
                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description;
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.textContent = result.alt_description;

                imageWrapper.appendChild(image);
                imageWrapper.appendChild(imageLink);
                searchResult.appendChild(imageWrapper);
            });

            page++;
            if (page > 1) {
                showMore.style.display = "block";
            } else if (page === 0) {
                showMore.style.display = "none";
            }

            applyStyleToSearchResults();
        }
    } catch (error) {
        searchResult.innerHTML = "";
        showMore.style.display = "none";
        errorNetwork.style.display = "block";
        // errorMessage.textContent = "An error occurred. Please check your network connection and try again.";
        console.error(error);
    }
}

function applyStyleToSearchResults() {
    const searchDatas = document.getElementsByClassName("search-data");
    Array.from(searchDatas).forEach((searchData) => {
        searchData.classList.add("styled-search-data");

        const img = searchData.querySelector("img");
        img.classList.add("styled-search-data-img");

        const a = searchData.querySelector("a");
        a.classList.add("styled-search-data-link");

        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("content-wrapper");

        searchData.appendChild(contentWrapper);
    });
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    SearchImages();
});

showMore.addEventListener("click", () => {
    SearchImages();
});

// window.addEventListener("online", () => {
//     errorNetwork.style.display = "none";
//     SearchImages();
// });

// window.addEventListener("offline", () => {
//     errorNetwork.style.display = "block";
//     // errorNetwork.textContent = "You are currently offline. Please check your network connection.";
// });
