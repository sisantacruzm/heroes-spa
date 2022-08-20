import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock( "react-router-dom", () => ( {
    ...jest.requireActual( "react-router-dom" ),
    useNavigate: () => mockedUseNavigate,
} ) );

describe( "Pruebas en <Navbar />", () => {

    beforeEach( () => jest.clearAllTimers() )

    const contextValue = {
        logged: true,
        user  : {
            id  : "abc",
            name: "Juan Carlos",
        },
        logout: jest.fn(),
    };

    test( "debe de mostrar el nombre del usuario", () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ [ "/marvel" ] }>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>,
        );
        expect( screen.getByText( contextValue.user.name ) ).toBeTruthy();

    } );

    test( "debe de llamar el logout y navigate cuando se hace click en el botón ", () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ [ "/marvel" ] }>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>,
        );

        const logoutBtn = screen.getByRole( "button" );
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith( "/login", { "replace": true } );

    } );

} );