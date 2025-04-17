import app from "../server";
import {supabase} from "../database";

app.get('/reports/cancelAllInProgress', async (req, res) => {
    const {reason } = req.query;

    if (!reason) {
        res.status(400).send(JSON.stringify({error: 'reason are required'}));
        return
    }

    const {data, error} = await supabase
        .from('reports')
        .select('*')

    if (error) {
        console.error(`Logs » Failed to get reports`, error);
        res.status(400).send(JSON.stringify({error: 'Error getting reports'}));
        return
    }

    if (!data) {
        res.status(404).send(JSON.stringify({error: 'Reports not found'}));
        return
    }

    for (const report of data) {
        if (report.status !== 'new' && report.status !== 'taken') {
            continue
        }

        const {error: updateError} = await supabase
            .from('reports')
            .update({ status: 'cancelled', reason })
            .eq('id', report.id);

        if (updateError) {
            console.error('Error cancelling report:', error);
            res.status(500).send(JSON.stringify({error: `Error cancelling report with id ${report.id}`}));
            return
        }
    }

    res.status(200).send(JSON.stringify({message: 'All reports cancelled!'}));
});