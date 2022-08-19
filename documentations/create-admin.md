# create-admin endpoints dcoumentation
POST /superadmin/admin/create
# input
{

        "firstname": String eg  "Orange2 ",
        "lastname": String - "fruit ",
        "email": String - Email of the admin with the official domain decagonhq.com "aonge2@decagonhq.com",

        "stack": String - mongo ObjectId string of the stack admin should be assigned to eg "62ec4998a226d04d51c22eca",
        
        "squad": String - string of number indicating the squad "11",
        "confirmPassword": "thanks",
        "phone": "07034667861",
        "role": "Stack asssociate"
}
