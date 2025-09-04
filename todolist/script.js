// 오늘 할일 웹앱 - JavaScript (shadcn/ui New York 스타일)
// 현재는 디자인만 구현된 상태

console.log('오늘 할일 웹앱이 로드되었습니다. (shadcn/ui New York 스타일)');

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
    console.log('DOM이 로드되었습니다. shadcn/ui New York 스타일 적용 완료');
    
    // 기본 이벤트 리스너들 (기능 구현 시 활성화)
    const addBtn = document.querySelector('button[type="button"]');
    const todoInput = document.querySelector('input[type="text"]');
    const priorityBtns = document.querySelectorAll('[data-priority]');
    const viewBtns = document.querySelectorAll('[data-view]');
    
    // 우선순위 버튼 클릭 이벤트 (shadcn/ui 스타일)
    priorityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 모든 우선순위 버튼에서 active 클래스 제거
            priorityBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90');
                b.classList.add('border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground');
            });
            
            // 클릭된 버튼에 active 스타일 적용
            this.classList.remove('border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground');
            this.classList.add('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90');
        });
    });
    
    // 뷰 전환 버튼 클릭 이벤트 (shadcn/ui 스타일)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 모든 뷰 버튼에서 active 클래스 제거
            viewBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90');
                b.classList.add('border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground');
            });
            
            // 클릭된 버튼에 active 스타일 적용
            this.classList.remove('border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground');
            this.classList.add('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90');
        });
    });
    
    // 할일 체크박스 클릭 이벤트 (shadcn/ui 스타일)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const todoItem = this.closest('[data-priority]');
            const label = todoItem.querySelector('label');
            
            if (this.checked) {
                todoItem.classList.add('opacity-60');
                label.classList.add('line-through', 'text-muted-foreground');
            } else {
                todoItem.classList.remove('opacity-60');
                label.classList.remove('line-through', 'text-muted-foreground');
            }
            updateProgress();
        });
    });
    
    // 진행률 업데이트 함수 (shadcn/ui 스타일)
    function updateProgress() {
        const totalTodos = document.querySelectorAll('[data-priority]').length;
        const completedTodos = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
        
        const progressFill = document.querySelector('.bg-primary.rounded-full');
        const progressText = document.querySelector('.text-lg.font-semibold');
        
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }
        if (progressText) {
            progressText.textContent = progressPercentage + '%';
        }
        
        // 통계 업데이트 (shadcn/ui 스타일)
        const statNumbers = document.querySelectorAll('.text-2xl.font-bold');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = totalTodos;
            statNumbers[1].textContent = completedTodos;
            statNumbers[2].textContent = totalTodos - completedTodos;
        }
    }
    
    // 초기 진행률 설정
    updateProgress();
    
    // shadcn/ui 스타일의 호버 효과 추가
    const todoItems = document.querySelectorAll('[data-priority]');
    todoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover:bg-muted/50');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover:bg-muted/50');
        });
    });
});
