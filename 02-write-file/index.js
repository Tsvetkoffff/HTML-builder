const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const text = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
const rl = readline.createInterface({ input, output });

const close = () => {
  rl.write('Thank you, goodbye!');
  rl.pause();
};

const start = (message) => {
  rl.write(`${message}: \n`);
  rl.on('line', (data) => {
    if (data.trim() === 'exit') {
      close();
    }
    text.write(`${data}\n`, (error) => {
      if (error) throw error;
    });
  });

  rl.on('SIGINT', close);
};

start('Enter some text, please');
