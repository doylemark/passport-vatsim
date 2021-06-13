import * as express from "express";
import * as passport from "passport";
import vatsim from "@vatsim/passport-vatsim";

/**
 * NOTE: It is imperative that you follow the **full** configuration instructions as described
 * in the passport.js docs: http://www.passportjs.org/docs/configure/
 *
 * This is NOT a production ready example, or anything close to it. It is just an example
 * usage of the passport-vatsim package
 */

const clientID = "177";
const clientSecret = "sZsrrKQcC6kYkMuwUxz88mlq2Q5U039bPjYT762H";
const scope = "full_name vatsim_details";
const callbackURL = "http://localhost:3000/callback";

const config = { clientID, clientSecret, callbackURL, scope };

passport.use(
  vatsim(
    config,
    (accessToken, refreshToken, profile, callback) => {
      // find or create user in database with profile info
      // example:
      // const user = db.findOrCreate({ id: profile.cid });
      // return callback(null, user);

      callback(null, profile);
    },
    true
  )
);

const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.cid));

passport.deserializeUser((id, done) => {
  // See passport.js sessions documentation
});

app.get("/", passport.authenticate("vatsim"), (req, res) => {
  res.json({ working: "yes :)" });
});

app.get("/callback", passport.authenticate("vatsim"), (req, res) => {
  res.json({ working: "yes :)" });
});

app.listen(3000, () => console.log("App running: http://localhost:3000"));
