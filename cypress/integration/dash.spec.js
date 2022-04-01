import dashPage from '../support/pages/dashboard'
import {customer, provider, appointment} from '../support/factories/dash'

describe('dashboard', function(){

    context('quando o clinete faz um agendamento no app mobile', function(){

        before(function(){
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.log('Token: ' +  Cypress.env('apiToken'))
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function(){
            const day = Cypress.env('appointmentDay')

            cy.uiLogin(provider, true)
            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(day)
            dashPage.appoitmentShouldBe(customer, appointment.hour)
        })
    })
})

