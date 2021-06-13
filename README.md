# passport-vatsim

oauth2 middleware for [vatsim connect](https://github.com/vatsimnetwork/developer-info/wiki/Connect) using passport.js and express

example usage in [example](./example/app.ts)

installation:

* `npm install passport-vatsim`


```js
import vatsim from "passport-vatsim";

const config = { clientID, clientSecret, callbackURL, scope };

const handler = (accessToken, refreshToken, profile, callback) => {
  const user = db.findOrCreate({ id: profile.cid });
  return callback(null, user);
}

passport.use(vatsim(config, handler));
```

```js
app.get("/", passport.authenticate("vatsim"), (req, res) => ...)
```

### Typescript
You can also import the user profile type
```js
import vatsim, { Profile } from "passport-vatsim";
```