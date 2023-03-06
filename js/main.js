// localStorage.clear()
let quickView = document.querySelectorAll('#quickView')
let lightbox = document.querySelector('.lightbox')
let myCartIcon = document.querySelector('#mycart')
let addedItemsMenu = document.querySelector('.addedItems')
let products

// *** my original products ***
if (localStorage.getItem('myProducts') === null) {
  products = [
    {
      id: 1,
      product_name: 'jordan shoes-1 ',
      product_price: '$150',
      product_image: 'imgs/1.jpg',
      added_to_cart: false,
    },
    {
      id: 2,
      product_name: 'jordan shoes-2 ',
      product_price: '$220',
      product_image: 'imgs/2.jpg',
      added_to_cart: false,
    },
    {
      id: 3,
      product_name: 'jordan shoes-3 ',
      product_price: '$235',
      product_image: 'imgs/3.jpg',
      added_to_cart: false,
    },
    {
      id: 4,
      product_name: 'jordan shoes-4 ',
      product_price: '$180',
      product_image: 'imgs/4.jpg',
      added_to_cart: false,
    },
    {
      id: 5,
      product_name: 'jordan shoes-5 ',
      product_price: '$300',
      product_image: 'imgs/5.jpg',
      added_to_cart: false,
    },
    {
      id: 6,
      product_name: 'jordan shoes-6 ',
      product_price: '$120',
      product_image: 'imgs/6.jpg',
      added_to_cart: false,
    },
  ]
} else {
  products = JSON.parse(localStorage.getItem('myProducts'))
}

// this array contain added products
let myCart

if (localStorage.getItem('myCart') === null) {
  myCart = []
} else {
  myCart = JSON.parse(localStorage.getItem('myCart'))
}

// my start function
displayProuducts()
function displayProuducts() {
  let Myproducts = products
    .map((product) => {
      return `
        <div class="card">
        <div class="img">
          <img class="w-100" src="${product.product_image}" alt="" />
        </div>
        <div class="info">
          <h4>${product.product_name}</h4>
          <h5>${product.product_price}</h5>
        </div>
        <div class="btns">
            ${
              !product.added_to_cart
                ? `<button onclick="addToCart(${product.id})" id="addBtn">Add to Cart</button>`
                : `<button onclick="removeFromCart(${product.id})">remove from Cart</button>`
            }
          
            <button id="quickView" onclick="showItem(${
              product.id
            })">Quick view</button>
        </div>
      </div>
        `
    })
    .join('')
  document.getElementById('cards').innerHTML = Myproducts
  document.querySelector('.notify').innerHTML = myCart.length
}

function addToCart(id) {
  let product = products.find((el) => el.id === id)
  myCart.push(product)
  localStorage.setItem('myCart', JSON.stringify(myCart))
  product.added_to_cart = !product.added_to_cart
  for (let i = 0; i <= products.length; i++) {
    localStorage.setItem('myProducts', JSON.stringify(products))
  }

  displayProuducts()

  if (lightbox.style.display == 'flex') {
    showItem(id)
  }
}
function removeFromCart(id) {
  let product = products.find((el) => el.id === id)
  let index = myCart.indexOf(product)

  myCart.splice(index, 1)
  product.added_to_cart = !product.added_to_cart
  localStorage.setItem('myCart', JSON.stringify(myCart))
  for (let i = 0; i <= products.length; i++) {
    localStorage.setItem('myProducts', JSON.stringify(products))
  }

  displayProuducts()
  if (lightbox.style.display == 'flex') {
    showItem(id)
  }
}

// show Item part

function showItem(id) {
  lightbox.style.display = 'flex'
  let product = products.find((el) => el.id === id)
  lightbox.innerHTML = `
     <div class="popup">
     <i id="closeItem" class="close fa fa-times-circle-o fa-lg"></i>

         <div class="item-img">
             <img src="${product.product_image}" alt="">
         </div>
        <div class="item-info">
           <h3>${product.product_name}</h3>
           <h4>price : ${product.product_price}</h4>
         </div>
         <div class="item-addBtn">
        ${
          !product.added_to_cart
            ? `<button onclick="addToCart(${product.id})" id="addBtn">Add to Cart</button>`
            : `<button onclick="removeFromCart(${product.id})">remove from Cart</button>`
        }
         </div>
     </div>
    `
  // close Item view
  let closeItem = document.getElementById('closeItem')
  closeItem.addEventListener('click', function closeItems() {
    lightbox.style.display = 'none'
    displayProuducts()
  })
}

// close Item view with escap key

document.addEventListener('keyup', function (info) {
  if (info.code == 'Escape') {
    closeItems()
  }
})

function closeItems() {
  lightbox.style.display = 'none'
  addedItemsMenu.style.display = 'none'

  displayProuducts()
}

// ************************

// the Cart part

myCartIcon.addEventListener('click', function () {
  addedItemsMenu.style.display = 'block'
  viewAddedItemsMenu()
})

function viewAddedItemsMenu() {
  if (myCart.length > 0) {
    let addedProducts = myCart
      .map((el) => {
        return `
        <div>
        <p>${el.product_name}</p>
        <p>${el.product_price}</p>
      </div>
      <hr>
      `
      })
      .join('')

    addedItemsMenu.innerHTML = addedProducts
  } else {
    addedItemsMenu.innerHTML = `
        <div>
        <p>Ther is no items added here !!</p>
        
      </div>`
  }
}

// ****************************
