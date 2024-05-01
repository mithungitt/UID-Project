// Sample book data (Replace this with real data from your backend)
const books = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "https://images-na.ssl-images-amazon.com/images/I/81rL9g34QrL.jpg"
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://images-na.ssl-images-amazon.com/images/I/81wy4u+LckL.jpg"
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "https://images-na.ssl-images-amazon.com/images/I/91QqB-x4cvL.jpg"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        image: "https://images-na.ssl-images-amazon.com/images/I/71aoXveZFSL.jpg"
    },
    {
        title: "Animal Farm",
        author: "George Orwell",
        image: "https://images-na.ssl-images-amazon.com/images/I/81M9O0-+jTL.jpg"
    }
];

// Function to display books based on search
function searchBooks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const bookList = document.getElementById("bookList");

    // Clear previous search results
    bookList.innerHTML = "";

    // Filter books
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchInput) ||
            book.author.toLowerCase().includes(searchInput);
    });

    // Display filtered books
    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        const bookImage = document.createElement("img");
        bookImage.src = book.image;
        bookImage.alt = book.title;

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = "By " + book.author;

        bookItem.appendChild(bookImage);
        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);

        bookList.appendChild(bookItem);
    });

    // If no books found
    if (filteredBooks.length === 0) {
        const noResult = document.createElement("p");
        noResult.textContent = "No books found";
        bookList.appendChild(noResult);
    }
}
