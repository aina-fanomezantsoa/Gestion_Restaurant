function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container') || (() => {
        const div = document.createElement('div');
        div.id = 'notification-container';
        document.body.appendChild(div);
        return div;
    })();

    const note = document.createElement('div');
    note.className = `notification ${type}`;
    note.innerHTML = `
        <ion-icon name="${type === 'success' ? 'checkmark-circle' : 'alert-circle'}"></ion-icon>
        <span style="margin-left: 10px;">${message}</span>
    `;
    
    container.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

function showConfirm(message, onConfirm) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:10000;';
    modal.innerHTML = `
        <div style="background:white; padding:20px; border-radius:8px; width:300px; text-align:center;">
            <p style="margin-bottom:20px;">${message}</p>
            <button id="conf-yes" style="padding:8px 16px; margin:5px; background:#FF6B35; color:white; border:none; border-radius:4px; cursor:pointer;">Oui</button>
            <button id="conf-no" style="padding:8px 16px; margin:5px; background:#ccc; border:none; border-radius:4px; cursor:pointer;">Non</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('conf-yes').onclick = () => { onConfirm(); modal.remove(); };
    document.getElementById('conf-no').onclick = () => modal.remove();
}
