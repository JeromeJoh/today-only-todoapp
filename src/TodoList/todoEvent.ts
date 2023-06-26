import { ITodo } from ".";

let todoData: ITodo[] = [];

export function addTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
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
    _origin.call(this, todo);
  };
}

export function removeTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value;

  descriptor.value = function (id: number) {
    todoData = todoData.filter((todo) => todo.id !== id);
    _origin.call(this, id);
  };
}

export function changeCompleted(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const _origin = descriptor.value;

  descriptor.value = function (id: number) {
    todoData = todoData.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });

    _origin.call(this, id);
  };
}
