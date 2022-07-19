import {v4 } from 'uuid'
type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTask();
tasks.forEach(task => addListItem(task))
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == null || input?.value === '') return;

  const task: Task = {
    id: v4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(task)
  addListItem(task)
  input.value = ''
})


function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
  })
  saveTask();
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTask() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTask(): Task[] {
  const tasksJSON = localStorage.getItem('TASKS');
  if (tasksJSON == null) return [];
  return JSON.parse(tasksJSON)
}