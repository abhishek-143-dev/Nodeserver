const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'selfalert61@gmail.com',
            pass: 'zshy osqm fnjo lfed'
    }
  });


class Mail{
    constructor(){
        this.nodemailer = nodemailer;
        this.transporter = transporter;
    }


    async Sendmail(Subject,To,Body,Attachment){
        try {
            const mailOptions = {
                from: 'selfalert61@gmail.com',
                to: To,
                subject: Subject,
                html: Body,
                attachments: Attachment
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if(err){
                   console.log(err)
                  res.status(400).json({
                    msg : `failed  ${err}`,
                    err:err
                });
                }
                    
                else{
                   console.log(info);
                  res.status(200).json({
                    msg : `Mail sended`,
                    info:info
                });
                }
                   
            });

    }catch(error){
        console.log(error); 

    }
}

}

module.exports=Mail;