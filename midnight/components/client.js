import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://igrskgpuluisdltzhdrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlncnNrZ3B1bHVpc2RsdHpoZHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjIwNTAsImV4cCI6MjAxNjkzODA1MH0.ryz2j4fPja7uAyvEr09CnrDKmgzffC1gwaTCAPcJns0'
export const supabase = createClient(supabaseUrl, supabaseKey)