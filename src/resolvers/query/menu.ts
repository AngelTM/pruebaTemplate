import { IResolvers } from "graphql-tools";
import JWT from "../../lib/jwt";

const queryMenu : IResolvers = {
    Query: {
       async menu(_: void, { status }: any, { db, token }) {
            let info: any = new JWT().verify(token);
            //console.log(info)
            if (info === 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token') {
                return []
            }
            const MenuList : Array<any> = [];
            if(parseInt(status) == 0){
                return await db.collection('menu').find().toArray();
            }else{

                const activosres: Array<any> = await db.collection('menu').find().toArray(); 

                for (const key in activosres) {
                   if(activosres[key].status == 0){
                        MenuList.push({
                            id: activosres[key].id,
                            nombre: activosres[key].nombre,
                            img: activosres[key].img,
                            status: activosres[key].status,
                            registerDate: activosres[key].registerDate
                        })
                   }
                }
                //console.log(MenuList)
                return MenuList;
            }
        }
    }
}

export default queryMenu;