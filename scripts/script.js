// Script.js
if (localStorage.getItem('cartCount') == null) {
  document.getElementById('cart-count').textContent = 0;
} else {
  document.getElementById('cart-count').textContent = localStorage.getItem('cartCount');
}
var cartCount = document.getElementById('cart-count').innerHTML;

var cartList = [];
if (JSON.parse(localStorage.getItem('cartList')) == null) {
  cartList = [];
} else {
  cartList = JSON.parse(localStorage.getItem('cartList'));
}

window.addEventListener('DOMContentLoaded', () => {
  const request = async () => {
    if (localStorage.getItem('products') == null) {
      const data = await fetch('https://fakestoreapi.com/products')
                      .then(response => response.text());
      localStorage.setItem('products', data);
    }

    var productList = JSON.parse(localStorage.getItem('products'));
    var productContainer = document.getElementById('product-list');
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('cartList', JSON.stringify(cartList));

    for (var prod in productList) {
      // productItem.shadowRoot.querySelector('img').setAttribute('alt', item.title)
      var data = productList[prod];
      const productItem = document.createElement('product-item');
      productItem.setAttribute('image', data['image']);
      productItem.setAttribute('title-text', data['title']);
      productItem.setAttribute('price-text', data['price']);
      productItem.setAttribute('id', data['id']);

      //console.log(JSON.parse(localStorage.getItem('cartList')).includes(data['id']), typeof JSON.parse(localStorage.getItem('cartList'))[0], typeof data['id'])
      
      if (JSON.parse(localStorage.getItem('cartList')).includes(data['id'].toString())) {
        productItem.shadowRoot.querySelector('button').textContent = 'Remove from Cart';
      } else {
        productItem.shadowRoot.querySelector('button').textContent = 'Add to Cart';
      }

      productContainer.appendChild(productItem);
    }
  }
  request();
});

