const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "socialbyte6@gmail.com",
      pass: "SocialByteDevelopment",
    }
  });


let renderTemplate=(data , relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function (err,template) {
            if(err){console.log('error in rendering the template',err);}
                mailHTML=template;
        }
    )

    return mailHTML;
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}