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
        cy.get(el.calendar, {timeout: 7000})
            .should('be.visible')
    }

    selectDay(day){

        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if(today.getDate() === lastDayOfMonth.getDate()){
            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()

            cy.contains(el.monthYearName, 'Abril')
                .should('be.visible')
        }
        const target = new RegExp('^' + day + '$', 'g')
        cy.contains(el.boxDay, target)
            .click({force :true})
    }

    appoitmentShouldBe(customer, hour){
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }

}

export default new DashboardPage()