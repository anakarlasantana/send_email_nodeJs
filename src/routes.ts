import {Router, Request, Response} from 'express'

import { saveUser, login, forgotPassword,} from './controller/UserController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ menssage: 'Server rodando!'})
})

routes.post('/users', saveUser);
routes.post('/login', login);
routes.post('/forgot_password', forgotPassword);



export default routes;