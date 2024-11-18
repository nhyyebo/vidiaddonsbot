const { logError } = require('../commands/logs');

// Validate interaction object
function validateInteraction(interaction) {
    if (!interaction) throw new Error('Invalid interaction object');
    if (!interaction.user) throw new Error('Invalid user in interaction');
    if (!interaction.guild) throw new Error('Command must be used in a server');
}

// Validate permissions
function validatePermissions(interaction, requiredPermissions = []) {
    if (!interaction.member) throw new Error('Cannot verify member permissions');
    
    for (const permission of requiredPermissions) {
        if (!interaction.member.permissions.has(permission)) {
            throw new Error(`Missing permission: ${permission}`);
        }
    }
}

// Safe reply to interaction
async function safeReply(interaction, content, options = {}) {
    const replyOptions = {
        ...options,
        content,
        ephemeral: true // Always ephemeral by default
    };

    try {
        if (interaction.replied || interaction.deferred) {
            return await interaction.followUp(replyOptions);
        } else {
            return await interaction.reply(replyOptions);
        }
    } catch (error) {
        console.error('Error in safeReply:', error);
        try {
            return await interaction.channel.send({
                ...replyOptions,
                content: `${interaction.user}, ${content}`
            });
        } catch (secondError) {
            console.error('Failed to send fallback message:', secondError);
        }
    }
}

// Handle command execution with error handling
async function handleCommand(interaction, executeFunction) {
    try {
        validateInteraction(interaction);
        await executeFunction(interaction);
    } catch (error) {
        console.error(`Error in command ${interaction.commandName}:`, error);
        
        // Log the error
        logError(
            error.message,
            interaction.commandName,
            interaction.user,
            Date.now()
        );

        // Determine user-friendly error message
        let userMessage = 'An error occurred while executing this command.';
        if (error.message.includes('permissions')) {
            userMessage = 'You do not have the required permissions for this command.';
        } else if (error.message.includes('server')) {
            userMessage = 'This command can only be used in a server.';
        }

        // Try to send error message to user
        await safeReply(interaction, userMessage);
    }
}

// Handle button interactions with error handling
async function handleButton(interaction, buttonFunction) {
    try {
        validateInteraction(interaction);
        await buttonFunction(interaction);
    } catch (error) {
        console.error(`Error in button ${interaction.customId}:`, error);
        
        // Log the error
        logError(
            error.message,
            `${interaction.customId} (button)`,
            interaction.user,
            Date.now()
        );

        await safeReply(interaction, 'An error occurred while handling this button.');
    }
}

// Handle modal submissions with error handling
async function handleModal(interaction, modalFunction) {
    try {
        validateInteraction(interaction);
        await modalFunction(interaction);
    } catch (error) {
        console.error(`Error in modal ${interaction.customId}:`, error);
        
        // Log the error
        logError(
            error.message,
            `${interaction.customId} (modal)`,
            interaction.user,
            Date.now()
        );

        await safeReply(interaction, 'An error occurred while processing your submission.');
    }
}

// Check if interaction is from admin or owner
function isAdminOrOwner(interaction) {
    if (!interaction.member) return false;
    
    const isAdmin = interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID);
    const isOwner = interaction.user.id === process.env.OWNER_ID;
    
    return isAdmin || isOwner;
}

module.exports = {
    validateInteraction,
    validatePermissions,
    safeReply,
    handleCommand,
    handleButton,
    handleModal,
    isAdminOrOwner
};
