const items = document.querySelectorAll(".number");

items.forEach((item) => {
  const value = parseInt(item.dataset.value);
  const increasement = Math.ceil(value / 1000);

  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += increasement;
    if (initialValue > value) {
      item.textContent = `${value}`;
      clearInterval(increaseCount);
      return;
    }

    item.textContent = `${initialValue}`;
  }, 0.01)
})