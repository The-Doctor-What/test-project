import app from "../server";
import {getReportById, supabase} from "../database";

app.get('/reports/cancel', async (req, res) => {
    const { id, reason } = req.query;

    if (!id || !reason) {
        res.status(400).send(JSON.stringify({error: 'ID and reason are required'}));
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
        .update({ status: 'cancelled', reason })
        .eq('id', id);

    if (updateError) {
        console.error('Error cancelling report:', updateError);
        res.status(500).send(JSON.stringify({error: 'Error cancelling report'}));
        return
    }

    res.status(200).send(JSON.stringify({message: 'Report cancelled!'}));
});