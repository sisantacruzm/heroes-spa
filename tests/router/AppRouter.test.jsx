import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";

describe( "Pruebas en <AppRouter />", () => {
    test( "debe de mostrar el login si no está autenticado", () => {

        const contextValue = {
            logged: false,
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ [ "/marvel" ] }>

                    <AppRouter/>

                </MemoryRouter>
            </AuthContext.Provider>,
        );

        expect( screen.getAllByText( "Login" ).length ).toBe( 2 );

    } );

    test( "debe de mostrar el componente de marvel si está autenticado", () => {

        const contextValue = {
            logged: true,
            user  : {
                id  : "abc",
                name: "Juan Carlos",
            },
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ [ "/login" ] }>

                    <AppRouter/>

                </MemoryRouter>
            </AuthContext.Provider>,
        );

        // screen.debug();
        expect( screen.getByText( "Marvel Comics" ) ).toBeTruthy();

    } );

} );