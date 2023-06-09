/// <reference types="cypress" />

describe("match-reports", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("displays logged in user", () => {
    cy.contains("John Doe");
  });

  it("displays the filter menu", () => {
    cy.contains("All Projects");
    cy.contains("All Gateways");
    cy.contains("From date");
    cy.contains("To date");
    cy.contains("Generate Report");
  });

  it("displays the default payments without selected filters", () => {
    cy.get('[data-cy^="payment-group-"]').should("have.length", 2);
    cy.contains("Total: 190.739,79 USD");
  });
});
