var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost/wikistack', {
	logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
    // date: {
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.NOW
    // }
}, {
	getterMethods: {
		route(){
			return '/wiki/' + this.urlTitle;
		}
	},

    hooks: {
        beforeValidate: (page) => {
            if (page.title){
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
                page.urlTitle =  Math.random().toString(36).substring(2, 7);
            }
        }
    },
    classMethods: {
        findByTag: function(tagArray){
            return Page.findAll({
                where : {
                    tags : {
                        $overlap: tagArray
                    }
                }
            });
        }
    }
});


const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
	db: db,
    Page: Page,
    User: User
};
