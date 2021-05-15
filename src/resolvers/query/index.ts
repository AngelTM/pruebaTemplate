import GMR from "graphql-merge-resolvers";
import queryMenu from "./menu";
import queryUsers from "./users";
const queryResolvers = GMR.merge(
    [ queryUsers, queryMenu ]
);

export default queryResolvers;