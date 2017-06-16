var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost/wikistack', {
	logging: false
});


// function generateUrlTitle(title){
//     if(title){
//         return title.replace(/\s+/g, '_').replace(/\W/g, '');
//     }else{
//         return Math.random().toString(36).substring(2,7);
//     }
// };

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
    }
    // date: {
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.NOW
    // }
},{
	getterMethods: {
		route(){
			return '/wiki/' + this.urlTitle;
		}
	}
},
    {
        hooks: {
            beforeValidate:(page, options)=>{
                console.log("Hook firing");
                // page.urlTitle = generateUrlTitle("hamster");
                if(page.title){
                    page.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
                }else{
                    page.urlTitle =  Math.random().toString(36).substring(2,7);
                }
            }
        }
    }
);

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

module.exports = {
	db: db,
  	Page: Page,
  	User: User
};