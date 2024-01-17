// Middleware para verificar la autenticación del usuario
function verificarAutenticacion(req, res, next) {
    if (req.session.userId) {
      // El usuario está autenticado
      next();
    } else {
      res.status(401).json({ error: 'Acceso no autorizado' });
    }
  }
  
  module.exports = { verificarAutenticacion };