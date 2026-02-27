import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wkanpymjshirxuitmcbh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYW5weW1qc2hpcnh1aXRtY2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxODIzNzQsImV4cCI6MjA4Nzc1ODM3NH0.FetVZgX-w7XBf7YjIA1_LcYvzJWGar7pIozLclk2VUU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
