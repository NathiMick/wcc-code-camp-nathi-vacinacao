/***** VERIFY IF IS NOT NULL, UNDEFINED OR "" *****/

const isNotNull = function(obj) {
    let notNull = true;

    let keyList = Object.keys(obj);
    keyList.forEach((key) => {        
        if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
            if(obj[key] == 'false') {
                return;
            } else {
                notNull = false;
            }
        };
    });
    return notNull;
};


/***** SEND MESSAGE ERROR IF CATCH "" *****/

const sendErrorMessage = function(error, res, status) {
    return res.status(status).json({
        error,
        message: `Ocorreu um erro durante o acesso ao Banco de Dados.`
    })
};


module.exports = {
    isNotNull,
    sendErrorMessage
}
 