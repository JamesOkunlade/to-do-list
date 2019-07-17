const DOMLibrary = (() => {
  const find = selector => document.querySelector(selector)

  const findAll = selector => document.querySelectorAll(selector)

  const findAncestor = (obj, ancestorClass) => {
    let ancestor = obj
    while (ancestor.parentElement && !ancestor.classList.contains(ancestorClass)) {
      ancestor = ancestor.parentElement
    }
    return ancestor
  }

  const createText = text => document.createTextNode(text)

  const create = (tag, options = { id: null, classes: null, text: null }) => {
    let element = document.createElement(tag)
    if (options) addProperties(element, options)
    return element
  }

  const addProperties = (element, options) => {
    addOtherProperties(element, options)
    addId(element, options.id)
    addClasses(element, options.classes)
    addText(element, options.text)
  }

  const addOtherProperties = (element, options) => {
    Object.entries(options).forEach(([k,v]) => {
      if (k !== "classes" && k !== "text" && k !== "id")
        element[k] = v
    })
  }

  const addId = (element, id) => {
    if (id) element.id = id
  }

  const addText = (element, text) => {
    if (text) element.appendChild(createText(text))
  }

  const addClasses = (element, classes) => {
    if (classes && Array.isArray(classes))
      element.classList.add(...classes)
    else if (classes && typeof classes === "string") {
      let classesArr = classes.split(" ")
      element.classList.add(...classesArr)
    }
  }

  const attachEvent = (selector, func, action = 'click', dynamic = false) => {
    if (!dynamic)
      find(selector).addEventListener(action, func)
    else
      document.addEventListener(action, e => {
        if (e.target && e.target.classList.contains(selector.substring(1, selector.length)))
          func(e)
      })
  }

  const append = (element, childrenArr) => childrenArr.forEach(child => element.appendChild(child))

  return { find, findAll, findAncestor, createText, create, attachEvent, append }
})()

export default DOMLibrary
