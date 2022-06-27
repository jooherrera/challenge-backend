import { sequelize } from '@Config/sequelize'
import { DataTypes, Model } from 'sequelize'

class Pelicula extends Model {}

Pelicula.init(
  {
    titulo: {
      type: DataTypes.STRING,
    },
    fecha_creacion: {
      type: DataTypes.INTEGER,
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    personaje_ID: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'pelicula', timestamps: false }
)

export { Pelicula }
