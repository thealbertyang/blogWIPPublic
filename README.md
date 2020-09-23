# Blog WIP Code

Hi, this is my latest version of programming style of my WIP Blog with Next.js, and Contentful. It is a JAMstack.

Althought a work in progress, it is the latest way I write and organize my code, utilizing GraphQL, Styled Components, atomic components, and services.

If you have any questions feel free to email: [thealbertyang@gmail.com](mailto:thealbertyang@gmail)

## Getting Started

To run the development server:

```
yarn run dev
```

## Technologies Used
- GraphQL
- Contentful API (JAMSstack)
- Next.js
- React
    - Formik
    - Styled Components
    - CSS3 Grids
    - Material UI

## GraphQL

### Apollo Client 
I setup GraphQL with Apollo Client under [services/apollo/client.js](services/apollo/client.js), which is instantiated in [pages/_app.js](pages/_app.js) with a provider wrapped around the main application.

### Queries
Under the Posts component [features/blog/posts.jsx](features/blog/posts.jsx), I fetch from the blog collections from Contentful.

Under the Post component [features/blog/posts.jsx](features/blog/post.jsx), I fetch the posts with slug passed from the [page](pages\post\[slug].js) itself.

## Contentful API (JAMstack)

Although Contentful provides it's own API to process their Rich Text, this project was was a way to expand my knowledge on working with processing Rich Text on my own.

I wrote my own [Rich Text parser](services\contentful\parser.js) for Contentful.

### parseBody function

A recursive function that wraps the appropiate HTML (eg. H1) around the block of content. It will call itself if the children contains more HTML, otherwise if it's text, then it will format based on marks such as italic, bold etc.. 

Lastly if 'plainText' is a paramter of format. Then this function will only output plainText.

### other functions

There's another function to parseMarks, which basically accumulates all of the marks and applies them to the text.

The others are maps for HTML and marks.

## Next.js and React

The frontend of this app is built with Next.js. Styling is with Styled Components. Components and pages are written with React. Layouts use the the latest CSS3 grid to compose views. Lastly forms use Formik.

### Pages

Next.js uses a dynamic approach to routing and files which map directly to each other. Reason for this is because it's easier to locate files when working with an app, and there is no need to write logic for routing. This solves the disorganization with React Router when a codebase gets large and files are not mapped 1:1 to the route confusing developers. Any files that does use a directory as a parameter (eg. /portfolio/[slug]/) will automatically contain the variable "slug" within the code of the page, which can be accessed like so:

`
    const router = useRouter()
    const { slug } = router.query
`

way simplier than writing routes for each file with React Router.

### Components

This is my latest approach to organization of files in React.

Components are atomic components, split into 
    - dataEntry
    - general
    - providers
    - dataDisplay (not listed)
    - typography (not listed)

and Features
    - uses components or other features to build a working feature (eg. Post)

This is a pattern that I prefer after building multiple React applications because it separates the concerns of use and is composition based, so atomic components do not know of states outside of itself only higher files that implement them.

### Layouts

Layouts are using the latest CSS3 grid to compose views.


### Login
There is a [login page](forms\Login.jsx) that is not in use atm but a WIP that uses formik to handle forms and Material UI for the input fields. 
