// 오늘 할일 웹앱 - 완전한 기능 구현
console.log('오늘 할일 웹앱이 로드되었습니다. (완전한 기능 구현)');

// 전역 변수
let todos = [];
let currentFilter = 'all';
let currentSort = 'priority';
let currentView = 'list';
let currentPriority = 'high';
let currentCategory = 'work';

// DOM 요소들
const todoInput = document.querySelector('input[type="text"]');
const addBtn = document.querySelector('button[type="button"]');
const priorityBtns = document.querySelectorAll('[data-priority]');
const viewBtns = document.querySelectorAll('[data-view]');
const categorySelect = document.querySelector('select');
const filterSelect = document.querySelectorAll('select')[1];
const sortSelect = document.querySelectorAll('select')[2];
const todoList = document.querySelector('.p-4.space-y-3');

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM이 로드되었습니다. 모든 기능을 초기화합니다.');
    
    // 로컬 스토리지에서 데이터 로드
    loadTodos();
    
    // 이벤트 리스너 등록
    setupEventListeners();
    
    // 초기 렌더링
    renderTodos();
    updateProgress();
    updateStats();
});

// 이벤트 리스너 설정
function setupEventListeners() {
    // 할일 추가
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // 우선순위 버튼
    priorityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setPriority(this.dataset.priority);
        });
    });
    
    // 뷰 전환 버튼
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setView(this.dataset.view);
        });
    });
    
    // 카테고리 선택
    categorySelect.addEventListener('change', function() {
        currentCategory = this.value;
    });
    
    // 필터 선택
    filterSelect.addEventListener('change', function() {
        currentFilter = this.value;
        renderTodos();
    });
    
    // 정렬 선택
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        renderTodos();
    });
}

// 할일 추가
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    
    const todo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        priority: currentPriority,
        category: currentCategory,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    todos.push(todo);
    todoInput.value = '';
    
    saveTodos();
    renderTodos();
    updateProgress();
    updateStats();
}

// 할일 삭제
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateProgress();
    updateStats();
}

// 할일 수정
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('할일을 수정하세요:', todo.text);
    if (newText && newText.trim() !== '') {
        todo.text = newText.trim();
        todo.updatedAt = new Date();
        saveTodos();
        renderTodos();
    }
}

// 할일 완료 토글
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date();
        saveTodos();
        renderTodos();
        updateProgress();
        updateStats();
    }
}

// 우선순위 설정
function setPriority(priority) {
    currentPriority = priority;
    
    // 버튼 스타일 업데이트
    priorityBtns.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        btn.classList.add('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
    });
    
    const activeBtn = document.querySelector(`[data-priority="${priority}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
        activeBtn.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
    }
}

// 뷰 전환
function setView(view) {
    currentView = view;
    
    // 버튼 스타일 업데이트
    viewBtns.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        btn.classList.add('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
    });
    
    const activeBtn = document.querySelector(`[data-view="${view}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
        activeBtn.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
    }
    
    renderTodos();
}

// 할일 필터링
function filterTodos(todos) {
    if (currentFilter === 'all') return todos;
    return todos.filter(todo => todo.category === currentFilter);
}

// 할일 정렬
function sortTodos(todos) {
    switch (currentSort) {
        case 'priority':
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            return todos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        case 'created':
            return todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        case 'alphabetical':
            return todos.sort((a, b) => a.text.localeCompare(b.text));
        default:
            return todos;
    }
}

// 할일 렌더링
function renderTodos() {
    const filteredTodos = filterTodos(todos);
    const sortedTodos = sortTodos(filteredTodos);
    
    if (sortedTodos.length === 0) {
        todoList.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <i class="fas fa-clipboard-list text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-lg font-semibold text-gray-900">할일이 없습니다</h3>
                <p class="text-sm text-gray-500">새로운 할일을 추가해보세요!</p>
            </div>
        `;
        return;
    }
    
    // 뷰에 따른 클래스 적용
    todoList.className = currentView === 'grid' ? 'p-4 space-y-3 grid-view' : 'p-4 space-y-3';
    
    todoList.innerHTML = sortedTodos.map(todo => createTodoHTML(todo)).join('');
    
    // 이벤트 리스너 재등록
    setupTodoEventListeners();
}

// 할일 HTML 생성
function createTodoHTML(todo) {
    const priorityColors = {
        high: 'bg-red-50 text-red-600 border-red-200',
        medium: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        low: 'bg-green-50 text-green-600 border-green-200'
    };
    
    const categoryColors = {
        work: 'bg-purple-100 text-purple-800',
        personal: 'bg-cyan-100 text-cyan-800',
        shopping: 'bg-orange-100 text-orange-800',
        health: 'bg-green-100 text-green-800',
        study: 'bg-blue-100 text-blue-800'
    };
    
    const priorityDots = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500'
    };
    
    const viewClass = currentView === 'grid' ? 'grid-view' : '';
    const itemClass = currentView === 'grid' ? 'todo-item' : '';
    
    return `
        <div class="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 transition-colors ${todo.completed ? 'opacity-60 completed' : ''} ${itemClass}" data-priority="${todo.priority}" data-category="${todo.category}">
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" id="todo-${todo.id}" ${todo.completed ? 'checked' : ''}>
            <div class="flex-1 space-y-1 todo-content">
                <label for="todo-${todo.id}" class="text-sm font-medium text-gray-900 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}">${todo.text}</label>
                <div class="flex items-center space-x-2 todo-meta">
                    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[todo.category]}">${getCategoryName(todo.category)}</span>
                    <div class="h-1 w-1 rounded-full ${priorityDots[todo.priority]}"></div>
                    <span class="text-xs text-gray-500">${getPriorityName(todo.priority)}</span>
                </div>
            </div>
            <div class="flex items-center space-x-1 todo-actions">
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-gray-100 h-8 w-8 transition-colors edit-btn" data-id="${todo.id}" title="수정">
                    <i class="fas fa-edit text-sm text-gray-600"></i>
                </button>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-red-100 h-8 w-8 transition-colors delete-btn" data-id="${todo.id}" title="삭제">
                    <i class="fas fa-trash text-sm text-red-600"></i>
                </button>
            </div>
        </div>
    `;
}

// 할일 이벤트 리스너 설정
function setupTodoEventListeners() {
    // 체크박스 이벤트
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const id = this.id.replace('todo-', '');
            toggleComplete(id);
        });
    });
    
    // 수정 버튼 이벤트
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            editTodo(id);
        });
    });
    
    // 삭제 버튼 이벤트
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            if (confirm('정말로 이 할일을 삭제하시겠습니까?')) {
                deleteTodo(id);
            }
        });
    });
}

// 진행률 업데이트
function updateProgress() {
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
    
    const progressFill = document.querySelector('.bg-blue-600.rounded-full');
    const progressText = document.querySelector('.text-lg.font-semibold');
    
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
    if (progressText) {
        progressText.textContent = progressPercentage + '%';
    }
}

// 통계 업데이트
function updateStats() {
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const remainingTodos = totalTodos - completedTodos;
    
    const statNumbers = document.querySelectorAll('.text-2xl.font-bold');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = totalTodos;
        statNumbers[1].textContent = completedTodos;
        statNumbers[2].textContent = remainingTodos;
    }
}

// 카테고리 이름 반환
function getCategoryName(category) {
    const names = {
        work: '업무',
        personal: '개인',
        shopping: '쇼핑',
        health: '건강',
        study: '학습'
    };
    return names[category] || category;
}

// 우선순위 이름 반환
function getPriorityName(priority) {
    const names = {
        high: '높음',
        medium: '보통',
        low: '낮음'
    };
    return names[priority] || priority;
}

// 로컬 스토리지 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 로컬 스토리지 로드
function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
        // 날짜 객체 복원
        todos.forEach(todo => {
            todo.createdAt = new Date(todo.createdAt);
            todo.updatedAt = new Date(todo.updatedAt);
        });
    }
}

// 데이터 내보내기 (선택사항)
function exportTodos() {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'todos.json';
    link.click();
    URL.revokeObjectURL(url);
}

// 데이터 가져오기 (선택사항)
function importTodos(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedTodos = JSON.parse(e.target.result);
                todos = importedTodos;
                saveTodos();
                renderTodos();
                updateProgress();
                updateStats();
                alert('할일이 성공적으로 가져와졌습니다.');
            } catch (error) {
                alert('파일을 읽는 중 오류가 발생했습니다.');
            }
        };
        reader.readAsText(file);
    }
}

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter: 새 할일 추가
    if (e.ctrlKey && e.key === 'Enter') {
        addTodo();
    }
    
    // Escape: 입력 필드 초기화
    if (e.key === 'Escape') {
        todoInput.value = '';
        todoInput.blur();
    }
});

// 초기 우선순위 설정
setPriority('high');

console.log('모든 기능이 성공적으로 로드되었습니다!');
