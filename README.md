## Install

1. In your project, run `npm install --save-dev @markgarrigan/jenga`
1. In your project's `package.json` file, add a scripts key

```
"scripts": {
  "build:html": "jenga"
},
```

## Usage

By default jenga looks for your precompiled html files in a directory called `src`. The files can be nested at any depth within that directory.

```
+-- package.json
+-- src
|   +-- _special.html
|   +-- index.html
|   +-- shared
    |   +-- _header.html
    |   +-- _footer.html
```

To include one html file into another use a comment tag with this format `<!--include path/to/file.html-->`. Where `path/to` is the directory inside your `src` directory. If the file is not nested just use the filename.

#### index.html
```
<!--include shared/_header.html-->

<h2>Index Page</h2>

<!--include _special.html-->

<p>More Content</p>

<!--include shared/_footer.html-->
```

#### _special.html
```
<h3>I have special content.</h3>
```

#### shared/_header.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
```

#### shared/_footer.html
```
  </body>
</html>
```

### From the command line run
```
npm build:html
```

By default jenga will build html files to a directory called `dist`.

#### dist/index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>


<h2>Index Page</h2>

<h3>I have special content.</h3>


<p>More Content</p>

  </body>
</html>
```

### Options

```
jenga [options]
```

#### -r, --root (optional, default = false)

If set, files in this directory will be placed at the root of the dist directory.

#### -s, --source (optional, default = "src")

Set the source directory for your html files.

#### -d, --dest (optional, default = "dist")

Set the destination directory for your html files.

#### -h, --help

Show help.

## Coming Soon

#### Nested includes

```
# src/shared/_nav.html

<a href="#">Home</a>
<a href="#">About</a>
<a href="#">Blog</a>

<!--include shared/_search.html-->
```
