// 오늘 할일 웹앱 - JavaScript (기능은 나중에 추가)
// 현재는 디자인만 구현된 상태

console.log('오늘 할일 웹앱이 로드되었습니다.');

// TODO: 나중에 구현할 기능들
// 1. 할일 추가 기능
// 2. 할일 삭제 기능
// 3. 할일 완료 토글 기능
// 4. 할일 수정 기능
// 5. 우선순위 변경 기능
// 6. 카테고리 필터링 기능
// 7. 정렬 기능
// 8. 로컬 스토리지 연동
// 9. 진행률 계산 기능
// 10. 반응형 뷰 전환 기능

// 현재는 샘플 데이터로 디자인만 표시
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM이 로드되었습니다. 기능 구현을 기다리는 중...');
    
    // 기본 이벤트 리스너들 (기능 구현 시 활성화)
    const addBtn = document.querySelector('.add-btn');
    const todoInput = document.querySelector('.todo-input');
    const priorityBtns = document.querySelectorAll('.priority-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // 우선순위 버튼 클릭 이벤트 (디자인용)
    priorityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            priorityBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 뷰 전환 버튼 클릭 이벤트 (디자인용)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 할일 체크박스 클릭 이벤트 (디자인용)
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const todoCard = this.closest('.todo-card');
            if (this.checked) {
                todoCard.classList.add('completed');
            } else {
                todoCard.classList.remove('completed');
            }
            updateProgress();
        });
    });
    
    // 진행률 업데이트 함수 (디자인용)
    function updateProgress() {
        const totalTodos = document.querySelectorAll('.todo-card').length;
        const completedTodos = document.querySelectorAll('.todo-card.completed').length;
        const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-percentage');
        
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }
        if (progressText) {
            progressText.textContent = progressPercentage + '%';
        }
        
        // 통계 업데이트
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = totalTodos;
            statNumbers[1].textContent = completedTodos;
            statNumbers[2].textContent = totalTodos - completedTodos;
        }
    }
    
    // 초기 진행률 설정
    updateProgress();
});
