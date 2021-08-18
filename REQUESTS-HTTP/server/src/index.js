
const express =  require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*const corsOptins = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptins))*/

const multipartMiddleware = multipart({uploadDir: './uploads' });
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files)
  res.json({ message: files })
})

app.get('/downloadArquivo',(req, res) => {
  res.download('./uploads/report.png')
})

app.get('/downloadPDF',(req, res) => {
  res.download('./uploads/report.pdf')
})

app.use((err,req,res,next) => res.json({error: err.message}))

app.listen(8000,() =>{
  console.log('servidor porta 8000');
})
