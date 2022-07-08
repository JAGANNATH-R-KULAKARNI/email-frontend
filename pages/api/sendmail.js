import nc from "next-connect";
const mail = require("@sendgrid/mail");

require("dotenv").config();
mail.setApiKey(process.env.SENDGRID_API);

const handler = nc();

handler.post(async (req, res) => {
  const data = req.body;
  let message = data.message;

  const info = {
    // to: `${data.email}`,
    from: {
      email: "jagannathrkulakarni.171845@gmail.com",
    },
    // bcc: ["technieks22@gmail.com", "mailto:swo@nie.ac.in"],
    subject: "ok",
    personalizations: [
      {
        to: [
          {
            email: data.to,
          },
        ],
        // dynamic_template_data: {
        //   amount: data.amount,
        //   my_name: data.name,
        //   ticket: data.no == 1 ? "1  Ticket has" : `${data.no} Tickets have`,
        //   event: data.show,
        //   payment_id: data.id,
        //   order_id: data.order_id,
        // },
      },
    ],
    text: "should get",
    html: message.replace(/\r\n/g, "<br />"),
    // template_id: "d-b746779c52b44a71bf70e6d8bebde358",
  };

  await mail
    .send(info)
    .then((u) => {
      console.log(u);
      return res.send({ message: "email sent", data: u });
    })
    .catch((err) => {
      return res.send({ message: "email not sent" });
    });
});

export default handler;
