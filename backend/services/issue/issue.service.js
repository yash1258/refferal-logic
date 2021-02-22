const issueModel = require('../../models/issue');
const sendMail = require('../../services/mail/nodemailer.service');


class IssueService{
    constructor(){}


async createIssue(request){
    console.log(request.body)
    let issue = new issueModel(request.body);
    let response = await issue.save();
    sendMail({
        to : 'khattaryash1997@gmail.com',
        type : 'issue_create_notify'
    })
    return response;
    console.log('saved')

}   
async getOpenIssue(){
    let response = await issueModel.find({issueStatus : 'open'})
    // console.log(response);
    return response
} 
async getClosedIssue(){
    let response = await issueModel.find({issueStatus : 'closed'})
    // console.log(response);
    return response
} 
async closeIssue(request){
    console.log(request._id);
    let issue = await issueModel.findById(request._id);
    issue.issueStatus = 'closed';
    let response = await issue.save();
    sendMail({
        to : request.email,
        type : 'issue_close_notify'
    })
    return response;
    // console.log(issue);
}

}
module.exports = IssueService;