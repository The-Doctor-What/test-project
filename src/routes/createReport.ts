import app from "../server";
import {supabase} from "../database";

app.get('/reports/create', async (req, res) => {
    const { title, description } = req.query;

    if (!title || !description) {
        res.status(400).send(JSON.stringify({error: 'Title and description are required'}));
        return
    }

    const {error} = await supabase
        .from('reports')
        .insert({title: title, description: description})

    if (error) {
        console.error(`Logs » Failed to create a report`, error);
        res.status(400).send(JSON.stringify({error: 'Error creating report'}));
        return
    }

    res.status(201).send(JSON.stringify({message: 'Report created!'}));
});