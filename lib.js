form = document.querySelector("#bookForm")
const library_list = []

class Book {
    constructor(id, title, author, pages, genre, coverImg, read) {
        // this.form = form
        this.id =  id;
        this.title = title;
        this.author =  author;
        this.pages = pages;
        this.genre = genre;
        this.coverImg =  coverImg;
        this.read =  read;
       
        }

    
}

class MyLibrary {

    constructor(myLib) {
        this.myLib = myLib
    }

    displayBooks() {
    
        const row = document.querySelector(".row")
        const library = this.myLib
        row.innerHTML = ""

        if (library_list.length === 0) {
            row.innerText = "YOU HAVE NO BOOKS ADDED";
            row.style.color = "red" 
            return;
        };

        library.forEach((book) => {
            const card = document.createElement("div")
            const bookImg = document.createElement("img");
            const bookTitleDiv = document.createElement("div");
            const bookTitle = document.createElement("h3");
            const delBtn = document.createElement("button");
            const bookAuthorDiv = document.createElement("div")
            const bookAuthor = document.createElement("p");
            const bookPagesDiv = document.createElement("div")
            const bookPages = document.createElement("p");
            const bookGenre = document.createElement("span");
            const status = document.createElement("p")
            const btnRead = document.createElement("button")
            

            card.classList.add("card")
            bookPages.classList.add("bookPages")
            bookGenre.classList.add("bookGenre")
            bookTitleDiv.classList.add("bookTitleContainer")
            bookAuthorDiv.classList.add("bookAuthorDiv")
            bookPagesDiv.classList.add("bookPagesDiv")
            btnRead.classList.add("btnRead")
            delBtn.classList.add("delBtn")
        
            row.appendChild(card)
            card.append(bookImg, bookTitleDiv, bookAuthorDiv, bookPagesDiv, btnRead)
            bookTitleDiv.append(bookTitle, delBtn)
            bookAuthorDiv.append(bookAuthor, status)
            bookPagesDiv.append(bookPages, bookGenre)

            card.dataset.id = book.id
            bookImg.src = book.coverImg;
            bookTitle.innerText = book.title;
            bookAuthor.innerText = book.author;
            bookPages.innerText = `${book.pages} pages`;
            bookGenre.innerText = book.genre;
            status.innerText = `Status: ${book.read}`
            delBtn.innerText = "Delete"
            status.style.color = "red"
            btnRead.innerText = `${book.read === "Unread" ? "Mark as Read" : "Mark as Unread"}`
            
            delBtn.addEventListener("click", (event) => {
                const card = event.target.closest(".card")
                const id = card.dataset.id;
                console.log("IDD", id)
                console.log("CARD", card)
                const index = library.findIndex(book  => book.id === id)

                library.splice(index, 1)
                mylibrary.displayBooks()

            });

            btnRead.addEventListener("click", (event) => {
                console.log("I CLICKED")
                const card = event.target.closest(".card")
                const id = card.dataset.id
                const index = library.findIndex(book => book.id ===id)
                console.log("INDEX", index)
                if (index !== -1) {
                    console.log("I am inside if")
                    console.log("READ STATUS", library[index].read)
                    if (library[index].read === "Unread") {
                        library[index].read = "Read";
                    }else{
                        library[index].read = "Unread"
                        
                    }
                    mylibrary.displayBooks()
                }
            })

        });
    };
        
    }


function getFormData(e) {
    const coverImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB_4aOdJV1AwXz_yG_AR7NcMAl7s9oSUNP2hzYQKDYA&s=10", 

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTic7BjUiuyVB56sgZPC34LeKcYtO-NfLe8TyPIaL-hxQ&s=10",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoXv1H8lUyf9epoMQa4NwUuYkX1pJREKCeXwCQMYcRXg&s=10",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqTAlTfPIU_t2OsrgA4LppE2lx9MxKvExgkVa8DPsPgg&s=10"
    ]


    e.preventDefault()
    const formData = new FormData(form)

    const id =  crypto.randomUUID()
    const title = formData.get("title")
    const author = formData.get("author")
    const pages = formData.get("pages")
    const genre = formData.get("genre")

    const index = Math.floor(Math.random() * coverImages.length)
    const coverImg = coverImages[index]

    const read = "Unread"

    return new Book(id, title, author, pages, genre, coverImg, read)

    
}
const mylibrary = new MyLibrary(library_list)
form.addEventListener("submit", (e) => {

const myBook = getFormData(e)
library_list.push(myBook)
const mylibrary = new MyLibrary(library_list)
mylibrary.displayBooks()



console.log(myBook.title)
console.log(library_list)

form.reset()
});

mylibrary.displayBooks()
