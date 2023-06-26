import { ITodo } from ".";

export default function todoView({ id, content, completed }: ITodo): string {
  return `
  <button class="checkbox" style="border: 1px solid var(--gray-color);background-image: initial" data-id="${ id }"></button>
    <p class="content">
      <span class="taskname" style="color: ${ completed ? 'var(--gray-color)' : 'var(--black-color)'}">${ content }</span>
      <span class="slash" style="bottom: -0.2rem"></span>
    </p>
    <button class="remove-btn" data-id="${ id }"></button>
  `
}