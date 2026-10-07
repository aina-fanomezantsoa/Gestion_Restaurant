document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    const modal = document.getElementById('product-modal');
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#menu-body tr');
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });

    document.getElementById('add-btn').onclick = () => {
        modal.style.display = 'flex';
        document.getElementById('product-id').value = '';
        document.getElementById('modal-title').innerText = 'Ajouter un plat';
        document.getElementById('form-submit').innerText = 'Enregistrer';
        document.getElementById('current-image').src = '';
        document.getElementById('current-image').style.display = 'none';
        document.getElementById('product-form').reset();
    };
    document.getElementById('close-modal').onclick = () => modal.style.display = 'none';
    
    document.getElementById('product-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', document.getElementById('product-id').value);
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('category', document.getElementById('category').value);
        
        const imageFile = document.getElementById('image-file').files[0];
        if (imageFile) formData.append('image', imageFile);
        else formData.append('current_image', document.getElementById('image-path').value);

        const url = document.getElementById('product-id').value ? 'php/menu/update_product.php' : 'php/menu/add_product.php';
        
        const response = await fetch(url, { method: 'POST', body: formData });
        const result = await response.json();
        
        if (result.success) {
            showNotification('Opération réussie !', 'success');
        } else {
            showNotification('Erreur : ' + (result.message || 'Une erreur est survenue'), 'error');
        }
        
        document.getElementById('product-modal').style.display = 'none';
        document.getElementById('product-form').reset();
        loadMenu();
    };
});

async function loadMenu() {
    const res = await fetch('php/menu/get_products.php');
    const result = await res.json();
    const tbody = document.getElementById('menu-body');
    tbody.innerHTML = result.data.map(p => {
        const imgPath = p.image ? `images/${p.image}` : '';
        const imageCell = p.image 
            ? `<img src="${imgPath}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">`
            : '<span style="color: #6b7280; font-style: italic;">Pas encore d\'image</span>';
        
        return `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.price} Ar</td>
                <td>${imageCell}</td>
                <td>
                    <button class="btn btn-primary" onclick="editProduct(${p.id})"><ion-icon name="create-outline" style="font-weight:bold;"></ion-icon></button>
                    <button class="btn btn-danger" onclick="deleteProduct(${p.id})"><ion-icon name="trash-outline" style="font-weight:bold;"></ion-icon></button>
                </td>
            </tr>
        `;
    }).join('');
}

async function editProduct(id) {
    const res = await fetch('php/menu/get_products.php');
    const result = await res.json();
    const p = result.data.find(product => product.id == id);
    if (!p) return;
    
    const modal = document.getElementById('product-modal');
    document.getElementById('product-id').value = p.id;
    document.getElementById('name').value = p.name;
    document.getElementById('description').value = p.description;
    document.getElementById('price').value = p.price;
    document.getElementById('category').value = p.category;
    document.getElementById('image-path').value = p.image || '';
    
    const img = document.getElementById('current-image');
    if (p.image) {
        img.src = 'images/' + p.image;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }
    
    modal.style.display = 'flex';
    document.getElementById('modal-title').innerText = 'Modifier le plat';
    document.getElementById('form-submit').innerText = 'Mettre à jour';
}

function deleteProduct(id) {
    showConfirm('Supprimer ce plat ?', () => {
        fetch('php/menu/delete_product.php', {
            method: 'POST',
            body: JSON.stringify({id})
        }).then(res => res.json()).then(res => {
            if(res.success) {
                showNotification('Plat supprimé', 'success');
                loadMenu();
            } else {
                showNotification('Erreur lors de la suppression', 'error');
            }
        });
    });
}