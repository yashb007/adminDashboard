const sequelize = require("sequelize");
const Category = require("./model");
const Config = require("../enviornment/index");
const Media = require("../media/model");
const Language = require("../Language/model");

exports.getCategoryById = (req, res, next, id) => {
  try {
    Category.findOne({
      where: {
        id: id,
      },
    }).then((category) => {
      if (!category) {
        return res.status(400).json({
          error: "No Category found in db",
        });
      }
      req.profile = category;

      next();
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: false, error: err });
  }
};

exports.add = (req, res) => {
  try {
    const _b = req.body;
    Category.create({
      name: _b.name,
      LanguageId: _b.LanguageId,
      ParentId: _b.ParentId,
      MediaId: _b.MediaId,
    })
      .then((u) => {
        res.status(200).json({ status: true, data: u });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ status: false, error: err });
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: false, error: err });
  }
};

exports.edit = (req, res) => {
  try {
    const _b = req.body;
    Category.update({
      name: _b.name,
      LanguageId: _b.LanguageId,
      ParentId: _b.ParentId,
      MediaId: _b.MediaId,
    })
      .then((u) => {
        res.status(200).json({ status: true });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ status: false, error: err });
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: false, error: err });
  }
};

exports.delete = (req, res) => {
  const _b = req.body;
  try {
    Category.destroy({
      where: {
        name: req.profile.name,
      },
    })
      .then((u) => {
        res.status(200).json({ status: true });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ status: false, error: err });
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: false, error: err });
  }
};

exports.get = async (req, res) => {
  const _b = req.body;
  try {
    const opts = { where: {}, attributes: {} };
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword)
      opts.where.name = { [sequelize.Op.like]: `%${_b.keyword}%` };

    let u = await Category.findAll(opts);
    if (!u) {
      res.status(400).json({
        status: false,
        message: "Category not found",
      });
    } else {
      for (let i = 0; i < u.length; i++) {
        let a = u[i];
        if (a.dataValues !== null) {
          let data = await Category.findOne({
            where: { id: a.dataValues.ParentId },
          });
          if (data) {
            a.dataValues.parent = data;
          }
        }
      }

      res.status(200).json({
        status: true,
        data: u,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: false, error: err });
  }
};

exports.updateStatus = (req, res) => {
  Category.update(
    {
      Status: !req.profile.Status,
    },
    {
      where: {
        name: req.profile.name,
      },
    }
  )
    .then((u) => {
      res.status(200).json({ status: true, data: u });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ status: false, error: err });
    });
};
