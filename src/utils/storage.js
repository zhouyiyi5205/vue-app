const prefix = 'wpg_'

function get (name) {
  const _value = window.localStorage.getItem(prefix + name)
  return _value ? JSON.parse(window.unescape(window.atob(_value))) : null
}

function set (name, value) {
  const _value = value ? window.btoa(window.escape(JSON.stringify(value))) : null
  return window.localStorage.setItem(prefix + name, _value)
}

function remove (name) {
  return window.localStorage.removeItem(prefix + name)
}

export default {
  get,
  set,
  remove
}
