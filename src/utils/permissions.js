async function hasRequiredRole(interaction) {
    // If user is the owner, always allow
    if (interaction.user.id === process.env.OWNER_ID) {
        return true;
    }

    // Check if interaction has guild member
    if (!interaction.member) {
        return false;
    }

    // Get the required roles from environment variables
    const adminRoleId = process.env.ADMIN_ROLE_ID;
    const devRoleId = process.env.DEV_ROLE_ID;
    const modRoleId = process.env.MOD_ROLE_ID;

    // Check if user has any of the required roles
    return interaction.member.roles.cache?.some(role => 
        role.id === adminRoleId || 
        role.id === devRoleId || 
        role.id === modRoleId
    ) || false;
}

module.exports = {
    hasRequiredRole
};
