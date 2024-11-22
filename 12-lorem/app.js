const text = [
  `111Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `222Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `333Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `444Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `555Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `666Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `777Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `888Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `999Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`,
  `1000Donec imperdiet metus in lorem mattis, hendrerit venenatis arcu aliquet. Pellentesque varius efficitur convallis. Proin faucibus enim vel vestibulum viverra. Maecenas libero lacus, fermentum sed erat porta, laoreet rutrum ipsum. Maecenas eu eros semper, pharetra lorem et, bibendum neque. Cras scelerisque purus aliquet condimentum laoreet. In hac habitasse platea dictumst.`
];

const form = document.querySelector(".lorem-form");
const amount = document.getElementById("amount");
const result = document.querySelector(".lorem-text");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = parseInt(amount.value);
  const random = Math.floor(Math.random() * text.length);

  if(isNaN(value) || value < 1 || value > 10) {
    result.innerHTML = `<p class="result">Wrong Number!!</p>`;
  } else {
    let tempText = text.slice(0, value);
    tempText = tempText.map((item) => {
      return `<p class="result">${item}</p>`;
    }).join("");

    result.innerHTML = tempText;
  }
})