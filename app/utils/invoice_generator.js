var easyinvoice = require('easyinvoice');
const uploadFile = require("../middleware/upload");
const emailer = require("../services/email")
const {generateKey} = require("./utils")

var fs = require('fs')

module.exports = () => {
  
    let date = Date.now()
    const today = new Date(date);
    const numberInvoice = 'POD'+ '-' + generateKey(4)
    exports.invoice_generator =(dataSender) =>{
        //Import the library into your project
    
    var data = {
        // Customize enables you to provide your own templates
        // Please review the documentation for instructions and examples
        "customize": {
            //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
        },
        "images": {
            "logo": "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",
            "background": "https://public.easyinvoice.cloud/pdf/sample-background.pdf"
        },
        // Your own data
        "sender": {
            "company": "PODELUXE",
            "address": "74100 Annemasse",
            "email":"podeluxe2021@gmail.com",
            "city": "Annemasse",
            "country": "France",
            "telephone":"+33 6 33 82 67 51"
        },
        // Your recipient
        "client": dataSender.clients,
        "information": {
            // Invoice number
            "number": numberInvoice,
            // Invoice data
            "date": today.toLocaleDateString(),
            "due-date":"2022-10-30"
        },
        "products": dataSender.product,
        "bottom-notice": "Podeluxe vous remercie pour votre fidélité et votre confiance.",
        "settings": {
            "currency": "EUR", 
        },
        // Translate your invoice to your preferred language
        "translate": { 
            "invoice":"Facture",
            "price":"Prix",
            "quantity":"Quantité",
            "number":"Numéro",
            "products":"Produits"
        },  
    };
    
    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (result) {
        //The response will contain a base64 encoded PDF file

        let name = "invoicie" + numberInvoice + '.pdf'
        let path = __dirname + "/../ressource/static/assets/uploads/invoice/"
        await fs.writeFileSync(path + name,result.pdf,'base64')
        await fs.readdir(path, function (err, files) {
            if (err) {
              res.status(500).send({
                message: "Unable to scan files!",
              });
            }
        
            let fileInfos = [];
        
            files.forEach((file) => {
                if(file == name){   
                    fileInfos.push({
                      name: file,
                      url: "http://localhost:8800/files/" + file,
                    });
                    emailer().to(dataSender.clients.address).subject("Facture").send("invoice", { link: fileInfos[0].url, name: dataSender.clients.company})
                }else{
                    return
                }
            });
        
          });
    });
    }


    return this
}
