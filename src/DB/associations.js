import { usersModel } from "./Models/users.model.js";
import { Posts } from "./Models/posts.model.js";
import { Comments } from "./Models/comments.model.js";

// User - Post
usersModel.hasMany(Posts, {
    foreignKey: "userId"
});

Posts.belongsTo(usersModel, {
    foreignKey: "userId"
});

//User - Comment
usersModel.hasMany(Comments, {
    foreignKey: "userId"
});

Comments.belongsTo(usersModel, {
    foreignKey: "userId"
});

// Post - Comment
Posts.hasMany(Comments, {
    foreignKey: "postId"
});

Comments.belongsTo(Posts, {
    foreignKey: "postId"
});
