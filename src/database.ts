import {createClient} from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_TOKEN) {
    console.error('Error: Missing required environment variables: SUPABASE_URL or SUPABASE_TOKEN');
    process.exit(1);
}

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN)

export async function getReportById(id, res: any) {
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

    return data;
}