import { boomify } from '@hapi/boom'
import { Personaje } from '@Personaje/personaje.model'
import { IPersonajeService } from '@Types'

export class PersonajeService implements IPersonajeService {
  constructor() {}

  async createPersonaje(p: any): Promise<void> {
    try {
      await Personaje.create(p)
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boomify(new Error('Ya existe el personaje'), { statusCode: 400 })
      }
    }
  }
}
