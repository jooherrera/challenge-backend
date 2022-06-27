import { sequelize } from '@Config/sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model {}

User.init(
  {
    user: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  },
  { sequelize, modelName: 'user', timestamps: false }
)

export { User }
