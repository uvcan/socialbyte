const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{

    console.log('Inside node mailer ',comment);

    nodemailer.transporter.sendMail({
        from:"socialbyte6@gmail.com",
        to:comment.user.email,
        subject:"New comment published",
        html:'<h2>Yep your comment is now published</h2>'
    },(err,info)=>{
        if(err){console.log('error in Sending email',err);return;}
        console.log('Message info',info);
    });
}