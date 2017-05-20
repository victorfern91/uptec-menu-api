# uptec-menu-api
A simple server which parses the weekly menu from UPTEC Tech Bar and exposes that information using a REST API. This server could be used as webhook for slack bots, etc, etc. Feel free to contribute to this project.

### API methods
- `/menu/`, returns all week menu
![week example](http://i.imgur.com/4LCTiI5.png)
- `/menu/:day`, returns the menu for a selected day (could use `today`)
![day menu](http://i.imgur.com/XZfe7vb.png)

### Requirements

- `wget` installed

### Install
```
npm install
```

### Run
```
npm start
```
