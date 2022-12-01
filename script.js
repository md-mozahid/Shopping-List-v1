//selection
const filterInputElm = document.querySelector('.filter')
const nameInputElm = document.querySelector('.nameInput')
const priceInputElm = document.querySelector('.priceInput')
const msgElm = document.querySelector('.msg')
const collectionElm = document.querySelector('.collection')
const form = document.querySelector('form')
const submitBtn = document.querySelector('.submit-btn')


//add product to storage
function addProductToStorage(product) {
    let products = ''
    if(localStorage.getItem('storeProducts')) {
        products = JSON.parse(localStorage.getItem('storeProducts'))
        //update and add new product
        products.push(product)
    }else {
        products = []
        products.push(product)
    }
    //save to local storage
    localStorage.setItem('storeProducts', JSON.stringify(products))
}

//add product to ui
function showProductToUI(productInfo) {

    const {id, name, price} = productInfo
    const elm = `<li class="list-group-item collection-item d-flex flex-row justify-content-between" data-productId='${id}'>
        <div class='product-info'>
            <strong>${name}</strong> - <span>$${price}</span>
        </div>
        <div class="action-btn">
            <i class="fa fa-pencil-alt float-right me-2 edit-product"></i>
            <i class="fa fa-trash-alt float-right delete-product"></i>
        </div>
    </li>`

    collectionElm.insertAdjacentHTML("afterbegin", elm)
    showMessage('Product added successfully')
}
//add product to data store
function addProduct(name, price) {
    const product = {
        id: products.length + 1,
        name: name,
        price: price
    }
    //memory data store
    products.push(product)
    return product
}

//tracking products
const products = []
//reset input value
// function resetInput() {
//     nameInputElm.value = ''
//     priceInputElm.value = ''
// }

//clear message
function clearMessage() {
    msgElm.textContent = ''
}

function showMessage(msg, action='success') {
    //show warning message in DOM
    const textMsg = `<div class='alert alert-${action}' role='alert'>${msg}</div>`
    msgElm.insertAdjacentHTML("afterbegin", textMsg)
    //clear show message
    setTimeout(() => {
        clearMessage()
    }, 2000)
}

//work with validation
function validateInputs(name, price) {
    let isValid = true
    //check input is empty
    if(name === '' || price === '') {
        isValid = false
        showMessage('Please fill the input', 'danger')
    }
    if(Number(price) !== Number(price)) {
        isValid = false
        showMessage('Please provide valid number', 'danger')
    }
    return isValid
}

//getting value from input
function receivedInput() {
    const name = nameInputElm.value
    const price = priceInputElm.value
    return {name, price}
}

//handling form submit
function handleFormSubmit(evt) {
    //browser default reload
    evt.preventDefault()

    //getting value from input (destructure)
    const {name, price} = receivedInput()

    //form validation
    const isValid = validateInputs(name, price)
    if(!isValid) return

    //reset the input value
    //resetInput()
    //add product to data store
    const product = addProduct(name, price)
    //add product info to ui
    showProductToUI(product)
    //add product to storage
    addProductToStorage(product)
    console.log(receivedInput())
}

//handling form input
form.addEventListener('submit', handleFormSubmit)