import dashPage from '../support/pages/dashboard'
import {customer, provider, appointment} from '../support/factories/dash'

describe('dashboard', function(){

    context('quando o cliente faz um agendamento no app mobile', function(){

        before(function(){
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.log('Token: ' +  Cypress.env('apiToken'))
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function(){
            const date = Cypress.env('appointmentDate')

            cy.uiLogin(provider, true)
            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(date)
            dashPage.appoitmentShouldBe(customer, appointment.hour)
        })
    })
})

