import keccak256 from "keccak256";

export function getSaltAsBytes32(salt: string | number) {
  return "0x" + keccak256(salt.toString()).toString("hex");
}
