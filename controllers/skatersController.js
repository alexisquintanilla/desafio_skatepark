import { skaterModel } from "../models/skatersModel.js"
import path from 'path';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const __dirname = import.meta.dirname
const pathFile = path.join(__dirname, "../public")


export const getLogin = (req, res) => {
    res.render('login')
}

export const getRegister = (req, res) => {
    res.render('registro')
}

export const registrar = async (req, res) => {
    try {

        const { email, nombre, password, experiencia, especialidad, estado } = req.body

        if (!email || !nombre || !password || !especialidad) {
            return res.status(400).json({ error: 'Faltan campos' })
        }

        const user = await skaterModel.findOneByEmail(email)

        if (user) {
            return res.status(400).json({ error: 'El Usuario o email ya esta registrado' })
        }

        if (!req.files || !req.files.foto_file) {
            return res.status(400).send({ message: 'No se cargo ningún archivo.' });
        }
        const { foto_file } = req.files
        const dir_foto = `/assets/img/${nombre}.jpg`
        foto_file.mv(path.join(pathFile, dir_foto))

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const skater = await skaterModel.createSkater({ email, nombre, password: hashedPassword, experiencia, especialidad, dir_foto, estado: true })

        if (!skater) {
            return res.status(400).json({ error: 'No se pudo registrar el usuario' })
        }

        const userNew = await skaterModel.findOneByEmail(email)

        const token = jwt.sign({
            email: skater.email
        },
            process.env.SECRET_KEY
        )

        res.render('login', { skater: userNew, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al registrar el usuario' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const skater = await skaterModel.findOneByEmail(email)

        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan campos' })
        }

        const user = await skaterModel.findOneByEmail(email)

        if (!user) {
            return res.status(400).json({ error: 'El Usuario no existe' })
        }

        const isMatch = await bcryptjs.compare(password, skater.password)

        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' })
        }

        const token = jwt.sign({
            email: skater.email
        },
            process.env.SECRET_KEY
        )

        res.render('datos', { skater })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al loguear el usuario' })
    }
}

export const updateSkater = async (req, res) => {
    try {
        const { email, nombre, password, experiencia, especialidad } = req.body


        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const skater = await skaterModel.updateSkater({ email, nombre, password: hashedPassword, experiencia, especialidad })

        res.render('datos', { skater: skater })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al actualizar el usuario' })
    }
}

export const deleteUSer = async (req, res) => {
    try {
        const { email } = req.query
        await skaterModel.deleteUser(email)
        res.render('login')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al eliminar el usuario' })
    }
}

export const getAdmin = async (req, res) => {
    try {
        const skaters = await skaterModel.getSkaters()
        res.render('admin', { skater: skaters })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al obtener los usuarios' })
    }
}

export const skaterController = {
    getLogin,
    getRegister,
    registrar,
    login,
    getAdmin,
    updateSkater,
    deleteUSer
}