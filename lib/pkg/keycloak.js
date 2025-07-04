import Keycloak from "keycloak-js";

const keycloak =
    typeof document !== "undefined"
        ? new Keycloak({
            url: "http://localhost:8080",
            realm: "auth-demo",
            clientId: "admin-client",
        })
        : null;

export default keycloak;