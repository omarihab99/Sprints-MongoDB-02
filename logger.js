const chalk = require('chalk');
productLogger = {
    productValidationSuccess: () => console.log(chalk.green("Server: productValidation passed.")),
    productValidationFailed: () => console.log(chalk.red("Server: productValidation failed.")),
    getAllProductsSuccess: () => console.log(chalk.green("Server: getAllProducts passed.")),
    getAllProductsFailed: () => console.log(chalk.red("Server: getAllProducts failed.")),
    createProductSuccess: () => console.log(chalk.green("Server: createProduct passed.")),
    createProductFailed: () => console.log(chalk.red("Server: createProduct failed.")),
    getProductByIdSuccess: () => console.log(chalk.green("Server: getProductById passed.")),
    getProductByIdFailed: () => console.log(chalk.red("Server: getProductById failed.")),
    updateProductSuccess: () => console.log(chalk.green("Server: updateProduct passed.")),
    updateProductFailed: () => console.log(chalk.red("Server: updateProduct failed.")),
    deleteProductSuccess: () => console.log(chalk.green("Server: deleteProduct passed.")),
    deleteProductFailed: () => console.log(chalk.red("Server: deleteProduct failed.")),
};
userLogger = {
  userRegisterSuccess: () => console.log(chalk.green('Server: userRegister success')),
  userRegisterFailed: () => console.log(chalk.red('Server: userRegister failed')),
  userLoginSuccess: () => console.log(chalk.green('Server: userLogin success')),
  userLoginFailed: () => console.log(chalk.red('Server: userLogin failed')),
};
module.exports = {productLogger, userLogger};