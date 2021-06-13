# vatsim-passport

### oauth2 middleware for vatsim connect using passport.js and express

```js
app.get("/", passport.authenticate("vatsim"), (req, res) => ...)
```

* [vatsim-connect](https://github.com/vatsimnetwork/developer-info/wiki/Connect) implementation for passport.js
* example usage in [example](./example)
* comes packaged with typescript defintions for intellisense etc.

profile type:
`import { Profile } from "passport-vatsim"` 