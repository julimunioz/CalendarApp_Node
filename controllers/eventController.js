const {response} = require('express');
const Evento = require('../models/Evento');

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        
        const eventoDB = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoDB
        })
        
    } catch (error) {
        
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
};

const getEvento = async (req, res = response) => {

    try {
        
        const eventos = await Evento.find().populate('user', 'name'); 
        
        res.json({
            ok: true,
            eventos
        })
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            eventoActualizado
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: `Se elimino el evento`
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

module.exports = {crearEvento, getEvento, actualizarEvento, eliminarEvento};