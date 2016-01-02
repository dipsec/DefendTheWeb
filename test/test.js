var assert = require('assert');

describe('Student', function () {
    var student = { classes: [ 'English', 'Maths', 'Science' ] }

    it('should have correct number of classes', function () {
        assert.equal('Maths', student.classes[1]);
    })
})