let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const userSchema = require("../models/userSchema");
let userRoutes = require("../routes/userRoutes");
const randomEmail = require("random-email");


chai.should();
chai.use(chaiHttp);

// describe("Task API", () => {
//     describe("POST/ api/users", () => {
//         //To test the user valid data
//         it("It should return login user details:", (done) => {
//             const data = {
//                 userEmail: "cricheros123456@gmail.com",
//                 userPassword: "Aliasger123@"
//             };
//             chai
//                 .request(server)
//                 .post("/user/login")
//                 .send(data)
//                 .end((err, res) => {
//                     res.should.have.status(201);
//                     res.should.be.a("object");
//                     res.body.should.have.property("success").eq(true);
//                     res.body.should.have.property("message").eq("Login successfully");
//                     res.body.should.have.property("token");
//                 });
//             done();
//         });
//         //To test invalid user if password is incorrect
//         it("It should return login error message:", (done) => {
//             const data = {
//                 userEmail: "cricheros123456@gmail.com",
//                 userPassword: "Aliasger12@"
//             };
//             chai
//                 .request(server)
//                 .post("/user/login")
//                 .send(data)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                     res.should.be.a("object");
//                     res.body.should.have.property("success").eq(false);
//                     res.body.should.have.property("message").eq("Invalid user email or password");
//                 });
//             done();
//         });
//         //To test invalid user if email and password is incorrect
//         it("It should return login error message:", (done) => {
//             const data = {
//                 userEmail: "cricheros1234@gmail.com",
//                 userPassword: "Aliasger13@"
//             };
//             chai
//                 .request(server)
//                 .post("/user/login")
//                 .send(data)
//                 .end((err, res) => {
//                     res.should.have.status(403);
//                     res.should.be.a("object");
//                     res.body.should.have.property("success").eq(false);
//                     res.body.should.have.property("message").eq("User is not registered with this email");
//                 });
//             done();
//         });
//     })
// })

//Create user  Cases
 describe("POST /api/users", () => {
//     it("It should show new user added", (done) => {
//         const user = {
//             userName: "Anjali",
//             userEmail: randomEmail(),
//             userPassword: "Anjali123@",
//             userPhoneNo: "7005462305",
//             userCity: "Indore",
//             userState: "M.P",
//         };
//         chai
//             .request(server)
//             .post("/user/create")
//             .set("Content-Type", "application/x-www-form-urlencoded")
//             .field(user)
//             .attach("profilePic", "C:/Users/my/Pictures/Saved Pictures/image1.jpg")
//             .end((err, res) => {
//                 res.should.have.status(200)
//                 res.should.be.a("object")
//                 res.body.should.have.property("success").eq(true)
//                 res.body.should.have.property("message").eq("User successfully registered")
//             });
//         done();
//     });
    //User already exists
    it("It should show that user already exists", (done) => {
        const user = {
            userName: "Anjali",
            userEmail: "cricheros123456@gmail.com",
            userPassword: "Anjali123@",
            userPhoneNo: "7005462305",
            userCity: "Indore",
            userState: "M.P",
        };
        chai
            .request(server)
            .post("/user/create")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field(user)
            .attach("profilePic", "C:/Users/my/Pictures/Saved Pictures/image1.jpg")
            .end((err, res) => {
                res.should.have.status(401)
                res.should.be.a("object")
                res.body.should.have.property("success").eq(false)
                res.body.should.have.property("message").eq("User is already registered with this email")
        });
      done();
    });
});