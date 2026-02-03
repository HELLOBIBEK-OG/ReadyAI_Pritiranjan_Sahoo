const fs = require("fs");
const { parse } = require("csv-parse");
const User = require("../models/User");
const userValidator = require("../validators/userValidator");

exports.uploadCSV = async (req, res) => {
  const results = [];
  const errors = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => {
      results.push(row);
    })
    .on("end", async () => {

      const validUsers = [];

      results.forEach((row, index) => {
        const { error } = userValidator.validate(row);

        if (error) {
          errors.push({
            row: index + 1,
            message: error.details[0].message
          });
        } else {
          validUsers.push(row);
        }
      });

      let insertedCount = 0;

      try {
        if (validUsers.length > 0) {
          const inserted = await User.insertMany(validUsers, { ordered: false });
          insertedCount = inserted.length;
        }
      } catch (err) {

        if (err.code === 11000 && err.writeErrors) {
          err.writeErrors.forEach((e) => {
            errors.push({
              row: e.index + 1,
              message: "Duplicate email: " + e.err.op.email
            });
          });

          insertedCount = validUsers.length - err.writeErrors.length;
        } else {
          console.error(err);
        }
      }

      res.json({
        inserted: insertedCount,
        errors
      });
    })
    .on("error", (err) => {
      console.error("CSV error:", err);
      res.status(500).json({ message: "CSV processing failed" });
    });
};
