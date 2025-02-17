import { authService } from '../services/authService.js';
import { templateService } from '../services/templateService.js';

export const resolvers = {
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
