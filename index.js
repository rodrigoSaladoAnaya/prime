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
  const goExplain = document.querySelector('#goExplain');
  goExplain.innerHTML = 'Explain it with a sieve.';
  goExplain.disabled = false;
  
  const sieve = document.querySelector('#sieve');
  sieve.innerHTML = '';
  const verify = document.querySelector('#verify');
  verify.style.display = "none";
  const input = document.querySelector('#number');
  const number = input.value
  const result = isPrime(number)
  verify.style.display = "block";
  if(result) {
    verify.href = `https://www.wolframalpha.com/input/?i=${number}+is+prime+number`
    verify.innerHTML = `Yes, ${number} is a prime number, verify it.`;
  } else {
    verify.href = `https://www.wolframalpha.com/input/?i=${number}`
    verify.innerHTML = `${number} is not a prime number.`;
  }
  input.focus();
}

function getTree(N) {
  const tree = [];
  const L = Math.ceil(N / 6) - 1;
  for(let i = 0; i < L; i++) {
    const B = (i * 4) + 6;
    const Q = (N / B) % 0.5;
    const j = Math.floor(N / B) - 1;
    const F = (2 * i + 3) * (2 * j + 3);
    if(Q == 0 && F == N) {
      tree.push(i);
    } else {
      tree.push('.');
    }
  }
  return tree;
}

function onClickExplain() {
  const number = document.querySelector('#number').value;
  if(number > 1000) {
    var r = confirm("The number is too big, your browser can be blocked.");
    if (!r) {
      return;
    }
  }

  const sieve = document.querySelector('#sieve');
  sieve.innerHTML = '';

  const goExplain = document.querySelector('#goExplain');
  goExplain.innerHTML = 'Generating sieve...';
  goExplain.disabled = true;

  for(let i = 9; i <= number; i+=2) {
    const tree = getTree(i);
    const isPrime = tree.every(n => n == '.');
    const node = document.createElement('div');
    node.classList.add('node');
    const index = document.createElement('div');
    index.classList.add('index');
    index.innerHTML = `${i}`;
    index.classList.add(isPrime? 'is-prime' : 'is-odd-composite');
    node.append(index);
    tree.forEach((item, i) => {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf');
      leaf.innerHTML = `${item}`;
      if(item != '.') {
        leaf.classList.add('point');
      }
      node.append(leaf);
    });
    sieve.append(node);
  }
  goExplain.innerHTML = 'Is ready.';
}
