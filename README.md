# 𝚃 𝙷 𝙴 𝙶 𝚁 𝙴 𝙰 𝚃 𝚆 𝙰 𝚅 𝙴

[demo](https://r1vn.github.io/the_great_wave)  

medium complexity gallery+blog website built with [tsk](https://github.com/r1vn/tsk)  

## API

(e.g. `node tsk build`)

- `build` - fully rebuilds the site
- `bundle` - rebuilds the frontend only
- `minify` - minifies JS/CSS/HTML
- `serve` - runs local file server

## content management

### gallery

- gallery entries are located in `source/gallery`, one subdirectory per entry
- source file must be named `index.md` and the image must be named `original.jpg`
- must contain a data parseable by `Date` constructor and a title. title will be deduced from h1 if not set explicitly in the data block

```
source/gallery/irure-velit-nulla/index.md
source/gallery/irure-velit-nulla/original.jpg
```

`source/gallery/irure-velit-nulla/index.md`

```
---
date: 2020-06-22 08.59
title: irure velit nulla
---
nibh sint ipsum a aliquet pellentesque feugiat donec elit nunc ullamco fermentum elit dictum ac 
sunt aliquip sem in nullam arcu nisi scelerisque eget sit donec fugiat in
```

### blog

- located in `source/blog`, one subdirectory per entry
- source file must be named `index.md`
- must contain a data parseable by `Date` constructor and a title. title will be deduced from h1 if not set explicitly in the data block

`source/blog/foo-bar/index.md`

```
---
date: 2020-06-22 09.03
title: foo bar
---
dolor odio fermentum irure sit commodo consequat magna pellentesque sem erat eiusmod irure aenean pharetra 
laboris dictumst aliquip cupidatat duis magna dictum reprehenderit elit orci odio eu nec eu quis
```

### static pages

- located in the root of `source`, one subdirectory per entry
- entries are only required to have a title. title will deduced from h1 if not set explicitly in the data block