# basique-electron-ipcMain
basique application electron de communication entre les processus main et rendu

Cette Application basique permet de mieux comprendre les processus icpMain et ipcRenderer dans electron.

## Installation depuis github

```terminal
git clone https://github.com/albanmartel/basique-electron-ipcMain.git
```
## Installer modules manquants

```terminal
node install
```

## Important

Depuis la dernière version pour que ipc fonctionne il faut ajouter

```terminal
new BrowserWindow({webPreferences: {nodeIntegration: true}})
```


## Démarrer application

```terminal
node main.js
```
ou

Pour démarrer le programme
dans un terminal :
```terminal
$ npm start
```
