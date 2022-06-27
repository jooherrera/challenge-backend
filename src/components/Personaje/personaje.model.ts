import { sequelize } from '@Config/sequelize'
import { DataTypes, Model } from 'sequelize'

class Personaje extends Model {}

Personaje.init(
  {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.REAL,
    },
    historia: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    pelicula_ID: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'personaje', timestamps: false }
)

export { Personaje }
