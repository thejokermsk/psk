const nodemailer = require("nodemailer");

export default async (req, res) => {

  const { name, email, phone, service, comment } = req.body;
  
  if ( !name || !email || !phone ) {
    res.status(404).json({})
    return
  }
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'support@psk-development.ru',
      pass: 'K1jfk9yVV8mx'
    }
  });
  
  let result = await transporter.sendMail({
    from: '"Поддержка ПСК-Девелопмент" <support@psk-development.ru>',
    to: "thejoker.msk@icloud.com",
    subject: "Заказ обратного звонка",
    text: "Заказ обратного звонка с сайта psk-development.ru",
    html: `
      <h2>Заказ обратного звонка с сайта psk-development.ru</h2>
      <p>${service ? '<strong>Направления деятельности:</strong> ' + service : ''}</p>
      <p><strong>Имя:</strong> ${name} </p>
      <p><strong>Email:</strong> ${email} </p>
      <p><strong>Телефон:</strong> ${phone} </p>
      <p><strong>Комментарий:</strong> ${comment} </p>
    
    `
  });
  
  if (result.messageId) {
    res.status(200).json({})
  } else {
    res.status(500).json({})
  }
};