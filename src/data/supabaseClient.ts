// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gryrienfqgpokjddbplz.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeXJpZW5mcWdwb2tqZGRicGx6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzM5MjY1OCwiZXhwIjoyMDY4OTY4NjU4fQ.B21GGdgAU3ooDxLIvO2Ko4zz_nknFTByZUWdJJHjvJ4"; 

export const supabase = createClient(supabaseUrl, supabaseKey);
