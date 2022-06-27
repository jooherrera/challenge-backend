import { sequelize } from '@Config/sequelize'
import { DataTypes } from 'sequelize'

const User = sequelize.define('User', {
  user: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
})

export { User }
