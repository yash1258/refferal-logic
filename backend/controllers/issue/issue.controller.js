const IssueService = require ('../../services/issue/issue.service')
const issueService = new IssueService();

class IssueController{
    constructor(){}
    
async createIssue(req, res, next){
    console.log('popo')
    console.log(req.body)
    let response = await issueService.createIssue(req);
    res.json(response);
}
async getOpenIssue (req, res, next){
    let response = await issueService.getOpenIssue();
    res.json(response);
}
async getClosedIssue (req, res, next){
    let response = await issueService.getClosedIssue();
    res.json(response);
}
async closeIssue(req, res, next){
    console.log(req.body)
    
    let response =await issueService.closeIssue(req.body);
    res.json(response);
}

}




module.exports=IssueController;