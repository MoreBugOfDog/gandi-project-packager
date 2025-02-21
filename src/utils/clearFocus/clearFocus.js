function onElementFocused(e) {
  if (e && e.target)
    document.activeElement = e.target == document ? null : e.target;
}
const clearFocus = () => {
  if (document.addEventListener)
    document.addEventListener("focus", onElementFocused, true);
};

export default clearFocus;
