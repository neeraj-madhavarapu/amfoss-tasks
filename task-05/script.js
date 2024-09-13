const output = document.getElementById('output');
const input = document.getElementById('command-input');
const productSearch = document.getElementById('product-search');
const searchIcon = document.getElementById('search-icon');
const searchBarContainer = document.getElementById('search-bar-container');
const terminal = document.querySelector('.terminal');
const closeTerminal = document.getElementById('close-terminal');
const showTerminal = document.getElementById('show-terminal');

let cart = [];
let allProducts = [];

// Fetch products and display them on the left panel
function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      allProducts = products; // Store products for search functionality
      displayProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Display products on the left panel
function displayProducts(products) {
  const productsList = document.getElementById('products-list');
  productsList.innerHTML = ''; // Clear previous content if any

  products.forEach(product => {
    productsList.innerHTML += `
      <div class="product-box">
        <img src="${product.image}" alt="${product.title}" class="product-image" />
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>ID: ${product.id}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>`;
  });
}

// Search for a product in the left panel
function searchProductByNameLeftPanel() {
  const productName = productSearch.value.trim();
  if (productName) {
    const filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(productName.toLowerCase()));
    displayProducts(filteredProducts);
  } else {
    fetchProducts(); // Show all products if search bar is empty
  }
}

// Handle terminal commands
function handleCommand(command) {
  const commandParts = command.split(' ');
  const mainCommand = commandParts[0].toLowerCase();

  switch (mainCommand) {
    case 'list':
      listProductsInTerminal();
      break;
    case 'details':
      const productId = commandParts[1];
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
          output.innerHTML += `Product Details:
          Name: ${product.title}
          Price: $${product.price}
          Description: ${product.description}\n`;
        })
        .catch(() => {
          output.innerHTML += 'Invalid product ID.\n';
        });
      break;
    case 'add':
      const addProductId = commandParts[1];
      cart.push(addProductId);
      output.innerHTML += `Added product ${addProductId} to the cart.\n`;
      break;
    case 'remove':
      const removeProductId = commandParts[1];
      cart = cart.filter(id => id !== removeProductId);
      output.innerHTML += `Removed product ${removeProductId} from the cart.\n`;
      break;
    case 'cart':
      if (cart.length === 0) {
        output.innerHTML += 'Your cart is empty.\n';
      } else {
        output.innerHTML += 'Current cart items:\n';
        cart.forEach(productId => {
          fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
              output.innerHTML += `ID: ${product.id} - ${product.title} - Price: $${product.price}\n`;
            })
            .catch(error => {
              output.innerHTML += `Error fetching product with ID ${productId}.\n`;
            });
        });
      }
      break;
    case 'buy':
      if (cart.length === 0) {
        output.innerHTML += 'Your cart is empty.\n';
      } else {
        output.innerHTML += 'Proceeding to checkout...\n';
        localStorage.setItem('cartItems', JSON.stringify(cart)); // Save cart to localStorage
        window.location.href = 'checkout.html'; // Redirect to the checkout page
      }
      break;
    case 'clear':
      output.innerHTML = ''; // Clears terminal screen
      break;
    case 'search':
      const productName = commandParts.slice(1).join(' ');
      searchProductByName(productName);
      break;
    case 'sort':
      const sortType = commandParts[1].toLowerCase();
      if (sortType === 'name') {
        sortProductsByName();
      } else if (sortType === 'price') {
        sortProductsByPrice();
      } else {
        output.innerHTML += 'Invalid sort type. Use "name" or "price".\n';
      }
      break;
    case 'help':
      output.innerHTML += `Available Commands:
      list: Display all available products.
      details 'product_id': View details of a specific product identified by its ID.
      add 'product_id': Add a specific product to your cart using its ID.
      remove 'product_id': To remove the product from the cart
      cart: View the current items in your cart.
      buy: Proceed to a new webpage where you can review items in your cart along with the total price, enabling you to finalize your purchase.
      clear: Clear the terminal screen.
      search 'product_name': Search a product by name.
      sort 'price/name': Sort the products based on the price or the name.\n`;
      break;
    default:
      output.innerHTML += 'Invalid command. Type "help" for available commands.\n';
      break;
  }
}

// List products in the terminal
function listProductsInTerminal() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      output.innerHTML += 'Available Products:\n';
      products.forEach(product => {
        output.innerHTML += `ID: ${product.id} - ${product.title} - Price: $${product.price}\n`;
      });
    });
}

// Search products by name in the terminal
function searchProductByName(name) {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.title.toLowerCase().includes(name.toLowerCase()));
      if (product) {
        output.innerHTML += `Found Product:
        Name: ${product.title} - Price: $${product.price}\n`;
      } else {
        output.innerHTML += 'Product not found.\n';
      }
    })
    .catch(error => {
      output.innerHTML += 'Error fetching product.\n';
    });
}

// Sort products by name
function sortProductsByName() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
      output.innerHTML += 'Products sorted by name:\n';
      sortedProducts.forEach(product => {
        output.innerHTML += `ID: ${product.id} - ${product.title} - Price: $${product.price}\n`;
      });
    });
}

// Sort products by price
function sortProductsByPrice() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const sortedProducts = products.sort((a, b) => a.price - b.price);
      output.innerHTML += 'Products sorted by price:\n';
      sortedProducts.forEach(product => {
        output.innerHTML += `ID: ${product.id} - ${product.title} - Price: $${product.price}\n`;
      });
    });
}

// Function to add product to the cart
function addToCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(productId);  // Add the product ID to the cart
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Product added to cart!');
}

// Initialize products on page load
window.onload = function () {
  fetchProducts();
  
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleCommand(input.value);
      input.value = '';
    }
  });

  // Toggle search bar visibility
  searchIcon.addEventListener('click', function() {
    searchBarContainer.classList.toggle('show');
    
    // Move the search icon and adjust the layout
    if (searchBarContainer.classList.contains('show')) {
      searchIcon.style.transform = 'translateX(60px)'; // Move icon when search bar is visible
    } else {
      searchIcon.style.transform = 'none'; // Reset icon position
    }
  });

  // Add event listener for search input
  productSearch.addEventListener('input', searchProductByNameLeftPanel);

  // Show/Hide terminal
  showTerminal.addEventListener('click', function() {
    terminal.classList.remove('hidden');
  });

  // Close terminal
  closeTerminal.addEventListener('click', function() {
    terminal.classList.add('hidden');
  });
};
