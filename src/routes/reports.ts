import app from "../server";
import {supabase} from "../database";
import { PostgrestError } from "@supabase/supabase-js";

app.get('/reports', async (req, res) => {

    const {date, from, to} = req.query;

    const result = function (data: any[], error: PostgrestError) {
        if (error) {
            console.error(`Logs » Failed to get reports`, error);
            res.status(400).send(JSON.stringify({error: 'Error getting reports'}));
            return
        }

        if (!data) {
            res.status(404).send(JSON.stringify({error: 'Reports not found'}));
            return
        }

        res.status(200).send(JSON.stringify(data));
        return
    }

    if (!date && !from && !to) {
        const {data, error} = await supabase
            .from('reports')
            .select('*')

        result(data, error);
    }

    const isValidDate = (_date:any): boolean => {
        return !isNaN(Date.parse(_date));
    };

    if (date && !isValidDate(date)) {
        res.status(400).send(JSON.stringify({error: 'Invalid date format'}));
        return
    }
    if (from && !isValidDate(from)) {
        res.status(400).send(JSON.stringify({error: 'Invalid from date format'}));
        return
    }
    if (to && !isValidDate(to)) {
        res.status(400).send(JSON.stringify({error: 'Invalid to date format'}));
    }

    if (date) {
        const {data, error} = await supabase
            .from('reports')
            .select('*')
            .eq('date', date)

        result(data, error);
    }

    if (from && to) {
        const {data, error} = await supabase
            .from('reports')
            .select('*')
            .gte('date', from)
            .lte('date', to)

        result(data, error);
    }
});