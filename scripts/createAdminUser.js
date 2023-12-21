const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user');

async function createAdminUser() {
  try {
    const adminUser = {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'Admin123',
      isAdmin: true,
      verified: true
    };

    const existingAdmin = await User.findOne({ email: adminUser.email });

    if (!existingAdmin) {
      const newAdmin = new User(adminUser);
      await newAdmin.save();
      console.log('Usuario administrador creado con éxito.');
    } else {
      console.log('El usuario administrador ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
}

// Conectar a la base de datos y luego llamar a la función
async function runScript() {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);

    // Llamar a la función para crear el usuario administrador
    await createAdminUser();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  } finally {
    // Cerrar la conexión después de ejecutar la operación
    mongoose.connection.close();
  }
}

// Ejecutar el script
runScript();
