import { el } from './elements'

class Header {

    shouldHaveText(userName) {
        cy.contains(el.welcomeMsg)
            .should('be.visible')
            .should('contains.text', 'Bem-vindo')

        cy.get(el.userName)
            .should('be.visible')
            .should('have.text', userName)
        
    }
}
export default new Header()