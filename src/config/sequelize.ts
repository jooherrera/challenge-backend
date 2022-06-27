import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${process.cwd()}/database/database.sqlite`,
  logging: false,
})

const connect = async (force = false) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { connect, sequelize }
