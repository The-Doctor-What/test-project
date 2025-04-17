import app from "../server";
import {supabase} from "../database";

app.get('/reports/take', async (req, res) => {
    const { id} = req.query;

    if (!id) {
        res.status(400).send(JSON.stringify({error: 'ID is required'}));
        return
    }

    const {data, error} = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Logs » Failed to get report with id ${id}`, error);
        res.status(400).send(JSON.stringify({error: 'Error getting report'}));
        return
    }

    if (!data) {
        res.status(404).send(JSON.stringify({error: 'Report not found'}));
        return
    }

    if (data.status !== 'new') {
        res.status(400).send(JSON.stringify({error: 'Report is not pending'}));
        return
    }

    const {error: updateError} = await supabase
        .from('reports')
        .update({ status: 'taken' })
        .eq('id', id);

    if (updateError) {
        console.error(`Logs » Failed to update report with id ${id}`);
        console.error(updateError);
        res.status(400).send(JSON.stringify({error: 'Error updating report'}));
        return
    }

    res.status(200).send('Report joined!');
});