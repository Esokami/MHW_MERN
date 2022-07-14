const ItemController = require('../controllers/item.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    //Used to create
    app.post('/api/items/', authenticate, ItemController.createItem);

    //Used to get all 
    app.get('/api/items/', ItemController.getAllItems);

    //User to get all objects by user
    app.get('/api/items/byuser/:username', ItemController.findAllItemsByUser);

    //Used to see one
    app.get('/api/items/:id', ItemController.getOneItem);

    // Used to update 
    app.put('/api/items/:id', authenticate, ItemController.updateItem);

    //Used to delete
    app.delete('/api/items/:id', ItemController.deleteItem);
}