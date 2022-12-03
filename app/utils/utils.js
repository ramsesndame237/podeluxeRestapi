const fs = require('fs')

/**
 * Genere une cle aleatoire
 * 
 * @param {Integer} size 
 * @return {String}
 */
exports.generateKey = (size) => {
    size = parseInt(size || 6)

    let code = '',
        char = ('0123456789').split(''),
        taille = char.length
    for (let i = 0; i < size; i++) {
        code += char[Math.floor(Math.random() * taille)]
    }

    return code
}

/**
 * Sauvegarde un OTP dans le fichier temporaire
 * 
 * @param {Object} data 
 * @param {String|Function} file 
 * @param {Function} callback 
 */
exports.saveOTP = (data, file, callback) => {
    if (!callback && typeof file != 'string') {
        callback = file
        file = 'otp'
    }
    exports.getOTP(file, (err, otp) => {
        otp.push({
            tel: data.tel,
            email: data.email,
            code: data.code
        })
        exports.setOTP(otp, file, callback)
    })
}

/**
 * Modifie les OTP
 * 
 * @param {Object} data 
 * @param {String|Function} file 
 * @param {Function} callback
 */
exports.setOTP = (data, file, callback) => {
    if (!callback && typeof file != 'string') {
        callback = file
        file = 'otp'
    }
    fs.writeFile(fileOTP(file), JSON.stringify(data), (err) => {
        if (typeof callback === 'function') {
            return callback(err)
        }
    })
}

/**
 * Recupere les otp enregistres
 * 
 * @param {String|Function|true} file 
 * @param {Function|true} callback 
 */
exports.getOTP = (file, callback) => {
    if (!callback && typeof file != 'string') {
        callback = file
        file = 'otp'
    }
    if (true === callback) {
        return parseOTP(fs.readFileSync(fileOTP(file)))
    }

    fs.readFile(fileOTP(file), (err, buffer) => {
        if (typeof callback === 'function') {
            return callback(err, parseOTP(buffer))
        }
    })
}

/**
 * Retire un element des otp
 * 
 * @param {Function} callback 
 * @param {String} file 
 * @returns 
 */
exports.removeOTP = (callback, file) => {
    if (!file || typeof file == 'undefined') {
        file = 'otp'
    }
    let otp = exports.getOTP(file, true)

    return exports.setOTP(otp.filter(user => callback(user)), file)
}

/**
 * @param {Buffer} buffer 
 * @returns {Object}
 */
const parseOTP = (buffer) => {
    let otp = buffer.toString()

    if (!otp) {
        otp = []
    }
    return JSON.parse(otp)
}

/**
 * Chemin absolue vers un fichier d'OTP 
 * 
 * @param {String} name 
 * @return {String}
 */
const fileOTP = (name) => {
    return __dirname + '/../temp/' + name + '.json'
}

exports.generateUUID = () =>{ // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported 
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}