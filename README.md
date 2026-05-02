# virex-game-hud

 a material 3 expressive game overlay ui framework, and totally not a cheat ui. tailwind css, html, js. 
 built for injected overlays and standalone game ui. comes with a two-panel layout, dynamic theming, and a full set of controls out of the box.

---

## preview/s

> indev, will come later!

---

## concept features

- material expressive design language (m3, dark)
- two-panel layout: nav sidebar + scrollable content
- hugging corner style sidebar (sharp inner, rounded outer)
- component set: toggles, sliders, dropdowns, keybind inputs, number fields
- section titles and grouping with first/last border radius logic
- dynamic accent color theming via css custom properties
- scrollbar styled to match
- tailwind for layout and spacing, css vars for theming
- zero dependencies beyond tailwind cdn

---

## usage

inject it as an overlay. everything is self-contained.

```html
<link rel="stylesheet" href="hudstyling.css">
<script src="hud.js"></script>
```

then populate your nav tabs and content panels in `hud.js`. see `config.example.js` for structure.

---

## controls

| component | description |
|-----------|-------------|
| `Toggle` | on/off boolean kinda thing. |
| `Slider` | float range with min/max/step. |
| `Dropdown` | single select from list. |
| `Keybind` | records a key press. |
| `NumberInput` | integer/float with +/- buttons. |

---

## theming

all colors are css custom properties on `:root`. it is planned that you can swap them however you want.

nav tabs are hot-swappable at runtime via js. see `tabs.js`.

---

## planned / concepted structure

```
virex-game-hud/
├── index.html
├── hud.css
├── hud.js
├── tabs.js
├── controls/
│   ├── toggle.js
│   ├── slider.js
│   ├── dropdown.js
│   ├── keybind.js
│   └── number-input.js
└── config.example.js
```

---

## license

mit. do whatever, credit appreciated.
