document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    const modal = document.getElementById('product-modal');
    document.getElementById('add-btn').onclick = () => modal.style.display = 'flex';
    document.getElementById('close-modal').onclick = () => modal.style.display = 'none';
    
    document.getElementById('product-form').onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            category: document.getElementById('category').value,
            image: document.getElementById('image-file').files[0]?.name || ''
        };
        
        await fetch('php/menu/add_product.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        modal.style.display = 'none';
        document.getElementById('product-form').reset();
        loadMenu();
    };
});

async function loadMenu() {
    const res = await fetch('php/menu/get_products.php');
    const result = await res.json();
    const tbody = document.getElementById('menu-body');
    tbody.innerHTML = result.data.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price} Ar</td>
            <td><button onclick="deleteProduct(${p.id})">Supprimer</button></td>
        </tr>
    `).join('');
}

async function deleteProduct(id) {
    if(confirm('Supprimer ce plat ?')) {
        await fetch('php/menu/delete_product.php', {
            method: 'POST',
            body: JSON.stringify({id})
        });
        loadMenu();
    }
}
