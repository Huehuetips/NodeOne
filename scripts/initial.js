const { Module, User, Rank, Permission, sequelize } = require('../models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Tables created successfully!'); // Mensaje de éxito

        // Crear un usuario primero con rankId nulo temporalmente
        const initialUser = await User.create({ nameUser: 'Sistema', userUser:'_system_', emailUser : 'system@example.com', passwordUser: '$pbkdf2-sha512$2500$QGiNEQJASKl1bs15z5nzng$7gsj2EuZMHh0wYKex3LZ.vq7Y4ZIDx8h0XBVKCrRrsOWPsEk4DjM75UOhXwGU4psHbMjV0LJuOqVGN6GHhQtbg', defaultPasswordUser: false , rankId: null });
        
        // Insertar datos de prueba
        const superAdminRank = await Rank.create({ nameRank: 'Super Admin', createUserId: initialUser.id, writeUserId: initialUser.id });
        
        // Actualizar el initialUser para que tenga el rango superAdmin
        await initialUser.update({ rankId: superAdminRank.id });
        
        const generalModule = await Module.create({ nameModule: 'General', descriptionModule: 'Incluye Todos los módulos' });
        
        const createPermission = await Permission.create({ namePermission: 'CREATE', moduleId: generalModule.id, createUserId: initialUser.id, writeUserId: initialUser.id });
        const readPermission = await Permission.create({ namePermission: 'READ', moduleId: generalModule.id, createUserId: initialUser.id, writeUserId: initialUser.id });
        const writePermission = await Permission.create({ namePermission: 'WRITE', moduleId: generalModule.id, createUserId: initialUser.id, writeUserId: initialUser.id });
        const deletePermission = await Permission.create({ namePermission: 'DELETE', moduleId: generalModule.id, createUserId: initialUser.id, writeUserId: initialUser.id });
        
        await superAdminRank.addPermission(createPermission);
        await superAdminRank.addPermission(readPermission);
        await superAdminRank.addPermission(writePermission);
        await superAdminRank.addPermission(deletePermission);
        
        await User.create({ nameUser: 'Administrador', userUser: 'Administrador', emailUser: 'admin@example.com', passwordUser: '$pbkdf2-sha512$2500$QGiNEQJASKl1bs15z5nzng$7gsj2EuZMHh0wYKex3LZ.vq7Y4ZIDx8h0XBVKCrRrsOWPsEk4DjM75UOhXwGU4psHbMjV0LJuOqVGN6GHhQtbg', defaultPasswordUser: false , rankId: superAdminRank.id });
        await User.create({ nameUser: 'Test', userUser: 'Test', emailUser: 'test@example.com', passwordUser: '$pbkdf2-sha512$2500$QGiNEQJASKl1bs15z5nzng$7gsj2EuZMHh0wYKex3LZ.vq7Y4ZIDx8h0XBVKCrRrsOWPsEk4DjM75UOhXwGU4psHbMjV0LJuOqVGN6GHhQtbg', defaultPasswordUser: false , rankId: superAdminRank.id });
        
        // Eliminar la restricción de clave foránea
        await sequelize.queryInterface.removeConstraint('users', 'users_ibfk_3');
        
        // Modificar el modelo User para que rankId no acepte nulos
        await sequelize.queryInterface.changeColumn('users', 'rankId', {
            type: sequelize.Sequelize.INTEGER,
            allowNull: false,
        });

        // Volver a agregar la restricción de clave foránea
        await sequelize.queryInterface.addConstraint('users', {
            fields: ['rankId'],
            type: 'foreign key',
            name: 'users_ibfk_3',
            references: {
                table: 'ranks',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
