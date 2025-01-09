// Define Mongoose Schemas and Models
const serviceSchema = new mongoose.Schema({
  type: String,
  code: String,
  description: String,
  imgUrl: String,
  detail: Array
});
const Service = mongoose.model('Service', serviceSchema);

const requestSchema = new mongoose.Schema({
  mobile: Number,
  email: String,
  amt: Number,
  type: String,
  msg: String,
  code: String
});
const Request = mongoose.model('Request', requestSchema);

const memberSchema = new mongoose.Schema({
  mobile: Number,
  email: String,
  occupation: String,
  createpassword: String
});
const Member = mongoose.model('Member', memberSchema);
