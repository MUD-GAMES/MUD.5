export let onNavigate = (path) => {
	window.history.pushState({}, path, window.location.origin + path)
	window.history.pushState({}, path, window.location.origin + path)
	window.history.forward()
	window.history.back()
	window.history.forward()
}
