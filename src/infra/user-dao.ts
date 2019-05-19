import { User } from '../schemas/User'
import { UserInterface } from '../interfaces/User'

class UserDao {
  public async create (user:UserInterface) : Promise<UserInterface> {
    // Save user
    const newUser = await new User({
      userName: user.userName,
      name: user.name,
      email: user.email,
      password: user.password
    }).save()

    return newUser
  }

  public async findByUsername (userName:string) : Promise<UserInterface> {
    const user = await User.findOne({ userName })
    return user
  }
}

export default UserDao
