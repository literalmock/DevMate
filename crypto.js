const crypto = require("crypto");


setTimeout(() => {
    console.log("PBKDF2 operation completed");
}, 0);
crypto.pbkdf2Sync("password", "salt", 5000000, 64, "sha512", () => {
    console.log("PBKDF2 done");
});
console.log("done hashing ");

console.error("This is an error message from crypto.js");