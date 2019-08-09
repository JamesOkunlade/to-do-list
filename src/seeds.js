import Storage from "./storage"

const Seeds = (() => {
  const meta = () => {
    const data =
      [
       `{"id":1,"name":"Projec one","tasks":[{"id":2,"name":"Task one","desc":"Do","dueDate":"2019-08-14T00:00:00.000Z","priority":2,"complete":false,"projectId":1}]}`
      ]

    const projects = data.map(m => JSON.parse(m))
    projects.forEach(p => Storage.save(p))

    const meta = projects.map(p => { return { id: p.id, name: p.name } })
    Storage.saveMeta(meta)
    return meta
  }

  const projectId = () => {
    return 5
  }

  const taskId = () => {
    return 11
  }

  return { meta, projectId, taskId }
})()

export default Seeds
