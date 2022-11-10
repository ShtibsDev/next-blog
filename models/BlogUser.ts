import { User } from 'firebase/auth'

export default interface BlogUser extends User {
  readonly username: string
}
