const User = require("../modules/user");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
exports.postLogIn = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) return res.status(400).json({ msg: "login unsuccessfully" });

      User.findOne({ password: req.body.password }).then((password) => {
        if (!password)
          return res.status(400).json({ msg: "login unsuccessfully" });

        const token = jwt.sign(
          { email: req.body.email, userId: user._id.toString() },
          "key",
          { expiresIn: "1h" }
        );
        res.status(201).json({ token: token, msg: "login successfully" });
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "login unsuccessfully" });
      console.log(err);
    });
};

exports.postSignUp = async (req, res, next) => {
  User.create({ email: req.body.email, password: req.body.password }).then(user => {
  
    res.status(201).json({ msg: " created successfully" });

    
   })
   .catch(err => {
    res.status(500).json({ msg: " server error" });

  console.log(err);
   });
};


// forget password not completed yet 
exports.postReset = (req, res, next) => {
    const email = req.body.email;
  
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
  
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            message = "no such email ";
            return res.redirect("/reset");
          }
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 360000;
          return user.save();
        })
        .then(() => {
          const msg = {
            to: email, // Change to your recipient
            from: "ahmeddbah653@gmail.com", // Change to your verified sender
            subject: "your reset link ",
            html: `<h1>click on the link to resert your password</h1>
                    <a href='http://localhost:3000/reset/${token}'>reset link </a>
            `,
          };
          sgMail
            .send(msg)
            .then(() => {
              message = "we have sent you a email ";
              res.redirect("/reset");
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };


  