import {el} from './elements'

import header from '../../components/header'

class DashboardPage{

    constructor(){
        this.header = header
    }
    
    go(){
        cy.visit('/dashboard')
    }

    calendarShouldBeVisible(){
        cy.get('.DayPicker', {timeout: 7000})
            .should('be.visible')
    }

    selectDay(day){
        const target = new RegExp('^' + day + '$', 'g')
        cy.contains('.DayPicker-Day--available', target)
            .click()
    }

    appoitmentShouldBe(customer, hour){
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains('span[class=appointment]', hour)
            .should('be.visible')
    }

}

export default new DashboardPage()