const uuid = require('uuid');

const bcrypt=require('bcryptjs');

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;


var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const User = require('../models/User');
const Forgotpassword = require('../models/forgotpassword');
const { ValidationError } = require('sequelize');


const forgotpassword = async (req, res) => {
    console.log("in forgot password");
   
        console.log('req.body');
        console.log(req.body);
        const email  =  req.body.data;
        console.log('email');
        console.log(email);
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(error => {
                    throw new Error(error)
                })
                const tranEmailApi=new SibApiV3Sdk.TransactionalEmailsApi()
                var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
                sendSmtpEmail={ sender:{ "email":"intelligentanita18@gmail.com"}, 
                   to: [
                    {
                      email: email,
                      name: "Anita",
                    },
                  ],
                    subject:"Sending with sendinBlue is Fun",
                    "htmlContent": `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
                    
                    
                }// SendSmtpEmail | Values to send a transactional email
               
               tranEmailApi.sendTransacEmail(sendSmtpEmail).then(response=> {
                 console.log('API called successfully. Returned data: ' + response);
                 res.status(202).json({message:"API called successfully",data:response});
               }).catch(error=> {
                 console.error(error);
               });
}
}

const resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        console.log('forgotpasswordrequest');
        console.log(forgotpasswordrequest);
        if(forgotpasswordrequest.active){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
        else{            res.status(200).send(`<html><h3>link deactivated </h3><a href="http://127.0.0.1:5500/views/login/login.html">click here</a></html>`)

        }
    
    })
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        console.log('req.query');
        console.log(req.query);
        const resetpasswordid  = req.params.id;
        console.log('req.params');
        console.log(req.params);
        console.log('resetpasswordid');
        console.log(resetpasswordid)
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            console.log('resetpasswordrequest');
            console.log(resetpasswordrequest);
            User.findOne({where: { id : resetpasswordrequest.UserDetailId}}).then(user => {
                console.log('userDetails', user);
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            // @ts-ignore
                            throw new Error(err);
                        }
                        // @ts-ignore
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            // @ts-ignore
                            if(err){
                                // @ts-ignore
                                console.log(err);
                                // @ts-ignore
                                throw new Error(err);
                            }
                            user.update({ Password: hash }).then(() => {
                                console.log("in update password");
                                console.log(hash);
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}
