# 🍔 Resto-Admin : Installation sous Ubuntu

Guide pour installer et configurer le projet sur un ordinateur Ubuntu.

---

## 1. Cloner le projet via Git

Ouvre un terminal et exécute :

```bash
git clone https://github.com/votre-username/Gestion_Restaurant.git
cd Gestion_Restaurant
```

---

## 2. Installer le stack serveur (LAMP)

L'application a besoin d'Apache, de MySQL/MariaDB et de PHP. Sur Ubuntu, le moyen le plus simple est d'installer **tasksel** ou les paquets manuellement :

```bash
sudo apt update
sudo apt install tasksel
sudo tasksel install lamp
```

*   **tasksel install lamp** installe Apache, MySQL (MariaDB) et PHP.
*   Lors de l'installation, un mot de passe root pour MySQL vous sera demandé. Notez-le.

---

## 3. Configurer la base de données

### 3.1 Démarrer les services

```bash
sudo systemctl start apache2
sudo systemctl start mysql
```

Pour qu'ils démarrent au boot :

```bash
sudo systemctl enable apache2
sudo systemctl enable mysql
```

### 3.2 Créer la base de données et importer le fichier SQL

Méthode A — Via le terminal MySQL :

```bash
sudo mysql -u root -p

CREATE DATABASE restaurant_orders CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE restaurant_orders;
SOURCE /chemin/vers/Gestion_Restaurant/database/restaurant_orders.sql;
EXIT;
```

Méthode B — Via l'interface graphique phpMyAdmin :

1. Ouvre un navigateur à l'adresse `http://localhost/phpmyadmin`
2. Clique sur **New** à gauche, nomme la base `restaurant_orders`, collation `utf8mb4_unicode_ci`, valide avec **Create**.
3. Sélectionne la base `restaurant_orders` dans la liste.
4. En haut de page, clique sur **Importer**.
5. Clique sur **Choisir de fichier** et sélectionne `database/restaurant_orders.sql`.
6. En bas, clique sur **Exécuter**.

---

## 4. Configurer la connexion PHP

Le fichier `php/config/database.php` utilise par défaut `root` sans mot de passe. Si tu as mis un mot de passe lors de l'installation de MySQL, édite ce fichier :

```bash
nano php/config/database.php
```

Modifie la ligne `$pass = ''` par ton mot de passe MySQL :

```php
$pass = 'ton_mot_de_passe';
```

Appuie sur `Ctrl+O`, `Entrée` pour sauvegarder, puis `Ctrl+X` pour quitter.

---

## 5. Lancer le serveur et voir le résultat

Démarre Apache si ce n'est pas déjà fait :

```bash
sudo systemctl start apache2
```

Ouvre un navigateur et va à l'adresse :

```
http://localhost/Gestion_Restaurant/index.html
```

Tu devrais voir l'interface de gestion du restaurant.

---

## 🛠️ Dépannage des erreurs courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| **`mysql: command not found`** | MariaDB n'est pas installée | Installe-la : `sudo apt install mariadb-server` |
| **`Connection refused`** | Apache ne tourne pas | `sudo systemctl start apache2` |
| **Access denied for user 'root'@'localhost'** | Mot de passe root MySQL incorrect | Dans `php/config/database.php`, mets le bon mot de passe dans `$pass` |
| **Erreur import SQL : "Unknown collation: 'utf8mb4_unicode_ci'"** | Version de MySQL ancienne | Utilise `utf8_general_ci` à la place dans le fichier SQL ou mets à jour MySQL |
| **Page blanche ou erreur 500** | Erreur PHP/MySQL | Vérifie le fichier `php/config/database.php` et les droits d'accès |
| **phpMyAdmin introuvable** | Paquet manquant | `sudo apt install phpmyadmin` (choisis Apache quand on te le demande) |

---

## 💡 Aide-mémoire

*   Pour redémarrer Apache après un changement : `sudo systemctl restart apache2`
*   Pour voir les logs Apache : `sudo tail -f /var/log/apache2/access.log`
*   Pour te connecter en ligne de commande MySQL : `sudo mysql -u root -p`
*   L'application attend les fichiers HTML dans `Gestion_Restaurant/` servis par Apache à l'URL `http://localhost/Gestion_Restaurant/`

Amuse-toi bien avec ton logiciel de gestion de restaurant ! 🍕🍕