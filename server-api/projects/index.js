'use strict';

const express = require('express');
var router = express.Router({mergeParams: true});

const projectsController = require('./projects.controller');

router.post("/", projectsController.createProjects);
// This is called to update one of the existing Project
router.put("/:projectId", projectsController.updateProjects);
// List of projects based on User Search Criteria. It may or may not be created or assigned to the user
router.post("/search", projectsController.getProjects);
// Get the details for a specified Project or List of projects either created by user or assigned to the user
router.get("/:projectId", projectsController.getProjectById);
// router.get("/:projectId", projectsController.updateProjects);

// This is called when user applies for a Project
router.post("/:projectId/users", projectsController.resourceApplyForProject);
// This is called when project creator comes to Candidates Review page
router.get("/:projectId/users", projectsController.resourceListForReview);
// This is called when project creator either Accepts or Rejects Candidate(s) in Review Page
router.put("/:projectId/users", projectsController.resourceApproveOrReject);
// This is called when project creator want to see Candidates Review details
router.get("/:projectId/users/:userId", projectsController.getProjectTeamMember);
// This is called when one wants to see project attachments
router.get("/files/:projectId/uploads/:fileName", projectsController.getProjectAttachments);
// This is called when one wants to see project attachments
router.delete("/files/:projectId/uploads/:fileName", projectsController.deleteProjectAttachment);
// This is called when one wants to create project related tasks
router.post("/:projectId/tasks", projectsController.createProjectTask);
router.put("/:projectId/tasks/:taskId", projectsController.updateProjectTask);
router.delete("/:projectId/tasks/:taskId/files/:fileName", projectsController.deleteProjectTaskAttachment);


module.exports = router;
