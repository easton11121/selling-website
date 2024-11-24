document.addEventListener('DOMContentLoaded', () => {
    const products = [
{ id: 1, name: 'PSG kit', price: 25.99, image: 'images/PSG.jpg' },
{ id: 2, name: 'Mens Suit', price: 55.99, image: 'images/suits.jpg' },
{ id: 3, name: 'Jacket', price: 30.99, image: 'images/Jacket.jpg' },
{ id: 4, name: 'P9 Headphones', price: 30.99, image: 'images/Headphones.jpg' },
{ id: 5, name: 'Dulag', price: 15.99, image: 'images/Dulag.jpg' },
{ id: 6, name: 'Mens Underwear', price: 15.99, image: 'images/underwear.jpg' },
{ id: 7, name: 'Skart', price: 20.99, image: 'images/skart.jpg' },
{ id: 8, name: 'Socks', price: 10.99, image: 'images/socks.jpg' },
{ id: 9, name: 'Real Madrid Kit', price: 27.99, image: 'images/Realmadrid.jpg' },
{ id: 10, name: 'Mens Shirt', price: 22.99, image: 'images/shart.jpg' },
{ id: 11, name: 'Mens Undershirt', price: 15.99, image: 'images/Undershart.jpg' },
{ id: 12, name: 'CB Dunk', price: 15.99, image: 'images/dunk.jpg' },
{ id: 13, name: 'Rolex Watch', price: 28.99, image: 'images/Rolex.jpg' },
{ id: 14, name: 'Dollar Chain', price: 18.99, image: 'images/chain.jpg' },
{ id: 15, name: 'Flat Caps', price: 15.99, image: 'images/caps.jpg' },
];


const productContainer = document.querySelector('.product-list');

products.forEach(product => {
const productElement = document.createElement('div');
productElement.classList.add('product-item');
productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button data-id="${product.id}">Add Cart</button>
`;
productContainer.appendChild(productElement);
});

const cartContainer = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCart = () => {
cartContainer.innerHTML = '';
let totalPrice = 0;
cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
    `;
    cartContainer.appendChild(cartItem);
});
totalPriceElement.textContent = totalPrice.toFixed(2);
};

const saveCart = () => {
localStorage.setItem('cart', JSON.stringify(cart));
};

document.addEventListener('click', (e) => {
if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    const productId = parseInt(e.target.dataset.id, 10);
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCart();
}
});

const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
if (cart.length === 0) {
    alert('Your cart is empty!');
} else {
    alert(`Your total is $${totalPriceElement.textContent}. Checkout not implemented yet.`);
}
});

const resetCartButton = document.getElementById('reset-cart');
resetCartButton.addEventListener('click', () => {
cart = [];
saveCart();
updateCart();
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
alert('Message sent!');
});

updateCart();
});


const SIZE = 4; // 3x3 grid
let puzzle = [];
let emptyTile = { row: SIZE - 1, col: SIZE - 1 };

// Initialize the puzzle grid
function initPuzzle() {
puzzle = [];
for (let i = 0; i < SIZE; i++) {
puzzle[i] = [];
for (let j = 0; j < SIZE; j++) {
    puzzle[i][j] = i * SIZE + j;
}
}
emptyTile = { row: SIZE - 1, col: SIZE - 1 };
renderPuzzle();
}

// Render the puzzle on the page
function renderPuzzle() {
const puzzleContainer = document.getElementById('puzzle');
puzzleContainer.innerHTML = '';

for (let i = 0; i < SIZE; i++) {
for (let j = 0; j < SIZE; j++) {
    const tile = puzzle[i][j];
    if (tile === SIZE * SIZE - 1) {
        // Empty tile
        continue;
    }
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.textContent = tile + 1;
    tileElement.dataset.row = i;
    tileElement.dataset.col = j;
    tileElement.addEventListener('click', handleTileClick);
    puzzleContainer.appendChild(tileElement);
}
}
}

// Handle tile click events
function handleTileClick(event) {
const row = parseInt(event.target.dataset.row);
const col = parseInt(event.target.dataset.col);

if (isMovable(row, col)) {
swapTiles(row, col);
renderPuzzle();
}
}

// Check if a tile can be moved
function isMovable(row, col) {
return (Math.abs(row - emptyTile.row) === 1 && col === emptyTile.col) ||
   (Math.abs(col - emptyTile.col) === 1 && row === emptyTile.row);
}

// Swap tiles
function swapTiles(row, col) {
puzzle[emptyTile.row][emptyTile.col] = puzzle[row][col];
puzzle[row][col] = SIZE * SIZE - 1;
emptyTile = { row, col };
}

// Shuffle the puzzle
function shufflePuzzle() {
for (let i = 0; i < 100; i++) {
const possibleMoves = [
    { row: emptyTile.row - 1, col: emptyTile.col },
    { row: emptyTile.row + 1, col: emptyTile.col },
    { row: emptyTile.row, col: emptyTile.col - 1 },
    { row: emptyTile.row, col: emptyTile.col + 1 }
].filter(move => move.row >= 0 && move.row < SIZE && move.col >= 0 && move.col < SIZE);

const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
swapTiles(move.row, move.col);
}
renderPuzzle();
}

// Add event listeners
document.getElementById('shuffleButton').addEventListener('click', shufflePuzzle);
document.getElementById('resetButton').addEventListener('click', initPuzzle);

// Initialize puzzle on page load
initPuzzle();
