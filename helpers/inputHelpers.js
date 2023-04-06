const readline = require('readline');

const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

function waitForInput() {
  return new Promise((resolve) => {
    rl.question('Aby kontynuować wciśnij ENTER, aby zamknąć - CTRL+C ', (answer) => {
      resolve()
    });
  })
}

function waitForFileName() {
  return new Promise((resolve) => {
    rl.question('Wpisz nazwę pliku (bez rozszerzenia): ', (answer) => {
      resolve(answer)
    });
  })
}

function waitForIndex() {
  return new Promise((resolve) => {
    rl.question('Wpisz indeks początkowy (od 1): ', (answer) => {
      if (answer > 0) { resolve(answer - 1) }
      else { resolve(0) }
    });
  })
}

function waitForMode() {
  return new Promise((resolve) => {
    rl.question('Wybierz wariant - 0.manualny 1.automatyczny: ', (answer) => {
      if (answer != '0') { resolve(1) }
      else { resolve(0) }
    });
  })
}

function waitForRange() {
  return new Promise((resolve) => {
    rl.question('Wybierz zakres - 0.jeden dzień 1.pięć dni kalendarzowych: ', (answer) => {
      if (answer != '1') { resolve(false) }
      else { resolve(true) }
    });
  })
}

function closeRL() {
  rl.close();
}

module.exports = { waitForInput, waitForFileName, waitForIndex, waitForMode, waitForRange, closeRL }