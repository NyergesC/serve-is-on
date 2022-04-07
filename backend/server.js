const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req,resp,next)=>{   
    resp.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.use('/pub', express.static(`${__dirname}/../frontend/public`));

//students

app.get('/api/students', (req,resp,next)=>{   
    resp.sendFile(path.join(`${__dirname}/../frontend/students.json`));
})

// id=1

app.get('/api/students/1', (req,resp,next)=>{     
    fs.readFile('../frontend/students.json',(error, data)=>{
        if(error){
            resp.send('Error happened')
        } else{
            const students = JSON.parse(data)
            const idOne = students.filter(students => students.id === 1)
            resp.send(idOne)
        }
    })
});

//active and finished

app.get('/api/students/active', (req,resp,next)=>{     
    fs.readFile('../frontend/students.json',(error, data)=>{
        if(error){
            resp.send('Error happened')
        } else{
            const students = JSON.parse(data)
            const studentsActive = students.filter(students => students.status === 'active')
            resp.send(studentsActive)
        }
    })
});
app.get('/api/students/finished', (req,resp,next)=>{     
    fs.readFile('../frontend/students.json',(error, data)=>{
        if(error){
            resp.send('Error happened')
        } else{
            const students = JSON.parse(data)
            const studentsFinished = students.filter(students => students.status === 'finished')
            resp.send(studentsFinished)
        }
    })
});





const port = 9000;

app.listen(port, ()=>{
    console.log(`htttp://127.0.0.1:${port}`);
})
