let app;
const request = require('supertest');
const { connectDB, disconnectDB} = require('../../app/dbsetup')

let token = "";

let adminId = "";
let admin = {}

describe("should create an admin",  () => {
    beforeAll( async () => { await connectDB(); app = require('../../dist/__test__/appp' ); })
    afterAll( async () => { await disconnectDB(); if(app){app.close();}} );
    
    const userData = {

        "firstname": "Orange2 ",
        "lastname": "fruit ",
        "email": "ange2@decagonhq.com",
        "stack": "62ec4998a226d04d51c22eca",
        "squad": "11",
        "role": "Stack asssociate"
    }
    let authorId = "";
    const stackData = {
        "name": "node"
    }
    
    test(" '/superadmin/admin/create should create ", async () => {
      const res = await request(app).post("/superadmin/admin/create").send(userData);
      expect(res.status).toBe(201);
      adminId = JSON.parse(res.text).data._id;
      admin = JSON.parse(res.text).data;
      //console.log(adminId + " admin id")
    });
    
    test(" 'admin login should work; create token ", async () => {
      const res = await request(app).post("/admin/login").send(admin);
      expect(res.status).toBe(200);
      token = res.headers['set-cookie'];
    });
    
    
    test(" '/superadmin/admin/update should edit admin", async () => {
        let res = await request(app).put(`/superadmin/admin/update/${adminId}`).send(userData).set("Cookie", token);
        
        expect(res.status).toBe(200);
        adminId = JSON.parse(res.text).data._id;
        expect(JSON.parse(res.text).data.activationStatus).toBeTruthy();
        
    })

    test(" '/superadmin/admin/deactivate should set activationStatus to false' should output object with pagination", async () => {
      let res = await request(app).put(`/superadmin/admin/status/deactivate/${adminId}`).set("Cookie", token);
      expect(res.status).toBe(200);
    });

    test(" '/superadmin/admin/activate should set activationStatus to false' should output object with pagination", async () => {
      let res = await request(app).put(`/superadmin/admin/status/activate/${adminId}`).set("Cookie", token)
      expect(res.status).toBe(200);

      expect(JSON.parse(res.text).data.activationStatus).toBeTruthy();
    });

    test(" '/DELETE ADMIN ", async () => {
        const res = await request(app).delete(`/superadmin/admin/delete/${adminId}`).set("Cookie",token);
        expect(res.status).toBe(200);
        adminId = JSON.parse(res.text).data._id;
        //console.log(adminId + " admin id")
    });
})
