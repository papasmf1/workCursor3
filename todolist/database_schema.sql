-- Supabase 데이터베이스 스키마
-- 이 SQL을 Supabase SQL Editor에서 실행하세요

-- todos 테이블 생성
CREATE TABLE IF NOT EXISTS todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    category TEXT NOT NULL CHECK (category IN ('work', 'personal', 'shopping', 'health', 'study')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 todos를 읽고 쓸 수 있도록 정책 생성 (개발용)
-- 프로덕션에서는 더 엄격한 정책을 사용하세요
CREATE POLICY "Enable all operations for all users" ON todos
    FOR ALL USING (true) WITH CHECK (true);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_todos_updated_at 
    BEFORE UPDATE ON todos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 삽입 (선택사항)
INSERT INTO todos (text, completed, priority, category) VALUES
('프로젝트 기획서 작성하기', false, 'high', 'work'),
('마트에서 장보기', true, 'medium', 'personal'),
('30분 운동하기', false, 'low', 'health')
ON CONFLICT DO NOTHING;
