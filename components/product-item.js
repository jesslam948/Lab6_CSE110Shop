// product-item.js
var title;
var price;
var img;
//var button;

class ProductItem extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});

    var style = document.createElement('style');

    style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }

      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }

      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }

      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }

      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
        max-height: 100%
      }

      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }`;

    const li = document.createElement('li');
    li.setAttribute('class', 'product');
    
    img = li.appendChild(document.createElement('img'));
    
    title = li.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    price = li.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    var button = li.appendChild(document.createElement('button'));
    button.onclick = () => {
      var cartList = JSON.parse(localStorage.getItem('cartList'));
      if (!cartList.includes(this.getAttribute('id'))) {
        alert('Added to cart!');
        let cartCount = JSON.parse(localStorage.getItem('cartList')).length + 1
        localStorage.setItem('cartCount', cartCount);
        button.textContent = 'Remove from Cart';
        cartList.push(this.getAttribute('id'));
        localStorage.setItem('cartList', JSON.stringify(cartList));
      } else {
        let cartCount = JSON.parse(localStorage.getItem('cartList')).length - 1;
        localStorage.setItem('cartCount', cartCount);
        button.textContent = 'Add to Cart';
        for (var i = 0; i < cartList.length; i++) {
          if(cartList[i] == this.getAttribute('id')) {
            cartList.splice(i, 1);
          }
        }
        localStorage.setItem('cartList', JSON.stringify(cartList));
      }
      localStorage.setItem('cartCount', JSON.parse(localStorage.getItem('cartList')).length);
      document.getElementById('cart-count').textContent = localStorage.getItem('cartCount');
    }

    shadow.appendChild(style);
    shadow.appendChild(li);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName == 'title-text') {
      title.textContent = this.getAttribute('title-text');
      img.alt = this.getAttribute('title-text');
    } else if (attrName == 'price-text') {
      price.textContent = this.getAttribute('price-text');
    } else if (attrName == 'image') {
      img.src = this.getAttribute('image');
      img.setAttribute('width', 200);
    }
  }

  static get observedAttributes() { return ['image', 'title-text', 'price-text']; }
}

customElements.define('product-item', ProductItem);


/**
<!-- Sample Product -->
<!-- li class="product">
    <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
    <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
    <p class="price">$109.95</p>
    <button onclick="alert('Added to Cart!')">Add to Cart</button>
</li -->
**/