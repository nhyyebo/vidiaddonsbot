const { logError } = require('./logger');

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
    try {
        const replyOptions = {
            ...options,
            content,
            ephemeral: true
        };

        if (!interaction.deferred && !interaction.replied) {
            return await interaction.reply(replyOptions);
        } else {
            return await interaction.followUp(replyOptions);
        }
    } catch (error) {
        console.error('Error in safeReply:', error);
    }
}

// Handle command execution with error handling
async function handleCommand(interaction, executeFunction) {
    try {
        validateInteraction(interaction);
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true });
        }
        
        await executeFunction(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        try {
            if (!interaction.replied) {
                await interaction.reply({
                    content: '❌ An error occurred while executing this command.',
                    ephemeral: true
                });
            } else {
                await interaction.followUp({
                    content: '❌ An error occurred while executing this command.',
                    ephemeral: true
                });
            }
        } catch (replyError) {
            console.error('Error sending error message:', replyError);
        }
        logError(
            error.message,
            interaction.commandName,
            interaction.user,
            Date.now()
        );
        throw error;
    }
}

// Handle button interactions with error handling
async function handleButton(interaction, buttonFunction) {
    try {
        validateInteraction(interaction);
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true });
        }
        
        await buttonFunction(interaction);
    } catch (error) {
        console.error('Error handling button:', error);
        try {
            if (!interaction.replied) {
                await interaction.reply({
                    content: '❌ An error occurred while processing this button.',
                    ephemeral: true
                });
            } else {
                await interaction.followUp({
                    content: '❌ An error occurred while processing this button.',
                    ephemeral: true
                });
            }
        } catch (replyError) {
            console.error('Error sending error message:', replyError);
        }
        logError(
            error.message,
            `${interaction.customId} (button)`,
            interaction.user,
            Date.now()
        );
        throw error;
    }
}

// Handle modal submissions with error handling
async function handleModal(interaction, modalFunction) {
    try {
        validateInteraction(interaction);
        await modalFunction(interaction);
    } catch (error) {
        console.error('Error handling modal:', error);
        await safeReply(interaction, '❌ An error occurred while processing this form.');
        logError(
            error.message,
            `${interaction.customId} (modal)`,
            interaction.user,
            Date.now()
        );
        throw error;
    }
}

// Check if interaction is from admin or owner
function isAdminOrOwner(interaction) {
    return interaction.member.permissions.has('Administrator') || 
           interaction.user.id === process.env.OWNER_ID;
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
