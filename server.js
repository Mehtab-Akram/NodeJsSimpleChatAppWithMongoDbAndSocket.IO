const express = require('express');
const bodyParser = require('body-parser')
const { message } = require('statuses');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const { stringify } = require('querystring');
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const DbURL = 'mongodb+srv://DbUser:Password@cluster0.fsjaa.mongodb.net/DBName?retryWrites=true&w=majority';
const Message = mongoose.model('Message', {
    name: String,
    message: String
})
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})
app.get('/messages/:user', (req, res) => {
    let user = req.params.user
    Message.Find({ name: user }, (err, messages) => {
        res.send(messages)
    })
})



app.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        const SavedMessage = await message.save();
        console.log('saved');
        var censored = await Message.findOne({ message: { $regex: '.*badword.*' } });
        if (censored)
            await Message.deleteOne({ _id: censored.id });
        else
            io.emit('message', req.body)
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally {
        console.log('Message post called');
    }


})

io.on('connection', socket => {
    console.log("A user Connected.");
})
mongoose.connect(DbURL, (err) => {
    console.log("Mongo Connected.", err);
})
const server = http.listen(3000, () => {
    console.log(`Server is running at port ${server.address().port}`)
});