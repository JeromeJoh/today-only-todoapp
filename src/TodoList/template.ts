import { ITodo } from ".";

export default function todoItem({
  id,
  content,
  completed,
}: ITodo): HTMLElement {
  const oItem: HTMLElement = document.createElement("div");
  oItem.className = "todo-item";
  oItem.innerHTML = `
    <button class="checkbox" style="border: ${completed ? 'none' : '1px solid var(--gray-color)' };background-image: ${ completed ? 'url(./src/assets/images/complete.png)' : 'initial'}" data-id="${ id }"></button>
    <p class="content">
      <span class="taskname" style="color: ${
          completed ? "var(--gray-color)" : "var(--black-color)"
        }">${content}</span>
      <span class="slash" style="bottom: ${ completed ? '50%' : '-0.2rem' }"></span>
    </p>
    <button class="remove-btn" data-id="${ id }"></button>
    `;
  return oItem;
}

export function emptyTip(text: string): string {
  return `
    <div class="empty-tip">${ text }</div>
  `
}