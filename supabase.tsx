import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    'https://hrcyxwfhttrflcuvtqzy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3l4d2ZodHRyZmxjdXZ0cXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMjYwODcsImV4cCI6MTk5NTcwMjA4N30.bnJgeqvbZ5t6DPaXESw7I8KQMDNiDMVaAZpkPFO4dbE'
);

export type SongMetadata = { title: string; filename: string; }