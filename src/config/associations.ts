import { Personaje } from '@Personaje/personaje.model'
import { Pelicula } from '@Pelicula/pelicula.model'

Personaje.belongsToMany(Pelicula, { through: 'personaje_pelicula' })
Pelicula.belongsToMany(Personaje, { through: 'personaje_pelicula' })
