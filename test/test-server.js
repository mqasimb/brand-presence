var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Learn Smarter', function() {
    it('home page should return a valid response code', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    it('study sheet should return a valid response code', function(done) {
        chai.request(app)
            .get('/studysheet')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    it('study logs should return a valid response code', function(done) {
        chai.request(app)
            .get('/mylogs')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
        it('study sheet should return a valid response code', function(done) {
        chai.request(app)
            .get('/login')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    it('study logs should return a valid response code', function(done) {
        chai.request(app)
            .get('/register')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
        it('study sheet should return a valid response code', function(done) {
        chai.request(app)
            .get('/profile')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    it('new quiz should return a valid response code', function(done) {
        chai.request(app)
            .get('/newquiz')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});