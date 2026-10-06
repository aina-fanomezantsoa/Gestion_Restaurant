document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

let allOrders = [];

async function loadOrders() {
    try {
        const response = await fetch('php/orders/get_orders.php');
        const result = await response.json();
        if (result.success) {
            allOrders = result.data;
            renderOrders(allOrders);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function renderOrders(orders) {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer_name}</td>
            <td>${order.table_number}</td>
            <td>${order.total_amount} Ar</td>
            <td><span class="status ${order.status}">${order.status}</span></td>
            <td><a href="order-details.html?id=${order.id}">Voir détails</a></td>
        </tr>
    `).join('');
}

function filterOrders() {
    const status = document.getElementById('filter-status').value;
    if (status === 'all') {
        renderOrders(allOrders);
    } else {
        renderOrders(allOrders.filter(o => o.status === status));
    }
}
