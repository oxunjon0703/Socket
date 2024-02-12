import bcrypt from "bcrypt";

export async function hashPassword(data) {
  return await bcrypt.hash(data, 10);
}

export async function verifyPassword(data, hashData) {
  return await bcrypt.compare(data, hashData);
}
