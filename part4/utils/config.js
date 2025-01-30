require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bloglist'
const MONGODB_DBNAME = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_DBNAME : process.env.MONGODB_DBNAME

module.exports = {PORT, MONGODB_URI, MONGODB_DBNAME}
