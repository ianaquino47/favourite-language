describe('Find favourite language', () => {
    it('Displays the most used language in a user github profile', () => {
      cy.visit('http://127.0.0.1:5500/index.html');
  
      cy.get('[data-testid="userNameText"]')
        .type('ianaquino47');
  
      cy.get('[data-testid="sendButton"]')
        .click();

      cy.contains('Thinking...');
  
      cy.contains('Ruby');
    });

    it('Gives error message when user does not exist', () => {
      cy.visit('http://127.0.0.1:5500/index.html');
  
      cy.get('[data-testid="userNameText"]')
        .type('hfisruhfif');
  
      cy.get('[data-testid="sendButton"]')
        .click();

      cy.contains('Thinking...');
  
      cy.contains('This user does not exist.');
    });

    it('Gives error message when user does not have any public repository', () => {
      cy.visit('http://127.0.0.1:5500/index.html');
  
      cy.get('[data-testid="userNameText"]')
        .type('lololol');
  
      cy.get('[data-testid="sendButton"]')
        .click();

      cy.contains('Thinking...');
  
      cy.contains('This user has no public repositories.');
    });
  });