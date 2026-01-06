import { TOKENS } from "./tokens";

class Lexer {
  #input;
  constructor(input = "") {
    this.#input = input + "$";
  }

  tokenize() {
    let tokens = [];
    let i = 0;

    while (i < this.#input.length) {
      let rest = this.#input.slice(i);
      let matched = false;

      for (const token of Object.values(TOKENS)) {
        let regex = new RegExp(token.value);
        let m = regex.exec(rest);
        if (m && m.index === 0) {
          tokens.push({ type: token.name, value: m[0] });
          i += m[0].length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        throw new Error(
          `Unexpected character at position ${i}: '${this.#input[i]}'`
        );
      }
    }

    return tokens;
  }
}
