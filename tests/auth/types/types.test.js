import { types } from "../../../src/auth";

describe( "Pruebas en \"Types\"", () => {

    test( "debe de regresar estos types", () => {

        expect( types ).toEqual( {
            login : "[AUTH] Login",
            logout: "[AUTH] Logout",
        } );

    } );
    
} );