let displayCollections = document.querySelector('.section')
let str = ''
let newBook = {}
let LISTDB

let libList = [
  {
    title: 'Animal Farm',
    pages: 16588,
    author: 'George Orwell',
    readStatus: false,
  },
  {
    title: 'Things Fall Apart',
    pages: 233,
    author: 'Chinua Achebe',
    readStatus: true,
  },
  {
    title: 'Marriage of Anasewaa',
    pages: 211,
    author: 'Kweku Ananse',
    readStatus: true,
  },
]

//Open a DB
function requestDB() {
  return LISTDB === undefined ? indexedDB.open('LibApp', 3) : LISTDB
}

requestDB()

//
document.getElementById('my-form').addEventListener('submit', (e) => {
  e.preventDefault()
})

//validate input
function validateEntry(input) {
  if (input === '' || input === undefined) {
    return `Input not found`
  }

  return input
}
//Book constructor function
function Book(title, author, pages, readStatus) {
  ;(this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.readStatus = readStatus)
}

//Add new book
function addBookToLibrary() {
  str = ''
  //Constructor
  let title = document.getElementById('title').value
  let author = document.getElementById('author').value
  let pages = document.getElementById('pages').value
  let readStatus = document.querySelector('input[name="readStatus"]:checked')

  if (title === '' || title === undefined) {
    console.log('Invalid title')
  } else if (author === '' || author === undefined) {
    console.log('invalid author')
  } else if (pages === '' || pages === undefined || pages == '0') {
    console.log('Invalid pages')
  } else if (readStatus === '' || readStatus === undefined) {
    console.log('Invalid read status ')
    console.log(readStatus)
  } else {
    newBook = new Book(title, author, pages, readStatus.value)
    libList.push(newBook)

    //Display all books
    displayBooks(libList)

    //Clear all fields
    //clearInputFields()
  }
}

//Clear all inpouyt fields
function clearInputFields() {
  let fields = document.querySelectorAll('.form-element input')
  for (let i = 0; i < fields.length; i++) {
    console.log(fields[i].value)
    fields[i].value = ''
    fields[i].checked = false
  }
}

//display books
function displayBooks(bookList) {
  str = `<div class="main">`
  bookList.forEach((book, index) => {
    str += `<div class='card' data-id="${index}">
                <div class="card-title">
                    <h2>${book.title}</h2>
                </div>
                <div class="card-body">
                    <label>Author: <span>${book.author}</span></label>
                    <label><span>${book.pages} pages</span></label>
                    <label>Have you read the book?<input type="checkbox"/><span>${
                      book.readStatus
                    }</span></label>
                    
                </div>
                <p>Book No. ${index + 1}</p>
                <button class="btnDelBook" data-id="${index}">-</button>
            </div>
        `
  })
  str += '</div>'
  displayCollections.innerHTML = str
}

;(function () {
  if (!window.indexedDB) {
    console.log('Browser does not support IndexDB')
  }
})()

//
displayBooks(libList)
//
