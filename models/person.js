const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDb", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [5, `name must be at least 5 characters`],
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid number format 23*-1234567`,
    },
    required: [true, "number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
