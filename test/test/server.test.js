const request = require('supertest');
const app = require("../../apiv2/server").app;

it("Should receive a Code 200 for Appointments", (done) => {
    request(app)
        .get("/appointments?user=1")
        .expect(200)
        .end(done);
});

it("Should receive a JSON-Response for Appointments", (done) => {
    request(app)
        .get("/appointments?user=1")
        .expect("Content-Type", /json/)
        .end(done);
});

it("Should return Code 401 unautorized for User eschroeder with wrong password", (done) => {
    request(app)
        .post("/login")
        .send({username: "eschroeder", password: "d41d8cd98f00b204e9800998ecf8427e"})
        .set("Accept", "application/json")
        .expect(401)
        .end((err, res) => {
            if(err) return done(err);
            done();
        });
});