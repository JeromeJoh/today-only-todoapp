import './style.css'
import TodoList from "./TodoList";

const weekday: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednseday',
  'Thursday',
  'Friday',
  'Saturday'
]

const month: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

;((doc: Document) => {
  
  const oInput: HTMLInputElement = doc.querySelector('.input');
  const oAddBtn: HTMLElement = doc.querySelector('.add-btn');
  const oTodoList: HTMLElement = doc.querySelector('.todo-list');

  const todoList = TodoList.create(oTodoList);

  const init = () => {
    displayDate();
    bindEvent();
  }

  function displayDate() {
    const oDate: HTMLElement = doc.querySelector('.date');
    const date: Date = new Date();
    oDate.innerText = `${ weekday[date.getDay()]}, ${ date.getDate() + ' ' + month[date.getMonth()] }`;
  }

  function bindEvent() {
    oAddBtn.addEventListener('click', handleAddBtnClick, false);
    oTodoList.addEventListener('click', handleListClick, false);
  }

  function handleAddBtnClick() {
    const val: string = oInput.value.trim();

    if(!val.length) return;

    todoList.addItem({
      id: Date.now(),
      content: val,
      completed: false
    })

    oInput.value = '';
  }

  function handleListClick(e: MouseEvent) {
    const tar = e.target as HTMLElement;
    const tagName = tar.tagName.toLowerCase();
    const className: string = tar.className;

    if(tagName === 'button') {
      const id: number = parseInt(tar.dataset.id);

      switch(className) {
        case 'remove-btn':
          todoList.removeItem(id);
          break;
        case 'checkbox':
          todoList.toggleCompleted(id);
          break;
        default:
          break;
      }
    }
  }

  init();

})(document);