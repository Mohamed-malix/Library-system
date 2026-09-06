

let form = document.querySelector('form');
let bookName = document.querySelector('#name');
let bookAuthor = document.querySelector('#author');
let bookPages = document.querySelector('#pages');
let bookRating = document.querySelector('#rating');
let table = document.querySelector('.tableBody');
let search = document.querySelector('#search');
let bookRead;



let books = [];




//to make the code clean
onload = () => {
  if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"))
  }
  //this'll fix not update when reload
  displayBook();
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  let bookState = document.querySelector('[name="bookState"]:checked');
  if (bookState) {
    bookRead = bookState.value;
  } else {
    bookRead = 'not selected';
  }


  //check Validate
  {
    if (
      !bookName.value ||
      !bookAuthor.value ||
      !bookPages.value ||
      !bookRating.value
    ) {
      alert("Some input is Empty");
      return;
    }
  }


  let book = new Book(bookName, bookAuthor, bookPages, bookRead, bookRating);
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  displayBook();
  clear();
})





function Book(name, author, pages, read, rating) {

  if (!new.target) {
    console.log("You need to use 'new' key word!");
  }

  this.name = name.value;
  this.author = author.value;
  this.pages = pages.value;
  this.read = read;
  this.rating = rating.value;

}



function displayBook() {
  let data = '';

  for (let i = 0; i < books.length; i++) {

    data += `
        <tr>
            <td>${i}</td>
        <td>${books[i].name}</td>
        <td>${books[i].author}</td>
        <td>${books[i].pages}</td>
        <td>${books[i].rating}</td>
        <td><button type="button" class="checkRead" onclick="changeState(${i})">${books[i].read}</button></td>
        <td> <button class="delete" type="button" onclick="deleteBook(${i})">Delete</button></td>
        </tr>
        `
  }

  table.innerHTML = data;
}



function clear() {
  bookName.value = '';
  bookAuthor.value = '';
  bookRating.value = '';
  bookRead.value = '';
  bookPages.value = '';
}


function deleteBook(index) {
  books.splice(index, 1);

  localStorage.setItem('books', JSON.stringify(books));
  displayBook();
}


// let btnRead= document.querySelector('.checkRead');
function changeState(index) {

  if (books[index].read == "read") {
    books[index].read = "unread";
  } else {
    books[index].read = "read";
  }

  localStorage.setItem('books', JSON.stringify(books));
  displayBook();
}



search.addEventListener('keyup', (e) => {
  let data = '';

  for (let i = 0; i < books.length; i++) {

    if (books[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
      data += `
          <tr>
            <td>${i}</td>
            <td>${books[i].name}</td>
            <td>${books[i].author}</td>
            <td>${books[i].pages}</td>
            <td>${books[i].rating}</td>
            <td><button type="button" class="checkRead" onclick="changeState(${i})">${books[i].read}</button></td>
             <td> <button class="delete" type="button" onclick="deleteBook(${i})">Delete</button></td>
          </tr>
            `
    }
  }


  table.innerHTML = data;
})
