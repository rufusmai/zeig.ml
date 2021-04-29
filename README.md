<p align="center"><a href="https://zeig.ml" target="_blank">
<img src="https://i.imgur.com/8z1VLAP.png">
</a></p>

# 🧷 zeig.ml `Url Shortener`

👉 [zeig.ml](https://zeig.ml)

zeig.ml is a tiny URL shortener. Generate short links and get some analytics about their usage.  
[More features](https://github.com/rufusmai/zeig.ml/projects/1) are planned!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  
It uses the [next static site generation](https://nextjs.org/docs/advanced-features/static-html-export) build target to run lightweight on [Firebase Hosting](https://firebase.google.com/docs/hosting).

The backend is written in Node.js using Typescript and deployed as [Firebase Cloud Functions](https://firebase.google.com/docs/functions).

## 💻 Development

First, run the development server:

```bash
yarn dev
```

Now you can edit all pages (`pages/`) and components (`components/`).  
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Learn more about Next.js in the [Next.js Documentation](https://nextjs.org/docs).

Start the firebase emulators to test the backend:
```bash
firebase emulators:start
# for functions file watching:
cd functions
yarn watch
```

You can edit all backend code in the `functions/src/` directory.  
Firebase Cloud Functions are registered in `index.js`.

Learn more about Firebase in the [Firebase Documentation](https://firebase.google.com/docs/build).
