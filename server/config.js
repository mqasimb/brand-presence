exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/smarter-student' :
                            'mongodb://localhost/smarter-student-dev');
exports.PORT = process.env.PORT || 8080;

exports.jwtSecret = 'verysecretkeyjwt';