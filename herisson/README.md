# Descriptif du projet

Porteur de projet : Sud OUEST

Sujet : Hérisson

Nom d'équipe : Hapik

Participants : 

- AGR : Yuna LEON, Maëva HEMONT

- EPJT : Jane Coville

- Polytech : Marten SCHUITEMAKER, Lucas TRAPON, Louis HURTUBISE, Evan ACQUAIRE, Valentin MIGNOT

# Lancement


### Il faut avoir pm2 d'installé
`npm install pm2 -g`

### installer les modules

dans la racine et le dossier herisson
`npm install`

### Lancer le serveur
dans la racine : 
`pm2 start server.js --name herisson`

### Lancer le client

aller sur http://127.0.0.1:8080/herisson/


# Commandes utiles

* `pm2 status ou pm2 status herisson` : affiche l'état de tous les processus lancés ou
seulement de monApp
* `pm2 stop herisson` : arrête le processus nommée monApp <br>
`pm2 restart monApp` : relance le processus nommée monApp (après mise à jour de son
code par exemple)
* `pm2 save` : sauvegarde la liste des processus en cours pour qu'ils puissent être relancés
avec `pm2 resurrect` et qu'ils soient redémarrés automatiquement en cas de reboot du
serveur (ça arrive...)
* `pm2 logs` ou `pm2 logs herisson` : affiche tous les logs ou seulement ceux d'un processus
* `pm2 delete herisson` : stop monApp et le supprime de la liste des processus