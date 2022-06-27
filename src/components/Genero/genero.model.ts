import { sequelize } from '@Config/sequelize'
import { DataTypes, Model } from 'sequelize'

class Genero extends Model {}

Genero.init(
  {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'Genero', timestamps: false }
)

export { Genero }
