document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
    const modal = document.getElementById('order-modal');
    
    document.getElementById('add-order-btn').onclick = () => modal.style.display = 'flex';
    document.getElementById('close-modal').onclick = () => modal.style.display = 'none';
    
    document.getElementById('order-form').onsubmit = (e) => {
        e.preventDefault();
        const table = document.getElementById('table-num').value;
        const total = document.getElementById('total-amount').value;
        
        fetch('php/orders/create_order.php', {
            method: 'POST',
            body: JSON.stringify({table, total})
        }).then(res => res.json()).then(res => {
            if(res.success) {
                showNotification('Commande créée', 'success');
                modal.style.display = 'none';
                document.getElementById('order-form').reset();
                loadOrders();
            } else {
                showNotification('Erreur création', 'error');
            }
        });
    };
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
            <td>${order.table_number}</td>
            <td>${order.total_amount} Ar</td>
            <td><span class="status ${order.status}">${order.status}</span></td>
            <td>
                <a href="order-details.html?id=${order.id}" class="btn btn-primary">
                    <ion-icon name="eye-outline"></ion-icon>
                </a>
                <button class="btn btn-danger" onclick="deleteOrder(${order.id})" style="background: none; border: none; cursor: pointer; color: #e11d48;">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteOrder(id) {
    showConfirm('Supprimer cette commande ?', () => {
        fetch('php/orders/delete_order.php', {
            method: 'POST',
            body: JSON.stringify({id})
        }).then(res => res.json()).then(res => {
            if(res.success) {
                showNotification('Commande supprimée', 'success');
                loadOrders();
            } else {
                showNotification('Erreur lors de la suppression', 'error');
            }
        });
    });
}

function filterOrders() {
    const status = document.getElementById('filter-status').value;
    if (status === 'all') {
        renderOrders(allOrders);
    } else {
        renderOrders(allOrders.filter(o => o.status === status));
    }
}
