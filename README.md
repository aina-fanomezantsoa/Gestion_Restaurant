# 🍔 Resto-Admin : Guide d'Installation Magique

Salut ! Pour que ton application de gestion de restaurant fonctionne sur ton ordinateur, suis cette petite recette étape par étape.

---

### 1. La boîte à outils (XAMPP)
On a besoin d'un programme spécial pour faire marcher le site.
*   Installe **XAMPP** (cherche sur Google "XAMPP Windows" et installe-le).
*   Ouvre le programme **XAMPP Control Panel**.
*   Clique sur les boutons **"Start"** à côté de **Apache** et **MySQL**. Ils doivent devenir tout verts. C'est magique, ton ordinateur devient un serveur !

### 2. Mettre le projet au bon endroit
*   Va dans le dossier où tu as installé XAMPP (généralement `C:\xampp`).
*   Ouvre le dossier qui s'appelle `htdocs`.
*   Copie ton dossier `Gestion_Restaurant` dedans. C'est ici que le serveur va chercher ton site.

### 3. Préparer la "Base de Données"
C'est là qu'on garde tous les plats et les commandes.
*   Ouvre ton navigateur (Chrome, Firefox...).
*   Tape `http://localhost/phpmyadmin/` dans la barre d'adresse.
*   **Si c'est ta première fois :**
  *   Clique sur **"New"** à gauche
  *   Nom de la base : `restaurant_orders`
  *   Collation : `utf8mb4_unicode_ci`
  *   Clique sur **Create**
*   **Importer le fichier SQL :**
  *   Dans la liste à gauche, clique sur `restaurant_orders` pour sélectionner la base
  *   En haut de la page, clique sur le bouton **"Importer"**
  *   Clique sur **"Choisir de fichier"** et sélectionne `database/restaurant_orders.sql`
  *   Tout en bas, clique sur **"Exécuter"**. Bravo, la base de données est prête !
*   **Vérification :**
  *   Tu devrais voir 3 tables : `products`, `orders`, `order_items`
  *   Chaque table devrait contenir des données (3 plats, 1 commande, 2 articles de commande)

### 4. C'est parti !
Maintenant, pour voir ton application :
*   Tape cette adresse dans ton navigateur : `http://localhost/Gestion_Restaurant/index.html`

---

### 💡 Aide-mémoire si ça coince :
*   **Vérifie les feux verts :** Si Apache ou MySQL ne sont pas verts dans le panneau XAMPP, le site ne pourra pas s'afficher.
*   **Utilise "localhost" :** N'ouvre jamais ton projet en cliquant directement sur le fichier. Il faut **toujours** écrire `http://localhost/Gestion_Restaurant/...` dans la barre d'adresse pour que PHP fonctionne.

Amuse-toi bien avec ton nouveau logiciel de gestion ! 🍔🍕
