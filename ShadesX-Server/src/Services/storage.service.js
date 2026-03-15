const {ImageKit} = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey:"private_UJ8oCyth9HAvm5qIAiSCWG9XmSA="
});

const uploadImage = async (file) => {
    console.log(file)
    const result = await client.files.upload({

        file:file.toString("base64"),
        fileName:"image.jpg",
    })
    return result;
}

module.exports = uploadImage;