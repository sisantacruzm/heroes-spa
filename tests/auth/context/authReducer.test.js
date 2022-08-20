import { authReducer, types } from "../../../src/auth";

describe( "Pruebas authReducer", () => {

    test( "debe retornar el estado por defecto", () => {

        const state = authReducer( { logged: false }, {} );
        expect( state ).toEqual( { logged: false } );

    } );

    test( "debe el (login) llamar el login autentica y establecer el user", () => {

        const action = {
            type: types.login, payload: {
                name: "Juan", id: "123",
            },
        };

        const state = authReducer( { logged: false }, action );
        expect( state ).toEqual( {
            logged: true, user: action.payload,
        } );

    } );

    test( "debe de (logout) borrar el anme del usuario y logged in false", () => {

        const state = {
            logged: true, user: { id: "123", name: "Juan" },
        };

        const action = {
            type: types.logout,
        };

        const newState = authReducer( state, action );
        expect( newState ).toEqual( { logged: false } );

    } );

} );