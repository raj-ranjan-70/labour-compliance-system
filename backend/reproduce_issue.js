const mongoose = require('mongoose');
const Compliance = require('./models/Compliance');

console.log('Testing Compliance model validation...');

const doc = new Compliance({
    title: 'Test Title',
    description: 'Test Description',
    category: 'Safety',
    regulationReference: 'Ref 123',
    privacyImpact: {
        type: 'Low',
        description: 'Test description'
    },
    // Testing empty string for Date field
    dueDate: ''
});

console.log('Document created with dueDate: ""');

const err = doc.validateSync();
if (err) {
    console.log('Validation FAILED:');
    console.log(err.message);
} else {
    console.log('Validation SUCCEEDED');
}
