# <img alt="Nwote_logo" src="https://github.com/Nergel3/Nwote/raw/master/resources/nwote.png" width="25"> | [Nwotable](https://nwotable.herokuapp.com) [![Language grade: JS/TS](https://img.shields.io/lgtm/grade/javascript/g/Nergel3/Nwote.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Nergel3/Nwote/context:javascript)

#### Introduction
Nwote is a **PWA** to write markdown (Github Flavored). It currently only support desktop browser but I'm working to make it work on mobile too.
The design is strongly inspired by the [app](https://github.com/notable/notable) of [Fabio Spampinato](https://github.com/fabiospampinato) and if you are looking for a desktop markdown editor you should take a look at his work.

Nwote v1.0.0 is build with the following awesome technologies :
* Progressive Web App
* [Vue.js](https://vuejs.org/) with [Quasar Framework](https://quasar.dev/) and [Vuex](https://vuex.vuejs.org/)
* [CodeMirror](https://codemirror.net/index.html) for the editor (mobile support)
* [Showdown](https://github.com/showdownjs/showdown) to parse the markdown.
* [IndexedDb API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
* [Webpack](https://webpack.js.org/)


### Features
Supported features :
* **Markdown** editor (Github Flavored) // 1.0.0
* **Indefinitely** nestable tags // 1.0.0
* **export** or download as : 
	* **HTML** // 1.0.0
	* **Markdown** // 1.0.0
* Filter by :
	* **Tag** // 1.0.0
	* **Search** // 1.0.0
	* **Favorite** // 1.0.0
* **Import local attachment** (**images only** *.jpg, .ext, .png*) // 1.0.0
* Metadata header // 1.0.0

### Release
Check at : https://nwotable.herokuapp.com/app/
![app picture](https://github.com/Nergel3/Nwote/raw/master/resources/banner.png)

### :ballot_box_with_check: TODO
The app is still in development so some features may not work.

Missing features :
* **Mobile** support
* **Fuzzy** search
* Auto delete unused attachment at the starting of the app.
* **Rename** imported attachment
* Live preview (**split mode**).
* Export as a **PDF**
* **Dark Themes**
* Google Drive & Dropbox support (**cloud support**)
* Code syntax highlighting (rendered markdown, **no showdow-highlight**)

![app picture](https://github.com/Nergel3/Nwote/raw/master/resources/banner2.png)

### :stars: Show Your Support
Please give a :star: if this project helped you!

### Contributing
If you want to contribute to Nwote to add a feature or improve the code contact me at [alexnegrel13@gmail.com](mailto:alexnegrel13@gmail.com), open an [issue](https://github.com/Nergel3/Nwote/issues) or make a [pull request](https://github.com/Nergel3/Nwote/pulls).

#### Set up the dev env.
Clone this repositorie :
```bash
git clone https://github.com/Nergel3/Nwote.git
```

Install the dependencies :
```bash
cd Nwote
npm install
```

Start the dev server (with hot reload) :
```bash
npm run dev:pwa
```

Build the app for production :
```bash
npm run build:pwa
```

#### :scroll: License
AGPL-v3 © Alexandre Negrel
