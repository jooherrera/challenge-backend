import { sequelize } from '@Config/sequelize'
import { DataTypes, Model } from 'sequelize'

class Pelicula extends Model {}

Pelicula.init(
  {
    titulo: {
      type: DataTypes.STRING,
      unique: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'pelicula', timestamps: false }
)

export { Pelicula }
