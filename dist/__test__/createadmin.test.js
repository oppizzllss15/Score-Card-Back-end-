let app;
const request = require('supertest');
const { connectDB, disconnectDB} = require('../../app/dbsetup')


let adminId = "";
describe("should create an admin",  () => {
    beforeAll( async () => { await connectDB(); app = require('../appp' ); })
    afterAll( async () => { await disconnectDB(); if(app){app.close();}} );
    
    const userData = {
      firstname: "Orange Hales edited again",
      lastname: "ugonnna EDITED TOO plus ",
      email: "geaugona@decagon.dev",
      stack: "62ec4998a226d04d51c22eca",
      squad: "11",
      role: "Stack asssociate",
    };
    let authorId = "";
    const stackData = {
        "name": "node"
    }
    
    test(" '/admin/create should create ", async () => {
      const res = await request(app).post("/admin/create").send(userData);
      expect(res.status).toBe(200);
      adminId = JSON.parse(res.text).data._id;
      //console.log(adminId + " admin id")
    });
    
    
    test(" '/admin/update should edit admin", async () => {
        let res = await request(app).put(`/admin/update/${adminId}`).send(userData);
        res = await request(app).get(`/admin/${adminId}`);
        
        expect(res.status).toBe(200);
        adminId = JSON.parse(res.text).data._id;
        expect(JSON.parse(res.text).data.activationStatus).toBeFalsy();
        
    })

    test(" '/admin/deactivate should set activationStatus to false' should output object with pagination", async () => {
      let res = await request(app).put(`/admin/deactivate/${adminId}`);
      expect(res.status).toBe(200);
    });

    test(" '/admin/activate should set activationStatus to false' should output object with pagination", async () => {
      let res = await request(app).put(`/admin/activate/${adminId}`)
      res = await request(app).get(`/admin/${adminId}`);
      expect(res.status).toBe(200);

      expect(JSON.parse(res.text).data.activationStatus).toBeTruthy();
    });

    test(" '/DELETE ADMIN ", async () => {
        const res = await request(app).delete(`/admin/delete/${adminId}`);
        expect(res.status).toBe(200);
        adminId = JSON.parse(res.text).data._id;
        //console.log(adminId + " admin id")
    });
})
