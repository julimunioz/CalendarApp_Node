/*
    Event Routes
    /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos')
const {validarJWT} = require('../middlewares/validarJWT');
const { isDate } = require('../helpers/isDate');
const {crearEvento, getEvento, actualizarEvento, eliminarEvento} = require('../controllers/eventController');

// Todos los endpoint pasan por validacion de jwt

const router = Router();

router.use(validarJWT);

//Crear eventos
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento)

//Obtener eventos
router.get('/', getEvento)

//Actualizar eventos
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ], 
    actualizarEvento)

//Eliminar eventos
router.delete('/:id', eliminarEvento)

module.exports = router;