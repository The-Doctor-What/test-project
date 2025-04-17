import app from "../server";
import {getReportById, supabase} from "../database";

app.get('/reports/take', async (req, res) => {
    const { id} = req.query;

    if (!id) {
        res.status(400).send(JSON.stringify({error: 'ID is required'}));
        return
    }

    const data = await getReportById(id, res);
    if (!data) return

    if (data.status !== 'new') {
        res.status(400).send(JSON.stringify({error: 'Report is not pending'}));
        return
    }

    const {error: updateError} = await supabase
        .from('reports')
        .update({ status: 'taken' })
        .eq('id', id);

    if (updateError) {
        console.error(`Logs » Failed to update report with id ${id}`, updateError);
        res.status(400).send(JSON.stringify({error: 'Error updating report'}));
        return
    }

    res.status(200).send('Report joined!');
});