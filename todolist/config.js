// Supabase 설정 파일
// 실제 Supabase 프로젝트 정보로 교체하세요

const SUPABASE_CONFIG = {
    // Supabase 프로젝트 URL (예: https://your-project.supabase.co)
    url: 'https://vhiocuumlkzqvcsjgwtp.supabase.co',
    
    // Supabase 익명 키 (anon public key)
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaW9jdXVtbGt6cXZjc2pnd3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MzM4NTIsImV4cCI6MjA3MjUwOTg1Mn0.R2-s-lmbLHcRYctoU5Fy-8I3ucqOlwyJrQtTBQ8mHow'
};

// 설정을 전역으로 사용할 수 있도록 export
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
