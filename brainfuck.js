// From https://github.com/DanielBaulig/brainfuck.js

function Brainfuck(code) {
  this.code = code;
  this.ip = 0;
  this.p = 0;
  this.data = [];
  this.loopstack = [];
}

Brainfuck.prototype.run = function(instructions) {
  instructions = instructions || Infinity;
  var nextInstruction = this.code[this.ip];
  while(instructions-- && nextInstruction) {
    switch(nextInstruction) {
      case '+':
        this.data[this.p] = (this.data[this.p] || 0) + 1;
        break;
      case '-':
        this.data[this.p] = (this.data[this.p] || 0) - 1;
        break;
      case '<':
        this.p--;
        break;
      case '>':
        this.p++;
        break;
      case '.':
        this.write(this.data[this.p] || 0);
        break;
      case ',':
        this.data[this.p] = this.read();
        break;
      case '[':
        var openBrackets = 1;
        if (this.data[this.p]) {
          this.loopstack.push(this.ip);
        } else {
          while (openBrackets && this.code[++this.ip]) {
            if (this.code[this.ip] === ']') {
              openBrackets--;
            } else if (this.code[this.ip] === '[') {
              openBrackets++;
            }
          }
        }
        break;
      case ']':
        this.ip = this.loopstack.pop() - 1;
        break;
      default:
        if (console) console.log('Warning: invalid brainfuck instruction ' + nextInstruction);
        break;
    }
    nextInstruction = this.code[++this.ip];
  }
};

Brainfuck.prototype.read = function() {
};

Brainfuck.prototype.write = function(data) {
};
