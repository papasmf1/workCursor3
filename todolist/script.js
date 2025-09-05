<<<<<<< HEAD
// 오늘 할일 웹앱 - Supabase 연동 버전
console.log('오늘 할일 웹앱이 로드되었습니다. (Supabase 연동)');

// Supabase 설정
const SUPABASE_URL = window.SUPABASE_CONFIG?.url || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || 'YOUR_SUPABASE_ANON_KEY';

// Supabase 클라이언트 초기화
let supabase;
try {
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase 클라이언트가 초기화되었습니다.');
    } else {
        console.log('Supabase 설정이 필요합니다. config.js 파일을 확인하세요.');
    }
} catch (error) {
    console.error('Supabase 초기화 실패:', error);
    console.log('로컬 스토리지 모드로 전환합니다.');
}

// 전역 변수
let todos = [];
let currentFilter = 'all';
let currentSort = 'priority';
let currentView = 'list';
let currentPriority = 'high';
let currentCategory = 'work';
let isSupabaseConnected = false;
=======
// 오늘 할일 웹앱 - JavaScript (shadcn/ui New York 스타일)
// 현재는 디자인만 구현된 상태

console.log('오늘 할일 웹앱이 로드되었습니다. (shadcn/ui New York 스타일)');
>>>>>>> parent of aacc3bd (기능구현까지 추가)

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

<<<<<<< HEAD
// Supabase 연결 테스트
async function testSupabaseConnection() {
    if (!supabase) return false;
    
    try {
        const { data, error } = await supabase
            .from('todos')
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('Supabase 연결 테스트 실패:', error);
            return false;
        }
        
        console.log('Supabase 연결 성공!');
        return true;
    } catch (error) {
        console.error('Supabase 연결 테스트 중 오류:', error);
        return false;
    }
}

// Supabase에서 todos 로드
async function loadTodosFromSupabase() {
    if (!supabase) return [];
    
    try {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Supabase에서 데이터 로드 실패:', error);
            return [];
        }
        
        // Supabase 데이터를 앱 형식으로 변환
        return data.map(todo => ({
            id: todo.id,
            text: todo.text,
            completed: todo.completed,
            priority: todo.priority,
            category: todo.category,
            createdAt: new Date(todo.created_at),
            updatedAt: new Date(todo.updated_at)
        }));
    } catch (error) {
        console.error('Supabase 데이터 로드 중 오류:', error);
        return [];
    }
}

// Supabase에 todo 저장
async function saveTodoToSupabase(todo) {
    if (!supabase) return null;
    
    try {
        const { data, error } = await supabase
            .from('todos')
            .insert([{
                text: todo.text,
                completed: todo.completed,
                priority: todo.priority,
                category: todo.category
            }])
            .select()
            .single();
        
        if (error) {
            console.error('Supabase에 데이터 저장 실패:', error);
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Supabase 데이터 저장 중 오류:', error);
        return null;
    }
}

// Supabase에서 todo 업데이트
async function updateTodoInSupabase(todo) {
    if (!supabase) return false;
    
    try {
        const { error } = await supabase
            .from('todos')
            .update({
                text: todo.text,
                completed: todo.completed,
                priority: todo.priority,
                category: todo.category
            })
            .eq('id', todo.id);
        
        if (error) {
            console.error('Supabase에서 데이터 업데이트 실패:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Supabase 데이터 업데이트 중 오류:', error);
        return false;
    }
}

// Supabase에서 todo 삭제
async function deleteTodoFromSupabase(id) {
    if (!supabase) return false;
    
    try {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Supabase에서 데이터 삭제 실패:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Supabase 데이터 삭제 중 오류:', error);
        return false;
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM이 로드되었습니다. 모든 기능을 초기화합니다.');
    
    // Supabase 연결 테스트
    isSupabaseConnected = await testSupabaseConnection();
    
    if (isSupabaseConnected) {
        console.log('Supabase 모드로 실행합니다.');
        // Supabase에서 데이터 로드
        todos = await loadTodosFromSupabase();
    } else {
        console.log('로컬 스토리지 모드로 실행합니다.');
        // 로컬 스토리지에서 데이터 로드
        loadTodos();
    }
=======
// 현재는 샘플 데이터로 디자인만 표시
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM이 로드되었습니다. shadcn/ui New York 스타일 적용 완료');
    
    // 기본 이벤트 리스너들 (기능 구현 시 활성화)
    const addBtn = document.querySelector('button[type="button"]');
    const todoInput = document.querySelector('input[type="text"]');
    const priorityBtns = document.querySelectorAll('[data-priority]');
    const viewBtns = document.querySelectorAll('[data-view]');
>>>>>>> parent of aacc3bd (기능구현까지 추가)
    
    // 우선순위 버튼 클릭 이벤트 (Tailwind CSS 스타일)
    priorityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 모든 우선순위 버튼에서 active 클래스 제거
            priorityBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700');
                b.classList.add('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
            });
            
            // 클릭된 버튼에 active 스타일 적용
            this.classList.remove('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
            this.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        });
    });
    
    // 뷰 전환 버튼 클릭 이벤트 (Tailwind CSS 스타일)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 모든 뷰 버튼에서 active 클래스 제거
            viewBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700');
                b.classList.add('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
            });
            
            // 클릭된 버튼에 active 스타일 적용
            this.classList.remove('border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50');
            this.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        });
    });
    
<<<<<<< HEAD
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
async function addTodo() {
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
    
    if (isSupabaseConnected) {
        // Supabase에 저장
        const savedTodo = await saveTodoToSupabase(todo);
        if (savedTodo) {
            // Supabase에서 반환된 ID로 업데이트
            todo.id = savedTodo.id;
            todos.push(todo);
        } else {
            console.error('Supabase에 저장 실패, 로컬 스토리지에 저장합니다.');
            todos.push(todo);
            saveTodos();
        }
    } else {
        // 로컬 스토리지에 저장
        todos.push(todo);
        saveTodos();
    }
    
    todoInput.value = '';
    renderTodos();
    updateProgress();
    updateStats();
}

// 할일 삭제
async function deleteTodo(id) {
    if (isSupabaseConnected) {
        // Supabase에서 삭제
        const success = await deleteTodoFromSupabase(id);
        if (!success) {
            console.error('Supabase에서 삭제 실패, 로컬에서만 삭제합니다.');
        }
    }
    
    todos = todos.filter(todo => todo.id !== id);
    
    if (!isSupabaseConnected) {
        saveTodos();
    }
    
    renderTodos();
    updateProgress();
    updateStats();
}

// 할일 수정
async function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('할일을 수정하세요:', todo.text);
    if (newText && newText.trim() !== '') {
        todo.text = newText.trim();
        todo.updatedAt = new Date();
        
        if (isSupabaseConnected) {
            // Supabase에서 업데이트
            const success = await updateTodoInSupabase(todo);
            if (!success) {
                console.error('Supabase에서 업데이트 실패, 로컬에서만 업데이트합니다.');
            }
        } else {
            saveTodos();
        }
        
        renderTodos();
    }
}

// 할일 완료 토글
async function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date();
        
        if (isSupabaseConnected) {
            // Supabase에서 업데이트
            const success = await updateTodoInSupabase(todo);
            if (!success) {
                console.error('Supabase에서 업데이트 실패, 로컬에서만 업데이트합니다.');
            }
        } else {
            saveTodos();
        }
        
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
=======
    // 할일 체크박스 클릭 이벤트 (Tailwind CSS 스타일)
>>>>>>> parent of aacc3bd (기능구현까지 추가)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const todoItem = this.closest('[data-priority]');
            const label = todoItem.querySelector('label');
            
            if (this.checked) {
                todoItem.classList.add('opacity-60');
                label.classList.add('line-through', 'text-gray-500');
            } else {
                todoItem.classList.remove('opacity-60');
                label.classList.remove('line-through', 'text-gray-500');
            }
            updateProgress();
        });
    });
    
    // 진행률 업데이트 함수 (Tailwind CSS 스타일)
    function updateProgress() {
        const totalTodos = document.querySelectorAll('[data-priority]').length;
        const completedTodos = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
        
        const progressFill = document.querySelector('.bg-blue-600.rounded-full');
        const progressText = document.querySelector('.text-lg.font-semibold');
        
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }
        if (progressText) {
            progressText.textContent = progressPercentage + '%';
        }
        
        // 통계 업데이트 (Tailwind CSS 스타일)
        const statNumbers = document.querySelectorAll('.text-2xl.font-bold');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = totalTodos;
            statNumbers[1].textContent = completedTodos;
            statNumbers[2].textContent = totalTodos - completedTodos;
        }
    }
    
    // 초기 진행률 설정
    updateProgress();
    
    // Tailwind CSS 스타일의 호버 효과 추가
    const todoItems = document.querySelectorAll('[data-priority]');
    todoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover:bg-gray-50');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover:bg-gray-50');
        });
    });
});
