import { ITodo } from ".";
import todoItem, { emptyTip } from "./template";

let todoData: ITodo[];
let oTodoWrapper: HTMLElement;
const emptyTipString: string = emptyTip('No tasks in your list now !');

function saveToLocal(): void {
  localStorage.setItem('TodoAppData', JSON.stringify(todoData));
}

export function renderList(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;
  todoData = JSON.parse(localStorage.getItem('TodoAppData') || '[]');

  descriptor.value = function (oTodoList: HTMLElement) {
    _origin.call(this, oTodoList);

    oTodoWrapper = oTodoList;

    if(todoData.length === 0) {
      oTodoList.innerHTML = emptyTipString;
      return;
    }

    const oFragment = document.createDocumentFragment();
    todoData.map((todoDatum) => oFragment.appendChild(todoItem(todoDatum)));
    oTodoList.appendChild(oFragment);
  };
}

export function addTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;

  descriptor.value = function (todo: ITodo) {
    const _item: ITodo | null = todoData.find(
      (t) => t.content === todo.content
    );

    if (_item) {
      alert("请勿重复创建任务");
      return;
    }

    todoData.push(todo);
    saveToLocal();
    
    if(todoData.length === 1) oTodoWrapper.innerHTML = '';

    _origin.call(this, todo);
  };
}

export function removeTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;

  descriptor.value = function (id: number) {
    todoData = todoData.filter((todo) => todo.id !== id);
    saveToLocal();

    if(todoData.length === 0) oTodoWrapper.innerHTML = emptyTipString;

    _origin.call(this, id);
  };
}

export function changeCompleted(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;

  descriptor.value = function (id: number) {
    todoData = todoData.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    saveToLocal();

    _origin.call(this, id);
  };
}
