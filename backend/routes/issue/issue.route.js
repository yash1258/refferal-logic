const express= require('express');
const router = express.Router();
const IssueController = require('../../controllers/issue/issue.controller');

const issueController = new IssueController();
router.post('/createIssue' , issueController.createIssue);
router.get('/getOpenIssue' , issueController.getOpenIssue);
router.get('/getClosedIssue' , issueController.getClosedIssue);
router.post('/closeIssue' , issueController.closeIssue);


module.exports=router;