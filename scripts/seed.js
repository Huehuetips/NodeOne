const { Module, User, Rank, Permission, Session, sequelize } = require('../models'); // Añadir Session

const seedDatabase = async () => {
    try {

        // Insertar módulos
        const usersModule = await Module.create({ nameModule: 'Users', descriptionModule: 'Módulo de Usuarios' });
        const ranksModule = await Module.create({ nameModule: 'Ranks', descriptionModule: 'Módulo de Rangos' });
        const permissionsModule = await Module.create({ nameModule: 'Permissions', descriptionModule: 'Módulo de Permisos' });
        const modulesModule = await Module.create({ nameModule: 'Modules', descriptionModule: 'Módulo de Módulos' });
        const chatModule = await Module.create({ nameModule: 'Chat', descriptionModule: 'Módulo de Chat' });

        // Insertar rangos
        const usersAdminRank = await Rank.create({ nameRank: 'Users Admin', createUserId: 1, writeUserId: 1 });
        const moderatorRank = await Rank.create({ nameRank: 'Moderator', createUserId: 1, writeUserId: 1 });
        const editorRank = await Rank.create({ nameRank: 'Editor', createUserId: 1, writeUserId: 1 });
        const viewerRank = await Rank.create({ nameRank: 'Viewer', createUserId: 1, writeUserId: 1 });
        const guestRank = await Rank.create({ nameRank: 'Guest', createUserId: 1, writeUserId: 1 });
        const superUserRank = await Rank.create({ nameRank: 'Super User', createUserId: 1, writeUserId: 1 });
        
        // Insertar usuarios
        const user1 = await User.create({ nameUser: 'John Doe', userUser: 'john_doe', emailUser: 'john@example.com', rankId: usersAdminRank.id });
        const user2 = await User.create({ nameUser: 'Jane Smith', userUser: 'jane_smith', emailUser: 'jane@example.com', rankId: usersAdminRank.id });
        const user3 = await User.create({ nameUser: 'Alice Johnson', userUser: 'alice_johnson', emailUser: 'alice@example.com', rankId: usersAdminRank.id });
        const user4 = await User.create({ nameUser: 'Bob Brown', userUser: 'bob_brown', emailUser: 'bob@example.com', rankId: viewerRank.id });
        const user5 = await User.create({ nameUser: 'Charlie Davis', userUser: 'charlie_davis', emailUser: 'charlie@example.com', rankId: moderatorRank.id });
        const user6 = await User.create({ nameUser: 'Diana Evans', userUser: 'diana_evans', emailUser: 'diana@example.com', rankId: superUserRank.id });
        const user7 = await User.create({ nameUser: 'Eve Foster', userUser: 'eve_foster', emailUser: 'eve@example.com', rankId: usersAdminRank.id });
        const user8 = await User.create({ nameUser: 'Frank Green', userUser: 'frank_green', emailUser: 'frank@example.com', rankId: usersAdminRank.id });
        const user9 = await User.create({ nameUser: 'Grace Harris', userUser: 'grace_harris', emailUser: 'grace@example.com', rankId: usersAdminRank.id, createUserId: 3, writeUserId: 5 });
        const user10 = await User.create({ nameUser: 'Hank Irving', userUser: 'hank_irving', emailUser: 'hank@example.com', rankId: viewerRank.id, createUserId: 3, writeUserId: 5 });
        const user11 = await User.create({ nameUser: 'Otro Nombre', userUser: 'otro_nombre', emailUser: 'nombre@example.com', rankId: usersAdminRank.id, createUserId: 3, writeUserId: 5 });
        
        // Insertar permisos
        const createUsersPermission = await Permission.create({ namePermission: 'CREATE', moduleId: usersModule.id, createUserId: 1, writeUserId: 1 });
        const readUsersPermission = await Permission.create({ namePermission: 'READ', moduleId: usersModule.id, createUserId: 1, writeUserId: 1 });
        const writeUsersPermission = await Permission.create({ namePermission: 'WRITE', moduleId: usersModule.id, createUserId: 1, writeUserId: 1 });
        const deleteUsersPermission = await Permission.create({ namePermission: 'DELETE', moduleId: usersModule.id, createUserId: 1, writeUserId: 1 });

        const createRanksPermission = await Permission.create({ namePermission: 'CREATE', moduleId: ranksModule.id, createUserId: 1, writeUserId: 1 });
        const readRanksPermission = await Permission.create({ namePermission: 'READ', moduleId: ranksModule.id, createUserId: 1, writeUserId: 1 });
        const writeRanksPermission = await Permission.create({ namePermission: 'WRITE', moduleId: ranksModule.id, createUserId: 1, writeUserId: 1 });
        const deleteRanksPermission = await Permission.create({ namePermission: 'DELETE', moduleId: ranksModule.id, createUserId: 1, writeUserId: 1 });

        const createPermissionsPermission = await Permission.create({ namePermission: 'CREATE', moduleId: permissionsModule.id, createUserId: 1, writeUserId: 1 });
        const readPermissionsPermission = await Permission.create({ namePermission: 'READ', moduleId: permissionsModule.id, createUserId: 1, writeUserId: 1 });
        const writePermissionsPermission = await Permission.create({ namePermission: 'WRITE', moduleId: permissionsModule.id, createUserId: 3, writeUserId: 5 });
        const deletePermissionsPermission = await Permission.create({ namePermission: 'DELETE', moduleId: permissionsModule.id, createUserId: 3, writeUserId: 5 });

        const createChatPermission = await Permission.create({ namePermission: 'CREATE', moduleId: chatModule.id, createUserId: 1, writeUserId: 1 });
        const readChatPermission = await Permission.create({ namePermission: 'READ', moduleId: chatModule.id, createUserId: 1, writeUserId: 1 });
        const writeChatPermission = await Permission.create({ namePermission: 'WRITE', moduleId: chatModule.id, createUserId: 1, writeUserId: 1 });
        const deleteChatPermission = await Permission.create({ namePermission: 'DELETE', moduleId: chatModule.id, createUserId: 1, writeUserId: 1 });

        // Asignar permisos a rangos
        await usersAdminRank.addPermissions([createUsersPermission, readUsersPermission, writeUsersPermission, deleteUsersPermission]);
        await moderatorRank.addPermissions([createRanksPermission, readRanksPermission, writeRanksPermission, deleteRanksPermission]);
        await editorRank.addPermissions([createPermissionsPermission, readPermissionsPermission, writePermissionsPermission, deletePermissionsPermission]);
        await superUserRank.addPermissions([createUsersPermission, readUsersPermission, createRanksPermission, readRanksPermission, createPermissionsPermission, readPermissionsPermission, createChatPermission, readChatPermission, writeChatPermission, deleteChatPermission]);

        // Insertar sesiones
        await Session.create({ userId: user1.id, deviceInfo: 'Chrome on Windows 10', startTimeSession: new Date(), lastConnectionTimeSession: new Date(), keepActiveSession: true, });
        await Session.create({ userId: user2.id, deviceInfo: 'Firefox on macOS', startTimeSession: new Date(), lastConnectionTimeSession: new Date(), keepActiveSession: false, });

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
