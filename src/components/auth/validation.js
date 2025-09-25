export function checkValidation(email, password, setStatus, setError) {
  if (typeof email !== "string" || !email.includes("@")) {
    setStatus("error");
    setError("your email is not valid.");
    return false;
  }

  if (typeof password !== "string") {
    setStatus("error");
    setError("you password is not valid.");
    return false;
  }

  if (password.length < 4) {
    setStatus("error");
    setError("you password is short 4 letter or more.");
    return false;
  }

  return true;
}
