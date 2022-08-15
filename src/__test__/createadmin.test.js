let app;
const request = require('supertest');
const { connectDB, disconnectDB} = require('../../app/dbsetup')

let token = "";

let adminId = "";
let userId = '';
let admin = {}

describe("should create an admin",  () => {
    beforeAll( async () => { await connectDB(); app = require('../../dist/__test__/appp' ); })
    afterAll( async () => { await disconnectDB(); if(app){app.close();}} );
    
    
    const superadmin = {

        "firstname": "Orange2 ",
        "lastname": "fruit ",
        "email": "aonge2@decagonhq.com",
        "stack": "62ec4998a226d04d51c22eca",
        "password": "thanks",
        "squad": "11",
        "confirmPassword": "thanks",
        "phone": "07034667861",
        "role": "Stack asssociate"
    }

    const adminData = {

        "firstname": "Orange2 ",
        "lastname": "fruit ",
        "email": "ange2@decagonhq.com",
        "stack": "62ec4998a226d04d51c22eca",
        "squad": "11",
        "role": "Stack asssociate"
    }

    const userData = {

        "firstname": "Orange2 ",
        "lastname": "fruit ",
        "email": "ange2@decagonhq.com",
        "stack": "62ec4998a226d04d51c22eca",
        "squad": "11"
    }
    
    let authorId = "";
    
    
    test(" 'create superadmin should create ", async () => {
      const res = await request(app).post("/superadmin/create").send(superadmin);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("_id");
      token = res.headers["set-cookie"];
      //console.log(adminId + " admin id")
    });
    
    test(" 'superadmin login should work; create token ", async () => {
      const res = await request(app).post("/superadmin/login").send(superadmin);
      expect(res.status).toBe(201);
      expect(res.headers['set-cookie']).toBeTruthy();
      token = res.headers['set-cookie'];
    });

    test(" '/superadmin/admin/create should create ", async () => {
      const res = await request(app).post("/superadmin/admin/create").send(adminData).set("Cookie", token);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("_id");  
      adminId = JSON.parse(res.text).data._id;
    });
    
    test(" '/superadmin/admin/update should edit admin", async () => {
        let res = await request(app).put(`/superadmin/admin/update/${adminId}`).send(adminData).set("Cookie", token);
        
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
