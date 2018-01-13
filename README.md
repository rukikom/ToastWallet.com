# ToastWallet Website

### React, React-Router@next and Webpack 2.

Just run `npm install` and `npm run start`, then open up http://localhost:3000 to start developing.
To build the docker image do the following:

```
cd build/

//<TAG> should be replaced with the version you want to give the build e.g 0.2.0-dev
./build.sh <TAG>
```

This will build a docker image tagged as bpjackhopner/toastwallet-website:<TAG>

You can run it by using the following command:
`docker run -d -p 3000:80 bpjackhopner/toastwallet-website:<TAG>`

Then you will be able to access the website on http://localhost:3000

### Todo

- [ ] CSS Modules
- [ ] Server Side Rendering
- [ ] Webpack3
