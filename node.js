const fs = require("fs")

fs.writeFile("text.txt","This is my first file.",function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Create file Done");
    }
})

fs.appendFile("text.txt","\nThis is my second file", (err)=>{
    if (err) console.log(err);
    else console.log('Append file Done');
})

fs.readFile('text.txt', (err,data)=>{
    if(err) console.log(err);
    else console.log(data.toString());
})

fs.rename("text.txt","data.txt",(err)=>{
    if (err) console.log(err);
    else console.log("Rename Done");
})

fs.copyFile("data3.txt","./data2.txt",(err)=>{
    if(err) console.log(err);
    else console.log("Copy file Done");
})

fs.unlink('./data.txt',(err)=>{
    if(err) console.log(err);
    else console.log("Unlink Done");   
} )

// fs.rmdir("./text",{recursive: true}, (err)=>{
//     if(err) console.log(err);
//     else console.log("rmdir done");  
// })

// fs.rm("./text",{recursive:true},(err)=>{
//     if(err) console.log(err);
//     else console.log("Done");
    
// })

