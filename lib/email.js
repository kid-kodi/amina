/**
 * Created by olyjosh on 29/06/2017.
 */

var sender = 'smtps://konedangui%40gmail.com'   // The emailto use in sending the email(Change the @ symbol to %40 or do a url encoding )
var password = 'Impenetrable3'  // password of the email to use

var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;


var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
var sendResetPasswordLink = transporter.templateSender(
    new EmailTemplate('./lib/templates/resetPassword'), {
        from: 'admin@bouchra.com',
    });

var sendInfoEmail = transporter.templateSender(
    new EmailTemplate('./lib/templates/mail'), {
        from: 'admin@bouchra.com',
    });

exports.sendPasswordReset = function (email, username, name, tokenUrl) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'Information - bourcha.ci'
    }, {
        name: name,
        username: username,
        token: tokenUrl
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

exports.sendInfoMail = function (email, subject, body) {
    // transporter.template
    sendInfoEmail({
        to: email,
        subject: subject
    }, {
        body: body
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};