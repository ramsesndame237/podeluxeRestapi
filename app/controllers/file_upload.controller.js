
const ftp = require("basic-ftp") 

exports.uploadFile =  async (req, res) => {
    const client = new ftp.Client()
    client.ftp.verbose = true

    try {
        await client.access({
            host: "ftp.podeluxeluxuryskin.com",
            user: "images_produits@podeluxeluxuryskin.com",
            password: "PODELUXELUXURYSKIN",
            secure: true,
            port:'21'
        })
        console.log(await client.access())
        await client.uploadFrom("/home/c1973108c/public_html/podeluxeluxuryskin.com/images_produits", "/home/c1973108c/public_html/podeluxeluxuryskin.com/images_produits")
        await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()




    // console.log(req.files);  
    // if (req.files === null) {
    //   return res.status(400).json({ msg: "No file was uploaded" }); //no file uploaded
    // }
    // const file = req.files.file;
    // // here we access the temporary file path
    // ftp.upload(file.tempFilePath, "/test", function (err) {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).send(err);
    //   } else {
    //     console.log("finished:", res);
    //     res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
    //   }
    //   ftp.close();
    // });
  
};