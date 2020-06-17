/** 2 => false */
function isPrime(N) {
  if(N % 2 == 0) {
    return false;
  }
  const L = Math.ceil(N / 6) - 1;
  let t = false;
  for(let i = 0; i < L; i++) {
    const B = (i * 4) + 6;
    const Q = (N / B) % 0.5;
    const j = Math.floor(N / B) - 1;
    t = Q == 0;
    if(t || i >= j) {
      break
    }
  }
  return !t;
}

function onClickCheck() {
  const verify = document.querySelector('#verify');
  verify.style.display = "none";
  const input = document.querySelector('#number');
  const number = input.value
  const result = isPrime(number)
  verify.style.display = "block";
  if(result) {
    verify.href = `https://www.wolframalpha.com/input/?i=${number}+is+prime+number`
    verify.innerHTML = `Yes, [${number}] is a prime number, verify it.`;
  } else {
    verify.href = `https://www.wolframalpha.com/input/?i=${number}`
    verify.innerHTML = `[${number}] is not a prime number.`;
  }
  input.focus();
}

window.onload = function() {



  // const container = document.querySelector('#container');
  // for(let N = 9; N < 1000; N+=2) {
  //   const R = isPrime(N);
  //   const div = document.createElement('div');
  //   if(R) {
  //     div.innerHTML = `<div class="restuls"><div class="number prime">${N}</div><a class="check" href="https://www.wolframalpha.com/input/?i=${N}+is+prime+number" target="_blank">check it up</a></div>`;
  //   } else {
  //     div.innerHTML = `<div class="restuls"><div class="number odd-composite">${N}</div></div>`;
  //   }
  //   container.append(div);
  // }
}
