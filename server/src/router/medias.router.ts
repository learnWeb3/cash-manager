import express from 'express';
import { mediasController } from '../controllers';
import { bearerTokenHandler } from '../services/middlewares';
import multer from 'multer';
import { join } from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(process.cwd(), 'public', 'tmp'))
    }
})

const upload = multer({ storage: storage })

const mediasRouter = express.Router();

mediasRouter
    .use(bearerTokenHandler)
    .post('/', upload.single('media'), mediasController.register)
    .get('/', mediasController.getMany)
    .get('/:id', mediasController.getOne)

export default mediasRouter;