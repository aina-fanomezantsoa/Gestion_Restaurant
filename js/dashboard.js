document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

async function loadDashboard() {
    try {
        const response = await fetch('php/orders/get_orders.php');
        const result = await response.json();
        
        if (result.success) {
            const orders = result.data;
            const tbody = document.getElementById('orders-body');
            
            document.getElementById('total-orders').textContent = orders.length;
            document.getElementById('pending-orders').textContent = orders.filter(o => o.status === 'pending').length;

            tbody.innerHTML = orders.map(order => `
                <tr>
                    <td>#${order.id}</td>
                    <td>${order.table_number}</td>
                    <td>${order.total_amount} Ar</td>
                    <td><span class="status ${order.status}">${order.status}</span></td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Erreur chargement:', error);
    }
}
