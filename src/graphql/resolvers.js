const { authService } = require('../services/authService');
const { templateService } = require('../services/templateService');

const resolvers = {
    Query: {
        getTemplates: templateService.getAllTemplates,
        getTemplate: templateService.getTemplate,
    },
    Mutation: {
        signUp: authService.signUp,
        login: authService.login,
        googleLogin: authService.googleLogin,
        addTemplate: templateService.addTemplate,
        updateTemplate: templateService.updateTemplate,
        deleteTemplate: templateService.deleteTemplate,
    },
};

module.exports = {
    resolvers,
};
