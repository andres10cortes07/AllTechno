import { ModelsUser } from "../models/user.mjs";
import { ValidateUser, ValidateModifyUser } from "../schemas/schemasUser.mjs";
import { usersPDF, productsPDF } from "../controllers/PDFreports.mjs";
import { cellphoneModels } from "../models/cellphones.mjs";
import { ModelsDesktops } from "../models/desktops.mjs";
import { laptopModels } from "../models/laptops.mjs";
import { ModelsPowerSupplies } from "../models/powerSupplies.mjs";
import { ModelsProcessors } from "../models/processors.mjs";
import { ModelsRam } from "../models/ram.mjs";
import { ModelsScreens } from "../models/screens.mjs";
import nodemailer from "nodemailer";
import excel4node from "excel4node";

export class ControllerUsers {

  static recoverPassword = async (req, res) => {
    const { identificacion } = req.params

    const userEmail = await ModelsUser.getEmail({ identificacion })
    if (!userEmail) return res.json({ error: "La identificacion que ingresaste no está registrada en el sistema" })

    // define new key limits
    const passLength = Math.floor(Math.random() * (15 - 30 + 1)) + 30
    let newPass = ""
    // define the characters that the new key can have
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

    for (let i = 0; i <= passLength; i++) {
      newPass += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    // change of password
    const passwordModified = await ModelsUser.modifyPassword({ identificacion, newPass })

    // sending email with user information and new password
    const sendEmail = async () => {
      const config = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "alltechnologysoftware@gmail.com",
          pass: "flmc ynka fjsp iafq"
        }
      }

      const message = {
        from: "alltechnologysoftware@gmail.com",
        to: userEmail[0].correo,
        subject: "Cambio de contraseña",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">
                 <head>
                  <meta charset="UTF-8">
                  <meta content="width=device-width, initial-scale=1" name="viewport">
                  <meta name="x-apple-disable-message-reformatting">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta content="telephone=no" name="format-detection">
                  <title>Nuevo mensaje</title><!--[if (mso 16)]>
                    <style type="text/css">
                    a {text-decoration: none;}
                    </style>
                    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG></o:AllowPNG>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
                  <style type="text/css">
                #outlook a {
                    padding:0;
                }
                .es-button {
                    mso-style-priority:100!important;
                    text-decoration:none!important;
                }
                a[x-apple-data-detectors] {
                    color:inherit!important;
                    text-decoration:none!important;
                    font-size:inherit!important;
                    font-family:inherit!important;
                    font-weight:inherit!important;
                    line-height:inherit!important;
                }
                .es-desk-hidden {
                    display:none;
                    float:left;
                    overflow:hidden;
                    width:0;
                    max-height:0;
                    line-height:0;
                    mso-hide:all;
                }
                @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
                @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
                </style>
                 </head>
                 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                  <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#FAFAFA"><!--[if gte mso 9]>
                            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                <v:fill type="tile" color="#fafafa"></v:fill>
                            </v:background>
                        <![endif]-->
                   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
                     <tr>
                      <td valign="top" style="padding:0;Margin:0">
                       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                         <tr>
                          <td class="es-info-area" align="center" style="padding:0;Margin:0">
                           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                             <tr>
                              <td align="left" style="padding:20px;Margin:0">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table>
                       <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                         <tr>
                          <td align="center" style="padding:0;Margin:0">
                           <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                             <tr>
                              <td align="left" style="padding:20px;Margin:0">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table>
                       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                         <tr>
                          <td align="center" style="padding:0;Margin:0">
                           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://fhvipan.stripocdn.email/content/guids/CABINET_91d375bbb7ce4a7f7b848a611a0368a7/images/69901618385469411.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td>
                                     </tr>
                                     <tr>
                                      <td align="center" class="es-m-p0r es-m-p0l es-m-txt-c" style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:40px;padding-right:40px"><h1 style="Margin:0;line-height:55px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Contraseña cambiada</h1></td>
                                     </tr>
                                     <tr>
                                      <td align="left" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Hemos recibido tu solicitud para cambiar la clave de tu cuenta. Queremos confirmarte que el cambio ha sido realizado satisfactoriamente.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Recuerda que la seguridad de tu cuenta es una prioridad para nosotros. Por favor, asegúrate de mantener tu nueva clave de manera segura y no compartirla con nadie.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Si en algún momento necesitas cambiar esta nueva clave, puedes hacerlo fácilmente accediendo al apartado de "Cambiar Clave" en tu cuenta.<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                             <tr>
                              <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation">
                                     <tr>
                                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px"><h3 style="Margin:0;line-height:30px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">Tu nueva clave es: ${newPass}</h3></td>
                                     </tr>
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos. Estamos aquí para ayudarte.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Gracias por confiar en nosotros.</p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table>
                       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                         <tr>
                          <td align="center" style="padding:0;Margin:0">
                           <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
                             <tr>
                              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:560px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                         <tr>
                                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                          <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                         </tr>
                                       </table></td>
                                     </tr>
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p></td>
                                     </tr>
                                     <tr>
                                      <td style="padding:0;Margin:0">
                                       <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                         <tr class="links">
                                          <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:12px">Visit Us </a></td>
                                          <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:12px">Privacy Policy</a></td>
                                          <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:12px">Terms of Use</a></td>
                                         </tr>
                                       </table></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table>
                       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                         <tr>
                          <td class="es-info-area" align="center" style="padding:0;Margin:0">
                           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                             <tr>
                              <td align="left" style="padding:20px;Margin:0">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                  </div>
                 </body>
                </html>`
      }
      const transport = nodemailer.createTransport(config);
      await transport.sendMail(message)
    }

    if (!passwordModified) return res.json({ error: "Error al cambiar la clave" })
    else {
      res.json({ message: "Password changed successfully" })
      sendEmail()
    }
  }

  static getUsers = async (req, res) => {
    return res.json(await ModelsUser.getAll())
  }

  static getById = async (req, res) => {
    const { identificacion } = req.params

    const user = await ModelsUser.getById({ identificacion })

    if (!user) return res.status(404).json({ error: "User not found" })
    return res.json(user)
  }

  static createUser = async (req, res) => {
    const result = ValidateUser(req.body)

    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    // define new key limits
    const passLength = Math.floor(Math.random() * (15 - 30 + 1)) + 30
    let newPass = ""
    // define the characters that the new key can have
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

    for (let i = 0; i <= passLength; i++) {
      newPass += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    // create user
    let newUser = await ModelsUser.createUser({ newPass, input: result.data })
    if (newUser.error){
      if(newUser.error === 'ER_DUP_ENTRY'){
        return res.status(400).json({ error : "Algunos de los datos ingresados ya se encuentran registrados en el sistema"})
      }
      else {
        return res.status(400).json({ error : newUser.error})
      }
    }

    newUser = newUser[0]

    const sendEmail = async () => {
      const config = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "alltechnologysoftware@gmail.com",
          pass: "flmc ynka fjsp iafq"
        }
      }

      const message = {
        from: "alltechnologysoftware@gmail.com",
        to: newUser.correo,
        subject: "Nuevo Usuario!!!",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">
             <head>
              <meta charset="UTF-8">
              <meta content="width=device-width, initial-scale=1" name="viewport">
              <meta name="x-apple-disable-message-reformatting">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta content="telephone=no" name="format-detection">
              <title>Nuevo mensaje</title><!--[if (mso 16)]>
                <style type="text/css">
                a {text-decoration: none;}
                </style>
                <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
              <style type="text/css">
            #outlook a {
                padding:0;
            }
            .es-button {
                mso-style-priority:100!important;
                text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
                color:inherit!important;
                text-decoration:none!important;
                font-size:inherit!important;
                font-family:inherit!important;
                font-weight:inherit!important;
                line-height:inherit!important;
            }
            .es-desk-hidden {
                display:none;
                float:left;
                overflow:hidden;
                width:0;
                max-height:0;
                line-height:0;
                mso-hide:all;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
            @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
            </style>
             </head>
             <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
              <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#FAFAFA"><!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#fafafa"></v:fill>
                        </v:background>
                    <![endif]-->
               <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
                 <tr>
                  <td valign="top" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                      <td class="es-info-area" align="center" style="padding:0;Margin:0">
                       <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                         <tr>
                          <td align="left" style="padding:20px;Margin:0">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                         <tr>
                          <td align="left" style="padding:20px;Margin:0">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;display:none"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://fhvipan.stripocdn.email/content/guids/CABINET_91d375bbb7ce4a7f7b848a611a0368a7/images/69901618385469411.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td>
                                 </tr>
                                 <tr>
                                  <td align="center" class="es-m-p0r es-m-p0l es-m-txt-c" style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:40px;padding-right:40px"><h1 style="Margin:0;line-height:55px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Bienvenido a AllTechno</h1></td>
                                 </tr>
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Nos complace darte la bienvenida a nuestra comunidad. Tu cuenta ha sido creada exitosamente y estamos encantados de que te unas a nosotros.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Recuerda que la seguridad de tu cuenta es una prioridad para nosotros. Por favor, asegúrate de cambiar esta clave temporal a una clave segura y no compartirla con nadie. Para cambiar tu clave, simplemente accede al apartado de "Cambiar Clave" en tu cuenta.</p><br><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:16px">
                                  Usuario: ${newUser.correo}<br>
                                  Clave temporal: <b>${newPass}</b><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos. Estamos aquí para ayudarte.

                                  Gracias por confiar en nosotros y bienvenido a AllTechno.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Gracias por confiar en nosotros.</p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
                         <tr>
                          <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                                   <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://fhvipan.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Style Casual&nbsp;© 2021 Style Casual, Inc. All Rights Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">4562 Hazy Panda Limits, Chair Crossing, Kentucky, US, 607898</p></td>
                                 </tr>
                                 <tr>
                                  <td style="padding:0;Margin:0">
                                   <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr class="links">
                                      <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:12px">Visit Us </a></td>
                                      <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:12px">Privacy Policy</a></td>
                                      <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:12px">Terms of Use</a></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                      <td class="es-info-area" align="center" style="padding:0;Margin:0">
                       <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                         <tr>
                          <td align="left" style="padding:20px;Margin:0">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
              </div>
             </body>
            </html>`
      }
      const transport = nodemailer.createTransport(config);
      await transport.sendMail(message)
    }
    sendEmail()

    return res.status(201).json({newUser : newUser})
  }

  static modifyUser = async (req, res) => {
    const { identificacion } = req.params
    const result = ValidateModifyUser(req.body)

    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })


    const userModified = await ModelsUser.modifyUser({ identificacion, input: result.data })

    if (!userModified) return res.status(404).json({ error: "User not found" })
    return res.json(userModified)
  }

  static deleteUser = async (req, res) => {
    const { identificacion } = req.params

    const deleteStatus = await ModelsUser.deleteUser({ identificacion })

    if (!deleteStatus) return res.status(404).json({ error: "User not found" })
    return res.json({ message: "User deleted successfully" })
  }

  static login = async (req, res) => {
    const infoUser = req.body

    const userExists = await ModelsUser.login(infoUser)

    if (!userExists) return res.status(401).json({ error: "Los datos ingresados son incorrectos" })

    req.sessionStore.user = userExists.correo
    req.sessionStore.admin = true
    return res.json(userExists)
  }

  static logout = (req, res) => {
    req.sessionStore.admin = null
    req.sessionStore.user = null

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to logout.' });
      } else {
        return res.json({ message: 'Logout successful!' });
      }
    });
  }

  static validateSession = async (req, res) => {
    if (req.session && req.sessionStore.user && req.sessionStore.admin) {
      const rol = await ModelsUser.accessToRol(req.sessionStore.user)
      return res.status(200).json({ loggedIn: true, user: req.sessionStore.user, rol: rol })
    } else {
      return res.status(401).json({ loggedIn: false });
    }
  };

  static generateUsersPDF = async (req, res) => {

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename = Reporte de Usuarios.pdf"
    })

    const users = await ModelsUser.getAll()

    usersPDF((data) => stream.write(data),
      () => stream.end(),
      users
    )
  }

  static generateUsersExcel = async (req, res) => {
    try {
      const users = await ModelsUser.getAll();

      // Crear libro de trabajo
      const wb = new excel4node.Workbook();

      // Crear hoja de trabajo
      const ws = wb.addWorksheet("Usuarios");

      // Estilo para la celda combinada del título
      const titleStyle = wb.createStyle({
        font: {
          color: 'white',
          size: 12,
          bold: true,
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        fill: {
          type: 'pattern',
          patternType: 'solid',
          fgColor: 'black'
        }
      });

      // Estilo para los encabezados
      const headerStyle = wb.createStyle({
        font: {
          color: 'black',
          size: 12,
          bold: true,
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        fill: {
          type: 'pattern',
          patternType: 'solid',
          fgColor: '#D9D9D9'
        },
        border: {
          left: {
            style: 'thin',
            color: 'black'
          },
          right: {
            style: 'thin',
            color: 'black'
          },
          top: {
            style: 'thin',
            color: 'black'
          },
          bottom: {
            style: 'thin',
            color: 'black'
          }
        }
      });

      // Estilo para celdas con texto centrado y bordes
      const centeredStyle = wb.createStyle({
        font: {
          color: 'black',
          size: 12,
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center'
        },
        border: {
          left: {
            style: 'thin',
            color: 'black'
          },
          right: {
            style: 'thin',
            color: 'black'
          },
          top: {
            style: 'thin',
            color: 'black'
          },
          bottom: {
            style: 'thin',
            color: 'black'
          }
        }
      });

      // Fusionar celdas para el título del reporte
      ws.cell(1, 1, 2, 5, true).string('REPORTE DE USUARIOS ALLTECHNO').style(titleStyle);

      // Establecer anchos de columna
      ws.column(1).setWidth(20); // Identificación
      ws.column(2).setWidth(30); // Nombre
      ws.column(3).setWidth(30); // Correo
      ws.column(4).setWidth(20); // Celular
      ws.column(5).setWidth(20); // Rol

      // Agregar encabezados
      const headers = ["Identificación", "Nombre", "Correo", "Celular", "Rol"];
      headers.forEach((header, index) => {
        ws.cell(3, index + 1).string(header).style(headerStyle);
      });

      // Agregar datos de usuarios
      users.forEach((user, rowIndex) => {
        ws.cell(rowIndex + 4, 1).string(user.identificacion).style(centeredStyle);
        ws.cell(rowIndex + 4, 2).string(`${user.nombres} ${user.apellidos}`).style(centeredStyle);
        ws.cell(rowIndex + 4, 3).string(user.correo).style(centeredStyle);
        ws.cell(rowIndex + 4, 4).string(user.celular).style(centeredStyle);
        ws.cell(rowIndex + 4, 5).string(user.rol).style(centeredStyle);
      });

      // Generar un buffer con el archivo Excel
      const buffer = await wb.writeToBuffer();

      // Generar un nombre único para el archivo
      const fileName = `Reporte_Usuarios.xlsx`;

      // Configurar las cabeceras de respuesta para la descarga automática
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

      // Enviar el archivo Excel al cliente
      res.send(buffer);

    } catch (error) {
      console.error("Error al generar el archivo Excel:", error);
      res.status(500).send('Error al generar el archivo Excel');
    }
  }

  static generateProductsPDF = async (req, res) => {
    try {
      const cellphones = await cellphoneModels.getAll({ order:"cel.precio ASC"})
      const desktops = await ModelsDesktops.getAll({ order:"tor.precio ASC"})
      const laptops = await laptopModels.getAll({ order:"por.precio ASC"})
      const powerSupplies = await ModelsPowerSupplies.getAll({ order:"pow.precio ASC"})
      const processors = await ModelsProcessors.getAll({ order:"pro.precio ASC"})
      const ram = await ModelsRam.getAll({ order:"ram.precio ASC"})
      const screens = await ModelsScreens.getAll({ order:"pan.precio ASC"})
  
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Reporte de Productos.pdf"
      });
  
      productsPDF((data) => stream.write(data),
        () => stream.end(),
        cellphones, desktops, laptops, powerSupplies, processors, ram, screens
      );
    } catch (error) {
      res.status(500).send("Error al generar el PDF");
    }
  };

  static generateProductsExcel = async (req, res) => {
    try { // Crear libro de trabajo
      const wb = new excel4node.Workbook();
  
      // Estilo para la celda combinada del título
      const titleStyle = wb.createStyle({
          font: {
              color: 'white',
              size: 12,
              bold: true,
          },
          alignment: {
              horizontal: 'center',
              vertical: 'center'
          },
          fill: {
              type: 'pattern',
              patternType: 'solid',
              fgColor: 'black'
          }
      });
  
      // Estilo para los encabezados
      const headerStyle = wb.createStyle({
          font: {
              color: 'black',
              size: 12,
              bold: true,
          },
          alignment: {
              horizontal: 'center',
              vertical: 'center',
              wrapText: true
          },
          fill: {
              type: 'pattern',
              patternType: 'solid',
              fgColor: '#D9D9D9'
          },
          border: {
              left: {
                  style: 'thin',
                  color: 'black'
              },
              right: {
                  style: 'thin',
                  color: 'black'
              },
              top: {
                  style: 'thin',
                  color: 'black'
              },
              bottom: {
                  style: 'thin',
                  color: 'black'
              }
          }
      });
  
      // Estilo para celdas con texto centrado y bordes
      const centeredStyle = wb.createStyle({
          font: {
              color: 'black',
              size: 12,
          },
          alignment: {
              horizontal: 'center',
              vertical: 'center',
              wrapText: true
          },
          border: {
              left: {
                  style: 'thin',
                  color: 'black'
              },
              right: {
                  style: 'thin',
                  color: 'black'
              },
              top: {
                  style: 'thin',
                  color: 'black'
              },
              bottom: {
                  style: 'thin',
                  color: 'black'
              }
          }
      });
  
      const headerMapping = {
          'Marca': 'marca',
          'Modelo': 'modelo',
          'Bateria': 'bateria',
          'Procesador': 'procesador',
          'Cámara Frontal': 'camaraFrontal',
          'Cámara Posterior': 'camaraPosterior',
          'Resolución': 'resolucion',
          'Huella': 'huella',
          'Almacenamiento': 'almacenamiento',
          'RAM': 'ram',
          'Precio': 'precio',
          'Colores': 'colores',
          'Voltaje': 'voltaje',
          'Potencia': 'potencia',
          'Certificación': 'certificacion',
          'Dimensiones': 'dimensiones',
          'Pulgadas': 'pulgadas',
          'Tipo': 'tipo',
          'Gráfica': 'grafica',
          'Tamaño Pantalla': 'tamañoPantalla',
          'Num Nucleos': 'numNucleos',
          'Num Hilos': 'numHilos',
          'Reloj Base': 'relojBase',
          'Capacidad': 'capacidad',
          'Velocidad': 'velocidad',
          'LED': 'led',
          'Procesador': 'procesador',
          'Gráfica': 'grafica',
          'RAM': 'ram',
          'Almacenamiento': 'almacenamiento',
          'Board': 'board',
          'Chasis': 'chasis',
          'Fuente': 'fuente'
      };
  
      const calculateColumnWidths = (headers, data) => {
          const columnWidths = headers.map(header => {
              switch (header) {
                  case 'Marca':
                  case 'Modelo':
                  case 'Procesador':
                  case 'Dimensiones':
                  case 'Tipo':
                  case 'Certificación':
                      return 20; // Ajuste de ancho aproximado para columnas largas
                  case 'Bateria':
                  case 'Cámara Frontal':
                  case 'Cámara Posterior':
                  case 'Resolución':
                  case 'Huella':
                  case 'Almacenamiento':
                  case 'RAM':
                  case 'Precio':
                  case 'Colores':
                  case 'Voltaje':
                  case 'Potencia':
                  case 'Pulgadas':
                  case 'Tamaño Pantalla':
                  case 'Num Nucleos':
                  case 'Num Hilos':
                  case 'Reloj Base':
                  case 'Capacidad':
                  case 'Velocidad':
                  case 'LED':
                      return 15; // Ajuste de ancho aproximado para columnas medianas
                  default:
                      return 12; // Ajuste de ancho aproximado para columnas cortas
              }
          });
  
          data.forEach(item => {
              headers.forEach((header, index) => {
                  const field = headerMapping[header];
                  const valueLength = (item[field]?.toString() || '').length;
                  if (valueLength > columnWidths[index]) {
                      columnWidths[index] = valueLength;
                  }
              });
          });
  
          return columnWidths;
      };
  
      // Estilo para precios
const priceStyle = wb.createStyle({
  font: {
      color: 'black',
      size: 12,
  },
  alignment: {
      horizontal: 'right', // Alineación a la derecha para los precios
      vertical: 'center',
  },
  numberFormat: '"$"#,##0;[Red]\\-"$"#,##0',
  border: {
    left: {
        style: 'thin',
        color: 'black'
    },
    right: {
        style: 'thin',
        color: 'black'
    },
    top: {
        style: 'thin',
        color: 'black'
    },
    bottom: {
        style: 'thin',
        color: 'black'
    }
},
alignment: {
  horizontal: 'center',
  vertical: 'center',// Formato de número para precios
}})

const addSectionToSheet = (wb, sheetName, sectionTitle, headers, data) => {
  const ws = wb.addWorksheet(sheetName);

  // Fusionar celda para el título del reporte
  ws.cell(1, 1, 1, headers.length, true).string(sectionTitle).style(titleStyle);

  let currentRow = 2; // Comenzar en la fila 3 después del título

  headers.forEach((header, index) => {
      ws.column(index + 1).setWidth(calculateColumnWidths(headers, data)[index] + 2); // Ajustar el ancho de columna
      ws.cell(currentRow, index + 1).string(header).style(headerStyle);
  });
  currentRow++;

  data.forEach(item => {
      headers.forEach((header, colIndex) => {
          const field = headerMapping[header];
          if (header === 'Precio') {
              // Aplicar el estilo de precio para la columna de precios
              ws.cell(currentRow, colIndex + 1).number(item[field] || 0).style(priceStyle);
          } else {
              ws.cell(currentRow, colIndex + 1).string(item[field]?.toString() || '').style(centeredStyle);
          }
      });
      currentRow++;
  });
};
  
      // Agregar cada sección de productos como una hoja separada
      addSectionToSheet(wb, 'Celulares', 'PRODUCTOS ALLTECHNO - CELULARES', ['Marca', 'Modelo', 'Bateria', 'Procesador', 'Cámara Frontal', 'Cámara Posterior', 'Resolución', 'Huella', 'Almacenamiento', 'RAM', 'Precio', 'Colores'], cellphones);
      addSectionToSheet(wb, 'FuentesDePoder', 'PRODUCTOS ALLTECHNO - FUENTES DE PODER', ['Marca', 'Modelo', 'Voltaje', 'Potencia', 'Certificación', 'Precio'], powerSupplies);
      addSectionToSheet(wb, 'Pantallas', 'PRODUCTOS ALLTECHNO - PANTALLAS', ['Marca', 'Modelo', 'Dimensiones', 'Pulgadas', 'Resolución', 'Tipo', 'Precio'], screens);
      addSectionToSheet(wb, 'Portatiles', 'PRODUCTOS ALLTECHNO - PORTÁTILES', ['Marca', 'Modelo', 'Procesador', 'Gráfica', 'Resolución', 'Tamaño Pantalla', 'Almacenamiento', 'RAM', 'Precio', 'Colores'], laptops);
      addSectionToSheet(wb, 'Procesadores', 'PRODUCTOS ALLTECHNO - PROCESADORES', ['Marca', 'Modelo', 'Num Nucleos', 'Num Hilos', 'Reloj Base', 'Precio'], processors);
      addSectionToSheet(wb, 'RAM', 'PRODUCTOS ALLTECHNO - RAM', ['Marca', 'Modelo', 'Capacidad', 'Velocidad', 'Tipo', 'LED', 'Precio'], ram);
      addSectionToSheet(wb, 'TorreEscritorio', 'PRODUCTOS ALLTECHNO - TORRE DE ESCRITORIO', ['Procesador', 'Gráfica', 'RAM', 'Almacenamiento', 'Board', 'Chasis', 'Fuente', 'Precio'], desktops);
  
      // Generar un buffer con el archivo Excel
      const buffer = await wb.writeToBuffer();
  
      // Generar un nombre único para el archivo
      const fileName = `Reporte_Productos_Alltechno.xlsx`;
  
      // Configurar las cabeceras de respuesta para la descarga automática
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  
      // Enviar el archivo Excel al cliente
      res.send(buffer);
  
  } catch (error) {
      console.error("Error al generar el archivo Excel:", error);
      res.status(500).send('Error al generar el archivo Excel');
  }
  }

  static changePassword = async (req, res) => {
    
  }
}

