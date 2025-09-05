# Supabase 연동 설정 가이드

이 todolist 앱을 Supabase 데이터베이스와 연동하는 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 로그인
2. "New Project" 버튼 클릭
3. 프로젝트 이름과 데이터베이스 비밀번호 설정
4. 프로젝트 생성 완료까지 대기

## 2. 데이터베이스 스키마 설정

1. Supabase 대시보드에서 "SQL Editor" 메뉴 선택
2. `database_schema.sql` 파일의 내용을 복사하여 실행
3. 테이블이 성공적으로 생성되었는지 확인

## 3. API 키 확인

1. Supabase 대시보드에서 "Settings" > "API" 메뉴 선택
2. 다음 정보를 복사:
   - Project URL
   - anon public key

## 4. 설정 파일 업데이트

`config.js` 파일을 열고 다음 정보를 실제 값으로 교체:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project-id.supabase.co',  // 실제 Project URL
    anonKey: 'your-anon-key-here'                // 실제 anon public key
};
```

## 5. 앱 실행

1. 웹 서버를 실행하거나 `index.html` 파일을 브라우저에서 열기
2. 브라우저 개발자 도구의 콘솔에서 "Supabase 연결 성공!" 메시지 확인
3. 할일 추가/수정/삭제가 데이터베이스에 저장되는지 확인

## 문제 해결

### Supabase 연결 실패 시
- `config.js`의 URL과 키가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- RLS 정책이 올바르게 설정되어 있는지 확인

### 로컬 스토리지 모드로 동작하는 경우
- Supabase 설정이 올바르게 되어 있는지 확인
- 브라우저 콘솔에서 오류 메시지 확인
- 네트워크 연결 상태 확인

## 기능

- ✅ 할일 추가/수정/삭제
- ✅ 완료 상태 토글
- ✅ 우선순위 설정 (높음/보통/낮음)
- ✅ 카테고리 분류 (업무/개인/쇼핑/건강/학습)
- ✅ 실시간 데이터베이스 동기화
- ✅ 로컬 스토리지 폴백 (Supabase 연결 실패 시)
