function hasRequiredRole(member, requiredRoleId) {
    return member.roles.cache.has(requiredRoleId) || 
           member.permissions.has('Administrator') ||
           member.id === process.env.OWNER_ID;
}

module.exports = {
    hasRequiredRole
};
