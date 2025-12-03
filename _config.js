var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: process.env.MONGODB_URI || 'mongodb+srv://db_shelmith:Shelmith%402023@cluster0.80sgsea.mongodb.net/gallery?retryWrites=true&w=majority&appName=Cluster0',
    development: 'mongodb+srv://db_shelmith:Shelmith%402023@cluster0.80sgsea.mongodb.net/gallery_dev?retryWrites=true&w=majority&appName=Cluster0',
    test: 'mongodb+srv://db_shelmith:Shelmith%402023@cluster0.80sgsea.mongodb.net/gallery_test?retryWrites=true&w=majority&appName=Cluster0'
}

module.exports = config;
