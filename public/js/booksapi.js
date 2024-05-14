function searchBooks() {
    const bookSearchInput = document.getElementById('booksearch');
    const query = encodeURIComponent(bookSearchInput.value);
    const slider = document.getElementById('slider');
    slider.innerHTML = ""; 

    const googleBooksAPI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}`;

    fetch(googleBooksAPI)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const volumeInfo = item.volumeInfo;
                    const title = volumeInfo.title || "Unknown Title";
                    const authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown Author";
                    const description = volumeInfo.description || "No description available.";
                    const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : null;

                    const slide = document.createElement("div");
                    slide.className = "slide"; 

                    slide.innerHTML = `
                        <h2>${title}</h2>
                        <p><strong>Author:</strong> ${authors}</p>
                        <p><strong>Description:</strong> ${description}</p>
                        ${thumbnail ? `<img src="${thumbnail}" alt="${title} cover">` : ""}
                    `;

                    slider.appendChild(slide); 
                });

            } else {
                slider.innerHTML = "No books found for the given ISBN.";
            }
        })
        .catch(error => {
            console.error("Error fetching data from Google Books API:", error);
            slider.innerHTML = "An error occurred while fetching data. Please try again later.";
        });
}

