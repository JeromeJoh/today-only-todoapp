import todoItem from "./template";
import { renderList, addTodo, removeTodo, changeCompleted } from "./todoEvent";

export interface ITodo{
  id: number;
  content: string;
  completed: boolean;
}

class TodoList {

  private static instance: TodoList;
  private oTodoList: HTMLElement;

  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList;
    this.renderList(oTodoList);
  }

  @renderList
  private renderList(oTodoList: HTMLElement) {
    
  }

  public static create(oTodoList: HTMLElement) {
    if(!TodoList.instance) TodoList.instance = new TodoList(oTodoList);

    return TodoList.instance;
  }

  @addTodo
  public addItem(todo: ITodo) {
    this.oTodoList.appendChild(todoItem(todo));
  }

  @removeTodo
  public removeItem(id: number) {
    const oTodoItems: HTMLCollection = document.getElementsByClassName('todo-item');

    [...oTodoItems].forEach(oItem => {
      const _id: number = parseInt(oItem.querySelector('button').dataset.id);

      if(_id === id) oItem.remove();
    })
  }

  @changeCompleted
  public toggleCompleted(id: number) {
    const oTodoItems: HTMLCollection = document.getElementsByClassName('todo-item');

    [...oTodoItems].forEach(oItem => {
      const oCheckbox: HTMLElement = oItem.querySelector('.checkbox');
      const _id: number = parseInt(oCheckbox.dataset.id);

      if(_id === id) {
        const oContent: HTMLElement = oItem.querySelector('.taskname');
        const oSlash: HTMLElement = oItem.querySelector('.slash');
        const oCheckbox: HTMLElement = oItem.querySelector('.checkbox');

        const completed: boolean = oCheckbox.style.border === 'none';

        oContent.style.color = completed ? 'var(--black-color)' : 'var(--gray-color)';
        oSlash.style.bottom = completed ? '-0.2rem' : '50%';
        oCheckbox.style.border = completed ? '1px solid var(--gray-color)' : 'none';
        oCheckbox.style.backgroundImage = completed ? 'initial' : 'url(./src/assets/images/complete.png)';
      };
    })
  }
}

export default TodoList;