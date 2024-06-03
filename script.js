// JavaScript for handling the ordering system

// Event listener for page load to load saved order
window.addEventListener('load', function () {
    loadSavedOrder();
    addMenuItemListeners();
});

let order = [];
let total = 0;

function addToOrder(name, price) {
    let item = order.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        order.push({ name: name, price: price, quantity: 1 });
    }
    updateOrderTable();
}

function removeFromOrder(name) {
    order = order.filter(item => item.name !== name);
    updateOrderTable();
}

function updateOrderTable() {
    const orderTable = document.getElementById('orderTable');
    orderTable.innerHTML = '';
    total = 0;

    order.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity}</td>
            <td><button onclick="removeFromOrder('${item.name}')">Remove</button></td>
        `;
        orderTable.appendChild(row);
        total += item.price * item.quantity;
    });

    document.getElementById('totalPrice').innerText = `Total: $${total}`;
}

function saveOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const orderDetails = { customerName, customerPhone, order };

    localStorage.setItem('savedOrder', JSON.stringify(orderDetails));
    alert('Order saved!');
}

function loadSavedOrder() {
    const savedOrder = JSON.parse(localStorage.getItem('savedOrder'));
    if (savedOrder) {
        document.getElementById('customerName').value = savedOrder.customerName;
        document.getElementById('customerPhone').value = savedOrder.customerPhone;
        order = savedOrder.order;
        updateOrderTable();
    }
}

function completeOrder() {
    alert('Order completed!');
    localStorage.removeItem('savedOrder');
    order = [];
    updateOrderTable();
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
}

function showHome() {
    document.getElementById('homeScreen').style.display = 'block';
    document.getElementById('orderSummary').style.display = 'none';
    
}

function showOrder() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('foodMenu').style.display = 'none';
    document.getElementById('orderSummary').style.display = 'block';
}

function showCategory(category) {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('orderSummary').style.display = 'none';
    document.getElementById('foodMenu').style.display = 'block';

    const items = document.querySelectorAll('#menu .list-group-item');
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        item.style.display = itemCategory === category ? '' : 'none';
    });
}


function searchMenu() {
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    const items = document.querySelectorAll('#homeMenu .list-group-item');
    items.forEach(item => {
        if (item.getAttribute('data-name').toLowerCase().includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Adding event listeners to menu items
document.querySelectorAll('#homeMenu .list-group-item').forEach(item => {
    item.addEventListener('click', () => {
        const name = item.getAttribute('data-name');
        const price = parseInt(item.getAttribute('data-price'));
        addToOrder(name, price);
    });
});

function addMenuItemListeners() {
    document.querySelectorAll('#menu .list-group-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-name');
            const price = parseInt(item.getAttribute('data-price'));
            addToOrder(name, price);
        });
    
    }

);
    
}