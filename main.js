let form = document.querySelector("form");
let bookName = document.querySelector("#name");
let bookAuthor = document.querySelector("#author");
let bookPages = document.querySelector("#pages");
let bookRating = document.querySelector("#rating");
let table = document.querySelector(".tableBody");
let search = document.querySelector("#search");
let fields = Array.from(document.querySelectorAll(".field"));
console.log(fields);
let bookRead;
let books = [];

onload = () => {
  if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
  }

  displayBook();
};

//check Validate
fields.forEach((field) => {
  field.addEventListener("input", () => {
    // console.log(`ist working here?`);
    const fieldName = field.name;
    const spanError = document.querySelector(
      `[class="${fieldName}"] + span.error`,
    );
    console.log("from input", field.validity.valueMissing, spanError);

    clearError(spanError, field);
    if (field.validity.typeMismatch) {
      console.log("typeMismatch, input");
      field.setCustomValidity(
        `Please enter valid input for ${field.name} field!`,
      );
      setError(spanError, `Please enter valid input for ${field.name} field!`);
    } else if (field.validity.badInput) {
      console.log("badInput, input");
      field.setCustomValidity(
        `Please enter valid input for ${field.name} field!`,
      );
      spanError.textContent = `Please enter valid input for ${field.name} field!`;
    } else if (field.validity.valueMissing) {
      field.setCustomValidity(`The ${field.name} field is required`);
      setError(spanError, `The ${field.name} field is required`);
    } else if (field.validity.tooShort) {
      console.log("tooshort, input");
      field.setCustomValidity(`The input for the ${field.name} is too short!`);
      setError(spanError, `The input for the ${field.name} is too short!`);
    } else if (field.validity.tooLong) {
      console.log("toolong, input");
      field.setCustomValidity(`The input for the ${field.name} is too long!`);
      setError(spanError, `The input for the ${field.name} is too long!`);
    } else {
      console.log("else '', input", spanError);
      clearError(spanError, field);
      console.log("else '',check input", spanError, spanError.value);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateField();
  
  let bookState = document.querySelector('[name="bookState"]:checked');
  if (bookState) {
    bookRead = bookState.value;
  } else {
    bookRead = "not selected";
  }

  let book = new Book(bookName, bookAuthor, bookPages, bookRead, bookRating);
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  displayBook();
  clear();
});

class Book {
  constructor(value1, value2, value3, value4, value5) {
    this.name = value1.value;
    this.author = value2.value;
    this.pages = value3.value;
    this.read = value4;
    this.rating = value5.value;
  }

  get() {
    return {
      name: this.name,
      author: this.author,
      pages: this.pages,
      read: this.read,
      rating: this.rating,
    };
  }
}

function displayBook() {
  let data = "";

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
        `;
  }

  table.innerHTML = data;
}

function clear() {
  bookName.value = "";
  bookAuthor.value = "";
  bookRating.value = "";
  bookRead.value = "";
  bookPages.value = "";
}

function deleteBook(index) {
  books.splice(index, 1);

  localStorage.setItem("books", JSON.stringify(books));
  displayBook();
}

// let btnRead= document.querySelector('.checkRead');
function changeState(index) {
  if (books[index].read == "read") {
    books[index].read = "unread";
  } else {
    books[index].read = "read";
  }

  localStorage.setItem("books", JSON.stringify(books));
  displayBook();
}

//span error
function setError(spanError, message) {
  spanError.textContent = message;
  spanError.classList.add("active");
}

function clearError(spanError, field) {
  field.setCustomValidity("");
  spanError.textContent = "";
  spanError.className = "error";
}

function validateField() {
  fields.forEach((field) => {
    field.addEventListener("submit", () => {
      const fieldName = field.name;
      const spanError = document.querySelector(
        `[class="${fieldName}"] + span.error`,
      );
      console.log("from input", field.validity.valueMissing, spanError);

      clearError(spanError, field);
      if (field.validity.typeMismatch) {
        console.log("typeMismatch, input");
        field.setCustomValidity("Error");
        setError(
          spanError,
          `Please enter valid input for ${field.name} field!`,
        );
      } else if (field.validity.badInput) {
        console.log("badInput, input");
        field.setCustomValidity("Error");
        spanError.textContent = `Please enter valid input for ${field.name} field!`;
      } else if (field.validity.valueMissing) {
        field.setCustomValidity("Error");
        setError(spanError, `The ${field.name} field is required`);
      } else if (field.validity.tooShort) {
        console.log("tooshort, input");
        field.setCustomValidity("Error");
        setError(spanError, `The input for the ${field.name} is too short!`);
      } else if (field.validity.tooLong) {
        console.log("toolong, input");
        field.setCustomValidity("Error");
        setError(spanError, `The input for the ${field.name} is too long!`);
      } else {
        console.log("else '', input", spanError);
        clearError(spanError, field);
        console.log("else '',check input", spanError, spanError.value);
      }
    });
  });
}

search.addEventListener("keyup", (e) => {
  let data = "";

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
            `;
    }
  }

  table.innerHTML = data;
});
