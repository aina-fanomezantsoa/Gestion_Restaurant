const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', loadDetails);

async function loadDetails() {
    const response = await fetch(`php/orders/get_order.php?id=${orderId}`);
    const result = await response.json();
    
    if (result.success) {
        document.getElementById('order-id').textContent = result.order.id;
        document.getElementById('customer-name').textContent = result.order.customer_name;
        document.getElementById('customer-phone').textContent = result.order.customer_phone;
        document.getElementById('total-amount').textContent = result.order.total_amount;
        document.getElementById('status-select').value = result.order.status;
        
        document.getElementById('items-body').innerHTML = result.items.map(item => `
            <tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.subtotal} Ar</td></tr>
        `).join('');
    }
}

async function updateStatus() {
    const status = document.getElementById('status-select').value;
    const response = await fetch('php/orders/update_status.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: orderId, status: status})
    });
    
    const result = await response.json();
    if (result.success) {
        alert('Statut mis à jour !');
        window.location.reload();
    }
}
