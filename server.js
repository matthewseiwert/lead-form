const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {createClient} = require('@supabase/supabase-js');

const app = express();
const post = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = createClient(
    'https://ikoqgxssdxuhesdxdjcn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrb3FneHNzZHh1aGVzZHhkamNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTAwNjgsImV4cCI6MjA2MDcyNjA2OH0.nTpKKocMy79Hz8TRcwb1qdGT09VAG0hpmsHkl2w0aaQ'
);

app.post('/submit', async (req, res) => {
    const { name, email } = req.body;
    const { data, error } = await supabase
    .from('leads')
    .insert([{name, email}]);

    if (error) {
        console.error('Error inserting lead:', error);
        return res.status(500).send('Something went wrong.');
    }

    res.send('Thanks for signing up!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});