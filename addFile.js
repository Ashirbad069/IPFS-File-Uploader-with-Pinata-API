require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function uploadToIPFS(filePath) {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
        maxBodyLength: "Infinity",
        headers: {
            ...form.getHeaders(),
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
    });

    console.log("📤 File pinned to IPFS!");
    console.log("🔗 Hash:", res.data.IpfsHash);
}

uploadToIPFS("sample.txt");
// Ensure you have a file named 'sample.txt' in the same directory as this script.