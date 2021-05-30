# Design Editor

React design editor using FabricJS. Create images in React, draw diagrams and arrange compositions using the image editor and save the result to one of several export formats, provides functionality similar to canva.com.

![Editor Preview](https://i.ibb.co/12S7x7n/Screenshot-select-area-20210528170059.png)

## Features

- [x] Add, remove, resize, reorder, clone, copy/paste objects
- [ ] Group/ungroup objects
- [ ] Object crop support
- [ ] Grid and snap to grid support
- [x] Zoom/pan canvas
- [x] Import and export to JSON or image
- [x] Context menu
- [ ] Animation support, with Fade / Bounce / Shake / Scaling / Rotation / Flash effects
- [x] Interation modes: selection, ctrl + drag grab
- [x] Undo/Redo support
- [x] Guidelines support
- [ ] Multiple pages support
- [ ] Presentation mode

## How to start

NodeJS required. Start in development mode using the following commands.

```sh
# install dependencies
yarn install
# start development server
yarn start
```

Web application service will start running at `localhost:3000`

## Integrations

In order to provide rich content, the following integrations are implemented.

### Iconscout

Illusatrions and icons provider. Add credentials to `.env` file.

```sh
ICONSCOUT_CLIENT_ID="your-client-id"
ICONSCOUT_SECRET="your-secret"
```

### Pixabay

Images provider. Add credentials to `.env` file.

```sh
REACT_APP_PIXABAY_KEY="your-key"
```

## Contribution

Feel free to contribute by opening issues with any questions, bug reports or feature requests. Or, you can buy me a coffee.

<p>
<a href="https://www.buymeacoffee.com/xorb" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important; border-radius: 0.5rem !important;" width="217" height="51"></a><br>
</p>

## Author

Created and maintained by Dany Boza ([@xorbmoon](https://twitter.com/xorbmoon)).

## License

[MIT](LICENSE)
