const mongoose = require("mongoose");
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// _v -> version of the document
//data validation
//data sanitization - altering the data before saving it
