import app from "../server";
import {getReportById, supabase} from "../database";

app.get('/reports/complete', async (req, res) => {
    const { id, solution } = req.query;

    if (!id || !solution) {
        res.status(400).send(JSON.stringify({error: 'ID and solution are required'}));
        return
    }

    const data = await getReportById(id, res);
    if (!data) return

    if (data.status !== 'new' && data.status !== 'taken') {
        res.status(400).send(JSON.stringify({error: 'Report is not pending'}));
        return
    }

    const {error: updateError} = await supabase
        .from('reports')
        .update({ status: 'completed', solution })
        .eq('id', id);

    if (updateError) {
        console.error('Error completed report:', updateError);
        res.status(500).send(JSON.stringify({error: 'Error completing report'}));
        return
    }

    res.status(200).send(JSON.stringify({message: 'Report completed!'}));
});