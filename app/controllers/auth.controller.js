const db = require("../models");
const emailer = require("../services/email")
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  var mdp = req.body.email.substring(0, req.body.email.lastIndexOf("@")) +'2021'
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password || mdp, 8),
    name: req.body.name || req.body.email.substring(0,req.body.email.lastIndexOf("@")),
    lastName: req.body.lastName,
    companyName: req.body.companyName,
    tel1: req.body.tel1,
    tel2: req.body.tel2,
    tel3: req.body.tel3,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    brand: req.body.brand,
    model: req.body.model,
    years: req.body.years
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
           emailer().to(req.body.email).subject("ADSQUID").send("account", { password: mdp, email: req.body.email})
            res.send({ message: "User registered successfully!",user });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          emailer().to(req.body.email).subject("ADSQUID").send("account", { password: mdp, email: req.body.email})
          res.send({ message: "User registered successfully!",user });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.idUser,
          name: user.name,
          email: user.email,
          lastName: user.lastName,
          companyName: user.companyName,
          tel1: user.tel1,
          tel2: user.tel2,
          tel3: user.tel3,
          city: user.city,
          state: user.state,
          postcode: user.postcode,
          brand: user.brand,
          model: user.model,
          years: user.years,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const idUser = req.params.idUser;
  const userUpdate = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    lastName: req.body.lastName,
    companyName: req.body.companyName,
    tel1: req.body.tel1,
    tel2: req.body.tel2,
    tel3: req.body.tel3,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    brand: req.body.brand,
    model: req.body.model,
    years: req.body.years

  }
  
    User.update(userUpdate, {
      where: { idUser: idUser }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update user with id=${idUser}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + idUser
        });
      });
};
  
exports.findAll = (req, res) => {
    const idUser = req.query.idUser;
    var condition = idUser ? { idUser} : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user."
        });
      });
}


// Find a single User with an id
exports.findOne = (req, res) => {
    const idUser = req.params.idUser;
  
    User.findByPk(idUser)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + idUser
        });
      });
  };

