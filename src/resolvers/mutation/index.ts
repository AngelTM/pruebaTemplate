import GMR from "graphql-merge-resolvers";
import mutationMenu from "./menu";
import mutationUsers from "./users";

const mutationResolvers = GMR.merge(
    [ 
        mutationUsers, 
        mutationMenu
    ]
);

export default mutationResolvers;