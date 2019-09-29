describe('Find favourite language', () => {
    it('Displays the most used language in a user github profile', () => {
      cy.visit('http://127.0.0.1:5500/index.html');
  
      cy.get('[data-testid="userNameText"]')
        .type('ianaquino47');
  
      cy.get('[data-testid="sendButton"]')
        .click();
  
      cy.contains('Ruby');
    });
  });