const fs = require("fs");
const path = require("path");

// File system
// fs.mkdir(path.join(__dirname, "notes"), error => {
//     if (error) throw error;
//
//     console.log("Folder is created");
// });

// fs.writeFile(path.join(__dirname, "notes", "mynotes.txt"), "Hello world", error => {
//     if (error) throw error;
//
//     console.log("File is created");
//
//     fs.appendFile(path.join(__dirname, "notes", "mynotes.txt"), " From append file", err => {
//         if (err) throw err;
//         console.log("File is changed");
//
//         fs.readFile(path.join(__dirname, "notes", "mynotes.txt"),"utf-8", (err, data) => {
//             if (err) throw err;
//             console.log(data);
//         });
//     })
// });

fs.rename(path.join(__dirname, "notes", "mynotes2.txt"), path.join(__dirname, "notes", "notes.txt"), err => {
    if (err) throw err;

    console.log("File is renamed");
});