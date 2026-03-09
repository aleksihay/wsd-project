import { hash } from "scrypt";

const hashedPassword = hash("saippuakivikauppias")
console.log(hashedPassword);