import { Personaje } from '@Personaje/personaje.model'
import { Pelicula } from '@Pelicula/pelicula.model'
import { Genero } from '@Genero/genero.model'

Personaje.belongsToMany(Pelicula, { through: 'personaje_pelicula' })
Pelicula.belongsToMany(Personaje, { through: 'personaje_pelicula' })

Pelicula.belongsToMany(Genero, { through: 'pelicula_genero' })
Genero.belongsToMany(Pelicula, { through: 'pelicula_genero' })
