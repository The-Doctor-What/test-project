import {createClient} from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_TOKEN) {
    console.error('Error: Missing required environment variables: SUPABASE_URL or SUPABASE_TOKEN');
    process.exit(1);
}

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN)