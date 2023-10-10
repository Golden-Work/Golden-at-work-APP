import { toast } from "react-toastify"

const verifyPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return false
  }

  const errors = []

  // at least 8 characters
  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres")
  }

  // at least one number, one lowercase and one uppercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe tener al menos una letra minúscula")
    return
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe tener al menos una letra mayúscula")
    return
  }

  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe tener al menos un número")
    return
  }

  // show al errors (if any)
  if (errors.length) {
    errors.forEach((error) => toast.error(error))
    return false
  }

  return true
}

export default verifyPassword
