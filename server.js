const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' })

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

const cpUpload = upload.fields([{ name: 'author'}, { name: 'sender'}, { name: 'title'}, { name: 'projectDesign'}, { name: 'message'}, { name: 'title'}])

app.get(['/', '/home'], (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name }); //"req.params.name" - tak przekazujemy serwerowi informacje
});

app.get('/about', (req, res) => {
  res.render('about'); //sasa
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history', { layout: 'dark'});
});

app.post('/contact/send-message', cpUpload, (req, res) => {
  let picName; 
//   let picture; 
//   console.log(req.files)

  if (req.files.projectDesign) {
    picName = req.files.projectDesign[0].originalname;
    // picture = req.files.projectDesign[0].path;
  }

  const { author, sender, title, message } = req.body;

if(author && sender && title && message && picName) {
  res.render('contact', { isSent: true, picNameOther: picName }); //removed picture: picture
}
else {
  res.render('contact', { isError: true });
}

});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});