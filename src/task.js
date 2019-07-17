import Storage from "./storage"

const getIndex = () => {
  let index = Storage.loadIndex("task")
  Storage.saveIndex("task", index + 1)
  return index
}

const Task = (projectId, name, desc, dueDateString, priority, complete = false) => {
  const id = getIndex()

  const dueDate = new Date(dueDateString)

  return { id, name, desc, dueDate, priority, complete, projectId }
}

export default Task
