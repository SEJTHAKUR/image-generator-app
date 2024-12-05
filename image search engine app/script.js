const accessKey = "49jTT-aJzkf0NXYEkVr75t2lGlNs1fymMzwfViPlO5E";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value.trim(); // Get search input value
    if (!keyword) {
        alert("Please enter a search term.");
        return;
    }
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        // Display results
        if (page === 1) {
            searchResult.innerHTML = ""; // Clear previous results
        }

        data.results.forEach((photo) => {
            const img = document.createElement("img");
            img.src = photo.urls.small;
            img.alt = photo.alt_description || "Unsplash Image";
            searchResult.appendChild(img);
        });

        // Show or hide "Show More" button
        if (data.results.length > 0) {
            showMoreBtn.style.display = "block";
        } else if (page === 1) {
            searchResult.innerHTML = `<p>No results found for "${keyword}".</p>`;
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        searchResult.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        showMoreBtn.style.display = "none";
    }
}

// Handle form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to the first page
    searchImages();
});

// Handle "Show More" button click
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
