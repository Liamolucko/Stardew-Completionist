/// <reference types="cypress" />

describe("Stardew Completionist", () => {
  it("Should not throw any errors", () => {
    cy.visit("/dashboard/");
    cy.visit("/shipping/");
    cy.visit("/fish/");
    cy.visit("/artifacts/");
    cy.visit("/minerals/");
    cy.visit("/cooking/");
    cy.visit("/bundles/");
    cy.visit("/friendship/");
  });
});
