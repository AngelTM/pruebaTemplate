import { IResolvers } from 'graphql-tools';
import { Datetime } from '../../lib/original';
import JWT from "../../lib/jwt";
const mutationMenu: IResolvers = {
    Mutation: {
        async registraMenu(_: void, { menu }, { db, token }): Promise<any>{
            let info: any = new JWT().verify(token);
            //console.log(info)
            if (info === 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token') {
                return {
                    status: true,
                    message: `Nesesita volver a iniciar sesión`,
                    
                };
            }else{
                const lastUser = await db.collection('menu').find()
                .limit(1).sort({ registerDate: -1 }).toArray();
                if (lastUser.length === 0) {
                    menu.id = 1;
                } else {
                    menu.id = lastUser[0].id + 1;
                }
                menu.registerDate = new Datetime().getCurrentDateTime();
                return await db.collection('menu').insertOne(menu)
                .then((result: any) => {
                    return {
                        status: true,
                        message: `Menu agregado añadido correctamente`,
                        
                    };
                })
                .catch((err: any) => {
                    return {
                        status: false,
                        message: `Ha ocurrido un erro al grabar`,
                        
                    };
                });
            }
            
        }
    }
}

export default mutationMenu;