describe('FizzBuzz', function() {

    var fizzBuzz;
  
    beforeEach(function() {
      fizzBuzz = new FizzBuzz();
    });
  
    describe('multiples of 3', function() {
      it('fizzes for 3', function() {
        expect(fizzBuzz.play(3)).toEqual('Fizz');
      });
  
      it('fizzes for 6', function() {
        expect(fizzBuzz.play(6)).toEqual('Fizz');
      });
    });
  
  });


  //edge cases [javascript,null] (github username : 'hey')