const Storage = (() => {
  const storageAvailable = () => {
    try {
      let storage = window['localStorage'],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  const saveFunction = (addr, obj) => {
    if (storageAvailable()) {
      let data = JSON.stringify(obj)
      localStorage.setItem(addr, data)
    }
  }

  const loadFunction = addr => {
    let data
    if (storageAvailable() && (data = localStorage.getItem(addr))) {
      let project = JSON.parse(data)
      return project
    }
  }

  const save = project => saveFunction(`to-do.project-${project.id}`, project)

  const load = projectId => loadFunction(`to-do.project-${projectId}`)

  const destroy = projectId => {
    if (storageAvailable()) localStorage.removeItem(`to-do.project-${projectId}`)
  }

  const saveIndex = (model, index) => saveFunction(`to-do.${model}-index`, index)

  const loadIndex = model => loadFunction(`to-do.${model}-index`)

  const saveMeta = meta => saveFunction(`to-do.meta`, meta)

  const loadMeta = () => loadFunction(`to-do.meta`)

  const saveLastOpen = openProjectId => saveFunction(`to-do.open`, openProjectId)

  const loadLastOpen = () => loadFunction(`to-do.open`)

  return { save, load, saveIndex, loadIndex, saveMeta, loadMeta, destroy, saveLastOpen, loadLastOpen }
})()

export default Storage
