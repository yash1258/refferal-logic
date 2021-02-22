const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    email: {
        type: String,
        
    },
    productName: {
        type: String,
        
    },
    issueSubject: {
        type: String,
        
    },
    issueText: {
        type: String,
        

    },
    issueStatus: {
        type: String,
        

    },
    reportDate: {
        type: Date,
        
    }
});

module.exports = mongoose.model('Issue', IssueSchema);