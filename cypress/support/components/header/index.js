import { el } from './elements'

class Header {

    userLoggedIn(userName) {
        cy.contains(el.welcomeMsg)
            .should('be.visible')
            .should('contains.text', 'Bem-vindo')

        cy.get(el.fullName, {timeout: 7000})
            .should('be.visible')
            .should('have.text', userName)
        
    }
}
export default new Header()