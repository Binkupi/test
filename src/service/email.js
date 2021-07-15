const nodemailer = require('nodemailer')

module.exports = function sendMail(toMail,header,ma_bill){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "smtp.ethereal.email",
        // port: 465,
        // secure: true, // true for 465, false for other ports
        auth: {
            user: 'babyking1st14@gmail.com', // generated ethereal user
            pass: 'dangngocquang', // generated ethereal password
        },
        // tls:{
        //     rejectUnauthorized:false
        // },
        // connectionTimeout: 5 * 60 * 1000, // 5 min
    })

    const mailOptions = {
        from:'babyking1st14@gmail.com',
        to:toMail,
        subject:header,
        html:   `     
            <h1>Thanh toán thành công</h1>
            <p> Đơn hàng ${ma_bill} của bạn đã được đặt thành công. Bạn có thể theo dõi đơn hàng bằng cách nhấn <a href="http://localhost:3000/bills">vào đây</a></p>`
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log('Email sent:' + info.response);
        }
    })
}