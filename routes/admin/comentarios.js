var express = require('express');
var router = express.Router();
var comentariosModel = require('../../models/comentariosModel');

router.get('/', async function (req, res, next) {

    var comentarios = await comentariosModel.getComentarios();

    res.render('admin/comentarios', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        comentarios
    });
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.fecha != "" && req.body.titulo != "" && req.body.comentario != "" && req.body.valoracion != "") {
            await comentariosModel.insertComentario(req.body);
            res.redirect('/admin/comentarios')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, message: 'No se cargó el comentario'
        });
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await comentariosModel.deleteComentarioById(id);
    res.redirect('/admin/comentarios')
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var comentario = await comentariosModel.getComentarioById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        comentario
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            fecha: req.body.fecha,
            titulo: req.body.titulo,
            comentario: req.body.comentario,
            valoracion: req.body.valoracion
        }

        await comentariosModel.modificarComentarioById(obj, req.body.id);
        res.redirect('/admin/comentarios');
    }
    catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, message: 'No se modificó el comentario'
        });
    }
});


module.exports = router;