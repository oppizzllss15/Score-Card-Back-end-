// let app;
// const request = require('supertest');
// const { connectDB, disconnectDB} = require('../../app/dbsetup')

// let token = "";

// let userId = "";
// let admin = {}

// describe("should create an admin",  () => {
//     beforeAll( async () => { await connectDB(); app = require('../../dist/__test__/appp' ); })
//     afterAll( async () => { await disconnectDB(); if(app){app.close();}} );
    
    
//     const superadmin = {

//         "firstname": "Orange2 ",
//         "lastname": "fruit ",
//         "email": "aonge2@decagonhq.com",
//         "stack": "62ec4998a226d04d51c22eca",
//         "password": "thanks",
//         "squad": "11",
//         "confirmPassword": "thanks",
//         "phone": "07034667861",
//         "role": "Stack asssociate"
//     }

//     const userData = {

//         "firstname": "Orange2 ",
//         "lastname": "fruit ",
//         "email": "ange2@decagonhq.com",
//         "stack": "62ec4998a226d04d51c22eca",
//         "squad": "11"
//     }
    
    
    
//     test(" 'create superadmin should create ", async () => {
//       const res = await request(app).post("/superadmin/create").send(superadmin);
//       expect(res.status).toBe(201);
//       token = res.headers["set-cookie"];
//       //console.log(userId + " admin id")
//     });
    
//     test(" 'superadmin login should work; create token ", async () => {
//       const res = await request(app).post("/superadmin/login").send(superadmin);
//       expect(res.status).toBe(201);
//       token = res.headers['set-cookie'];
//     });

//     test(" '/superadmin/user/create should create ", async () => {
//       const res = await request(app).post("/superadmin/user/create").send(userData).set("Cookie", token);
//       expect(res.status).toBe(201);
//       console.log(res.text + " the body")
//       userId = JSON.parse(res.text).user._id;
//     });
    
//     test(" 'get user cummulative should work", async () => {
//         let res = await request(app).put(`/users/cummulatives/${userId}`).send(adminData).set("Cookie", token);
        
//         expect(res.status).toBe(200);
//         userId = JSON.parse(res.text).data._id;
//         expect(JSON.parse(res.text).data.activationStatus).toBeTruthy();
        
//     })


// })
