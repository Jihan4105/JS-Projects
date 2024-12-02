export default function removeActive (btnContainers) {
  const btn = []

  btnContainers.forEach((button) => {
    button.classList.remove("active");
  })
}